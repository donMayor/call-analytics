/**
 * Created by don_mayor on 9/24/2015.
 */

angular.module('expense_trend.byTariff', [])
    .controller('expense_trend.byTariffCtrl', function( expTrndByTariffService, $scope, $location, $anchorScroll, anchorSmoothScroll){

        $scope.byCallType;
        $scope.option = []
        var nByCallType = []
        $scope.option.order_1 = "Total"
        $scope.option.order_2 = "Ascending"
        $scope.sumTotal = 0;

        $scope.show  = false;

        expTrndByTariffService.getByCallType()
            .success(function (data) {
                $scope.byCallType = data;
                $scope.show = true;
                $scope.sortKey = $scope.option.order_1;
                $scope.reverse = false;
                $scope.sort()
                $scope.dwGraph();
            })

        $scope.sort = function(){


            if($scope.option.order_1 == "Call Type"){
                $scope.sortKey = "tariff_group"
            }else if($scope.option.order_1 == "Total" ){
                $scope.sortKey = "total"
            }
            else{
                $scope.sortKey = $scope.option.order_1;
            }
        }

        $scope.order = function(){


            if( $scope.option.order_2 == "Ascending"){
                $scope.reverse = false;
            }
            else{
                $scope.reverse = true;
            }
        }

        $scope.dwGraph = function(){

            var perTariffGph = [];
            var perMonthGph = [];
            var tField = []

            for( key in $scope.byCallType.fields){
                perMonthGph.push($scope.byCallType.month_total[$scope.byCallType.fields[key]]);
            }
            for( key in $scope.byCallType.data){
                perTariffGph.push($scope.byCallType.data[key].total);
                tField.push($scope.byCallType.data[key].tariff_group)
            }

            var data = {
                labels: $scope.byCallType.fields,
                datasets: [
                    {
                        label: "TOTAL EXPENSE PER MONTH",
                        fillColor: "rgba(220,220,0,0.2)",
                        strokeColor: "rgba(0,0,220,1)",
                        pointColor: "rgba(220,0,220,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: perMonthGph
                    }
                ]
            };

            var data2 = {
                labels: tField,
                datasets: [
                    {
                        label: "MONTHLY EXPENSE PER TARIFF GROUP",
                        fillColor: "rgba(220,220,0,0.2)",
                        strokeColor: "rgba(0,0,220,1)",
                        pointColor: "rgba(220,0,220,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: perTariffGph
                    }
                ]
            };

            var ctx = angular.element("#myChart").get(0).getContext("2d");
            var myNewChart = new Chart(ctx).Bar(data);

            var ctx2 = angular.element('#myChart2').get(0).getContext("2d");
            var myNewChart2 = new Chart(ctx2).Line(data2);
        }

        //var parseResponse = function(){
        //
        //    for(index in nByCallType.data ){
        //        var tariff_group = nByCallType.data[index];
        //
        //        if(tariffPerMonth[tariff_group.tariff_group] == null){
        //            for(var k in nByCallType.fields){
        //
        //                var mn =  nByCallType.fields[k];
        //                tariffPerMonth[tariff_group.tariff_group][mn] = 0;
        //            }
        //            tariffPerMonth[tariff_group.tariff_group]['code_desc'] = tariff_group.code_desc;
        //            tariffPerMonth[tariff_group.tariff_group]['tariff_group'] = tariff_group.tariff_group;
        //            tariffPerMonth[tariff_group.tariff_group][tariff_group.period] += tariff_group.total;
        //            tariffPerMonth[tariff_group.tariff_group]['total'] = tariff_group.total;
        //        }
        //        else{
        //            if(tariffPerMonth[tariff_group.tariff_group][tariff_group.period] == null){
        //                tariffPerMonth[tariff_group.tariff_group][tariff_group.period] = tariff_group.total;
        //            }
        //            else{
        //                tariffPerMonth[tariff_group.tariff_group][tariff_group.period]+=tariff_group.total;
        //            }
        //            tariffPerMonth[tariff_group.tariff_group]['total'] +=tariff_group.total;
        //        }
        //
        //
        //        if(BillAmountPerMonth[tariff_group.period]==null){
        //            BillAmountPerMonth[tariff_group.period] = tariff_group.total;
        //        }
        //        else{
        //            BillAmountPerMonth[$tariff_group.period]+= tariff_group.total;
        //
        //        }
        //        if(BillAmountPerMonth['total']==null){
        //            BillAmountPerMonth['total'] = tariff_group.total;
        //        }
        //        else{
        //            BillAmountPerMonth['total']+=tariff_group.total;
        //        }
        //    }
        //}
        //
        //
        //$scope.byCallType = {'fields':nByCallType.fields, 'data':tariffPerMonth, 'month_total':BillAmountPerMonth}

        $scope.gotoAnchor = function() {

            anchorSmoothScroll.scrollTo('graph');
        };

    })
    .service('expTrndByTariffService',['$http', function($http){
        this.getByCallType = function( ) {
            var base_url = "http://localhost/CallAnalytics/public/api/expense_trend/call_type";
            return $http.get(base_url);
        }
    }])
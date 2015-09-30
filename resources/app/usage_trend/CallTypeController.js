/**
 * Created by don_mayor on 9/24/2015.
 */

angular.module('usage_trend.byTariff', [])
    .controller('usage_trend.byTariffCtrl', function( usgTrndByTariffService, $scope, $location, $anchorScroll, anchorSmoothScroll){

        $scope.byCallType;
        $scope.option = []
        var nByCallType = []
        $scope.option.order_1 = "Total"
        $scope.option.order_2 = "Ascending"
        $scope.sumTotal = 0;

        $scope.show = false;

        usgTrndByTariffService.getByCallType()
                .success(function (data) {
                    $scope.byCallType = data;

                    $scope.show = true
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



        $scope.gotoAnchor = function() {

            anchorSmoothScroll.scrollTo('graph');
        };

    })
    .service('usgTrndByTariffService',['$http', function($http){
        this.getByCallType = function( ) {
            var base_url = "http://localhost/CallAnalytics/public/api/usage_trend/call_type";
            return $http.get(base_url);
        }
    }])
/**
 * Created by don_mayor on 9/24/2015.
 */

angular.module('expense_trend.byPeriod', [])
    .controller('expense_trend.byPeriodCtrl', function( expTrndByPeriodService, $scope, $location, $anchorScroll, anchorSmoothScroll){

        $scope.byPeriod;
        $scope.option = []
        $scope.option.order_1 = "Total"
        $scope.option.order_2 = "Ascending"
        $scope.sumTotal = 0;

        $scope.option.query_type = "Voice and SMS only"

        $scope.runLinesQuery = function( param ){
           $scope.show  = false;
            var _param = 'VnS';
            if(param == 'Voice and SMS only'){
                _param = 'VnS';
            }
            else if(param == 'GPRS Only' ) {
                _param = 'D';
            }
            else{
                _param = 'All';
            }

            expTrndByPeriodService.getByPeriod(_param)
                .success(function (data) {
                    $scope.byPeriod = data;
                    $scope.show = true;
                    $scope.sortKey = $scope.option.order_1;
                    $scope.reverse = false;
                    $scope.sort()
                    $scope.dwGraph();
                })

                .error(function (data, status, headers, config) {

                })
                .finally(function () {

                })
        }

        $scope.runLinesQuery('Voice and SMS only');

        $scope.sort = function(){
            if($scope.option.order_1 == "Month"){
                $scope.sortKey = "period"
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

            var data1 = [];
            var data2 = [];
            var tField = []

            for( key in $scope.byPeriod.data){
                obj = $scope.byPeriod.data[key];
                tField.push(obj.period)

                for( key in $scope.byPeriod.fields){

                    if( (key % 2) == 0)
                        data1.push(obj[$scope.byPeriod.fields[key]]);
                    else
                        data2.push(obj[$scope.byPeriod.fields[key]]);
                }
            }

            var data = {
                labels: tField,
                datasets: [
                    {
                        label: "MONTHLY EXPENSE PER PERIOD",
                        fillColor: "rgba(220,220,0,0.2)",
                        strokeColor: "rgba(0,0,220,1)",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: data1
                    },
                    {
                        label: "MONTHLY EXPENSE PER PERIOD",
                        fillColor: "rgba(220,0,0,0.2)",
                        strokeColor: "rgba(0,0,220,1)",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: data2
                    }
                ]
            };

            var ctx = angular.element("#myChart").get(0).getContext("2d");
            var myNewChart = new Chart(ctx).Bar(data);

            var pieData = [];
            var colors = ['#6E0CE8', '#FF530D', '#FFFC0D', '#E88C0B', '#0C654F', '#30410B']

            for( key in $scope.byPeriod.fields ) {
                pieData.push({
                    'value': $scope.byPeriod.sums[$scope.byPeriod.fields[key]],
                    'color': colors[key],
                    'highlight': '#FF5A5E',
                    'label': $scope.byPeriod.fields[key]
                });
            }

            var ctx = angular.element("#myChart2").get(0).getContext("2d");
            var myNewChart = new Chart(ctx).Pie(pieData);


        }
        $scope.gotoAnchor = function() {

            anchorSmoothScroll.scrollTo('graph');
        };

    })
    .service('expTrndByPeriodService',['$http', function($http){
        this.getByPeriod = function( param ) {
            var base_url = "http://localhost/CallAnalytics/public/api/expense_trend/period/"+param;
            return $http.get(base_url);
        }
    }])
/**
 * Created by don_mayor on 9/24/2015.
 */

angular.module('expense_trend.cmpAnalysis', [])
    .controller('expense_trend.cmpAnalysis', function( expTrndCmpService, $scope, $location, $anchorScroll, anchorSmoothScroll){

        $scope.Comparative;
        $scope.option = []

        $scope.option.order_1 = "Bill Amount"
        $scope.option.order_2 = "Ascending"

        $scope.show = false;

        console.log('Test');

        expTrndCmpService.getComparative()
            .success(function (data) {
                $scope.Comparative = data;

                $scope.show = true;

                $scope.sortKey = $scope.option.order_1;
                $scope.reverse = false;
                $scope.sort()

            })

        $scope.sort = function(){


            if($scope.option.order_1 == "Bill Amount"){
                $scope.sortKey = "bill"
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


    })
    .service('expTrndCmpService',['$http', function($http){
        this.getComparative = function( ) {
            var base_url = "http://localhost/CallAnalytics/public/api/expense_trend/comparative";
            return $http.get(base_url);
        }
    }])
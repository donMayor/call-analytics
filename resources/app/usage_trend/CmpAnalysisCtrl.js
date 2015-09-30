/**
 * Created by don_mayor on 9/24/2015.
 */

angular.module('usage_trend.cmpAnalysis', [])
    .controller('usage_trend.cmpAnalysis', function( usgTrndCmpService, $scope, $location, $anchorScroll, anchorSmoothScroll){

        $scope.Comparative;
        $scope.option = []

        $scope.option.order_1 = "Duration/Data"
        $scope.option.order_2 = "Ascending"

        usgTrndCmpService.getComparative()
            .success(function (data) {
                $scope.Comparative = data;

                //console.log($scope.Comparative);
                $scope.sortKey = $scope.option.order_1;
                $scope.reverse = false;
                $scope.sort()

            })

        $scope.sort = function(){

            if($scope.option.order_1 == "Duration/Data"){
                $scope.sortKey = "duration"
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
    .service('usgTrndCmpService',['$http', function($http){
        this.getComparative = function( ) {
            var base_url = "http://localhost/CallAnalytics/public/api/usage_trend/comparative";
            return $http.get(base_url);
        }
    }])
/**
 * Created by don_mayor on 9/21/2015.
 */




angular.module('expense_trend.byLine', [])
    .controller('expense_trend.byLinesCtrl', function( expTrndByLineService, $scope, $anchorScroll, $location, $filter, anchorSmoothScroll ){

        $scope.byLines;
        $scope.option = []
        $scope.nByLines = []
        $scope.option.order_1 = "Total"
        $scope.option.order_2 = "Descending"
        $scope.sumTotal = 0;

        $scope.option.query_type = "Voice and SMS only"

        var myBarChart, myPieChart;

        $scope.runLinesQuery = function( param ){
            $scope.show = false;
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

            expTrndByLineService.getByLines( _param )
                .success(function (data) {
                    $scope.byLines = data;
                    $scope.show = true;
                    console.log($scope.byLines);
                    $scope.sortKey = $scope.option.order_1;
                    $scope.reverse = true;
                    $scope.sort();
                    $scope.dwGraph();

                })
                .error(function (data, status, headers, config) {

                })
                .finally(function () {

                })
        }

        $scope.runLinesQuery('Voice and SMS only');

        $scope.getTotal = function(){

            for(index in $scope.byLines.data){
                var eachLine = {}
                var line = $scope.byLines.data[index];
                eachLine.phone_lines = line[0].phone_lines;
                var totalCost = 0;

                for(position in $scope.byLines.data[index]){
                    var aMonthCall = line[position];
                    eachLine[aMonthCall.period] = aMonthCall.total;
                    totalCost+=aMonthCall.total;
                }
                eachLine.total = totalCost;
                $scope.nByLines.push(eachLine);
            }
            console.log($scope.nByLines)
        }

       /* $scope.getTotal = function( selectedMonth ){
            $scope.nByLines = [];

            if( selectedMonth == "All"){
                for(index in $scope.byLines.data){
                    var line = $scope.byLines.data[index];
                    var totalCost = 0;
                    for(position in line){
                        var aMonthCall = line[position];
                        totalCost+=aMonthCall.total;
                    }
                    $scope.byLines.data[index].total = totalCost;
                    //$scope.nByLines.push({ phone_lines:line[0].phone_lines, total:totalCost})
                }
            }
            else{
                for(index in $scope.byLines.data){
                    var line = $scope.byLines.data[index];
                    var totalCost = 0;
                    for(position in line){
                        var aMonthCall = line[position]
                        if( aMonthCall.period == selectedMonth){
                            totalCost+=aMonthCall.total;
                        }
                    }
                    $scope.nByLines.push({ phone_lines:line[0].phone_lines, total:totalCost})
                }
            }
        }
        */


        $scope.sort = function(){

            if($scope.option.order_1 == "Phone lines"){
                $scope.sortKey = "phone_lines"

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

            var mntCost = [];
            var lineData = [];
            var colors = ['#6E0CE8', '#E88C0B', '#FF530D', '#FFFC0D', '#E88C0B', '#0C654F', '#30410B']
            for( key in $scope.byLines.fields){

                mntCost.push( { 'value':$scope.byLines.month_total[$scope.byLines.fields[key]],
                                'color': colors[key],
                                'highlight': '#FF5A5E',
                                'label':$scope.byLines.fields[key]});
                lineData.push($scope.byLines.month_total[$scope.byLines.fields[key]]);
            }

            var data = {
                labels: $scope.byLines.fields,
                datasets: [
                    {
                        label: "TOTAL COST PER PHONE LINE",
                        fillColor: "rgba(220,220,0,0.2)",
                        strokeColor: "rgba(0,0,220,1)",
                        pointColor: "rgba(220,0,220,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: lineData
                    }
                ]
            };

            var ctx = angular.element("#myChart").get(0).getContext("2d");
            myBarChart = new Chart(ctx).Bar(data);

            var ctx2 = angular.element('#myChart2').get(0).getContext("2d");
            myPieChart = new Chart(ctx2).Pie(mntCost);
        }

        //$scope.drawGraph = function(){
        //
        //    var mntVsCost = {}
        //    for(index in $scope.byLines.data){
        //       var perLine = $scope.byLines.data[index];
        //
        //        for(postn  in perLine){
        //            if(perLine[postn].period == null)
        //                continue;
        //
        //            var aMonthCallPerLine = perLine[postn];
        //
        //            if(mntVsCost[aMonthCallPerLine.period]!= null){
        //                mntVsCost[aMonthCallPerLine.period]+=aMonthCallPerLine.total;
        //            }else{
        //                mntVsCost[aMonthCallPerLine.period] = aMonthCallPerLine.total;
        //            }
        //            $scope.sumTotal+=aMonthCallPerLine.total;
        //        }
        //    }
        //    $scope.sumTotal = Math.round($scope.sumTotal);
        //
        //    $scope.mntCost = [];
        //    for( key in mntVsCost){
        //        $scope.mntCost.push( mntVsCost[key]);
        //    }
        //
        //    console.log($scope.mntCost);
        //
        //    var data = {
        //        labels: $scope.byLines.fields,
        //        datasets: [
        //            {
        //                label: "TOTAL COST PER PHONE LINE",
        //                fillColor: "rgba(220,220,0,0.2)",
        //                strokeColor: "rgba(0,0,220,1)",
        //                pointColor: "rgba(220,0,220,1)",
        //                pointStrokeColor: "#fff",
        //                pointHighlightFill: "#fff",
        //                pointHighlightStroke: "rgba(220,220,220,1)",
        //                data: $scope.mntCost
        //            }
        //        ]
        //    };
        //
        //    var ctx = angular.element("#myChart").get(0).getContext("2d");
        //    var myNewChart = new Chart(ctx).Line(data);
        //    var ctx2 = angular.element('#myChart2').get(0).getContext("2d");
        //    var myNewChart2 = new Chart(ctx2).Bar(data);
        //
        //}

        $scope.gotoAnchor = function() {

            anchorSmoothScroll.scrollTo('graph');
        };

        $("#myChart").click(function(evt){
            var activePoints = myBarChart.getBarsAtEvent(evt);
            console.log(activePoints);
        });

    })



    .service('expTrndByLineService', ['$http', function( $http){

        this.getByLines = function( param ) {

            var base_url = "http://localhost/CallAnalytics/public/api/expense_trend/lines/"+param;
            return $http.get(base_url);

        }
    }])

/**
 * Created by don_mayor on 9/19/2015.
 */

angular.module('call-analytics-app', ['ui.bootstrap', 'ngRoute',
                    'ui.router', 'expense_trend.byTariff', 'expense_trend.byPeriod',
                    'expense_trend.byLine', 'usage_trend.byTariff', 'usage_trend.byPeriod',
                    'usage_trend.byLine', 'expense_trend.cmpAnalysis', 'usage_trend.cmpAnalysis',
                    'angularUtils.directives.dirPagination'])

    .config(['$routeProvider', '$locationProvider',
        function($routeProvider, $locationProvider) {

            $locationProvider.html5Mode(true)
            $routeProvider.
                when('/expense_trend/lines', {
                    templateUrl: '../resources/app/expense_trend/lines.html',
                    controller:'expense_trend.byLinesCtrl'
                }).
                when('/expense_trend/tariff_group', {
                    templateUrl: '../resources/app/expense_trend/call_type.html',
                    controller:'expense_trend.byTariffCtrl'
                }).
                when('/expense_trend/period', {
                    templateUrl: '../resources/app/expense_trend/period.html',
                    controller:'expense_trend.byPeriodCtrl'
                }).
                when('/expense_trend/comparative', {
                    templateUrl: '../resources/app/expense_trend/comparative.html',
                    controller:'expense_trend.cmpAnalysis'
                }).
                when('/usage_trend/lines', {
                    templateUrl: '../resources/app/usage_trend/lines.html',
                    controller:'usage_trend.byLinesCtrl'
                }).
                when('/usage_trend/tariff_group', {
                    templateUrl: '../resources/app/usage_trend/call_type.html',
                    controller:'usage_trend.byTariffCtrl'
                }).
                when('/usage_trend/period', {
                    templateUrl: '../resources/app/usage_trend/period.html',
                    controller:'usage_trend.byPeriodCtrl'
                }).
                when('/usage_trend/comparative', {
                    templateUrl: '../resources/app/usage_trend/cmp_analysis.html',
                    controller:'usage_trend.cmpAnalysis'
                }).
                otherwise({
                    redirectTo: '/expense_trend/lines'
                });
        }])
    .service('anchorSmoothScroll', function(){

        this.scrollTo = function(eID) {

            var startY = currentYPosition();
            var stopY = elmYPosition(eID);
            var distance = stopY > startY ? stopY - startY : startY - stopY;
            if (distance < 100) {
                scrollTo(0, stopY); return;
            }
            var speed = Math.round(distance / 100);
            if (speed >= 20) speed = 20;
            var step = Math.round(distance / 25);
            var leapY = stopY > startY ? startY + step : startY - step;
            var timer = 0;
            if (stopY > startY) {
                for ( var i=startY; i<stopY; i+=step ) {
                    setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                    leapY += step; if (leapY > stopY) leapY = stopY; timer++;
                } return;
            }
            for ( var i=startY; i>stopY; i-=step ) {
                setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
            }

            function currentYPosition() {
                // Firefox, Chrome, Opera, Safari
                if (self.pageYOffset) return self.pageYOffset;
                // Internet Explorer 6 - standards mode
                if (document.documentElement && document.documentElement.scrollTop)
                    return document.documentElement.scrollTop;
                // Internet Explorer 6, 7 and 8
                if (document.body.scrollTop) return document.body.scrollTop;
                return 0;
            }

            function elmYPosition(eID) {
                var elm = document.getElementById(eID);
                var y = elm.offsetTop;
                var node = elm;
                while (node.offsetParent && node.offsetParent != document.body) {
                    node = node.offsetParent;
                    y += node.offsetTop;
                } return y;
            }

        };

    })
    .controller('app-controller', function( $rootScope ){
        $rootScope.numeralFormatter = numeral;
    })
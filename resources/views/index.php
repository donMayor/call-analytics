<!DOCTYPE html>
<html>
    <head>
        <title>Laravel & Angular</title>
        <base href="/CallAnalytics/public/">

<!--        <link href="https://fonts.googleapis.com/css?family=Lato:100" rel="stylesheet" type="text/css">-->
        <link rel="stylesheet" href="../resources/assets/css/bootstrap.min.css">
        <link rel="stylesheet" href="../resources/assets/css/bootstrap-theme.min.css">
        <link rel="stylesheet" href="../resources/assets/css/main.css">
        <link href="../resources/assets/css/vis.min.css" rel="stylesheet" type="text/css" />

        <script src="../resources/assets/js/jquery-2.1.4.min.js"></script>
        <script src="../resources/assets/js/angular.js"></script>
        <script src="../resources/assets/js/angular-route.min.js"></script>
        <script src="../resources/assets/js/angular-ui-router.js"></script>
        <script src="../resources/assets/js/dirPagination.js"></script>

        <script src="../resources/assets/js/ui-bootstrap-tpls-0.13.4.js"></script>
        <script src="../resources/assets/js/bootstrap.min.js"></script>

        <script src="../resources/app/expense_trend/LinesController.js"></script>
        <script src="../resources/app/expense_trend/CallTypeController.js"></script>
        <script src="../resources/app/expense_trend/PeriodController.js"></script>
        <script src="../resources/app/usage_trend/LinesController.js"></script>
        <script src="../resources/app/usage_trend/CallTypeController.js"></script>
        <script src="../resources/app/usage_trend/PeriodController.js"></script>
        <script src="../resources/app/expense_trend/ComparativeAnalysisController.js"></script>
        <script src="../resources/app/usage_trend/CmpAnalysisCtrl.js"></script>
        <script src="../resources/assets/js/controller/app.js"></script>
        <script src="../resources/assets/js/numeral.min.js"></script>
        <script type="text/javascript" src="../resources/assets/js/Chart.min.js"  ></script>

    </head>

    <body ng-app="call-analytics-app">

        <nav class="navbar navbar-static-top" style="background-color: #0ea85e;">
            <div class="container-fluid">
                <!-- Brand and toggle get grouped for better mobile display -->
                <div class="navbar-header" >
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand txt-color" href="#"><span> Health Connect</span></a>
                </div>

                <!-- Collect the nav links, forms, and other content for toggling -->
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul class="nav navbar-nav navbar-right" style="color: #000">

                        <li class="dropdown">
                            <a class="dropdown-toggle txt-color" data-toggle="dropdown" dropdown-toggle role="button" aria-haspopup="true" aria-expanded="false">Expense Trend<span class="caret"></span></a>
                            <ul class="dropdown-menu">
                                <li><a href="expense_trend/lines">By Line</a></li>
                                <li><a href="expense_trend/tariff_group">By Call Type</a></li>
                                <li><a href="expense_trend/period">By Calling Period</a></li>
                                <li><a href="expense_trend/comparative">monthly spend comparative analysis</a></li>

                            </ul>
                        </li>
                        <li class="dropdown">
                            <a class="dropdown-toggle txt-color" data-toggle="dropdown" dropdown-toggle role="button" aria-haspopup="true" aria-expanded="false">Usage Trend<span class="caret"></span></a>
                            <ul class="dropdown-menu">
                                <li><a href="usage_trend/lines">by Line</a></li>
                                <li><a href="usage_trend/tariff_group">by Call type</a></li>
                                <li><a href="usage_trend/period">by Calling Period</a></li>
                                <li><a href="usage_trend/comparative">Minutes of Use at MTN/Glo/Airtel/Etisalat rates</a></li>
                            </ul>
                        </li>
                        <li class="dropdown">
                            <a  class="dropdown-toggle txt-color" data-toggle="dropdown" dropdown-toggle role="button" aria-haspopup="true" aria-expanded="false">Calling Pattern<span class="caret"></span></a>
                            <ul class="dropdown-menu">
                                <li><a href="#">common calling activities (average/monthly)</a></li>
                                <li><a href="#">biggest users (day/week/month/total) - by no. of calls & calling period</a></li>
                                <li><a href="#">time of use (day vs night/weekday vs weekend/month by month)</a></li>
                                <li><a href="#">length of call (day/week/month/total) - voice, SMS & data</a></li>
                                <li><a href="#">active vs inactive lines</a></li>
                                <li><a href="#">% of calls outside the CUG</a></li>
                                <li><a href="#">% of calls to each calling zone</a></li>
                                <li><a href="#">% of no-answer calls</a></li>
                                <li><a href="#">% of weekday calls (Mon - Fri)</a></li>
                                <li><a href="#">% of daytime calls (7am - 6pm) vs % of nighttime calls (6pm - 7am)</a></li>
                                <li><a href="#">Average number of calls made (per day/month/overall)</a></li>
                                <li><a href="#">Number of calls received vs number of calls made</a></li>
                            </ul>
                        </li>
                        <li class="dropdown">
                            <a class="dropdown-toggle txt-color" data-toggle="dropdown" dropdown-toggle role="button" aria-haspopup="true" aria-expanded="false">Modelling<span class="caret"></span></a>
                            <ul class="dropdown-menu">
                                <li><a href="#">Forecasting (usage & monthly spend)</a></li>
                                <li><a href="#">Optimal user calling patterns</a></li>
                                <li><a href="#">CUG sustainability</a></li>
                            </ul>
                        </li>
                    </ul>
                </div><!-- /.navbar-collapse -->
            </div><!-- /.container-fluid -->
        </nav>

        <div ng-view ng-controller="app-controller"></div>
    </body>
</html>
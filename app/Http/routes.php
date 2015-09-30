<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('index');
});

Route::get('api/expense_trend/lines/{param}', [
    'as' => 'expense_trend_by_lines',
    'uses' => 'ExpenseTrendController@getByLines'
]);

Route::get('api/expense_trend/call_type', [
    'as' => 'expense_trend_call_type',
    'uses' => 'ExpenseTrendController@getByCallType'
]);

Route::get('api/expense_trend/period/{param}', [
    'as' => 'expense_trend_by_period',
    'uses' => 'ExpenseTrendController@getByPeriod'
]);

Route::get('api/usage_trend/lines/{param}', [
    'as' => 'usage_trend_by_lines',
    'uses' => 'UsageTrendController@getByLines'
]);

Route::get('api/usage_trend/call_type', [
    'as' => 'usage_trend_call_type',
    'uses' => 'UsageTrendController@getByCallType'
]);

Route::get('api/usage_trend/period/{param}', [
    'as' => 'usage_trend_by_period',
    'uses' => 'UsageTrendController@getByPeriod'
]);

Route::get('api/expense_trend/comparative', [
    'as' => 'expense_trend_comparative',
    'uses' => 'ExpenseTrendController@getComparative'
]);

Route::get('api/usage_trend/comparative', [
    'as' => 'usage_trend_comparative',
    'uses' => 'UsageTrendController@getComparative'
]);

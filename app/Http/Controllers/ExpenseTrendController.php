<?php
/**
 * Created by PhpStorm.
 * User: don_mayor
 * Date: 9/21/2015
 * Time: 3:27 PM
 */
namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class ExpenseTrendController extends Controller  {

    public function getByLines( $param ){

        if($param == 'VnS'){
            $byLines = DB::table('lines_connect')
                ->select(DB::raw("phone_lines, count(phone_lines) as count, date_format(date_period,'%M') as period, sum(bill_amount) AS total"))
                ->where('tariff_group', '!=', 'GPRS')
                ->groupBy(DB::raw("phone_lines, date_format(date_period,'%M')"))
                ->orderBy(DB::raw("MONTH(date_period)"))
                ->get();
        }
        else if($param == 'D'){
            $byLines = DB::table('lines_connect')
                ->select(DB::raw("phone_lines, count(phone_lines) as count, date_format(date_period,'%M') as period, sum(bill_amount) AS total"))
                ->where('tariff_group',  'GPRS')
                ->groupBy(DB::raw("phone_lines, date_format(date_period,'%M')"))
                ->orderBy(DB::raw("MONTH(date_period)"))
                ->get();
        }
        else{
            $byLines = DB::table('lines_connect')
                ->select(DB::raw("phone_lines, count(phone_lines) as count, date_format(date_period,'%M') as period, sum(bill_amount) AS total"))
                ->groupBy(DB::raw("phone_lines, date_format(date_period,'%M')"))
                ->orderBy(DB::raw("MONTH(date_period)"))
                ->get();
        }

        $db_months = DB::table('lines_connect')
                        ->select(DB::raw("date_format(date_period,'%M') as period"))
                        ->distinct()
                        ->orderBy(DB::raw("MONTH(date_period)"))
                        ->get();

        $months = array();
        foreach($db_months as $mn){
            array_push($months, $mn->period);
        }
       // print_r($months);

        //line number, total for each month, total cumulative
        $LinesPerMonth = array();
        $BillAmountPerMonth = array();

        foreach($byLines as $line){

            if( !isset($LinesPerMonth[$line->phone_lines])){
                foreach($months as $mn){
                    $LinesPerMonth[$line->phone_lines][$mn] = 0;
                }

                $LinesPerMonth[$line->phone_lines]['phone_lines'] = '0'.$line->phone_lines;
                $LinesPerMonth[$line->phone_lines][$line->period] += $line->total;
                $LinesPerMonth[$line->phone_lines]['total'] = $line->total;
            }
            else{
                $LinesPerMonth[$line->phone_lines][$line->period]+=$line->total;
                $LinesPerMonth[$line->phone_lines]['total'] +=$line->total;
            }


            if(!isset($BillAmountPerMonth[$line->period])){
                $BillAmountPerMonth[$line->period] = $line->total;
            }
            else{
                $BillAmountPerMonth[$line->period]+=$line->total;

            }
            if(!isset($BillAmountPerMonth['total'])){
                $BillAmountPerMonth['total'] = $line->total;
            }
            else{
                $BillAmountPerMonth['total']+=$line->total;
            }
        }
        $LinesPerMonth = array_values($LinesPerMonth);

        $byLines = ['fields'=>$months, 'data'=>$LinesPerMonth,'month_total'=>$BillAmountPerMonth ];

        return $byLines ;

    }

    public function getByCallType(){

        $byCallType = DB::table('lines_connect')
            ->join('tariff_code', 'tariff_code.tariff_group', '=', 'lines_connect.tariff_group')
            ->select(DB::raw("lines_connect.id, lines_connect.tariff_group, tariff_code.code_desc, count(lines_connect.tariff_group),
                                MONTHNAME(lines_connect.date_period) as period,sum(lines_connect.bill_amount) AS total"))
            ->groupBy(DB::raw("tariff_code.code_desc, MONTHNAME(lines_connect.date_period)"))
            ->orderBy(DB::raw("MONTH(lines_connect.date_period)"))
            ->get();

        $db_months = DB::table('lines_connect')
            ->select(DB::raw("date_format(date_period,'%M') as period"))
            ->distinct()
            ->orderBy(DB::raw("MONTH(date_period)"))
            ->get();

        $tariffPerMonth = array();
        $BillAmountPerMonth = array();

        $months = array();
        foreach($db_months as $mn){
            array_push($months, $mn->period);
        }

        foreach($byCallType as $tariff_group){

            if( !isset($tariffPerMonth[$tariff_group->tariff_group])){
                foreach($months as $mn){
                    $tariffPerMonth[$tariff_group->tariff_group][$mn] = 0;
                }
                $tariffPerMonth[$tariff_group->tariff_group]['code_desc'] = $tariff_group->code_desc;
                $tariffPerMonth[$tariff_group->tariff_group]['tariff_group'] = $tariff_group->tariff_group;
                $tariffPerMonth[$tariff_group->tariff_group][$tariff_group->period] += $tariff_group->total;
                $tariffPerMonth[$tariff_group->tariff_group]['total'] = $tariff_group->total;
            }
            else{
                $tariffPerMonth[$tariff_group->tariff_group][$tariff_group->period]+=$tariff_group->total;
                $tariffPerMonth[$tariff_group->tariff_group]['total'] +=$tariff_group->total;
            }

            if(!isset($BillAmountPerMonth[$tariff_group->period])){
                $BillAmountPerMonth[$tariff_group->period] = $tariff_group->total;
            }
            else{
                $BillAmountPerMonth[$tariff_group->period]+=$tariff_group->total;

            }
            if(!isset($BillAmountPerMonth['total'])){
                $BillAmountPerMonth['total'] = $tariff_group->total;
            }
            else{
                $BillAmountPerMonth['total']+=$tariff_group->total;
            }
        }
        $tariffPerMonth = array_values($tariffPerMonth);

        $byCallType = ['fields'=>$months, 'data'=>$tariffPerMonth,'month_total'=>$BillAmountPerMonth ];


        return $byCallType ;
    }

    public function getByPeriod( $param ){

        if($param == 'VnS'){
            $byPeriod = DB::table('lines_connect')
                ->select(DB::raw("id, date_format(date_period,'%M') as period, sum(bill_amount)as total,
                                case when CAST(date_period as time) between '07:00:00.001' and
                                    '18:00:00.000' then 'Day' else 'Night' end as time_period"))
                ->where('tariff_group', '!=', 'GPRS')
                ->groupBy(DB::raw("date_format(date_period,'%M'), case when
                                CAST(date_period as time) between '07:00:00.001' and '18:00:00.000' then 'Day' else 'Night' end"))
                ->orderBy(DB::raw("MONTH(date_period)"))
                ->get();
        }
        else if($param = 'D'){
            $byPeriod = DB::table('lines_connect')
                ->select(DB::raw("id, date_format(date_period,'%M') as period, sum(bill_amount)as total,
                                case when CAST(date_period as time) between '07:00:00.001' and
                                    '18:00:00.000' then 'Day' else 'Night' end as time_period"))
                ->where('tariff_group', 'GPRS')
                ->groupBy(DB::raw("date_format(date_period,'%M'), case when
                                CAST(date_period as time) between '07:00:00.001' and '18:00:00.000' then 'Day' else 'Night' end"))
                ->orderBy(DB::raw("MONTH(date_period)"))
                ->get();
        }else{
            $byPeriod = DB::table('lines_connect')
                ->select(DB::raw("id, date_format(date_period,'%M') as period, sum(bill_amount)as total,
                                case when CAST(date_period as time) between '07:00:00.001' and
                                    '18:00:00.000' then 'Day' else 'Night' end as time_period"))
                ->groupBy(DB::raw("date_format(date_period,'%M'), case when
                                CAST(date_period as time) between '07:00:00.001' and '18:00:00.000' then 'Day' else 'Night' end"))
                ->orderBy(DB::raw("MONTH(date_period)"))
                ->get();
        }

        $time_period = array();
        $month_dt = array();
        $totals = array();
        $totals['sum_total'] = 0;


        foreach($byPeriod as $val){
            if(!in_array($val->time_period, $time_period)){
                array_push($time_period, $val->time_period);
            }

            if(!isset($month_dt[$val->period]['total']))
                $month_dt[$val->period]['total'] = 0;

            if(!isset($month_dt[$val->period][$val->time_period])) {
                $month_dt[$val->period]['period'] = $val->period;
                $month_dt[$val->period][$val->time_period] = $val->total;
            }else{
                $month_dt[$val->period][$val->time_period] += $val->total;
            }

            $month_dt[$val->period]['total'] += $val->total;

            if(!isset($totals[$val->time_period])){
                $totals[$val->time_period] = $val->total;
            }
            else{
                $totals[$val->time_period] += $val->total;
            }
            $totals['sum_total'] += $val->total;
        }
        $month_dt = array_values($month_dt);

        $byPeriod = ['fields'=>$time_period, 'data'=>$month_dt, 'sums'=>$totals];

        return $byPeriod;
    }

    public function getComparative(){

        $other_tariff = [  'SLA', 'MTN', 'ETISALAT', 'AIRTEL', 'GLO' ];

        $SLA_MONTH_DATA = 200; //200GB;
        $OTHER_MONTH_DATA = 1; //1GB for MTN, AIRTEL et al.

        $tariff_rate = [  ['name'=>'ONNET', 'SLA'=>'0.25', 'MTN'=>'0.20', 'ETISALAT'=>'0.12', 'AIRTEL'=>'0.11', 'GLO'=>'0.11' ],
            ['name'=>'LOCAL', 'SLA'=>'0.25', 'MTN'=>'0.26', 'ETISALAT'=>'0', 'AIRTEL'=>'0.11', 'GLO'=>'0.15' ],
            ['name'=>'ZONE1', 'SLA'=>'0.55', 'MTN'=>'0.20', 'ETISALAT'=>'0', 'AIRTEL'=>'0.55', 'GLO'=>'0.13' ],
            ['name'=>'GPRS', 'SLA'=>'150522', 'MTN'=>'2500', 'ETISALAT'=>'1000', 'AIRTEL'=>'1500', 'GLO'=>'1000' ]];

        $byCallType = DB::table('lines_connect')
            ->join('tariff_code', 'tariff_code.tariff_group', '=', 'lines_connect.tariff_group')
            ->select(DB::raw("lines_connect.id, lines_connect.tariff_group, tariff_code.code_desc, count(lines_connect.tariff_group),
                                MONTHNAME(lines_connect.date_period) as period,sum(lines_connect.duration) AS duration,
                                    sum(lines_connect.bill_amount) as bill "))
            ->groupBy(DB::raw("tariff_code.code_desc, MONTHNAME(lines_connect.date_period)"))
            ->orderBy(DB::raw("MONTH(lines_connect.date_period)"))
            ->get();

        $db_months = DB::table('lines_connect')
            ->select(DB::raw("MONTHNAME(date_period) as period"))
            ->distinct()
            ->orderBy(DB::raw("MONTH(date_period)"))
            ->get();

        $tariffPerMonth = array();

        $months = array();
        foreach($db_months as $mn){
            array_push($months, $mn->period);
        }

        foreach($byCallType as $tariff_group){

            if( !isset($tariffPerMonth[$tariff_group->tariff_group])){

                foreach($months as $mn){
                    $tariffPerMonth[$tariff_group->tariff_group][$mn] = 0;
                    $tariffPerMonth[$tariff_group->tariff_group]['_'.$mn] = 0;
                }
                $tariffPerMonth[$tariff_group->tariff_group]['code_desc'] = $tariff_group->code_desc;
                $tariffPerMonth[$tariff_group->tariff_group]['tariff_group'] = $tariff_group->tariff_group;

                $tariffPerMonth[$tariff_group->tariff_group]['bill'] = $tariff_group->bill;
                $tariffPerMonth[$tariff_group->tariff_group]['duration'] = $tariff_group->duration;
            }
            else {

                $tariffPerMonth[$tariff_group->tariff_group]['bill'] += $tariff_group->bill;
                $tariffPerMonth[$tariff_group->tariff_group]['duration'] += $tariff_group->duration;
            }
        }


        $tariffPerMonth = array_values($tariffPerMonth);

        $comparativeResult = array();

        foreach($tariffPerMonth as $tRate){
            foreach($tariff_rate as $nRate){
                if($nRate['name'] != $tRate['tariff_group']){
                    continue;
                }
                else{
                    foreach($other_tariff as $other_tf ){
                        if($nRate['name'] != "GPRS")
                            $comparativeResult[$tRate['tariff_group']][$other_tf] = $nRate[$other_tf] * $tRate['duration'];
                        else{
                            //used SLA as bench work for GPRS
                            if($other_tf == 'SLA'){
                                $comparativeResult[$tRate['tariff_group']][$other_tf] = ($tRate['duration'] / ($SLA_MONTH_DATA * 1024 * 1024 *1024 * 8)) *  $nRate[$other_tf];
                            }else{
                                $comparativeResult[$tRate['tariff_group']][$other_tf] = ($tRate['duration'] / ($OTHER_MONTH_DATA * 1024 * 1024 *1024 * 8)) *  $nRate[$other_tf];
                            }
                        }
                    }
                    $comparativeResult[$tRate['tariff_group']]['bill'] = $tRate['bill'];
                    $comparativeResult[$tRate['tariff_group']]['tariff_group'] = $tRate['tariff_group'];
                    $comparativeResult[$tRate['tariff_group']]['code_desc'] = $tRate['code_desc'];
                }
            }
        }

        $comparativeResult = array_values($comparativeResult);

        $byCallType = ['fields'=>$other_tariff, 'data'=>$comparativeResult];

        return $byCallType ;
    }

} 
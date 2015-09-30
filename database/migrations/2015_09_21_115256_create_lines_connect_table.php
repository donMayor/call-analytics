<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLinesConnectTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('lines_connect', function (Blueprint $table) {
           $table->increments('id');
           $table->string('control_no');
           $table->string('phone_lines');
           $table->timestamp('date_period');
           $table->string('duration');
           $table->string('tariff_group');
           $table->string('charge_type');
           $table->string('destination');
           $table->string('bill_amount');
       });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('lines_connect');
    }
}

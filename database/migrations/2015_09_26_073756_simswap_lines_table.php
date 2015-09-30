<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class SimswapLinesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('simswap_lines', function(Blueprint $table){
            $table->increments('id');
            $table->string('date_period');
            $table->string('reason')->nullable();
            $table->string('phone_lines');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        Schema::drop('simswap_lines');
    }
}

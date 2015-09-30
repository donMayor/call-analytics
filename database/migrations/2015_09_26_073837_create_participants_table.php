<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateParticipantsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('participants', function(Blueprint $table){
            $table->increments('id');
            $table->string('participants');
            $table->string('position')->nullable();;
            $table->string('zone')->nullable();;
            $table->string('lga')->nullable();;
            $table->string('phone_lines')->nullable();;
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
        Schema::drop('participants');
    }
}

<?php

use Illuminate\Database\Seeder;

class LinesConnectTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        echo public_path().' public path';

        DB::unprepared(File::get(public_path()."/lines_connect.sql"));
    }
}

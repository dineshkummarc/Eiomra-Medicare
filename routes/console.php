<?php

use Illuminate\Support\Facades\Artisan;

Artisan::command('medicare:about', function () {
    $this->info('Eiomra MediCare hospital and clinic management system.');
});

<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\PatientController;
use App\Http\Controllers\Api\AppointmentController;

Route::prefix('v1')->group(function () {
    Route::get('/health', fn () => ['status' => 'ok', 'app' => 'Eiomra MediCare']);
    Route::get('/dashboard', [DashboardController::class, 'index']);
    Route::apiResource('/patients', PatientController::class);
    Route::apiResource('/appointments', AppointmentController::class);
});

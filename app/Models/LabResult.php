<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LabResult extends Model
{
    protected $fillable = [
        'patient_id', 'doctor_id', 'test_name', 'sample_no', 'result_summary',
        'result_data', 'status', 'reported_at'
    ];

    protected $casts = [
        'result_data' => 'array',
        'reported_at' => 'datetime'
    ];
}

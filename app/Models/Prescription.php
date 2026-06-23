<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Prescription extends Model
{
    protected $fillable = [
        'patient_id', 'doctor_id', 'prescription_no', 'issued_at',
        'medicines', 'instructions', 'status'
    ];

    protected $casts = [
        'issued_at' => 'date',
        'medicines' => 'array'
    ];
}

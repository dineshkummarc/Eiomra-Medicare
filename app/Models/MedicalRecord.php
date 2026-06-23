<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MedicalRecord extends Model
{
    protected $fillable = [
        'patient_id', 'doctor_id', 'visit_date', 'diagnosis', 'symptoms',
        'treatment_plan', 'vitals', 'allergies', 'notes'
    ];

    protected $casts = [
        'visit_date' => 'date',
        'vitals' => 'array'
    ];

    public function patient(): BelongsTo
    {
        return $this->belongsTo(Patient::class);
    }

    public function doctor(): BelongsTo
    {
        return $this->belongsTo(Doctor::class);
    }
}

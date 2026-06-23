<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Doctor extends Model
{
    protected $fillable = [
        'department_id', 'staff_code', 'name', 'email', 'phone', 'specialty',
        'qualification', 'consultation_fee', 'status'
    ];

    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }
}

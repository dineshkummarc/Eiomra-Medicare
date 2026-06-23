<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Invoice extends Model
{
    protected $fillable = [
        'patient_id', 'invoice_no', 'subtotal', 'discount', 'tax', 'total',
        'paid_amount', 'balance', 'payment_status', 'due_date'
    ];

    protected $casts = ['due_date' => 'date'];

    public function patient(): BelongsTo
    {
        return $this->belongsTo(Patient::class);
    }
}

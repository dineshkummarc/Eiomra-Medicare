<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Medication extends Model
{
    protected $fillable = [
        'sku', 'name', 'category', 'unit', 'stock_quantity', 'reorder_level',
        'selling_price', 'expiry_date', 'status'
    ];

    protected $casts = ['expiry_date' => 'date'];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StaffRole extends Model
{
    protected $fillable = ['name', 'description', 'permissions', 'status'];

    protected $casts = ['permissions' => 'array'];
}

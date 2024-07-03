<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sms extends Model
{
    use HasFactory;

    protected $fillable=[
        'name' ,
        'temp_name' ,
        'dropdown_type' ,
        'status'
    ];
}

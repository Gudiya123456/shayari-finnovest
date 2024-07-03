<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    // protected $gaurded=[];
   protected $fillable=[
    'p_name',
    'p_type',
    'amount',
    'duration',
    'status'
   ];

}

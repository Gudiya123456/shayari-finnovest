<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{
    use HasFactory;
    // protected $gaurded=[];
    protected $fillable=[
      'owner',
      'first_name',
      'last_name',
      'email',
      'phone',
      'second_phone',
      'invest',
      'first_trial',
      'second_trial',
      'followup',
      'source',
      'dnd',
      'city',
      'state',
      'product',
      'description',
      'kyc_status',
      'rp_status',
      'status'
    ];

}

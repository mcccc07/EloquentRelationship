<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Seller;

class Profile extends Model
{
    public function seller()
    {
        return $this->belongsTo(Seller::class);
    }
}

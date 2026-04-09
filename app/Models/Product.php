<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Seller;
use App\Models\OrderItem;
use App\Models\Review;

class Product extends Model
{
    public function sellers()
    {
        return $this->belongsToMany(Seller::class, 'seller_product')
            ->withPivot('stock', 'price')
            ->withTimestamps();
    }
    public function orders()
    {
        return $this->hasMany(OrderItem::class);
    }
    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
}

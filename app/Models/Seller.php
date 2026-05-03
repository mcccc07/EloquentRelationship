<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Product;
use App\Models\Order;
use App\Models\Review;
use App\Models\Profile;

class Seller extends Model
{
    protected $fillable = [
        'shop_name', 
        'user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function profile()
    {
        return $this->hasOne(Profile::class);
    }

    public function products()
    {
        return $this->belongsToMany(Product::class, 'seller_product')
            ->withPivot('stock', 'price')
            ->withTimestamps();
    }
   
    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function reviews()
    {
        return $this->hasManyThrough(Review::class, Product::class);
    }
}
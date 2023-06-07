<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    public function category(){
        return $this->belongsTo(Category::class);
    }

    public function brand(){
        return $this->belongsTo(Brand::class);
    }


    public function wishlist(){
        return $this->belongsToMany(
            User::class,
            'wishlists'
        )->withPivot('date')
        ->withTimestamps();
    }

    public function cart(){
        return $this->belongsToMany(
            User::class,
            'carts'
        )->withPivot('date')
        ->withTimestamps();
    }
    
    public function purchase(){
        return $this->belongsToMany(
            User::class,
            'purchases'
        )
        ->withPivot('date')//
        ->withTimestamps();
    }
}

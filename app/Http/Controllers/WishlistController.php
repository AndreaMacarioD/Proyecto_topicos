<?php

namespace App\Http\Controllers;

use App\Models\Wishlist;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class WishlistController extends Controller
{
    public function deleteWish($id){
        Wishlist::where('user_id',$id)->delete();
    }

    public function deleteProduct($id){
        $s = Wishlist::find($id);
        $s -> delete();
    }

}

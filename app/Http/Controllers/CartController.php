<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function clearCart($id)
    {
        Cart::where('user_id', $id)->delete();
    }

    public function delete($id){
        $s = Cart::find($id);
        $s -> delete();
    }
}

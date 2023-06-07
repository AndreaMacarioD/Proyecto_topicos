<?php

namespace App\Http\Controllers;

use App\Models\Address;
use Illuminate\Http\Request;

class AddressController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'address' => 'required|regex:/^[a-zA-Z0-9\s\.]+$/|max:100',
            'user_id' => 'required'                
        ]);
        $address = new Address();
        $address->address = $request->address;
        $address->user_id = $request->user_id;
        $address->save();
    }
    
    public function show($user_id)
    {
        $address = Address::where('user_id', $user_id)->get();
        $ad = [];
        foreach($address as $add){
            $ad[] = [
                'id' => $add->id,
                'address' => $add->address
            ];
        }
        return response()->json($ad);
    }

    public function delete($id)
    {
        Address::find($id)->delete();
    }
}

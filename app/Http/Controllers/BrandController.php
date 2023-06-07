<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Http\Request;

class BrandController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|max:255',
        ]);
        $brand = new Brand();
        $brand->name = $request->name;
        $brand->save();
    }

    public function show()
    {
        $brands = [];
        foreach(Brand::all() as $cat){
            $brands[] = [
                "id" => $cat->id,
                "name" => $cat->name,
            ];
        }
        return response()->json($brands);
    }
    
    public function delete($id)
    {
        $brand = Brand::find($id);
        $brand-> delete();
    }
}

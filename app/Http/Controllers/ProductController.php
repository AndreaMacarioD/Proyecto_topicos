<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Brand;
use App\Models\Category;
use Illuminate\Support\Carbon;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|max:255',
            'relase' => 'required|date_format:Y-m-d',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg',
            'price' => 'required|numeric|min:1',
            'description' => 'required|min:10',
            'quantity' => 'required|numeric',
            'deliverTime' => 'required|numeric|min:1',
            'category_id' => 'required|numeric|min:1',
            'brand_id' => 'required|numeric|min:1',
        ]);

        $img = 'product-' . $request->name . '-' . now()->format('YmdHis') .'.' . $request->file('image')->getClientOriginalExtension();

        $product = new Product();
        $product->name = $request->name;
        $product->relase = $request->relase;
        $product->price = $request->price;
        $product->description = $request->description;
        $product->quantity = $request->quantity;
        $product->image = $request->file('image')->move('imagesP/', $img, 'public');
        $product->deliverTime = $request->deliverTime;
        $product->category_id = $request->category_id;
        $product->brand_id = $request->brand_id;
        $product->save();
    }

    public function show($id)
    {
        $product = Product::find($id);
        $p = [];
        $p[] = [
            'id' => $product->id,
            'name' => $product->name,
            'relase' => $product->relase,
            'price' => $product->price,
            'rate' => $product->rate,
            'description' => $product->description,
            'quantity' => $product->quantity,
            'image' => $product->image,
            'deliverTime' => $product->deliverTime,
            'category_name' => Category::find($product->category_id)->name,
            'category_id' => $product->category_id,
            'brand_name' => Brand::find($product->brand_id)->name,
            'brand_id' => $product->brand_id,
        ];
        return response()->json($p);
    }

    public function showAll()
    {
        $products = Product::where('enable', true)->get();
        $p = [];
        foreach ($products as $product) {
            $p[] = [
                'id' => $product->id,
                'name' => $product->name,
                'relase' => $product->relase,
                'price' => $product->price,
                'description' => $product->description,
                'quantity' => $product->quantity,
                'image' => $product->image,
                'deliverTime' => $product->deliverTime,
                'category_name' => Category::find($product->category_id)->name,
                'category_id' => $product->category_id,
                'brand_name' => Brand::find($product->brand_id)->name,
                'brand_id' => $product->brand_id,
            ];
        }
        return response()->json($p);
    }

    public function update(Request $request)
    {
        $request->validate([    
            'name' => 'max:255',
            'relase' => 'required|date_format:Y-m-d',
            'image' => 'image|mimes:jpeg,png,jpg,gif,svg',
            'price' => 'numeric|min:1',
            'description' => 'min:10',
            'quantity' => 'numeric',
            'deliverTime' => 'numeric|min:1',
            'category_id' => 'numeric|min:1',
            'brand_id' => 'numeric|min:1',
        ]);

        $img = 'product-' . $request->product_id . '-' . now()->format('YmdHis') .'.' . $request->file('image')->getClientOriginalExtension();

        $product = Product::find($request->product_id);
        $product->name = $request->name ?? $product->name;
        $product->relase = $request->relase ?? $product->relase;
        $product->image = $request->file('image')->move('imagesP/', $img, 'public') ?? $product->name;
        $product->price = $request->price ?? $product->price;
        $product->description = $request->description ?? $product->description;
        $product->quantity = $request->quantity ?? $product->quantity;
        $product->deliverTime = $request->deliverTime ?? $product->deliverTime;
        $product->category_id = $request->category_id ?? $product->category_id;
        $product->brand_id = $request->brand_id ?? $product->brand_id;
        $product->save();
    }

    public function delete($id)
    {
        $product = Product::find($id);
        $product->delete();
        return response('deleted');
    }
}

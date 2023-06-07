<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|max:255',
        ]);
        $category = new Category();
        $category->name = $request->name;
        if ($request->category_id) {
            $category->category_id = $request->category_id;
        }

        $category->save();
    }

    public function show()
    {
        $categories = [];
        foreach(Category::all() as $cat){
            $categories[] = [
                "id" => $cat->id,
                "name" => $cat->name,
            ];
        }
        return response()->json($categories);
    }
    
    public function delete($id)
    {
        $category = Category::find($id);
        $category->delete();
    }
}

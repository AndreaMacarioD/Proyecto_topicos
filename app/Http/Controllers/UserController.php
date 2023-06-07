<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Password;
use App\Models\Product;
use App\Models\Category;
use App\Models\Brand;
use App\Models\User;

class UserController extends Controller
{
    public function register(Request $request){
        $request->validate([
            'name' => 'required|alpha|max:100',
            'last_name' => 'required|alpha|max:100',
            'birth' => 'required|date_format:Y-m-d',
            'gender' => 'required',
            'phone' => 'required|max:10|regex:/^[0-9()+-]+$/',
            'email' => 'required|email',
            'password' => ['required', Password::min(8)->mixedCase()->numbers()]
        ]);
        
        $user=User::create([
            'name'=>$request->name,
            'last_name'=>$request->last_name,
            'birth'=>$request->birth,
            'gender'=>$request->gender,
            'phone'=>$request->phone,
            'email'=>$request->email,
            'password'=>bcrypt($request->password)
        ]);
        
        $token = $user->createToken('LaravelAuthApp')->accessToken;
        return response()->json(['token' => $token, 'user' => $user], 200);
    }
    
    public function login(Request $request){
        
        if (Auth::attempt(['email'=>$request->email, 'password'=>$request->password])){
            /** @var \App\Models\MyUserModel $user **/
            $user = Auth::user();
            $responseArray = [];
            $responseArray['token'] = $user->createToken('MyApp')->accessToken;
            $responseArray['user'] = $user;
            return response()->json($responseArray, 200);
        } else {
            return response()->json(['error'=>'Unauthorised'], 203);
        }
    }

    public function show($id)
    {
        return response()->json(User::find($id));
    }

    public function addImg(Request $request)
    {
        $request->validate([
            'user_id' => 'required',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg',
        ]);

        $img = 'user-' . $request->user_id . '-' . now()->format('YmdHis') .'.' . $request->file('image')->getClientOriginalExtension();

        $user = User::find($request->user_id);
        $user->image = $request->file('image')->move('imagesU/', $img, 'public');
        $user->save();
    }

    public function buyProduct(Request $request)
    {
        $request->validate([
            'user_id' => 'required|numeric',
            'product_id' => 'required|numeric',
        ]);
        $user = User::find($request->user_id); 
        $product = Product::find($request->product_id);
        if ($product->quantity == 1) { 
            $product->quantity = $product->quantity - 1;
            $product->enable = false;
            $product->save();
        } elseif ($product->quantity > 0) {
            $product->quantity = $product->quantity - 1;
            $product->save();
        }
        $user->purchase()->attach($request->product_id, ['date' => now()]);
    }

    public function purchases($user_id)
    {
        $user = User::find($user_id);
        $pro = [];
        foreach ($user->purchase as $product) {
            $pro[] = [
                'product_id' => $product->id,
                'name' => $product->name, 
                'price' => $product->price,
                'description' => $product->description,
                'date_of_buy' => $product->pivot->date,
                'image' => $product->image,
                'category' => Category::find($product->category_id)->name,
                'brand' => Brand::find($product->brand_id)->name
            ];
        }
        return response()->json($pro);
    }

    public function addCart(Request $request){
        $request->validate([
            'user_id' => 'required|numeric',
            'product_id' => 'required|numeric',
        ]);
        $user = User::find($request->user_id);
        $user->cart()->attach($request->product_id, ['date' => now()]);
    }

    public function showCart($user_id){
        $user = User::find($user_id);
        $pro = [];
        foreach($user->cart as $product){
            $pro [] = [
                'id' => $product->pivot->id,
                'product_id' => $product->id,
                'price' => $product->price,
                'description' => $product->description,
                'name' => $product->name,
                'date' => $product->pivot->date,
                'image' => $product->image,
                'category' => Category::find($product->category_id)->name,
                'brand' => Brand::find($product->brand_id)->name
            ];
        }
        return response()->json($pro);
    }

    public function addWish(Request $request){
        $request->validate([
            'user_id' => 'required|numeric',
            'product_id' => 'required|numeric',
        ]);
        $user = User::find($request->user_id);
        $user->wishlist()->attach($request->product_id, ['date' => now()]);
    }

    public function showWish($user_id){
        $user = User::find($user_id);
        $p = [];
        foreach($user->wishlist as $product){
            $p [] = [
                'id' => $product->pivot->id,
                'product_id' => $product->id,
                'price' => $product->price,
                'description' => $product->description,
                'name' => $product->name,
                'date' => $product->pivot->date,
                'image' => $product->image,
                'category' => Category::find($product->category_id)->name,
                'brand' => Brand::find($product->brand_id)->name
            ];
        }
        return response()->json($p);
    }

}

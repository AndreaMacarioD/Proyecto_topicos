<?php


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\WishlistController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\AddressController;
use App\Http\Controllers\BrandController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//((Sin token))//

//Registro
Route::post('/register', [UserController::class, 'register']);

//Inicio de Sesion
Route::post('/login', [UserController::class, 'login']);

//Mostrar Productos
Route::get('/showProducts', [ProductController::class, 'showAll']);

//Mostrar Producto especifico
Route::get('/specificProduct/{id}', [ProductController::class, 'show']);

//Mostrar Category
Route::get('/showCategories', [CategoryController::class, 'show']);

//Mostrar Brand
Route::get('/showBrand', [BrandController::class, 'show']);



//((Con token))//

Route::middleware('auth:api')->group(function () {
    //Agregar cuando estén listas 
    //(UserController)
    //Mostrar Usuario
    Route::get('/showUser/{id}', [UserController::class, 'show']);

    //Agregar Imagen a Usuario
    Route::post('/addImg', [UserController::class, 'addImg']);

    //Comprar Producto
    Route::post('/buyProduct', [UserController::class, 'buyProduct']);

    //Purchases
    Route::get('/purchases/{user_id}', [UserController::class, 'purchases']);

    //Agregar Cart
    Route::post('/addCart', [UserController::class, 'addCart']);

    //Mostrar Cart
    Route::get('showCart/{user_id}', [UserController::class, 'showCart']);

    //Agregar Wishlist
    Route::post('/addWish', [UserController::class, 'addWish']);

    //Mostrar Wishlist
    Route::get('/showWish/{user_id}', [UserController::class, 'showWish']);


    //(WishlistController)
    //Eliminar Producto de Wishlist
    Route::delete('deleteWishProduct/{id}', [WishlistController::class, 'deleteProduct']);

    //Eliminar Wishlist
    Route::delete('deleteWish/{id}', [WishlistController::class, 'deleteWish']);


    //(CartController)
    //Limpia el Cart de User
    Route::delete('clearCart/{id}', [CartController::class, 'clearCart']);

    //Elimina el Product de Cart de User
    Route::delete('deleteProductCart/{id}', [CartController::class, 'delete']);


    //(AddressController)
    //Agregar Address
    Route::post('/addAddress', [AddressController::class, 'store']);

    //Mostrar Address
    Route::get('/showAddress/{user_id}', [AddressController::class, 'show']);

    //Eliminar Address
    Route::delete('deleteAddress/{id}', [AddressController::class, 'delete']);


    //(BrandController)
    //Agregar Brand
    Route::post('/addBrand', [BrandController::class, 'store']);

    //Eliminar Brand
    Route::delete('/deleteBrand/{id}', [BrandController::class, 'delete']);

    


    //(CategoryController)
    //Agregar Category
    Route::post('/storeCategory', [CategoryController::class, 'store']);

    //Eliminar Category
    Route::delete('/deleteCategory/{id}', [CategoryController::class, 'delete']);


    //(ProductController)
    //Agregar Product
    Route::post('/storeProduct', [ProductController::class, 'store']); //Ok (checar que la /products jale o cambiarla a images)

    //Eliminar Product
    Route::delete('/deleteProduct/{id}', [ProductController::class, 'delete']); //Ok

    //Actualizar Product
    Route::post('/updateProduct', [ProductController::class, 'update']);
});

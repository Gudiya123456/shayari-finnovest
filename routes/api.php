<?php

use App\Http\Controllers\DropdownController;
use App\Http\Controllers\LeadController;
use App\Http\Controllers\NotificationSettingController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\RegisterdController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\SmsController;
use App\Http\Controllers\UserAuthController;
use App\Http\Controllers\WhatsappController;
use App\Models\NotificationSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::POST('login',[UserAuthController::class,'login']);

Route::GET('settings',[SettingController::class,'index'])->middleware('auth:sanctum');
// Route::POST('settings/{id}',[SettingController::class,'update']);
Route::POST('settings/{id}',[SettingController::class,'update'])
  ->middleware('auth:sanctum');

Route::GET('products',[ProductController::class,'index'])->middleware('auth:sanctum');
Route::POST('products',[ProductController::class,'store'])->middleware('auth:sanctum');
Route::POST('products/{product}',[ProductController::class,'update'])->middleware('auth:sanctum');
Route::DELETE('products/{id}',[ProductController::class,'destroy'])->middleware('auth:sanctum');
// Route::DELETE('products',[ProductController::class,'destroy'])->middleware('auth:sanctum');

Route::GET('register', [RegisterdController::class,'index'])->middleware('auth:sanctum');

Route::GET('leads',[LeadController::class, 'index'])->middleware('auth:sanctum');
Route::POST('leads',[LeadController::class, 'store'])->middleware('auth:sanctum');
Route::POST('leads/{lead}',[LeadController::class, 'update'])->middleware('auth:sanctum');
Route::DELETE('leads/{id}',[LeadController::class, 'destroy'])->middleware('auth:sanctum');

Route::GET('notification', [NotificationSettingController::class, 'index'])->middleware('auth:sanctum');
Route::POST('notification/{id}', [NotificationSettingController::class, 'update'])->middleware('auth:sanctum');

Route::GET('whatsapps',[WhatsappController::class,'index'])->middleware('auth:sanctum');
Route::POST('whatsapps',[WhatsappController::class,'store'])->middleware('auth:sanctum');
Route::POST('whatsapps/{whatsapp}',[WhatsappController::class,'update'])->middleware('auth:sanctum');
Route::DELETE('whatsapps/{id}',[WhatsappController::class,'destroy'])->middleware('auth:sanctum');

Route::GET('sms',[SmsController::class,'index'])->middleware('auth:sanctum');
Route::POST('sms',[SmsController::class,'store'])->middleware('auth:sanctum');
Route::POST('sms/{sms}',[SmsController::class,'update'])->middleware('auth:sanctum');
Route::DELETE('sms/{id}',[SmsController::class,'destroy'])->middleware('auth:sanctum');

Route::GET('dropdowns',[DropdownController::class,'index'])->middleware('auth:sanctum');
Route::POST('dropdowns',[DropdownController::class,'store'])->middleware('auth:sanctum');
Route::POST('dropdowns/{dropdown}',[DropdownController::class,'update'])->middleware('auth:sanctum');
Route::DELETE('dropdowns/{id}',[DropdownController::class,'destroy'])->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

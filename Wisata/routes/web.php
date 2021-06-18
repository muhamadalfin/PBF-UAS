<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::view('/users', 'app');
Route::view('/user/edit/{id}', 'app');
Route::view('/user/{id}', 'app');
Route::view('/user/login', 'app');

Route::view('/articles', 'app');
Route::view('/article/edit/{id}', 'app');
Route::view('/article/{id}', 'app');
Route::view('/', 'app');
Route::view('/{path}', 'app');


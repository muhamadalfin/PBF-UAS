<?php
 
use Illuminate\Support\Facades\Route;
 
Route::get('/articles', 'ArticleController@index');
Route::post('/article/store', 'ArticleController@store');
Route::get('/article/edit/{id}', 'ArticleController@getArticle');
Route::get('/article/{id}', 'ArticleController@getArticle');
Route::put('/article/{id}', 'ArticleController@update');
Route::delete('/article/delete/{id}', 'ArticleController@delete');

Route::get('/users', 'UserController@index');
Route::post('/user/registrasi', 'UserController@registrasi');
Route::post('/user/login', 'UserController@login');
Route::get('/user/login', 'UserController@login');
Route::delete('/user/delete/{id}', 'UserController@delete');
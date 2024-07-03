<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use Illuminate\Http\Request;

class BannerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        // return 123;

       $banner= Banner::get();
       return response()->json(['status'=>'success','banners'=>$banner]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

      if($request->id) return $this->update($request);

        $banner=new Banner();
        $banner->name=$request->name;

        $banner->status=$request->status;
        if ($request->image) {
            $banner->image ='storage/'. $request->file('image')->storeAs('banner', time() . '.' . $request->file('image')->getClientOriginalExtension());
        }
        $banner->save();
        return response()->json(['message'=>'Banner created', 'status'=>'success', 'data'=>$banner]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Banner $banner)
    {
        //
        return response()->json(['banner'=>$banner]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Banner $banner)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update($request)
    {
        $banner=Banner::find($request->id);
        $banner->name=$request->name;
        if ($request->image) {
            $banner->image ='storage/'. $request->file('image')->storeAs('banner', time() . '.' . $request->file('image')->getClientOriginalExtension());
        }
        $banner->status=$request->status;

        $banner->save();
        return response()->json([
            'message'=>'Banner Updated',
            'status'=>'success',
            'data'=>$banner
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Banner $banner)
    {
        $banner->delete();
        return response()->json([
            'message'=>'deleted successfully', 'status'=>'success',
        ]);
    }
}



Route::get('/banners',[ BannerController::class,'index']);
Route::post('/banners', [BannerController::class,'store']);
Route::get('/banners/{banner}',[BannerController::class,'show']);
Route::post('/banners/{banner}', [BannerController::class, 'update']);
Route::delete('/banners/{banner}',[BannerController::class,'destroy']);

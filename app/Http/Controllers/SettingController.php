<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $setting = Setting::first();
        return response()->json(['status' => 'success', 'setting' => $setting]);
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

        // $setting=Setting::first();
        // if(!$setting) $result= Setting::create($validated);
        // $result=$setting->update($validated);
        // if($result) return response()->json(['status'=>'success', 'setting'=>$setting, 'message'=>'Updated Successfuuly']);
        // return response()->json(['status'=>'error', 'title'=>'failed', 'message'=>'Failed']);

    }

    /**
     * Display the specified resource.
     */
    public function show(Setting $setting)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Setting $setting)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */

    //  public function update(array $data,$id){
    //     return Product::whereId($id)->update($data);
    //  }
    public function update(Request $request , $id)
    {
        $validated = $request->validate([
            'name' => 'required',
            'email' => 'required',
            'account' => 'required',
            'complaince' => 'required',
            'ip' => 'required',
            'contact' => 'required',
            'status' => 'required',
            'image' => 'nullable',
            'fav_icons' => 'nullable',

        ]);
        $setting=$validated;

        $setting=Setting::first();
        $setting->name=$request->name;
        $setting->email=$request->email;
        $setting->account=$request->account;
        $setting->complaince=$request->complaince;
        $setting->ip=$request->ip;
        $setting->contact=$request->contact;
        $setting->status=$request->status;
        if ($request->image) {
            $setting->image ='storage/'. $request->file('image')->storeAs('setting', time() . '.' . $request->file('image')->getClientOriginalExtension());
        }
        if ($request->fav_icons) {
            $setting->fav_icons ='storage/'. $request->file('fav_icons')->storeAs('setting', time() . '.' . $request->file('image')->getClientOriginalExtension());
        }



        $setting->save();
        return response()->json([
            'message'=>'Setting Updated',
            'status'=>'success',
            'complainceupdates'=>$setting
        ]);
        // $setting = $validated;
        // $setting = Setting::first();
        // $setting->save();

        // return response()->json(['status' => 'success', 'message' => 'updated successfully', 'setting' => $setting]);


        // $setting = $validated;
        // $setting = Setting::first();
        // $setting->save();

        // return response()->json(['status' => 'success', 'message' => 'updated successfully', 'setting' => $setting]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Setting $setting)
    {
        //
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\NotificationSetting;
use Illuminate\Http\Request;

class NotificationSettingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

       $notification=NotificationSetting::first();
       return response()->json(['status'=>'success', 'notification'=>$notification]);
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(NotificationSetting $notificationSetting)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(NotificationSetting $notificationSetting)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'from_name' => 'required',
            'from_email' => 'required',
            'mail_queue' => 'required',
            'mail_driver' => 'required',
            'mail_port' => 'required',
            'mail_encryption' => 'required',
            'mail_host' => 'required',
            'mail_password' => 'required',
            'mail_username' => 'required',
        ]);
        $notification=$validated;

        $notification=NotificationSetting::first();
        $notification->from_name=$request->from_name;
        $notification->from_email=$request->from_email;
        $notification->mail_queue=$request->mail_queue;
        $notification->mail_driver=$request->mail_driver;
        $notification->mail_port=$request->mail_port;
        $notification->mail_encryption=$request->mail_encryption;
        $notification->mail_host=$request->mail_host;
        $notification->mail_password=$request->mail_password;
        $notification->mail_username=$request->mail_username;






        $notification->save();
        return response()->json([
            'message'=>'notification Updated',
            'status'=>'success',
            'mail_driverupdates'=>$notification
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(NotificationSetting $notificationSetting)
    {
        //
    }
}

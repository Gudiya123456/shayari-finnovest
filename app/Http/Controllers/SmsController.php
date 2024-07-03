<?php

namespace App\Http\Controllers;

use App\Models\Sms;
use Illuminate\Http\Request;

class SmsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sms = Sms::get();
        return response()->json(['status' => 'success', 'sms' => $sms]);
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

        if ($request->id) return $this->update($request);
        $validated = $request->validate([
            'name' => 'required',
            'temp_name' => 'required',
            'dropdown_type' => 'required',
            'status' => 'required'
        ]);
        $created = Sms::create($validated);
        if ($created) return response()->json([
            'status' => 'success',
            'message' => 'Products Created Successfully',
            'product' => $created
        ]);
        return response()->json([
            'status' => 'success',
            'message' => 'Failed'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Sms $sms)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Sms $sms)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $sms = Sms::find($request->id);
        $validated = $request->validate([
            'name' => 'required',
            'temp_name' => 'required',
            'dropdown_type' => 'required',
            'status' => 'required'
        ]);
        $updated = $sms->update($validated);
        if ($updated) return response()->json([
            'status' => 'success',
            'message' => 'sms Updated Successfully',
            'product' => $sms
        ]);
        return response()->json([
            'status' => 'success',
            'message' => 'Failed'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Sms $sms, $id)
    {
        $sms = Sms::find($id);

        if (!$sms) return response()->json(['status' => 'error', 'message' => 'sms not found']);
        if ($sms->delete()) return response()->json([
            'message' => 'deleted successfully', 'status' => 'success',
        ]);
        return response()->json(['status' => 'success', 'message' => 'Failed to delete banner!']);
    }
}

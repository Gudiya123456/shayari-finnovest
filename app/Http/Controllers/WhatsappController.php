<?php

namespace App\Http\Controllers;

use App\Models\Whatsapp;
use Illuminate\Http\Request;

class WhatsappController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       $whatsapp=Whatsapp::get();
       return response()->json(['status'=>'success', 'whatsapp'=>$whatsapp]);
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

       $validated=$request->validate([

      'name'=>'required',
      'temp_name'=>'required',
      'status'=>'required|boolean',
       ]);

       $created=Whatsapp::create($validated);
       if($created) return response()->json([
        'status'=>'success',
        'message'=>'Whatsapp Created Successfully',
        'whatsapp'=>$created

       ]);

       return response()->json([
        'status'=>'error',
        'message'=>'failed'
       ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Whatsapp $whatsapp)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Whatsapp $whatsapp)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update($request)
    {
        $whatsapp=Whatsapp::find($request->id);
        $validated=$request->validate([
            'name'=>'required',
            'temp_name'=>'required',
            'status'=>'required'
        ]);
       $updated=$whatsapp->update($validated);
        if($updated) return response()->json([
             'status'=>'success',
             'message'=>'Products Updated Successfully',
             'product'=> $whatsapp
         ]);
         return response()->json([
             'status'=>'success',
             'message'=>'Failed'
         ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Whatsapp $whatsapp , $id)
    {
        $whatsapp=Whatsapp::find($id);

        if(!$whatsapp) return response()->json(['status' => 'error', 'message' => 'whatsapp not found']);
         if( $whatsapp->delete()) return response()->json([
             'message'=>'deleted successfully', 'status'=>'success',
         ]);
         return response()->json(['status' => 'success', 'message' => 'Failed to delete banner!']);
    }
}

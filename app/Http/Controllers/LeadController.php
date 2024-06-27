<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use Illuminate\Http\Request;

class LeadController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
    //    return 'heloooo gudiya jiii';
    $leads=Lead::get();
    return response()->json(['status'=>'success', 'leads'=>$leads]);
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
        'email'=>'required|email',
        'mobile'=>'required',
        'status'=>'required|boolean',
        'source'=>'required'
       ]);
       $leads=$validated;
       $leads->save();
       return response()->json(['status'=>'sucess','message'=>'Leads added sucessfully', 'leads'=>$leads]);
    }


    /**
     * Display the specified resource.
     */
    public function show(Lead $lead)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Lead $lead)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update($request)
    {

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Lead $lead)
    {
        //
    }
}

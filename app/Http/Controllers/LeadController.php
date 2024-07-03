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
        $leads = Lead::get();
        return response()->json(['status' => 'success', 'leads' => $leads]);
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
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required',
            'phone' => 'required',
            'second_phone' => 'required',
            'invest' => 'required',
            'first_trial' => 'required',
            'second_trial' => 'required',
            'followup' => 'required',
            // 'source' => 'required',
            'dnd' => 'required',
            'city' => 'required',
            'state' => 'required',
            'product' => 'required',
            'description' => 'required',
            'status' => 'required',
        ]);

        $created = Lead::create($validated);
        if ($created) return response()->json([
            'status' => 'success',
            'message' => 'Leads Created Successfully',
            'lead' => $created

        ]);

        return response()->json([
            'status' => 'error',
            'message' => 'failed'
        ]);

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
        $lead = Lead::find($request->id);
        $validated = $request->validate([
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required',
            'phone' => 'required',
            'second_phone' => 'required',
            'invest' => 'required',
            'first_trial' => 'required',
            'second_trial' => 'required',
            'followup' => 'required',
            // 'source' => 'required',
            'dnd' => 'required',
            'city' => 'required',
            'state' => 'required',
            'product' => 'required',
            'description' => 'required',
            'status' => 'required',
        ]);
        $updated = $lead->update($validated);
        if ($updated) return response()->json([
            'status' => 'success',
            'message' => 'Leads updated Successfully',
            'lead' => $updated
        ]);

        return response()->json([
            'status' => 'error',
            'message' => 'failed'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Lead $lead , $id)
    {
        $lead=Lead::find($id);
        if(!$lead) return response()->json(['status' => 'error', 'message' => 'lead not found']);
         if( $lead->delete()) return response()->json([
             'message'=>'deleted successfully', 'status'=>'success',
         ]);
         return response()->json(['status' => 'success', 'message' => 'Failed to delete lead!']);
    }
}

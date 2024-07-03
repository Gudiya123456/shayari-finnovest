<?php

namespace App\Http\Controllers;

use App\Models\Dropdown;
use Illuminate\Http\Request;

class DropdownController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $dropdown = Dropdown::get();
        return response()->json(['status' => 'success', 'dropdown' => $dropdown]);
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
            'dropdown_type' => 'required',
            'value' => 'required',
            'status' => 'required',
        ]);

        $created = Dropdown::create($validated);
        if ($created) return response()->json([
            'status' => 'success',
            'message' => 'Dropdown Created Successfully',
            'dropdown' => $created

        ]);

        return response()->json([
            'status' => 'error',
            'message' => 'failed'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Dropdown $dropdown)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Dropdown $dropdown)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update($request)
    {
        $dropdown = Dropdown::find($request->id);
        $validated = $request->validate([
            'dropdown_type' => 'required',
            'value' => 'required',
            'status' => 'required',
        ]);
        $updated = $dropdown->update($validated);
        if ($updated) return response()->json([
            'status' => 'success',
            'message' => 'dropdowns updated Successfully',
            'dropdown' => $updated
        ]);

        return response()->json([
            'status' => 'error',
            'message' => 'failed'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Dropdown $dropdown , $id)
    {
        $dropdown=Dropdown::find($id);
        if(!$dropdown) return response()->json(['status' => 'error', 'message' => 'dropdown not found']);
         if( $dropdown->delete()) return response()->json([
             'message'=>'deleted successfully', 'status'=>'success',
         ]);
         return response()->json(['status' => 'success', 'message' => 'Failed to delete dropdown!']);
    }
}

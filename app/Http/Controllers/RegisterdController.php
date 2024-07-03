<?php

namespace App\Http\Controllers;

use App\Models\Registerd;
use Illuminate\Http\Request;

class RegisterdController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $register=Registerd::get();
        return response()->json([
            'status'=>'success',
            'register'=>$register
        ]);
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
    public function show(Registerd $registerd)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Registerd $registerd)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Registerd $registerd)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Registerd $registerd)
    {
        //
    }
}

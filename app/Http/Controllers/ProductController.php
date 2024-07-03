<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $product=Product::get();
        return response()->json(['status'=>'success','product'=>$product]);
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
            'p_name'=>'required',
            'p_type'=>'required',
            'amount'=>'required',
            'duration'=>'required',
            'status'=>'required'
        ]);
        $created=Product::create($validated);
       if($created) return response()->json([
            'status'=>'success',
            'message'=>'Products Created Successfully',
            'product'=> $created
        ]);
        return response()->json([
            'status'=>'success',
            'message'=>'Failed'
        ]);


    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */


    public function update($request)
    {
        $product=Product::find($request->id);
        $validated=$request->validate([
            'p_name'=>'required',
            'p_type'=>'required',
            'amount'=>'required',
            'duration'=>'required',
            'status'=>'required'
        ]);
       $updated=$product->update($validated);
        if($updated) return response()->json([
             'status'=>'success',
             'message'=>'Products Updated Successfully',
             'product'=> $product
         ]);
         return response()->json([
             'status'=>'success',
             'message'=>'Failed'
         ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product, $id)
    {
        $product=Product::find($id);

       if(!$product) return response()->json(['status' => 'error', 'message' => 'Product not found']);
        if( $product->delete()) return response()->json([
            'message'=>'deleted successfully', 'status'=>'success',
        ]);
        return response()->json(['status' => 'success', 'message' => 'Failed to delete banner!']);

    }
}

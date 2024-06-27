<?php

namespace App\Http\Controllers\Console;

use App\Http\Controllers\Controller;
use App\Models\Restaurant;
use App\Models\Tenant;
use App\Models\Tenant\Branch;
use App\Models\Tenant\Item;
use App\Models\Tenant\RestaurantActivity;
use App\Models\Tenant\User;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class RestaurantController extends Controller
{
    public function index()
    {
          $restaurants = Restaurant::select('id', 'restaurant_name','fav_icon', 'admin_email', 'admin_phone', 'no_of_branches', 'status')->latest()->get();

        $timeZones = [
            'INDIA' => ['Asia/Kolkata'],
            'USA'   => ['America/Adak', 'America/Araguaina', 'America/Anchorage'],
            'UAE'   => ['Asia/Dubai'],
        ];
        $countries = ['INDIA', 'UAE', 'USA'];
        return response()->json(['status' => 'success', 'restaurants' => $restaurants, 'timeZones' => $timeZones, 'countries' => $countries]);
    }



    public function store(Request $request)
    {
        if ($request->id) return $this->update($request);

        $validated = $request->validate([
            'app_name' => 'required|string|max:100|unique:restaurants,app_name',
            'restaurant_name' => 'required|string|max:250',
            'no_of_branches' => 'required|integer',
            'admin_name' => 'required|string|max:200',
            'admin_email' => 'required|email|max:200',
            'admin_phone' => 'required|max:200',
            'mode'  => 'required|boolean', //TRUE => LIVE | MAINT
            'status' => 'required|boolean', //true=>ACTIVE | BLOCKED
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'fav_icon' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);
        $validated['password'] =  Hash::make($validated['admin_phone']);
        $validated['app_name'] = Str::slug($request->app_name);

        $branchValidated = $request->validate([
            'branch_name' => 'required|string|max:250',
            'branch_email' => 'nullable|email|max:250',
            'branch_phone' => 'nullable|digits:10',
            'address_line_1' => 'required|max:2000',
            'address_line_2' => 'nullable|string|max:2000',
            'area' => 'required|string',
            'city' => 'required|string',
            'state' => 'required|string',
            'pincode' => 'required|digits:6',
            'country' => 'required|string:100',
            'time_zone' => 'required|string|max:250',
            'status' => 'required|boolean'
        ]);

        if ($branchValidated['country'] == "INDIA") $branchValidated['country_code'] = 91;
        else if ($branchValidated['country'] == "UAE") $branchValidated['country_code'] = 971;
        else if ($branchValidated['country'] == "USA") $branchValidated['country_code'] = 1;
        else throw ValidationException::withMessages(['country' => ['Service Not Available To This Country']]);


        if ($request->logo) {
            $path = $request->file('logo')->storeAs($validated['app_name'] . '/' . time() . '-logo' . '.' . $request->file('logo')->getClientOriginalExtension());
            $validated['logo'] = '/storage/' . $path;
        } else $validated['logo'] = '/default/restaurant-logo.png';

        if ($request->fav_icon) {
            $path = $request->file('fav_icon')->storeAs($validated['app_name'] . '/' . time() .  '-fav_icon' . '.' . $request->file('fav_icon')->getClientOriginalExtension());
            $validated['fav_icon'] = '/storage/' . $path;
        } else $validated['fav_icon'] =  '/default/restaurant-fav-icon.png';

        $restaurant = Restaurant::create($validated);
        if ($restaurant) return $this->createTenant($restaurant, $branchValidated);
        else return response()->json(['status' => 'error', 'message' => 'Failed to add restaurant']);
    }


 public function edit($id)
    {
        $restaurant = Restaurant::find($id);

        if (!$restaurant) return response()->json(['status' => 'error', 'message' => 'resturant not found!']);

        $tenant = Tenant::find($restaurant->app_name);

        $restaurant->branch = $tenant->run(function ($tenant) {
            return Branch::select(
                'branch_name',
                'branch_email',
                'branch_phone',
                'address_line_1',
                'address_line_2',
                'area',
                'city',
                'state',
                'pincode',
                'country',
                'country_code',
                'time_zone',
            )->first()->toArray();
        });

        return response()->json(['status' => 'success', 'restaurant' => $restaurant]);
    }

    public function editstatus(Request $request,$id){

        $restaurant=Restaurant::find($id);
        if(!$restaurant) return response()->json(['status'=>'error', 'message'=>'No Restaurant found!!']);
$restaurant->status=!$restaurant->status;
$updated=$restaurant->save();
$a=null;
if($updated){
     $tenant=Tenant::find($restaurant->app_name);
       $a= $tenant->run(function($tenant) use ($restaurant){
            $branch= Branch::first();
            $branch->status=$restaurant->status;
            $branch->save();
            return 1;
        });
}
if($updated && $a) return response()->json(['status'=>'success', 'statusupdate'=>$a]);
return response()->json(['status'=>'error']);

    }

    protected function createTenant($restaurant, $branchValidated)
    {
        $tenant = Tenant::create(['id' => $restaurant->app_name]);
        if ($tenant) {
            $tenant->domains()->create(['domain' =>  $restaurant->app_name . '.onetapdine.com']);
            $branch =  $tenant->run(function ($tenant) use ($branchValidated) {

                Branch::create([
                    'type' => 'MAIN',
                    'branch_name' => $branchValidated['branch_name'],
                    'branch_email' => $branchValidated['branch_email'],
                    'branch_phone' => $branchValidated['branch_phone'],
                    'address_line_1' => $branchValidated['address_line_1'],
                    'address_line_2' => $branchValidated['address_line_2'],
                    'area' => $branchValidated['area'],
                    'city' => $branchValidated['city'],
                    'state' => $branchValidated['state'],
                    'pincode' => $branchValidated['pincode'],
                    'country' => $branchValidated['country'],
                    'country_code' => $branchValidated['country_code'],
                    'time_zone' => $branchValidated['time_zone'],
                    'status' => $branchValidated['status'],
                ]);
                return 1;
            });

            if ($branch)  return response()->json(['status' => 'success', 'restaurant' => $restaurant, 'action' => 'added', 'message' => 'Restaurant ' . $restaurant->restaurant_name . ' added successfully']);
            else if ($restaurant->delete() && $tenant->delete()) {
                return response()->json(['status' => 'error', 'message' => 'Failed to create restaurant', 'action' => 'failed']);
            }
        } else if ($restaurant->delete()) {
            return response()->json(['status' => 'error', 'message' => 'Failed to create restaurant', 'action' => 'failed']);
        }
        return response()->json(['status' => 'error', 'message' => 'Failed to create restaurant', 'action' => 'failed']);
    }

     public function show($id)
    {
        $restaurant = Restaurant::find($id);
        if (!$restaurant) return response()->json(['status' => 'error', 'message' => 'Restaurant not found']);
        $tenant = Tenant::find($restaurant->app_name);
        if (!$tenant) return response()->json(['status' => 'error', 'message' => 'Restaurant not found']);
        $branches =  $tenant->run(function ($tenant) {
            return [
                Branch::get()->toArray(),
                User::count(),
                Item::count(),
                RestaurantActivity::latest()->get()->toArray()
            ];
        });

        return response()->json([
            'status' => 'success',
            'branchCount' => count($branches[0]),
            'branches' => $branches[0],
            'employeeCount' => $branches[1],
            'itemCount' => $branches[2],
            'activities' => $branches[3],
            'restaurant' => $restaurant
        ]);
    }

//   public function updatestatus($request){
//       return '123'

//         $restaurant=Restaurant::find($request->$id);
//         if(!$restaurant) return response()->json(['status'=>'error', 'message'=>'No Restaurant found!!']);




//     }

   public function update($request)
    {

        $restaurant = Restaurant::find($request->id);
        if (!$restaurant)  return response()->json(['status' => 'error', 'message' => 'No Restaurant Found']);

        $validated = $request->validate([
            'restaurant_name' => 'required|string|max:250',
            'no_of_branches' => 'required|integer',
            'admin_name' => 'required|string|max:200',
            'admin_email' => 'required|email|max:200',
            'admin_phone' => 'required|max:200',
            'mode'  => 'required|boolean', //TRUE => LIVE | MAINT
            'status' => 'required|boolean', //true=>ACTIVE | BLOCKED
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'fav_icon' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);

        $branchValidated = $request->validate([
            'branch_name' => 'required|string|max:250',
            'branch_email' => 'nullable|email|max:250',
            'branch_phone' => 'nullable|digits:10',
            'address_line_1' => 'required|max:2000',
            'address_line_2' => 'nullable|string|max:2000',
            'area' => 'required|string',
            'city' => 'required|string',
            'state' => 'required|string',
            'pincode' => 'required|digits:6',
            'country' => 'required|string:100',
            'time_zone' => 'required|string|max:250',
            'status' => 'required|boolean'
        ]);

        if ($branchValidated['country'] == "INDIA") $branchValidated['country_code'] = 91;
        else if ($branchValidated['country'] == "UAE") $branchValidated['country_code'] = 971;
        else if ($branchValidated['country'] == "USA") $branchValidated['country_code'] = 1;
        else throw ValidationException::withMessages(['country' => ['Service Not Available To This Country']]);

        $tenant = Tenant::find($restaurant->app_name);

        if ($request->branches < $restaurant->branches) {

            $branches =   $tenant->run(function ($tenant) {
                return Branch::count();
            });
            if ($request->branches < $branches) throw ValidationException::withMessages(['branches' => ['they already have ' . $branches . ' branches']]);
        }


        if ($request->logo) {
            $path = $request->file('logo')->storeAs($restaurant['app_name'] . '/' . time() . '-logo' . '.' . $request->file('logo')->getClientOriginalExtension());
            $validated['logo'] = '/storage/' . $path;
        } else $validated['logo'] =  $restaurant->logo;

        if ($request->fav_icon) {
            $path = $request->file('fav_icon')->storeAs($restaurant['app_name'] . '/' . time() .  '-fav_icon' . '.' . $request->file('fav_icon')->getClientOriginalExtension());
            $validated['fav_icon'] = '/storage/' . $path;
        } else $validated['fav_icon'] =   $restaurant->fav_icon;

        $updated = $restaurant->update($validated);

        $updated2 =  $tenant->run(function ($tenant) use ($branchValidated) {
            $branch = Branch::first();
            return $branch->update($branchValidated);
        });

        if ($updated && $updated2) return response()->json(['status' => 'success', 'message' => 'Restaurant Updated successfully!', 'action' => 'updated']);
        return response()->json(['status' => 'error', 'message' => 'Failed to Updated Restaurant!']);
    }


    public function destroy($id)
    {
        $restaurant = Restaurant::find($id);
        if (!$restaurant)  return response()->json(['status' => 'error', 'message' => 'No Restaurant Found']);
        $tenant = Tenant::find($restaurant->app_name);

        if (!$tenant) {
            if ($restaurant->delete()) return response()->json(['status' => 'success', 'message' => 'Restaurant Deteted']);
            return response()->json(['status' => 'error', 'message' => 'Failed to remove restaurant']);
        } else {
            if ($tenant->delete() && $restaurant->delete()) return response()->json(['status' => 'success', 'message' => 'Restaurant Deteted']);
            return response()->json(['status' => 'error', 'message' => 'Failed to remove restaurant']);
        }
    }






    protected $background = [
        '/default/background/1.png',
        '/default/background/2.png',
        '/default/background/3.png',
        '/default/background/4.png',
        '/default/background/5.png',
        '/default/background/6.png',
        '/default/background/7.png',
        '/default/background/8.png',
        '/default/background/9.png',
        '/default/background/10.png',
    ];
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\User;

class DashboardController extends Controller
{
    private function getAuthUser(): User
    {
        /** @var User */
        return Auth::user();
    }

    public function index()
    {
        $user = $this->getAuthUser();

        $products = $user->seller
            ? $user->seller->products()->withPivot('stock', 'price')->with('reviews')->get()
            : collect();

        return Inertia::render('Dashboard', [
            'products' => $products,
        ]);
    }
}

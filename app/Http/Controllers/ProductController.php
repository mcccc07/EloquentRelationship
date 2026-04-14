<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Product;
use Inertia\Inertia;

class ProductController extends Controller
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
            ? $user->seller->products()->withPivot('stock', 'price')->get()
            : collect();

        return Inertia::render('Products/Index', [
            'products' => $products,
        ]);
    }

    public function store(Request $request)
    {
        $user = $this->getAuthUser();

        abort_unless($user->seller, 403, 'You must be a seller to perform this action.');

        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'description' => 'required',
            'price'       => 'required|numeric',
            'stock'       => 'required|integer',
        ]);

        $product = Product::create([
            'name'        => $validated['name'],
            'description' => $validated['description'],
        ]);

        $user->seller->products()->attach($product->id, [
            'stock' => $validated['stock'],
            'price' => $validated['price'],
        ]);

        return redirect()->route('products.index');
    }

    public function create()
    {
        return Inertia::render('Products/Create');
    }

    public function edit(Product $product)
    {
        $user = $this->getAuthUser();
        abort_unless($user->seller, 403);

        $productWithPivot = $user->seller->products()
            ->withPivot('stock', 'price')
            ->findOrFail($product->id);

        return Inertia::render('Products/Edit', [
            'product' => $productWithPivot,
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $user = $this->getAuthUser();
        abort_unless($user->seller, 403);

        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'description' => 'required',
            'price'       => 'required|numeric',
            'stock'       => 'required|integer',
        ]);

        // Update the global product details
        $product->update([
            'name'        => $validated['name'],
            'description' => $validated['description'],
        ]);

        $user->seller->products()->updateExistingPivot($product->id, [
            'stock' => $validated['stock'],
            'price' => $validated['price'],
        ]);

        return redirect()->route('products.index');
    }

    public function destroy(Product $product)
    {
        $user = $this->getAuthUser();
        abort_unless($user->seller, 403);

        $user->seller->products()->detach($product->id);
        $product->delete();

        return redirect()->route('products.index');
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index()
    {
        return inertia('Admin/Products/Index', ['products' => Product::latest()->get()]);
    }

    public function create()
    {
        return inertia('Admin/Products/Create');
    }

    public function edit(Product $product)
    {
        return inertia('Admin/Products/Edit', ['product' => $product]);
    }

    public function store(Request $request)
    {
        Product::create($this->validated($request));
        return redirect()->route('admin.products.index');
    }

    public function update(Request $request, Product $product)
    {
        $data = $this->validated($request);
        if (isset($data['image_path']) && $product->image_path) Storage::disk('public')->delete($product->image_path);
        $product->update($data);
        return back();
    }

    public function destroy(Product $product)
    {
        if ($product->image_path) Storage::disk('public')->delete($product->image_path);
        $product->delete();
        return back();
    }

    private function validated(Request $request): array
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|in:ready,po',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'description' => 'nullable|string|max:5000',
            'image' => 'nullable|image|mimes:jpeg,png,webp|max:2048',
        ]);
        if ($request->hasFile('image')) $data['image_path'] = $request->file('image')->store('products', 'public');
        unset($data['image']);
        return $data;
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ItemController extends Controller
{
    public function index()
    {
        return Inertia::render('Inventory/Index', [
            'items' => Item::latest()->get(),
            'auth' => ['user' => Auth::user()]
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'stock' => 'required|integer|min:0',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('items', 'public');
        }

        Item::create([
            'name' => $request->name,
            'stock' => $request->stock,
            'description' => $request->description,
            'image' => $imagePath,
        ]);

        return redirect()->back();
    }

    // app/Http/Controllers/ItemController.php

public function destroy(\App\Models\Item $item)
{
    if ($item->image) {
        \Illuminate\Support\Facades\Storage::disk('public')->delete($item->image);
    }

    $item->delete();
    return redirect()->back();
}
}
<?php

namespace App\Http\Controllers;

use App\Models\Schedule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ScheduleController extends Controller
{
    public function index()
    {
        return Inertia::render('Schedules/Index', [
            'schedules' => Schedule::orderBy('date', 'asc')->get(),
            'auth' => ['user' => Auth::user()]
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'ustadz_name' => 'required',
            'type' => 'required|in:pengajian,khutbah',
            'date' => 'required|date',
            'time' => 'required',
            'image' => 'nullable|image|max:2048'
        ]);

        $imagePath = $request->hasFile('image') ? $request->file('image')->store('schedules', 'public') : null;

        Schedule::create([
            'title' => $request->title,
            'ustadz_name' => $request->ustadz_name,
            'type' => $request->type,
            'date' => $request->date,
            'time' => $request->time,
            'location' => $request->location ?? 'Ruang Utama Masjid',
            'image' => $imagePath
        ]);

        return redirect()->back();
    }

    public function destroy(Schedule $schedule)
    {
        if ($schedule->image) Storage::disk('public')->delete($schedule->image);
        $schedule->delete();
        return redirect()->back();
    }
}
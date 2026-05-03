<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class TaskController extends Controller
{
    use AuthorizesRequests;

    public function index()
    {
        return Inertia::render('Tasks/Index', [
            // Requirement: Eloquent Relationship
            'tasks' => Auth::user()->tasks()->latest()->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
        ]);

        // Requirement: Eloquent Relationship
        $request->user()->tasks()->create($validated);

        return redirect()->route('tasks.index');
    }

    public function update(Request $request, Task $task)
    {
        // Requirement: Authorization (Policy)
        $this->authorize('update', $task);

        $task->update([
            'is_completed' => !$task->is_completed
        ]);

        return redirect()->route('tasks.index');
    }

    public function destroy(Task $task)
    {
        // Requirement: Authorization (Policy)
        $this->authorize('delete', $task);

        $task->delete();

        return redirect()->route('tasks.index');
    }
}
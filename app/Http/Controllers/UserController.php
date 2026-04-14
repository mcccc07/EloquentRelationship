<?php

namespace App\Http\Controllers;
use App\Models\User;
use Inertia\Inertia;

class UsersController extends Controller
{
  public function index()
  {
    return Inertia::render('Users/Index', [
      'users' => User::all()->map(fn($user) => [
        'id' => $user->id,
        'name' => $user->name,
        'email' => $user->email,
        'edit_url' => route('users.edit', $user),
      ]),
      'create_url' => route('users.create'),
    ]);
  }
}

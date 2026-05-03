<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('My Task Manager') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                
                <!-- Form to Add Task -->
                <form action="{{ route('tasks.store') }}" method="POST" class="mb-6">
                    @csrf
                    <div class="flex gap-4">
                        <input type="text" name="title" placeholder="What needs to be done?" 
                               class="flex-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500" required>
                        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                            Add Task
                        </button>
                    </div>
                </form>

                <hr class="my-6">

                <!-- Task List -->
                <div class="space-y-4">
                    @forelse($tasks as $task)
                        <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                            <div>
                                <h3 class="font-bold {{ $task->status === 'completed' ? 'line-through text-gray-400' : '' }}">
                                    {{ $task->title }}
                                </h3>
                                <p class="text-sm text-gray-500">Status: {{ ucfirst($task->status) }}</p>
                            </div>

                            <div class="flex gap-3">
                                <!-- Complete/Undo Button -->
                                <form action="{{ route('tasks.update', $task) }}" method="POST">
                                    @csrf
                                    @method('PATCH')
                                    <button class="text-sm {{ $task->status === 'pending' ? 'text-green-600' : 'text-orange-600' }} font-bold">
                                        {{ $task->status === 'pending' ? 'Mark Done' : 'Undo' }}
                                    </button>
                                </form>

                                <!-- Delete Button -->
                                <form action="{{ route('tasks.destroy', $task) }}" method="POST" onsubmit="return confirm('Delete this task?')">
                                    @csrf
                                    @method('DELETE')
                                    <button class="text-sm text-red-600 font-bold">Delete</button>
                                </form>
                            </div>
                        </div>
                    @empty
                        <p class="text-center text-gray-500">No tasks yet. Add one above!</p>
                    @endforelse
                </div>

            </div>
        </div>
    </div>
</x-app-layout>
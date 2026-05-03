import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm, Head, router } from '@inertiajs/react';

export default function Index({ auth, tasks }) {
    const { data, setData, post, processing, reset } = useForm({
        title: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('tasks.store'), { onSuccess: () => reset() });
    };

    const toggleTask = (task) => {
        router.patch(route('tasks.update', task.id));
    };

    const deleteTask = (task) => {
        if (confirm('Are you sure you want to delete this task?')) {
            router.delete(route('tasks.destroy', task.id));
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="My Tasks" />
            
            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white p-6 shadow-sm sm:rounded-lg">
                        <h2 className="text-xl font-bold mb-4">Task Manager</h2>
                        
                        <form onSubmit={submit} className="flex gap-2 mb-6">
                            <input 
                                value={data.title} 
                                onChange={e => setData('title', e.target.value)}
                                type="text" 
                                placeholder="What needs to be done?" 
                                className="flex-1 border-gray-300 rounded shadow-sm focus:border-indigo-500 focus:ring-indigo-500" 
                            />
                            <button 
                                disabled={processing} 
                                className="bg-indigo-600 text-white px-4 py-2 rounded font-bold hover:bg-indigo-700"
                            >
                                Add
                            </button>
                        </form>

                        <div className="space-y-3">
                            {tasks.map((task) => (
                                <div key={task.id} className="flex items-center justify-between p-3 border rounded hover:bg-gray-50">
                                    <div className="flex items-center gap-3">
                                        <input 
                                            type="checkbox" 
                                            checked={task.is_completed} 
                                            onChange={() => toggleTask(task)}
                                            className="rounded text-indigo-600"
                                        />
                                        <span className={task.is_completed ? 'line-through text-gray-400' : 'text-gray-800'}>
                                            {task.title}
                                        </span>
                                    </div>
                                    <button 
                                        onClick={() => deleteTask(task)} 
                                        className="text-red-500 hover:text-red-700 font-medium text-sm"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}

                            {tasks.length === 0 && (
                                <p className="text-center text-gray-500 italic">No tasks found. Add one above!</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
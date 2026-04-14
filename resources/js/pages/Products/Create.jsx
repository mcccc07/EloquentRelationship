import { Link, useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        price: '',
        stock: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('products.store'));
    };

    return (
        <div className="p-8 font-sans">
            <div>
                <Link href={route('products.index')} className="items-start text-sm text-gray-400 hover:text-gray-600">
                    ← Back
                </Link>
            </div>
            <div className="mb-6 flex flex-col items-center gap-3">
                <div className="mb-6 flex items-center gap-3">
                    <h1 className="text-2xl font-bold text-gray-900">Add product</h1>
                </div>

                <div className="max-w-lg rounded-xl border border-gray-200 p-8">
                    <form onSubmit={handleSubmit}>
                        <Field label="Name" error={errors.name}>
                            <input
                                className={`w-full rounded-lg border px-3 py-2 font-sans text-sm outline-none ${errors.name ? 'border-red-400' : 'border-gray-200'}`}
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="e.g. Wireless Mouse"
                            />
                        </Field>

                        <Field label="Description" error={errors.description}>
                            <textarea
                                className={`w-full resize-y rounded-lg border px-3 py-2 font-sans text-sm outline-none ${errors.description ? 'border-red-400' : 'border-gray-200'}`}
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Brief product description"
                                rows={3}
                            />
                        </Field>

                        <div className="grid grid-cols-2 gap-4">
                            <Field label="Price ($)" error={errors.price}>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    className={`w-full rounded-lg border px-3 py-2 font-sans text-sm outline-none ${errors.price ? 'border-red-400' : 'border-gray-200'}`}
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                    placeholder="0.00"
                                />
                            </Field>

                            <Field label="Stock" error={errors.stock}>
                                <input
                                    type="number"
                                    min="0"
                                    className={`w-full rounded-lg border px-3 py-2 font-sans text-sm outline-none ${errors.stock ? 'border-red-400' : 'border-gray-200'}`}
                                    value={data.stock}
                                    onChange={(e) => setData('stock', e.target.value)}
                                    placeholder="0"
                                />
                            </Field>
                        </div>

                        <div className="mt-6 flex items-center gap-3">
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-lg bg-gray-900 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                            >
                                {processing ? 'Saving...' : 'Create product'}
                            </button>
                            <Link href={route('products.index')} className="text-sm text-gray-400 hover:text-gray-600">
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

function Field({ label, error, children }) {
    return (
        <div className="mb-5">
            <label className="mb-1.5 block text-xs font-medium text-gray-600">{label}</label>
            {children}
            {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        </div>
    );
}

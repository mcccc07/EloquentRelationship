import { Link, router } from '@inertiajs/react';

export default function Index({ products }) {
    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this product?')) {
            router.delete(route('products.destroy', id));
        }
    };

    const stockBadge = (stock) => {
        if (stock === 0) return <span className="inline-block rounded-full bg-red-100 px-3 py-0.5 text-xs font-medium text-red-700">{stock}</span>;
        if (stock <= 10)
            return <span className="inline-block rounded-full bg-yellow-100 px-3 py-0.5 text-xs font-medium text-yellow-800">{stock}</span>;
        return <span className="inline-block rounded-full bg-blue-100 px-3 py-0.5 text-xs font-medium text-blue-700">{stock}</span>;
    };

    return (
        <div className="p-8 font-sans">
            <Link href={route('dashboard')} className="items-start text-sm text-gray-400 hover:text-gray-600">
                ← Back
            </Link>
            <div className="mb-6 mt-5 flex items-center justify-between">
                <h1 className="text-2xl font-medium text-gray-900">Products</h1>
                <Link
                    href={route('products.create')}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
                >
                    + Add product
                </Link>
            </div>

            {products.length === 0 ? (
                <div className="rounded-xl border border-dashed border-gray-200 py-16 text-center text-gray-400">
                    <p className="text-base">No products yet.</p>
                    <p className="mt-1 text-sm">Click "+ Add product" to get started.</p>
                </div>
            ) : (
                <div className="overflow-hidden rounded-xl border border-gray-200">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                {['Name', 'Description', 'Price', 'Stock', 'Actions'].map((h) => (
                                    <th
                                        key={h}
                                        className="border-b border-gray-200 px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                                    >
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id} className="border-b border-gray-100 transition-colors last:border-none hover:bg-gray-50">
                                    <td className="px-4 py-3 font-medium text-gray-900">{product.name}</td>
                                    <td className="max-w-xs truncate px-4 py-3 text-gray-500">{product.description}</td>
                                    <td className="px-4 py-3 text-gray-900">${Number(product.pivot.price).toFixed(2)}</td>
                                    <td className="px-4 py-3">{stockBadge(product.pivot.stock)}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <Link
                                                href={route('products.edit', product.id)}
                                                className="text-xs font-medium text-blue-600 hover:underline"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="cursor-pointer border-none bg-none p-0 text-xs font-medium text-red-600 hover:underline"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

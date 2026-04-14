import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth, products }) {
    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Welcome back, {auth.user.name}!</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white p-6 shadow-sm sm:rounded-lg">
                        <h1 className="mb-4 text-lg font-bold">Order Item Details</h1>
                        <table className="w-full border-collapse text-left">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="border px-4 py-2">Order ID</th>
                                    <th className="border px-4 py-2">Product Name</th>
                                    <th className="border px-4 py-2">Quantity</th>
                                    <th className="border px-4 py-2">Total Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.id}>
                                        <td className="border px-4 py-2">{product.id}</td>
                                        <td className="border px-4 py-2">{product.name}</td>

                                        <td className="border px-4 py-2">{product.pivot.stock}</td>
                                        <td className="border px-4 py-2">${product.pivot.price}</td>

                                        <td className="border px-4 py-2">{product.reviews.length} Reviews</td>
                                    </tr>
                                ))}
                                {(!products || products.length === 0) && (
                                    <tr>
                                        <td colSpan="4" className="border px-4 py-2 text-center text-gray-500">
                                            No orders found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

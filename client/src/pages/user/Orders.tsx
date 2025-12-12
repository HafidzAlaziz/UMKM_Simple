import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../lib/api';
import type { Order } from '../../types';
import { Link } from 'react-router-dom';
import { Package, Eye } from 'lucide-react';
import { Button } from '../../components/ui/button';

const Orders = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user) return;
            try {
                const res = await api.get(`/orders/user/${user.id}`);
                setOrders(res.data);
            } catch (error) {
                console.error('Failed to fetch orders', error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [user]);

    const getStatusColor = (status: string) => {
        const colors: Record<string, string> = {
            PENDING: 'bg-yellow-100 text-yellow-800',
            PAID: 'bg-blue-100 text-blue-800',
            SHIPPED: 'bg-purple-100 text-purple-800',
            COMPLETED: 'bg-green-100 text-green-800',
            CANCELLED: 'bg-red-100 text-red-800',
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    if (loading) {
        return (
            <div className="border rounded-lg p-6 bg-white text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-gray-600">Memuat pesanan...</p>
            </div>
        );
    }

    return (
        <div className="border rounded-lg p-6 bg-white">
            <div className="flex items-center gap-3 mb-6">
                <Package className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">Pesanan Saya</h2>
            </div>

            {orders.length === 0 ? (
                <div className="text-center py-12">
                    <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Belum ada pesanan</p>
                    <Button asChild>
                        <Link to="/products">Mulai Belanja</Link>
                    </Button>
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div key={order.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <p className="text-sm text-gray-500">Order ID: {order.id.slice(0, 8)}</p>
                                    <p className="text-sm text-gray-500">
                                        {new Date(order.createdAt).toLocaleDateString('id-ID', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric'
                                        })}
                                    </p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                    {order.status}
                                </span>
                            </div>

                            <div className="space-y-2 mb-3">
                                {order.items.map((item) => (
                                    <div key={item.id} className="flex justify-between text-sm">
                                        <span className="text-gray-700">
                                            {item.product?.name || 'Product'} x {item.quantity}
                                        </span>
                                        <span className="font-medium">
                                            ${(Number(item.price) * item.quantity).toFixed(2)}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-between items-center pt-3 border-t">
                                <div>
                                    <span className="text-sm text-gray-600">Total: </span>
                                    <span className="text-lg font-bold text-primary">
                                        ${Number(order.totalAmount).toFixed(2)}
                                    </span>
                                </div>
                                <Button variant="outline" size="sm" asChild>
                                    <Link to={`/order-success/${order.id}`}>
                                        <Eye className="h-4 w-4 mr-2" />
                                        Detail
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../lib/api';
import type { Order } from '../types';
import { Button } from '../components/ui/button';
import { CheckCircle, Package, Home } from 'lucide-react';

const OrderSuccess = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await api.get(`/orders/${orderId}`);
                setOrder(res.data);
            } catch (error) {
                console.error('Failed to fetch order', error);
            } finally {
                setLoading(false);
            }
        };

        if (orderId) {
            fetchOrder();
        }
    }, [orderId]);

    if (loading) {
        return (
            <div className="container px-4 py-20 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-gray-600">Memuat detail pesanan...</p>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="container px-4 py-20 text-center">
                <h2 className="text-2xl font-bold mb-4">Pesanan Tidak Ditemukan</h2>
                <Button onClick={() => navigate('/')}>Kembali ke Beranda</Button>
            </div>
        );
    }

    return (
        <div className="container px-4 py-8">
            <div className="max-w-3xl mx-auto">
                {/* Success Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                        <CheckCircle className="h-10 w-10 text-green-600" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Pesanan Berhasil Dibuat!</h1>
                    <p className="text-gray-600">
                        Terima kasih atas pesanan Anda. Kami akan segera memprosesnya.
                    </p>
                </div>

                {/* Order Details Card */}
                <div className="border rounded-lg p-6 bg-white mb-6">
                    <div className="flex items-center gap-3 mb-6 pb-6 border-b">
                        <Package className="h-6 w-6 text-primary" />
                        <div>
                            <h2 className="text-xl font-semibold">Detail Pesanan</h2>
                            <p className="text-sm text-gray-500">Order ID: {order.id}</p>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-4 mb-6">
                        <h3 className="font-semibold">Produk yang Dipesan</h3>
                        {order.items.map((item) => (
                            <div key={item.id} className="flex justify-between items-center py-3 border-b last:border-0">
                                <div className="flex-1">
                                    <p className="font-medium">{item.product?.name || 'Product'}</p>
                                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                </div>
                                <p className="font-semibold">
                                    ${(Number(item.price) * item.quantity).toFixed(2)}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Shipping Address */}
                    <div className="mb-6 pb-6 border-b">
                        <h3 className="font-semibold mb-2">Alamat Pengiriman</h3>
                        <div className="text-sm text-gray-600">
                            <p>{order.shippingAddress.street}</p>
                            <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                            <p>{order.shippingAddress.country}</p>
                            <p className="mt-1">Telp: {order.shippingAddress.phone}</p>
                        </div>
                    </div>

                    {/* Payment & Total */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Metode Pembayaran</span>
                            <span className="font-medium">{order.paymentMethod}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Status</span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                {order.status}
                            </span>
                        </div>
                        <div className="flex justify-between pt-4 border-t">
                            <span className="text-lg font-bold">Total Pembayaran</span>
                            <span className="text-lg font-bold text-primary">
                                ${Number(order.totalAmount).toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => navigate('/')}
                    >
                        <Home className="h-4 w-4 mr-2" />
                        Kembali ke Beranda
                    </Button>
                    <Button
                        className="flex-1"
                        onClick={() => navigate('/products')}
                    >
                        Lanjut Belanja
                    </Button>
                </div>

                {/* Info Box */}
                <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">Informasi Penting</h3>
                    <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Kami akan mengirimkan konfirmasi pesanan ke email Anda</li>
                        <li>• Pesanan akan diproses dalam 1-2 hari kerja</li>
                        <li>• Anda dapat melacak status pesanan di dashboard akun Anda</li>
                        <li>• Hubungi customer service jika ada pertanyaan</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;

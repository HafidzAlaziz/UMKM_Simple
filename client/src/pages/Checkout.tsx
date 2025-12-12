import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import api from '../lib/api';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { ArrowLeft, CreditCard, Truck } from 'lucide-react';
import type { Address } from '../types';

const Checkout = () => {
    const navigate = useNavigate();
    const { cart, totalPrice, clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [shippingMethod, setShippingMethod] = useState('standard');
    const [paymentMethod, setPaymentMethod] = useState('cod');

    const [address, setAddress] = useState<Address>({
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'Indonesia',
        phone: ''
    });

    const shippingCosts = {
        standard: 10,
        express: 25,
        overnight: 50
    };

    const shippingCost = shippingCosts[shippingMethod as keyof typeof shippingCosts];
    const finalTotal = totalPrice + shippingCost;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress({
            ...address,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Get user from localStorage (mock - in real app would come from auth context)
            const userStr = localStorage.getItem('user');
            const user = userStr ? JSON.parse(userStr) : { id: 'guest-' + Date.now() };

            const orderData = {
                userId: user.id,
                items: cart.map(item => ({
                    productId: item.id,
                    quantity: item.quantity,
                    price: item.price
                })),
                shippingAddress: address,
                paymentMethod: paymentMethod === 'cod' ? 'Cash on Delivery' :
                    paymentMethod === 'card' ? 'Credit Card (Mock)' :
                        'Bank Transfer (Mock)',
                totalAmount: finalTotal
            };

            const response = await api.post('/orders', orderData);

            // Clear cart and redirect to success page
            clearCart();
            navigate(`/order-success/${response.data.id}`);
        } catch (error) {
            console.error('Order creation failed:', error);
            alert('Gagal membuat pesanan. Silakan coba lagi.');
        } finally {
            setLoading(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="container px-4 py-20 text-center">
                <h2 className="text-2xl font-bold mb-4">Keranjang Kosong</h2>
                <p className="text-gray-600 mb-8">Tambahkan produk ke keranjang terlebih dahulu.</p>
                <Button onClick={() => navigate('/products')}>Belanja Sekarang</Button>
            </div>
        );
    }

    return (
        <div className="container px-4 py-8">
            <button
                onClick={() => navigate('/cart')}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
            >
                <ArrowLeft className="h-4 w-4" />
                Kembali ke Keranjang
            </button>

            <h1 className="text-3xl font-bold mb-8">Checkout</h1>

            <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
                {/* Left Column - Forms */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Shipping Address */}
                    <div className="border rounded-lg p-6 bg-white">
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <Truck className="h-5 w-5" />
                            Alamat Pengiriman
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <Label htmlFor="street">Alamat Lengkap *</Label>
                                <Input
                                    id="street"
                                    name="street"
                                    value={address.street}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Jl. Contoh No. 123"
                                />
                            </div>
                            <div>
                                <Label htmlFor="city">Kota *</Label>
                                <Input
                                    id="city"
                                    name="city"
                                    value={address.city}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="state">Provinsi *</Label>
                                <Input
                                    id="state"
                                    name="state"
                                    value={address.state}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="zipCode">Kode Pos *</Label>
                                <Input
                                    id="zipCode"
                                    name="zipCode"
                                    value={address.zipCode}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="phone">Nomor Telepon *</Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    value={address.phone}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="08123456789"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Shipping Method */}
                    <div className="border rounded-lg p-6 bg-white">
                        <h2 className="text-xl font-semibold mb-4">Metode Pengiriman</h2>
                        <div className="space-y-3">
                            {[
                                { id: 'standard', name: 'Standard (5-7 hari)', price: 10 },
                                { id: 'express', name: 'Express (2-3 hari)', price: 25 },
                                { id: 'overnight', name: 'Overnight (1 hari)', price: 50 }
                            ].map((method) => (
                                <label
                                    key={method.id}
                                    className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${shippingMethod === method.id ? 'border-primary bg-primary/5' : 'hover:border-gray-400'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="radio"
                                            name="shipping"
                                            value={method.id}
                                            checked={shippingMethod === method.id}
                                            onChange={(e) => setShippingMethod(e.target.value)}
                                            className="w-4 h-4"
                                        />
                                        <span className="font-medium">{method.name}</span>
                                    </div>
                                    <span className="font-semibold">${method.price.toFixed(2)}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className="border rounded-lg p-6 bg-white">
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <CreditCard className="h-5 w-5" />
                            Metode Pembayaran
                        </h2>
                        <div className="space-y-3">
                            {[
                                { id: 'cod', name: 'Cash on Delivery (COD)', desc: 'Bayar saat barang diterima' },
                                { id: 'card', name: 'Kartu Kredit/Debit', desc: 'Pembayaran dummy untuk demo' },
                                { id: 'transfer', name: 'Transfer Bank', desc: 'Pembayaran dummy untuk demo' }
                            ].map((method) => (
                                <label
                                    key={method.id}
                                    className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${paymentMethod === method.id ? 'border-primary bg-primary/5' : 'hover:border-gray-400'
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="payment"
                                        value={method.id}
                                        checked={paymentMethod === method.id}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="w-4 h-4 mt-1"
                                    />
                                    <div>
                                        <div className="font-medium">{method.name}</div>
                                        <div className="text-sm text-gray-500">{method.desc}</div>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column - Order Summary */}
                <div className="lg:col-span-1">
                    <div className="border rounded-lg p-6 bg-gray-50 sticky top-4">
                        <h2 className="text-xl font-semibold mb-4">Ringkasan Pesanan</h2>

                        <div className="space-y-3 mb-4">
                            {cart.map((item) => (
                                <div key={item.id} className="flex justify-between text-sm">
                                    <span className="text-gray-600">
                                        {item.name} x {item.quantity}
                                    </span>
                                    <span className="font-medium">
                                        ${(Number(item.price) * item.quantity).toFixed(2)}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="border-t pt-4 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Subtotal</span>
                                <span className="font-medium">${totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Ongkos Kirim</span>
                                <span className="font-medium">${shippingCost.toFixed(2)}</span>
                            </div>
                            <div className="border-t pt-2 flex justify-between">
                                <span className="text-lg font-bold">Total</span>
                                <span className="text-lg font-bold text-primary">
                                    ${finalTotal.toFixed(2)}
                                </span>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full mt-6"
                            size="lg"
                            disabled={loading}
                        >
                            {loading ? 'Memproses...' : 'Buat Pesanan'}
                        </Button>

                        <p className="text-xs text-gray-500 text-center mt-4">
                            Dengan melanjutkan, Anda menyetujui syarat dan ketentuan kami
                        </p>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Checkout;

import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/button';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

    if (cart.length === 0) {
        return (
            <div className="container px-4 py-20 text-center">
                <h2 className="text-2xl font-bold mb-4">Keranjang Belanja Kosong</h2>
                <p className="text-gray-600 mb-8">Anda belum menambahkan produk apa pun ke keranjang.</p>
                <Button asChild>
                    <Link to="/products">Mulai Belanja</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="container px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Keranjang Belanja</h1>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Cart Items */}
                <div className="flex-1 space-y-4">
                    {cart.map((item) => (
                        <div key={item.id} className="flex gap-4 border rounded-lg p-4 bg-white shadow-sm">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border bg-gray-100">
                                <img
                                    src={item.images[0] || 'https://via.placeholder.com/150'}
                                    alt={item.name}
                                    className="h-full w-full object-cover object-center"
                                />
                            </div>

                            <div className="flex flex-1 flex-col justify-between">
                                <div>
                                    <h3 className="text-base font-medium text-gray-900">
                                        <Link to={`/products/${item.id}`}>{item.name}</Link>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">${Number(item.price).toFixed(2)}</p>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2 border rounded-md">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="p-1 hover:bg-gray-100 disabled:opacity-50"
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus className="h-4 w-4" />
                                        </button>
                                        <span className="w-8 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="p-1 hover:bg-gray-100"
                                        >
                                            <Plus className="h-4 w-4" />
                                        </button>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeFromCart(item.id)}
                                        className="font-medium text-red-600 hover:text-red-500 flex items-center gap-1"
                                    >
                                        <Trash2 className="h-4 w-4" /> Hapus
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary */}
                <div className="lg:w-80">
                    <div className="rounded-lg border bg-gray-50 p-6">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">Ringkasan Pesanan</h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between border-b pb-4">
                                <span className="text-base text-gray-600">Subtotal</span>
                                <span className="text-base font-medium text-gray-900">${totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex items-center justify-between pt-4">
                                <span className="text-lg font-bold text-gray-900">Total</span>
                                <span className="text-lg font-bold text-primary">${totalPrice.toFixed(2)}</span>
                            </div>
                        </div>
                        <Button className="w-full mt-6" size="lg" asChild>
                            <Link to="/checkout">
                                Checkout <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;

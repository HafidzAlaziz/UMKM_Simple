import { useState } from 'react';
import { Heart, Trash2, ShoppingCart } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useCart } from '../../context/CartContext';
import type { Product } from '../../types';
import { Link } from 'react-router-dom';

const Wishlist = () => {
    const { addToCart } = useCart();
    const [wishlist, setWishlist] = useState<Product[]>([]);

    const removeFromWishlist = (id: string) => {
        setWishlist(wishlist.filter(item => item.id !== id));
    };

    const handleAddToCart = (product: Product) => {
        addToCart(product);
        removeFromWishlist(product.id);
    };

    return (
        <div className="border rounded-lg p-6 bg-white">
            <div className="flex items-center gap-3 mb-6">
                <Heart className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">Wishlist Saya</h2>
            </div>

            {wishlist.length === 0 ? (
                <div className="text-center py-12">
                    <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Wishlist masih kosong</p>
                    <Button asChild>
                        <Link to="/products">Jelajahi Produk</Link>
                    </Button>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {wishlist.map((product) => (
                        <div key={product.id} className="border rounded-lg p-4">
                            <div className="aspect-square bg-gray-100 rounded-md mb-3 overflow-hidden">
                                <img
                                    src={product.images[0] || 'https://via.placeholder.com/300'}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h3 className="font-medium mb-1">{product.name}</h3>
                            <p className="text-lg font-bold text-primary mb-3">
                                ${Number(product.price).toFixed(2)}
                            </p>
                            <div className="flex gap-2">
                                <Button
                                    size="sm"
                                    className="flex-1"
                                    onClick={() => handleAddToCart(product)}
                                >
                                    <ShoppingCart className="h-4 w-4 mr-1" />
                                    Tambah
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => removeFromWishlist(product.id)}
                                >
                                    <Trash2 className="h-4 w-4 text-red-600" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../lib/api';
import type { Product } from '../types';
import { Button } from '../components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await api.get(`/products/${id}`);
                setProduct(res.data);
            } catch (error) {
                console.error('Failed to fetch product', error);

                // Fallback Mock
                if (id === '1') {
                    setProduct({
                        id: '1', name: 'Headphone Nirkabel Premium', price: 299, stock: 10,
                        description: 'Rasakan audio yang belum pernah ada sebelumnya dengan headphone peredam bising premium kami.',
                        images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e'],
                        featured: true, createdAt: new Date().toISOString()
                    });
                }
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return <div className="container py-20 text-center">Memuat...</div>;
    if (!product) return <div className="container py-20 text-center">Produk tidak ditemukan.</div>;

    return (
        <div className="container px-4 py-8 md:py-16">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                {/* Images */}
                <div className="space-y-4">
                    <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 border">
                        <img
                            src={product.images[0] || 'https://via.placeholder.com/600'}
                            alt={product.name}
                            className="h-full w-full object-cover object-center"
                        />
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-2">
                        {product.images.map((img, i) => (
                            <div key={i} className="aspect-square h-20 w-20 flex-none rounded-md bg-gray-100 overflow-hidden cursor-pointer border hover:border-primary">
                                <img src={img} className="h-full w-full object-cover" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Details */}
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{product.name}</h1>
                    <div className="mt-4">
                        <p className="text-3xl tracking-tight text-gray-900">${Number(product.price).toFixed(2)}</p>
                    </div>

                    <div className="mt-6 space-y-6">
                        <p className="text-base text-gray-700 leading-relaxed">
                            {product.description}
                        </p>
                    </div>

                    <div className="mt-8 border-t border-gray-200 pt-8">
                        <div className="flex items-center gap-4">
                            <Button
                                size="lg"
                                className="w-full md:w-auto gap-2"
                                onClick={() => product && addToCart(product)}
                            >
                                <ShoppingCart className="h-5 w-5" /> Tambah ke Keranjang
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;

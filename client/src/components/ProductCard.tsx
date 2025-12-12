import type { Product } from '../types';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    const { addToCart } = useCart();

    return (
        <div className="group relative rounded-lg bg-white p-4 shadow-sm transition-all hover:shadow-md border border-gray-100">
            <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-100 relative">
                <img
                    src={product.images[0] || 'https://via.placeholder.com/300'}
                    alt={product.name}
                    className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />

                {/* Overlay Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100 bg-black/20">
                    <Button size="sm" className="bg-white text-primary hover:bg-gray-100 translate-y-4 group-hover:translate-y-0 transition-transform">
                        Lihat Detail
                    </Button>
                </div>
            </div>

            <div className="mt-4 flex justify-between">
                <div>
                    <h3 className="text-sm font-medium text-gray-900">
                        <Link to={`/products/${product.id}`}>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {product.name}
                        </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{product.category?.name}</p>
                </div>
                <p className="text-sm font-semibold text-primary">
                    ${Number(product.price).toFixed(2)}
                </p>
            </div>

            <div className="mt-4">
                <Button
                    className="w-full gap-2 relative z-10"
                    variant="secondary"
                    size="sm"
                    onClick={() => addToCart(product)}
                >
                    <ShoppingCart className="h-4 w-4" /> Tambah ke Keranjang
                </Button>
            </div>
        </div>
    );
};

export default ProductCard;

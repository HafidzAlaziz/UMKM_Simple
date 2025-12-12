import { useEffect, useState } from 'react';
import api from '../lib/api';
import type { Product } from '../types';
import ProductCard from '../components/ProductCard';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Search, Filter } from 'lucide-react';
import { Label } from '../components/ui/label';

const ProductListing = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (search) params.append('search', search);
            if (minPrice) params.append('minPrice', minPrice);
            if (maxPrice) params.append('maxPrice', maxPrice);

            const res = await api.get(`/products?${params.toString()}`);
            setProducts(res.data.data || []); // Handling pagination structure
        } catch (error) {
            console.error('Failed to fetch products', error);
            // Fallback
            setProducts([
                {
                    id: '1', name: 'Headphone Nirkabel Premium', price: 299, stock: 10,
                    description: 'Audio fidelitas tinggi', images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e'],
                    featured: true, createdAt: new Date().toISOString()
                },
                {
                    id: '2', name: 'Jam Tangan Minimalis', price: 150, stock: 5,
                    description: 'Desain klasik', images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30'],
                    featured: true, createdAt: new Date().toISOString()
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchProducts();
    };

    return (
        <div className="container px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Belanja Semua Produk</h1>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Filters */}
                <aside className="w-full md:w-64 space-y-6">
                    <div className="border rounded-lg p-4 bg-gray-50">
                        <h3 className="font-semibold mb-4 flex items-center gap-2"><Filter className="w-4 h-4" /> Filter</h3>
                        <form onSubmit={handleSearch} className="space-y-4">
                            <div>
                                <Label>Cari</Label>
                                <div className="relative">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="search"
                                        placeholder="Cari produk..."
                                        className="pl-8"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <Label>Rentang Harga</Label>
                                <div className="flex items-center gap-2 mt-2">
                                    <Input
                                        type="number"
                                        placeholder="Min"
                                        value={minPrice}
                                        onChange={(e) => setMinPrice(e.target.value)}
                                    />
                                    <span>-</span>
                                    <Input
                                        type="number"
                                        placeholder="Max"
                                        value={maxPrice}
                                        onChange={(e) => setMaxPrice(e.target.value)}
                                    />
                                </div>
                            </div>

                            <Button type="submit" className="w-full">Terapkan Filter</Button>
                        </form>
                    </div>
                </aside>

                {/* Product Grid */}
                <div className="flex-1">
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <div key={i} className="h-80 bg-gray-100 rounded-lg animate-pulse"></div>
                            ))}
                        </div>
                    ) : products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-gray-500">
                            Produk tidak ditemukan.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductListing;

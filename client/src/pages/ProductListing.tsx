import { useState } from 'react';
import type { Product } from '../types';
import ProductCard from '../components/ProductCard';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Search, Filter } from 'lucide-react';
import { Label } from '../components/ui/label';
import { MOCK_PRODUCTS } from '../lib/mockData';

const ProductListing = () => {
    // Use mock data directly
    const [products] = useState<Product[]>(MOCK_PRODUCTS);
    const [loading] = useState(false);
    const [search, setSearch] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    // Filter products based on search and price
    const filteredProducts = products.filter(product => {
        const matchesSearch = !search || product.name.toLowerCase().includes(search.toLowerCase());
        const matchesMinPrice = !minPrice || product.price >= parseFloat(minPrice);
        const matchesMaxPrice = !maxPrice || product.price <= parseFloat(maxPrice);
        return matchesSearch && matchesMinPrice && matchesMaxPrice;
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
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
                                    <Input
                                        type="text"
                                        placeholder="Cari produk..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="pl-10"
                                    />
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                </div>
                            </div>

                            <div>
                                <Label>Harga Minimum</Label>
                                <Input
                                    type="number"
                                    placeholder="0"
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(e.target.value)}
                                />
                            </div>

                            <div>
                                <Label>Harga Maksimum</Label>
                                <Input
                                    type="number"
                                    placeholder="1000"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                />
                            </div>

                            <Button type="submit" className="w-full">Terapkan Filter</Button>
                        </form>
                    </div>
                </aside>

                {/* Products Grid */}
                <main className="flex-1">
                    {loading ? (
                        <div className="text-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                        </div>
                    ) : filteredProducts.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-600">Tidak ada produk ditemukan</p>
                        </div>
                    ) : (
                        <>
                            <div className="mb-4 text-sm text-gray-600">
                                Menampilkan {filteredProducts.length} produk
                            </div>
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        </>
                    )}
                </main>
            </div>
        </div>
    );
};

export default ProductListing;

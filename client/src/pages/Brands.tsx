import { useEffect, useState } from 'react';
import api from '../lib/api';
import type { Brand } from '../types';
import { Link } from 'react-router-dom';

const Brands = () => {
    const [brands, setBrands] = useState<Brand[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const res = await api.get('/brands');
                setBrands(res.data);
            } catch (error) {
                console.error('Failed to fetch brands', error);
                // Fallback mock data
                setBrands([
                    { id: '1', name: 'Apple' },
                    { id: '2', name: 'Nike' },
                    { id: '3', name: 'Sony' },
                    { id: '4', name: 'Samsung' },
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchBrands();
    }, []);

    return (
        <div className="container px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Brand Terpercaya</h1>

            {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="h-32 bg-gray-100 rounded-lg animate-pulse"></div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {brands.map((brand) => (
                        <Link
                            key={brand.id}
                            to={`/products?brand=${brand.id}`}
                            className="group flex items-center justify-center h-32 border rounded-lg bg-white hover:shadow-md transition-shadow p-4"
                        >
                            {brand.logo ? (
                                <img
                                    src={brand.logo}
                                    alt={brand.name}
                                    className="max-h-full max-w-full object-contain"
                                />
                            ) : (
                                <h3 className="text-lg font-semibold text-gray-700 group-hover:text-primary transition-colors">
                                    {brand.name}
                                </h3>
                            )}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Brands;

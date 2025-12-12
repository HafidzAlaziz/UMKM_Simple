import { useEffect, useState } from 'react';
import api from '../lib/api';
import type { Category } from '../types';
import { Link } from 'react-router-dom';

const Categories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await api.get('/categories');
                setCategories(res.data);
            } catch (error) {
                console.error('Failed to fetch categories', error);
                // Fallback mock data
                setCategories([
                    { id: '1', name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049860654-af1a5c5668ba' },
                    { id: '2', name: 'Fashion', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050' },
                    { id: '3', name: 'Home & Living', image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a' },
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    return (
        <div className="container px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Kategori Produk</h1>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-48 bg-gray-100 rounded-lg animate-pulse"></div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            to={`/products?category=${category.id}`}
                            className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
                        >
                            <div className="aspect-video overflow-hidden bg-gray-100">
                                <img
                                    src={category.image || 'https://via.placeholder.com/400x300'}
                                    alt={category.name}
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                                <h3 className="text-white text-xl font-bold p-4">{category.name}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Categories;

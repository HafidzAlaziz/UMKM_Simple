import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api';
import type { Product } from '../types';
import ProductCard from '../components/ProductCard';
import { Button } from '../components/ui/button';
import { ArrowRight } from 'lucide-react';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                const response = await api.get('/products/featured');
                const data = response.data;
                // Handle both array and object with data property
                setFeaturedProducts(Array.isArray(data) ? data : (data.data || []));
            } catch (error) {
                console.error('Failed to fetch featured products:', error);
                // Use fallback mock data if API fails
                setFeaturedProducts([
                    <div className="container px-4 md:px-6 relative z-10">
                        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                            <div className="space-y-4">
                                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                                    Tingkatkan Gaya Hidup dengan Produk Premium
                                </h1>
                                <p className="max-w-[600px] text-gray-300 md:text-xl">
                                    Temukan koleksi pilihan dari kebutuhan klasik hingga inovasi modern. Kualitas terpercaya, desain yang akan Anda cintai.
                                </p>
                                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                    <Button asChild size="lg" className="bg-secondary text-primary hover:bg-secondary/90">
                                        <Link to="/products">
                                            Belanja Sekarang <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>
                                    <Button asChild variant="outline" size="lg" className="border-gray-600 text-black hover:bg-white/10 hover:text-white">
                                        <Link to="/about">Tentang Kami</Link>
                                    </Button>
                                </div>
                            </div>
                            <div className="relative mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last">
                                <div className="absolute inset-0 bg-gradient-to-tr from-secondary/20 to-primary/20 mix-blend-multiply" />
                                <img
                                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8"
                                    alt="Hero"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </div>
                    </div>
            </section >

    {/* Featured Products */ }
    < section className = "py-16 bg-gray-50" >
        <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary">Koleksi Pilihan</h2>
                    <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Produk favorit yang dipilih khusus untuk Anda.
                    </p>
                </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8">
                {loading ? (
                    Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="h-[300px] rounded-lg bg-gray-200 animate-pulse" />
                    ))
                ) : (
                    featuredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                )}
            </div>
        </div>
            </section >
        </div >
    );
};

export default Home;

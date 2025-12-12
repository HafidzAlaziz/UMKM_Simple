import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';
import ProductCard from '../components/ProductCard';
import { Button } from '../components/ui/button';
import { ArrowRight } from 'lucide-react';
import { MOCK_PRODUCTS } from '../lib/mockData';

const Home = () => {
    // Use mock data directly - no API calls
    const [featuredProducts] = useState<Product[]>(MOCK_PRODUCTS.filter(p => p.featured));
    const [loading] = useState(false);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-primary text-white py-20 lg:py-32 overflow-hidden">
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
                                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800"
                                alt="Hero"
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </div>
                </div>
                <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
            </section>

            {/* Featured Products */}
            <section className="py-12 md:py-24 lg:py-32 bg-gray-50">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Produk Unggulan</h2>
                        <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Jelajahi pilihan produk terbaik kami yang dipilih khusus untuk Anda
                        </p>
                    </div>

                    {loading ? (
                        <div className="text-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                        </div>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {featuredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}

                    <div className="mt-12 text-center">
                        <Button asChild size="lg">
                            <Link to="/products">
                                Lihat Semua Produk <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;

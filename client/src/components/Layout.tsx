import { Link, Outlet } from 'react-router-dom';
import { ShoppingCart, User, Menu } from 'lucide-react';
import { Button } from './ui/button';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Layout = () => {
    const { totalItems } = useCart();
    const { isAuthenticated } = useAuth();

    return (
        <div className="min-h-screen flex flex-col bg-background font-sans text-foreground">
            {/* Navbar */}
            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4">
                    <div className="flex items-center gap-6">
                        <Link to="/" className="flex items-center gap-3">
                            <img src="/logo.png" alt="UMKM Store" className="h-10 w-10" />
                            <span className="font-bold text-xl text-primary">UMKM<span className="text-secondary">Store</span></span>
                        </Link>
                        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
                            <Link to="/products" className="transition-colors hover:text-foreground">Produk</Link>
                            <Link to="/categories" className="transition-colors hover:text-foreground">Kategori</Link>
                            <Link to="/brands" className="transition-colors hover:text-foreground">Brand</Link>
                        </nav>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Menu className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" asChild className="relative">
                            <Link to="/cart">
                                <ShoppingCart className="h-5 w-5" />
                                {totalItems > 0 && (
                                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-600 text-[10px] font-bold text-white flex items-center justify-center">
                                        {totalItems}
                                    </span>
                                )}
                                <span className="sr-only">Keranjang</span>
                            </Link>
                        </Button>
                        <Button variant="ghost" size="icon" asChild>
                            <Link to={isAuthenticated ? "/dashboard/profile" : "/login"}>
                                <User className="h-5 w-5" />
                                <span className="sr-only">{isAuthenticated ? 'Dashboard' : 'Login'}</span>
                            </Link>
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="border-t bg-gray-50 py-10">
                <div className="container px-4 text-center text-sm text-gray-500">
                    <p>© 2025 UMKM Premium Store. Hak Cipta Dilindungi.</p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;

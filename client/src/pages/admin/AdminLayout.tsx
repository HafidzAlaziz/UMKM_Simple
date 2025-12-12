import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag, Users, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import ProtectedRoute from '../../components/ProtectedRoute';

const AdminLayout = () => {
    const location = useLocation();
    const { user, logout } = useAuth();

    const menuItems = [
        { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/admin/products', label: 'Produk', icon: Package },
        { path: '/admin/orders', label: 'Pesanan', icon: ShoppingBag },
        { path: '/admin/users', label: 'Users', icon: Users },
    ];

    return (
        <ProtectedRoute requireAdmin={true}>
            <div className="min-h-screen bg-gray-100">
                {/* Header */}
                <header className="bg-white shadow-sm">
                    <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-primary">Admin Panel</h1>
                            <p className="text-sm text-gray-600">{user?.name || 'Administrator'}</p>
                        </div>
                        <button
                            onClick={logout}
                            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                            <LogOut className="h-5 w-5" />
                            Logout
                        </button>
                    </div>
                </header>

                <div className="container mx-auto px-4 py-6">
                    <div className="grid md:grid-cols-5 gap-6">
                        {/* Sidebar */}
                        <aside className="md:col-span-1">
                            <nav className="bg-white rounded-lg shadow-sm p-4 space-y-2">
                                {menuItems.map((item) => {
                                    const Icon = item.icon;
                                    const isActive = location.pathname === item.path;
                                    return (
                                        <Link
                                            key={item.path}
                                            to={item.path}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                                    ? 'bg-primary text-white'
                                                    : 'hover:bg-gray-100 text-gray-700'
                                                }`}
                                        >
                                            <Icon className="h-5 w-5" />
                                            <span className="font-medium">{item.label}</span>
                                        </Link>
                                    );
                                })}
                            </nav>
                        </aside>

                        {/* Main Content */}
                        <main className="md:col-span-4">
                            <Outlet />
                        </main>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default AdminLayout;

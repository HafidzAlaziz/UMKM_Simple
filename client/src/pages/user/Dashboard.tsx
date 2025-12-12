import { Link, Outlet, useLocation } from 'react-router-dom';
import { User, Package, MapPin, Heart, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import ProtectedRoute from '../../components/ProtectedRoute';

const UserDashboard = () => {
    const location = useLocation();
    const { user, logout } = useAuth();

    const menuItems = [
        { path: '/dashboard/profile', label: 'Profil Saya', icon: User },
        { path: '/dashboard/orders', label: 'Pesanan Saya', icon: Package },
        { path: '/dashboard/addresses', label: 'Alamat', icon: MapPin },
        { path: '/dashboard/wishlist', label: 'Wishlist', icon: Heart },
    ];

    return (
        <ProtectedRoute>
            <div className="container px-4 py-8">
                <div className="grid md:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <aside className="md:col-span-1">
                        <div className="border rounded-lg p-4 bg-white">
                            <div className="mb-6 pb-4 border-b">
                                <h3 className="font-semibold text-lg">{user?.name || 'User'}</h3>
                                <p className="text-sm text-gray-500">{user?.email}</p>
                            </div>
                            <nav className="space-y-2">
                                {menuItems.map((item) => {
                                    const Icon = item.icon;
                                    const isActive = location.pathname === item.path;
                                    return (
                                        <Link
                                            key={item.path}
                                            to={item.path}
                                            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${isActive
                                                    ? 'bg-primary text-white'
                                                    : 'hover:bg-gray-100 text-gray-700'
                                                }`}
                                        >
                                            <Icon className="h-5 w-5" />
                                            <span>{item.label}</span>
                                        </Link>
                                    );
                                })}
                                <button
                                    onClick={logout}
                                    className="flex items-center gap-3 px-4 py-2 rounded-lg transition-colors hover:bg-red-50 text-red-600 w-full"
                                >
                                    <LogOut className="h-5 w-5" />
                                    <span>Keluar</span>
                                </button>
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="md:col-span-3">
                        <Outlet />
                    </main>
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default UserDashboard;

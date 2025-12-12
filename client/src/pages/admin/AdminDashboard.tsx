import { useEffect, useState } from 'react';
import api from '../../lib/api';
import { TrendingUp, Users, Package, DollarSign } from 'lucide-react';

interface DashboardStats {
    totalOrders: number;
    totalUsers: number;
    totalProducts: number;
    totalRevenue: number;
}

const AdminDashboard = () => {
    const [stats, setStats] = useState<DashboardStats>({
        totalOrders: 0,
        totalUsers: 0,
        totalProducts: 0,
        totalRevenue: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await api.get('/admin/dashboard/stats');
                setStats(res.data);
            } catch (error) {
                console.error('Failed to fetch stats', error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const statCards = [
        { title: 'Total Revenue', value: `$${stats.totalRevenue.toFixed(2)}`, icon: DollarSign, color: 'bg-green-500' },
        { title: 'Total Orders', value: stats.totalOrders, icon: TrendingUp, color: 'bg-blue-500' },
        { title: 'Total Users', value: stats.totalUsers, icon: Users, color: 'bg-purple-500' },
        { title: 'Total Products', value: stats.totalProducts, icon: Package, color: 'bg-orange-500' },
    ];

    if (loading) {
        return (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading dashboard...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold mb-2">Dashboard Overview</h2>
                <p className="text-gray-600">Ringkasan statistik toko Anda</p>
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.title} className="bg-white rounded-lg shadow-sm p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`${stat.color} p-3 rounded-lg`}>
                                    <Icon className="h-6 w-6 text-white" />
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm mb-1">{stat.title}</p>
                            <p className="text-3xl font-bold">{stat.value}</p>
                        </div>
                    );
                })}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="grid md:grid-cols-3 gap-4">
                    <a
                        href="/admin/products"
                        className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-center"
                    >
                        <Package className="h-8 w-8 mx-auto mb-2 text-gray-600" />
                        <p className="font-medium">Manage Products</p>
                    </a>
                    <a
                        href="/admin/orders"
                        className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-center"
                    >
                        <TrendingUp className="h-8 w-8 mx-auto mb-2 text-gray-600" />
                        <p className="font-medium">View Orders</p>
                    </a>
                    <a
                        href="/admin/users"
                        className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-center"
                    >
                        <Users className="h-8 w-8 mx-auto mb-2 text-gray-600" />
                        <p className="font-medium">Manage Users</p>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;

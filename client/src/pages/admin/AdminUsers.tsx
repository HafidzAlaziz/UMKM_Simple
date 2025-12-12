import { useEffect, useState } from 'react';
import api from '../../lib/api';

interface User {
    id: string;
    email: string;
    name: string;
    role: string;
    createdAt: string;
}

const AdminUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await api.get('/admin/users');
            setUsers(res.data);
        } catch (error) {
            console.error('Failed to fetch users', error);
        } finally {
            setLoading(false);
        }
    };

    const updateRole = async (userId: string, newRole: string) => {
        try {
            await api.patch(`/admin/users/${userId}/role`, { role: newRole });
            setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
            alert('Role updated successfully');
        } catch (error) {
            console.error('Failed to update role', error);
            alert('Failed to update role');
        }
    };

    const getRoleBadge = (role: string) => {
        const colors: Record<string, string> = {
            USER: 'bg-gray-100 text-gray-800',
            ADMIN: 'bg-blue-100 text-blue-800',
            SUPERADMIN: 'bg-purple-100 text-purple-800',
        };
        return colors[role] || 'bg-gray-100 text-gray-800';
    };

    if (loading) {
        return (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold">User Management</h2>
                <p className="text-gray-600">Kelola users dan roles</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <div className="font-medium text-gray-900">{user.name}</div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">
                                    {user.email}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleBadge(user.role)}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4">
                                    <select
                                        value={user.role}
                                        onChange={(e) => updateRole(user.id, e.target.value)}
                                        className="text-sm border rounded px-2 py-1"
                                    >
                                        <option value="USER">User</option>
                                        <option value="ADMIN">Admin</option>
                                        <option value="SUPERADMIN">Super Admin</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminUsers;

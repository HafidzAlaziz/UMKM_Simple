import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireAdmin?: boolean;
}

const ProtectedRoute = ({ children, requireAdmin = false }: ProtectedRouteProps) => {
    const { user, loading, isAdmin } = useAuth();

    if (loading) {
        return (
            <div className="container px-4 py-20 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading...</p>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (requireAdmin && !isAdmin) {
        return (
            <div className="container px-4 py-20 text-center">
                <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
                <p className="text-gray-600">You don't have permission to access this page.</p>
            </div>
        );
    }

    return <>{children}</>;
};

export default ProtectedRoute;

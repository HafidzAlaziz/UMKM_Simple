import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Cart from './pages/Cart';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

import Layout from './components/Layout';
import Home from './pages/Home';
import ProductListing from './pages/ProductListing';
import ProductDetail from './pages/ProductDetail';
import Categories from './pages/Categories';
import Brands from './pages/Brands';
import About from './pages/About';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import UserDashboard from './pages/user/Dashboard';
import Profile from './pages/user/Profile';
import Orders from './pages/user/Orders';
import Addresses from './pages/user/Addresses';
import Wishlist from './pages/user/Wishlist';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminUsers from './pages/admin/AdminUsers';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductListing />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/brands" element={<Brands />} />
              <Route path="/about" element={<About />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-success/:orderId" element={<OrderSuccess />} />

              {/* User Dashboard */}
              <Route path="/dashboard" element={<UserDashboard />}>
                <Route path="profile" element={<Profile />} />
                <Route path="orders" element={<Orders />} />
                <Route path="addresses" element={<Addresses />} />
                <Route path="wishlist" element={<Wishlist />} />
              </Route>

              {/* Admin Panel */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="users" element={<AdminUsers />} />
              </Route>
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

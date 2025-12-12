export interface User {
    id: string;
    email: string;
    name?: string;
    role: 'USER' | 'ADMIN' | 'SUPERADMIN';
}

export interface Category {
    id: string;
    name: string;
    image?: string;
}

export interface Brand {
    id: string;
    name: string;
    logo?: string;
}

export interface ProductVariant {
    id: string;
    name: string;
    stock: number;
    price?: number;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    images: string[];
    category?: Category;
    brand?: Brand;
    variants?: ProductVariant[];
    featured: boolean;
    createdAt: string;
}

export interface CartItem extends Product {
    quantity: number;
    selectedVariant?: ProductVariant; // Optional if variants exist
}

export interface Address {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
}

export interface OrderItem {
    id: string;
    productId: string;
    product?: Product;
    quantity: number;
    price: number;
}

export interface Order {
    id: string;
    userId: string;
    status: 'PENDING' | 'PAID' | 'SHIPPED' | 'COMPLETED' | 'CANCELLED';
    totalAmount: number;
    paymentMethod: string;
    shippingAddress: Address;
    items: OrderItem[];
    createdAt: string;
    updatedAt: string;
}

export interface AuthResponse {
    accessToken: string;
    user: User;
}

// Mock data for frontend-only deployment
export const MOCK_PRODUCTS = [
    {
        id: '1',
        name: 'Premium Wireless Headphones',
        price: 299,
        stock: 10,
        description: 'High fidelity audio experience with noise cancellation',
        images: ['https://via.placeholder.com/500x500/1e40af/ffffff?text=Headphones'],
        featured: true,
        createdAt: new Date().toISOString()
    },
    {
        id: '2',
        name: 'Minimalist Watch',
        price: 150,
        stock: 5,
        description: 'Classic design meets modern functionality',
        images: ['https://via.placeholder.com/500x500/f97316/ffffff?text=Watch'],
        featured: true,
        createdAt: new Date().toISOString()
    },
    {
        id: '3',
        name: 'Smart Fitness Tracker',
        price: 99,
        stock: 20,
        description: 'Track your health and fitness goals',
        images: ['https://via.placeholder.com/500x500/10b981/ffffff?text=Tracker'],
        featured: true,
        createdAt: new Date().toISOString()
    },
    {
        id: '4',
        name: 'Designer Backpack',
        price: 120,
        stock: 15,
        description: 'Carry your essentials in style',
        images: ['https://via.placeholder.com/500x500/8b5cf6/ffffff?text=Backpack'],
        featured: true,
        createdAt: new Date().toISOString()
    },
    {
        id: '5',
        name: 'Mirrorless Camera',
        price: 899,
        stock: 8,
        description: 'Professional photography made easy',
        images: ['https://via.placeholder.com/500x500/ef4444/ffffff?text=Camera'],
        featured: false,
        createdAt: new Date().toISOString()
    },
    {
        id: '6',
        name: 'Bluetooth Speaker',
        price: 79,
        stock: 25,
        description: 'Portable sound for any occasion',
        images: ['https://via.placeholder.com/500x500/06b6d4/ffffff?text=Speaker'],
        featured: false,
        createdAt: new Date().toISOString()
    }
];

// Set to true for frontend-only mode (no backend)
export const USE_MOCK_DATA = true;

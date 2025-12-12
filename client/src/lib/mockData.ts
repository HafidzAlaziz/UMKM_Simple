// Mock data for frontend-only deployment
export const MOCK_PRODUCTS = [
    {
        id: '1',
        name: 'Premium Wireless Headphones',
        price: 299,
        stock: 10,
        description: 'High fidelity audio experience with noise cancellation',
        images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'],
        featured: true,
        createdAt: new Date().toISOString()
    },
    {
        id: '2',
        name: 'Minimalist Watch',
        price: 150,
        stock: 5,
        description: 'Classic design meets modern functionality',
        images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'],
        featured: true,
        createdAt: new Date().toISOString()
    },
    {
        id: '3',
        name: 'Smart Fitness Tracker',
        price: 99,
        stock: 20,
        description: 'Track your health and fitness goals',
        images: ['https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500'],
        featured: true,
        createdAt: new Date().toISOString()
    },
    {
        id: '4',
        name: 'Designer Backpack',
        price: 120,
        stock: 15,
        description: 'Carry your essentials in style',
        images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500'],
        featured: true,
        createdAt: new Date().toISOString()
    },
    {
        id: '5',
        name: 'Mirrorless Camera',
        price: 899,
        stock: 8,
        description: 'Professional photography made easy',
        images: ['https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500'],
        featured: false,
        createdAt: new Date().toISOString()
    },
    {
        id: '6',
        name: 'Bluetooth Speaker',
        price: 79,
        stock: 25,
        description: 'Portable sound for any occasion',
        images: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500'],
        featured: false,
        createdAt: new Date().toISOString()
    }
];

// Set to true for frontend-only mode (no backend)
export const USE_MOCK_DATA = true;

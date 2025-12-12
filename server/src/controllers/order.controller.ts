import { Request, Response } from 'express';
import prisma from '../prisma';

// Create new order
export const createOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, items, shippingAddress, paymentMethod, totalAmount } = req.body;

        // Validate required fields
        if (!userId || !items || !shippingAddress || !paymentMethod || !totalAmount) {
            res.status(400).json({ message: 'Missing required fields' });
            return;
        }

        // Create order with items
        const order = await prisma.order.create({
            data: {
                userId,
                shippingAddress: JSON.stringify(shippingAddress),
                paymentMethod,
                totalAmount,
                status: 'PENDING',
                items: {
                    create: items.map((item: any) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.price
                    }))
                }
            },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }
        });

        res.status(201).json(order);
    } catch (error) {
        console.error('Create order error:', error);
        res.status(500).json({ message: 'Error creating order' });
    }
};

// Get user's orders
export const getUserOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;

        const orders = await prisma.order.findMany({
            where: { userId },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        // Parse shipping address JSON
        const ordersWithParsedAddress = orders.map(order => ({
            ...order,
            shippingAddress: JSON.parse(order.shippingAddress),
            totalAmount: Number(order.totalAmount)
        }));

        res.json(ordersWithParsedAddress);
    } catch (error) {
        console.error('Get user orders error:', error);
        res.status(500).json({ message: 'Error fetching orders' });
    }
};

// Get single order by ID
export const getOrderById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const order = await prisma.order.findUnique({
            where: { id },
            include: {
                items: {
                    include: {
                        product: true
                    }
                },
                user: {
                    select: {
                        id: true,
                        email: true,
                        name: true
                    }
                }
            }
        });

        if (!order) {
            res.status(404).json({ message: 'Order not found' });
            return;
        }

        // Parse shipping address and convert price
        const orderWithParsedData = {
            ...order,
            shippingAddress: JSON.parse(order.shippingAddress),
            totalAmount: Number(order.totalAmount),
            items: order.items.map(item => ({
                ...item,
                price: Number(item.price)
            }))
        };

        res.json(orderWithParsedData);
    } catch (error) {
        console.error('Get order error:', error);
        res.status(500).json({ message: 'Error fetching order' });
    }
};

// Update order status (Admin only)
export const updateOrderStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // Validate status
        const validStatuses = ['PENDING', 'PAID', 'SHIPPED', 'COMPLETED', 'CANCELLED'];
        if (!validStatuses.includes(status)) {
            res.status(400).json({ message: 'Invalid status' });
            return;
        }

        const order = await prisma.order.update({
            where: { id },
            data: { status },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }
        });

        res.json(order);
    } catch (error) {
        console.error('Update order status error:', error);
        res.status(500).json({ message: 'Error updating order status' });
    }
};

// Get all orders (Admin only)
export const getAllOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        const { status, page = 1, limit = 20 } = req.query;

        const pageNumber = Number(page);
        const limitNumber = Number(limit);
        const skip = (pageNumber - 1) * limitNumber;

        const where: any = {};
        if (status) {
            where.status = String(status);
        }

        const [orders, total] = await prisma.$transaction([
            prisma.order.findMany({
                where,
                include: {
                    user: {
                        select: {
                            id: true,
                            email: true,
                            name: true
                        }
                    },
                    items: {
                        include: {
                            product: true
                        }
                    }
                },
                orderBy: { createdAt: 'desc' },
                skip,
                take: limitNumber
            }),
            prisma.order.count({ where })
        ]);

        // Parse data
        const ordersWithParsedData = orders.map(order => ({
            ...order,
            shippingAddress: JSON.parse(order.shippingAddress),
            totalAmount: Number(order.totalAmount)
        }));

        res.json({
            data: ordersWithParsedData,
            meta: {
                total,
                page: pageNumber,
                limit: limitNumber,
                totalPages: Math.ceil(total / limitNumber)
            }
        });
    } catch (error) {
        console.error('Get all orders error:', error);
        res.status(500).json({ message: 'Error fetching orders' });
    }
};

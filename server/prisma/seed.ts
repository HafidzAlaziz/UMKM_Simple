import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding database...');

    // Categories
    const electronics = await prisma.category.upsert({
        where: { name: 'Electronics' },
        update: {},
        create: { name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049860654-af1a5c5668ba' },
    });

    const fashion = await prisma.category.upsert({
        where: { name: 'Fashion' },
        update: {},
        create: { name: 'Fashion', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050' },
    });

    const home = await prisma.category.upsert({
        where: { name: 'Home & Living' },
        update: {},
        create: { name: 'Home & Living', image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a' },
    });

    // Brands
    const apple = await prisma.brand.upsert({
        where: { name: 'Apple' },
        update: {},
        create: { name: 'Apple' },
    });

    const nike = await prisma.brand.upsert({
        where: { name: 'Nike' },
        update: {},
        create: { name: 'Nike' },
    });

    // Products
    // 1. iPhone 15 Pro
    await prisma.product.create({
        data: {
            name: 'iPhone 15 Pro',
            description: 'The first iPhone to feature an aerospace-grade titanium design, using the same alloy that spacecraft use for missions to Mars.',
            price: 999.00,
            stock: 50,
            categoryId: electronics.id,
            brandId: apple.id,
            images: JSON.stringify([
                'https://images.unsplash.com/photo-1696446701796-da61225697cc',
                'https://images.unsplash.com/photo-1695048133142-1a20484d2569'
            ]),
            featured: true,
            variants: {
                create: [
                    { name: 'Color: Natural Titanium', stock: 20 },
                    { name: 'Color: Blue Titanium', stock: 15 },
                    { name: 'Storage: 256GB', stock: 50 }
                ]
            }
        }
    });

    // 2. Nike Air Max
    await prisma.product.create({
        data: {
            name: 'Nike Air Max 270',
            description: 'Nike\'s first lifestyle Air Max brings you style, comfort and big attitude in the Nike Air Max 270.',
            price: 150.00,
            stock: 100,
            categoryId: fashion.id,
            brandId: nike.id,
            images: JSON.stringify([
                'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
                'https://images.unsplash.com/photo-1549298916-b41d501d3772'
            ]),
            featured: true,
            variants: {
                create: [
                    { name: 'Size: 42', stock: 30 },
                    { name: 'Size: 43', stock: 30 },
                    { name: 'Color: Black/White', stock: 60 }
                ]
            }
        }
    });

    // 3. Sony WH-1000XM5
    await prisma.product.create({
        data: {
            name: 'Sony WH-1000XM5',
            description: 'Industry-leading noise canceling headphones with Auto NC Optimizer, crystal clear hands-free calling, and up to 30-hour battery life.',
            price: 348.00,
            stock: 45,
            categoryId: electronics.id,
            brandId: null, // Generic or add Sony
            images: JSON.stringify([
                'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb',
                'https://images.unsplash.com/photo-1583394838336-acd977736f90'
            ]),
            featured: false,
        }
    });

    // 4. Modern Sofa
    await prisma.product.create({
        data: {
            name: 'Minimalist Sofa',
            description: 'A comfortable and stylish sofa perfect for modern living rooms.',
            price: 799.00,
            stock: 10,
            categoryId: home.id,
            images: JSON.stringify([
                'https://images.unsplash.com/photo-1555041469-a586c61ea9bc',
                'https://images.unsplash.com/photo-1550226891-ef816aed4a98'
            ]),
            featured: true,
        }
    });

    console.log('Seeding completed.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

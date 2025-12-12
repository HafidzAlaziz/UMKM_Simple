import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function createAdminUser() {
    try {
        // Hash password
        const hashedPassword = await bcrypt.hash('admin123', 10);

        // Create admin user
        const admin = await prisma.user.create({
            data: {
                email: 'admin@umkm.com',
                password: hashedPassword,
                name: 'Admin UMKM',
                role: 'ADMIN'
            }
        });

        console.log('✅ Admin user created successfully!');
        console.log('📧 Email: admin@umkm.com');
        console.log('🔑 Password: admin123');
        console.log('👤 Name:', admin.name);
        console.log('🎭 Role:', admin.role);
        console.log('\n🚀 You can now login at: http://localhost:5173/login');
        console.log('🔐 Admin panel: http://localhost:5173/admin/dashboard');

    } catch (error: any) {
        if (error.code === 'P2002') {
            console.log('⚠️  Admin user already exists!');
            console.log('📧 Email: admin@umkm.com');
            console.log('🔑 Password: admin123');
        } else {
            console.error('❌ Error creating admin user:', error);
        }
    } finally {
        await prisma.$disconnect();
    }
}

createAdminUser();

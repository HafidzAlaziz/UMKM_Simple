# Admin Panel Guide

## Akses Admin Panel

### 1. Buat Akun Admin

Untuk mengakses admin panel, Anda perlu akun dengan role ADMIN atau SUPERADMIN.

**Cara 1: Via Prisma Studio (Recommended)**

```bash
cd server
npm run prisma:studio
```

1. Buka browser di `http://localhost:5555`
2. Klik table **User**
3. Pilih user yang ingin dijadikan admin
4. Ubah field **role** dari `USER` menjadi `ADMIN`
5. Save changes

**Cara 2: Register lalu upgrade manual**

1. Register akun baru di `/register`
2. Gunakan Prisma Studio untuk upgrade role ke ADMIN

### 2. Login sebagai Admin

1. Login dengan akun yang sudah di-set sebagai ADMIN
2. Akses admin panel di: `http://localhost:5173/admin/dashboard`

## Fitur Admin Panel

### 📊 Dashboard (`/admin/dashboard`)

**Statistik Overview:**
- Total Revenue (pendapatan dari orders yang paid/shipped/completed)
- Total Orders
- Total Users
- Total Products

**Quick Actions:**
- Link cepat ke Products, Orders, Users management

### 📦 Product Management (`/admin/products`)

**Fitur:**
- ✅ View semua produk dalam table
- ✅ Delete produk (dengan konfirmasi)
- ⚠️ Edit produk (button ada, tapi form belum dibuat)
- ⚠️ Add produk (button ada, tapi form belum dibuat)

**Informasi yang ditampilkan:**
- Nama produk
- Category
- Brand
- Price
- Stock (dengan color coding: hijau >10, kuning 1-10, merah 0)

### 🛍️ Order Management (`/admin/orders`)

**Fitur:**
- ✅ View semua orders
- ✅ Update status order (dropdown langsung di table)
- Informasi customer (nama & email)
- Total amount
- Tanggal order

**Status yang tersedia:**
- PENDING - Order baru masuk
- PAID - Sudah dibayar
- SHIPPED - Sedang dikirim
- COMPLETED - Selesai
- CANCELLED - Dibatalkan

### 👥 User Management (`/admin/users`)

**Fitur:**
- ✅ View semua users
- ✅ Update role user (dropdown langsung di table)
- Informasi join date
- Email & nama user

**Roles yang tersedia:**
- USER - User biasa
- ADMIN - Administrator
- SUPERADMIN - Super Administrator

## Keamanan

### Protected Routes

Admin panel dilindungi dengan:
1. **Authentication** - Harus login
2. **Authorization** - Harus role ADMIN atau SUPERADMIN
3. Jika user biasa mencoba akses `/admin/*`, akan muncul "Access Denied"

### API Protection

⚠️ **PENTING**: Saat ini API admin belum dilindungi dengan middleware auth!

**TODO untuk production:**
```typescript
// Tambahkan middleware di server/src/routes/admin.routes.ts
import { requireAuth, requireAdmin } from '../middleware/auth';

router.use(requireAuth);
router.use(requireAdmin);
```

## Navigasi Admin

**Sidebar Menu:**
- 📊 Dashboard - Overview & stats
- 📦 Produk - Product management
- 🛍️ Pesanan - Order management  
- 👥 Users - User management

**Header:**
- Nama admin yang login
- Tombol Logout

## Tips Penggunaan

1. **Update Order Status**: Klik dropdown status langsung di table orders
2. **Delete Product**: Klik icon trash, akan ada konfirmasi
3. **Change User Role**: Klik dropdown role langsung di table users
4. **View Stats**: Dashboard akan auto-refresh saat dibuka

## Troubleshooting

**"Access Denied"**
- Pastikan user sudah di-set sebagai ADMIN di database
- Logout dan login ulang setelah upgrade role

**Data tidak muncul**
- Pastikan server running
- Check browser console untuk error
- Pastikan database sudah ada data (jalankan seed)

**API Error 401/403**
- Pastikan sudah login
- Check access token di localStorage
- Coba logout dan login ulang

## Next Steps (Opsional)

Fitur yang bisa ditambahkan:
- [ ] Form Add/Edit Product
- [ ] Form Add/Edit Category & Brand
- [ ] Order detail view
- [ ] Export orders to CSV
- [ ] Dashboard charts (revenue over time)
- [ ] Product image upload
- [ ] Bulk actions (delete multiple products)

---

**Admin Panel sudah siap digunakan!** 🎉

Akses di: `http://localhost:5173/admin/dashboard`

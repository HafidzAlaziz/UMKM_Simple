# Login & Register Guide

## Cara Menggunakan Aplikasi

### 1. Register (Daftar Akun Baru)

1. Buka browser dan akses: `http://localhost:5173/register`
2. Isi form pendaftaran:
   - **Nama Lengkap**: Masukkan nama Anda
   - **Email**: Gunakan email valid (contoh: `user@example.com`)
   - **Password**: Minimal 6 karakter
   - **Konfirmasi Password**: Harus sama dengan password
3. Klik tombol **"Daftar"**
4. Jika berhasil, Anda akan otomatis login dan diarahkan ke halaman utama

### 2. Login (Masuk)

1. Buka browser dan akses: `http://localhost:5173/login`
2. Isi form login:
   - **Email**: Email yang sudah didaftarkan
   - **Password**: Password akun Anda
3. Klik tombol **"Masuk"**
4. Jika berhasil, Anda akan diarahkan ke halaman utama

### 3. Akun Test yang Tersedia

Jika Anda sudah menjalankan seed database, gunakan akun ini:

**User Biasa:**
- Email: `test@example.com`
- Password: `password123`

**Cara Membuat Akun Test Manual:**

Jalankan di terminal:

```bash
cd server
npm run prisma:seed
```

Atau buat akun baru melalui halaman Register.

### 4. Troubleshooting Login

**Jika login tidak berhasil:**

1. **Pastikan server berjalan:**
   ```bash
   cd server
   npm run dev
   ```
   Server harus berjalan di `http://localhost:5000`

2. **Pastikan client berjalan:**
   ```bash
   cd client
   npm run dev
   ```
   Client harus berjalan di `http://localhost:5173`

3. **Cek error di browser console:**
   - Buka Developer Tools (F12)
   - Lihat tab Console untuk error
   - Lihat tab Network untuk melihat request/response

4. **Cek database:**
   ```bash
   cd server
   npm run prisma:studio
   ```
   Buka Prisma Studio dan cek apakah user sudah terdaftar

5. **Error umum dan solusi:**
   - **"Invalid credentials"** → Email atau password salah
   - **"Network Error"** → Server tidak berjalan
   - **"User already exists"** → Email sudah terdaftar, gunakan login

### 5. Setelah Login Berhasil

Setelah login, Anda bisa:
- Melihat nama Anda di header (icon user)
- Klik icon user untuk ke Dashboard
- Akses fitur:
  - Profile Management
  - Order History
  - Address Management
  - Wishlist

### 6. Logout

Untuk keluar dari akun:
1. Klik icon User di header
2. Masuk ke Dashboard
3. Klik tombol **"Keluar"** di sidebar

---

## Quick Test

Untuk test cepat, gunakan credentials ini:

```
Email: test@example.com
Password: password123
```

Jika akun belum ada, daftar dulu di `/register` dengan data apapun yang Anda inginkan.

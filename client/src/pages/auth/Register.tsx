import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';

const Register = () => {
    const navigate = useNavigate();
    const { register: registerUser } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (password !== confirmPassword) {
            setError('Password tidak cocok');
            return;
        }
        setLoading(true);
        try {
            await registerUser(email, password, name);
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registrasi gagal');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-primary">Buat Akun</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Sudah punya akun? <Link to="/login" className="font-medium text-secondary hover:text-secondary/90">Masuk</Link>
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="rounded-md bg-red-50 p-4 border border-red-200">
                            <p className="text-sm text-red-800">{error}</p>
                        </div>
                    )}
                    <div className="space-y-4 rounded-md shadow-sm">
                        <div>
                            <Label htmlFor="name">Nama Lengkap</Label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                required
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="email-address">Alamat Email</Label>
                            <Input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                placeholder="nama@perusahaan.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="password">Kata Sandi</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                placeholder="Kata Sandi"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="confirm-password">Konfirmasi Kata Sandi</Label>
                            <Input
                                id="confirm-password"
                                name="confirmPassword"
                                type="password"
                                autoComplete="new-password"
                                required
                                placeholder="Konfirmasi Kata Sandi"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <Button
                            type="submit"
                            className="w-full"
                            size="lg"
                            disabled={loading}
                        >
                            {loading ? 'Memproses...' : 'Daftar'}
                        </Button>
                    </div>

                    <div className="text-center">
                        <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">
                            ← Kembali ke Beranda
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;

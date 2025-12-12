import { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Plus, MapPin, Trash2, Edit } from 'lucide-react';
import type { Address } from '../../types';

const Addresses = () => {
    const [addresses, setAddresses] = useState<(Address & { id: string; isDefault: boolean })[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<Address>({
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'Indonesia',
        phone: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingId) {
            setAddresses(addresses.map(addr =>
                addr.id === editingId ? { ...formData, id: editingId, isDefault: addr.isDefault } : addr
            ));
            setEditingId(null);
        } else {
            const newAddress = {
                ...formData,
                id: Date.now().toString(),
                isDefault: addresses.length === 0
            };
            setAddresses([...addresses, newAddress]);
        }
        setFormData({ street: '', city: '', state: '', zipCode: '', country: 'Indonesia', phone: '' });
        setShowForm(false);
    };

    const handleEdit = (address: Address & { id: string }) => {
        setFormData(address);
        setEditingId(address.id);
        setShowForm(true);
    };

    const handleDelete = (id: string) => {
        setAddresses(addresses.filter(addr => addr.id !== id));
    };

    const setDefault = (id: string) => {
        setAddresses(addresses.map(addr => ({ ...addr, isDefault: addr.id === id })));
    };

    return (
        <div className="border rounded-lg p-6 bg-white">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Alamat Pengiriman</h2>
                {!showForm && (
                    <Button onClick={() => setShowForm(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Tambah Alamat
                    </Button>
                )}
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded-lg bg-gray-50">
                    <h3 className="font-semibold mb-4">{editingId ? 'Edit Alamat' : 'Alamat Baru'}</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <Label htmlFor="street">Alamat Lengkap *</Label>
                            <Input
                                id="street"
                                value={formData.street}
                                onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="city">Kota *</Label>
                            <Input
                                id="city"
                                value={formData.city}
                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="state">Provinsi *</Label>
                            <Input
                                id="state"
                                value={formData.state}
                                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="zipCode">Kode Pos *</Label>
                            <Input
                                id="zipCode"
                                value={formData.zipCode}
                                onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="phone">Nomor Telepon *</Label>
                            <Input
                                id="phone"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex gap-3 mt-4">
                        <Button type="submit">{editingId ? 'Update' : 'Simpan'}</Button>
                        <Button type="button" variant="outline" onClick={() => {
                            setShowForm(false);
                            setEditingId(null);
                            setFormData({ street: '', city: '', state: '', zipCode: '', country: 'Indonesia', phone: '' });
                        }}>
                            Batal
                        </Button>
                    </div>
                </form>
            )}

            {addresses.length === 0 ? (
                <div className="text-center py-12">
                    <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">Belum ada alamat tersimpan</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {addresses.map((address) => (
                        <div key={address.id} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    {address.isDefault && (
                                        <span className="inline-block px-2 py-1 bg-primary text-white text-xs rounded mb-2">
                                            Alamat Utama
                                        </span>
                                    )}
                                    <p className="font-medium">{address.street}</p>
                                    <p className="text-sm text-gray-600">
                                        {address.city}, {address.state} {address.zipCode}
                                    </p>
                                    <p className="text-sm text-gray-600">{address.country}</p>
                                    <p className="text-sm text-gray-600 mt-1">Telp: {address.phone}</p>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" onClick={() => handleEdit(address)}>
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={() => handleDelete(address.id)}>
                                        <Trash2 className="h-4 w-4 text-red-600" />
                                    </Button>
                                </div>
                            </div>
                            {!address.isDefault && (
                                <Button
                                    variant="link"
                                    size="sm"
                                    className="mt-2 p-0 h-auto"
                                    onClick={() => setDefault(address.id)}
                                >
                                    Jadikan Alamat Utama
                                </Button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Addresses;

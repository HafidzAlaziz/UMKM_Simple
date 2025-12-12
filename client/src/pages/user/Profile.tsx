import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';

const Profile = () => {
    const { user } = useAuth();
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [phone, setPhone] = useState('');

    const handleSave = () => {
        // TODO: API call to update profile
        console.log('Update profile:', { name, email, phone });
        setEditing(false);
    };

    return (
        <div className="border rounded-lg p-6 bg-white">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Profil Saya</h2>
                {!editing && (
                    <Button onClick={() => setEditing(true)} variant="outline">
                        Edit Profil
                    </Button>
                )}
            </div>

            <div className="space-y-4">
                <div>
                    <Label htmlFor="name">Nama Lengkap</Label>
                    <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={!editing}
                    />
                </div>
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={!editing}
                    />
                </div>
                <div>
                    <Label htmlFor="phone">Nomor Telepon</Label>
                    <Input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        disabled={!editing}
                        placeholder="08123456789"
                    />
                </div>

                {editing && (
                    <div className="flex gap-3 pt-4">
                        <Button onClick={handleSave}>Simpan Perubahan</Button>
                        <Button variant="outline" onClick={() => setEditing(false)}>
                            Batal
                        </Button>
                    </div>
                )}
            </div>

            <div className="mt-8 pt-8 border-t">
                <h3 className="font-semibold mb-4">Ubah Password</h3>
                <div className="space-y-4 max-w-md">
                    <div>
                        <Label htmlFor="current-password">Password Saat Ini</Label>
                        <Input id="current-password" type="password" />
                    </div>
                    <div>
                        <Label htmlFor="new-password">Password Baru</Label>
                        <Input id="new-password" type="password" />
                    </div>
                    <div>
                        <Label htmlFor="confirm-password">Konfirmasi Password Baru</Label>
                        <Input id="confirm-password" type="password" />
                    </div>
                    <Button>Ubah Password</Button>
                </div>
            </div>
        </div>
    );
};

export default Profile;

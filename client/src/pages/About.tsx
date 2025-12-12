const About = () => {
    return (
        <div className="container px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-6">Tentang UMKM Store</h1>

                <div className="prose prose-lg max-w-none">
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        Selamat datang di <strong>UMKM Store</strong>, destinasi belanja online terpercaya untuk produk berkualitas tinggi dengan harga terjangkau.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">Visi Kami</h2>
                    <p className="text-gray-700 leading-relaxed mb-6">
                        Menjadi platform e-commerce terdepan yang mendukung UMKM lokal dan memberikan pengalaman belanja online terbaik bagi pelanggan di seluruh Indonesia.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">Misi Kami</h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                        <li>Menyediakan produk berkualitas dengan harga kompetitif</li>
                        <li>Mendukung pertumbuhan UMKM lokal</li>
                        <li>Memberikan layanan pelanggan yang responsif dan profesional</li>
                        <li>Memastikan keamanan dan kenyamanan berbelanja online</li>
                    </ul>

                    <h2 className="text-2xl font-bold mt-8 mb-4">Mengapa Memilih Kami?</h2>
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="border rounded-lg p-6 bg-gray-50">
                            <h3 className="font-semibold text-lg mb-2">✨ Produk Berkualitas</h3>
                            <p className="text-gray-600">Semua produk telah melalui kurasi ketat untuk memastikan kualitas terbaik.</p>
                        </div>
                        <div className="border rounded-lg p-6 bg-gray-50">
                            <h3 className="font-semibold text-lg mb-2">🚚 Pengiriman Cepat</h3>
                            <p className="text-gray-600">Pengiriman ke seluruh Indonesia dengan berbagai pilihan ekspedisi.</p>
                        </div>
                        <div className="border rounded-lg p-6 bg-gray-50">
                            <h3 className="font-semibold text-lg mb-2">💳 Pembayaran Aman</h3>
                            <p className="text-gray-600">Berbagai metode pembayaran yang aman dan terpercaya.</p>
                        </div>
                        <div className="border rounded-lg p-6 bg-gray-50">
                            <h3 className="font-semibold text-lg mb-2">🎁 Harga Terbaik</h3>
                            <p className="text-gray-600">Dapatkan produk premium dengan harga yang kompetitif.</p>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold mt-8 mb-4">Hubungi Kami</h2>
                    <p className="text-gray-700 leading-relaxed mb-2">
                        <strong>Email:</strong> support@umkmstore.com
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-2">
                        <strong>Telepon:</strong> +62 812-3456-7890
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-6">
                        <strong>Alamat:</strong> Jakarta, Indonesia
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;

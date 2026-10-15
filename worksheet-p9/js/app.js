// Worksheet P9: data dan fungsi murni, tanpa event listener DOM.
export const profil = {
  nama: 'Tubagus Zaina Al Arifin Bahri',
  peran: 'Mahasiswa Informatika',
  perkenalan: 'Saya adalah mahasiswa Informatika yang tertarik pada pengembangan web dan teknologi informasi.',
  bidang: 'Frontend Development',
  hobi: ['Lari', 'Programming', 'Gaming'],
  keahlian: ['HTML', 'CSS', 'JavaScript']
};

export const daftarProyek = [
  { judul: 'Halaman Profil', deskripsi: 'Web biodata pribadi.', tahun: 2026, selesai: true },
  { judul: 'Katalog Produk', deskripsi: 'Katalog barang jualan UMKM.', tahun: 2026, selesai: false },
  { judul: 'Aplikasi Harian Lari', deskripsi: 'Mencatat jarak dan waktu lari harian.', tahun: 2025, selesai: false },
  { judul: 'Website FAQ', deskripsi: 'Halaman tanya jawab untuk pengguna.', tahun: 2025, selesai: true }
];

export function buatPerkenalan({ nama, peran = 'mahasiswa' }) {
  return `Halo, nama saya ${nama}, saya seorang ${peran}.`;
}

export function formatKeahlian(daftar, pemisah = ', ') {
  return daftar.join(pemisah);
}

// Materi P8 tetap dapat dicoba tanpa mengubah array asli.
console.table(daftarProyek);
console.log('map:', daftarProyek.map(p => p.judul));
console.log('filter:', daftarProyek.filter(p => p.selesai));
console.log('find:', daftarProyek.find(p => p.judul === 'Katalog Produk'));
console.log('reduce:', daftarProyek.reduce(jumlah => jumlah + 1, 0));
console.log('sort salinan:', [...daftarProyek].sort((a, b) => a.tahun - b.tahun));
console.log('fungsi murni:', buatPerkenalan(profil), formatKeahlian(profil.keahlian));

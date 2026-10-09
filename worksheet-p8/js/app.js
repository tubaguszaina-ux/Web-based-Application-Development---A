// javascript (A)
const profil = {
  nama: "Tubagus Zaina Al Arifin Bahri",
  peran: "Mahasiswa Informatika",
  hobi: "Lari",
  keahlian: [
    "HTML",
    "CSS",
    "JavaScript",
  ],
};

const JumlahProyek = 8;

const kalimat = `Nama saya ${profil.nama}, saya ${profil.peran}, hobi saya adalah ${profil.hobi}`;

console.log(kalimat);
console.log(profil.keahlian);
console.log(JumlahProyek);

// fungsi deklarasi (B)
// first function declaration
function buatPerkenalan({
   nama, peran
  }) {
  return `Halo, nama saya ${nama} - Saya seorang ${peran}.`;
} 

// second function declaration
const formatKeahlian = (daftar) => daftar.join(" . ");

console.log(buatPerkenalan(profil));
console.log((formatKeahlian(profil.keahlian)));

// Dua fungsi murni (C)
console.log(buatPerkenalan({
  nama: "Zena",
  peran: "pelari kalcer"
}));

console.log(formatKeahlian([
  "Easy run", 
  "Interval run", 
  "Tempo run", 
  "Long run"
]));

// Array of objects (D)
// console.table
const daftarProyek = [
  {
    judul: "Halaman Profil",
    tahun: 2023,
    selesai: true
  },
  {
    judul: "Katalog Produk",
    tahun: 2026,
    selesai: false 
  },
  {
    judul: "Website FAQ",
    tahun: 2026,
    selesai: true
  }
];

console.table(daftarProyek);

// filter()
const selesai = daftarProyek.filter((proyek) => proyek.selesai);

console.table(selesai);

// find()
const katalog = daftarProyek.find(
  (proyek) => proyek.judul === "Katalog Produk"
);

console.table(katalog);

// map()
const judulProyek = daftarProyek.map(
  (proyek) => proyek.judul
);

console.log(judulProyek);

// reduce()
const totalProyek = daftarProyek.reduce(
  (total, proyek) => total + 1, 0
);

console.log(totalProyek);

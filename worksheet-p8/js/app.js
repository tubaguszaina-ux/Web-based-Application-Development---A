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

const kalimat = `Nama saya ${profil.nama}, saya ${profil.peran}, hobi saya adalah ${profil.hobi}`;

console.log(kalimat);
console.log(profil.keahlian);

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
    deskripsi: "web informasi biodata pribadi, keahlian, hoby.",
    tahun: 2026,
    selesai: true
  },
  {
    judul: "Katalog Produk",
    deskripsi: "Katalog Barang Jualan UMKM.",
    tahun: 2026,
    selesai: false 
  },
  {
    judul: "Aplikasi Catatan Keuangan",
    deskripsi: "Aplikasi sederhana untuk mencatat pemasukan dan pengeluaran harian.",
    tahun: 2025,
    selesai: false
  },
  {
    judul: "Website FAQ",
    deskripsi: "Halaman tanya jawabuntuk pengguna menemukan informasi.",
    tahun: 2025,
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

const badanTabelProyek = document.querySelector("#daftar-proyek");
const jumlahProyek = document.querySelector("#jumlah-proyek");
const hasilFilter = document.querySelector("#hasil-filter");
const tombolFilter = document.querySelectorAll(".filter-tombol");

if (!badanTabelProyek || !jumlahProyek || !hasilFilter) {
  throw new Error("Elemen daftar proyek tidak ditemukan.");
}

let filterAktifSaatIni = "semua";

function tampilkanProyek(filterAktif = "semua") {
  const proyekDitampilkan = daftarProyek.filter((proyek) => {
    if (filterAktif === "selesai") return proyek.selesai;
    if (filterAktif === "berjalan") return !proyek.selesai;
    return true;
  });

  badanTabelProyek.replaceChildren(
    ...proyekDitampilkan.map((proyek) => {
      const baris = document.createElement("tr");
      const namaProyek = document.createElement("th");
      const deskripsiProyek = document.createElement("td");
      const tahunProyek = document.createElement("td");
      const statusProyek = document.createElement("td");
      const labelStatus = document.createElement("span");

      namaProyek.scope = "row";
      namaProyek.textContent = proyek.judul;
      deskripsiProyek.textContent = proyek.deskripsi;
      tahunProyek.textContent = proyek.tahun;
      labelStatus.className = `status status--${proyek.selesai ? "selesai" : "berjalan"}`;
      labelStatus.textContent = proyek.selesai ? "Selesai" : "Berjalan";
      statusProyek.append(labelStatus);
      baris.append(namaProyek, deskripsiProyek, tahunProyek, statusProyek);

      return baris;
    })
  );

  jumlahProyek.textContent = daftarProyek.length;
  hasilFilter.textContent = filterAktif === "semua"
    ? ""
    : `Menampilkan ${proyekDitampilkan.length} proyek ${filterAktif}.`;
}

tombolFilter.forEach((tombol) => {
  tombol.addEventListener("click", () => {
    const filterAktif = tombol.dataset.filter;

    filterAktifSaatIni = filterAktif;
    tombolFilter.forEach((item) => {
      item.setAttribute("aria-pressed", String(item === tombol));
    });
    tampilkanProyek(filterAktif);
  });
});

tampilkanProyek();

// Debugging JavaScript (E)
// undefined
const namaTeman = "Zena";

console.log(namaTeman); // output: Zena
console.log(typeof namaTemanTeman); // output: undefined

// Cannot read properties of null
const nama = document.querySelector("#nama");

if (nama) {
    console.log(nama.textContent);
}

const tombol = document.querySelector("#tombol-simpan"); 
if (tombol) {
  tombol.addEventListener("click", () => {
  });
}

console.log("Diklik");

// input still string
const inputAngka = document.querySelector("#angka");

if (inputAngka) {
  const angka = Number(inputAngka.value);
  console.log(angka + 5);
}

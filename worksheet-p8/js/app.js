// ===================== LEMBAR A - Sambungkan skrip =====================
console.log("A: app.js terhubung");


// ===================== LEMBAR B - Data sebagai variabel =====================
const profil = {
  nama: "Tubagus Zaina Al Arifin Bahri",
  peran: "Mahasiswa Informatika",
  perkenalan: "Saya mahasiswa informatika yang tertarik dengan pengembangan web.",
  bidang: "Frontend Development",
  hobi: ["pelari", "programmer", "gamer"],
  keahlian: ["HTML", "CSS", "JavaScript"],
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

// ===================== LEMBAR D - Array of object dan array methods =====================
const daftarProyek = [
  { judul: "Halaman Profil", deskripsi: "Web biodata pribadi.", tahun: 2026, selesai: true },
  { judul: "Katalog Produk", deskripsi: "Katalog barang jualan UMKM.", tahun: 2026, selesai: false },
  { judul: "Aplikasi Catatan Keuangan", deskripsi: "Mencatat pemasukan dan pengeluaran harian.", tahun: 2025, selesai: false },
  { judul: "Website FAQ", deskripsi: "Halaman tanya jawab untuk pengguna.", tahun: 2025, selesai: true },
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
const formProyek = document.querySelector("#form-proyek");
const pesanForm = document.querySelector("#pesan-form");
let filterAktif = "semua";

function buatBaris(proyek) {
  const baris = document.createElement("tr");
  const nama = document.createElement("th");
  nama.scope = "row";
  nama.textContent = proyek.judul;
  const deskripsi = document.createElement("td");
  deskripsi.textContent = proyek.deskripsi;
  const tahun = document.createElement("td");
  tahun.textContent = proyek.tahun;
  baris.append(nama, deskripsi, tahun);
  return baris;
}

function tampilkanProyek(filter = "semua") {
  const tampil = daftarProyek.filter((p) => {
    if (filter === "selesai") return p.selesai;
    if (filter === "berjalan") return !p.selesai;
    return true;
  });
  badanTabel?.replaceChildren(...tampil.map(buatBaris));
  if (jumlahProyek) jumlahProyek.textContent = daftarProyek.length;
  if (hasilFilter) {
    hasilFilter.textContent = filter === "semua" ? "" : `Menampilkan ${tampil.length} proyek ${filter}.`;
  }
}

document.querySelectorAll(".filter-tombol").forEach((tombol) => {
  tombol.addEventListener("click", () => {
    filterAktif = tombol.dataset.filter ?? "semua";
    document.querySelectorAll(".filter-tombol").forEach((t) => {
      t.setAttribute("aria-pressed", String(t === tombol));
    });
    tampilkanProyek(filterAktif);
  });
});

formProyek?.addEventListener("submit", (event) => {
  event.preventDefault();

  const dataForm = new FormData(formProyek);
  const proyekBaru = {
    judul: dataForm.get("judul").trim(),
    deskripsi: dataForm.get("deskripsi").trim(),
    tahun: Number(dataForm.get("tahun")),
    selesai: dataForm.get("selesai") === "true",
  };

  daftarProyek.push(proyekBaru);
  filterAktif = "semua";
  document.querySelectorAll(".filter-tombol").forEach((tombol) => {
    tombol.setAttribute("aria-pressed", String(tombol.dataset.filter === filterAktif));
  });
  tampilkanProyek(filterAktif);
  formProyek.reset();
  if (pesanForm) pesanForm.textContent = `Proyek "${proyekBaru.judul}" berhasil ditambahkan.`;
});

formProyek?.addEventListener("reset", () => {
  if (pesanForm) pesanForm.textContent = "";
});

tampilkanProyek();


// ===================== LEMBAR E - Membaca galat =====================
// Kode di bawah aman. Untuk membuat galat: lepas "// " pada SATU blok GALAT,
// muat ulang, baca pesan dan barisnya di Console, lalu pasang "// " lagi.

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

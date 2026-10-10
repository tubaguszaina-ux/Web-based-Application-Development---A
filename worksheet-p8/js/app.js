// javascript (A)
const profil = {
  nama: "Tubagus Zaina Al Arifin Bahri",
  peran: "Mahasiswa Informatika",
  hobi: ["pelari", "programmer", "gamer"],
  perkenalan: "Saya adalah seorang mahasiswa informatika yang tertarik dengan pengembangan web dan teknologi informasi.",
  bidang: "Frontend Development",
  keahlian: [
    "HTML",
    "CSS",
    "JavaScript",
  ],
};

const kalimat = `Nama saya ${profil.nama}, saya ${profil.peran}, hobi saya adalah ${profil.hobi.join(", ")}`;

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

// sort pada salinan: daftarProyek asli tidak berubah (D)
const proyekUrutTahun = [...daftarProyek].sort((a, b) => a.tahun - b.tahun);

console.table(proyekUrutTahun);
console.log(daftarProyek[0].judul);      // tetap "Halaman Profil"
console.log(proyekUrutTahun[0].judul);   // "Aplikasi Catatan Keuangan" (2025)

// Salin objek: dengan dan tanpa { ...profil } (F.3)
const salinanDangkal = { ...profil };
salinanDangkal.nama = "Nama Percobaan";
console.log(profil.nama);                // tetap asli, karena disalin

const hanyaPenunjuk = profil;            // tanpa tiga titik: hanya menunjuk objek yang sama
hanyaPenunjuk.peran = "Peran Percobaan";
console.log(profil.peran);               // ikut berubah!
hanyaPenunjuk.peran = "Mahasiswa Informatika"; // kembalikan agar halaman tidak terpengaruh

const badanTabelProyek = document.querySelector("#daftar-proyek");
const jumlahProyek = document.querySelector("#jumlah-proyek");
const hasilFilter = document.querySelector("#hasil-filter");
const tombolFilter = document.querySelectorAll(".filter-tombol");

if (!badanTabelProyek || !jumlahProyek || !hasilFilter) {
  throw new Error("Elemen daftar proyek tidak ditemukan.");
}

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

// let: nilainya berubah setiap kali tombol filter diklik
let filterSaatIni = "semua";

tombolFilter.forEach((tombol) => {
  tombol.addEventListener("click", () => {
    const filterAktif = tombol.dataset.filter;
    filterSaatIni = filterAktif;

    tombolFilter.forEach((item) => {
      item.setAttribute("aria-pressed", String(item === tombol));
    });
    tampilkanProyek(filterAktif);
  });
});

tampilkanProyek();

// Identitas halaman dirender dari data (B) - ditulis sekali, dipakai di banyak tempat
function isiTeks(selector, teks) {
  const elemen = document.querySelector(selector);
  if (elemen) elemen.textContent = teks;
}

function buatDaftarChip(daftar) {
  return daftar.map((isi) => {
    const item = document.createElement("li");
    item.textContent = isi;
    return item;
  });
}

document.title = `${profil.nama} - Profil Mahasiswa`;
isiTeks("#nama", profil.nama);
isiTeks("#peran", profil.peran);
isiTeks("#perkenalan", profil.perkenalan);
isiTeks("#tabel-nama", profil.nama);
isiTeks("#tabel-peran", profil.peran);
isiTeks("#keahlian-ringkas", profil.bidang ?? "-");
document.querySelector("#daftar-hobi")?.replaceChildren(...buatDaftarChip(profil.hobi));
document.querySelector("#daftar-keahlian")?.replaceChildren(...buatDaftarChip(profil.keahlian));

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

// input still string
const inputAngka = document.querySelector("#angka");

if (inputAngka) {
  const angka = Number(inputAngka.value);
  console.log(angka + 5);
}

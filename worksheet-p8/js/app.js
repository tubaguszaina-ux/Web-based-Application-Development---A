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

let filterSaatIni = "semua"; // let: nilainya berubah saat tombol filter diklik

console.log(`B: Nama saya ${profil.nama}, saya ${profil.peran}.`); // template literal
console.log("B:", profil.alamat?.kota);       // ?. -> undefined, bukan galat
console.log("B:", profil.bidang ?? "-");      // ?? -> nilai bawaan bila null/undefined
console.log("B:", 0 === "");                  // === membandingkan tipe juga -> false

// Pasang data ke halaman
function isiTeks(selector, teks) {
  const elemen = document.querySelector(selector);
  if (elemen) elemen.textContent = teks;
}

function buatDaftar(selector, daftar) {
  const ul = document.querySelector(selector);
  ul?.replaceChildren(
    ...daftar.map((isi) => {
      const li = document.createElement("li");
      li.textContent = isi;
      return li;
    })
  );
}

document.title = `${profil.nama} - Profil Mahasiswa`;
isiTeks("#nama", profil.nama);
isiTeks("#peran", profil.peran);
isiTeks("#perkenalan", profil.perkenalan);
isiTeks("#tabel-nama", profil.nama);
isiTeks("#tabel-peran", profil.peran);
isiTeks("#keahlian-ringkas", profil.bidang);
buatDaftar("#daftar-hobi", profil.hobi);
buatDaftar("#daftar-keahlian", profil.keahlian);


// ===================== LEMBAR C - Dua fungsi murni =====================
function buatPerkenalan({ nama, peran = "mahasiswa" }) {
  return `Halo, nama saya ${nama} - saya seorang ${peran}.`;
}

function formatKeahlian(daftar, pemisah = ", ") {
  return daftar.join(pemisah);
}

console.log("C:", buatPerkenalan(profil));
console.log("C:", buatPerkenalan({ nama: "Zena", peran: "pelari" }));
console.log("C:", formatKeahlian(profil.keahlian));
console.log("C:", formatKeahlian(["Easy run", "Tempo run"], " . "));


// ===================== LEMBAR D - Array of object dan array methods =====================
const daftarProyek = [
  { judul: "Halaman Profil", deskripsi: "Web biodata pribadi.", tahun: 2026, selesai: true },
  { judul: "Katalog Produk", deskripsi: "Katalog barang jualan UMKM.", tahun: 2026, selesai: false },
  { judul: "Aplikasi Catatan Keuangan", deskripsi: "Mencatat pemasukan dan pengeluaran harian.", tahun: 2025, selesai: false },
  { judul: "Website FAQ", deskripsi: "Halaman tanya jawab untuk pengguna.", tahun: 2025, selesai: true },
];

console.table(daftarProyek);                                                    // seluruh isi
console.table(daftarProyek.filter((p) => p.selesai));                           // filter: subset
console.table(daftarProyek.find((p) => p.judul === "Katalog Produk"));          // find: satu isi
console.log("D:", daftarProyek.map((p) => p.judul));                            // map: array judul

const totalProyek = daftarProyek.reduce((jumlah) => jumlah + 1, 0);             // reduce: satu angka
console.log("D: total =", totalProyek);

const urutTahun = [...daftarProyek].sort((a, b) => a.tahun - b.tahun);          // sort pada salinan
console.log("D:", daftarProyek[0].judul, "(asli) |", urutTahun[0].judul, "(salinan)");

// Tampilkan ke halaman
const badanTabel = document.querySelector("#daftar-proyek");
const hasilFilter = document.querySelector("#hasil-filter");
const formProyek = document.querySelector("#form-proyek");
const pesanProyek = document.querySelector("#pesan-proyek");

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
  isiTeks("#jumlah-proyek", daftarProyek.length);
  if (hasilFilter) {
    hasilFilter.textContent = filter === "semua" ? "" : `Menampilkan ${tampil.length} proyek ${filter}.`;
  }
}

document.querySelectorAll(".filter-tombol").forEach((tombol) => {
  tombol.addEventListener("click", () => {
    filterSaatIni = tombol.dataset.filter;
    document.querySelectorAll(".filter-tombol").forEach((t) => {
      t.setAttribute("aria-pressed", String(t === tombol));
    });
    tampilkanProyek(filterSaatIni);
  });
});

formProyek?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(formProyek);
  const tahun = Number(data.get("tahun")); // nilai kolom isian itu teks, ubah ke angka
  const judul = String(data.get("judul")).trim();
  const deskripsi = String(data.get("deskripsi")).trim();

  if (judul === "" || deskripsi === "" || Number.isNaN(tahun)) {
    pesanProyek.textContent = "Isi nama, deskripsi, dan tahun dengan benar.";
    return;
  }
  daftarProyek.push({ judul, deskripsi, tahun, selesai: false });
  tampilkanProyek(filterSaatIni);
  formProyek.reset();
  pesanProyek.textContent = `Proyek "${judul}" berhasil ditambahkan.`;
});

tampilkanProyek();


// ===================== LEMBAR E - Membaca galat =====================
// Kode di bawah aman. Untuk membuat galat: lepas "// " pada SATU blok GALAT,
// muat ulang, baca pesan dan barisnya di Console, lalu pasang "// " lagi.

const namaTeman = "Zena";
console.log("E:", namaTeman, typeof namaTemanTeman); // typeof tidak melempar galat -> "undefined"

const elemenNama = document.querySelector("#nama");
if (elemenNama) console.log("E:", elemenNama.textContent);

console.log("E:", "10" + 5, Number("10") + 5); // "105" vs 15

// GALAT 1 - ReferenceError: variabel salah tulis
// console.log(namaTemanTeman);

// GALAT 2 - TypeError: Cannot read properties of null (id salah, tanpa if)
// const elemenSalah = document.querySelector("#namaa");
// console.log(elemenSalah.textContent);

// GALAT 3 - TypeError: Assignment to constant variable
// totalProyek = 5;


// ===================== LEMBAR F - Periksa satu per satu =====================
console.table([
  { periksa: "Judul halaman dari profil", hasil: document.title.includes(profil.nama) },
  { periksa: "Baris tabel = isi daftarProyek", hasil: badanTabel?.children.length === daftarProyek.length },
  { periksa: "Data asli tidak berubah setelah sort", hasil: daftarProyek[0].judul === "Halaman Profil" },
]);

// Salinan objek: dengan { ...objek } aslinya aman, tanpa itu ikut berubah
const contoh = { nama: "Ayu" };
const salinan = { ...contoh };
const penunjuk = contoh;
salinan.nama = "Salinan";
console.log("F:", contoh.nama);   // "Ayu"
penunjuk.nama = "Penunjuk";
console.log("F:", contoh.nama);   // "Penunjuk" (ikut berubah)

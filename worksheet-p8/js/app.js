// ===================== LEMBAR A - Sambungkan skrip =====================
console.log("A: app.js terhubung");


// ===================== LEMBAR B - Data sebagai variabel =====================
const profil = {
  nama: "Tubagus Zaina Al Arifin Bahri",
  peran: "Mahasiswa Informatika",
  perkenalan: "Saya adalah seorang mahasiswa informatika yang tertarik dengan pengembangan web dan teknologi informasi.",
  bidang: "Frontend Development",
  hobi: ["pelari", "programmer", "gamer"],
  keahlian: ["HTML", "CSS", "JavaScript"],
};

let filterAktif = "semua"; // let: nilainya berubah saat tombol filter diklik

const kalimat = `Nama saya ${profil.nama}, saya ${profil.peran}, hobi saya ${profil.hobi.join(", ")}.`; // template literal
console.log("B:", kalimat);
console.log("B:", profil.alamat?.kota);   // ?. -> undefined, bukan galat
console.log("B:", profil.bidang ?? "-");  // ?? -> nilai bawaan bila null/undefined
console.log("B:", 0 === "");              // === membandingkan tipe juga -> false

// Pasang data profil ke halaman (HTML hanya kerangka)
function isiTeks(selector, teks) {
  const elemen = document.querySelector(selector);
  if (elemen) elemen.textContent = teks;
}

function isiDaftar(selector, daftar) {
  document.querySelector(selector)?.replaceChildren(
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
isiDaftar("#daftar-hobi", profil.hobi);
isiDaftar("#daftar-keahlian", profil.keahlian);


// ===================== LEMBAR C - Dua fungsi murni =====================
function buatPerkenalan({ nama, peran = "mahasiswa" }) {
  return `Halo, nama saya ${nama} - saya seorang ${peran}.`;
}

function formatKeahlian(daftar, pemisah = ", ") {
  return daftar.join(pemisah);
}

console.log("C:", buatPerkenalan(profil));
console.log("C:", buatPerkenalan({ nama: "Zena", peran: "pelari kalcer" }));
console.log("C:", formatKeahlian(profil.keahlian));
console.log("C:", formatKeahlian(["Easy run", "Interval run", "Tempo run", "Long run"], " . "));


// ===================== LEMBAR D - Array of object dan array methods =====================
const daftarProyek = [
  { judul: "Halaman Profil", deskripsi: "Web biodata pribadi.", tahun: 2026, selesai: true },
  { judul: "Katalog Produk", deskripsi: "Katalog barang jualan UMKM.", tahun: 2026, selesai: false },
  { judul: "Aplikasi harian lari", deskripsi: "Aplikasi untuk mencatat jarak dan waktu lari harian.", tahun: 2025, selesai: false },
  { judul: "Website FAQ", deskripsi: "Halaman tanya jawab untuk pengguna.", tahun: 2025, selesai: true },
];

console.table(daftarProyek);                                            // seluruh isi array
console.table(daftarProyek.filter((p) => p.selesai));                   // filter: subset
console.table(daftarProyek.find((p) => p.judul === "Katalog Produk"));  // find: satu isi
console.log("D:", daftarProyek.map((p) => p.judul));                    // map: array judul

const totalProyek = daftarProyek.reduce((jumlah) => jumlah + 1, 0);     // reduce: satu angka
console.log("D: total =", totalProyek);

const urutTahun = [...daftarProyek].sort((a, b) => a.tahun - b.tahun);  // sort pada salinan
console.log("D:", daftarProyek[0].judul, "(asli) |", urutTahun[0].judul, "(salinan)");

// Tampilkan array ke halaman
const badanTabelProyek = document.querySelector("#daftar-proyek");
const jumlahProyek = document.querySelector("#jumlah-proyek");
const hasilFilter = document.querySelector("#hasil-filter");
const tombolFilter = document.querySelectorAll(".filter-tombol");
const formProyek = document.querySelector("#form-proyek");
const pesanForm = document.querySelector("#pesan-form");

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
  badanTabelProyek?.replaceChildren(...tampil.map(buatBaris));
  if (jumlahProyek) jumlahProyek.textContent = daftarProyek.length;
  if (hasilFilter) {
    hasilFilter.textContent = filter === "semua" ? "" : `Menampilkan ${tampil.length} proyek ${filter}.`;
  }
}

function tandaiTombolFilter(filter) {
  tombolFilter.forEach((tombol) => {
    tombol.setAttribute("aria-pressed", String(tombol.dataset.filter === filter));
  });
}

tombolFilter.forEach((tombol) => {
  tombol.addEventListener("click", () => {
    filterAktif = tombol.dataset.filter ?? "semua";
    tandaiTombolFilter(filterAktif);
    tampilkanProyek(filterAktif);
  });
});

formProyek?.addEventListener("submit", (event) => {
  event.preventDefault();

  const dataForm = new FormData(formProyek);
  const proyekBaru = {
    judul: String(dataForm.get("judul")).trim(),
    deskripsi: String(dataForm.get("deskripsi")).trim(),
    tahun: Number(dataForm.get("tahun")),            // nilai kolom isian itu teks, ubah ke angka
    selesai: dataForm.get("selesai") === "true",
  };

  if (proyekBaru.judul === "" || proyekBaru.deskripsi === "" || Number.isNaN(proyekBaru.tahun)) {
    if (pesanForm) pesanForm.textContent = "Isi nama, deskripsi, dan tahun dengan benar.";
    return;
  }

  daftarProyek.push(proyekBaru);
  filterAktif = "semua";                              // tampilkan semua agar proyek baru terlihat
  tandaiTombolFilter(filterAktif);
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
console.log("E:", namaTeman, typeof namaTemanTeman); // typeof tidak melempar galat -> "undefined"

const elemenNama = document.querySelector("#nama");
if (elemenNama) console.log("E:", elemenNama.textContent);

console.log("E:", "10" + 5, Number("10") + 5); // "105" vs 15

// GALAT 1 - ReferenceError: variabel salah tulis
console.log(namaTemanTeman);

// GALAT 2 - TypeError: Cannot read properties of null (id salah, tanpa if)
const elemenSalah = document.querySelector("#namaa");
console.log(elemenSalah.textContent);

// GALAT 3 - TypeError: Assignment to constant variable
totalProyek = 5;


// ===================== LEMBAR F - Periksa satu per satu =====================
console.table([
  { periksa: "Judul halaman dari profil", hasil: document.title.includes(profil.nama) },
  { periksa: "Baris tabel = isi daftarProyek", hasil: badanTabelProyek?.children.length === daftarProyek.length },
  { periksa: "Data asli tidak berubah setelah sort", hasil: daftarProyek[0].judul === "Halaman Profil" },
]);

// Salinan objek: dengan { ...objek } aslinya aman, tanpa itu ikut berubah
const contoh = { nama: "Nabila" };
const salinan = { ...contoh };
const penunjuk = contoh;
salinan.nama = "Penunjuk";
console.log("F:", contoh.nama);   
penunjuk.nama = "Penunjuk";
console.log("F:", contoh.nama);  
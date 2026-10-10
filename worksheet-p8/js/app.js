/* =====================================================================
   PABW Pertemuan 8 - Halaman Profil dengan Data JavaScript
   Nama : Tubagus Zaina Al Arifin Bahri   NIM : 25523227   Kelas : C
   Berkas ini dimuat lewat <script type="module" src="js/app.js"> di index.html.
   Bagian: A (sambung) - B (variabel) - C (fungsi) - D (array) - E (galat) - F (periksa)
   ===================================================================== */


/* =====================================================================
   LEMBAR A - Menyambungkan skrip ke halaman
   Bukti: pesan di bawah muncul di Console, tanpa tulisan merah dan tanpa 404.
   ===================================================================== */
console.log("A: app.js terhubung ke index.html");


/* =====================================================================
   LEMBAR B - Data halaman sebagai variabel
   const untuk nilai yang tidak ditunjuk ulang, let hanya untuk yang berubah.
   ===================================================================== */

// B.1 Identitas halaman: ditulis sekali di sini, dipakai di banyak tempat
const profil = {
  nama: "Tubagus Zaina Al Arifin Bahri",
  peran: "Mahasiswa Informatika",
  perkenalan:
    "Saya adalah seorang mahasiswa informatika yang tertarik dengan pengembangan web dan teknologi informasi.",
  bidang: "Frontend Development",
  hobi: ["pelari", "programmer", "gamer"],
  keahlian: ["HTML", "CSS", "JavaScript"],
};

// B.2 Template literal: menyusun kalimat dari nilai
const kalimat = `Nama saya ${profil.nama}, saya ${profil.peran}, hobi saya ${profil.hobi.join(", ")}.`;
console.log("B:", kalimat);

// B.3 let: nilai yang memang akan berubah (dipakai lagi di Lembar D)
let filterSaatIni = "semua";

// B.4 Nilai bawaan ?? dan akses aman ?.
console.log("B: alamat?.kota =", profil.alamat?.kota);      // undefined, bukan galat
console.log("B: bidang ?? '-' =", profil.bidang ?? "-");     // "Frontend Development"
console.log("B: 0 ?? 'kosong' =", 0 ?? "kosong");            // 0  (|| akan salah menganggap 0 kosong)

// B.5 Perbandingan ketat dan tipe data
console.log("B: 0 === '' ?", 0 === "");                      // false, tipe ikut dibandingkan
console.log("B: '1' + 1 =", "1" + 1, "| Number('1') + 1 =", Number("1") + 1); // "11" vs 2

// B.5b Enam kasus yang paling sering menyesatkan (dibaca sebelum menulis kode)
console.log("B1: 0 == '' ->", 0 == "", "| 0 === '' ->", 0 === "");   // == mengubah tipe; pakai ===
console.log("B2: 0 || 'kosong' ->", 0 || "kosong", "| 0 ?? 'kosong' ->", 0 ?? "kosong"); // || salah menganggap 0 kosong
console.log("B3: profil.alamat?.kota ->", profil.alamat?.kota);        // undefined; tanpa ?. akan TypeError
const jumlahContoh = 0;
if (jumlahContoh) { console.log("B4: tidak tercetak, 0 dinilai falsy"); }
if (jumlahContoh === 0) { console.log("B4: jumlah memang 0 (dibandingkan langsung)"); }
{
  var bocor = "var bocor keluar dari blok";   // var tidak dipakai di pekerjaan nyata; ini hanya peragaan
  let tidakBocor = "let terkurung di blok";
  console.log("B5:", tidakBocor);
}
console.log("B5: di luar blok ->", bocor, "| tidakBocor ->", typeof tidakBocor); // "undefined"
const nilaiInput = "100";                                              // nilai kolom isian selalu teks
console.log("B6:", nilaiInput + 1, "| Number ->", Number(nilaiInput) + 1, "| parseInt ->", Number.parseInt(nilaiInput, 10) + 1);

// B.6 Pasang identitas ke halaman (HTML hanya kerangka)
function isiTeks(selector, teks) {
  const elemen = document.querySelector(selector);
  if (elemen) elemen.textContent = teks;
}

function buatDaftarItem(daftar) {
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
document.querySelector("#daftar-hobi")?.replaceChildren(...buatDaftarItem(profil.hobi));
document.querySelector("#daftar-keahlian")?.replaceChildren(...buatDaftarItem(profil.keahlian));


/* =====================================================================
   LEMBAR C - Dua fungsi murni
   Satu fungsi satu pekerjaan, nama diawali kata kerja, memakai return,
   hanya bergantung pada argumen dan tidak mengubah apa pun di luar dirinya.
   Bentuk yang dipakai konsisten: deklarasi (function).
   ===================================================================== */

// C.1 Membuat kalimat perkenalan (argumen berupa satu objek, ada nilai bawaan)
function buatPerkenalan({ nama, peran = "mahasiswa" }) {
  return `Halo, nama saya ${nama} - saya seorang ${peran}.`;
}

// C.2 Merapikan daftar keahlian menjadi satu baris teks (pemisah punya nilai bawaan)
function formatKeahlian(daftar, pemisah = ", ") {
  return daftar.join(pemisah);
}

// C.2b Tiga bentuk fungsi, satu kegunaan (berkas ini memakai deklarasi secara konsisten):
//   deklarasi : function buatSapaan(nama) { return `Halo, ${nama}`; }
//   expression: const buatSapaan = function (nama) { return `Halo, ${nama}`; };
//   arrow     : const buatSapaan = (nama) => `Halo, ${nama}`;   // dipakai sebagai callback map/filter
function buatSapaan(nama) {
  return `Halo, ${nama}`;
}

// C.2c Tiga pola parameter: tunggal, nilai bawaan, satu objek
console.log("C parameter tunggal :", buatSapaan("Ayu"));
console.log("C nilai bawaan      :", formatKeahlian(["HTML", "CSS"]), "|", formatKeahlian(["HTML", "CSS"], " / "));
console.log("C satu objek        :", buatPerkenalan({ nama: "Ayu", peran: "mahasiswa" }));

// C.2d Murni vs tidak murni: fungsi di bawah TIDAK murni karena hasilnya bergantung pada
// variabel di luar dirinya, dan tidak dipakai di halaman. Perbaikannya: kirim nilainya sebagai parameter.
//   let pengali = 2;  function kalikan(x) { return x * pengali; }   // tidak murni
//   function kalikan(x, pengali) { return x * pengali; }            // murni

// C.3 Dipanggil dengan argumen berbeda: hasilnya bisa ditebak
console.log("C:", buatPerkenalan(profil));
console.log("C:", buatPerkenalan({ nama: "Zena", peran: "pelari kalcer" }));
console.log("C:", buatPerkenalan({ nama: "Zena" }));          // memakai nilai bawaan "mahasiswa"
console.log("C:", formatKeahlian(profil.keahlian));
console.log("C:", formatKeahlian(["Easy run", "Interval run", "Tempo run", "Long run"], " . "));
console.log("C: aman dipanggil dua kali ->", buatPerkenalan(profil) === buatPerkenalan(profil)); // true


/* =====================================================================
   LEMBAR D - Struktur data dan array methods
   Data dulu, tampilan belakangan: isi halaman berasal dari array ini.
   ===================================================================== */

// D.1 Array of object
const daftarProyek = [
  {
    judul: "Halaman Profil",
    deskripsi: "Web informasi biodata pribadi, keahlian, dan hobi.",
    tahun: 2026,
    selesai: true,
  },
  {
    judul: "Katalog Produk",
    deskripsi: "Katalog barang jualan UMKM.",
    tahun: 2026,
    selesai: false,
  },
  {
    judul: "Aplikasi Catatan Keuangan",
    deskripsi: "Aplikasi sederhana untuk mencatat pemasukan dan pengeluaran harian.",
    tahun: 2025,
    selesai: false,
  },
  {
    judul: "Website FAQ",
    deskripsi: "Halaman tanya jawab untuk pengguna menemukan informasi.",
    tahun: 2025,
    selesai: true,
  },
];

// D.1b Membaca nilai: titik, indeks (mulai dari 0), gabungan, dan kurung siku bertulisan
console.log("D akses:", profil.nama, "|", daftarProyek[0].judul, "|", profil["nama"]);
console.log("D akses: daftarProyek[0] =", daftarProyek[0]);   // object pertama
console.log("D akses: daftarProyek['0'] =", daftarProyek["0"]); // tetap jalan, tapi pakai angka: daftarProyek[0]

// D.2 console.table: seluruh isi array tampil sebagai tabel
console.table(daftarProyek);

// D.3 filter: menyaring (array baru, bisa lebih pendek)
const proyekSelesai = daftarProyek.filter((proyek) => proyek.selesai);
console.table(proyekSelesai);

// D.4 find: mengambil satu isi pertama yang cocok (atau undefined)
const katalog = daftarProyek.find((proyek) => proyek.judul === "Katalog Produk");
console.table(katalog);

console.log("D: find yang tidak ketemu ->", daftarProyek.find((proyek) => proyek.judul === "Tidak Ada")); // undefined

// D.5 map: mengubah setiap isi (panjang array sama)
const judulProyek = daftarProyek.map((proyek) => proyek.judul);
console.log("D:", judulProyek);
console.log("D: panjang map =", judulProyek.length, "| panjang asli =", daftarProyek.length); // sama
console.log("D: filter + map untuk menyaring judul selesai ->", proyekSelesai.map((proyek) => proyek.judul));

// D.6 reduce: menghimpun menjadi satu angka
const totalProyek = daftarProyek.reduce((jumlah) => jumlah + 1, 0);
console.log("D: totalProyek =", totalProyek);

// D.7 Menyalin sebelum mengubah: data asli tidak boleh berubah
const proyekUrutTahun = [...daftarProyek].sort((a, b) => a.tahun - b.tahun);
console.log("D: asli  [0] =", daftarProyek[0].judul);     // tetap "Halaman Profil"
console.log("D: urut  [0] =", proyekUrutTahun[0].judul);  // "Aplikasi Catatan Keuangan"

const salinanProfil = { ...profil };                       // salinan dangkal
salinanProfil.nama = "Nama Percobaan";
console.log("D: profil.nama setelah salinan diubah =", profil.nama); // tetap asli

// D.8 Menampilkan array ke halaman
const badanTabelProyek = document.querySelector("#daftar-proyek");
const jumlahProyek = document.querySelector("#jumlah-proyek");
const hasilFilter = document.querySelector("#hasil-filter");
const tombolFilter = document.querySelectorAll(".filter-tombol");
const formProyek = document.querySelector("#form-proyek");
const pesanProyek = document.querySelector("#pesan-proyek");

function buatBarisProyek(proyek) {
  const baris = document.createElement("tr");
  const namaProyek = document.createElement("th");
  const deskripsiProyek = document.createElement("td");
  const tahunProyek = document.createElement("td");

  namaProyek.scope = "row";
  namaProyek.textContent = proyek.judul;
  deskripsiProyek.textContent = proyek.deskripsi;
  tahunProyek.textContent = proyek.tahun;
  baris.append(namaProyek, deskripsiProyek, tahunProyek);

  return baris;
}

function saringProyek(daftar, filterAktif) {
  return daftar.filter((proyek) => {
    if (filterAktif === "selesai") return proyek.selesai;
    if (filterAktif === "berjalan") return !proyek.selesai;
    return true;
  });
}

function tampilkanProyek(filterAktif = "semua") {
  const proyekDitampilkan = saringProyek(daftarProyek, filterAktif);

  badanTabelProyek?.replaceChildren(...proyekDitampilkan.map(buatBarisProyek));

  if (jumlahProyek) jumlahProyek.textContent = daftarProyek.length;
  if (hasilFilter) {
    hasilFilter.textContent =
      filterAktif === "semua"
        ? ""
        : `Menampilkan ${proyekDitampilkan.length} proyek ${filterAktif}.`;
  }
}

// D.9 Tombol filter: memakai let filterSaatIni dari Lembar B
tombolFilter.forEach((tombol) => {
  tombol.addEventListener("click", () => {
    filterSaatIni = tombol.dataset.filter;

    tombolFilter.forEach((item) => {
      item.setAttribute("aria-pressed", String(item === tombol));
    });
    tampilkanProyek(filterSaatIni);
  });
});

// D.10 Form tambah proyek: nilai kolom isian selalu teks, tahun diubah dulu ke angka
formProyek?.addEventListener("submit", (event) => {
  event.preventDefault();

  const dataForm = new FormData(formProyek);
  const judul = String(dataForm.get("judul") ?? "").trim();
  const deskripsi = String(dataForm.get("deskripsi") ?? "").trim();
  const tahun = Number(dataForm.get("tahun"));

  if (judul === "" || deskripsi === "" || Number.isNaN(tahun)) {
    if (pesanProyek) pesanProyek.textContent = "Isi nama, deskripsi, dan tahun dengan benar.";
    return;
  }

  // Formulir ini belum punya kolom status, jadi proyek baru dianggap masih berjalan.
  daftarProyek.push({ judul, deskripsi, tahun, selesai: false });
  tampilkanProyek(filterSaatIni);
  formProyek.reset();
  if (pesanProyek) pesanProyek.textContent = `Proyek "${judul}" berhasil ditambahkan.`;
});

tampilkanProyek();


/* =====================================================================
   LEMBAR E - Membaca galat, bukan menebaknya
   Kode di bawah sudah aman, jadi Console tetap bersih.
   Untuk mendapatkan galat sungguhan (E.4 / E.5): lepas tanda // pada SATU
   baris "GALAT" dalam satu waktu, muat ulang halaman, baca pesan dan nomor
   barisnya di Console, catat di tabel E.5, lalu pasang kembali tanda //.
   ===================================================================== */

// E.1 undefined: nama yang salah tulis
const namaTeman = "Zena";
console.log("E:", namaTeman);                               // Zena
console.log("E: typeof namaTemanTeman =", typeof namaTemanTeman); // "undefined": typeof tidak melempar galat
// GALAT 1 (ReferenceError: namaTemanTeman is not defined):
// console.log(namaTemanTeman);

// E.2 Cannot read properties of null: querySelector tidak menemukan elemen
const elemenNama = document.querySelector("#nama");
if (elemenNama) {
  console.log("E:", elemenNama.textContent);
}
// GALAT 2 (TypeError: Cannot read properties of null): id salah ketik, tanpa pemeriksaan
// const elemenSalah = document.querySelector("#namaa");
// console.log(elemenSalah.textContent);

// E.3 Nilai dari kolom isian selalu teks
const inputAngka = document.querySelector("#angka");     // tidak ada di halaman, maka null
if (inputAngka) {
  const angka = Number(inputAngka.value);
  console.log("E:", angka + 5);
}
console.log("E: '10' + 5 =", "10" + 5, "| Number('10') + 5 =", Number("10") + 5); // "105" vs 15

// GALAT 3 (TypeError: Assignment to constant variable.): const ditunjuk ulang
// totalProyek = 5;

// E.4 Breakpoint (latihan): buka DevTools > Sources > app.js, klik nomor baris
// di dalam fungsi buatBarisProyek (Lembar D), muat ulang, tekan F10 per baris.


/* =====================================================================
   LEMBAR F - Periksa satu per satu
   Hasil pemeriksaan otomatis tampil sebagai tabel di Console.
   ===================================================================== */
function periksaHalaman() {
  const jumlahBaris = badanTabelProyek ? badanTabelProyek.children.length : 0;

  return [
    { periksa: "Judul halaman memakai nama dari profil", hasil: document.title.includes(profil.nama) },
    { periksa: "Jumlah baris tabel = jumlah isi daftarProyek", hasil: jumlahBaris === daftarProyek.length },
    { periksa: "Jumlah proyek di profil = daftarProyek.length", hasil: Number(jumlahProyek?.textContent) === daftarProyek.length },
    { periksa: "Data asli tidak berubah setelah salinan diurutkan", hasil: daftarProyek[0].judul === "Halaman Profil" },
    { periksa: "profil.nama tidak berubah setelah salinan diubah", hasil: profil.nama === "Tubagus Zaina Al Arifin Bahri" },
    { periksa: "Dua fungsi murni memberi hasil sama untuk argumen sama", hasil: buatPerkenalan(profil) === buatPerkenalan({ ...profil }) },
  ];
}

console.table(periksaHalaman());

// F.1 Satu potong data yang tersimpan sebagai variabel: profil.nama (juga profil.keahlian, daftarProyek).
//     Kalau isinya berubah, cukup ubah nilainya di Lembar B; judul, hero, dan tabel ikut berubah.

// F.2 let dipakai pada filterSaatIni (Lembar B): nilainya berubah setiap tombol filter diklik.
console.log("F2: filterSaatIni sekarang =", filterSaatIni);

// F.3 Peragaan { ...objek } vs hanya menunjuk (memakai objek contoh, bukan profil)
const contoh = { nama: "Ayu", peran: "mahasiswa" };
const dengan = { ...contoh };       // salinan dangkal: objek baru
const tanpa = contoh;               // hanya penunjuk ke objek yang sama
dengan.nama = "Salinan";
console.log("F3: contoh.nama setelah salinan diubah =", contoh.nama);   // "Ayu" (aman)
tanpa.nama = "Penunjuk";
console.log("F3: contoh.nama setelah penunjuk diubah =", contoh.nama);  // "Penunjuk" (ikut berubah!)

// F.4 Cannot read properties of null: periksa (1) apakah id/class sama persis dengan di HTML,
//     (2) apakah skrip berjalan setelah elemen ada (type="module" sebelum </body>).
console.log("F4: querySelector('#tidak-ada') ->", document.querySelector("#tidak-ada")); // null

// F.5 Nilai kolom isian bertipe teks: ubah dulu dengan Number() sebelum dijumlahkan.
console.log("F5:", "2" + "3", "->", Number("2") + Number("3")); // "23" -> 5

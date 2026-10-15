import { profil, daftarProyek } from './app.js';

// A. Pilih elemen berdasarkan ID/class yang benar-benar ada di index.html.
const nama = document.querySelector('#nama');
const peran = document.querySelector('#peran');
const perkenalan = document.querySelector('#perkenalan');
const tabelNama = document.querySelector('#tabel-nama');
const tabelPeran = document.querySelector('#tabel-peran');
const daftarHobi = document.querySelector('#daftar-hobi');
const daftarKeahlian = document.querySelector('#daftar-keahlian');
const keahlianRingkas = document.querySelector('#keahlian-ringkas');
const jumlahProyek = document.querySelector('#jumlah-proyek');
const container = document.querySelector('#daftar-proyek');
const filterParent = document.querySelector('.filter');
const filterButtons = document.querySelectorAll('.filter-tombol');
const hasilFilter = document.querySelector('#hasil-filter');
const pesanKosong = document.querySelector('#pesan-kosong');
const form = document.querySelector('#form-proyek');
const pesanForm = document.querySelector('#pesan-form');
const judul = document.querySelector('#input-judul');
const deskripsi = document.querySelector('#input-deskripsi');
const tahun = document.querySelector('#input-tahun');
const status = document.querySelector('#input-status');
const submitButton = form.querySelector('button[type="submit"]');

const wajib = [nama, peran, perkenalan, tabelNama, tabelPeran, daftarHobi,
  daftarKeahlian, keahlianRingkas, jumlahProyek, container, filterParent,
  hasilFilter, pesanKosong, form, pesanForm, judul, deskripsi, tahun, status,
  submitButton];
if (wajib.some(elemen => elemen === null) || filterButtons.length !== 3) {
  throw new Error('P9: elemen HTML tidak ditemukan. Periksa ID/class pada index.html.');
}
console.log('A: seluruh selector P9 ditemukan.');

function isiDaftar(elemen, data) {
  elemen.replaceChildren();
  data.forEach(teks => {
    const li = document.createElement('li');
    li.textContent = teks;
    elemen.append(li);
  });
}

nama.textContent = profil.nama;
peran.textContent = profil.peran;
perkenalan.textContent = profil.perkenalan;
tabelNama.textContent = profil.nama;
tabelPeran.textContent = profil.peran;
keahlianRingkas.textContent = profil.bidang;
isiDaftar(daftarHobi, profil.hobi);
isiDaftar(daftarKeahlian, profil.keahlian);
document.title = `${profil.nama} | Profil Mahasiswa`;

// B dan D. Semua perubahan daftar melewati satu render(data).
let filterAktif = 'semua';
function buatBaris(proyek) {
  const tr = document.createElement('tr');
  const namaProyek = document.createElement('th');
  namaProyek.scope = 'row';
  namaProyek.textContent = proyek.judul;
  const keterangan = document.createElement('td');
  keterangan.textContent = proyek.deskripsi;
  const tahunProyek = document.createElement('td');
  tahunProyek.textContent = String(proyek.tahun);
  const statusProyek = document.createElement('td');
  const badge = document.createElement('span');
  badge.className = `status ${proyek.selesai ? 'status--selesai' : 'status--berjalan'}`;
  badge.textContent = proyek.selesai ? 'Selesai' : 'Berjalan';
  statusProyek.append(badge);
  tr.append(namaProyek, keterangan, tahunProyek, statusProyek);
  return tr;
}

function render(data) {
  container.replaceChildren(); // HARUS pertama: tidak ada duplikasi setelah render ulang.
  pesanKosong.hidden = data.length !== 0;
  if (data.length === 0) {
    pesanKosong.textContent = 'Belum ada proyek yang cocok dengan filter ini.';
  } else {
    data.forEach(proyek => container.append(buatBaris(proyek)));
  }
  jumlahProyek.textContent = String(daftarProyek.length);
  hasilFilter.textContent = `Menampilkan ${data.length} dari ${daftarProyek.length} proyek.`;
  filterButtons.forEach(button => {
    const aktif = button.dataset.filter === filterAktif;
    button.classList.toggle('aktif', aktif);
    button.setAttribute('aria-pressed', String(aktif));
  });
}

function dataTerfilter() {
  return daftarProyek.filter(proyek => filterAktif === 'semua' ||
    (filterAktif === 'selesai' ? proyek.selesai : !proyek.selesai));
}
function perbaruiTampilan() { render(dataTerfilter()); }

// C. SATU listener di induk tombol, bukan satu per tombol.
filterParent.addEventListener('click', event => {
  const button = event.target.closest('button[data-filter]');
  if (!button || !filterParent.contains(button)) return;
  filterAktif = button.dataset.filter;
  console.log('C: filter diklik sekali:', filterAktif);
  perbaruiTampilan();
});

// D. Validasi per-field, pesan langsung saat mengetik, dan tombol nonaktif.
const fields = [judul, deskripsi, tahun, status];
const errorElements = new Map(fields.map(field => [field, document.querySelector(`#error-${field.id}`)]));

function cekField(field) {
  const nilai = field.value.trim();
  let pesan = '';
  if (field === judul && !nilai) pesan = 'Isi nama proyek, jangan hanya spasi.';
  else if (field === deskripsi && !nilai) pesan = 'Isi deskripsi proyek, jangan hanya spasi.';
  else if (field === tahun && (!nilai || !Number.isInteger(Number(nilai)) || Number(nilai) < 2000 || Number(nilai) > 2100)) {
    pesan = 'Isi tahun berupa angka bulat antara 2000 dan 2100.';
  } else if (field === status && !['true', 'false'].includes(nilai)) pesan = 'Pilih status proyek.';
  field.setAttribute('aria-invalid', String(Boolean(pesan)));
  const error = errorElements.get(field);
  if (error) error.textContent = pesan;
  return pesan === '';
}

function validasiForm() {
  const hasil = fields.map(cekField);
  const valid = hasil.every(Boolean);
  submitButton.disabled = !valid;
  return valid;
}

fields.forEach(field => {
  field.addEventListener('input', validasiForm);
  field.addEventListener('change', validasiForm);
});

form.addEventListener('submit', event => {
  event.preventDefault();
  if (!validasiForm()) {
    fields.find(field => field.getAttribute('aria-invalid') === 'true')?.focus();
    pesanForm.textContent = 'Perbaiki isian yang ditandai sebelum menambah proyek.';
    return;
  }
  const proyek = {
    judul: judul.value.trim(),
    deskripsi: deskripsi.value.trim(),
    tahun: Number(tahun.value.trim()),
    selesai: status.value === 'true'
  };
  daftarProyek.push(proyek);
  filterAktif = 'semua';
  perbaruiTampilan();
  form.reset();
  validasiForm();
  pesanForm.textContent = `Proyek "${proyek.judul}" berhasil ditambahkan.`;
});

// Saat halaman pertama kali dibuka, form belum valid dan proyek langsung terlihat.
validasiForm();
perbaruiTampilan();

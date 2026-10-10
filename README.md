# PABW - TUBAGUS ZAINA AL ARIFIN BAHRI - 25523227
# Running Log & Schedule

## Page Description
This page displays a weekly running schedule, performance targets, and a form to log new running sessions.

## Navigation
1. Home
2. Running Schedule
3. Log Session

## Main Sections
1. Weekly Targets & Running History
2. Add New Running Session

## Table Structure
- Day
- Run Type
- Distance (km)
- Duration (mins)

## Form Structure
- Run Type
- Date
- Duration (mins)

## Image Used
- ![alt text](<1WhatsApp Image 2026-09-21 at 10.36.25 PM.jpeg>)

## Note on AI use
 - State which parts AI helped with and which parts you did yourself, or write: no AI used.


---

# Pertemuan 8 — Halaman Profil dengan Data JavaScript
Folder: `worksheet-p8/` (`index.html`, `css/style.css`, `js/app.js`)

## Yang dikerjakan
- **A** — `app.js` dihubungkan lewat satu baris `<script type="module" src="js/app.js"></script>` sebelum `</body>`, dijalankan lewat server lokal (`http://`).
- **B** — Identitas (nama, peran, perkenalan, hobi, keahlian) disimpan sebagai `const profil` dan dirender ke halaman; `<title>` ikut dibuat dari variabel yang sama. Memakai template literal, `??`, dan `?.`.
- **C** — Dua fungsi: `buatPerkenalan({ nama, peran })` dan `formatKeahlian(daftar)`; keduanya memakai `return` dan hanya bergantung pada argumen.
- **D** — `daftarProyek` (array of object) diolah dengan `map`, `filter`, `find`, `reduce`, dan dicek dengan `console.table`. Tabel proyek di halaman dirender dari array ini, lengkap dengan tombol filter Semua/Selesai/Berjalan.
- **E** — Tiga kasus galat (`undefined`, `null` dari `querySelector`, nilai input bertipe teks) ditangani; 404 `favicon.ico` dihilangkan sehingga Console bersih.

## Cara menjalankan
```
cd worksheet-p8
python3 -m http.server 8000
# buka http://localhost:8000/
```

## Deklarasi AI (Pertemuan 8)
> **Perlu dicek dan disesuaikan oleh Tubagus sebelum dikumpulkan — tulis apa adanya.**
- Dikerjakan sendiri: struktur HTML/CSS dari Pertemuan 6, data `profil` dan `daftarProyek`, dua fungsi (`buatPerkenalan`, `formatKeahlian`), contoh `map`/`filter`/`find`/`reduce`, dan kasus galat di lembar E.
- Dibantu AI (Claude): menghubungkan data `profil` ke halaman (fungsi `isiTeks`, `buatDaftarChip`, hobi menjadi array), menambah ikon kosong untuk menghilangkan 404 favicon, serta menyusun bagian README ini.

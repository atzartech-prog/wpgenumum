# 📄 WP Page & Landing Page Generator (No Plugin)

Aplikasi Web-based Single Page Application (SPA) untuk merancang landing page atau halaman custom WordPress secara visual menggunakan kode HTML & CSS murni. Hasil generator dapat langsung disalin ke block **Custom HTML** WordPress tanpa memerlukan instalasi plugin tambahan (seperti Elementor atau Divi).

## 🚀 Fitur Utama

- **100% Bebas Plugin**: Menghasilkan berkas gabungan HTML & CSS mandiri (*inline & scoped CSS*) yang sepenuhnya kompatibel dengan WordPress Gutenberg Block Editor.
- **🗂️ Full Page Templates (Template Halaman Penuh)**:
  - **SaaS Landing Page**: Tata letak lengkap untuk produk aplikasi/SaaS (Hero split, Features, Pricing, CTA, FAQ, Footer).
  - **Product Sales Page**: Halaman promosi produk fisik/digital (Hero centered, Features, Testimoni, CTA WhatsApp COD, Footer).
  - **Lead Capture Page**: Kerangka pengumpulan prospek email/kontak (Hero ebook, Features, Form kontak prospek, Footer).
- **🎨 Custom Style per Seksi (Appearance Scoped Style)**:
  - **Custom HTML ID**: Untuk membuat tautan navigasi lompat (*anchor link*, misal `#pricing`, `#contact`).
  - **Tipe Latar Belakang (Background)**: Pilihan antara Default halaman, Putih Bersih (*light*), Gelap (*dark*), Warna Utama Brand (*primary*), atau Kustom Warna (picker background & text bebas).
  - **Padding Sliders**: Pengatur tinggi jarak atas & bawah masing-masing seksi secara presisi (0px - 150px).
- **💾 Ekspor & Impor Project (Layout JSON Backup)**:
  - **Export JSON**: Mengunduh seluruh konfigurasi layout, warna, font, dan teks aktif sebagai berkas `.json` cadangan.
  - **Import JSON**: Memuat kembali berkas layout `.json` cadangan ke editor untuk melanjutkan pengeditan kapan saja tanpa kehilangan data.
- **📥 Download HTML Mandiri**: Mengunduh halaman hasil desain langsung menjadi berkas `.html` utuh yang siap pakai.
- **📱 Responsive Live Preview**: Menyediakan tombol simulasi ukuran tampilan perangkat desktop, tablet, dan smartphone secara real-time.
- **📋 Copy Clean Code**: Menyalin kode bersih ke clipboard sekali klik yang siap ditempelkan langsung ke WordPress.

## 📁 Berkas Project

Aplikasi ini terdiri dari file berikut:
- **[index.html](index.html)**: Kerangka dashboard, panel samping, pengaturan gaya global, dan area live preview.
- **[style.css](style.css)**: Gaya visual dashboard editor dengan tema gelap yang modern.
- **[app.js](app.js)**: Logika di balik layar untuk merakit layout halaman, memproses pembaruan teks/gambar, mengunduh font Google secara otomatis, serta mengompilasi kode gabungan HTML dan CSS scoped.

## 💻 Cara Menjalankan Secara Lokal

Anda dapat menjalankan aplikasi ini menggunakan server web statis sederhana. Masuk ke direktori project ini, lalu jalankan perintah berikut:

### Menggunakan Python
```bash
python3 -m http.server 8282
```

### Menggunakan Node.js (Live Server / HTTP-Server)
```bash
npx http-server -p 8282
```

Setelah dijalankan, buka browser Anda dan akses `http://localhost:8282` untuk mulai merancang halaman WordPress Anda.

---

## 📝 Panduan Singkat Pemasangan Kode ke WordPress

1. Di aplikasi generator, klik tab **"Generated Code"** di bagian atas panel kanan.
2. Klik tombol hijau **"Copy Clean Code"** untuk menyalin kode lengkap ke clipboard Anda.
3. Masuk ke Dashboard WordPress Anda, kemudian buat **Halaman Baru** (*Add New Page*) atau **Postingan Baru** (*Add New Post*).
4. Klik tombol tambah block `+` di editor Gutenberg.
5. Cari dan pilih block **"Custom HTML"** (atau **HTML Khusus**).
6. Tempel (*paste*) kode yang baru saja Anda salin ke dalam block tersebut.
7. Klik **Publish** atau **Preview** halaman untuk melihat hasilnya.

> [!NOTE]
> **Pencegahan Konflik Gaya (CSS Isolation)**: Semua style CSS yang dihasilkan dibungkus dengan selector `.wppg-page-container` dan menggunakan prefix class `wppg-`. Hal ini menjamin bahwa tampilan landing page Anda tidak akan bentrok dengan gaya bawaan dari tema WordPress yang sedang Anda gunakan (Astra, Divi, OceanWP, dll).

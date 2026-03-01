# 📋 Project: AI YouTube to TikTok Clipper Web App

## 🏁 Phase 1: Persiapan Lingkungan & Kredensial (Setup)
- [ ] Buat dan konfigurasi proyek Laravel baru di dalam direktori Laragon (`www` atau `htdocs`).
- [ ] Setup *environment* React (bisa menggunakan Inertia.js yang menyatu dengan Laravel, atau repositori terpisah).
- [ ] Konfigurasi database MySQL di Laragon dan hubungkan ke file `.env` Laravel.
- [ ] Daftar ke [TikTok for Developers](https://developers.tiktok.com/) dan buat aplikasi untuk mendapatkan `Client ID` dan `Client Secret`.
- [ ] Dapatkan API Key dari akun Vizard.ai dan simpan di file `.env` Laravel.

## ⚙️ Phase 2: Backend Development (Laravel)
- [ ] **Database & Models:**
  - [ ] Buat *migration* dan model untuk `User`.
  - [ ] Buat *migration* dan model untuk `ClipProject` (menyimpan `vizard_project_id`, `youtube_url`, `status`, `result_urls`).
  - [ ] Buat *migration* dan model untuk `TikTokCredential` (menyimpan `access_token`, `refresh_token`, `user_id`).
- [ ] **Integrasi Vizard API:**
  - [ ] Buat `VizardController` dengan method `createProject` (POST URL YouTube ke Vizard).
  - [ ] Buat *Job* atau perintah *Command* (Scheduler) untuk melakukan *polling* (mengecek status *clipping* ke API Vizard secara berkala).
  - [ ] Buat fungsi untuk menyimpan URL video MP4 hasil potongan Vizard ke database saat statusnya sudah sukses.
- [ ] **Integrasi TikTok API:**
  - [ ] Buat *route* dan logika untuk menghasilkan URL Autentikasi TikTok (OAuth 2.0).
  - [ ] Buat *callback endpoint* untuk menerima kode dari TikTok dan menukarnya dengan `access_token`.
  - [ ] Buat method `publishToTikTok` yang mengambil file video dari Vizard dan menembakkannya ke *endpoint* TikTok Content Posting API.

## 💻 Phase 3: Frontend Development (React)
- [ ] **Routing & Layout:**
  - [ ] Setup sistem *routing* (misal: React Router).
  - [ ] Buat *layout* utama (Sidebar/Navbar).
- [ ] **Halaman Dashboard (Input):**
  - [ ] Buat *form* input untuk *paste* URL YouTube.
  - [ ] Buat tombol *submit* yang mengirimkan URL ke *endpoint* Laravel.
  - [ ] Buat indikator *loading*/*progress* saat Vizard sedang memproses video.
- [ ] **Halaman Hasil (Preview):**
  - [ ] Ambil data *ClipProject* dari *backend* dan tampilkan daftar video (menggunakan tag `<video>` HTML5) yang berhasil dipotong Vizard.
- [ ] **Fitur Posting:**
  - [ ] Buat tombol "Connect TikTok" jika *user* belum menghubungkan akun.
  - [ ] Buat tombol "Publish to TikTok" di setiap *card* hasil klip.
  - [ ] Tambahkan *form* kecil untuk menulis *caption* atau *hashtag* sebelum diposting.

## 🧪 Phase 4: Testing & Debugging (Lokal)
- [ ] Atur file `php.ini` di Laragon untuk memastikan ekstensi `curl.cainfo` valid (agar terhindar dari *error* SSL saat menembak API).
- [ ] Uji coba alur *end-to-end* 1: Input URL -> Vizard merespons -> Database tersimpan.
- [ ] Uji coba alur *end-to-end* 2: Vizard selesai -> Video muncul di React.
- [ ] Uji coba alur *end-to-end* 3: Login TikTok berhasil -> Video berhasil terunggah ke *draft* atau *feed* akun TikTok testing.

## 🚀 Phase 5: Persiapan Produksi (Opsional/Lanjutan)
- [ ] Konfigurasi *Queue Worker* sesungguhnya (misal pakai Redis/Supervisor) untuk menggantikan Scheduler di Laragon.
- [ ] Siapkan *Privacy Policy* dan *Terms of Service* untuk syarat *review* aplikasi di TikTok Developer.
- [ ] *Deploy* Laravel ke VPS atau *hosting*, dan React ke *platform* seperti Vercel/Netlify (jika terpisah).
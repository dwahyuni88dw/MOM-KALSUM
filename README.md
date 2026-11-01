# Tindak Lanjut MoM Kalteng I

Aplikasi web statis (satu halaman) untuk memantau aksi MoM per unit. Dihosting di GitHub Pages, data bersama disimpan di Firebase Firestore.

## 1. Siapkan Firebase (sekali, sekitar 10 menit)

1. Buka https://console.firebase.google.com, **Add project** (Google Analytics boleh dimatikan).
2. **Build > Firestore Database > Create database**. Pilih lokasi `asia-southeast2 (Jakarta)`, mode **production**.
3. Tab **Rules**: tempel isi `firestore.rules` dari paket ini, lalu **Publish**.
4. **Build > Authentication > Get started > Sign-in method > Anonymous > Enable**. (Aplikasi masuk anonim agar aturan di atas bisa menolak akses yang tidak lewat situs ini.)
5. **Project settings (ikon roda gigi) > General > Your apps > ikon web `</>`**. Daftarkan aplikasi, lalu salin objek `firebaseConfig`.
6. Buka `firebase-config.js` di paket ini, ganti nilai `ISI_...` dengan hasil salinan (apiKey, authDomain, projectId, appId).
7. **Authentication > Settings > Authorized domains > Add domain**: `NAMA-GITHUB-ANDA.github.io`.
8. (Disarankan) Di https://console.cloud.google.com/apis/credentials buka API key proyek ini, **Application restrictions > Websites**, tambahkan `https://NAMA-GITHUB-ANDA.github.io/*`.

## 2. Pasang di GitHub Pages

1. Di GitHub buat repositori baru (mis. `tindak-lanjut-kalteng`), publik.
2. **Add file > Upload files**, unggah semua isi paket ini (`index.html`, `claude-shim.js`, `firebase-config.js`, `firestore.rules`, `README.md`, `.nojekyll`). Commit.
3. **Settings > Pages > Build and deployment > Source: Deploy from a branch**, branch `main`, folder `/ (root)`. Simpan.
4. Setelah 1-2 menit, situs ada di `https://NAMA-GITHUB-ANDA.github.io/tindak-lanjut-kalteng/`.

## 3. Isi data pertama kali

Saat dibuka pertama kali, layar login menampilkan **Belum ada akun**. Pilih salah satu:

- **Pulihkan dari cadangan**: pakai file `.json` dari versi lama (di versi Claude: menu **Pengguna > Unduh cadangan**). Semua akun, aksi, centang, dan catatan ikut pindah. Setelah itu masuk dengan akun admin dari cadangan.
- **Buat akun admin awal**: membuat akun `Admin Region` (sandi `tap123`). Lalu unggah MoM lewat menu **Upload**, dan di menu **Pengguna** klik **Buat akun untuk N unit**.

## Keamanan (baca ini)

- Situs GitHub Pages gratis bersifat publik. Login di aplikasi hanya pembatas tampilan: konfigurasi Firebase terlihat di sumber halaman, dan siapa pun yang membukanya dapat membaca data lewat konsol browser.
- Jangan simpan data yang rahasia. Sandi awal `tap123` lemah; minta tiap unit menggantinya.
- Aturan Firestore di paket ini hanya membatasi ke tiga koleksi aplikasi dan klien yang masuk anonim. Pembatasan per unit tidak bisa ditegakkan di sisi server tanpa backend sendiri.

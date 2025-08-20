---
title: "Tutorial Install Telnet di Ubuntu/Debian"
---

# 📚 Tutorial Install Telnet di Ubuntu/Debian

Telnet adalah protokol jaringan yang biasa dipakai untuk remote system.  
Meskipun sudah jarang digunakan (lebih aman pakai SSH), telnet tetap berguna untuk testing port atau konektivitas.

---

## 🔧 Langkah Instalasi

### 1. Update Repository
```
sudo apt update

2. Install Paket Telnet
sudo apt install telnet -y

3. Verifikasi Instalasi
telnet


Jika muncul prompt telnet> berarti instalasi berhasil.

📸 Screenshot

Tambahkan gambar ke folder images/ di repo ini, lalu panggil dengan markdown:

![Telnet Installed](images/telnet.png)


Contoh tampilan di blog:


✅ Contoh Penggunaan

Coba koneksi ke port 80 di google.com:

telnet google.com 80


Jika connect, berarti port terbuka.

✍️ Ditulis oleh: Aditya Tutorial

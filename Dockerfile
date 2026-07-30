# Gunakan image Nginx versi terbaru yang ringan (alpine)
FROM nginx:alpine

# Salin semua file dari folder saat ini (.) ke folder default Nginx untuk menyajikan file statis
COPY . /usr/share/nginx/html

# Beritahu Docker bahwa container ini akan mendengarkan port 80 (port standar web)
EXPOSE 80

# OnlineTrimmer — GitHub & VPS Deployment Guide

This guide walks you through pushing the OnlineTrimmer codebase to **GitHub** and deploying it on any **VPS** (DigitalOcean, Hetzner, Linode, AWS EC2, OVH, Vultr, Contabo, etc.).

---

## Part 1: Push to GitHub

### Method A: Using Google AI Studio Export (Easiest)
1. In the top-right corner of Google AI Studio, click the **Export** / **Settings** menu.
2. Select **Export to GitHub**.
3. Choose or create your repository name (e.g. `onlinetrimmer`).
4. Click **Confirm Export**.

---

### Method B: Using Git Command Line
If you are working from a terminal or cloned workspace:

1. Create a new repository on [GitHub](https://github.com/new) (e.g. `onlinetrimmer`). Do not initialize it with a README.
2. Run the following commands in the project folder:

```bash
# 1. Rename the branch to main (if not already)
git branch -M main

# 2. Add your GitHub repository as the remote origin
# (Replace YOUR_USERNAME and YOUR_REPO with your actual GitHub info)
git remote add origin https://github.com/YOUR_USERNAME/onlinetrimmer.git

# 3. Push all commits to GitHub
git push -u origin main
```

---

## Part 2: Deploying to Your VPS

OnlineTrimmer is a client-side web application powered by React, Vite, and WebAssembly. It requires no heavy database server or backend workers, making it fast and lightweight on any VPS (even a $3–$5/month server).

### Option 1: Docker & Docker Compose (Recommended)

1. **SSH into your VPS:**
   ```bash
   ssh root@YOUR_SERVER_IP
   ```

2. **Install Docker & Docker Compose (if not already installed):**
   ```bash
   # On Ubuntu / Debian:
   curl -fsSL https://get.docker.com -o get-docker.sh
   sh get-docker.sh
   ```

3. **Clone your GitHub repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/onlinetrimmer.git
   cd onlinetrimmer
   ```

4. **Launch with Docker Compose:**
   ```bash
   docker compose up -d --build
   ```
   *Your site will be live immediately on port 80!*

---

### Option 2: Native Nginx (Without Docker)

1. **SSH into your VPS and install Node.js & Nginx:**
   ```bash
   # On Ubuntu / Debian:
   sudo apt update
   sudo apt install -y nginx curl git
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt install -y nodejs
   ```

2. **Clone and build the project:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/onlinetrimmer.git /var/www/onlinetrimmer
   cd /var/www/onlinetrimmer
   npm ci
   npm run build
   ```

3. **Configure Nginx:**
   Create `/etc/nginx/sites-available/onlinetrimmer`:
   ```nginx
   server {
       listen 80;
       server_name onlinetrimmer.com www.onlinetrimmer.com; # Replace with your domain

       root /var/www/onlinetrimmer/dist;
       index index.html;

       # Gzip Compression
       gzip on;
       gzip_vary on;
       gzip_proxied any;
       gzip_comp_level 6;
       gzip_types text/plain text/css text/xml application/json application/javascript image/svg+xml;

       # Static assets cache
       location ~* \.(?:css|js|woff2?|svg|gif|png|jpg|jpeg|ico|webp)$ {
           expires 1y;
           add_header Cache-Control "public, max-age=31536000, immutable";
       }

       # Single Page App routing
       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

4. **Enable the site and reload Nginx:**
   ```bash
   sudo ln -s /etc/nginx/sites-available/onlinetrimmer /etc/nginx/sites-enabled/
   sudo rm -f /etc/nginx/sites-enabled/default
   sudo nginx -t
   sudo systemctl reload nginx
   ```

---

## Part 3: Enable Free SSL Certificate (HTTPS) with Let's Encrypt

Google and AdSense require valid HTTPS:

1. **Install Certbot:**
   ```bash
   sudo apt install -y certbot python3-certbot-nginx
   ```

2. **Obtain SSL certificate:**
   ```bash
   sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
   ```
   Certbot will automatically configure SSL and auto-renewal in Nginx!

---

## Updating the Site on Your VPS

When you push new updates to GitHub:

- **If using Docker:**
  ```bash
  cd onlinetrimmer
  git pull origin main
  docker compose up -d --build
  ```

- **If using Native Nginx:**
  ```bash
  cd /var/www/onlinetrimmer
  git pull origin main
  npm ci
  npm run build
  ```

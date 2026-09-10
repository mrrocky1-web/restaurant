# 🍔 King Burger & Royal Dining Platform

A full-stack gourmet food & restaurant ordering application built with React, Vite, Tailwind CSS, Node.js, and Express.

---

## 🌟 Features Included

1. 📍 **Live Geolocation Tracking**: HTML5 Geolocation API integration to detect customer coordinates during order placement + Admin Google Maps pin viewer.
2. 📁 **Photo File Uploader**: Admin can upload product photos directly from local device (converted to Base64) with cover photo selector and drag-and-drop ordering.
3. 📸 **6 Visible Restaurant Atmosphere Photos**: Showcase luxury dining rooms, live tandoor open kitchens, and bakeries with lightbox viewer.
4. 🚚 **Order Status Tracker**: One-click status management for Admin + Live 4-step order progress timeline for customers.
5. 💳 **Multiple Payment Methods**: Cash on Delivery (COD), UPI with interactive QR Code scanner, Credit/Debit Card, Net Banking.
6. 🖨️ **Printable GST Invoice Generator**: One-click printable tax invoices with window.print() styling.
7. 🍔 **King Burger Style Interface**: Dine-In / Takeaway vs Home Delivery toggle with outlet & table selection.

---

## 🚀 Deployment Instructions

### 1. Deploy Frontend on Vercel
1. Go to [Vercel](https://vercel.com) and click **Add New Project**.
2. Upload or connect the repository directory `KingsBurger-Restaurant/frontend`.
3. Framework Preset: **Vite**.
4. Build Command: `npm run build`.
5. Output Directory: `dist`.
6. Click **Deploy**! Vercel will automatically handle single-page routing via `vercel.json`.

### 2. Deploy Backend on Render
1. Go to [Render](https://render.com) and click **New Web Service**.
2. Connect your repository or upload `KingsBurger-Restaurant/backend`.
3. Environment: **Node**.
4. Build Command: `npm install`.
5. Start Command: `npm start` or `node server.js`.
6. Click **Create Web Service**!

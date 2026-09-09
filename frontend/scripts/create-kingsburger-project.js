import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import archiver from 'archiver';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const targetProjectFolder = path.join(rootDir, 'KingsBurger-Restaurant');
const frontendSubFolder = path.join(targetProjectFolder, 'frontend');
const backendSubFolder = path.join(targetProjectFolder, 'backend');

console.log('🚀 Creating Separate Project Folder: KingsBurger-Restaurant...');

// Ensure clean directories
if (fs.existsSync(targetProjectFolder)) {
  fs.rmSync(targetProjectFolder, { recursive: true, force: true });
}
fs.mkdirSync(targetProjectFolder, { recursive: true });
fs.mkdirSync(frontendSubFolder, { recursive: true });
fs.mkdirSync(backendSubFolder, { recursive: true });

// Copy Frontend Source Files to KingsBurger-Restaurant/frontend
const frontendDirs = ['src', 'public', 'scripts'];
const frontendFiles = ['package.json', 'vite.config.js', 'tailwind.config.js', 'postcss.config.js', 'index.html'];

frontendDirs.forEach((dir) => {
  const srcPath = path.join(rootDir, dir);
  if (fs.existsSync(srcPath)) {
    fs.cpSync(srcPath, path.join(frontendSubFolder, dir), { recursive: true });
  }
});

frontendFiles.forEach((file) => {
  const srcFile = path.join(rootDir, file);
  if (fs.existsSync(srcFile)) {
    fs.copyFileSync(srcFile, path.join(frontendSubFolder, file));
  }
});

// Update frontend package.json name
const fePkgPath = path.join(frontendSubFolder, 'package.json');
if (fs.existsSync(fePkgPath)) {
  const pkgData = JSON.parse(fs.readFileSync(fePkgPath, 'utf-8'));
  pkgData.name = 'kingsburger-frontend';
  pkgData.description = 'King Burger & Royal Restaurant Gourmet Food Ordering Platform';
  fs.writeFileSync(fePkgPath, JSON.stringify(pkgData, null, 2));
}

// Add vercel.json in frontend for Vercel deployment
const vercelConfig = {
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "dist" }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
};
fs.writeFileSync(path.join(frontendSubFolder, 'vercel.json'), JSON.stringify(vercelConfig, null, 2));

// Copy Backend Files to KingsBurger-Restaurant/backend
const backendSrcDir = path.join(rootDir, 'backend');
if (fs.existsSync(backendSrcDir)) {
  fs.cpSync(backendSrcDir, backendSubFolder, { recursive: true });
}

// Add render.yaml in backend for Render deployment
const renderYamlContent = `services:
  - type: web
    name: kingsburger-backend-api
    env: node
    region: singapore
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: PORT
        value: 5000
      - key: NODE_ENV
        value: production
`;
fs.writeFileSync(path.join(backendSubFolder, 'render.yaml'), renderYamlContent);

// Add Project README in KingsBurger-Restaurant
const projectReadmeContent = `# 🍔 King Burger & Royal Dining Platform

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
2. Upload or connect the repository directory \`KingsBurger-Restaurant/frontend\`.
3. Framework Preset: **Vite**.
4. Build Command: \`npm run build\`.
5. Output Directory: \`dist\`.
6. Click **Deploy**! Vercel will automatically handle single-page routing via \`vercel.json\`.

### 2. Deploy Backend on Render
1. Go to [Render](https://render.com) and click **New Web Service**.
2. Connect your repository or upload \`KingsBurger-Restaurant/backend\`.
3. Environment: **Node**.
4. Build Command: \`npm install\`.
5. Start Command: \`npm start\` or \`node server.js\`.
6. Click **Create Web Service**!
`;

fs.writeFileSync(path.join(targetProjectFolder, 'README.md'), projectReadmeContent);

// Helper function to zip folders
const createZip = (sourceDir, outputFile, label) => {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(outputFile);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
      console.log(`🎉 ${label} Created: ${outputFile} (${(archive.pointer() / 1024 / 1024).toFixed(2)} MB)`);
      resolve();
    });

    archive.on('error', (err) => reject(err));
    archive.pipe(output);
    archive.directory(sourceDir, false);
    archive.finalize();
  });
};

async function createAllZipPackages() {
  try {
    const feZip = path.join(rootDir, 'KingsBurger-Frontend.zip');
    const beZip = path.join(rootDir, 'KingsBurger-Backend.zip');
    const fullZip = path.join(rootDir, 'KingsBurger-Restaurant-FullProject.zip');

    await createZip(frontendSubFolder, feZip, 'KingsBurger-Frontend.zip');
    await createZip(backendSubFolder, beZip, 'KingsBurger-Backend.zip');
    await createZip(targetProjectFolder, fullZip, 'KingsBurger-Restaurant-FullProject.zip');

    console.log('✨ KingsBurger Separate Project & Zips successfully generated!');
  } catch (err) {
    console.error('❌ Zip error:', err);
  }
}

createAllZipPackages();

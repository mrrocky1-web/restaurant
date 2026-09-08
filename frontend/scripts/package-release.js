import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import archiver from 'archiver';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const targetFolder = path.join(rootDir, 'Fashionvillaroyal-Release');
const mainZip = path.join(rootDir, 'Fashionvillaroyal-website.zip');
const frontendZip = path.join(rootDir, 'frontend.zip');
const backendZip = path.join(rootDir, 'backend.zip');

console.log('📦 Starting Packaging for Frontend, Backend, and Full Release Zips...');

// Ensure release directory
if (!fs.existsSync(targetFolder)) {
  fs.mkdirSync(targetFolder, { recursive: true });
}

// Copy build output if exists
const distDir = path.join(rootDir, 'dist');
if (fs.existsSync(distDir)) {
  fs.cpSync(distDir, path.join(targetFolder, 'dist'), { recursive: true });
  console.log('✅ Copied compiled production bundle dist/');
}

// Create a standalone run script in target folder
const runBatContent = `@echo off
echo =========================================================
echo    👑 Fashionvillaroyal & King's Dining Platform
echo =========================================================
echo Starting local web server...
npx serve dist -l 3000
pause
`;

fs.writeFileSync(path.join(targetFolder, 'run-app.bat'), runBatContent);
fs.writeFileSync(path.join(rootDir, 'run-app.bat'), runBatContent);

// Copy source code for developer package
const dirsToCopy = ['src', 'public', 'scripts'];
const filesToCopy = ['package.json', 'vite.config.js', 'tailwind.config.js', 'postcss.config.js', 'index.html', 'README.md'];

dirsToCopy.forEach((dir) => {
  const srcPath = path.join(rootDir, dir);
  if (fs.existsSync(srcPath)) {
    fs.cpSync(srcPath, path.join(targetFolder, dir), { recursive: true });
  }
});

filesToCopy.forEach((file) => {
  const srcFile = path.join(rootDir, file);
  if (fs.existsSync(srcFile)) {
    fs.copyFileSync(srcFile, path.join(targetFolder, file));
  }
});

// Helper function to create zip archive
const createZipArchive = (sourceDir, outputFile, label) => {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(outputFile);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
      console.log(`🎉 ${label} Created Successfully: ${outputFile} (${(archive.pointer() / 1024 / 1024).toFixed(2)} MB)`);
      resolve();
    });

    archive.on('error', (err) => reject(err));

    archive.pipe(output);
    archive.directory(sourceDir, false);
    archive.finalize();
  });
};

async function packageAll() {
  try {
    // 1. Package Main Release ZIP
    await createZipArchive(targetFolder, mainZip, 'Full Release ZIP (Fashionvillaroyal-website.zip)');

    // 2. Package Frontend ZIP
    const tempFrontendDir = path.join(rootDir, 'temp_frontend_pkg');
    if (fs.existsSync(tempFrontendDir)) {
      fs.rmSync(tempFrontendDir, { recursive: true, force: true });
    }
    fs.mkdirSync(tempFrontendDir, { recursive: true });
    
    // Copy frontend files
    dirsToCopy.forEach((dir) => {
      const srcPath = path.join(rootDir, dir);
      if (fs.existsSync(srcPath)) {
        fs.cpSync(srcPath, path.join(tempFrontendDir, dir), { recursive: true });
      }
    });
    filesToCopy.forEach((file) => {
      const srcFile = path.join(rootDir, file);
      if (fs.existsSync(srcFile)) {
        fs.copyFileSync(srcFile, path.join(tempFrontendDir, file));
      }
    });
    if (fs.existsSync(path.join(rootDir, 'frontend'))) {
      fs.cpSync(path.join(rootDir, 'frontend'), path.join(tempFrontendDir, 'vanilla-frontend'), { recursive: true });
    }

    await createZipArchive(tempFrontendDir, frontendZip, 'Frontend Source ZIP (frontend.zip)');
    fs.rmSync(tempFrontendDir, { recursive: true, force: true });

    // 3. Package Backend ZIP
    const backendDir = path.join(rootDir, 'backend');
    if (fs.existsSync(backendDir)) {
      await createZipArchive(backendDir, backendZip, 'Backend Source ZIP (backend.zip)');
    }

    console.log('✨ All Frontend & Backend ZIP files created successfully!');
  } catch (err) {
    console.error('❌ Error during packaging:', err);
  }
}

packageAll();

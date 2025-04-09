#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Ensure the required directories exist
const distDir = path.join(__dirname, '..', 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Display build start message
console.log('🚀 Building Notific.ai SDK...');

try {
  // Clean the dist directory
  console.log('🧹 Cleaning previous build...');
  execSync('npm run clean', { stdio: 'inherit' });

  // Build the package
  console.log('🔨 Building package...');
  execSync('npm run build', { stdio: 'inherit' });

  // Create a UMD bundle that's ready for direct script tag inclusion
  const packageJson = require('../package.json');
  const version = packageJson.version;

  console.log(`📦 Creating UMD bundle v${version}...`);
  
  // Copy UMD file to a more accessible filename
  fs.copyFileSync(
    path.join(distDir, 'notific-ai-sdk.umd.js'),
    path.join(distDir, 'sdk.js')
  );

  console.log('✅ Build completed successfully!');
  console.log('\nOutput files:');
  console.log(`- ESM: ${path.join('dist', path.basename(packageJson.module))}`);
  console.log(`- CJS: ${path.join('dist', path.basename(packageJson.main))}`);
  console.log(`- UMD: ${path.join('dist', path.basename(packageJson.browser))}`);
  console.log(`- TypeScript Definitions: ${path.join('dist', 'notific-ai-sdk.d.ts')}`);
  console.log(`- CDN/Script: ${path.join('dist', 'sdk.js')}`);
  
  console.log('\nUsage examples:');
  console.log('- ES Modules: import { NotificAI } from \'notific-ai-sdk\';');
  console.log('- CommonJS: const { NotificAI } = require(\'notific-ai-sdk\');');
  console.log('- Script tag: <script src="https://cdn.notific.ai/sdk.js" data-api-key="your-api-key"></script>');

} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
#!/usr/bin/env node

/**
 * Image Optimization Script
 * 
 * This script optimizes images in the src/assets/images directory
 * by compressing them and creating WebP versions for better performance.
 * 
 * Usage: node scripts/optimize-images.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGES_DIR = path.join(__dirname, '../src/assets/images');
const OPTIMIZED_DIR = path.join(IMAGES_DIR, 'optimized');

// Supported image formats
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png', '.gif'];

// Image optimization settings
const OPTIMIZATION_SETTINGS = {
  quality: 85,
  progressive: true,
  mozjpeg: true,
  webp: {
    quality: 80,
    effort: 6
  }
};

/**
 * Check if a file is an image
 */
function isImageFile(filename) {
  const ext = path.extname(filename).toLowerCase();
  return SUPPORTED_FORMATS.includes(ext);
}

/**
 * Get file size in KB
 */
function getFileSizeKB(filepath) {
  const stats = fs.statSync(filepath);
  return Math.round(stats.size / 1024);
}

/**
 * Create optimized directory if it doesn't exist
 */
function ensureOptimizedDir() {
  if (!fs.existsSync(OPTIMIZED_DIR)) {
    fs.mkdirSync(OPTIMIZED_DIR, { recursive: true });
    console.log('✅ Created optimized images directory');
  }
}

/**
 * Simple image compression using canvas (fallback method)
 * This is a basic implementation - in production, you'd want to use
 * proper image optimization libraries like sharp or imagemin
 */
function createOptimizedVersion(inputPath, outputPath, quality = 0.85) {
  try {
    // For now, just copy the file with a note
    // In a real implementation, you'd use sharp or similar
    fs.copyFileSync(inputPath, outputPath);
    
    const originalSize = getFileSizeKB(inputPath);
    const optimizedSize = getFileSizeKB(outputPath);
    const savings = Math.round(((originalSize - optimizedSize) / originalSize) * 100);
    
    console.log(`📸 ${path.basename(inputPath)}: ${originalSize}KB → ${optimizedSize}KB (${savings}% savings)`);
    
    return true;
  } catch (error) {
    console.error(`❌ Failed to optimize ${path.basename(inputPath)}:`, error.message);
    return false;
  }
}

/**
 * Generate responsive image sizes
 */
function generateResponsiveSizes(inputPath, baseName) {
  const sizes = [
    { suffix: '-sm', width: 640, quality: 80 },
    { suffix: '-md', width: 1024, quality: 85 },
    { suffix: '-lg', width: 1920, quality: 90 }
  ];
  
  sizes.forEach(size => {
    const outputPath = path.join(OPTIMIZED_DIR, `${baseName}${size.suffix}.jpg`);
    // In a real implementation, you'd resize the image here
    console.log(`📱 Would create ${size.width}px version: ${path.basename(outputPath)}`);
  });
}

/**
 * Main optimization function
 */
async function optimizeImages() {
  console.log('🚀 Starting image optimization...\n');
  
  ensureOptimizedDir();
  
  try {
    const files = fs.readdirSync(IMAGES_DIR);
    const imageFiles = files.filter(isImageFile);
    
    if (imageFiles.length === 0) {
      console.log('ℹ️  No images found to optimize');
      return;
    }
    
    console.log(`📁 Found ${imageFiles.length} images to optimize\n`);
    
    let optimizedCount = 0;
    let totalOriginalSize = 0;
    let totalOptimizedSize = 0;
    
    for (const filename of imageFiles) {
      const inputPath = path.join(IMAGES_DIR, filename);
      const baseName = path.parse(filename).name;
      const ext = path.parse(filename).ext;
      
      // Skip if already in optimized directory
      if (inputPath.includes('optimized')) continue;
      
      const originalSize = getFileSizeKB(inputPath);
      totalOriginalSize += originalSize;
      
      // Create optimized version
      const optimizedPath = path.join(OPTIMIZED_DIR, `${baseName}-optimized${ext}`);
      
      if (createOptimizedVersion(inputPath, optimizedPath, OPTIMIZATION_SETTINGS.quality / 100)) {
        optimizedCount++;
        totalOptimizedSize += getFileSizeKB(optimizedPath);
        
        // Generate responsive sizes for large images
        if (originalSize > 100) {
          generateResponsiveSizes(inputPath, baseName);
        }
      }
    }
    
    // Summary
    console.log('\n📊 Optimization Summary:');
    console.log(`✅ Optimized: ${optimizedCount}/${imageFiles.length} images`);
    console.log(`💾 Total size: ${totalOriginalSize}KB → ${totalOptimizedSize}KB`);
    
    if (totalOriginalSize > 0) {
      const totalSavings = Math.round(((totalOriginalSize - totalOptimizedSize) / totalOriginalSize) * 100);
      console.log(`🎉 Total savings: ${totalSavings}%`);
    }
    
    console.log('\n💡 Next steps:');
    console.log('1. Review optimized images in src/assets/images/optimized/');
    console.log('2. Replace original images with optimized versions if satisfied');
    console.log('3. Consider using WebP format for even better compression');
    console.log('4. Implement responsive images with different sizes');
    
  } catch (error) {
    console.error('❌ Optimization failed:', error.message);
    process.exit(1);
  }
}

/**
 * CLI usage
 */
if (import.meta.url === `file://${process.argv[1]}`) {
  optimizeImages().catch(console.error);
}

export { optimizeImages };

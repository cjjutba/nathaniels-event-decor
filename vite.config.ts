import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Simple image optimization plugin
const imageOptimization = () => {
  return {
    name: 'image-optimization',
    generateBundle(options, bundle) {
      // Log image assets for optimization tracking
      Object.keys(bundle).forEach(fileName => {
        if (fileName.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
          const asset = bundle[fileName];
          if (asset.type === 'asset') {
            console.log(`📸 Image asset: ${fileName} (${Math.round(asset.source.length / 1024)}KB)`);
          }
        }
      });
    }
  };
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    imageOptimization(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          // Keep React together to avoid context issues
          'react-vendor': ['react', 'react-dom'],
          // UI libraries
          'ui-vendor': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-tabs',
            '@radix-ui/react-avatar'
          ],
          // Utility libraries
          'utils-vendor': ['lucide-react', 'clsx', 'tailwind-merge']
        }
      }
    },
    // Optimize build but keep it simple
    sourcemap: false,
    minify: 'esbuild', // Use esbuild instead of terser for better compatibility
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Optimize assets
    assetsInlineLimit: 4096, // 4kb
    // Use modern target but ensure compatibility
    target: 'es2020'
  },
  // Optimize dev dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react']
  }
}));

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
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('@radix-ui')) {
              return 'ui-vendor';
            }
            if (id.includes('lucide-react') || id.includes('clsx') || id.includes('tailwind-merge')) {
              return 'utils-vendor';
            }
            if (id.includes('@tanstack/react-query')) {
              return 'query-vendor';
            }
            return 'vendor';
          }

          // Admin pages
          if (id.includes('/pages/admin/')) {
            return 'admin-pages';
          }

          // Client pages
          if (id.includes('/pages/client/')) {
            return 'client-pages';
          }

          // Hooks and utilities
          if (id.includes('/hooks/') || id.includes('/utils/')) {
            return 'utils';
          }

          // Components
          if (id.includes('/components/')) {
            return 'components';
          }
        },
        // Optimize asset file names
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/css/i.test(ext)) {
            return `assets/css/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js'
      }
    },
    // Optimize build
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug']
      }
    },
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Optimize assets
    assetsInlineLimit: 4096, // 4kb
    // Enable tree shaking
    target: 'esnext'
  },
  // Optimize dev dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react']
  }
}));

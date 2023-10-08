import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Sungka-Online/',
  plugins: [react()],
  optimizeDeps: {
    disabled: false,
    include: ['react', '@shared/utils'],
  },
  build: {
    commonjsOptions: {
      exclude: ['@shared/utils'],
      include: ['react']
    },
  },
})

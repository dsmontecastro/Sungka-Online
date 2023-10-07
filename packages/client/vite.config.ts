import path from 'path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Sungka-Online/',
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
      include: ['@shared/utils'],
    }
  },
  optimizeDeps: {
    'include': [
      '@shared/types',
      '@shared/utils'
    ]
  },
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '/@shared/utils',
        replacement: path.resolve(__dirname, 'node_modules', 'shared', 'utils')
      }
    ]
  }
})

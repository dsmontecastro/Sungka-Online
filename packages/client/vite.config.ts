import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Sungka-Online/',
  define: {
    TITLE: JSON.stringify(process.env.npm_package_displayName)
  },
  plugins: [react()],
})

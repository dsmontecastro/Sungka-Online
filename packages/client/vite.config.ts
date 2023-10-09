import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

const base = '/Sungka-Online/';
const title = 'Sungka Online';

// https://vitejs.dev/config/
export default defineConfig({
  base: base,
  define: {
    TITLE: JSON.stringify(process.env.npm_package_displayName) || title
  },
  plugins: [react()],
})

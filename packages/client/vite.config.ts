import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

import { homepage } from './package.json';

function getBase(text: string) {
  const list = text.split('/');
  const base = list[list.length - 2];
  return `/${base}/`;
}

// https://vitejs.dev/config/
export default defineConfig({
  base: getBase(homepage),
  plugins: [react()],
})

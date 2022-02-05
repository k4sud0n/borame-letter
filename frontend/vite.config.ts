import path from 'path';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

console.log( path.resolve(__dirname, 'src'));
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
  },
  plugins: [react()]
})

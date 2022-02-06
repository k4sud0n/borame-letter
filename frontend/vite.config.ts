import path from 'path';
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default ({ mode }) => {
  const { HMR_HOST }: Record<string, string> = { ...process.env, ...loadEnv(mode, process.cwd(), '') };

  const hmr = HMR_HOST
    ? {
        host: HMR_HOST,
        protocol: 'wss',
        port: 443,
      }
    : undefined;

  return defineConfig({
  server: {
    host: 'localhost',
    hmr,
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
  },
  plugins: [react()]
});
}

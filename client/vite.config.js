import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import dotenv from 'dotenv'
import path from 'path'

const env = loadEnv(process.env.NODE_ENV, path.resolve(__dirname, '../'));

dotenv.config({
  path: path.resolve(__dirname, './../.env')
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  define: {
    'import.meta.env.VITE_SERVER_URL': JSON.stringify(process.env.VITE_SERVER_URL),
    'import.meta.env.VITE_PORT': JSON.stringify(process.env.VITE_PORT)
  },
  build: {
    sourcemap: true
  }
})

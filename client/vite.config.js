import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
  path: path.resolve(__dirname, './../.env')
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  define: {
    'import.meta.env.VITE_SERVER_URL': JSON.stringify(process.env.VITE_SERVER_URL),
    'import.meta.env.VITE_PORT': JSON.stringify(process.env.VITE_PORT)
  },
  build: {
    sourcemap: true
  }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import process from 'node:process'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Same-origin API in development so the admin auth cookie just works.
    proxy: {
      '/api': process.env.API_URL || 'http://localhost:5050',
    },
  },
})

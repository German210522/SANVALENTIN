import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Esto detecta si estás en GitHub Pages o en tu PC local
  base: process.env.NODE_ENV === 'production' ? '/SANVALENTIN/' : '/',
})
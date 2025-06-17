import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Ceci est le port de développement
  },
  preview: {
    port: 9000, // Ceci sera le port utilisé par `vite preview`
  },
})
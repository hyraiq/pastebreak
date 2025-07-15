import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 4010,
    strictPort: true,
    hmr: {
      clientPort: 4010,
    },
  },
  plugins: [react()],
})

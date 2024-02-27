import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  sourcemap: true,
  build: {
    // TODO:  change before build to prod
    sourcemap: true
  }
})

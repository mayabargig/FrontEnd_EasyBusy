import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss';

export default defineConfig({
  base: '/FrontEnd_EasyBusy/',
  plugins: [react()
  ],
  css: {
    postcss: {
      plugins: [
        tailwindcss,
      ],
    },
  },
  // sourcemap: true,
  // build: {
  //   // TODO:  change before build to prod
  //   sourcemap: true
  // }
});

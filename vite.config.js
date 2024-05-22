import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss';

export default defineConfig({
  // refer to git repo path
  base: '/FrontEnd_EasyBusy/'.toLocaleLowerCase(),
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
  build: {
    rollupOptions: {
      // output: {
      //   assetFileNames: (assetInfo) => {
      //     return assetInfo?.name?.replace('assets/', '')
      //   },
      // },
    }
  }
});

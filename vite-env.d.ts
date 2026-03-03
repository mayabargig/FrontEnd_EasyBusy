/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_EASY_BUSY_BACKEND__URL: string
    // more env variables...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
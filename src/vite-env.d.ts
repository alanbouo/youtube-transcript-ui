/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PROXY_HOST: string
  readonly VITE_PROXY_PORT: string
  readonly VITE_PROXY_USER: string
  readonly VITE_PROXY_PASS: string
  readonly VITE_API_KEY: string;
  // ajoute ici d'autres variables VITE_ si nécessaire
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

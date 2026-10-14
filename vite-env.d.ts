
// Applications vite env variables.
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
}

// typed  env variables.
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

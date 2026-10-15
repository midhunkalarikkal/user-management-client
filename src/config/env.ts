const serverUrl = import.meta.env.VITE_SERVER_URL;

if (!serverUrl) {
  throw new Error("Missing VITE_API_BASE_URL environment variable");
}

export const env = {
  serverUrl: serverUrl.replace(/\/+$/, ""),
} as const;

// services/gemini.ts atau utils/env.ts

export const getSafeApiKey = (): string | undefined => {
  try {
    // 1. Cek cara Vite (import.meta.env) - Paling umum untuk project modern
    // @ts-ignore
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      // @ts-ignore
      if (import.meta.env.VITE_API_KEY) return import.meta.env.VITE_API_KEY;
      // @ts-ignore
      if (import.meta.env.API_KEY) return import.meta.env.API_KEY;
    }

    // 2. Cek cara Node.js / Create-React-App (process.env)
    // @ts-ignore
    if (typeof process !== 'undefined' && process.env) {
      // @ts-ignore
      if (process.env.REACT_APP_API_KEY) return process.env.REACT_APP_API_KEY;
      // @ts-ignore
      if (process.env.VITE_API_KEY) return process.env.VITE_API_KEY;
      // @ts-ignore
      if (process.env.API_KEY) return process.env.API_KEY;
    }
  } catch (e) {
    console.error("Error reading API Key", e);
  }
  return undefined;
};
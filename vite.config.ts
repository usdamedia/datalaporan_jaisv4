import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from "vite-plugin-singlefile"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteSingleFile()
  ],
  esbuild: {
    // Strip console.log and console.warn in production builds
    // to prevent information leakage. Keep console.error for critical issues.
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
  },
})

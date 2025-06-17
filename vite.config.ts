import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import mdx from '@mdx-js/rollup';
import rehypeHighlight from 'rehype-highlight';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    mdx({
      rehypePlugins: [rehypeHighlight],
      providerImportSource: '@mdx-js/react'
    }),
  ],
})

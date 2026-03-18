import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import mdx from '@mdx-js/rollup';
import rehypeHighlight from 'rehype-highlight';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    mdx({
      rehypePlugins: [rehypeHighlight],
      providerImportSource: '@mdx-js/react',
      remarkPlugins: [
          remarkFrontmatter,
          [remarkMdxFrontmatter, { name: 'frontmatter' }]
      ],
    }),
  ],
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
  },
  resolve: {
    alias: {
      'react': 'preact/compat',
      'react-dom': 'preact/compat',
    },
  },
})

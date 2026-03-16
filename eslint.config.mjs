import nextConfig from 'eslint-config-next/core-web-vitals'
import globals from 'globals'

const eslintConfig = [
  ...nextConfig,
  {
    files: ['worker.js'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.serviceworker,
        HTMLRewriter: 'readonly',
      },
      sourceType: 'module',
    },
  },
  {
    files: ['public/sw.js'],
    languageOptions: {
      globals: {
        ...globals.serviceworker,
      },
      sourceType: 'script',
    },
  },
  {
    rules: {
      // False positive in App Router — fonts in layout.tsx apply globally
      '@next/next/no-page-custom-font': 'off',
    },
  },
]

export default eslintConfig

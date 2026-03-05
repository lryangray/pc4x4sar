import nextConfig from 'eslint-config-next/core-web-vitals'

export default [
  ...nextConfig,
  {
    rules: {
      // False positive in App Router — fonts in layout.tsx apply globally
      '@next/next/no-page-custom-font': 'off',
    },
  },
]

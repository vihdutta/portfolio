import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  // For custom domain deployment, use '/'
  // For GitHub Pages project deployment, use '/portfolio/'
  const isProduction = command === 'build'
  const isCustomDomain = process.env.CUSTOM_DOMAIN === 'true'
  
  let base = '/'
  
  if (isProduction && !isCustomDomain) {
    // GitHub Pages project page deployment
    base = '/portfolio/'
  }
  
  console.log(`🏗️  Building with base path: ${base}`)
  console.log(`🌐 Custom domain: ${isCustomDomain}`)
  
  return {
    plugins: [react()],
    base,
    define: {
      // Expose CUSTOM_DOMAIN to the client-side as VITE_CUSTOM_DOMAIN
      'import.meta.env.VITE_CUSTOM_DOMAIN': JSON.stringify(process.env.CUSTOM_DOMAIN || 'false'),
    },
  }
})

import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint', 
    'shadcn-nuxt', 
    '@pinia/nuxt'
  ],
  css: ['~/assets/css/main.css'],
  vite: { 
    plugins: [tailwindcss()],
  },
  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  },
  nitro: {
    prerender: {
      routes: ['/']
    }
  },
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap'
        }
      ]
    },
    baseURL: process.env.NODE_ENV === 'production' ? '/test-invoice-creator/' : '/',
    buildAssetsDir: '/_nuxt/'
  },
  ssr: true
})
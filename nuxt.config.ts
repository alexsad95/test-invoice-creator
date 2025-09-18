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
})
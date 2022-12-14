// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ['~/assets/css/main.css'],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    modules: ['@pinia/nuxt', '@vueuse/nuxt'],
    runtimeConfig: {
        public: {
            apiBaseUrl: process.env.GATEWAY_BASE_URL,
            authBaseUrl: process.env.AUTH_BASE_URL,
        }
    }
})

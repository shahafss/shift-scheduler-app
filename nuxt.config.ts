/* eslint-disable indent */
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  experimental: {
    payloadExtraction: true,
  },
  router: {
    base: "/shift-scheduler-app/", // Replace with your details
  },
});

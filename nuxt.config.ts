/* eslint-disable indent */
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  experimental: {
    payloadExtraction: true,
  },
  target: "static",
  router: {
    base: "/shift-scheduler-app/",
  },
});

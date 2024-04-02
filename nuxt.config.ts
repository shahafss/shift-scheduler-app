// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  target: "static",
  router: {
    base: "/shift-scheduler-app/", // Replace 'your-repo-name' with your GitHub repository name
  },
});

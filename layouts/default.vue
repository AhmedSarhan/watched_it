<template>
  <div>
    <the-header />
    <theme-switch />
    <Nuxt />
  </div>
</template>

<script>
import TheHeader from "~/components/Navigation/TheHeader.vue";
export default {
  components: { TheHeader },
  middleware: "auth",
};
</script>

<style>
</style>
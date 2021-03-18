<template>
  <div>
    <the-header />
    <theme-switch />
    <Nuxt />
    <the-footer />
  </div>
</template>

<script>
import TheFooter from "~/components/Navigation/TheFooter.vue";
import TheHeader from "~/components/Navigation/TheHeader.vue";
export default {
  components: { TheHeader, TheFooter },
  middleware: "auth",
};
</script>

<style>
</style>
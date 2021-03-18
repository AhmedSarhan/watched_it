<template>
  <div>
    <theme-switch />
    <Nuxt />
  </div>
</template>

<script>
export default {
  middleware: "auth",
  auth: "guest",
};
</script>

<style>
</style>
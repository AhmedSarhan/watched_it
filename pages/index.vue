<template>
  <div class="container my-2 d-flex justify-content-between align-center">
    <div>
      <h3>Hello {{ this.$auth.user.username }}</h3>
    </div>
    <div>
      <TheHeader />
    </div>
  </div>
</template>

<script>
export default {
  layout: "default",
};
</script>

<style>
</style>
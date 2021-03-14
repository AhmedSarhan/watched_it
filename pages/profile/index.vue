<template>
  <div class="container my-2">
    <div>
      <h3>Hello {{ this.$auth.user.username }}</h3>
    </div>
    <div class="d-flex justify-content-around align-center">
      <div>Email:</div>
      <div>
        {{ this.$auth.user.email }}
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>
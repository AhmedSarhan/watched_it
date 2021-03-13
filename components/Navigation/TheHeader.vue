<template>
  <button @click="signOutHandler" class="btn btn-danger">Sign Out</button>
</template>

<script>
export default {
  methods: {
    async signOutHandler() {
      await this.$auth.logout();
      this.$router.push("/auth");
    },
  },
};
</script>

<style>
</style>
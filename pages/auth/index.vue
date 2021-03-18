<template>
  <b-container class="auth-container">
    <Login v-if="login" @register="changeToRegisterHandler" />
    <Register v-else @login="changeToLoginHandler" />
  </b-container>
</template>

<script>
export default {
  layout: "guest",
  data() {
    return {
      login: true,
    };
  },
  methods: {
    changeToRegisterHandler() {
      this.login = false;
    },
    changeToLoginHandler() {
      this.login = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.auth-container {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>
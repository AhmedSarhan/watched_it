<template>
  <b-dropdown
    dropleft
    class="theme-switch"
    no-caret
    toggle-class="theme-switch-btn"
    variant="none"
    menu-class="theme-list"
  >
    <template #button-content>
      <i class="fas fa-cog"></i>
    </template>
    <b-dropdown-item-button
      :active="$colorMode.preference === color"
      v-for="color of colors"
      :key="color"
      @click="$colorMode.preference = color"
    >
      {{ color }}
    </b-dropdown-item-button>
  </b-dropdown>
</template>
<script>
export default {
  data() {
    return {
      colors: ["light", "dark", "sepia"],
    };
  },
};
</script>
<style lang="scss" scoped>
</style>
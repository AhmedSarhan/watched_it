<template>
  <div class="container">
    <h3>{{ $route.query.search }}</h3>
    <movie-list :movies="searchMovies" />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      searchMovies: "searchMovies",
    }),
  },
};
</script>

<style>
</style>
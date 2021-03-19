<template>
  <div class="container">
    <div v-if="searchedMovies.length">
      <h3 class="text-center my-3">
        You Searched for {{ $route.query.search }}
      </h3>
      <movie-list :movies="searchedMovies" />
    </div>
    <div v-else>
      <h3 class="text-center my-3">
        No results for {{ $route.query.search }} please try again
      </h3>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState({
      searchedMovies: "searchMovies",
    }),
  },
  methods: {
    ...mapActions(["searchMovies"]),
  },
  mounted() {
    if (this.searchedMovies.length === 0 && this.$route.query.search) {
      this.searchMovies(this.$route.query.search);
    } else if (!this.$route.query.search) {
      this.$router.push("/");
    }
  },
};
</script>

<style>
</style>
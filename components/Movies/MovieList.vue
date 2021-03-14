<template>
  <div class="container">
    <div class="row" v-if="movies.length">
      <div class="col-md-4 my-3" v-for="movie in movies" :key="movie.id">
        <movie-card :movie="movie" />
      </div>
    </div>
  </div>
</template>

<script>
import MovieCard from "../Movies/MovieCard.vue";
export default {
  components: { MovieCard },
  props: ["movies"],
};
</script>

<style>
</style>
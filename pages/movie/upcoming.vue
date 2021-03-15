<template>
  <movie-list :movies="movies" />
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      movies: [],
    };
  },
  async fetch() {
    await axios
      .get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=4948bcc35bedbb8a8ddfb8156c05e6e4`
      )
      .then((res) => {
        this.movies = [...res.data.results];
      })
      .catch((err) => {
        console.log("Error: " + err);
        if (err === "Error: read ECONNRESET") {
          vm.$forceUpdate();
        }
      });
  },
};
</script>

<style lang="scss" scoped>
.card {
  background-color: var(--bg-secondary);
}
</style>
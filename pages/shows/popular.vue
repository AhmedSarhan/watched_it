<template>
  <movie-list :movies="movies" :previewType="'tv'" />
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
        `https://api.themoviedb.org/3/tv/popular?api_key=4948bcc35bedbb8a8ddfb8156c05e6e4`
      )
      .then((res) => {
        this.movies = [...res.data.results];
      })
      .catch((err) => {
        //console.log("Error: " + err);
      });
  },
  mounted() {
    this.$fetch();
  },
};
</script>

<style lang="scss" scoped>
.card {
  background-color: var(--bg-secondary);
}
</style>
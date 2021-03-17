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
      .get("/api/favorites")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style lang="scss" scoped>
</style>
<template>
  <div class="container">
    <div class="d-flex justify-content-start align-center my-3">
      <div
        class="btn mx-2"
        @click="changePreviewHandler('tv')"
        :class="{
          'btn-outline-golden': previewType === 'movie',
          'btn-golden': previewType === 'tv',
        }"
        :disabled="previewType === 'tv'"
      >
        <i class="fas fa-tv"></i> TV
      </div>
      <div
        class="btn mx-2"
        @click="changePreviewHandler('movie')"
        :class="{
          'btn-outline-golden': previewType === 'tv',
          'btn-golden': previewType === 'movie',
        }"
        :disabled="previewType === 'movie'"
      >
        <i class="fas fa-film"></i> Movie
      </div>
    </div>
    <p v-if="$fetchState.pending">Fetching movies...</p>
    <p v-else-if="$fetchState.error">Error while fetching movies</p>
    <div v-else>
      <div v-if="movies.length">
        <movie-list
          :movies="movies"
          :previewType="previewType"
          @fetch="reFetchHandler"
        />
      </div>
      <div v-else class="w-100 my-4 mx-auto text-center">
        <h3 class="text-center">No {{ previewType }} yet</h3>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      movies: [],
      previewType: "movie",
    };
  },
  async fetch() {
    await axios
      .get("/watch_list", {
        params: {
          type: this.previewType,
          watched: false,
        },
      })
      .then((res) => {
        //console.log(res);
        if (res?.data?.movies) {
          this.movies = [...res.data.movies];
        }
      })
      .catch((err) => {
        //console.log(err);
      });
  },
  mounted() {
    this.$fetch();
  },
  methods: {
    changePreviewHandler(type) {
      this.previewType = type;
      this.movies = [];
      this.$fetch();
    },
    async reFetchHandler() {
      this.movies = [];
      await this.$fetch();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
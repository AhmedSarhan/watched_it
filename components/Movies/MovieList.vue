<template>
  <div class="container">
    <p v-if="$fetchState.pending">Fetching movies...</p>
    <p v-else-if="$fetchState.error">Error while fetching movies</p>

    <div class="row" v-else>
      <div class="col-md-4 my-3" v-for="movie in latestMovies" :key="movie.id">
        <movie-card :movie="movie" @fetch="refetchHandler" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      latestMovies: [],
    };
  },
  props: ["movies", "previewType"],
  async fetch() {
    //console.log("running");
    await this.$axios
      .get("/watch_list", {
        params: {
          type: this.previewType,
          watched: true,
        },
      })
      .then((res) => {
        if (res?.data?.movies) {
          let watched = [...res.data.movies];
          this.latestMovies = this.movies.map((movie) => {
            let index = watched.findIndex((mov) => mov.id === movie.id);
            if (index > -1) {
              return { ...movie, watched: true, watchList: true };
            }
            return { ...movie, watched: false, watchList: false };
          });
        } else {
          this.latestMovies = [...this.movies];
        }
        //console.log("movies", this.latestMovies);
      })
      .catch(async (err) => {
        //console.log(err);
        await this.$auth.logout();
        this.$router.push("/auth");
      });
    await this.$axios
      .get("/watch_list", {
        params: {
          type: this.previewType,
          watched: false,
        },
      })
      .then((res) => {
        if (res?.data?.movies) {
          let watchList = [...res.data.movies];

          this.latestMovies = this.latestMovies.map((movie) => {
            let index = watchList.findIndex((mov) => mov.id === movie.id);
            if (index > -1) {
              return { ...movie, watched: false, watchList: true };
            }
            return { ...movie };
          });
        } else {
          this.latestMovies = [...this.latestMovies];
        }
        //console.log("movies", this.latestMovies);
      })
      .catch(async (err) => {
        //console.log(err);
        await this.$auth.logout();
        this.$router.push("/auth");
      });
    await this.$axios
      .get("/favorites", {
        params: { type: this.previewType },
      })
      .then((res) => {
        if (res?.data?.movies) {
          let favs = [...res.data.movies];
          this.latestMovies = this.latestMovies.map((movie) => {
            let index = favs.findIndex((mov) => mov.id === movie.id);
            if (index > -1) {
              return { ...movie, favorite: true };
            }
            return { ...movie, favorite: false };
          });
        } else {
          this.latestMovies = [...this.latestMovies];
        }
        //console.log("movies", this.latestMovies);
      })
      .catch(async (err) => {
        //console.log(err);
        await this.$auth.logout();
        this.$router.push("/auth");
      });
  },
  mounted() {
    this.$fetch();
  },
  watch: {
    movies: function (newVal, oldVal) {
      // watch it
      this.$fetch();
    },
  },
  methods: {
    async refetchHandler() {
      await this.$emit("fetch");
      this.$fetch();
    },
  },
};
</script>

<style>
</style>
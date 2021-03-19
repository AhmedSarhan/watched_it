<template>
  <client-only>
    <div>
      <div v-if="latestMovies.length">
        <VueSlickCarousel
          ref="c1"
          :focusOnSelect="false"
          :accessibility="true"
          :touchMove="true"
          :arrows="true"
          class="big-slider"
          :slidesToShow="4"
          :speed="500"
          :autoplay="true"
          :slidesToScroll="2"
          :autoplaySpeed="2500"
          :responsive="[
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 2,
                infinite: true,
                dots: false,
              },
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2,
                dots: false,
              },
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: false,
                arrows: false,
              },
            },
          ]"
        >
          <div v-for="movie in latestMovies" :key="movie.id" class="app-slider">
            <movie-card :movie="movie" @fetch="refetchHandler" />
          </div>
        </VueSlickCarousel>
      </div>
    </div>
  </client-only>
</template>

<script>
import axios from "axios";
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
export default {
  data() {
    return {
      latestMovies: [],
      loadingMovies: [],
    };
  },
  props: ["movies", "previewType"],

  components: { VueSlickCarousel },
  async fetch() {
    //console.log("running");
    await this.$axios
      .get("/api/watch_list", {
        params: {
          type: this.previewType,
          watched: true,
        },
      })
      .then((res) => {
        if (res?.data?.movies) {
          let watched = [...res.data.movies];
          this.loadingMovies = this.movies.map((movie) => {
            let index = watched.findIndex((mov) => mov.id === movie.id);
            if (index > -1) {
              return { ...movie, watched: true, watchList: true };
            }
            return { ...movie, watched: false, watchList: false };
          });
        } else {
          this.loadingMovies = [...this.movies];
          return;
        }
        //console.log("movies", this.latestMovies);
      })
      .catch(async (err) => {
        //console.log(err);
        if (err.response && err.response.status === 400) {
          await this.$auth.logout();
          this.$router.push("/auth");
        }
      });
    await this.$axios
      .get("/api/watch_list", {
        params: {
          type: this.previewType,
          watched: false,
        },
      })
      .then((res) => {
        if (res?.data?.movies) {
          let watchList = [...res.data.movies];

          this.loadingMovies = this.loadingMovies.map((movie) => {
            let index = watchList.findIndex((mov) => mov.id === movie.id);
            if (index > -1) {
              return { ...movie, watched: false, watchList: true };
            }
            return { ...movie };
          });
        } else {
          this.loadingMovies = [...this.loadingMovies];
          return;
        }
        //console.log("movies", this.latestMovies);
      })
      .catch(async (err) => {
        //console.log(err);
        if (err.response && err.response.status === 400) {
          await this.$auth.logout();
          this.$router.push("/auth");
        }
      });
    await this.$axios
      .get("/api/favorites", {
        params: { type: this.previewType },
      })
      .then((res) => {
        if (res?.data?.movies) {
          let favs = [...res.data.movies];
          this.latestMovies = this.loadingMovies.map((movie) => {
            let index = favs.findIndex((mov) => mov.id === movie.id);
            if (index > -1) {
              return { ...movie, favorite: true };
            }
            return { ...movie, favorite: false };
          });
        } else {
          this.latestMovies = [...this.loadingMovies];
          return;
        }
        //console.log("movies", this.latestMovies);
      })
      .catch(async (err) => {
        //console.log(err);
        if (err.response && err.response.status === 400) {
          await this.$auth.logout();
          this.$router.push("/auth");
        }
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

<style lang="scss" scoped>
.app-slider {
  width: 90% !important;
  margin: auto;
  display: flex !important;
}
</style>
<template>
  <div class="container my-2">
    <div class="container my-3" v-if="playingList.length">
      <div class="d-flex justify-content-start my-3">
        <div class="mr-4">
          <h2 class="slider-title">Currently Playing</h2>
        </div>
        <div class="selector">
          <div class="anchor" :class="{ active: playing.current === 'movie' }">
            <button
              class="btn btn-transparent"
              :disabled="playing.current === 'movie'"
              @click="switchHandler('playing')"
            >
              In Theaters
            </button>
            <div
              class="background"
              :style="[
                playing.current === 'movie'
                  ? { left: '81.5875px', width: '109.338px' }
                  : { left: '0px', width: '81.5875px' },
              ]"
            ></div>
          </div>
          <div class="anchor" :class="{ active: playing.current === 'tv' }">
            <button
              class="btn btn-transparent"
              :disabled="playing.current === 'tv'"
              @click="switchHandler('playing')"
            >
              On TV
            </button>
          </div>
        </div>
      </div>
      <movie-slider :movies="playingList" />
    </div>

    <div class="container my-3" v-if="top_ratedList.length">
      <div class="d-flex justify-content-start my-3">
        <div class="mr-4">
          <h2 class="slider-title">Top Rated</h2>
        </div>
        <div class="selector">
          <div
            class="anchor"
            :class="{ active: top_rated.current === 'movie' }"
          >
            <button
              class="btn btn-transparent"
              :disabled="top_rated.current === 'movie'"
              @click="switchHandler('top_rated')"
            >
              Movies
            </button>
            <div
              class="background"
              :style="[
                top_rated.current === 'movie'
                  ? { left: '81.5875px', width: '109.338px' }
                  : { left: '0px', width: '81.5875px' },
              ]"
            ></div>
          </div>
          <div class="anchor" :class="{ active: top_rated.current === 'tv' }">
            <button
              class="btn btn-transparent"
              :disabled="top_rated.current === 'tv'"
              @click="switchHandler('top_rated')"
            >
              Shows
            </button>
          </div>
        </div>
      </div>
      <movie-slider :movies="top_ratedList" />
    </div>
    <div class="container my-3" v-if="upcomingList.length">
      <div class="d-flex justify-content-start my-3">
        <div class="mr-4">
          <h2 class="slider-title">Up Coming</h2>
        </div>
        <div class="selector">
          <div class="anchor" :class="{ active: upcoming.current === 'movie' }">
            <button
              class="btn btn-transparent"
              :disabled="upcoming.current === 'movie'"
              @click="switchHandler('upcoming')"
            >
              In Theaters
            </button>
            <div
              class="background"
              :style="[
                upcoming.current === 'movie'
                  ? { left: '81.5875px', width: '109.338px' }
                  : { left: '0px', width: '81.5875px' },
              ]"
            ></div>
          </div>
          <div class="anchor" :class="{ active: upcoming.current === 'tv' }">
            <button
              class="btn btn-transparent"
              :disabled="upcoming.current === 'tv'"
              @click="switchHandler('upcoming')"
            >
              On TV
            </button>
          </div>
        </div>
      </div>
      <movie-slider :movies="upcomingList" />
    </div>
    <div class="container my-3" v-if="popularList.length">
      <div class="d-flex justify-content-start my-3">
        <div class="mr-4">
          <h2 class="slider-title">Popular</h2>
        </div>
        <div class="selector">
          <div class="anchor" :class="{ active: popular.current === 'movie' }">
            <button
              class="btn btn-transparent"
              :disabled="popular.current === 'movie'"
              @click="switchHandler('popular')"
            >
              Movies
            </button>
            <div
              class="background"
              :style="[
                popular.current === 'movie'
                  ? { left: '81.5875px', width: '109.338px' }
                  : { left: '0px', width: '81.5875px' },
              ]"
            ></div>
          </div>
          <div class="anchor" :class="{ active: popular.current === 'tv' }">
            <button
              class="btn btn-transparent"
              :disabled="popular.current === 'tv'"
              @click="switchHandler('popular')"
            >
              Shows
            </button>
          </div>
        </div>
      </div>
      <movie-slider :movies="popularList" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  layout: "default",
  data() {
    return {
      playingList: [],
      top_ratedList: [],
      upcomingList: [],
      popularList: [],

      playing: {
        current: "movie",
        tv:
          "https://api.themoviedb.org/3/tv/on_the_air?api_key=4948bcc35bedbb8a8ddfb8156c05e6e4",
        movie:
          "https://api.themoviedb.org/3/movie/now_playing?api_key=4948bcc35bedbb8a8ddfb8156c05e6e4",
      },
      top_rated: {
        current: "movie",
        tv:
          "https://api.themoviedb.org/3/tv/top_rated?api_key=4948bcc35bedbb8a8ddfb8156c05e6e4",
        movie:
          "https://api.themoviedb.org/3/movie/top_rated?api_key=4948bcc35bedbb8a8ddfb8156c05e6e4",
      },
      upcoming: {
        current: "movie",
        tv:
          "https://api.themoviedb.org/3/tv/airing_today?api_key=4948bcc35bedbb8a8ddfb8156c05e6e4",
        movie:
          "https://api.themoviedb.org/3/movie/upcoming?api_key=4948bcc35bedbb8a8ddfb8156c05e6e4",
      },
      popular: {
        current: "movie",
        tv:
          "https://api.themoviedb.org/3/tv/popular?api_key=4948bcc35bedbb8a8ddfb8156c05e6e4",
        movie:
          "https://api.themoviedb.org/3/movie/popular?api_key=4948bcc35bedbb8a8ddfb8156c05e6e4",
      },
    };
  },
  async fetch() {
    // playing
    await axios({
      method: "get",
      url:
        this.playing.current === "movie" ? this.playing.movie : this.playing.tv,
    })
      .then((res) => {
        this.playingList = [...res.data.results];
      })
      .catch((err) => {
        console.log("Error: " + err);
      });
    await axios({
      method: "get",
      url:
        this.upcoming.current === "movie"
          ? this.upcoming.movie
          : this.upcoming.tv,
    })
      .then((res) => {
        this.upcomingList = [...res.data.results];
      })
      .catch((err) => {
        console.log("Error: " + err);
      });
    await axios({
      method: "get",
      url:
        this.top_rated.current === "movie"
          ? this.top_rated.movie
          : this.top_rated.tv,
    })
      .then((res) => {
        this.top_ratedList = [...res.data.results];
      })
      .catch((err) => {
        console.log("Error: " + err);
      });
    await axios({
      method: "get",
      url:
        this.popular.current === "movie" ? this.popular.movie : this.popular.tv,
    })
      .then((res) => {
        this.popularList = [...res.data.results];
      })
      .catch((err) => {
        console.log("Error: " + err);
      });
  },
  methods: {
    async switchHandler(recieved) {
      console.log(recieved);

      if (recieved === "playing") {
        console.log(recieved);
        this.playing.current === "movie"
          ? (this.playing.current = "tv")
          : (this.playing.current = "movie");
        await axios({
          method: "get",
          url:
            this.playing.current === "movie"
              ? this.playing.movie
              : this.playing.tv,
        })
          .then((res) => {
            console.log(res.data.results);
            this.playingList = [...res.data.results];
          })
          .catch((err) => {
            console.log("Error: " + err);
          });
      } else if (recieved === "upcoming") {
        this.upcoming.current === "movie"
          ? (this.upcoming.current = "tv")
          : (this.upcoming.current = "movie");
        await axios({
          method: "get",
          url:
            this.upcoming.current === "movie"
              ? this.upcoming.movie
              : this.upcoming.tv,
        })
          .then((res) => {
            this.upcomingList = [...res.data.results];
          })
          .catch((err) => {
            console.log("Error: " + err);
          });
      } else if (recieved === "top_rated") {
        this.top_rated.current === "movie"
          ? (this.top_rated.current = "tv")
          : (this.top_rated.current = "movie");
        await axios({
          method: "get",
          url:
            this.top_rated.current === "movie"
              ? this.top_rated.movie
              : this.top_rated.tv,
        })
          .then((res) => {
            this.top_ratedList = [...res.data.results];
          })
          .catch((err) => {
            console.log("Error: " + err);
          });
      } else if (recieved === "popular") {
        this.popular.current === "movie"
          ? (this.popular.current = "tv")
          : (this.popular.current = "movie");
        await axios({
          method: "get",
          url:
            this.popular.current === "movie"
              ? this.popular.movie
              : this.popular.tv,
        })
          .then((res) => {
            this.popularList = [...res.data.results];
          })
          .catch((err) => {
            console.log("Error: " + err);
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.slider-title {
  position: relative;
  &::before {
    position: absolute;
    top: 0;
    bottom: 0;
    left: -10%;
    right: 0;
    content: "";
    width: 4px;
    // height: 10px;
    background: var(--golden);
  }
}
.selector {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  background: var(--border-secondary) !important;
  color: var(--bg-secondary);
  border-radius: 30px;

  .anchor {
    background: var(--color-secondary);
    border-radius: 30px;
    height: 100%;
    border: transparent;
    padding-top: 5px;
    width: 100%;
    &.active {
      background: var(--bg-secondary);
      button {
        color: var(--color-secondary);
        &:disabled,
        &.disabled {
          color: var(--color-secondary) !important;
          opacity: 1;
        }
      }
    }
    button {
      width: 100%;
      font-size: 1em;
      padding: 4px 20px;
      margin-bottom: 0;
      white-space: nowrap;
      font-weight: 600;
      color: var(--bg-secondary);
      &:disabled,
      &.disabled {
        color: var(--color-secondary) !important;
        opacity: 1;
      }
    }
  }
}
</style>
<template>
  <div class="card">
    <div class="fav-icon">
      <i
        class="far fa-bookmark"
        @click="movie.favorite ? removeFromFavorites() : addToFavorites()"
        style="cursor: pointer"
      >
        <i class="fa fa-star" v-if="movie.favorite"></i>
        <i class="fa fa-star-o" v-else></i>
      </i>
    </div>
    <img
      class="card-img-top"
      :src="
        movie.poster_path
          ? `https://www.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}`
          : ''
      "
      :alt="movie.title"
    />
    <div class="card-body">
      <small>
        <i class="fas fa-star"></i>
        <span>{{ movie.vote_average }} ({{ movie.vote_count }})</span>
      </small>
      <h4 class="card-title my-1">
        {{ movie.name ? movie.name : movie.title }}
      </h4>
      <small class="card-text my-1">
        <i class="fas fa-clock"></i>
        <span>{{
          movie.first_air_date ? movie.first_air_date : movie.release_date
        }}</span>
      </small>
    </div>
    <div class="card-actions">
      <div class="d-flex flex-wrap justify-content-center align-center my-2">
        <div>
          <button
            v-if="!(movie.watchList && movie.watched)"
            class="btn btn-outline-golden mx-1"
            @click="
              movie.watchList ? removeFromWatchList() : addToWatchList(false)
            "
          >
            <i class="fas fa-trash" v-if="movie.watchList"></i>
            <i class="far fa-plus" v-else></i> WatchList
          </button>
        </div>
        <div>
          <button
            class="btn btn-outline-golden mx-1"
            @click="
              movie.watchList && movie.watched
                ? removeFromWatchList()
                : addToWatchList(true)
            "
          >
            <i class="fas fa-trash" v-if="movie.watchList && movie.watched"></i>
            <i class="far fa-plus" v-else></i>
            {{ movie.watchList && movie.watched ? "WatchList" : "Watched It" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["movie"],
  // async fetch() {
  //   // get all the user watchlist, favorites, start comparing and set the different ui variables accordingly
  //   await axios
  //     .get(`/api/favorites/${this.movie.id}`)
  //     .then((res) => {
  //       //console.log(res);
  //     })
  //     .catch((err) => {
  //       //console.log(err);
  //     });
  //   await axios
  //     .get(`/api/watch_list/${this.movie.id}`)
  //     .then((res) => {
  //       //console.log(res);
  //     })
  //     .catch((err) => {
  //       //console.log(err);
  //     });
  // },
  methods: {
    addToWatchList(watchedState) {
      //console.log("adding to watch list");
      let addedMovie = {
        title: this.movie.title ? this.movie.title : this.movie.name,
        id: this.movie.id,
        overview: this.movie.overview,
        poster_path: this.movie.poster_path,
        release_date: this.movie.release_date
          ? this.movie.release_date
          : this.movie.first_air_date,
        vote_average: this.movie.vote_average,
        vote_count: this.movie.vote_count,
        type: this.movie.title ? "movie" : "tv",
      };
      axios
        .post(`/api/watch_list/${this.movie.id}`, {
          movie: addedMovie,
          watched: watchedState,
        })
        .then((res) => {
          //console.log(res);
          this.$emit("fetch");
        })
        .catch((err) => {
          //console.log(err);
        });
    },
    removeFromWatchList() {
      //console.log("removing from watch list");
      axios
        .post(`/api/watch_list/delete/${this.movie.id}`)
        .then((res) => {
          //console.log(res);
          this.$emit("fetch");
        })
        .catch((err) => {
          //console.log(err);
        });
    },
    addToFavorites() {
      //console.log("adding to favs");
      let addedMovie = {
        title: this.movie.title ? this.movie.title : this.movie.name,
        id: this.movie.id,
        overview: this.movie.overview,
        poster_path: this.movie.poster_path,
        release_date: this.movie.release_date
          ? this.movie.release_date
          : this.movie.first_air_date,
        vote_average: this.movie.vote_average,
        vote_count: this.movie.vote_count,
        type: this.movie.title ? "movie" : "tv",
      };
      axios
        .post(`/api/favorites/${this.movie.id}`, {
          movie: addedMovie,
        })
        .then((res) => {
          //console.log(res);
          this.$emit("fetch");
        })
        .catch((err) => {
          //console.log(err);
        });
    },
    removeFromFavorites() {
      //console.log("removing from favs");
      axios
        .post(`/api/favorites/delete/${this.movie.id}`)
        .then((res) => {
          //console.log(res);
          this.$emit("fetch");
        })
        .catch((err) => {
          //console.log(err);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.card {
  background-color: var(--bg-secondary);

  .fav-icon {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
    i.fa-bookmark {
      font-size: 50px;
      position: relative;
      top: -15px;
      i.fa-star,
      i.fa-star-o {
        position: absolute;
        top: 5px;
        font-size: 30px;
        color: var(--golden);
        opacity: 1;
        fill-opacity: 1 !important;
        z-index: 9999;
        left: 0;
        right: 0;
        transform: translate(11%, 0);
      }
    }
  }
  // .far.fa-star::before{
  //   content: "\f005";
  // }
  // .fas.fa-star::before{
  //   content: "\f005";
  // }
  .fa-clock {
    color: var(--golden);
  }
  .btn-transparent {
    font-size: 25px;
    margin-top: -8px;

    i {
      color: var(--golden);
    }
  }
}
</style>
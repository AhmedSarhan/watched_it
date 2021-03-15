<template>
  <div class="card">
    <div class="fav-icon">
      <i class="far fa-bookmark">
        <i class="fas fa-star"></i>
      </i>
    </div>
    <img
      class="card-img-top"
      :src="`https://www.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}`"
      alt=""
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
      <div class="d-flex justify-content-around align-center my-2">
        <div>
          <button class="btn btn-outline-golden">
            <i class="far fa-plus"></i>
            WatchList
          </button>
        </div>
        <div>
          <button class="btn btn-outline-golden">
            <i class="far fa-plus"></i>
            Watched It
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["movie"],
  mounted() {
    // get all the user watchlist, favorites, start comparing and set the different ui variables accordingly
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
      i.fa-star {
        position: absolute;
        top: 0;
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
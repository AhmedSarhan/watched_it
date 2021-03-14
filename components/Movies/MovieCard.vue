<template>
  <div class="card">
    <img
      class="card-img-top"
      :src="`https://www.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}`"
      alt=""
    />
    <div class="card-body">
      <h4 class="card-title">{{ movie.name ? movie.name : movie.title }}</h4>
      <p class="card-text">
        {{ movie.first_air_date ? movie.first_air_date : movie.release_date }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["movie"],
};
</script>
<style lang="scss" scoped>
.card {
  background-color: var(--bg-secondary);
}
</style>
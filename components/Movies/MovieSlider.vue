<template>
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
    <div v-for="movie in movies" :key="movie.id" class="app-slider">
      <movie-card :movie="movie" />
    </div>
  </VueSlickCarousel>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
export default {
  props: ["movies"],
  components: { VueSlickCarousel },
};
</script>

<style lang="scss" scoped>
.app-slider {
  width: 90% !important;
  margin: auto;
  display: flex !important;
}
</style>
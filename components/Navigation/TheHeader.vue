<template>
  <div>
    <b-navbar
      toggleable="lg"
      :type="$colorMode.preference === 'light' ? 'dark' : 'light'"
      :variant="$colorMode.preference === 'light' ? 'dark' : 'light'"
    >
      <div class="container">
        <b-navbar-brand style="cursor: pointer">
          <nuxt-link to="/" tag="h5">
            <img
              src="https://img.icons8.com/pastel-glyph/64/000000/film-reel--v1.png"
            />
            <span>WatchIT</span>
          </nuxt-link>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item-dropdown no-caret>
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <span>
                  <i class="fas fa-film"></i>
                  Movie</span
                >
              </template>
              <nuxt-link tag="b-dropdown-item" to="/movie/popular">
                Most Popular
              </nuxt-link>
              <nuxt-link tag="b-dropdown-item" to="/movie/playing">
                In Theatre now
              </nuxt-link>
              <nuxt-link tag="b-dropdown-item" to="/movie/upcoming">
                Cooming Soon
              </nuxt-link>
              <nuxt-link tag="b-dropdown-item" to="/movie/top-rated">
                Top Rated
              </nuxt-link>
            </b-nav-item-dropdown>
            <b-nav-item-dropdown no-caret>
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <span> <i class="fas fa-tv"></i> Tv Series </span>
              </template>
              <nuxt-link tag="b-dropdown-item" to="/shows/popular">
                Most Popular
              </nuxt-link>
              <nuxt-link tag="b-dropdown-item" to="/shows/airing-now">
                On TV
              </nuxt-link>
              <nuxt-link tag="b-dropdown-item" to="/shows/today">
                Airing Today
              </nuxt-link>
              <nuxt-link tag="b-dropdown-item" to="/shows/top-rated">
                Top Rated
              </nuxt-link>
            </b-nav-item-dropdown>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="w-100">
            <b-nav-form class="mx-auto">
              <b-form-input
                size="sm"
                class="mr-sm-2"
                placeholder="Search"
                v-model="searchQuery"
                required
              ></b-form-input>
              <b-button
                size="sm"
                @click="searchHandler"
                class="my-2 my-sm-0"
                type="submit"
                >Search</b-button
              >
            </b-nav-form>
            <b-nav-item-dropdown class="ml-auto" no-caret dropleft>
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <i class="fas fa-user-circle"></i>
                <span>User</span>
              </template>
              <!-- <nuxt-link tag="b-dropdown-item" to="/profile">
                Profile
              </nuxt-link> -->
              <nuxt-link tag="b-dropdown-item" to="/watch-list">
                <i class="fas fa-bookmark"></i>
                watchList
              </nuxt-link>
              <nuxt-link tag="b-dropdown-item" to="/watched">
                <i class="fa fa-calendar-check-o"></i>
                Watched
              </nuxt-link>
              <nuxt-link tag="b-dropdown-item" to="/favorites">
                <i class="fas fa-star"></i>
                Favorites
              </nuxt-link>
              <b-dropdown-item @click="signOutHandler"
                >Sign Out</b-dropdown-item
              >
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      searchQuery: null,
    };
  },
  methods: {
    async signOutHandler() {
      await this.$auth.logout();
      this.$router.push("/auth");
    },
    ...mapActions(["searchMovies"]),
    searchHandler(event) {
      event.preventDefault();
      this.searchMovies(this.searchQuery);
      this.$router.push({
        path: "/search",
        query: { search: this.searchQuery },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: 991px) {
  .ml-auto {
    margin-left: 0 !important;
  }
}
</style>
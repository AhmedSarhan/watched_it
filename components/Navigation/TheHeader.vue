<template>
  <div>
    <b-navbar
      toggleable="lg"
      :type="$colorMode.preference === 'light' ? 'dark' : 'light'"
      :variant="$colorMode.preference === 'light' ? 'dark' : 'light'"
    >
      <div class="container">
        <b-navbar-brand>
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
                <em>Movie</em>
              </template>
              <b-dropdown-item>
                <nuxt-link tag="p" to="/movie/popular">
                  Most Popular
                </nuxt-link>
              </b-dropdown-item>
              <b-dropdown-item>
                <nuxt-link tag="p" to="/movie/popular"> Latest </nuxt-link>
              </b-dropdown-item>
              <b-dropdown-item>
                <nuxt-link tag="p" to="/movie/playing">
                  In Theatre now
                </nuxt-link>
              </b-dropdown-item>
              <b-dropdown-item>
                <nuxt-link tag="p" to="/movie/upcoming">
                  Cooming Soon
                </nuxt-link>
              </b-dropdown-item>
              <b-dropdown-item>
                <nuxt-link tag="p" to="/movie/top-rated"> Top Rated </nuxt-link>
              </b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item-dropdown no-caret>
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <em>Tv Series</em>
              </template>
              <b-dropdown-item>
                <nuxt-link tag="p" to="/shows/popular">
                  Most Popular
                </nuxt-link>
              </b-dropdown-item>
              <b-dropdown-item>
                <nuxt-link tag="p" to="/shows/popular"> Latest </nuxt-link>
              </b-dropdown-item>
              <b-dropdown-item>
                <nuxt-link tag="p" to="/shows/airing-now"> On TV </nuxt-link>
              </b-dropdown-item>
              <b-dropdown-item>
                <nuxt-link tag="p" to="/shows/today"> Airing Today </nuxt-link>
              </b-dropdown-item>
              <b-dropdown-item>
                <nuxt-link tag="p" to="/shows/top-rated"> Top Rated </nuxt-link>
              </b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="w-100">
            <b-nav-form class="mx-auto">
              <b-form-input
                size="sm"
                class="mr-sm-2"
                placeholder="Search"
              ></b-form-input>
              <b-button size="sm" class="my-2 my-sm-0" type="submit"
                >Search</b-button
              >
            </b-nav-form>
            <b-nav-item-dropdown class="ml-auto" no-caret dropleft>
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <em>User</em>
              </template>
              <b-dropdown-item>
                <nuxt-link tag="p" to="/profile"> Profile </nuxt-link>
              </b-dropdown-item>
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
export default {
  methods: {
    async signOutHandler() {
      await this.$auth.logout();
      this.$router.push("/auth");
    },
  },
};
</script>

<style>
</style>
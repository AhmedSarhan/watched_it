import axios from 'axios';

export const state = () => ({
  searchMovies: [],
});

export const actions = {
  async searchMovies({ commit }, query) {
    await axios
      .get(
        `https://api.themoviedb.org/3/search/multi?api_key=4948bcc35bedbb8a8ddfb8156c05e6e4&page=1&include_adult=false&query=${query}`
      )
      .then((res) => {
        //console.log(res.data);
        let searchMovies = [...res.data.results];
        commit('SEARCH', searchMovies);
      })
      .catch((err) => {
        //console.log(err);
      });
  },
};
export const mutations = {
  SEARCH(state, movies) {
    state.searchMovies = [...movies];
  },
};

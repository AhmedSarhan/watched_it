import Vue from 'vue';

import Login from '../components/Auth/Login.vue';
import Register from '../components/Auth/Register.vue';
import TheHeader from '../components/Navigation/TheHeader.vue';
import ThemeSwitch from '../components/Navigation/ThemeSwitch.vue';
import MovieList from '../components/Movies/MovieList.vue';
import MovieCard from '../components/Movies/MovieCard.vue';

Vue.component('Login', Login);
Vue.component('Register', Register);
Vue.component('TheHeader', TheHeader);
Vue.component('ThemeSwitch', ThemeSwitch);
Vue.component('MovieList', MovieList);
Vue.component('MovieCard', MovieCard);

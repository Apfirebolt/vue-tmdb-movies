<template>
  <div class="container">
    <div
      class="hero-section text-center text-white d-flex flex-column justify-content-center align-items-center mb-4"
    >
      <h1 class="bg-primary bg-opacity-50 px-3 py-2 rounded w-100">
        TMDB Movie App
      </h1>
    </div>

    <div>
      <p>
        This is a simple news app built with Vue 3 and Bootstrap. It fetches
        news from the News API and displays them in a card format. You can
        select the country and category of news you want to see.
      </p>
    </div>

    <Loader v-if="isLoading" />

    <div v-if="movie" class="card text-secondary mb-4">
      <div class="card-body">
        <h5 class="card-title">{{ movie.title }}</h5>
        <p class="card-text">{{ movie.overview }}</p>
        <p class="card-text">
          <small class="text-muted"
            >Release Date: {{ movie.release_date || "N/A" }}</small
          >
        </p>
        <p class="card-text">
          <small class="text-muted"
            >Runtime: {{ movie.runtime || "N/A" }} minutes</small
          >
        </p>
        <a
          v-if="movie.homepage"
          :href="movie.homepage"
          target="_blank"
          class="btn btn-primary"
          >Visit Homepage</a
        >
      </div>
    </div>

    <div v-if="show" class="latest-shows">
      <div class="card-body text-white">
        <h5 class="card-title">{{ show.name }}</h5>
        <p class="card-text">{{ show.overview }}</p>
        <p class="card-text">
          <small class="text-muted"
            >First Air Date: {{ show.first_air_date || "N/A" }}</small
          >
        </p>
        <p class="card-text">
          <small class="text-muted"
            >Number of Seasons: {{ show.number_of_seasons || "N/A" }}</small
          >
        </p>
        <img
          v-if="show.poster_path"
          :src="'https://image.tmdb.org/t/p/w500' + show.poster_path"
          alt="Show Poster"
          class="card-img-top mb-3"
        />
        <a
          v-if="show.homepage"
          :href="show.homepage"
          target="_blank"
          class="btn btn-primary"
          >Visit Homepage</a
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faSearch,
  faArrowCircleLeft,
  faArrowAltCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { useMovieStore } from "../stores/movie";
import { useShowStore } from "../stores/show";
import Loader from "../components/Loader.vue";

const movieStore = useMovieStore();
const showStore = useShowStore();
library.add(faSearch, faArrowCircleLeft, faArrowAltCircleRight);

const isLoading = computed(() => movieStore.isLoading);
const movie = computed(() => movieStore.movie);
const show = computed(() => showStore.show);

onMounted(() => {
  movieStore.getLatestMovies();
  showStore.getLatestShows();
});
</script>

<style scoped>
.card-img-top {
  height: 300px;
  object-fit: cover;
}
</style>

<template>
  <div class="container my-4">
    <h1 class="text-center mb-4">About Us</h1>

    <div>
      <p>
        This is a simple news app built with Vue 3 and Bootstrap. It fetches
        news from the News API and displays them in a card format. You can
        select the country and category of news you want to see.
      </p>
    </div>

    <Loader v-if="isLoading" />

    <div v-if="movie" class="card mb-4">
      <div class="card-body">
      <h5 class="card-title">{{ movie.title }}</h5>
      <p class="card-text">{{ movie.overview }}</p>
      <p class="card-text">
        <small class="text-muted">Release Date: {{ movie.release_date || 'N/A' }}</small>
      </p>
      <p class="card-text">
        <small class="text-muted">Runtime: {{ movie.runtime || 'N/A' }} minutes</small>
      </p>
      <a v-if="movie.homepage" :href="movie.homepage" target="_blank" class="btn btn-primary">Visit Homepage</a>
      </div>
    </div>

  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faSearch, faArrowCircleLeft, faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { useMovieStore } from "../stores/movie";
import Loader from "../components/Loader.vue";

const movieStore = useMovieStore();
const searchQuery = ref("");
library.add(faSearch, faArrowCircleLeft, faArrowAltCircleRight);
const currentPage = ref(1);
const goToNextPage = () => {
  currentPage.value++;
  if (searchQuery.value) {
    movieStore.getMovieAction(searchQuery.value, currentPage.value);
  } else {
    movieStore.getLatestMovies(currentPage.value);
  }
};

const isLoading = computed(() => movieStore.isLoading);
const movie = computed(() => movieStore.movie);

onMounted(() => {
  movieStore.getLatestMovies();
});

</script>

<style scoped>
.card-img-top {
  height: 300px;
  object-fit: cover;
}
</style>

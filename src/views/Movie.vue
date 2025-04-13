<template>
  <div class="container">
    <div
      class="hero-section text-center text-white d-flex flex-column justify-content-center align-items-center"
    >
      <h1 class="bg-primary px-3 py-2 rounded w-100">Movies</h1>
      <p class="px-3 py-2 rounded">
        This page lists all popular movies from the API
      </p>
    </div>

    <Loader v-if="isLoading" />

    <div v-if="movieData && movieData.results" class="row">
      <div
        class="col-md-4 mb-4"
        v-for="movie in movieData.results"
        :key="movie.id"
      >
        <div class="card text-primary">
          <img
            :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
            class="card-img-top"
            :alt="movie.title"
          />
          <div class="card-body">
            <h5 class="card-title">{{ movie.title }}</h5>
            <p class="card-text">{{ movie.overview }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="d-flex justify-content-between my-3">
      <button
        class="btn btn-primary"
        @click="goToPreviousPage"
        :disabled="currentPage === 1"
      >
        Previous
      </button>
      <button class="btn btn-primary" @click="goToNextPage">Next</button>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useMovieStore } from "../stores/movie";
import Loader from "../components/Loader.vue";

const movieStore = useMovieStore();
const currentPage = ref(1);

const isLoading = computed(() => movieStore.isLoading);
const movieData = computed(() => movieStore.getMovieData);

const goToNextPage = () => {
  currentPage.value++;
  movieStore.getPopularMovies(currentPage.value);
};

const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    movieStore.getPopularMovies(currentPage.value);
  }
};

onMounted(() => {
  movieStore.getPopularMovies();
});
</script>

<style scoped>
.card-img-top {
  height: 300px;
  object-fit: cover;
}
</style>

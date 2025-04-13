<template>
  <div class="container">
    <!-- Hero Section -->
    <div
      class="hero-section text-center text-white d-flex flex-column justify-content-center align-items-center"
    >
      <h1 class="bg-primary px-3 py-2 rounded w-100">Discover Movies</h1>
      <p class="px-3 py-2 rounded">
        Explore the most popular movies fetched from the TMDB API.
      </p>
    </div>

    <!-- Loader -->
    <Loader v-if="isLoading" />

    <!-- Movies Grid -->
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

    <!-- Pagination -->
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
.hero-section {
  background-color: #343a40;
  padding: 2rem 0;
  margin-bottom: 2rem;
}

.card-img-top {
  height: 300px;
  object-fit: cover;
}

.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}

.card-title {
  font-size: 1.25rem;
  font-weight: bold;
}

.card-text {
  font-size: 0.9rem;
  color: #555;
}
</style>

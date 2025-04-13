<template>
  <div class="container">
    <!-- Hero Section -->
    <div class="text-center text-white d-flex flex-column justify-content-center align-items-center">
      <h1 class="bg-primary px-3 py-2 rounded w-100">Discover Movies</h1>
      <p class="px-3 py-2 rounded">
        Explore the most popular movies fetched from the TMDB API.
      </p>
    </div>

    <!-- Loader -->
    <Loader v-if="isLoading" />

    <div class="row">
      <div v-for="movie in movies.results" :key="movie.id" class="col-md-4 mb-4">
        <div class="card text-secondary h-100">
          <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title" class="card-img-top" />
          <div class="card-body">
            <h5 class="card-title">
              {{
                movie.original_title ? movie.original_title : "Not Available"
              }}
            </h5>
            <p class="card-text">{{ movie.overview }}</p>
          </div>
          <div class="card-footer">
            <small class="text-muted">
              Rating: {{ movie.vote_average }} / 10
            </small>
          </div>
          <router-link :to="{ name: 'MovieDetails', params: { id: movie.id } }" class="btn btn-danger text-white">View
            Details</router-link>
          <div class="card-footer text-muted">
            Release Date: {{ movie.release_date }}
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="d-flex justify-content-center my-3">
      <button class="btn btn-primary" @click="goToPreviousPage" :disabled="currentPage === 1">
        Previous
      </button>
      <button class="btn mx-2 btn-primary" @click="goToNextPage">Next</button>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useDiscoverStore } from "../stores/discover";
import Loader from "../components/Loader.vue";

const discoverStore = useDiscoverStore();
const currentPage = ref(1);

const isLoading = computed(() => discoverStore.isLoading);
const movies = computed(() => discoverStore.getMovies);

const goToNextPage = () => {
  currentPage.value++;
  discoverStore.discoverMovies({
    year: 2023,
    page: currentPage.value,
  });
};

const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    discoverStore.discoverMovies({
      year: 2023,
      page: currentPage.value,
    });
  }
};

onMounted(() => {
  discoverStore.discoverMovies({
    year: 2023,
    page: currentPage.value,
  });
});
</script>

<style scoped>

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

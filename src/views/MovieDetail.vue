<template>
  <div class="container">
    <div
      class="hero-section text-center text-white d-flex flex-column justify-content-center align-items-center mb-4"
    >
      <h1 class="bg-primary px-3 py-2 rounded w-100">
        {{ movie?.original_title || "Movie Details" }}
      </h1>
      <p class="px-3 py-2 rounded">
        {{
          movie?.overview ||
          "This page displays detailed information about the movie."
        }}
      </p>
      <p>
        Countries : 
        <span v-for="(country, index) in movie?.production_countries" :key="index">
          {{ country.name }}<span v-if="index < movie?.production_countries.length - 1">, </span>
        </span>
      </p>
    </div>

    <Loader v-if="isLoading" />

    <div v-if="movie" class="row">
      <div class="col-md-4">
        <div class="card bg-info text-white">
          <div v-if="movie.poster_path">
            <img
              :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
              class="card-img-top img-fluid"
              :alt="movie.original_title"
            />
          </div>
          <div
            v-else
            class="card-img-top d-flex justify-content-center align-items-center bg-secondary text-white"
            style="height: 300px"
          >
            Image not available
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <div class="card bg-light text-dark p-4">
          <h2>{{ movie.original_title }}</h2>
          <p>
            <strong>Overview:</strong>
            {{ movie.overview || "Overview not available." }}
          </p>
          <p>
            <strong>Release Date:</strong> {{ movie.release_date || "N/A" }}
          </p>
          <p><strong>Runtime:</strong> {{ movie.runtime || "N/A" }} minutes</p>
          <p><strong>Popularity:</strong> {{ movie.popularity }}</p>
          <p><strong>Vote Average:</strong> {{ movie.vote_average }}</p>
          <p><strong>Vote Count:</strong> {{ movie.vote_count }}</p>
          <p>
            <strong>Genres: </strong>
            <span v-for="(genre, index) in movie.genres" :key="index">
              {{ genre.name
              }}<span v-if="index < movie.genres.length - 1">, </span>
            </span>
          </p>
          <p>
            <strong>Production Companies: </strong>
            <span
              v-for="(company, index) in movie.production_companies"
              :key="index"
            >
              {{ company.name
              }}<span v-if="index < movie.production_companies.length - 1"
                >,
              </span>
            </span>
          </p>
          <a
            v-if="movie.homepage"
            :href="movie.homepage"
            target="_blank"
            class="btn btn-primary text-white"
            >Visit Homepage</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useMovieStore } from "../stores/movie";
import Loader from "../components/Loader.vue";

const route = useRoute();
const movieStore = useMovieStore();
const isLoading = computed(() => movieStore.isLoading);
const movie = computed(() => movieStore.getMovie);

onMounted(() => {
  const movieId = route.params.id; // Get the movie ID from the route
  movieStore.getMovieDetails(movieId);
});
</script>

<style scoped>
.img-fluid {
  max-height: 500px;
  object-fit: cover;
}
</style>

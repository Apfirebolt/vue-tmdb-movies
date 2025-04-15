<template>
  <div class="container">
    <div
      class="hero-section text-center text-white d-flex flex-column justify-content-center align-items-center mb-4"
    >
      <h1 class="bg-primary px-3 py-2 rounded w-100">
        {{ collection?.name || "Collection Details" }}
      </h1>
      <p class="px-3 py-2 rounded">
        {{
          collection?.overview ||
          "This page displays detailed information about the collection."
        }}
      </p>
    </div>

    <Loader v-if="isLoading" />

    <div v-if="collection" class="row">
      <div class="col-md-4">
        <div class="card bg-info text-white">
          <div v-if="collection.poster_path">
            <img
              :src="'https://image.tmdb.org/t/p/w500' + collection.poster_path"
              class="card-img-top img-fluid"
              :alt="collection.name"
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
          <h2>{{ collection.name }}</h2>
          <p>
            <strong>Overview:</strong>
            {{ collection.overview || "Overview not available." }}
          </p>
        </div>
      </div>

      <div class="col-12 mt-4">
        <h3>Movies in Collection</h3>
        <div class="row">
          <div
            v-for="(movie, index) in collection.parts"
            :key="index"
            class="col-md-4 mb-3"
          >
            <div class="card bg-light text-dark">
              <img
                v-if="movie.poster_path"
                :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
                class="card-img-top img-fluid"
                :alt="movie.title"
              />
              <div
                v-else
                class="card-img-top d-flex justify-content-center align-items-center bg-secondary text-white"
                style="height: 300px"
              >
                Image not available
              </div>
              <div class="card-body">
                <h5 class="card-title">{{ movie.title }}</h5>
                <p class="card-text">
                  <strong>Release Date:</strong>
                  {{ movie.release_date || "N/A" }}
                </p>
                <router-link
                  :to="{ name: 'MovieDetails', params: { id: movie.id } }"
                  class="btn btn-primary text-white"
                >
                  View Details
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import httpClient from "../plugins/interceptor";
import { useRoute } from "vue-router";
import Loader from "../components/Loader.vue";

const route = useRoute();
const collection = ref({});
const isLoading = ref(true);

const getCollectionDetails = (collectionId) => {
  httpClient
    .get(`/collection/${collectionId}`, {
      params: {
        api_key: import.meta.env.VITE_APP_KEY,
      },
    })
    .then((response) => {
      collection.value = response.data;
      isLoading.value = false;
    })
    .catch((error) => {
      console.error("Error fetching collection details:", error);
      isLoading.value = false;
    });
};

onMounted(() => {
  const collectionId = route.params.id; // Get the collection ID from the route
  getCollectionDetails(collectionId);
});
</script>

<style scoped>
.img-fluid {
  max-height: 500px;
  object-fit: cover;
}
</style>

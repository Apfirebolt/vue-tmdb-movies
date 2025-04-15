<template>
  <div class="container">
    <div
      class="hero-section text-center text-white d-flex flex-column justify-content-center align-items-center mb-4"
    >
      <h1 class="bg-primary px-3 py-2 rounded w-100">Movie Collection</h1>
      <p class="px-3 py-2 rounded">
        Explore our collection of popular movies from the API
      </p>
      <div class="search-bar w-100 d-flex align-items-center">
        <div class="input-group">
          <span class="input-group-text">
            <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
          </span>
          <input
            type="text"
            class="form-control"
            placeholder="Search for a collection..."
            v-model="searchQuery"
          />
        </div>
        <button
          class="btn btn-primary d-flex align-items-center"
          @click="searchCollection"
        >
          <FontAwesomeIcon
            icon="fa-solid fa-magnifying-glass"
            class="me-2 text-black"
          />
          Search
        </button>
      </div>
    </div>

    <Loader v-if="isLoading" />

    <div v-if="collectionData.length === 0" class="text-center">
      <h2>No collections found</h2>
      <p>Please try a different search term.</p>
    </div>

    <!-- Loop through collections -->
    <div v-if="collectionData && collectionData.results" class="row">
      <div
        class="col-md-4 mb-4"
        v-for="collection in collectionData.results"
        :key="collection.id"
      >
        <div class="card text-secondary">
          <img
            v-if="collection.poster_path"
            :src="
              collection.poster_path
                ? `https://image.tmdb.org/t/p/w500${collection.poster_path}`
                : 'https://via.placeholder.com/300x450'
            "
            class="card-img-top"
            :alt="collection.name"
          />
          <p class="text-center my-3" v-else>Image not available</p>
          <div class="card-body">
            <h5 class="card-title">{{ collection.name }}</h5>
            <p class="card-text">
              {{ collection.overview || "No description available." }}
            </p>
            <button
              class="btn text-white btn-primary"
              @click="viewCollectionDetails(collection.id)"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!isLoading && collectionData.length === 0" class="text-center">
        <h2>No Results Available</h2>
        <p>We couldn't find any collections matching your search.</p>
    </div>

    <div class="d-flex justify-content-center my-3">
      <button
        class="btn btn-primary"
        @click="goToPreviousPage"
        :disabled="currentPage === 1"
      >
        Previous
      </button>
      <button class="btn mx-2 btn-primary" @click="goToNextPage">Next</button>
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
import { useCollectionStore } from "../stores/collection";
import Loader from "../components/Loader.vue";

const collectionStore = useCollectionStore();
const currentPage = ref(1);
const searchQuery = ref("");
library.add(faSearch, faArrowCircleLeft, faArrowAltCircleRight);

const isLoading = computed(() => collectionStore.isLoading);
const collectionData = computed(() => collectionStore.getCollections);

const goToNextPage = () => {
  currentPage.value++;
  fetchCollection();
};

const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchCollection();
  }
};

const searchCollection = () => {
  currentPage.value = 1;
  fetchCollection();
};

const fetchCollection = () => {
  if (searchQuery.value) {
    collectionStore.searchCollection(searchQuery.value, currentPage.value);
  } else {
    collectionStore.searchCollection(currentPage.value);
  }
};
</script>

<style scoped>
.card-img-top {
  height: 300px;
  object-fit: cover;
}
</style>

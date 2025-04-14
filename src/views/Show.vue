<template>
    <div class="container">
      <div
        class="hero-section text-center text-white d-flex flex-column justify-content-center align-items-center mb-4"
      >
        <h1 class="bg-primary px-3 py-2 rounded w-100">Shows</h1>
        <p class="px-3 py-2 rounded">
          This page lists all popular shows from the API
        </p>
        <div class="search-bar w-100 d-flex align-items-center">
          <div class="input-group">
            <span class="input-group-text">
              <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
            </span>
            <input type="text" class="form-control" placeholder="Search for a show..." v-model="searchQuery" />
          </div>
          <button class="btn btn-primary d-flex align-items-center" @click="searchShow">
            <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" class="me-2 text-black" />
            Search
          </button>
        </div>
      </div>
  
      <Loader v-if="isLoading" />
  
      <div v-if="showData && showData.results" class="row">
        <div
          class="col-md-4 mb-4"
          v-for="show in showData.results"
          :key="show.id"
        >
          <div class="card text-primary">
            <img
              :src="'https://image.tmdb.org/t/p/w500' + show.poster_path"
              class="card-img-top"
              :alt="show.name"
            />
            <div class="card-body">
              <h5 class="card-title">{{ show.name }}</h5>
              <p class="card-text">{{ show.overview }}</p>
              <router-link :to="{ name: 'ShowDetails', params: { id: show.id } }" class="btn text-white btn-primary">
                View Details
              </router-link>
            </div>
          </div>
        </div>
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
  import { faSearch, faArrowCircleLeft, faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
  import { library } from "@fortawesome/fontawesome-svg-core";
  import { useShowStore } from "../stores/show";
  import Loader from "../components/Loader.vue";
  
  const showStore = useShowStore();
  const currentPage = ref(1);
  const searchQuery = ref("");
  library.add(faSearch, faArrowCircleLeft, faArrowAltCircleRight);
  
  const isLoading = computed(() => showStore.isLoading);
  const showData = computed(() => showStore.getShowData);
  
  const goToNextPage = () => {
    currentPage.value++;
    if (searchQuery.value) {
      showStore.searchShow(searchQuery.value, currentPage.value);
    } else {
      showStore.getPopularShows(currentPage.value);
    }
  };
  
  const goToPreviousPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
      if (searchQuery.value) {
        showStore.searchShow(searchQuery.value, currentPage.value);
      } else {
        showStore.getPopularShows(currentPage.value);
      }
    }
  };
  
  const searchShow = () => {
    if (searchQuery.value) {
      showStore.searchShow(searchQuery.value, currentPage.value);
    } else {
      showStore.getPopularShows(currentPage.value);
    }
  };
  
  onMounted(() => {
    showStore.getPopularShows();
  });
  </script>
  
  <style scoped>
  .card-img-top {
    height: 300px;
    object-fit: cover;
  }
  </style>

<template>
  <div class="container">
    <div class="hero-section text-center text-white d-flex flex-column justify-content-center align-items-center mb-4">
      <h1 class="bg-primary bg-opacity-50 px-3 py-2 rounded w-100">Person</h1>
      <p class="px-3 py-2 rounded">
        This page displays details about a person from the API
      </p>
      <div class="search-bar w-100 d-flex align-items-center">
        <div class="input-group">
          <span class="input-group-text">
            <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
          </span>
          <input type="text" class="form-control" placeholder="Search for a person..." v-model="searchQuery" />
        </div>
        <button class="btn btn-primary d-flex align-items-center" @click="searchPerson">
          <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" class="me-2 text-black" />
          Search
        </button>
      </div>
    </div>

    <Loader v-if="isLoading" />

    <div v-if="personData && personData.results" class="row">
      <div class="col-md-4 mb-4" v-for="person in personData.results" :key="person.id">
        <div class="card bg-info text-white">
          <div v-if="person.profile_path">
            <img :src="'https://image.tmdb.org/t/p/w500' + person.profile_path" class="card-img-top" :alt="person.name" />
          </div>
          <div v-else class="card-img-top d-flex justify-content-center align-items-center bg-secondary text-white"
            style="height: 300px">
            Image not available
          </div>
          <div class="card-body">
            <h5 class="card-title">{{ person.name }}</h5>
            <p class="card-text">{{ person.known_for_department }}</p>
          </div>
        </div>
      </div>
    </div>

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
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faSearch, faArrowCircleLeft, faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { usePersonStore } from "../stores/person";
import Loader from "../components/Loader.vue";

const personStore = usePersonStore();
const searchQuery = ref("");
library.add(faSearch, faArrowCircleLeft, faArrowAltCircleRight);

const isLoading = computed(() => personStore.isLoading);
const personData = computed(() => personStore.getPersonData);

const currentPage = ref(1);
const goToNextPage = () => {
  currentPage.value++;
  if (searchQuery.value) {
    personStore.getPersonAction(searchQuery.value, currentPage.value);
  } else {
    personStore.getPopularPersons(currentPage.value);
  }
};

const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    if (searchQuery.value) {
      personStore.getPersonAction(searchQuery.value, currentPage.value);
    } else {
      personStore.getPopularPersons(currentPage.value);
    }
  }
};

const searchPerson = () => {
  if (searchQuery.value) {
    personStore.getPersonAction(searchQuery.value);
  } else {
    personStore.getPopularPersons();
  }
};

onMounted(() => {
  // Replace with the actual person ID you want to fetch
  personStore.getPopularPersons();
});
</script>

<style scoped>
.card-img-top {
  height: 300px;
  object-fit: cover;
}
</style>

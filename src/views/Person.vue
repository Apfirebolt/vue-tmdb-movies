<template>
  <div class="container">
    <div
      class="hero-section text-center text-white d-flex flex-column justify-content-center align-items-center mb-4"
    >
      <h1 class="bg-dark bg-opacity-50 px-3 py-2 rounded w-100">Person</h1>
      <p class="bg-dark bg-opacity-50 px-3 py-2 rounded">
        This page displays details about a person from the API
      </p>
    </div>

    <Loader v-if="isLoading" />

    <div v-if="personData && personData.results" class="row">
      <div
        class="col-md-4 mb-4"
        v-for="person in personData.results"
        :key="person.id"
      >
        <div class="card">
          <img
            :src="'https://image.tmdb.org/t/p/w500' + person.profile_path"
            class="card-img-top"
            :alt="person.name"
          />
          <div class="card-body">
            <h5 class="card-title">{{ person.name }}</h5>
            <p class="card-text">{{ person.known_for_department }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="d-flex justify-content-between my-3">
        <button class="btn btn-primary" @click="goToPreviousPage" :disabled="currentPage === 1">Previous</button>
        <button class="btn btn-primary" @click="goToNextPage">Next</button>
    </div>
    
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { usePersonStore } from "../stores/person";
import Loader from "../components/Loader.vue";

const personStore = usePersonStore();
const isLoading = computed(() => personStore.isLoading);
const personData = computed(() => personStore.getPersonData);

const currentPage = ref(1);
const goToNextPage = () => {
  currentPage.value++;
  personStore.getPopularPersons(currentPage.value);
};

const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    personStore.getPopularPersons(currentPage.value);
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

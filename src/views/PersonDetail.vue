<template>
  <div class="container">
    <div
      class="hero-section text-center text-white d-flex flex-column justify-content-center align-items-center mb-4"
    >
      <h1 class="bg-primary bg-opacity-50 px-3 py-2 rounded w-100">
        {{ personData?.name || "Person Details" }}
      </h1>
      <p class="px-3 py-2 rounded">
        This page displays detailed information about the person.
      </p>
    </div>

    <Loader v-if="isLoading" />

    <div v-if="personData" class="row">
      <div class="col-md-4">
        <div class="card bg-info text-white">
          <div v-if="personData.profile_path">
            <img
              :src="'https://image.tmdb.org/t/p/w500' + personData.profile_path"
              class="card-img-top"
              :alt="personData.name"
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
          <h2>{{ personData.name }}</h2>
          <p>
            <strong>Known For:</strong> {{ personData.known_for_department }}
          </p>
          <p>
            <strong>Biography:</strong>
            {{ personData.biography || "Biography not available." }}
          </p>
          <p><strong>Birthday:</strong> {{ personData.birthday || "N/A" }}</p>
          <p>
            <strong>Place of Birth:</strong>
            {{ personData.place_of_birth || "N/A" }}
          </p>
          <p><strong>Popularity:</strong> {{ personData.popularity }}</p>
        </div>
      </div>
    </div>
    <div v-if="personImages.profiles && personImages.profiles.length" class="row mt-4">
      <h3 class="text-center mb-3">Images</h3>
      <div
      v-for="(image, index) in personImages.profiles"
      :key="index"
      class="col-md-3 mb-3"
      >
      <img
        :src="'https://image.tmdb.org/t/p/w500' + image.file_path"
        class="img-fluid rounded"
        :alt="'Image ' + (index + 1)"
      />
      </div>
    </div>
    <div v-else class="text-center mt-4">
      <p>No images available for this person.</p>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import httpClient from "../plugins/interceptor";
import { useRoute } from "vue-router";
import { usePersonStore } from "../stores/person";
import Loader from "../components/Loader.vue";

const personStore = usePersonStore();
const route = useRoute();
const personImages = ref({});
const personId = route.params.id; // Assuming the route parameter is named 'id'

const isLoading = computed(() => personStore.isLoading);
const personData = computed(() => personStore.getPerson);

const getPersonImages = (personId) => {
  httpClient
    .get(`/person/${personId}/images`, {
      params: {
        api_key: import.meta.env.VITE_APP_KEY,
      },
    })
    .then((response) => {
      personImages.value = response.data;
    })
    .catch((error) => {
      console.error("Error fetching person images:", error);
    });
};

onMounted(() => {
  if (personId) {
    personStore.getPersonDetails(personId);
    getPersonImages(personId);
  }
});
</script>

<style scoped>
.card-img-top {
  height: 300px;
  object-fit: cover;
}
</style>

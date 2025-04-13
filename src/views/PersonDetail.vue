<template>
  <div class="container">
    <div
      class="hero-section text-center text-white d-flex flex-column justify-content-center align-items-center mb-4"
    >
      <h1 class="bg-primary bg-opacity-50 px-3 py-2 rounded w-100">
        {{ personData?.name || "Person Details" }}
      </h1>
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

    <div class="col-12 mt-4">
      <ul class="nav nav-tabs" id="movieDetailsTab" role="tablist">
        <li class="nav-item" role="presentation">
          <button
            :class="['nav-link', selectedTab === 'images' ? 'active' : '']"
            id="images-tab"
            data-bs-toggle="tab"
            data-bs-target="#images"
            type="button"
            role="tab"
            aria-controls="images"
            aria-selected="true"
            @click="selectTab('images')"
          >
            Images
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            :class="[
              'nav-link',
              selectedTab === 'tagged-images' ? 'active' : '',
            ]"
            id="tagged-images-tab"
            data-bs-toggle="tab"
            data-bs-target="#tagged-images"
            type="button"
            role="tab"
            aria-controls="tagged-images"
            aria-selected="false"
            @click="selectTab('tagged-images')"
          >
            Tagged Images
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            :class="['nav-link', selectedTab === 'credits' ? 'active' : '']"
            id="credits-tab"
            data-bs-toggle="tab"
            data-bs-target="#credits"
            type="button"
            role="tab"
            aria-controls="credits"
            aria-selected="false"
            @click="selectTab('credits')"
          >
            Movie Credits
          </button>
        </li>
      </ul>
    </div>

    <div
      v-if="
        selectedTab === 'images' &&
        personImages.profiles &&
        personImages.profiles.length >= 2
      "
      id="imageCarousel"
      class="carousel slide mt-4"
      data-bs-ride="carousel"
    >
      <div class="carousel-inner">
        <div
          v-for="(image, index) in personImages.profiles"
          :key="index"
          :class="['carousel-item', { active: index === 0 }]"
        >
          <img
            :src="'https://image.tmdb.org/t/p/w500' + image.file_path"
            class="d-block mx-auto"
            style="max-height: 500px; width: auto"
            :alt="'Image ' + (index + 1)"
          />
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#imageCarousel"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#imageCarousel"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>

    <div
      v-if="
        selectedTab === 'tagged-images' &&
        taggedImages.results &&
        taggedImages.results.length >= 2
      "
      id="taggedImageCarousel"
      class="carousel slide mt-4"
      data-bs-ride="carousel"
    >
      <div class="carousel-inner">
        <div
          v-for="(image, index) in taggedImages.results"
          :key="index"
          :class="['carousel-item', { active: index === 0 }]"
        >
          <img
            :src="'https://image.tmdb.org/t/p/w500' + image.file_path"
            class="d-block mx-auto"
            style="max-height: 500px; width: 650px"
            :alt="'Tagged Image ' + (index + 1)"
          />
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#taggedImageCarousel"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#taggedImageCarousel"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>

    <div
      v-if="
        selectedTab === 'images' &&
        personImages.profiles &&
        personImages.profiles.length
      "
      class="row mt-4"
    >
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

    <div
      v-if="
        selectedTab === 'tagged-images' &&
        taggedImages.results &&
        taggedImages.results.length
      "
      class="row mt-4"
    >
      <h3 class="text-center mb-3">Tagged Images</h3>
      <div
        v-for="(image, index) in taggedImages.results"
        :key="index"
        class="col-md-4 mb-3"
      >
        <img
          :src="'https://image.tmdb.org/t/p/w500' + image.file_path"
          class="img-fluid rounded"
          :alt="'Tagged Image ' + (index + 1)"
        />
      </div>
    </div>

    <div
      v-if="selectedTab === 'credits' && credits.cast && credits.cast.length"
      class="row mt-4"
    >
      <h3 class="text-center mb-3">Movie Credits</h3>
      <div
        v-for="(movie, index) in credits.cast"
        :key="index"
        class="col-md-4 mb-3"
      >
        <div class="card text-secondary">
          <img
            v-if="movie.poster_path"
            :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
            class="card-img-top"
            :alt="movie.title"
          />
          <div
            v-else
            class="card-img-top bg-secondary text-white d-flex justify-content-center align-items-center"
            style="height: 300px"
          >
            Poster not available
          </div>
          <div class="card-body">
            <h5
              class="card-title bg-secondary text-white text-center py-2 px-3"
            >
              {{
                movie.original_title ? movie.original_title : "Not available"
              }}
            </h5>
            <p class="card-text">
              <strong>Media Type:</strong> {{ movie.media_type || "N/A" }}
            </p>
            <p class="card-text">
              <strong>Character:</strong> {{ movie.character || "N/A" }}
            </p>
            <p class="card-text">
              <strong>Release Date:</strong> {{ movie.release_date || "N/A" }}
            </p>
            <RouterLink
              :to="{ name: 'MovieDetails', params: { id: movie.id } }"
              class="btn btn-primary text-white w-100"
            >
              View Details
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center mt-4">
      <p>No movie credits available for this person.</p>
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
const selectedTab = ref("images");
const personImages = ref({});
const taggedImages = ref({});
const credits = ref({});
const personId = route.params.id; // Assuming the route parameter is named 'id'

const isLoading = computed(() => personStore.isLoading);
const personData = computed(() => personStore.getPerson);

const selectTab = (tab) => {
  selectedTab.value = tab;
};

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

const getTaggedImages = (personId) => {
  httpClient
    .get(`/person/${personId}/tagged_images`, {
      params: {
        api_key: import.meta.env.VITE_APP_KEY,
      },
    })
    .then((response) => {
      taggedImages.value = response.data;
    })
    .catch((error) => {
      console.error("Error fetching tagged images:", error);
    });
};

const getPersonCredits = (personId) => {
  httpClient
    .get(`/person/${personId}/combined_credits`, {
      params: {
        api_key: import.meta.env.VITE_APP_KEY,
      },
    })
    .then((response) => {
      credits.value = response.data;
    })
    .catch((error) => {
      console.error("Error fetching person credits:", error);
    });
};

onMounted(() => {
  if (personId) {
    personStore.getPersonDetails(personId);
    getPersonImages(personId);
    getTaggedImages(personId);
    getPersonCredits(personId);
  }
});
</script>

<style scoped>
.card-img-top {
  height: 300px;
  object-fit: cover;
}
</style>

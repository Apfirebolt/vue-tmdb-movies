<template>
  <div class="container">
    <div
      class="hero-section text-center text-white d-flex flex-column justify-content-center align-items-center mb-4"
    >
      <h1 class="bg-primary px-3 py-2 rounded w-100">
        {{ show?.name || "Show Details" }}
      </h1>
      <p class="px-3 py-2 rounded">
        {{
          show?.overview ||
          "This page displays detailed information about the show."
        }}
      </p>
      <p>
        Countries :
        <span v-for="(country, index) in show?.origin_country" :key="index">
          {{ country
          }}<span v-if="index < show?.origin_country.length - 1">, </span>
        </span>
      </p>
    </div>

    <Loader v-if="isLoading" />

    <div v-if="show" class="row">
      <div class="col-md-4">
        <div class="card bg-info text-white">
          <div v-if="show.poster_path">
            <img
              :src="'https://image.tmdb.org/t/p/w500' + show.poster_path"
              class="card-img-top img-fluid"
              :alt="show.name"
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
          <h2>{{ show.name }}</h2>
          <p>
            <strong>Overview:</strong>
            {{ show.overview || "Overview not available." }}
          </p>
          <p>
            <strong>First Air Date:</strong> {{ show.first_air_date || "N/A" }}
          </p>
          <p>
            <strong>Number of Seasons:</strong>
            {{ show.number_of_seasons || "N/A" }}
          </p>
          <p>
            <strong>Number of Episodes:</strong>
            {{ show.number_of_episodes || "N/A" }}
          </p>
          <p><strong>Popularity:</strong> {{ show.popularity }}</p>
          <p><strong>Vote Average:</strong> {{ show.vote_average }}</p>
          <p><strong>Vote Count:</strong> {{ show.vote_count }}</p>
          <p>
            <strong>Genres: </strong>
            <span v-for="(genre, index) in show.genres" :key="index">
              {{ genre.name
              }}<span v-if="index < show.genres.length - 1">, </span>
            </span>
          </p>
          <p>
            <strong>Production Companies: </strong>
            <span
              v-for="(company, index) in show.production_companies"
              :key="index"
            >
              {{ company.name
              }}<span v-if="index < show.production_companies.length - 1"
                >,
              </span>
            </span>
          </p>
          <a
            v-if="show.homepage"
            :href="show.homepage"
            target="_blank"
            class="btn btn-primary text-white"
            >Visit Homepage</a
          >
        </div>
      </div>

      <!-- Tabs and content for images, videos, reviews, etc. -->
      <div class="col-12 mt-4">
        <ul class="nav nav-tabs" id="showDetailsTab" role="tablist">
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
              :class="['nav-link', selectedTab === 'videos' ? 'active' : '']"
              id="videos-tab"
              data-bs-toggle="tab"
              data-bs-target="#videos"
              type="button"
              role="tab"
              aria-controls="videos"
              aria-selected="false"
              @click="selectTab('videos')"
            >
              Videos
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              :class="['nav-link', selectedTab === 'reviews' ? 'active' : '']"
              id="reviews-tab"
              data-bs-toggle="tab"
              data-bs-target="#reviews"
              type="button"
              role="tab"
              aria-controls="reviews"
              aria-selected="false"
              @click="selectTab('reviews')"
            >
              Reviews
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              :class="[
                'nav-link',
                selectedTab === 'recommendations' ? 'active' : '',
              ]"
              id="recommendations-tab"
              data-bs-toggle="tab"
              data-bs-target="#recommendations"
              type="button"
              role="tab"
              aria-controls="recommendations"
              aria-selected="false"
              @click="selectTab('recommendations')"
            >
              Recommendations
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              :class="['nav-link', selectedTab === 'providers' ? 'active' : '']"
              id="providers-tab"
              data-bs-toggle="tab"
              data-bs-target="#providers"
              type="button"
              role="tab"
              aria-controls="providers"
              aria-selected="false"
              @click="selectTab('providers')"
            >
              Providers
            </button>
          </li>
        </ul>
      </div>

      <!-- Add similar sections for images, videos, reviews, etc. -->
      <div v-if="selectedTab === 'images'" class="mt-4">
        <h3>Backdrop Images</h3>
        <div v-if="showImages.backdrops && showImages.backdrops.length">
          <div
            id="imageCarousel"
            class="carousel slide"
            data-bs-ride="carousel"
          >
            <div class="carousel-inner">
              <div
                v-for="(image, index) in showImages.backdrops"
                :key="index"
                :class="['carousel-item', { active: index === 0 }]"
              >
                <img
                  :src="'https://image.tmdb.org/t/p/w500' + image.file_path"
                  class="d-block w-100"
                  :alt="'Backdrop ' + (index + 1)"
                />
              </div>
            </div>
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#imageCarousel"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#imageCarousel"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <p v-else>No images available for this show.</p>
      </div>
      <div v-if="selectedTab === 'images'" class="mt-4">
        <h3>Images</h3>
        <div v-if="showImages.backdrops && showImages.backdrops.length">
          <div class="row">
            <div
              v-for="(image, index) in showImages.backdrops"
              :key="index"
              class="col-md-4 mb-3"
            >
              <img
                :src="'https://image.tmdb.org/t/p/w500' + image.file_path"
                class="img-fluid rounded"
                :alt="'Backdrop ' + (index + 1)"
              />
            </div>
          </div>
        </div>
        <p v-else>No images available for this show.</p>
      </div>

      <!--Videos-->
      <div v-if="selectedTab === 'videos'" class="mt-4">
        <h3>Videos</h3>
        <div v-if="showVideos.results && showVideos.results.length">
          <div class="row">
            <div
              v-for="(video, index) in showVideos.results"
              :key="index"
              class="col-md-4 mb-3"
            >
              <iframe
                :src="'https://www.youtube.com/embed/' + video.key"
                width="100%"
                height="200"
                frameborder="0"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
        <p v-else>No videos available for this show.</p>
      </div>

      <!--Reviews-->
      <div v-if="selectedTab === 'reviews'" class="mt-4">
        <h3>Reviews</h3>
        <div v-if="showReviews.results && showReviews.results.length">
          <div class="row">
            <div
              v-for="(review, index) in showReviews.results"
              :key="index"
              class="col-md-4 mb-3"
            >
              <div class="card bg-light text-dark p-3">
                <h5>{{ review.author }}</h5>
                <p>{{ review.content }}</p>
                <p>
                  <strong>Created at:</strong>
                  {{ formatDate(review.created_at) }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <p v-else>No reviews available for this show.</p>
      </div>

      <!-- Similar Shows -->
      <div v-if="selectedTab === 'recommendations'" class="mt-4">
        <h3>Similar Shows</h3>
        <div v-if="similarShows.results && similarShows.results.length">
          <div class="row">
            <div
              v-for="(show, index) in similarShows.results"
              :key="index"
              class="col-md-4 mb-3"
            >
              <div class="card bg-light text-dark p-3">
                <img
                  :src="'https://image.tmdb.org/t/p/w500' + show.poster_path"
                  class="card-img-top img-fluid"
                  :alt="show.name"
                />
                <h5 class="px-2 py-3 bg-primary text-white text-center">
                  {{ show.name }}
                </h5>
                <p>{{ show.overview }}</p>
              </div>
            </div>
          </div>
        </div>
        <p v-else>No similar shows available.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import httpClient from "../plugins/interceptor";
import { useRoute } from "vue-router";
import { useShowStore } from "../stores/show";
import Loader from "../components/Loader.vue";

const route = useRoute();
const showStore = useShowStore();
const selectedTab = ref("images");
const showImages = ref({});
const showVideos = ref({});
const showReviews = ref({});
const showProviders = ref({});
const similarShows = ref({});
const isLoading = computed(() => showStore.isLoading);
const show = computed(() => showStore.getShow);

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

const selectTab = (tab) => {
  selectedTab.value = tab;
};

const getShowImages = (showId) => {
  httpClient
    .get(`/tv/${showId}/images`, {
      params: {
        api_key: import.meta.env.VITE_APP_KEY,
      },
    })
    .then((response) => {
      showImages.value = response.data;
    })
    .catch((error) => {
      console.error("Error fetching show images:", error);
    });
};

const getShowVideos = (showId) => {
  httpClient
    .get(`/tv/${showId}/videos`, {
      params: {
        api_key: import.meta.env.VITE_APP_KEY,
      },
    })
    .then((response) => {
      showVideos.value = response.data;
    })
    .catch((error) => {
      console.error("Error fetching show videos:", error);
    });
};

const getShowReviews = (showId) => {
  httpClient
    .get(`/tv/${showId}/reviews`, {
      params: {
        api_key: import.meta.env.VITE_APP_KEY,
      },
    })
    .then((response) => {
      showReviews.value = response.data;
    })
    .catch((error) => {
      console.error("Error fetching show reviews:", error);
    });
};

const getShowProviders = (showId) => {
  httpClient
    .get(`/tv/${showId}/watch/providers`, {
      params: {
        api_key: import.meta.env.VITE_APP_KEY,
      },
    })
    .then((response) => {
      showProviders.value = response.data;
    })
    .catch((error) => {
      console.error("Error fetching show providers:", error);
    });
};

const getSimilarShows = (showId) => {
  httpClient
    .get(`/tv/${showId}/similar`, {
      params: {
        api_key: import.meta.env.VITE_APP_KEY,
      },
    })
    .then((response) => {
      similarShows.value = response.data;
    })
    .catch((error) => {
      console.error("Error fetching similar shows:", error);
    });
};

onMounted(() => {
  const showId = route.params.id; // Get the show ID from the route
  showStore.getShowDetails(showId);
  getShowImages(showId);
  getShowVideos(showId);
  getShowReviews(showId);
  getShowProviders(showId);
  getSimilarShows(showId);
});
</script>

<style scoped>
.img-fluid {
  max-height: 500px;
  object-fit: cover;
}
</style>

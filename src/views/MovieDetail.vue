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
        <span
          v-for="(country, index) in movie?.production_countries"
          :key="index"
        >
          {{ country.name
          }}<span v-if="index < movie?.production_countries.length - 1"
            >,
          </span>
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

       <!-- Slideshow for trailers -->
       <div
        v-if="
          selectedTab === 'videos' &&
          movieVideos.results &&
          movieVideos.results.length >= 2
        "
        id="videoCarousel"
        class="carousel slide mt-4"
        data-bs-ride="carousel"
      >
        <div class="carousel-inner">
          <div
            v-for="(video, index) in movieVideos.results"
            :key="index"
            :class="['carousel-item', { active: index === 0 }]"
          >
            <iframe
              v-if="video.site === 'YouTube'"
              :src="'https://www.youtube.com/embed/' + video.key"
              class="d-block mx-auto"
              style="max-height: 600px; width: 750px"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#videoCarousel"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#videoCarousel"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>

      <div v-if="selectedTab === 'videos'" class="col-12 mt-4">
        <h3>Videos</h3>
        <div class="row">
          <div
            v-for="(video, index) in movieVideos.results"
            :key="index"
            class="col-md-4 mb-3"
          >
            <div class="card bg-dark text-white">
              <iframe
                v-if="video.site === 'YouTube'"
                :src="'https://www.youtube.com/embed/' + video.key"
                class="card-img-top"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
              <div
                v-else
                class="card-img-top d-flex justify-content-center align-items-center bg-secondary text-white"
                style="height: 200px"
              >
                Video not available
              </div>
              <div class="card-body">
                <h5 class="card-title">{{ video.name }}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--Slideshow for posters-->
      <div
        v-if="
          selectedTab === 'images' &&
          movieImages.posters &&
          movieImages.posters.length >= 2
        "
        id="imageCarousel"
        class="carousel slide mt-4"
        data-bs-ride="carousel"
      >
        <div class="carousel-inner">
          <div
            v-for="(image, index) in movieImages.posters"
            :key="index"
            :class="['carousel-item', { active: index === 0 }]"
          >
            <img
              :src="'https://image.tmdb.org/t/p/w500' + image.file_path"
              class="d-block mx-auto"
              style="max-height: 500px; width: 650px"
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

      <div v-if="selectedTab === 'images'" class="col-12 mt-4">
        <h3>Posters</h3>
        <div class="row">
          <div
            v-for="(poster, index) in movieImages.posters"
            :key="index"
            class="col-md-3 mb-3"
          >
            <div v-if="poster.file_path" class="card bg-info text-white">
              <img
                :src="'https://image.tmdb.org/t/p/w500' + poster.file_path"
                class="card-img-top img-fluid"
                :alt="poster.file_path"
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
      </div>

      <div v-if="selectedTab === 'reviews'" class="col-12 mt-4">
        <h3>Reviews</h3>
        <div v-if="movieReviews.results && movieReviews.results.length > 0">
          <div
            v-for="(review, index) in movieReviews.results"
            :key="index"
            class="card mb-3 text-secondary"
          >
            <div class="card-body">
              <h5 class="card-title">{{ review.author }}</h5>
              <p class="card-text">{{ review.content }}</p>
              <p class="text-muted">
                <small>Written on: {{ formatDate(review.created_at) }}</small>
              </p>
            </div>
          </div>
        </div>
        <div v-else>
          <p>No reviews available for this movie.</p>
        </div>
      </div>

      <div v-if="selectedTab === 'providers'" class="col-12 mt-4">
        <h3>Watch Providers</h3>
        <div v-if="movieProviders.results && movieProviders.results.length > 0">
          <div
            v-for="(provider, index) in movieProviders.results"
            :key="index"
            class="card mb-3 text-secondary"
          >
            <div class="card-body">
              <h5 class="card-title">{{ provider.provider_name }}</h5>
              <p class="card-text">
                {{ provider.provider_name }} is available on
                {{ provider.provider_name }}
              </p>
            </div>
          </div>
        </div>
        <div v-else>
          <p>No watch providers available for this movie.</p>
        </div>
      </div>

      <div v-if="selectedTab === 'recommendations'" class="col-12 mt-4">
        <h3>Similar Movies</h3>
        <div v-if="similarMovies.results && similarMovies.results.length > 0">
          <div class="row">
            <div
              v-for="(similarMovie, index) in similarMovies.results"
              :key="index"
              class="col-md-4 mb-3"
            >
              <div class="card bg-light text-dark">
                <img
                  v-if="similarMovie.poster_path"
                  :src="
                    'https://image.tmdb.org/t/p/w500' + similarMovie.poster_path
                  "
                  class="card-img-top img-fluid"
                  :alt="similarMovie.title"
                />
                <div
                  v-else
                  class="card-img-top d-flex justify-content-center align-items-center bg-secondary text-white"
                  style="height: 300px"
                >
                  Image not available
                </div>
                <div class="card-body">
                  <h5 class="card-title">{{ similarMovie.title }}</h5>
                  <p class="card-text">
                    <strong>Release Date:</strong>
                    {{ similarMovie.release_date || "N/A" }}
                  </p>
                  <router-link
                    :to="{
                      name: 'MovieDetails',
                      params: { id: similarMovie.id },
                    }"
                    class="btn btn-primary text-white"
                  >
                    View Details
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <p>No similar movies available.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import httpClient from "../plugins/interceptor";
import { useRoute } from "vue-router";
import { useMovieStore } from "../stores/movie";
import Loader from "../components/Loader.vue";

const route = useRoute();
const movieStore = useMovieStore();
const selectedTab = ref("images");
const movieImages = ref({});
const movieVideos = ref({});
const movieReviews = ref({});
const movieProviders = ref({});
const similarMovies = ref({});
const isLoading = computed(() => movieStore.isLoading);
const movie = computed(() => movieStore.getMovie);

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

const selectTab = (tab) => {
  selectedTab.value = tab;
};

const getMovieImages = (movieId) => {
  httpClient
    .get(`/movie/${movieId}/images`, {
      params: {
        api_key: import.meta.env.VITE_APP_KEY,
      },
    })
    .then((response) => {
      movieImages.value = response.data;
    })
    .catch((error) => {
      console.error("Error fetching movie images:", error);
    });
};

const getMovieVideos = (movieId) => {
  httpClient
    .get(`/movie/${movieId}/videos`, {
      params: {
        api_key: import.meta.env.VITE_APP_KEY,
      },
    })
    .then((response) => {
      movieVideos.value = response.data;
    })
    .catch((error) => {
      console.error("Error fetching movie videos:", error);
    });
};

const getMovieReviews = (movieId) => {
  httpClient
    .get(`/movie/${movieId}/reviews`, {
      params: {
        api_key: import.meta.env.VITE_APP_KEY,
      },
    })
    .then((response) => {
      movieReviews.value = response.data;
    })
    .catch((error) => {
      console.error("Error fetching movie reviews:", error);
    });
};

const getMovieProviders = (movieId) => {
  httpClient
    .get(`/movie/${movieId}/watch/providers`, {
      params: {
        api_key: import.meta.env.VITE_APP_KEY,
      },
    })
    .then((response) => {
      movieProviders.value = response.data;
    })
    .catch((error) => {
      console.error("Error fetching movie providers:", error);
    });
};

const getSimilarMovies = (movieId) => {
  httpClient
    .get(`/movie/${movieId}/similar`, {
      params: {
        api_key: import.meta.env.VITE_APP_KEY,
      },
    })
    .then((response) => {
      similarMovies.value = response.data;
    })
    .catch((error) => {
      console.error("Error fetching similar movies:", error);
    });
};

onMounted(() => {
  const movieId = route.params.id; // Get the movie ID from the route
  movieStore.getMovieDetails(movieId);
  getMovieImages(movieId);
  getMovieVideos(movieId);
  getMovieReviews(movieId);
  getMovieProviders(movieId);
  getSimilarMovies(movieId);
});
</script>

<style scoped>
.img-fluid {
  max-height: 500px;
  object-fit: cover;
}
</style>

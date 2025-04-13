<template>
  <div class="container">
    <div
      class="hero-section text-center text-white d-flex flex-column justify-content-center align-items-center mb-4"
    >
      <h1 class="bg-primary bg-opacity-50 px-3 py-2 rounded w-100">
        Trending People, Movies and Shows
      </h1>
    </div>

    <div>
      <p>
        This is a simple trending app built with Vue 3 and Bootstrap. It fetches
        trending movies, shows, and people from the TMDB API and displays them
        in a card format.
      </p>
    </div>

    <Loader v-if="isLoading" />

    <div class="col-12 my-2">
      <ul class="nav nav-tabs" id="movieDetailsTab" role="tablist">
        <li class="nav-item" role="presentation">
          <button
            :class="['nav-link', selectedTab === 'movies' ? 'active' : '']"
            id="movies-tab"
            data-bs-toggle="tab"
            data-bs-target="#movies"
            type="button"
            role="tab"
            aria-controls="movies"
            aria-selected="true"
            @click="selectTab('movies')"
          >
            Movies
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            :class="[ 'nav-link', selectedTab === 'shows' ? 'active' : '' ]"
            id="shows-tab"
            data-bs-toggle="tab"
            data-bs-target="#shows"
            type="button"
            role="tab"
            aria-controls="shows"
            aria-selected="false"
            @click="selectTab('shows')"
          >
            Shows
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            :class="[ 'nav-link', selectedTab === 'people' ? 'active' : '' ]"
            id="people-tab"
            data-bs-toggle="tab"
            data-bs-target="#people"
            type="button"
            role="tab"
            aria-controls="people"
            aria-selected="false"
            @click="selectTab('people')"
          >
            People
          </button>
        </li>
      </ul>
    </div>

    <div v-if="selectedTab === 'people'" class="row">
      <div
        v-for="person in people.results"
        :key="person.id"
        class="col-md-4 mb-4"
      >
        <div class="card text-secondary h-100">
          <img
            v-if="person.profile_path"
            :src="'https://image.tmdb.org/t/p/w500' + person.profile_path"
            class="card-img-top"
            :alt="person.name"
          />
          <div
            v-else
            class="card-img-top d-flex justify-content-center align-items-center bg-secondary text-white"
            style="height: 300px"
          >
            Image not available
          </div>
          <div class="card-body">
            <h5 class="card-title">{{ person.name }}</h5>
            <p class="card-text">{{ person.known_for_department }}</p>
            <router-link
              :to="{ name: 'PersonDetails', params: { id: person.id } }"
              class="btn text-white btn-primary"
              >View Details</router-link
            >
          </div>
        </div>
      </div>
    </div>

    <!--Trending Movies-->
    <div v-if="selectedTab === 'movies'" class="row">
      <div
        v-for="movie in movies.results"
        :key="movie.id"
        class="col-md-4 mb-4"
      >
        <div class="card text-secondary h-100">
          <img
            v-if="movie.poster_path"
            :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
            class="card-img-top"
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
            <h5 class="card-title">{{ movie.original_title }}</h5>
            <p class="card-text">{{ movie.overview }}</p>
          </div>
          <router-link
            :to="{ name: 'MovieDetails', params: { id: movie.id } }"
            class="btn btn-danger text-white"
            >View Details</router-link
          >
          <div class="card-footer text-muted">
            Release Date: {{ movie.release_date }}
          </div>
        </div>
      </div>
    </div>

    <!--Trending Shows-->
    <div v-if="selectedTab === 'shows'" class="row">
      <div
        v-for="show in shows.results"
        :key="show.id"
        class="col-md-4 mb-4"
      >
        <div class="card text-secondary h-100">
          <img
            v-if="show.poster_path"
            :src="'https://image.tmdb.org/t/p/w500' + show.poster_path"
            class="card-img-top"
            :alt="show.name"
          />
          <div
            v-else
            class="card-img-top d-flex justify-content-center align-items-center bg-secondary text-white"
            style="height: 300px"
          >
            Image not available
          </div>
          <div class="card-body">
            <h5 class="card-title">{{ show.name }}</h5>
            <p class="card-text">{{ show.overview }}</p>
          </div>
          <div class="card-footer text-muted">
            First Air Date: {{ show.first_air_date }}
          </div>
        </div>
      </div>
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
import { useTrendingStore } from "../stores/trending";
import Loader from "../components/Loader.vue";

const trendingStore = useTrendingStore();
library.add(faSearch, faArrowCircleLeft, faArrowAltCircleRight);
const selectedTab = ref("movies");

const isLoading = computed(() => trendingStore.isLoading);
const people = computed(() => trendingStore.getPeople);
const movies = computed(() => trendingStore.getMovies);
const shows = computed(() => trendingStore.getTvShows);

const selectTab = (tab) => {
  selectedTab.value = tab;
};


onMounted(() => {
  trendingStore.getTrendingMovies();
  trendingStore.getTrendingShows();
  trendingStore.getTrendingPeople();
});
</script>

<style scoped>
.card-img-top {
  height: 300px;
  object-fit: cover;
}
</style>

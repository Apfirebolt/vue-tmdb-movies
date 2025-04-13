import { defineStore } from "pinia";
import { ref } from "vue";
import httpClient from "../plugins/interceptor";

export const useDiscoverStore = defineStore("discover", {
  state: () => ({
    movies: ref({}),
    shows: ref({}),
    loading: ref(false),
  }),

  getters: {
    getMovies() {
      return this.movies;
    },
    getShows() {
      return this.shows;
    },
    isLoading() {
      return this.loading;
    },
    getDiscoverData() {
      return this.discoverData;
    },
  },

  actions: {
    async discoverMovies(payload) { 
      try {
        this.loading = true;
        const response = await httpClient.get(
          `discover/movie?year=${payload.year}&page=${payload.page}&api_key=${import.meta.env.VITE_APP_KEY}`
        );
        this.movies = response.data;
      } catch (error) {
        console.log(error);
        return error;
      } finally {
        this.loading = false;
      }
    },

    async discoverShows(payload) {
      try {
        this.loading = true;
        const response = await httpClient.get(
          `discover/tv?year=${payload.year}&page=${payload.page}&api_key=${import.meta.env.VITE_APP_KEY}`
        );
        this.shows = response.data;
      } catch (error) {
        console.log(error);
        return error;
      } finally {
        this.loading = false;
      }
    },

    resetUrlData() {
      this.discover = [];
      this.movies = {};
      this.shows = {};
    },
  },
});

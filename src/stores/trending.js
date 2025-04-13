import { defineStore } from "pinia";
import { ref } from "vue";
import httpClient from "../plugins/interceptor";

export const useTrendingStore = defineStore("trend", {
  state: () => ({
    movies: ref({}),
    people: ref({}),
    tvShows: ref({}),
    loading: ref(false),
  }),

  getters: {
    isLoading() {
      return this.loading;
    },
    getMovies() {
      return this.movies;
    },
    getPeople() {
      return this.people;
    },
    getTvShows() {
      return this.tvShows;
    },
  },

  actions: {
    async getTrendingMovies() {
      try {
        this.loading = true;
        const response = await httpClient.get(
          `trending/movie/week?api_key=${import.meta.env.VITE_APP_KEY}`
        );
        this.movies = response.data;
      } catch (error) {
        console.log(error);
        return error;
      } finally {
        this.loading = false;
      }
    },

    async getTrendingPeople() {
      try {
        this.loading = true;
        const response = await httpClient.get(
          `trending/person/week?api_key=${import.meta.env.VITE_APP_KEY}`
        );
        this.people = response.data;
      } catch (error) {
        console.log(error);
        return error;
      } finally {
        this.loading = false;
      }
    },

    async getTrendingShows() {
      try {
        this.loading = true;
        const response = await httpClient.get(
          `trending/tv/week?api_key=${import.meta.env.VITE_APP_KEY}`
        );
        this.tvShows = response.data;
      } catch (error) {
        console.log(error);
        return error;
      } finally {
        this.loading = false;
      }
    },

    resetTrendingData() {
      this.movies = [];
      this.people = [];
      this.tvShows = [];
    },
  },
});

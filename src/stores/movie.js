import { defineStore } from "pinia";
import { ref } from "vue";
import httpClient from "../plugins/interceptor";

export const useMovieStore = defineStore("movie", {
  state: () => ({
    movie: ref([]),
    loading: ref(false),
  }),

  getters: {
    getMovie() {
      return this.movie;
    },
    isLoading() {
      return this.loading;
    },
  },

  actions: {

    async getMovieAction(payload) {
      try {
        this.loading = true;
        const response = await httpClient.get(`movies?query=${payload.query}&apiKey=${import.meta.env.VITE_APP_KEY}`);
        this.movie = response.data.results;
      } catch (error) {
        console.log(error);
        return error;
      } finally {
        this.loading = false;
      }
    },

    async getLatestMovies () {
      try {
        this.loading = true;
        const response = await httpClient.get(`movie/latest?api_key=${import.meta.env.VITE_APP_KEY}`);
        console.log(response.data);
        this.movie = response.data;
      } catch (error) {
        console.log(error);
        return error;
      } finally {
        this.loading = false;
      }
    },

    resetUrlData() {
      this.movie = [];
    },
  },
});

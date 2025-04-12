import { defineStore } from "pinia";
import { ref } from "vue";
import httpClient from "../plugins/interceptor";

export const useMovieStore = defineStore("movie", {
  state: () => ({
    movie: ref([]),
    movieData: ref({}),
    loading: ref(false),
  }),

  getters: {
    getMovie() {
      return this.movie;
    },
    isLoading() {
      return this.loading;
    },
    getMovieData() {
      return this.movieData;
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

    async getPopularMovies (page = 1) {
      try {
        this.loading = true;
        const response = await httpClient.get(`movie/popular?api_key=${import.meta.env.VITE_APP_KEY}&page=${page}`);
        this.movieData = response.data;
      } catch (error) {
        console.log(error);
        return error;
      } finally {
        this.loading = false;
      }
    },

    async getTopRatedMovies (page = 1) {
      try {
        this.loading = true;
        const response = await httpClient.get(`movie/top_rated?api_key=${import.meta.env.VITE_APP_KEY}&page=${page}`);
        this.movieData = response.data;
      } catch (error) {
        console.log(error);
        return error;
      } finally {
        this.loading = false;
      }
    },

    async getUpcomingMovies (page = 1) {
      try {
        this.loading = true;
        const response = await httpClient.get(`movie/upcoming?api_key=${import.meta.env.VITE_APP_KEY}&page=${page}`);
        this.movieData = response.data;
      } catch (error) {
        console.log(error);
        return error;
      } finally {
        this.loading = false;
      }
    },

    async getMovieDetails (id) {
      try {
        this.loading = true;
        const response = await httpClient.get(`movie/${id}?api_key=${import.meta.env.VITE_APP_KEY}`);
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

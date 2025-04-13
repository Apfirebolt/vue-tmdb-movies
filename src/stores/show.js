import { defineStore } from "pinia";
import { ref } from "vue";
import httpClient from "../plugins/interceptor";

export const useShowStore = defineStore("show", {
  state: () => ({
    show: ref({}),
    shows: ref([]),
    showData: ref({}),
    loading: ref(false),
  }),

  getters: {
    getShow() {
      return this.show;
    },
    getShows() {
      return this.shows;
    },
    isLoading() {
      return this.loading;
    },
    getShowData() {
      return this.showData;
    },
  },

  actions: {
    async getShowAction(payload) {
      try {
        this.loading = true;
        const response = await httpClient.get(
          `shows?query=${payload.query}&apiKey=${import.meta.env.VITE_APP_KEY}`
        );
        this.show = response.data.results;
      } catch (error) {
        console.log(error);
        return error;
      } finally {
        this.loading = false;
      }
    },

    async getLatestShows() {
      try {
        this.loading = true;
        const response = await httpClient.get(
          `tv/latest?api_key=${import.meta.env.VITE_APP_KEY}`
        );
        this.show = response.data;
      } catch (error) {
        console.log(error);
        return error;
      } finally {
        this.loading = false;
      }
    },

    async getOnTheAirShows(page = 1) {
      try {
        this.loading = true;
        const response = await httpClient.get(
          `tv/on_the_air?api_key=${import.meta.env.VITE_APP_KEY}&page=${page}`
        );
        this.showData = response.data;
      } catch (error) {
        console.log(error);
        return error;
      } finally {
        this.loading = false;
      }
    },

    async getAiringTodayShows(page = 1) {
      try {
        this.loading = true;
        const response = await httpClient.get(
          `tv/airing_today?api_key=${import.meta.env.VITE_APP_KEY}&page=${page}`
        );
        this.showData = response.data;
      } catch (error) {
        console.log(error);
        return error;
      } finally {
        this.loading = false;
      }
    },

    async getPopularShows(page = 1) {
      try {
        this.loading = true;
        const response = await httpClient.get(
          `tv/popular?api_key=${import.meta.env.VITE_APP_KEY}&page=${page}`
        );
        this.showData = response.data;
      } catch (error) {
        console.log(error);
        return error;
      } finally {
        this.loading = false;
      }
    },

    async getTopRatedShows(page = 1) {
      try {
        this.loading = true;
        const response = await httpClient.get(
          `tv/top_rated?api_key=${import.meta.env.VITE_APP_KEY}&page=${page}`
        );
        this.showData = response.data;
      } catch (error) {
        console.log(error);
        return error;
      } finally {
        this.loading = false;
      }
    },

    async getShowDetails(id) {
      try {
        this.loading = true;
        const response = await httpClient.get(
          `tv/${id}?api_key=${import.meta.env.VITE_APP_KEY}`
        );
        this.show = response.data;
      } catch (error) {
        console.log(error);
        return error;
      } finally {
        this.loading = false;
      }
    },

    async searchShow(search = "", page = 1) {
      try {
        this.loading = true;
        const response = await httpClient.get(
          `search/tv?api_key=${
            import.meta.env.VITE_APP_KEY
          }&query=${search}&page=${page}`
        );
        this.showData = response.data;
      } catch (error) {
        console.log(error);
        return error;
      } finally {
        this.loading = false;
      }
    },

    resetUrlData() {
      this.show = [];
    },
  },
});

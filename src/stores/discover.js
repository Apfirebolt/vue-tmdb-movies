import { defineStore } from "pinia";
import { ref } from "vue";
import httpClient from "../plugins/interceptor";

export const useDiscoverStore = defineStore("discover", {
  state: () => ({
    discover: ref([]),
    discoverData: ref({}),
    loading: ref(false),
  }),

  getters: {
    getDiscover() {
      return this.discover;
    },
    isLoading() {
      return this.loading;
    },
    getDiscoverData() {
      return this.discoverData;
    },
  },

  actions: {
    async getDiscoverAction(payload) {
      try {
        this.loading = true;
        const response = await httpClient.get(
          `discover?query=${payload.query}&apiKey=${
            import.meta.env.VITE_APP_KEY
          }`
        );
        this.discover = response.data.results;
      } catch (error) {
        console.log(error);
        return error;
      } finally {
        this.loading = false;
      }
    },

    async getLatestDiscover() {
      try {
        this.loading = true;
        const response = await httpClient.get(
          `discover/latest?api_key=${import.meta.env.VITE_APP_KEY}`
        );
        console.log(response.data);
        this.discover = response.data;
      } catch (error) {
        console.log(error);
        return error;
      } finally {
        this.loading = false;
      }
    },

    async getPopularDiscover(page = 1) {
      try {
        this.loading = true;
        const response = await httpClient.get(
          `discover/popular?api_key=${
            import.meta.env.VITE_APP_KEY
          }&page=${page}`
        );
        this.discoverData = response.data;
      } catch (error) {
        console.log(error);
        return error;
      } finally {
        this.loading = false;
      }
    },

    async getTopRatedDiscover(page = 1) {
      try {
        this.loading = true;
        const response = await httpClient.get(
          `discover/top_rated?api_key=${
            import.meta.env.VITE_APP_KEY
          }&page=${page}`
        );
        this.discoverData = response.data;
      } catch (error) {
        console.log(error);
        return error;
      } finally {
        this.loading = false;
      }
    },

    async getUpcomingDiscover(page = 1) {
      try {
        this.loading = true;
        const response = await httpClient.get(
          `discover/upcoming?api_key=${
            import.meta.env.VITE_APP_KEY
          }&page=${page}`
        );
        this.discoverData = response.data;
      } catch (error) {
        console.log(error);
        return error;
      } finally {
        this.loading = false;
      }
    },

    async getDiscoverDetails(id) {
      try {
        this.loading = true;
        const response = await httpClient.get(
          `discover/${id}?api_key=${import.meta.env.VITE_APP_KEY}`
        );
        this.discover = response.data;
      } catch (error) {
        console.log(error);
        return error;
      } finally {
        this.loading = false;
      }
    },

    resetUrlData() {
      this.discover = [];
    },
  },
});

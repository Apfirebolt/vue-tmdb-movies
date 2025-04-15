import { defineStore } from "pinia";
import { ref } from "vue";
import httpClient from "../plugins/interceptor";

export const useCollectionStore = defineStore("collection", {
  state: () => ({
    collections: ref({}),
    collectionDetails: ref({}),
    loading: ref(false),
  }),

  getters: {
    getCollections() {
      return this.collections;
    },
    isLoading() {
      return this.loading;
    },
    getCollection() {
      return this.collectionDetails;
    },
  },

  actions: {
    async searchCollection(search = "", page = 1) {
      try {
        this.loading = true;
        const response = await httpClient.get(
          `search/collection?api_key=${
            import.meta.env.VITE_APP_KEY
          }&query=${search}&page=${page}`
        );
        this.collections = response.data;
      } catch (error) {
        console.log(error);
        return error;
      } finally {
        this.loading = false;
      }
    },

    async getCollectionDetails(id) {
      try {
        this.loading = true;
        const response = await httpClient.get(
          `collection/${id}?api_key=${import.meta.env.VITE_APP_KEY}`
        );
        this.collectionDetails = response.data;
      } catch (error) {
        console.log(error);
        return error;
      } finally {
        this.loading = false;
      }
    },

    resetCollectionData() {
      this.collections = {};
      this.collectionDetails = {};
    },
  },
});

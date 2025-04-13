import { defineStore } from "pinia";
import { ref } from "vue";
import httpClient from "../plugins/interceptor";

export const usePersonStore = defineStore("person", {
  state: () => ({
    person: ref([]),
    personData: ref({}),
    loading: ref(false),
  }),

  getters: {
    getPerson() {
      return this.person;
    },
    isLoading() {
      return this.loading;
    },
    getPersonData() {
      return this.personData;
    },
  },

  actions: {
    async getPersonDetails(id) {
      try {
        this.loading = true;
        const response = await httpClient.get(
          `person/${id}?api_key=${import.meta.env.VITE_APP_KEY}`
        );
        this.person = response.data;
      } catch (error) {
        console.log(error);
        return error;
      } finally {
        this.loading = false;
      }
    },

    async getPersonAction(search = "", page = 1) {
      try {
        this.loading = true;
        const response = await httpClient.get(
          `search/person?api_key=${import.meta.env.VITE_APP_KEY}&query=${search}&page=${page}`
        );
        this.personData = response.data;
      } catch (error) {
        console.log(error);
        return error;
      } finally {
        this.loading = false;
      }
    },

    async getPopularPersons(page = 1) {
      try {
        this.loading = true;
        const response = await httpClient.get(
          `person/popular?api_key=${import.meta.env.VITE_APP_KEY}&page=${page}`
        );
        this.personData = response.data;
      } catch (error) {
        console.log(error);
        return error;
      } finally {
        this.loading = false;
      }
    },

    resetPersonData() {
      this.person = []; 
      this.personData = {};
    },
  },
});

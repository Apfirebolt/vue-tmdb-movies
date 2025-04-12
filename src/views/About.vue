<template>
  <div class="container mt-4 p-3">
    <h1>About Us</h1>
    <p>
      Welcome to our News App! This application is built using Vue.js and
      Bootstrap. It provides the latest news articles from various sources.
    </p>
    <button class="btn btn-primary" @click="showModal = !showModal">Show Info</button>

    <div class="modal fade" tabindex="-1" :class="{ show: showModal }" style="display: block;" v-if="showModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Technologies Used</h5>
            <button type="button" class="btn-close" @click="showModal = false"></button>
          </div>
          <div class="modal-body">
            <p>This application is built using Vue.js, Bootstrap, and the News API.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showModal = false">Close</button>
            <button type="button" class="btn btn-primary">Apply</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const showModal = ref(false);
</script>

<style scoped>
.modal.show {
  display: block;
  background-color: rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease-in-out;
  z-index: 1050;
}
</style>

<template>
  <div class="container p-3 slide-in">
    <h1>About Us</h1>
    <p>
      Welcome to our News App! This application is built using Vue.js and
      Bootstrap. It provides the latest news articles from various sources.
    </p>
    <button class="btn btn-primary" @click="showModal = !showModal">Show Info</button>

    <div class="modal fade text-primary" tabindex="-1" :class="{ show: showModal }" style="display: block;" v-if="showModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Technologies Used</h5>
            <button type="button" class="btn-close" @click="showModal = false"></button>
          </div>
          <div class="modal-body">
            <p>This application is built using Vue.js, Bootstrap, and the TMDB API.</p>
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
import { ref, onMounted } from "vue";

const showModal = ref(false);
const containerClass = ref("");

onMounted(() => {
  containerClass.value = "slide-in";
});
</script>

<style scoped>
.container {
  opacity: 0;
  transform: translateX(100%);
  transition: all 0.5s ease-in-out;
}

.container.slide-in {
  opacity: 1;
  transform: translateX(0);
}

.modal.show {
  display: block;
  background-color: rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease-in-out;
  z-index: 1050;
}
</style>

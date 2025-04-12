<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand fw-bold" href="#">VUE MOVIES</a>
      <button
        class="navbar-toggler"
        type="button"
        @click="toggleSidebar"
        aria-controls="offcanvasMenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li v-for="item in menuItems" :key="item.path" class="nav-item">
            <router-link :to="item.path" class="nav-link">{{
              item.name
            }}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <div
    class="offcanvas offcanvas-start"
    :class="{ show: isSidebarOpen }"
    tabindex="-1"
    id="offcanvasMenu"
    style="visibility: visible; transition: transform 0.3s ease-in-out"
    :style="{
      transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
    }"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title">Vue News</h5>
      <button
        type="button"
        class="btn-close text-reset"
        @click="toggleSidebar"
      ></button>
    </div>
    <div class="offcanvas-body">
      <ul class="list-unstyled">
        <li v-for="item in menuItems" :key="item.path">
          <router-link :to="item.path" class="nav-link">{{
            item.name
          }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isSidebarOpen = ref(false);
const menuItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Movie", path: "/movie" },
  { name: "Person", path: "/person" },
];

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
</script>

<style scoped>
.offcanvas {
  background-color: #282f69;
  color: #fff;
  width: 75%;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  overflow-y: auto;
  z-index: 1050;
}

.offcanvas-header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.offcanvas-body {
  padding: 1rem;
}

.nav-link {
  color: #fff !important;
}

.navbar-brand {
  font-size: 1.5rem;
}

.offcanvas-title {
  font-weight: bold;
}
</style>

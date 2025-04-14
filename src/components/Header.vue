<template>
  <div>
    <nav class="vertical-navbar bg-primary" v-if="!isSmallScreen">
      <div class="navbar-container">
        <ul class="navbar-nav">
          <li v-for="item in menuItems" :key="item.path" class="nav-item">
            <router-link :to="item.path" class="nav-link my-1">
              <font-awesome-icon :icon="item.icon" class="nav-icon" />
              {{ item.name }}
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
    <div v-else>
      <i class="menu-icon" @click="toggleSidebar">
        <font-awesome-icon icon="fa-solid fa-bars" />
      </i>
      <nav class="mobile-sidebar bg-primary" :class="{ open: isSidebarOpen }">
        <div class="mobile-navbar-container">
          <ul class="mobile-navbar-nav">
            <li v-for="item in menuItems" :key="item.path" class="mobile-nav-item">
              <router-link :to="item.path" class="mobile-nav-link" @click="closeSidebar">
                <font-awesome-icon :icon="item.icon" class="mobile-nav-icon" />
                {{ item.name }}
              </router-link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faHome, faInfoCircle, faFilm, faUser, faBars, faSearchLocation, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

// Add icons to the library
library.add(faHome, faInfoCircle, faFilm, faUser, faBars, faSearchLocation, faChartLine);

const menuItems = [
  { name: "Home", path: "/", icon: "fa-home" },
  { name: "About", path: "/about", icon: "fa-info-circle" },
  { name: "Movie", path: "/movie", icon: "fa-film" },
  { name: "Person", path: "/person", icon: "fa-user" },
  { name: "Discover", path: "/discover", icon: "fa-search-location" },
  { name: "Show", path: "/show", icon: "fa-film" },
  { name: "Trending", path: "/trending", icon: "fa-chart-line" },
];

const isSmallScreen = ref(false);
const isSidebarOpen = ref(false);

const updateScreenSize = () => {
  isSmallScreen.value = window.innerWidth <= 768;
};

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const closeSidebar = () => {
  isSidebarOpen.value = false;
};

onMounted(() => {
  updateScreenSize();
  window.addEventListener("resize", updateScreenSize);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateScreenSize);
});
</script>

<style scoped>
/* Styles remain unchanged */
.vertical-navbar {
  position: fixed;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 10%;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1050;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}

.mobile-sidebar {
  position: fixed;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1050;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  transition: left 0.3s ease;
}

.mobile-sidebar.open {
  left: 0;
}

.navbar-container,
.mobile-navbar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.navbar-nav,
.mobile-navbar-nav {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
}

.nav-item,
.mobile-nav-item {
  text-align: center;
}

.nav-link,
.mobile-nav-link {
  color: #fff !important;
  text-decoration: none;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
  transition: color 0.3s ease;
}

.nav-link:hover,
.mobile-nav-link:hover {
  color: #00bcd4 !important;
  background: #222222;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.nav-icon,
.mobile-nav-icon {
  margin-right: 0.5rem;
  font-size: 1.2rem;
}

.menu-icon {
  position: fixed;
  top: 1rem;
  left: 1rem;
  font-size: 1.5rem;
  color: #fff;
  cursor: pointer;
  z-index: 1100;
}
</style>

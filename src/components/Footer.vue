<template>
  <footer class="footer bg-secondary text-white">
    <div class="container p-4">
      <div class="features">
        <div class="row">
          <div class="col-md-4">
            <h3>Movies</h3>
            <p>
              Discover a wide range of movies, from the latest blockbusters to
              timeless classics.
            </p>
          </div>
          <div class="col-md-4">
            <h3>People</h3>
            <p>
              Explore detailed information about your favorite actors,
              directors, and crew members.
            </p>
          </div>
          <div class="col-md-4">
            <h3>Shows</h3>
            <p>
              Stay updated with popular TV shows and binge-worthy series across
              genres.
            </p>
          </div>
        </div>
      </div>
      <p>&copy; {{ currentYear }} Vue Movies App. All rights reserved.</p>
      <div class="footer-social">
        <a href="https://twitter.com" target="_blank">
          <i><FontAwesomeIcon :icon="faTwitter" /></i>
        </a>
        <a href="https://facebook.com" target="_blank">
          <i><FontAwesomeIcon :icon="faFacebook" /></i>
        </a>
        <a href="https://youtube.com" target="_blank">
          <i><FontAwesomeIcon :icon="faYoutube" /></i>
        </a>
        <a href="https://youtube.com" target="_blank">
          <i><FontAwesomeIcon :icon="faInstagram" /></i>
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faTwitter,
  faFacebook,
  faYoutube,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const currentYear = ref(new Date().getFullYear());
</script>

<style scoped>
.footer {
  padding: 20px 0;
  text-align: center;
}

.footer-social {
  margin-top: 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

i {
  margin: 0 10px;
  font-size: 24px;
  color: white;
}
</style>

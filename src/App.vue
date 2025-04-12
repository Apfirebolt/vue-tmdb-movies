<template>
  <div>
    <HeaderComponent />
    <router-view />
    <FooterComponent />
  </div>
</template>

<script setup>
import HeaderComponent from './components/Header.vue';
import FooterComponent from './components/Footer.vue';
</script>
<template>
  <div class="bg-secondary text-white">
    <HeaderComponent />
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <FooterComponent />
  </div>
</template>

<script setup>
import HeaderComponent from './components/Header.vue';
import FooterComponent from './components/Footer.vue';
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
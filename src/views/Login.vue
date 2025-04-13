<template>
  <div
    class="container d-flex text-primary bg-info justify-content-center align-items-center vh-100"
  >
    <transition name="slide-in-left">
      <div
        v-show="showLoginCard"
        ref="loginCard"
        class="card p-4 shadow-lg"
        style="width: 400px"
      >
        <h2 class="text-center mb-4">Login</h2>
        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              type="email"
              id="email"
              v-model="email"
              class="form-control"
              placeholder="Enter your email"
              required
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              id="password"
              v-model="password"
              class="form-control"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary w-100 text-white">Login</button>
          <p class="mt-3 text-center">
            Don't have an account? <router-link to="/register">Register</router-link>
          </p>
          <p class="mt-3 text-center">
            <router-link to="/">Back to Home</router-link>
          </p>
        </form>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const email = ref("");
const password = ref("");
const showLoginCard = ref(false);

const handleLogin = () => {
  if (email.value && password.value) {
    console.log("Email:", email.value);
    console.log("Password:", password.value);
    // Add your login logic here
  } else {
    alert("Please fill in all fields.");
  }
};

onMounted(() => {
  showLoginCard.value = true; // Trigger the slide-in effect on mount
});
</script>

<style scoped>

.container {
  background-image: url('https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&w=1200'); 
  background-size: cover; 
  background-position: center;
}
.card {
  border-radius: 10px;
}

.slide-in-left-enter-active {
  animation: slide-in-left 0.5s ease-out;
}

@keyframes slide-in-left {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>

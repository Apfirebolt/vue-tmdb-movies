<template>
  <div
    class="container d-flex text-primary bg-info justify-content-center align-items-center vh-100"
  >
    <div class="card p-4 shadow-lg" style="width: 400px">
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
  </div>
</template>

<script setup>
import { ref } from "vue";

const email = ref("");
const password = ref("");

const handleLogin = () => {
  if (email.value && password.value) {
    console.log("Email:", email.value);
    console.log("Password:", password.value);
    // Add your login logic here
  } else {
    alert("Please fill in all fields.");
  }
};
</script>

<style scoped>
.card {
  border-radius: 10px;
}
</style>

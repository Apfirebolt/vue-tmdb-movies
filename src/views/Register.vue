<template>
  <div
    class="container d-flex text-primary justify-content-center bg-info align-items-center vh-100"
  >
    <transition name="slide-in">
      <div
        v-show="showCard"
        ref="card"
        class="card p-4 shadow-lg"
        style="width: 400px"
      >
        <h2 class="text-center mb-4">Register</h2>
        <form @submit.prevent="handleRegister">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              type="email"
              id="email"
              v-model="form.email"
              class="form-control"
              placeholder="Enter your email"
              required
            />
          </div>
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input
              type="text"
              id="username"
              v-model="form.username"
              class="form-control"
              placeholder="Enter your username"
              required
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              id="password"
              v-model="form.password"
              class="form-control"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary w-100 text-white">
            Register
          </button>
          <p class="mt-3 text-center">
            Already have an account?
            <router-link to="/login">Login</router-link>
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
import { reactive, ref, onMounted } from "vue";

const form = reactive({
  email: "",
  username: "",
  password: "",
});

const showCard = ref(false);

const handleRegister = () => {
  if (form.email && form.username && form.password) {
    console.log("Email:", form.email);
    console.log("Username:", form.username);
    console.log("Password:", form.password);
    // Add your registration logic here
  } else {
    alert("Please fill in all fields.");
  }
};

onMounted(() => {
  showCard.value = true; // Trigger the slide-in animation when the component is mounted
});
</script>

<style scoped>
.card {
  border-radius: 10px;
}

.container {
  background-image: url('https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&w=1200'); 
  background-size: cover; 
  background-position: center;
}

.slide-in-enter-active {
  transition: transform 0.5s ease-out;
}
.slide-in-enter-from {
  transform: translateX(100%);
}
.slide-in-enter-to {
  transform: translateX(0);
}
</style>

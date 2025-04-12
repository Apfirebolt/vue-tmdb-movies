<template>
    <div class="not-found">
        <h1>404 Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <button @click="goHome">Go to Home</button>
    </div>
</template>

<script>
export default {
    name: 'NotFound',
    methods: {
        goHome() {
            this.$router.push('/');
        }
    }
}
</script>

<style scoped>
.not-found {
    text-align: center;
    margin-top: 2rem;
}
h1 {
    font-size: 3rem;
    margin-top: 2rem;
}
p {
    font-size: 1.5rem;
    margin-bottom: 2rem;
}
button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 1rem;
    cursor: pointer;
}
button:hover {
    background-color: #0056b3;
}
</style>
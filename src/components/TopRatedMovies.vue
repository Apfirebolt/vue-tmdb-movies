<template>
    <div>
        <div class="container mt-4">
            <h2 class="text-center mb-4">Top Rated Movies</h2>
            <div class="row">
                <div
                    v-for="movie in topMovies"
                    :key="movie.id"
                    class="col-md-4 mb-4"
                >
                    <div class="card h-100">
                        <img
                            :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
                            class="card-img-top"
                            :alt="movie.title"
                        />
                        <div class="card-body">
                            <h5 class="card-title">{{ movie.title }}</h5>
                            <p class="card-text">
                                Rating: {{ movie.vote_average }} / 10
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const topMovies = ref([]);

const fetchTopMovies = async () => {
    try {
        const response = await axios.get(
            "https://api.themoviedb.org/3/movie/top_rated",
            {
                params: {
                    api_key: "YOUR_API_KEY", // Replace with your TMDB API key
                    language: "en-US",
                    page: 1,
                },
            }
        );
        topMovies.value = response.data.results;
    } catch (error) {
        console.error("Error fetching top movies:", error);
    }
};

onMounted(() => {
    fetchTopMovies();
});
</script>

<style scoped>
.card {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border: none;
}

.card-title {
    font-size: 1.2rem;
    font-weight: bold;
}

.card-text {
    font-size: 1rem;
    color: #555;
}
</style>

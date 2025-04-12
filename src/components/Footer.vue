<template>
    <footer class="footer">
        <div class="container">
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
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTwitter, faFacebook, faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons';

const currentYear = ref(new Date().getFullYear());
</script>

<style scoped>
.footer {
    background-color: #333;
    color: #fff;
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
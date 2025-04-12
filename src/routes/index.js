import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import NotFound from '../views/404.vue'

const authGuard = (to, from, next) => {
    const isAuthenticated = localStorage.getItem('user')
    if (to.name !== 'Login' && to.name !== 'Register' && !isAuthenticated) {
        next({ name: 'Login' })
    } else {
        next()
    }
}

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue')
    },
    {
        path: '/:catchAll(.*)',
        name: '404',
        component: NotFound
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// router.beforeEach(authGuard)

export default router
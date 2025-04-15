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
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/Register.vue')
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue')
    },
    {
        path: '/movie',
        name: 'Movie',
        component: () => import('../views/Movie.vue')
    },
    {
        path: '/movie/:id',
        name: 'MovieDetails',
        component: () => import('../views/MovieDetail.vue')
    },
    {
        path: '/show',
        name: 'Show',
        component: () => import('../views/Show.vue')
    },
    {
        path: '/collection',
        name: 'Collection',
        component: () => import('../views/Collection.vue')
    },
    {
        path: '/collection/:id',
        name: 'CollectionDetails',
        component: () => import('../views/CollectionDetail.vue')
    },
    {
        path: '/show/:id',
        name: 'ShowDetails',
        component: () => import('../views/ShowDetail.vue')
    },
    {
        path: '/person',
        name: 'Person',
        component: () => import('../views/Person.vue')
    },
    {
        path: '/person/:id',
        name: 'PersonDetails',
        component: () => import('../views/PersonDetail.vue')
    },
    {
        path: '/discover',
        name: 'Discover',
        component: () => import('../views/Discover.vue')
    },
    {
        path: '/trending',
        name: 'Trending',
        component: () => import('../views/Trending.vue')
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
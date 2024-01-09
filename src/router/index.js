import { createRouter, createWebHistory } from '@ionic/vue-router';
import app from '@/scripts/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const auth = getAuth(app);

const beforeEnter = (to, from, next) => {

  const path = to.path;

  onAuthStateChanged(auth, async (user) => {
    if ( user ) {
   
      localStorage.setItem("firebase-user-key", user.uid);

      if (path === "/") {
        next('/panel')
      } else {
        console.log(path)
        next()
      }
    } else {
      if (path === "/") {
        next()
      } else {
        next('/')
      }
    }
  })

}

const routes = [
  {
    path: '/',
    component: () => import('@/views/login.vue'),
    beforeEnter: beforeEnter
  },
  {
    path: '/register',
    component: () => import('@/views/register.vue')
  },
  {
    path: '/panel',
    name: 'panel',
    component: () => import('@/views/panel.vue'),
    beforeEnter: beforeEnter
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router

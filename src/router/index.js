import { createRouter, createWebHistory } from 'vue-router'
import AllNotes from '@/views/AllNotes.vue'
import ArchivedNotes from '@/views/ArchivedNotes.vue'
import Tags from '@/views/Tags.vue'

const routes = [
  { path: '/', name: 'AllNotes', component: AllNotes },
  { path: '/archived', name: 'ArchivedNotes', component: ArchivedNotes },
  { path: '/tags', name: 'Tags', component: Tags },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import AllNotes from '@/views/AllNotes.vue'
import ArchivedNotes from '@/views/ArchivedNotes.vue'
import DeletedNotes from '@/views/DeletedNotes.vue'

const routes = [
  { path: '/', name: 'AllNotes', component: AllNotes },
  { path: '/archived', name: 'ArchivedNotes', component: ArchivedNotes }, 
  { path: '/deleted', name: 'DeletedNotes', component: DeletedNotes }, 
  
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

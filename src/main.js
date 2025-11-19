import { createApp, reactive, watch } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/variables.css'

// localStorage'dan önceki değerleri oku
const savedTheme = localStorage.getItem('theme') || 'light'
const savedFont = localStorage.getItem('font') || 'sans'

// reactive global store
const settingsStore = reactive({
  theme: savedTheme,
  font: savedFont
})

// değişiklikleri localStorage'a yaz
watch(() => settingsStore.theme, (newVal) => {
  localStorage.setItem('theme', newVal)
})
watch(() => settingsStore.font, (newVal) => {
  localStorage.setItem('font', newVal)
})

const app = createApp(App)
app.use(router)
app.provide('settings', settingsStore)
app.mount('#app')

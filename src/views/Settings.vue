<template>
  <div class="settings-page">
    <div class="settings-page-header">
      <h2>Settings</h2>
    </div>

    

    <div class="settings-page-area">
 
      <!-- Sekme butonları -->
    <div class="tabs">
      <button v-for="tab in tabs" :key="tab.value" :class="{ active: activeTab === tab.value }"
        @click="activeTab = tab.value">
        {{ tab.label }}
      </button>
    </div>
      <div v-if="activeTab === 'themeFont'" class="section-group">
        <section>
          <h3>Theme</h3>

          <label v-for="opt in themeOptions.themes" :key="opt.value" for="box-shadow">

            <input type="radio" :value="opt.value" v-model="settings.theme" id="box-shadow" class="custom-radio" />

            {{ opt.label }}

          </label>
        </section>

        <section>
          <h3>Font</h3>

          <label v-for="opt in themeOptions.fonts" :key="opt.value" for="box-shadow">

            <input type="radio" :value="opt.value" v-model="settings.font" id="box-shadow" class="custom-radio" />

            {{ opt.label }}

          </label>
        </section>
      </div>
      <div class="section-group">
        <section v-if="activeTab === 'project'" class="project">
          <h3>Project Details</h3>
          <p>

            📝 Note Nest Vue
            Note Nest Vue is a sleek, customizable note‑taking app built with Vue 3 & Vite.

            It’s designed to make capturing ideas effortless while letting you style your workspace to match your vibe.

            ✨ <b>Features</b>
            Create, edit, delete, and archive notes — keep your thoughts organized and accessible.
            Custom themes — switch between color palettes to personalize your experience.

            Font options — choose between serif, monospace, or sans‑serif to match your style.

            Responsive design — optimized layouts for mobile, tablet, and desktop.

            Keyboard navigation — perform all actions without touching the mouse.

            Validation messages — clear feedback when required fields are missing.

            Hover & focus states — polished UI interactions for a smooth experience.
          </p>
          <p>
            Curious to see more of my work? Check out my
            <a href="https://portfolio-banuaggun.vercel.app" target="_blank">Portfolio</a>.
          </p>

        </section>
        <section v-if="activeTab === 'about'" class="about">
          <h3>About</h3>
          <p>
            Crafted with Vue.js, this app is designed to make note‑taking effortless and
            highly personal. My goal was to build a space where ideas can be captured,
            organized, and styled to match your vibe. With customizable themes and fonts,
            your notes don’t just stay functional—they become part of your creative flow.
          </p>
          <p>
            Curious to see more of my work? Check out my
            <a href="https://portfolio-banuaggun.vercel.app" target="_blank">Portfolio</a>.
          </p>

        </section>


      </div>
    </div>

  </div>
</template>

<script setup>
import { inject, computed, ref } from "vue";
import { themeOptions } from "../constants/themeOptions";

const settings = inject("settings");

// Sekme tanımları
const tabs = [
  { value: "themeFont", label: "Theme & Font" },
  { value: "project", label: "Project Details" },
  { value: "about", label: "About Me" },
];

const activeTab = ref("themeFont");

// Font family mapping
const fontFamily = computed(() => {
  switch (settings.font) {
    case "serif":
      return "Georgia, serif";
    case "mono":
      return "Courier New, monospace";
    default:
      return "Arial, sans-serif";
  }
});
</script>

<style scoped> 
.settings-page {
  max-width:1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  color: var(--text-color);
  background-color: var(--bg-color);
} 

.settings-page-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  border-bottom: 1px solid yellowgreen;
  display: flex;
  align-items: center;
  padding: 0 12px;
  background-color: var(--bg-color);
  color: var(--text-color);
  margin-top: var(--app-header-height); 
  z-index:2;
} 

.settings-page-area {
  margin-top: 0px;
  padding: 0 16px; 
  border:1px solid red;
  width: 100%;
  display: flex;
  flex-direction: column; 
  align-items: flex-start;
  gap: 1.5rem;
}  


.settings-page-area h3 {
  margin-bottom: 1rem;
}

.settings-page-area label {
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-bottom: 1rem;
  cursor: pointer;
  font-size: 1rem;
  gap: 0.5rem;
}

.settings-page-area input[type=radio] {
  width: 1.4em;
  height: 1.4em;
} 

.custom-radio {
  appearance: none;
  -webkit-appearance: none;
  border: 1px solid var(--button-bg);
  background-color: transparent;
  border-radius: 50%;
  position: relative;
  display: inline-block;
}

.custom-radio:focus-visible {
  outline-offset: 0;
}

#box-shadow:checked::after {
  transform: translate(-50%, -50%) scale(1);
} 

input[type=radio]:checked::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  text-align: center;
  width: 0.7em;
  height: 0.7em;
  border-radius: 50%;
  background-color: var(--r-s-border);
  transition: transform 200ms ease;
}

.tabs {
  display: flex; 
  flex-direction: row; 
  align-items: flex-start;
  gap: 0.2rem; 
  margin-top: 70px; 
}

.tabs button {
  padding: 0.5rem 1rem;
  border: 1px solid var(--button-bg);
  background: var(--bg-color);
  color: var(--text-color);
  cursor: pointer;
  border-radius: 6px;  
}

.tabs button.active {
  background: var(--c-u-border);
  color: var(--text-color);
}


@media only screen and (min-width:760px) {
  .settings-page-header {
    padding: 0 36px; 
  }

  .section-group {
    flex-direction: row;
  }

  .section-group section {
    flex: 1;
  }
} 
</style>

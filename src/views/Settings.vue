<template>
  <div class="settings-page">
    <div class="settings-page-header">
      <h2>Settings</h2>
    </div>

    <div class="settings-page-area">
      <section>
        <h3>Theme</h3>

        <label v-for="opt in themeOptions.themes" :key="opt.value">
          <input type="radio" :value="opt.value" v-model="settings.theme" />
          {{ opt.label }}
        </label>
      </section>

      <section>
        <h3>Font</h3>

        <label v-for="opt in themeOptions.fonts" :key="opt.value">
          <input type="radio" :value="opt.value" v-model="settings.font" />
          {{ opt.label }}
        </label>
      </section>
      <section class="about">
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
</template>

<script setup>
import { inject, computed } from "vue";
import { themeOptions } from "../constants/themeOptions";

// Global store'u alıyoruz
const settings = inject("settings");

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
  max-width: 1200px;
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
}


.settings-page-area {
  margin-top: 60px;
  padding: 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.settings-page-area section {
  border: 1px solid var(--button-bg);
  padding: 1rem 1.5rem;
  border-radius: 8px;
}

.settings-page-area h3 {
  margin-bottom: 1rem;
}

.settings-page-area label {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  cursor: pointer;
  font-size: 1rem;
  gap: 0.5rem;
}

.settings-page-area input[type="radio"] {
  appearance: none;
  width: 18px;
  height: 18px; 
  padding:4px;
  border: 2px solid var(--r-s-border);
  border-radius: 50%;
  outline: none;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
}

.settings-page-area input[type="radio"]::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 8px;
  height: 8px;
  background-color: var(--r-s-border);
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(0);
  transition: transform 0.2s ease;
}


.settings-page-area input[type="radio"]:checked::after {
  transform: translate(-50%, -50%) scale(1);
}

.settings-page-area input[type="radio"]:checked {
  background-color: var(--r-s-border);
  border:2px solid red;
  padding: 4px;
}

.settings-page-area input[type="radio"]:hover {
  border-color: #357ab8;
}

@media only screen and (min-width:760px) {
  .settings-page-header {
    padding: 0 36px;
  }
}
</style>

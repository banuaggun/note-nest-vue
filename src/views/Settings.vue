<template>
  <div class="settings-page">
    <div class="settings-page-header">
      <h2>Settings</h2>
    </div>

    <div class="settings-page-area">

      <div class="tab-area">
        <div class="tabs">
          <button v-for="tab in tabs" :key="tab.value" :class="{ active: activeTab === tab.value }"
            @click="activeTab = tab.value">
            {{ tab.label }}
          </button>
        </div>
      </div>

      <div v-if="activeTab === 'themeFont'" class="tab-content">
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

      <div v-if="activeTab === 'project'" class="tab-content">
        <section class="project">
          <div class="project-content">
            <h2>Note Nest Vue Project Details</h2>
            <p>
              Note Nest Vue is a sleek, customizable note‑taking app built with Vue 3 & Vite.
            </p>

            <p>
              Crafted with Vue.js, this app is designed to make note‑taking effortless and
              highly personal. My goal was to build a space where ideas can be captured,
              organized, and styled to match your vibe. With customizable themes and fonts,
              your notes don’t just stay functional—they become part of your creative flow.
            </p>

            <p>
              It’s designed to make capturing ideas effortless while letting you style your workspace to match your
              vibe.
            </p>

            <p>
              You can check out the source code of the project on
              <a href="https://github.com/banuaggun/note-nest-vue" target="_blank">
                GitHub
              </a>.
            </p>

          </div>
          <div class="project-features">
            <h3>Features</h3>

            <ul>
              <li>
                <b><i>Create</i></b>, <b><i>edit</i></b>, <b><i>delete</i></b>, and <b><i>archive</i></b> notes — keep
                your thoughts organized and accessible.
              </li>
              <li>
                <span class="sub-head">Custom themes</span> — switch between color palettes to personalize your
                experience.
              </li>
              <li>
                <span class="sub-head">Font options</span> — choose between serif, monospace, or sans‑serif to match
                your style.
              </li>
              <li>
                <span class="sub-head">Responsive design</span> — optimized layouts for mobile, tablet, and desktop.
              </li>
              <li>
                <span class="sub-head">Validation messages</span> — clear feedback when required fields are missing.
              </li>
              <li>
                <span class="sub-head">Hover & focus states</span> — polished UI interactions for a smooth experience.
              </li>
            </ul>
          </div>
        </section>
      </div>

      <div v-if="activeTab === 'about'" class="tab-content">
        <section class="about">
          <h3>About Me</h3>
          <p>
            Hi, I'm <b>Banu AĞGÜN</b> — a UX & UI Designer and Frontend Developer passionate about crafting beautiful,
            functional digital experiences.
          </p>
          <p>
            I love designing intuitive user interfaces, coding responsive layouts, and continuously learning new skills
            to stay ahead in the ever‑evolving tech world.
          </p>
          <p>
            My focus is on building visually stunning and highly customizable web applications that make everyday tasks
            effortless and enjoyable.
            Whether it’s designing smooth interactions, implementing responsive designs, or experimenting with creative
            themes and fonts, I aim to blend aesthetics with usability.
          </p>
          <p>
            Beyond coding and design, I enjoy exploring new ideas, pushing creative boundaries, and turning concepts
            into engaging products.
          </p>
          <p>
            Curious to see more of my work? Visit my <a href="https://portfolio-banuaggun.vercel.app"
              target="_blank">Portfolio</a>.
          </p>
        </section>


      </div>
    </div>

  </div>
</template>

<script setup>
import { inject, computed, ref, watch, nextTick} from "vue";
import { themeOptions } from "../constants/themeOptions";

const settings = inject("settings");

const tabs = [
  { value: "themeFont", label: "Theme & Font" },
  { value: "project", label: "Project Details" },
  { value: "about", label: "About Me" },
];

const activeTab = ref("themeFont");

const themeFontRef = ref(null);
const projectRef = ref(null);
const aboutRef = ref(null);

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

watch(activeTab, async (newTab) => {
  await nextTick();
  let el = null;
  if (newTab === "themeFont") el = themeFontRef.value;
  if (newTab === "project") el = projectRef.value;
  if (newTab === "about") el = aboutRef.value;
  if (el) el.scrollTop = 0;
});
</script>

<style scoped>
.settings-page {
  max-width: 1200px;
  margin: 0 auto 120px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  color: var(--text-color);
  background-color: var(--bg-color);
}

.settings-page-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  background-color: var(--bg-color);
  color: var(--text-color);
  margin-top: var(--app-header-height);
  z-index: 2;
}

.settings-page-area {
  padding: 40px 16px 80px 16px;
  background-color: var(--bg-color);
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
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

section.project,
section.about {
  line-height: 1.6;
}

.project-content,
.project-features,
.about {
  text-indent: 12px;
  margin-bottom: 20px;
}

.sub-head {
  font-weight: bold;
  font-style: italic;
  font-size: 18px;
  text-transform: capitalize;
}

section.project ul li {
  list-style: none;
}

section.project p>a, section.about p>a {
  color: var(--text-color);
  font-weight: bold;
  text-decoration: none;
  border-bottom: 3px solid var(--a-border);
  padding: 4px 16px 0 16px;
}

section.project p>a:hover, section.about p>a:hover {
  box-shadow: var(--a-shadow);
}

.tab-area {
  position: fixed;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  height: auto;
  top: 100px;
  left: 50%;
  padding: 20px;
  transform: translateX(-50%);
  z-index: 3;
  background-color: var(--bg-color);
}

.tabs {
  background-color: var(--bg-color);
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 1rem;
}

.tabs button {
  padding: 0.5rem 1rem;
  border: 1px solid var(--c-u-border);
  background: var(--bg-color);
  color: var(--text-color);
  cursor: pointer;
  outline: none;
  font-weight: 600;
  letter-spacing: 0.4px;
  line-height: 18px;
  border-radius: 6px;
}

.tabs button.active {
  box-shadow: var(--c-u-shadow);
  color: var(--text-color);
  outline: none;
}

.tab-content {
  flex: 1;
  width: 100%;
  /*max-height: calc(100vh - 200px);*/
  overflow-y: auto;
  margin-top: 110px; 
  padding:0 8px 0 12px;
}


@media only screen and (min-width:760px) { 
  .settings-page{
    margin: 0 auto 40px auto;
  }
  .settings-page-header {
    padding: 0 36px;
  }

  .tab-area{
    padding: 8px 20px 8px 20px;
  }
  .tabs button {
    padding: 0.8rem 2rem;
  }

  .tab-content { 
    margin-top:90px;
    padding: 0 12px;
  }

  section.project,
  section.about {
    line-height: 1.6;
    max-width: 1000px;
    margin: 0 0 40px 0;
    text-align: left;
  }

}
</style>

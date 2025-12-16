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
        <h3>Hakkımda</h3>
        <p>
          Bu uygulamayı Vue.js kullanarak geliştirdim. Amaç kullanıcıların
          notlarını kolayca düzenleyebilmesi ve kişiselleştirebilmesi. Tema ve
          font ayarları ile uygulamayı kendi zevklerine göre
          özelleştirebilirler.
        </p>
        <p>
          Diğer projelerime göz atmak için:
          <a href="https://portfolio-banuaggun.vercel.app" target="_blank"
            >Portfolio</a
          >
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
  display: flex;
  flex-direction: column;
  align-items: center;
  height:auto;
}
.settings-page-header {
   position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px; 
  background: var(--bg-color);
  border-bottom: 1px solid yellowgreen;
  display: flex;
  align-items: center;
  padding: 0 12px;
  margin-top:var(--app-header-height);
}


.settings-page-area {
   margin-top: 60px; /* header yüksekliği kadar boşluk */
  padding: 1rem; 
  width:100%;
}
  /*
.settings-page-area section {
  margin-bottom: 20px;
}
.settings-page-area .about {
  margin-top: 20px;
  padding-top: 10px;
  border-top: 1px solid #ccc;
  font-size: 14px;
  color: #555;
}*/
</style>

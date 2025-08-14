<template>
  <aside class="sidebar">
    <div class="scrollbar-wrapper">
    <nav class="sidebar-nav">
      <div class="sidebar-nav-links">
        <router-link
          to="/"
          class="nav-item"
          :class="{ active: $route.path === '/' }"
        >
          <i class="ph-fill ph-newspaper"></i> All Notes
        </router-link>
        <router-link
          to="/archived"
          class="nav-item"
          :class="{ active: $route.path === '/archived' }"
        >
          <i class="ph-fill ph-archive-box"></i> Archived Notes
        </router-link>
        <div class="sidebar-nav-links-line"></div>
      </div>

      <!-- Tags Başlığı -->
      <div class="tags-title">Tags</div>

      <!-- Kategorili Etiket Listesi -->
      <div
        class="tag-group"
        v-for="(tags, category) in tagGroups"
        :key="category"
      >
        <div class="tag-category-header">
          <i class="ph-fill ph-tag"></i>
          {{ category }}
        </div>
        <div class="tag-list">
          <router-link
            v-for="tag in tags"
            :key="tag"
            :to="`/tags/${tag}`"
            class="tag-item"
            :class="{ active: $route.path === `/tags/${tag}` }"
          >
            {{ tag }}
          </router-link>
        </div>
      </div>
    </nav>
    </div>
  </aside>
</template>

<script setup>
import { ref } from "vue";

const tagGroups = ref({
  Daily: ["Cooking", "Fitness", "Health"],
  Business: ["Adjustment", "Bills", "Meeting"],
  Development: ["JavaScript", "React.js", "Vue.js"],
  Design: ["Design Planning", "UI Design", "UX Design"],
});
</script>

<style scoped>
.sidebar {
  width: 260px;
  position:fixed;
  margin-top:100px;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  margin-right: 24px;
  padding-top: 20px;
  background-color: #ffffff;
  box-shadow: 4px 0 8px 0 rgba(29, 34, 38, 0.45); 
  color: var(--text-color);
   /* sidebar dış yapı */
}

.sidebar-nav {
  width: 220px;
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 40px);
  overflow-y: scroll;
  padding-right: 12px; /* içerik sağa kaymasın */
  margin-right: -12px; /* scrollbar dışarı taşsın */
  /* background-color: lightgreen; */
}

.scroll-wrapper {
  position:relative;
  width:100%;
  height:100%;
  overflow:visible;
}

.sidebar-nav::-webkit-scrollbar {
  width: 6px;
}

.sidebar-nav::-webkit-scrollbar-thumb {
  background-color: #b2beb5;
  border-radius: 3px;
}


.sidebar-nav-links{
  display:flex;
  flex-direction: column;
  padding:20px 0 20px 0;
  gap:12px;
  font-size:18px;
  font-weight:500;
  /* border:1px solid blue;
  background-color: gray; */
}

.sidebar-nav-links-line{
  border:1.5px solid #b2beb5;
}

.nav-item {
  display: flex;
  align-items: center;
  width:200px;
  padding:4px 0 4px 12px;
  color: #1d2226;
  text-decoration: none;
  font-weight: 500;
  width: 220px;
  border-radius: 4px;
}

.nav-item i {
  font-size: 28px;
  margin-right:12px;
}

.nav-item:hover {
  background-color: var(--link-color);
  width:200px;
}

.nav-item.active {
  background-color: var(--link-color);
  width:200px;
}


.tags-title {
  padding:0 0 0 12px;
  margin-bottom:20px;
  margin-left:0px;
  font-size:18px;
  font-weight: 500;
  color:var(--text-color-two);
}

.tag-group {
  margin-bottom: 24px;
  margin-left:12px;
  /* border:1px solid red; */
}


.tag-category-header {
  font-weight: 600;
  font-size: 18px;
  margin-bottom:16px;
}

.tag-category-header i{
  font-size:20px;
  margin-right:2px;
}

.tag-list {
  display: flex;
  flex-direction: column;
  margin-left:24px;
  gap:12px;
  /* border:1px solid blue; */
}

.tag-item {
  padding:2px 0;
  color:var(--text-color-two);
  border-bottom:2px solid transparent;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
}

.tag-item:hover,
.tag-item.active {
  border-bottom:2px solid var(--link-color);
  color:#6d8188;
  font-weight:600;
  padding:2px 0;
}


</style>

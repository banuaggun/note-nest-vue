<template>
  <aside class="sidebar" :class="{ collapsed: isCollapsed }">
    <!-- Toggle Button -->
    <button class="toggle-btn" @click="isCollapsed = !isCollapsed">
      <i :class="isCollapsed ? 'ph ph-caret-right' : 'ph ph-caret-left'"></i>
    </button>

    <nav class="sidebar-nav">
      <!-- Logo -->
      <div class="sidebar-nav-logo">
        <router-link to="/" class="logo-link">
          <img :src="logoIcon" alt="note nest vue" class="logo-icon" />
          <img :src="logoText" alt="note nest vue" class="logo-text" />
        </router-link>
      </div>

      <!-- Menü -->
      <div class="sidebar-nav-links">
        <router-link
          to="/"
          class="nav-item btn"
          :class="{ active: $route.path === '/' }"
        >
          <i class="ph ph-house"></i> <span>All</span>
        </router-link>
        <router-link
          to="/archived"
          class="nav-item btn"
          :class="{ active: $route.path === '/archived' }"
        >
          <i class="ph ph-box-arrow-down"></i> <span>Archived</span>
        </router-link>
        <router-link
          to="/deleted"
          class="nav-item btn"
          :class="{ active: $route.path === '/deleted' }"
        >
          <i class="ph ph-trash"></i> <span>Deleted</span>
        </router-link>
      </div>

      <div class="sidebar-nav-bottom">
        <!-- Portfolio link -->
        <a
          href="https://portfolio-banuaggun.vercel.app/"
          target="_blank"
          class="portfolio-link btn"
        >
          <img :src="logob" alt="Banu Ağgün Logo" class="bottom-logo" />
          <span>My Portfolio</span>
        </a>

        <!-- Sosyal linkler -->
        <div class="social-links">
          <a class="btn" href="https://github.com/banuaggun" target="_blank"
            ><i class="ph ph-github-logo"></i><span>GitHub</span></a
          >
          <a class="btn" href="https://www.behance.net/banuaggun" target="_blank"
            ><i class="ph ph-behance-logo"></i><span>Behance</span></a
          >
          <a class="btn" href="https://www.linkedin.com/in/banuaggun/?locale=en_US" target="_blank"
            ><i class="ph-fill ph-linkedin-logo"></i><span>LinkedIn</span></a
          >
        </div>
      </div>
    </nav>
  </aside>
</template>

<script setup>
import { ref } from "vue";
import logoIcon from "../../assets/image/logo-icon.svg";
import logoText from "../../assets/image/logo-text.svg";
import logob from "../../assets/image/logob.png";

const isCollapsed = ref(false);
</script>

<style>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 200px;
  background-color: #fff;
  border-right: 2px solid #ccc;
  border-radius: 0 8px 8px 0;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
}

.sidebar.collapsed {
  width: 60px;
  height: 100vh;
}

.sidebar-nav-logo {
  margin: 60px auto 20px auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-link {
  display: flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
}

.logo-icon {
  width: 28px;
  height: 28px;
}

.logo-text {
  height: 18px;
  transition: opacity 0.3s ease;
}

.sidebar.collapsed .logo-text,
.sidebar.collapsed .nav-item span {
  opacity: 0;
  display: none;
}

.sidebar-nav-links {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 30px;
}

.nav-item {
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: all 0.2s ease;
  padding: 12px 0 12px 16px;
  gap: 6px;
}

.sidebar.collapsed .nav-item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 0 12px 0;
  gap: 6px;
  color: #242424;
  text-decoration: none;
  transition: color 0.2s ease;
}

.nav-item i {
  font-size: 24px;
}

.nav-item span {
  font-size: 1rem;
}

.toggle-btn {
  position: absolute;
  right: -10px;
  top: 20px;
  margin-bottom: 20px;
  align-self: center;
  background: white;
  border: 1px solid #ccc;
  border-radius: 100%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
}

.toggle-btn i {
  font-size: 1rem;
  color: #000;
}

.sidebar-nav-bottom {
  position: absolute;
  width:100%;
  bottom: 30px;
  display: flex;
  flex-direction: column;
}

.portfolio-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: all 0.2s ease;
  padding: 12px 0 12px 0px;
  gap: 0px;
}

.portfolio-link img {
  width: 50px;
  height: 30px;
}

.portfolio-link span{
  font-size:16px;
  font-weight:500;
  color:#242424;
}

.sidebar.collapsed .portfolio-link{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 0 12px 0;
  gap: 0;
  color: #242424;
  text-decoration: none;
  transition: all 0.2s ease;
}

.social-links {
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  padding: 12px 0 12px 0px; 
  gap: 16px;
  color: #242424;
  text-decoration: none;
  transition: all 0.2s ease;
}

.social-links a{
  gap:8px;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 12px 0 12px 0px;
  width:100%;
}


.social-links a span{
  font-size: 16px;
  font-weight: 500;
  color:#242424;
}

.social-links a i{
  font-size:24px;
  color:#242424;
  margin-left:8px;
}

.sidebar.collapsed .social-links {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 12px 0 12px 0;
  gap: 16px;
  color: #242424;
  text-decoration: none;
  transition: all 0.2s ease;
}

.sidebar.collapsed .social-links a i{
  margin-left:0;
}

.sidebar.collapsed .portfolio-link span,
.sidebar.collapsed .social-links span {
  display: none; 
}

.sidebar.collapsed .portfolio-link,
.sidebar.collapsed .social-links a {
  justify-content: center; 
}

.btn {
	color: #000;
	transition: all 0.5s;
	position: relative;
}
.btn::before {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 1;
	background-color: rgba(102, 161, 130, 0.1);
	transition: all 0.3s;
}
.btn:hover::before {
	opacity: 0 ;
	transform: scale(0.5,0.5);
}
.btn::after {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 1;
	opacity: 0;
	transition: all 0.3s;
	border: 1px solid rgba(102, 161, 130, 0.8);
	transform: scale(1.2,1.2);
}
.btn:hover::after {
	opacity: 1;
	transform: scale(1,1);
}

</style>

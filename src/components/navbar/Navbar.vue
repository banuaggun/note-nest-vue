<template>
  <div>
    <div class="container">
      <input type="checkbox" id="toggle" checked />
      <label class="button" for="toggle">
        <span class="button-s"></span>
        <nav class="nav">
          <ul>
            <li>
              <router-link to="/" :class="{ active: $route.path === '/' }">
                <i class="ph ph-house"></i>
              </router-link>
            </li>

            <li>
              <router-link
                to="/archived"
                :class="{ active: $route.path === '/archived' }"
              >
                <i class="ph ph-box-arrow-down"></i>
              </router-link>
            </li>

            <li>
              <router-link
                to="/deleted"
                :class="{ active: $route.path === '/deleted' }"
              >
                <i class="ph ph-trash"></i>
              </router-link>
            </li>

            <li>
              <router-link
                to="/settings"
                :class="{ active: $route.path === '/settings' }"
              >
                <i class="ph ph-gear"></i>
              </router-link>
            </li>
          </ul>
        </nav>
      </label>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.container {
  width: 20%;
  display: flex;
  justify-content: left;
  align-items: center;
  position: fixed;
  bottom: 40px;
  left: 15px;
  right: 0;
  z-index:1000; 
}

@media only screen and (min-width:641px) {
  .container {
    left: 20px;
  }
}

#toggle {
  -webkit-appearance: none;
}

.button {
  position: absolute;
  z-index: 999;
  width: 280px;
  height: 65px;
  background: var(--bg-color); 
  opacity: 1;
  z-index: 10;
  border: 1px solid var(--c-u-border); 
  box-shadow: var(--c-u-shadow);
  border-radius: 15px;
  cursor: pointer;
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 0 24px;
  overflow: hidden;
  transition: width 300ms linear;
} 
.button-s {
  position: absolute;
  content: "";
  width: 20px;
  height: 2px;
  background: var(--text-color);
  transform: rotate(0);
  transition: all 0.4s ease;
  z-index: 10;
  opacity: 0;
}
.button:before {
  position: absolute;
  content: "";
  width: 20px;
  height: 2px;
  background: var(--text-color);
  transform: rotate(135deg);
  transition: all 0.4s ease;
}
.button:after {
  position: absolute;
  content: "";
  width: 20px;
  height: 2px;
  background: var(--text-color);
  transform: rotate(225deg);
  transition: all 0.4s ease;
}

.nav {
  opacity: 1;
  transition: all 0.5s ease-in-out;
  width: 100%;
  border-radius: 5px;
  transform: translateX(10%);
  padding: 10px 0;
  background: transparent; 
}
.nav ul {
  margin: 0;
  padding: 0; 
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.nav li {
  opacity: 0;
  list-style: none; 
}
.nav li:nth-child(1) {
  transform-origin: bottom;
  animation: itop 300ms 300ms linear forwards;
}
.nav li:nth-child(2) {
  transform-origin: bottom;
  animation: itop 300ms 400ms linear forwards;
}
.nav li:nth-child(3) {
  transform-origin: bottom;
  animation: itop 300ms 500ms linear forwards;
}
.nav li:nth-child(4) {
  transform-origin: bottom;
  animation: itop 300ms 600ms linear forwards;
}
.nav a {
  transition: all 0.5s linear;
  text-decoration: none;
  color:var(--text-color);
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}
.nav a i {
  font-size: 24px;
}

.nav a:hover {
  color: var(--text-color);
  border-radius: 50%;
  box-shadow: var(--box-shadow-style-hover);
  transform: var(--transform-style);
  font-size: 24px;
}

.nav a:hover i {
  font-size: 24px;
}

.nav a.active {
  border-radius: 50%;
  color:var(--text-color);
  box-shadow: var(--box-shadow-style-active);
}

#toggle:checked ~ label .nav {
  display: none;
  opacity: 0;
  transform: translateX(0); 
}

#toggle:checked ~ .button:before {
  transform: rotate(0deg);
  top: 20px; 
}

#toggle:checked ~ .button:after {
  transform: rotate(0deg);
  bottom: 20px; 
}

#toggle:checked ~ label span.button-s {
  opacity: 1;
  display: block;
  top: auto;
  bottom: auto;
  width: 20px;
  height: 2px;
  transform: translateX(0deg);
}

#toggle:checked ~ .button {
  width: 70px;
  transition: all 0.1s linear; 
}

@media (max-width: 640px) {
  .container {
    width: 100%;
  }
}
@keyframes itop {
  0% {
    opacity: 0;
    transform: translateY(60px); 
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

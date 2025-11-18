<template>
    <div>
        <div class="container">
           
            <input type="checkbox" id="toggle" checked />
            <label class="button" for="toggle">
                <nav class="nav dot">
                    <ul>
                        <li>
                            <router-link to="/" :class="{ active: $route.path === '/' }">
                                <i class="ph ph-house"></i> 
                            </router-link>
                        </li>

                        <li>
                            <router-link to="/archived" :class="{ active: $route.path === '/archived' }">
                                <i class="ph ph-box-arrow-down"></i> 
                            </router-link>
                        </li> 

                        <li>
                            <router-link to="/deleted" :class="{ active: $route.path === '/deleted' }">
                                <i class="ph ph-trash"></i>
                            </router-link>
                        </li>

                        <li>
                            <router-link to="/settings" :class="{ active: $route.path === '/settings' }">
                                <i class="ph ph-gear"></i> 
                            </router-link>
                        </li>
                    </ul>
                </nav>
            </label>
        </div>
    </div>
</template>

<script setup>
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.container {
  width: 20%;
  display: flex;
  justify-content: left;
  align-items: center;
  position: fixed;
  bottom:40px;
  left:15px;
  right:0;
}

@media only screen and (min-width:641px){
  .container{
    left:20px;
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
  background: white;
  opacity:1;
  z-index:10;
  box-shadow: 2px 2px 12px rgba(136, 136, 136, 1);
  border: 2px solid #ccc;
  border-radius: 15px;
  cursor: pointer;
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 0 24px;
  overflow: hidden;
  transition: width 300ms linear; 
}
.button:before {
  position: absolute;
  content: "";
  width: 20px;
  height: 2px;
  background: #242424;
  transform: rotate(225deg);
  transition: all 0.4s ease;
}
.button:after {
  position: absolute;
  content: "";
  width: 20px;
  height: 2px;
  background: #242424;
  transform: rotate(135deg);
  transition: all 0.4s ease;
}

.nav {
  opacity: 1;
  transition: all 0.5s ease-in-out;
  width: 100%;
  border-radius: 5px;
  transform: translateX(10%);
  padding: 10px 0;
  background-color: white;
}
.nav ul {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: white;
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
  color: #242424;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.nav a i{
  font-size:24px;
}

.nav a:hover {
  color: #242424;
  background: #fff;
  border-radius: 50%;
  box-shadow: 
			4px 4px 6px rgba(0,0,0,.2), 
			5px 10px 35px rgba(0,0,0,.1),
			8px 10px 25px rgba(0,0,0,.1),
			inset -1px -1px 9px rgba(0,0,0,.2),
			inset -1px -1px 3px rgba(255,255,255,.6),
			inset 1px 1px 8px rgba(255,255,255,1),
			inset 4px 4px 24px rgba(0,0,0,.15),
			-5px -5px 15px rgba(255,255,255,.9);
		transform: scale(.98);
    font-size:24px;
}

.nav a:hover i{
  font-size:24px;
}

.nav a.active{
  border-radius:50%;
  box-shadow: 
			2px 2px 3px rgba(0,0,0,.2), 
			3px 5px 18px rgba(0,0,0,.1),
			4px 5px 13px rgba(0,0,0,.1),
			inset -0.5px -0.5px 5px rgba(0,0,0,.2),
			inset -0.5px -0.5px 1.5px rgba(255,255,255,.6),
			inset 0.5px 0.5px 4px rgba(255,255,255,1),
			inset 2px 2px 12px rgba(0,0,0,.15),
			-2.5px -2.5px 7.5px rgba(255,255,255,.9);
}

#toggle:checked ~ label .nav {
  display: none;
  opacity: 0;
  transform: translateX(0);
}

#toggle:checked ~ .button:before {
  transform: rotate(90deg);
}

#toggle:checked ~ .button:after {
  transform: rotate(0deg);
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
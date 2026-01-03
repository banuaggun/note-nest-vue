<template> 
<div class="empty-state-area">


  <div class="empty-state">
    <img v-if="image" :src="image" alt="image" class="empty-image" />

    <h3>{{ title }}</h3>
    <p>{{ description }}</p>

    <button v-if="buttonText" @click="$emit('button-click')">
      {{ buttonText }}
    </button>
  </div>
  </div>

</template>

<script setup>
defineProps({
  title: String,
  description: String,
  image: String,
  buttonText: String
});
</script>

<style scoped> 
.empty-state-area{
  width:100%; 
  height:100%; 
  display:flex; 
  flex-direction:column;
  align-items: center; 
  justify-content:  center;
}
.empty-state { 
  text-align: center;
  padding: 20px 20px; 
  color: var(--text-color); 
  margin:40px auto;  
  line-height:1.8;
}
.empty-image {
  width: 100%;
  height:300px;
  opacity: 0.8;
  margin-bottom: 20px;
} 

.empty-state button{ 
  margin:20px auto;
  font-weight: bold; 
  border:1px solid var(--c-u-border); 
  outline: none; 
  border-radius:8px;
  padding: 8px 16px;  
  background-color: var(--c-u-border); 
  color:var(--text-color); 
} 

.empty-state button:hover{
  box-shadow:var(--box-shadow-style-hover);
}
</style>

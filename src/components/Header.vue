<template>
  <header class="header">
    <div class="logo">
      <img :src="logo" alt="Note Nest Logo" />
    </div>
    
  </header>
</template>

<script setup>
import logo from '@/assets/image/logo.svg'
</script>

<style scoped>

.logo img {
  height: 30px;
  border:1px solid red;
  width:100%;
}

</style>

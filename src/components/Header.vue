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
.header {
  width:100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #fff;
  height:100px;
  box-shadow: 0px 4px 8px 0 rgba(29, 34, 38, 0.45);
  margin-bottom:12px;
  position:fixed;
  z-index:10;
}

.logo img {
  height: 40px;
}

</style>

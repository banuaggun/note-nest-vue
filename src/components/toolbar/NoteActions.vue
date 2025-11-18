<template>
  <div class="actions-item">
    <template v-if="note.status === 'archived'">
      <button @click="$emit('unarchive', note.id)">Geri Al</button>
      <button @click="$emit('delete', note.id)">Kalıcı Olarak Sil</button>
    </template>

    <template v-else-if="note.status === 'deleted'">
      <button @click="$emit('restore', note.id)">Çöp Kutusundan Çıkar</button>
      <button @click="$emit('delete', note.id)">Kalıcı Olarak Sil</button>
    </template>

    <template v-else> 
      <div class="item-buttons">
      <button @click="$emit('delete', note.id)">
        <i class="ph ph-trash"></i> 
      </button>
      <button @click="$emit('archive', note.id)">
        <i class="ph ph-box-arrow-down"></i> 
      </button>
      <button @click="$emit('edit', note)">
        <i class="ph ph-pencil-line"></i> 
      </button>  
      </div>
      
    </template>
  </div>
</template>

<script setup>
const props = defineProps({
  note: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.item-buttons{
  display:flex;
  flex-direction: row;
  align-items:center;
}
.item-buttons button{
  width:40px;
  height:40px;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  border:none;
  outline:none;
}

.item-buttons button:hover {
  color: #242424;
  background: #fff;
  border-radius: 50%; 
  cursor: pointer;
   box-shadow: 
			2px 2px 3px rgba(0,0,0,.2), 
			3px 5px 18px rgba(0,0,0,.1),
			4px 5px 13px rgba(0,0,0,.1),
			inset -0.5px -0.5px 5px rgba(0,0,0,.2),
			inset -0.5px -0.5px 1.5px rgba(255,255,255,.6),
			inset 0.5px 0.5px 4px rgba(255,255,255,1),
			inset 2px 2px 12px rgba(0,0,0,.15),
			-2.5px -2.5px 7.5px rgba(255,255,255,.9);
		transform: scale(.98);
}

.item-buttons button i{
  font-size:20px;
}

.item-buttons button:hover i{
  font-size:24px;
}


</style>

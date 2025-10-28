<template>
    <aside class="sidebar">
        <nav class="sidebar-nav">
            <div class="sidebar-nav-links">
                <router-link to="/" class="nav-item" :class="{active:$route.path === '/'}">
                    All Notes
                </router-link>

                <router-link to="/archived" class="nav-item" :class="{active:$route.path === '/archived'}">
                    Archived Notes
                </router-link>
            </div>
        </nav>
    </aside>
</template>

<script setup>

</script>

<style>
.sidebar{
    width:200px;
    height:100vh;
    border:1px solid red;
}
.sidebar-nav-links{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap:20px;
    margin:20px 0 0 30px;
}
</style>
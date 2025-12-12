<template>
  <div class="not-found">
    <EmptyState
      title="Page not found"
      description="The page you are looking for doesn't exist."
      :image="image"
      button-text="Go Home"
      @button-click="goHome"
    />
  </div>
</template>

<script setup>
import EmptyState from "../components/empty-states/EmptyState.vue";
import image from "../assets/image/logo-icon.svg";
import { useRouter } from "vue-router";

const router = useRouter();

function goHome() {
  router.push("/");
}
</script>

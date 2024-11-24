<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const goBackToPreviousPage = () => {
  router.back();
};
</script>

<template>
  <a
    @click="goBackToPreviousPage"
    class="back-to-previous-page d-flex align-items-center justify-content-center bg-white rounded-pill shadow text-decoration-none px-3 py-2 gap-2"
  >
    <ion-icon name="arrow-back-outline" class="fs-4"></ion-icon>
    <span class="fs-5">Voltar</span>
  </a>
</template>

<style scoped>
.back-to-previous-page {
  position: fixed;
  top: 1rem;
  left: 1rem;
  cursor: pointer;
  transition: opacity 0.3s;
  z-index: 999;
}
</style>

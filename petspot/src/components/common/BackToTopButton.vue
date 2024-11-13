<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

const isVisible = ref(false);

const handleScroll = () => {
  // Torna o botão visível se o scroll estiver além de 100px
  isVisible.value = window.scrollY > 100;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <a
    v-if="isVisible"
    @click="scrollToTop"
    class="back-to-top d-flex align-items-center justify-content-center bg-white rounded-circle shadow fs-3 p-1 m-2"
  >
    <ion-icon name="arrow-up-outline"></ion-icon>
  </a>
</template>

<style scoped>
.back-to-top {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  cursor: pointer;
  transition: opacity 0.3s;
}

.back-to-top:hover {
  background-color: #0056b3;
}
</style>

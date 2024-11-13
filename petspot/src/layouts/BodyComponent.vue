<script setup lang="ts">
import { useRoute } from "vue-router";
import LoginCardComponent from "../components/LoginCardComponent.vue";
import RegisterCardComponent from "../components/RegisterCardComponent.vue";

const route = useRoute();
</script>

<template>
  <LoginCardComponent v-if="route.path === '/sign-in'" />
  <RegisterCardComponent v-if="route.path === '/sign-up'" />
</template>

<style scoped></style>

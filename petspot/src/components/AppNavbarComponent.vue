<script setup lang="ts">
import NavBrand from "./shared/NavBrand.vue";
</script>

<template>
  <!-- Início da seção da navbar -->
  <nav
    class="navbar bg-body-tertiary d-flex justify-content-between align-items-center gap-2 top-0 px-4"
  >
    <!-- NavBrand  -->
    <ul
      class="navbar-nav d-flex flex-row align-items-center justify-content-center gap-4"
    >
      <li
        class="nav-item d-md-flex d-none justify-content-center align-items-center gap-2 text-nowrap text-primary"
      >
        <ion-icon name="home" class="fs-4"></ion-icon
        ><a class="nav-link">Tela Inicial</a>
      </li>
      <li
        class="nav-item d-flex d-md-none justify-content-center align-items-center gap-2 text-nowrap text-primary"
      >
        <ion-icon name="home" class="nav-icon"></ion-icon>
      </li>
    </ul>
    <NavBrand />
    <ul
      class="navbar-nav d-flex flex-row align-items-center justify-content-center gap-4"
    >
      <li
        class="nav-item d-md-flex d-none justify-content-center align-items-center gap-2 text-nowrap text-primary"
      >
        <ion-icon name="person-circle" class="fs-2"></ion-icon
        ><a class="nav-link">Minha Conta</a>
      </li>
      <li
        class="nav-item d-flex d-md-none justify-content-center align-items-center gap-2 text-nowrap text-primary"
      >
        <ion-icon name="person-circle" class="nav-icon"></ion-icon>
      </li>
    </ul>
  </nav>
</template>

<style>
/* Navbar Components */
.nav-link {
  color: var(--text-text-color);
}
.nav-icon {
  font-size: 2.5rem;
  color: var(--brand-color);
}
.nav-icon-span {
  font-size: 1.5rem;
  text-decoration: none;
  color: var(--brand-color);
}
@media (max-width: 767.98px) {
  .navbar {
    position: static;
    top: 0;
    z-index: 1020;
  }
}

@media (min-width: 768px) {
  .navbar {
    position: static;
    top: 0;
    width: 100%;
    z-index: 1030;
  }
}
</style>

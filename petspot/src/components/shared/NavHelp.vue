<script setup lang="ts">
import { isAuthenticated } from "../../scripts/ts/utils/authUtils";

// Função para fechar qualquer offcanvas aberto e remover o backdrop manualmente
const closeOffcanvas = () => {
  // Seleciona todos os offcanvas abertos
  const offcanvasElements = document.querySelectorAll(".offcanvas.show");
  offcanvasElements.forEach((element) => {
    const offcanvasInstance = (window as any).bootstrap.Offcanvas.getInstance(
      element as HTMLElement
    );
    if (offcanvasInstance) {
      offcanvasInstance.hide(); // Fecha o offcanvas
    }
  });

  // Cria um listener para o evento de fechamento e remove após ser disparado
  const handleOffcanvasHidden = () => {
    const backdrop = document.querySelector(".offcanvas-backdrop");
    if (backdrop) {
      backdrop.remove(); // Remove o fundo escuro (overlay) manualmente
    }
    document.body.classList.remove("offcanvas-open"); // Remove a classe que desativa o scroll
    document.removeEventListener("hidden.bs.offcanvas", handleOffcanvasHidden); // Remove o listener
  };

  // Adiciona o evento para remover o backdrop após o fechamento
  document.addEventListener("hidden.bs.offcanvas", handleOffcanvasHidden);
};
</script>
<template>
  <ul
    class="navbar-nav d-flex flex-row align-items-center justify-content-center gap-1 gap-md-2 gap-lg-4"
  >
    <li class="nav-item p-2">
      <router-link
        class="d-flex align-items-center text-decoration-none gap-1"
        to="#offCanvasAjuda"
        role="button"
        aria-controls="offCanvasAjuda"
        data-bs-toggle="offcanvas"
      >
        <ion-icon name="help-buoy" class="nav-icon"></ion-icon>
        <span
          class="nav-icon-span text-nowrap d-none d-md-none d-lg-none d-xl-block fs-5"
          >Ajuda</span
        >
      </router-link>
    </li>
    <li class="nav-item p-2">
      <router-link
        class="d-flex align-items-center text-decoration-none gap-1"
        to="#offCanvasRegistrar"
        role="button"
        data-bs-toggle="offcanvas"
      >
        <ion-icon name="person-circle" class="nav-icon"></ion-icon>
        <span
          class="nav-icon-span text-nowrap d-none d-md-none d-lg-none d-xl-block fs-5"
          >Entre</span
        >
      </router-link>
    </li>
  </ul>

  <!-- Offcanvas Ajuda -->
  <div
    class="offcanvas offcanvas-end"
    tabindex="-1"
    id="offCanvasAjuda"
    aria-labelledby="offCanvasAjudaLabel"
  >
    <div class="offcanvas-header">
      <h4 class="offcanvas-title" id="offCanvasAjudaLabel">
        Bem vindo(a) a Central de Ajuda do PetSpot.
      </h4>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Entrar em contato</h5>
          <h6 class="card-subtitle mb-2 text-body-secondary">
            Entre em contato conosco pelo nosso e-mail, e receba ajuda direta de
            nossos desenvolvedores
          </h6>
          <a
            href="mailto:gruposhankara@gmail.com?body=Olá%20preciso%20de%20ajuda,%20poderiam%20me%20ajudar%3F"
            class="btn btn-primary rounded-pill text-white shadow"
            >Enviar email</a
          >
        </div>
      </div>
    </div>
  </div>

  <!-- Offcanvas Registrar -->
  <div
    v-if="!isAuthenticated()"
    class="offcanvas offcanvas-end"
    tabindex="-1"
    id="offCanvasRegistrar"
    aria-labelledby="offCanvasRegistrarLabel"
  >
    <div class="offcanvas-header">
      <h4 class="offcanvas-title" id="offCanvasRegistrarLabel">
        Bem vindo(a) ao PetSpot!
      </h4>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Crie sua conta PetSpot</h5>
          <h6 class="card-subtitle mb-2 text-body-secondary">
            Tenha acesso a todos os recursos do PetSpot, podendo cadastrar seus
            pets e gerenciá-los.
          </h6>
          <router-link
            :to="{ name: 'register-page' }"
            @click="closeOffcanvas"
            class="btn btn-primary rounded-pill text-white shadow"
            >Registrar-se</router-link
          >
        </div>
      </div>
      <br />
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Entre na sua conta PetSpot</h5>
          <h6 class="card-subtitle mb-2 text-body-secondary">
            Acesse o painel administrativo da sua conta PetSpot, e gerencie seus
            Pets.
          </h6>
          <router-link
            :to="{ path: '/sign-in' }"
            @click="closeOffcanvas"
            class="btn btn-primary rounded-pill text-white shadow"
            >Conectar-se</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>

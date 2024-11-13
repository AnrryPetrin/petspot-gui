<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

const isMdOrAbove = ref(false);

// Função para checar o tamanho da tela
const checkWindowSize = () => {
  isMdOrAbove.value = window.innerWidth >= 992;
};

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

const handleLinkClick = (event: Event) => {
  event.preventDefault(); // Evita o comportamento padrão do link
  const targetId = (event.target as HTMLAnchorElement).getAttribute("href");

  if (targetId) {
    // Adiciona um pequeno atraso antes de rolar para o elemento alvo
    setTimeout(() => {
      document.querySelector(targetId)?.scrollIntoView({ behavior: "smooth" });
    }, 300); // Ajuste o valor de 300ms conforme necessário
  }

  closeOffcanvas(); // Fecha o offcanvas imediatamente
};

onMounted(() => {
  checkWindowSize();
  window.addEventListener("resize", checkWindowSize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", checkWindowSize);
});
</script>

<template>
  <div class="m-2">
    <!-- Para telas md e maiores -->
    <ul
      v-if="isMdOrAbove"
      class="navbar-nav me-lg-auto ms-lg-auto d-flex flex-row align-items-center justify-content-center gap-4"
    >
      <li class="nav-item text-nowrap">
        <a class="nav-link" href="#services-title">Nossos Serviços</a>
      </li>
      <li class="nav-item text-nowrap">
        <a class="nav-link" href="#about-us-title">Sobre Nós</a>
      </li>
      <li class="nav-item text-nowrap">
        <a class="nav-link" href="#partners-title">Parceiros</a>
      </li>
      <li class="nav-item text-nowrap">
        <a class="nav-link" href="#footer-section">Fale conosco</a>
      </li>
    </ul>

    <!-- Para telas menores, use o dropdown do Bootstrap -->
    <div v-else>
      <a
        class="d-flex align-items-center text-decoration-none gap-1"
        data-bs-toggle="offcanvas"
        href="#offCanvasMenu"
        role="button"
      >
        <ion-icon name="menu" class="nav-icon"></ion-icon>
      </a>

      <!-- Offcanvas com os itens do menu que abre da esquerda -->
      <div
        class="offcanvas offcanvas-start"
        tabindex="-1"
        id="offCanvasMenu"
        aria-labelledby="offCanvasMenuLabel"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offCanvasMenuLabel">Menu</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav d-flex flex-column gap-4">
            <!-- Não esquecer de atualizar esta lista para ser igual ao MD Device -->
            <li class="nav-item text-nowrap">
              <a
                class="nav-link"
                href="#services-title"
                @click="handleLinkClick($event)"
                >Nossos Serviços</a
              >
            </li>
            <li class="nav-item text-nowrap">
              <a
                class="nav-link"
                href="#about-us-title"
                @click="handleLinkClick($event)"
                >Sobre Nós</a
              >
            </li>
            <li class="nav-item text-nowrap">
              <a
                class="nav-link"
                href="#partners-title"
                @click="handleLinkClick($event)"
                >Parceiros</a
              >
            </li>
            <li class="nav-item text-nowrap">
              <a
                class="nav-link"
                href="#footer-section"
                @click="handleLinkClick($event)"
                >Fale conosco</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estilos adicionais */
.dropdown-menu {
  position: absolute; /* Garante que o dropdown apareça fora da navbar */
  top: 100%; /* Aparece logo abaixo do botão */
  z-index: 1050; /* Garante que fique sobre o conteúdo */
}

.nav-link {
  color: var(--text-text-color);
}
</style>

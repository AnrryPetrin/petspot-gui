<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { login } from "../scripts/ts/utils/authUtils";

const email = ref("");
const password = ref("");
const errorMessage = ref<string[]>([]);

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isFormValid = computed(() => {
  // Limpa o array antes de revalidar
  errorMessage.value = [];

  if (!email.value || !password.value) {
    errorMessage.value.push("Preencha todos os campos.");
  } else {
    if (!emailRegex.test(email.value)) {
      errorMessage.value.push("O email fornecido é inválido.");
    }
  }

  return errorMessage.value.length === 0;
});

// Observa as mudanças dos campos para atualizar as mensagens de erro em tempo real
watch([email, password], () => {
  // O computed isFormValid já atualiza errorMessage
  // Chamamos aqui apenas para recalcular as mensagens
  isFormValid.value;
});

const handleLogin = async () => {
  errorMessage.value = [];

  // Verifica novamente as validações antes de enviar
  if (!isFormValid.value) {
    // Se não é válido, não tenta logar, pois errorMessage já está preenchido
    return;
  }

  const payload = { email: email.value, password: password.value };
  const isLoggedIn = await login(payload);

  if (isLoggedIn) {
    window.location.href = "/home";
  } else {
    errorMessage.value.push("Credenciais inválidas. Tente novamente.");
  }
};
</script>

<template>
  <div class="containter">
    <div
      class="row vh-100 d-flex flex-column align-items-center justify-content-center m-0 gap-2"
    >
      <div
        class="col-md-4 col-12 justify-content-center align-items-center d-flex"
      >
        <img
          src="../assets/images/svg/undraw_dog_walking_re_l61p.svg"
          class="d-flex justify-content-center align-items-center w-50"
        />
      </div>
      <div
        class="col-md-8 col-12 d-flex justify-content-center align-items-center"
      >
        <div class="col-md-6 col-11 rounded rounded-5 shadow p-md-4 p-4">
          <form
            class="row g-4 justify-content-start"
            id="login-form"
            @submit.prevent="handleLogin"
          >
            <h1>Conectar-se</h1>
            <div class="col-md-12">
              <label
                for="email"
                class="form-label d-flex align-items-center gap-2"
                >Email<ion-icon
                  name="mail-outline"
                  class="logincard-label-icon"
                ></ion-icon
              ></label>
              <input
                type="email"
                class="form-control"
                id="email"
                placeholder="anrrypetrin@petspot.com"
                v-model="email"
              />
            </div>
            <div class="col-md-12">
              <label
                for="senha"
                class="form-label d-flex align-items-center gap-2"
                >Senha<ion-icon
                  name="key-outline"
                  class="logincard-label-icon"
                ></ion-icon
              ></label>
              <input
                type="password"
                class="form-control"
                id="senha"
                placeholder="*********"
                v-model="password"
              />
            </div>
            <div class="col-md-12">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="termos-check"
                />
                <label
                  class="form-check-label d-flex align-items-center gap-2"
                  for="termos-check"
                >
                  Mantenha me conectado<ion-icon
                    name="cloudy-outline"
                    size="small"
                  ></ion-icon>
                </label>
              </div>
            </div>
            <div class="col-md-12 d-flex justify-content-between">
              <a
                class="logincard-link d-flex align-items-center gap-2"
                href="forgot-password.html"
                >Esqueci minha senha
                <ion-icon name="hand-left-outline"></ion-icon
              ></a>
              <button
                type="submit"
                class="btn btn-primary rounded rounded-pill shadow text-light logincard-link d-flex align-items-center gap-2"
                id="botao-cadastrar"
              >
                Entrar<ion-icon name="enter" class="logincard-icon"></ion-icon>
              </button>
            </div>
            <!-- Exibição dos erros -->
            <div
              v-if="errorMessage.length"
              class="text-danger text-center mt-3"
            >
              <ul class="text-start">
                <li v-for="(error, index) in errorMessage" :key="index">
                  {{ error }}
                </li>
              </ul>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.logincard-link {
  font-size: 1.1rem;
  transition: transform 0.3s ease;
}
.logincard-icon {
  font-size: 1.5rem;
}
.logincard-label-icon {
  font-size: 1.25rem;
}
.logincard-link:hover {
  transform: scale(1.05);
}
</style>

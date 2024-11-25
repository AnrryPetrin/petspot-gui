<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { registerUser } from "../scripts/ts/utils/registerUtils";

// Campos do formulário
const name = ref("");
const surname = ref("");
const email = ref("");
const username = ref("");
const password = ref("");
const confirmPassword = ref("");
const birthDate = ref("");
const countryCode = ref("+55");
const phone = ref("");
const agreeTerms = ref(false);
const subscribeNewsletter = ref(false); // Restaurado

// Mensagens de erro e sucesso
const errorMessage = ref("");
const successMessage = ref("");

// Regex e validações
const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{2,}$/; // Nome padrão brasileiro
const usernameRegex = /^[a-zA-Z0-9_.]{3,25}$/; // Username padrão de redes sociais
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email rigoroso
const phoneRegex = {
  "+55": /^[1-9]{2}9?\d{8}$/, // Brasil (DDD + telefone)
  "+1": /^\d{10}$/, // EUA
  "+44": /^\d{10}$/, // Reino Unido
};

// Cálculo da força da senha e barra de progresso
const passwordStrength = computed(() => {
  const checks = {
    length: password.value.length >= 8 ? 1 : 0,
    uppercase: /[A-Z]/.test(password.value) ? 1 : 0,
    lowercase: /[a-z]/.test(password.value) ? 1 : 0,
    number: /\d/.test(password.value) ? 1 : 0,
    specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password.value) ? 1 : 0,
  };

  const score =
    checks.length +
    checks.uppercase +
    checks.lowercase +
    checks.number +
    checks.specialChar;

  return {
    score,
    checks,
  };
});

const passwordStrengthClass = computed(() => {
  const { score } = passwordStrength.value;
  if (score <= 2) return "weak"; // Ruim
  if (score === 3) return "medium"; // Média
  if (score === 4) return "good"; // Boa
  return "very-good"; // Muito boa
});

const isPhoneValid = computed(() => {
  const regex = phoneRegex[countryCode.value as keyof typeof phoneRegex];
  return regex ? regex.test(phone.value) : false;
});

const isFormValid = computed(() => {
  return (
    nameRegex.test(name.value) &&
    nameRegex.test(surname.value) &&
    emailRegex.test(email.value) &&
    usernameRegex.test(username.value) &&
    passwordStrength.value.score >= 4 && // Requer força de senha "Boa" ou superior
    new Date().getFullYear() - new Date(birthDate.value).getFullYear() >= 13 &&
    isPhoneValid.value &&
    agreeTerms.value
  );
});

// Mensagem detalhada sobre o motivo da invalidez
const formErrorDetails = ref("");

// Atualiza a mensagem de erro sempre que o formulário se torna inválido
watch(isFormValid, (newVal) => {
  if (!newVal) {
    if (!nameRegex.test(name.value)) {
      formErrorDetails.value = "O nome é inválido ou está vazio.";
    } else if (!nameRegex.test(surname.value)) {
      formErrorDetails.value = "O sobrenome é inválido ou está vazio.";
    } else if (!emailRegex.test(email.value)) {
      formErrorDetails.value = "O email fornecido é inválido.";
    } else if (!usernameRegex.test(username.value)) {
      formErrorDetails.value =
        "O nome de usuário deve ter entre 3 e 25 caracteres.";
    } else if (passwordStrength.value.score < 4) {
      formErrorDetails.value =
        "A senha deve ter no mínimo 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.";
    } else if (
      new Date().getFullYear() - new Date(birthDate.value).getFullYear() <
      13
    ) {
      formErrorDetails.value = "Você deve ter no mínimo 13 anos.";
    } else if (!isPhoneValid.value) {
      formErrorDetails.value = "O telefone informado é inválido.";
    } else if (!agreeTerms.value) {
      formErrorDetails.value = "Você deve concordar com os Termos de Uso.";
    } else {
      formErrorDetails.value =
        "Por favor, preencha todos os campos corretamente.";
    }
  } else {
    formErrorDetails.value = "";
  }
});

// Função para envio do formulário
const handleRegister = async () => {
  errorMessage.value = "";
  successMessage.value = "";

  if (!isFormValid.value) {
    errorMessage.value = "Por favor, corrija os erros antes de enviar.";
    return;
  }

  const payload = {
    name: `${name.value} ${surname.value}`,
    email: email.value,
    password: password.value,
    phone: `${countryCode.value}${phone.value.replace(/\D/g, "")}`,
  };

  const isRegistered = await registerUser(payload);

  if (isRegistered) {
    successMessage.value = "Cadastro realizado com sucesso!";
    window.location.href = "/sign-in";
  } else {
    errorMessage.value = "Erro ao realizar o cadastro. Tente novamente.";
  }
};
</script>

<template>
  <div class="container">
    <div class="row vh-100 d-flex align-items-center justify-content-center">
      <div class="col d-none d-md-block">
        <img
          src="../assets/images/svg/undraw_friends_r511.svg"
          class="d-flex justify-content-center align-items-center w-75"
        />
      </div>
      <div class="col rounded rounded-5 shadow px-4 py-2">
        <form
          class="row justify-content-center justify-content-md-start g-3"
          @submit.prevent="handleRegister"
        >
          <div class="col-md-12 col-9 py-4 py-md-0">
            <h1 class="text-md-start text-center">Cadastre-se</h1>
          </div>
          <!-- Nome -->
          <div class="col-md-5 col-9">
            <label for="nome" class="form-label">Nome</label>
            <input
              type="text"
              class="form-control"
              id="nome"
              placeholder="Anrry"
              v-model="name"
            />
          </div>
          <!-- Sobrenome -->
          <div class="col-md-7 col-9">
            <label for="sobrenome" class="form-label">Sobrenome</label>
            <input
              type="text"
              class="form-control"
              id="sobrenome"
              placeholder="Petrin"
              v-model="surname"
            />
          </div>
          <!-- Email -->
          <div class="col-md-7 col-9">
            <label for="email" class="form-label">Email</label>
            <input
              type="email"
              class="form-control"
              id="email"
              placeholder="anrrypetrin@petspot.com"
              v-model="email"
            />
          </div>
          <!-- Nome de Usuário -->
          <div class="col-md-5 col-9">
            <label for="usuario" class="form-label">Nome de Usuário</label>
            <input
              type="text"
              class="form-control"
              id="usuario"
              placeholder="anrrypetrin.ps"
              v-model="username"
            />
          </div>
          <!-- Senha -->
          <div class="col-md-6 col-9 position-relative">
            <label for="senha" class="form-label">Senha</label>
            <input
              type="password"
              class="form-control"
              id="senha"
              placeholder="*********"
              v-model="password"
            />
            <!-- Barra de força da senha -->
            <div class="password-strength-bar mt-2">
              <div
                v-for="i in 4"
                :key="i"
                :class="{
                  'strength-rectangle': true,
                  active: i <= passwordStrength.score,
                  weak: i <= 1 && passwordStrengthClass === 'weak',
                  medium: i === 2 && passwordStrengthClass === 'medium',
                  good: i === 3 && passwordStrengthClass === 'good',
                  verygood: i === 4 && passwordStrengthClass === 'very-good',
                }"
              ></div>
            </div>
          </div>
          <!-- Confirmar Senha -->
          <div class="col-md-6 col-9">
            <label for="repetir-senha" class="form-label"
              >Repita sua senha</label
            >
            <input
              type="password"
              class="form-control"
              id="repetir-senha"
              placeholder="*********"
              v-model="confirmPassword"
            />
          </div>
          <!-- Data de Nascimento -->
          <div class="col-md-4 col-9">
            <label for="data-nascimento" class="form-label"
              >Data de nascimento</label
            >
            <input
              type="date"
              class="form-control"
              id="data-nascimento"
              v-model="birthDate"
            />
          </div>
          <!-- País e Telefone -->
          <div class="col-md-2 col-9">
            <label for="pais" class="form-label">País</label>
            <select id="pais" class="form-select" v-model="countryCode">
              <option value="+55">(+55)</option>
              <option value="+1">(+1)</option>
              <option value="+44">(+44)</option>
            </select>
          </div>
          <div class="col-md-6 col-9">
            <label for="telefone" class="form-label">Telefone</label>
            <input
              type="tel"
              class="form-control"
              id="telefone"
              placeholder="(12) 34567-8910"
              v-model="phone"
            />
          </div>
          <!-- Checkbox Newsletter -->
          <div class="col-md-8 col-9 py-4">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                id="newsletter-check"
                v-model="subscribeNewsletter"
              />
              <label class="form-check-label" for="newsletter-check">
                Eu quero receber comunicações sobre conteúdo e novidades do
                PetSpot por e-mail e notificação.
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                id="termos-check"
                v-model="agreeTerms"
              />
              <label class="form-check-label" for="termos-check">
                Concordo com os
                <a href="#" style="text-decoration: none">Termos de Uso</a>
                do PetSpot.
              </label>
            </div>
          </div>
          <!-- Botão -->
          <div
            class="col-md-4 col-9 py-4 d-flex justify-content-md-end justify-content-center align-items-end"
          >
            <button
              type="submit"
              class="btn btn-primary rounded-pill text-white shadow"
              id="botao-cadastrar"
              :disabled="!isFormValid"
            >
              Cadastrar-se
            </button>
          </div>
          <!-- Mensagens -->
          <div v-if="successMessage" class="text-success text-center mt-3">
            {{ successMessage }}
          </div>
          <!-- Alerta com motivo -->
          <div v-if="formErrorDetails" class="text-danger text-center mt-3">
            {{ formErrorDetails }}
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.password-strength-bar {
  display: flex;
  gap: 5px;
}
.strength-rectangle {
  width: 25%;
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 2px;
  transition: background-color 0.3s;
}
.strength-rectangle.active.weak {
  background-color: red;
}
.strength-rectangle.active.medium {
  background-color: yellow;
}
.strength-rectangle.active.good {
  background-color: lightgreen;
}
.strength-rectangle.active.verygood {
  background-color: green;
}
</style>

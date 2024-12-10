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
const subscribeNewsletter = ref(false);

// Mensagens de erro e sucesso
const errorMessage = ref<string[]>([]); // Array para múltiplas mensagens de erro
const successMessage = ref("");

// Regex e validações
// Mantemos as regex originais mas não usaremos mais as do telefone, apenas comentaremos.
// const phoneRegex = {
//   "+55": /^[1-9]{2}9?\d{8}$/,
//   "+1": /^\d{10}$/,
//   "+44": /^\d{10}$/,
// };
const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{2,}$/;
const usernameRegex = /^[a-zA-Z0-9_.]{3,25}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Função para formatar o telefone no formato "+55 (XX) XXXXX-XXXX"
const formatPhoneNumber = (countryCode: string, phone: string): string => {
  if (countryCode === "+55" && phone.length >= 10) {
    const ddd = phone.slice(0, 2);
    const resto = phone.slice(2);
    let formatted = `${countryCode} (${ddd}) `;
    if (resto.length > 5) {
      const firstPart = resto.slice(0, resto.length === 9 ? 5 : 4);
      const secondPart = resto.slice(resto.length === 9 ? 5 : 4);
      formatted += `${firstPart}-${secondPart}`;
    } else {
      formatted += resto;
    }
    return formatted;
  }
  return `${countryCode} ${phone}`;
};

// Validação da força da senha
// A senha deve ter de 8 a 20 caracteres, já limitado no input.
// Deve ter caracteres especiais, mas '*' não conta como especial no momento.
// Manteremos o comentário a respeito da remoção do '*'.
const passwordStrength = computed(() => {
  const pass = password.value;

  const checks = {
    length: pass.length >= 8 && pass.length <= 20 ? 1 : 0,
    uppercase: /[A-Z]/.test(pass) ? 1 : 0,
    lowercase: /[a-z]/.test(pass) ? 1 : 0,
    number: /\d/.test(pass) ? 1 : 0,
    // Removemos o '*' do conjunto de caracteres especiais:
    // Antes: /[!@#$%^&*(),.?":{}|<>]/
    // Agora, sem '*': /[!@#$%^&(),.?":{}|<>]/
    // * removido conforme solicitado. Deixando isso comentado.
    specialChar: /[!@#$%^&(),.?":{}|<>]/.test(pass) ? 1 : 0,
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
  if (score <= 2) return "weak";
  if (score === 3) return "medium";
  if (score === 4) return "good";
  return "very-good";
});

// Validações dinâmicas
// Telefone deve ter de 10 a 11 caracteres numéricos, independente do país.
// Antes utilizávamos regex, agora apenas checaremos o length.
// Com isso, o telefone deve conter apenas dígitos. Caso o usuário digite outros caracteres,
// pode-se removê-los antes da validação final. Manteremos simples aqui.
const isPhoneValid = computed(() => {
  const cleanPhone = phone.value.replace(/\D/g, "");
  return cleanPhone.length >= 10 && cleanPhone.length <= 11;
});

const arePasswordsMatching = computed(
  () => password.value === confirmPassword.value
);

const isAdultEnough = computed(() => {
  const birth = new Date(birthDate.value);
  const age = new Date().getFullYear() - birth.getFullYear();
  return age >= 13;
});

const isFormValid = computed(() => {
  return (
    nameRegex.test(name.value) &&
    nameRegex.test(surname.value) &&
    emailRegex.test(email.value) &&
    usernameRegex.test(username.value) &&
    passwordStrength.value.score >= 5 && // Garantindo que a senha seja forte
    arePasswordsMatching.value &&
    isAdultEnough.value &&
    isPhoneValid.value &&
    agreeTerms.value
  );
});

// Atualiza as mensagens de erro
watch(
  [
    name,
    surname,
    email,
    username,
    password,
    confirmPassword,
    birthDate,
    phone,
    agreeTerms,
  ],
  () => {
    errorMessage.value = []; // Limpa mensagens anteriores

    if (name.value && !nameRegex.test(name.value))
      errorMessage.value.push("O nome é inválido.");
    if (surname.value && !nameRegex.test(surname.value))
      errorMessage.value.push("O sobrenome é inválido.");
    if (email.value && !emailRegex.test(email.value))
      errorMessage.value.push("O email fornecido é inválido.");
    if (username.value && !usernameRegex.test(username.value))
      errorMessage.value.push(
        "O nome de usuário deve ter entre 3 e 25 caracteres e caracteres permitidos (letras, números, ponto e sublinhado)."
      );
    if (password.value && passwordStrength.value.score < 5)
      errorMessage.value.push(
        "A senha deve ser forte, com no mínimo 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais (exceto '*')."
      );
    if (confirmPassword.value && !arePasswordsMatching.value)
      errorMessage.value.push("As senhas não coincidem.");
    if (birthDate.value && !isAdultEnough.value)
      errorMessage.value.push("Você deve ter no mínimo 13 anos.");
    if (phone.value && !isPhoneValid.value)
      errorMessage.value.push(
        "O telefone informado é inválido (deve ter entre 10 e 11 dígitos numéricos)."
      );
    if (!agreeTerms.value)
      errorMessage.value.push("Você deve concordar com os Termos de Uso.");
  }
);

// Função para envio do formulário
const handleRegister = async () => {
  errorMessage.value = [];
  successMessage.value = "";

  if (!isFormValid.value) {
    errorMessage.value.push("Por favor, corrija os erros antes de enviar.");
    return;
  }

  const cleanPhone = phone.value.replace(/\D/g, "");
  const formattedPhone = formatPhoneNumber(countryCode.value, cleanPhone);

  const payload = {
    name: `${name.value} ${surname.value}`,
    email: email.value,
    password: password.value,
    phone: formattedPhone,
  };

  const isRegistered = await registerUser(payload);

  if (isRegistered) {
    successMessage.value = "Cadastro realizado com sucesso!";
    window.location.href = "/sign-in";
  } else {
    errorMessage.value.push("Erro ao realizar o cadastro. Tente novamente.");
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
      <div class="col rounded rounded-5 shadow p-4">
        <form
          class="row justify-content-center justify-content-md-start g-3"
          @submit.prevent="handleRegister"
        >
          <div class="col-md-12 col-9 pb-4 pb-md-0 m-0P">
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
              minlength="8"
              maxlength="20"
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
              minlength="10"
              maxlength="11"
              placeholder="(12) 34567-8910"
              v-model="phone"
            />
          </div>
          <!-- Checkbox Newsletter -->
          <div class="col-md-8 col-9 pt-4">
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
            class="col-md-4 col-9 pt-4 d-flex justify-content-md-end justify-content-center align-items-end"
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
          <!-- Lista de erros -->
          <div v-if="errorMessage.length" class="text-danger text-center mt-3">
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

<script setup lang="ts"></script>

<template>
  <div class="containter">
    <div
      class="row vh-100 d-md-flex d-flex flex-md-row flex-column-reverse align-items-center justify-content-center gap-4"
    >
      <div
        class="col-md col-8 justify-content-center align-items-center d-flex"
      >
        <img
          src="../assets/images/svg/undraw_dog_walking_re_l61p.svg"
          class="d-flex justify-content-center align-items-center w-75"
        />
      </div>
      <div class="col-md col-12 d-flex justify-content-center align-items-center">
        <div class="col-md-8 col-11 rounded shadow">
          <form class="row p-md-4 p-2 g-4 justify-content-start" id="login-form">
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
            <div class="col-md-12 py-md-0 py-4 d-flex justify-content-between">
              <a
                class="logincard-link d-flex align-items-center gap-2"
                href="forgot-password.html"
                >Esqueci minha senha
                <ion-icon name="hand-left-outline"></ion-icon
              ></a>
              <button
                type="submit"
                class="btn btn-primary text-light logincard-link d-flex align-items-center gap-2"
                id="botao-cadastrar"
              >
                Entrar<ion-icon name="enter" class="logincard-icon"></ion-icon>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estilo padrão do botão */
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

/* Aumenta o botão em 5% no hover */
.logincard-link:hover {
  transform: scale(1.05);
}
</style>

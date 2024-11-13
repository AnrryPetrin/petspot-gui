<script setup lang="ts"></script>
<template>
  <div class="container">
    <div class="row vh-100 d-flex align-items-center justify-content-center">
      <div class="col d-none d-md-block"></div>
      <div class="col">
        <form class="row justify-content-center justify-content-md-start g-3">
          <div class="col-md-12 col-9 py-4 py-md-0">
            <h1 class="text-md-start text-center">Cadastre-se</h1>
          </div>
          <div class="col-md-5 col-9">
            <label for="nome" class="form-label">Nome</label>
            <input
              type="text"
              class="form-control"
              id="nome"
              placeholder="Anrry"
              aria-label="Anrry"
            />
          </div>
          <div class="col-md-7 col-9">
            <label for="sobrenome" class="form-label">Sobrenome</label>
            <input
              type="text"
              class="form-control"
              id="sobrenome"
              placeholder="Petrin"
              aria-label="Petrin"
            />
          </div>
          <div class="col-md-7 col-9">
            <label for="email" class="form-label">Email</label>
            <input
              type="email"
              class="form-control"
              id="email"
              placeholder="anrrypetrin@petspot.com"
            />
          </div>
          <div class="col-md-5 col-9">
            <label for="usuario" class="form-label">Nome de Usuário</label>
            <input
              type="text"
              class="form-control"
              id="usuario"
              placeholder="anrrypetrin.ps"
            />
          </div>
          <div class="col-md-6 col-9">
            <label for="senha" class="form-label">Senha</label>
            <input
              type="password"
              class="form-control"
              id="senha"
              placeholder="*********"
            />
          </div>
          <div class="col-md-6 col-9">
            <label for="repetir-senha" class="form-label"
              >Repita sua senha</label
            >
            <input
              type="password"
              class="form-control"
              id="repetir-senha"
              placeholder="*********"
            />
          </div>
          <div id="passwordHelpBlock" class="form-text col-md-12 col-9">
            Sua senha deve ter no mínimo 8 caracteres, incluindo uma letra
            maiúscula, uma minúscula, um número e 1 caractere especial.
          </div>
          <div class="col-md-4 col-9">
            <label for="data-nascimento" class="form-label"
              >Data de nascimento</label
            >
            <input type="date" class="form-control" id="data-nascimento" />
          </div>
          <div class="col-md-2 col-9">
            <label for="pais" class="form-label">País</label>
            <select id="pais" class="form-select">
              <option selected>(+55)</option>
              <option>...</option>
            </select>
          </div>
          <div class="col-md-6 col-9">
            <label for="telefone" class="form-label">Telefone</label>
            <input
              type="tel"
              class="form-control"
              id="telefone"
              placeholder="(12) 34567-8910"
            />
          </div>
          <div class="col-md-8 col-9 py-4">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                id="newsletter-check"
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
              />
              <label class="form-check-label" for="termos-check">
                Concordo com os
                <a href="#" style="text-decoration: none">Termos de Uso</a>
                do PetSpot.
              </label>
            </div>
          </div>
          <div
            class="col-md-4 col-9 py-4 d-flex justify-content-md-end justify-content-center align-items-center"
          >
            <button type="submit" class="btn btn-primary" id="botao-cadastrar">
              Cadastrar-se
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<style scoped></style>

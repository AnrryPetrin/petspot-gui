<script setup lang="ts">
import BackToTopButton from "../components/common/BackToTopButton.vue";
import ShapeDivider1 from "../components/common/ShapeDivider1.vue";
import ShapeDivider2 from "../components/common/ShapeDivider2.vue";
import FooterComponent from "../layouts/FooterComponent.vue";
import HeaderComponent from "../layouts/HeaderComponent.vue";
</script>

<template>
  <HeaderComponent />
  <BackToTopButton />
  <section id="presentation-card" class="p-5">
    <div class="container">
      <div
        class="row d-flex flex-column-reverse flex-md-column-reverse flex-lg-column-reverse flex-xl-row justify-content-between align-items-center"
      >
        <div
          class="col-12 col-md-12 col-lg-12 col-xl-6 d-flex flex-column justify-content-center align-items-start gap-3 bg-light p-md-5 p-4 rounded-5 shadow"
        >
          <h1 class="fw-bold">Um lugar para cuidar do seu Pet!</h1>
          <p class="fs-5">
            A <strong>plataforma inteligente</strong> do PetSpot centraliza
            informações dos pets, facilitando o dia a dia dos tutores. Com
            dedicação, conectamos tutores e veterinários, oferecendo acesso
            rápido ao histórico médico dos animais e carteirinhas digitais para
            garantir o <strong>bem-estar</strong> dos pets e a
            <strong>tranquilidade</strong> de seus cuidadores.
          </p>
          <a href="#" class="btn btn-primary"
            ><span class="d-flex align-items-center text-light gap-2"
              >Conheça mais<ion-icon
                name="paw"
                class="button-icon"
              ></ion-icon></span
          ></a>
        </div>
        <div
          class="col-12 col-md-12 col-lg-12 col-xl-6 d-flex justify-content-center align-items-center"
        >
          <div
            class="d-flex d-md-none card bg-primary p-4 rounded-circle shadow border-2 border-light w-75 h-75"
          >
            <img
              src="../assets/images/Cachorro-PNG-1.png"
              alt="Cachorro feliz"
              class="img-fluid rounded-circle"
            />
          </div>
          <div
            class="d-none d-md-flex card bg-primary p-4 rounded-circle shadow border-2 border-light w-75 h-75"
          >
            <img
              src="../assets/images/Cachorro-PNG-1.png"
              alt="Cachorro feliz"
              class="img-fluid rounded-circle"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
  <hr />
  <div class="d-md-block d-none"><ShapeDivider1 /></div>
  <div class="d-md-none d-block"><ShapeDivider2 /></div>
  <section id="services-row" class="p-5">
    <div class="container">
      <div
        class="row d-flex flex-column flex-md-row justify-content-between align-items-center"
      >
        <div
          class="col-12 d-flex justify-content-start align-items-center mb-3"
        >
          <h2 id="services-title" class="fw-bold">
            Serviços
            <hr class="underline-title" />
          </h2>
        </div>
        <div
          class="row d-flex flex-column flex-md-row justify-content-between align-items-center gap-2"
        >
          <div class="col">
            <div
              class="card d-flex align-items-center justify-content-center gap-2 p-2"
            >
              <img
                src="../assets/images/svg/consultation-consulting-laptop-doctor-healthy-medical-care-svgrepo-com.svg"
                class="card-img-top m-3"
                alt="..."
              />
              <div
                class="card-body text-center p-2 d-flex justify-content-around align-items-center flex-column"
              >
                <h5 class="card-title fs-4 fw-semibold">
                  Agendamento de consultas
                </h5>
                <p class="card-text fs-6">
                  Organize consultas e mantenha tudo sob controle de forma
                  prática.
                </p>
              </div>
            </div>
          </div>
          <div class="col">
            <div
              class="card d-flex align-items-center justify-content-center gap-2"
            >
              <img
                src="../assets/images/svg/consultation-consulting-laptop-doctor-healthy-medical-care-2-svgrepo-com.svg"
                class="card-img-top m-3"
                alt="..."
              />
              <div
                class="card-body text-center p-2 d-flex justify-content-around align-items-center flex-column"
              >
                <h5 class="card-title fs-4 fw-semibold">
                  Carteirinha de vacinação
                </h5>
                <p class="card-text">
                  Acompanhe e atualize as vacinas do seu pet de forma digital.
                </p>
              </div>
            </div>
          </div>
          <div class="col">
            <div
              class="card d-flex align-items-center justify-content-center gap-2 p-2"
            >
              <img
                src="../assets/images/svg/clipboard-note-paper-document-hospital-result-medical-svgrepo-com.svg"
                class="card-img-top m-3"
                alt="..."
              />
              <div
                class="card-body text-center p-2 d-flex justify-content-around align-items-center flex-column"
              >
                <h5 class="card-title fs-4 fw-semibold">
                  Consulta à prontuários
                </h5>
                <p class="card-text">
                  Acesse o histórico médico completo do seu pet com apenas
                  alguns cliques.
                </p>
              </div>
            </div>
          </div>
          <div class="col">
            <div
              class="card d-flex align-items-center justify-content-center gap-2 p-2"
            >
              <img
                src="../assets/images/svg/chat-message-medical-health-discussion-talk-bubble-svgrepo-com.svg"
                class="card-img-top m-3"
                alt="..."
              />
              <div
                class="card-body text-center p-2 d-flex justify-content-around align-items-center flex-column"
              >
                <h5 class="card-title fs-4 fw-semibold">
                  Converse facilmente com veterinários
                </h5>
                <p class="card-text">
                  Tire dúvidas e receba orientações diretamente dos veterinários
                  do seu Pet.
                </p>
              </div>
            </div>
          </div>
          <div class="col">
            <div
              class="card d-flex align-items-center justify-content-center gap-2 p-2"
            >
              <img
                src="../assets/images/svg/click-health-internet-cursor-pointer-clicking-medical-svgrepo-com.svg"
                class="card-img-top m-3"
                alt="..."
              />
              <div
                class="card-body text-center p-2 d-flex justify-content-around align-items-center flex-column"
              >
                <h5 class="card-title fs-4 fw-semibold">Cadastre Seu Pet</h5>
                <p class="card-text">
                  Centralize todas as informações do seu pet de forma organizada
                  em um só local.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section id="about-us-section" class="p-5 bg-light">
    <div class="container">
      <div
        class="row d-flex justify-content-start align-items-center text-start"
      >
        <div
          class="col-12 d-flex justify-content-start align-items-center mb-3"
        >
          <h2 id="about-us-title" class="fw-bold">
            Sobre Nós
            <hr class="underline-title" />
          </h2>
        </div>
        <div class="col-12 col-md-10 col-lg-8">
          <p class="fs-5">
            No PetSpot, acreditamos que o cuidado com os pets vai além de
            consultas veterinárias. Nossa plataforma foi criada para facilitar o
            acesso a informações essenciais, conectando tutores e veterinários
            em um ambiente seguro e eficiente. Trabalhamos com dedicação para
            oferecer uma experiência intuitiva e prática, ajudando tutores a
            manterem a saúde e o bem-estar de seus pets em dia.
          </p>
        </div>
      </div>
    </div>
  </section>
  <section id="partners-section" class="p-5 bg-light">
    <div class="container">
      <div
        class="row d-flex justify-content-start align-items-center text-start"
      >
        <div
          class="col-12 d-flex justify-content-start align-items-center mb-3"
        >
          <h2 id="partners-title" class="fw-bold">
            Parcerias
            <hr class="underline-title" />
          </h2>
        </div>
        <p class="text-muted mb-5">
          Valorizamos o apoio incondicional de instituições e profissionais que
          acreditam na missão do PetSpot. Contamos, primeiramente, com o suporte
          essencial do Centro Universitário Facens, que contribuiu com
          conhecimento e recursos durante todo o processo de desenvolvimento.
          Nossa visão para o futuro também envolve parcerias com clínicas
          veterinárias e profissionais de saúde animal que compartilhem o
          compromisso com o bem-estar dos pets e acreditem na iniciativa Open
          Health. Juntos, buscamos construir uma rede confiável que integre e
          facilite o cuidado e acompanhamento da saúde dos animais.
        </p>
        <div class="row justify-content-center align-items-center">
          <!-- Parceiro Facens -->
          <div
            class="col-12 col-md-4 d-flex flex-column align-items-center p-3"
          >
            <img
              src="https://facens.br/wp-content/uploads/2021/03/logo-f.png"
              alt="Facens Logo"
              class="img-fluid mb-3"
              style="width: 150px"
            />
            <p class="text-muted">Centro Universitário Facens</p>
          </div>
          <!-- Parceiro Clínicas -->
          <div
            class="col-12 col-md-4 d-flex flex-column align-items-center p-3"
          >
            <img
              src="../assets/images/svg/hospital-svgrepo-com.svg"
              alt="Clinicas Logo"
              class="img-fluid mb-3"
              style="width: 4rem"
            />
            <p class="text-muted">Clínicas Parceiras</p>
          </div>
          <!-- Parceiro Veterinários -->
          <div
            class="col-12 col-md-4 d-flex flex-column align-items-center p-3"
          >
            <img
              src="../assets/images/svg/veterinarian-svgrepo-com.svg"
              alt="Veterinarios Logo"
              class="img-fluid mb-3"
              style="width: 4rem"
            />
            <p class="text-muted">Veterinários</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section id="footer-section">
    <FooterComponent />
  </section>
</template>

<style scoped>
#presentation-card {
  background-image: url("../assets/images/svg/background-presetation-card.svg");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
.button-icon {
  font-size: 1.2rem;
}

.underline-title {
  opacity: 100%;
  margin: 0.5rem 0 !important; /* Espaçamento vertical */
  border-top: 0.15rem solid var(--brand-color) !important;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08) !important; /* Sombra suave */
}

.card {
  height: 100%;
  min-height: 20rem;
}
.card-img-top {
  aspect-ratio: 1;
  height: 5rem;
  width: auto;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  display: flex;
}
</style>

import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../pages/LandingPage.vue";
import RegisterPage from "../pages/RegisterPage.vue";
import LoginPage from "../pages/LoginPage.vue";
import { isAuthenticated } from "../scripts/ts/utils/authUtils"; // Importando do utilitário

/**
 * Proteção para rotas autenticadas
 */
const authGuard = (_to: any, _from: any, next: any) => {
  if (isAuthenticated()) {
    next();
  } else {
    next("/sign-in"); // Redireciona para a página de login se não autenticado
  }
};

/**
 * Proteção para rotas não autenticadas
 */
const noAuthGuard = (_to: any, _from: any, next: any) => {
  if (!isAuthenticated()) {
    next();
  } else {
    next("/"); // Redireciona para a página inicial se já autenticado
  }
};

const routes = [
  {
    path: "/",
    name: "landing-page",
    component: LandingPage,
  },
  {
    path: "/sign-in",
    name: "login-page",
    component: LoginPage,
    beforeEnter: noAuthGuard,
  },
  {
    path: "/sign-up",
    name: "register-page",
    component: RegisterPage,
    beforeEnter: noAuthGuard,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

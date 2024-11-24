import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../pages/LandingPage.vue";
import RegisterPage from "../pages/RegisterPage.vue";
import LoginPage from "../pages/LoginPage.vue";

export const isAuthenticated = () => {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    return false;
  }

  try {
    const decodedToken = JSON.parse(atob(userId.split(".")[1]));
    const expirationDate = decodedToken.exp * 1000;

    if (Date.now() >= expirationDate) {
      localStorage.clear();
      return false;
    }

    return true;
  } catch (error) {
    console.error("Erro ao decodificar ou verificar o userId:", userId);
    localStorage.clear();
    return false;
  }
};

const authGuard = (_to: any, _from: any, next: any) => {
  if (isAuthenticated()) {
    next();
  } else {
    next("/");
  }
};

const noAuth = (_to: any, _from: any, next: any) => {
  if (!isAuthenticated()) {
    next();
  } else {
    next("/");
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
    beforeEnter: noAuth,
  },
  {
    path: "/sign-up",
    name: "register-page",
    component: RegisterPage,
    beforeEnter: noAuth,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

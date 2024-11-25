import axios from "axios";

export interface LoginPayload {
  email: string;
  password: string;
}

/**
 * Login do usuário
 */
export const login = async (payload: LoginPayload): Promise<boolean> => {
  try {
    const response = await axios.post(
      `${__API_BASE_URL__}/auth/login`,
      payload
    );
    const { token } = response.data;

    // Armazena o token no localStorage
    localStorage.setItem("userToken", token);

    return true;
  } catch (error) {
    console.error("Erro durante o login:", error);
    return false;
  }
};

/**
 * Retorna o token armazenado
 */
export const getToken = (): string | null => {
  return localStorage.getItem("userToken");
};

/**
 * Verifica se o usuário está autenticado
 */
export const isAuthenticated = (): boolean => {
  const token = getToken();

  if (!token) return false;

  try {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const expirationDate = decodedToken.exp * 1000;

    if (Date.now() >= expirationDate) {
      logout(); // Limpa o token expirado
      return false;
    }

    return true;
  } catch (error) {
    console.error("Erro ao decodificar ou verificar o token:", error);
    logout(); // Limpa qualquer token inválido
    return false;
  }
};

/**
 * Faz o logout do usuário
 */
export const logout = (): void => {
  localStorage.removeItem("userToken");
};

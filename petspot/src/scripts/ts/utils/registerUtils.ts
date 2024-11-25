import axios from "axios";

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export const registerUser = async (
  payload: RegisterPayload
): Promise<boolean> => {
  try {
    await axios.post(`${__API_BASE_URL__}/api/owners`, payload);
    return true; // Registro bem-sucedido
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    return false; // Falha no registro
  }
};

import axios, { AxiosError } from 'axios';
import API_URL from '../../../app/api/apiCalorNoche';
import type UserData from './IUserData';

const LOGIN_ENDPOINT : string = "login";

export const loginService = async (userData: UserData) => {

    const credentials = btoa(`${userData.email}:${userData.password}`);
  try {
    const response = await axios.get(`${API_URL}/${LOGIN_ENDPOINT}`, {
      headers: {
        'Authorization': `Basic ${credentials}`
      },
      withCredentials: true 
    });

    return response.data;
  } catch (err: unknown) {
    if (err instanceof AxiosError && err.response?.status === 401) {
      throw { message: "Credenciales incorrectas" };
    }
    throw { message: "Error en el login" };
  }
}

import axios from 'axios';

export function getCookie(cookie_name) {
  const cookies = document.cookie.split(';');
  let retValue = null;
  cookies.forEach(cookie => {
    const parts = cookie.trim().split('=');
    const name = parts[0];
    const value = parts[1];
    if (name === cookie_name) {
      retValue = value;
    }
  });
  return retValue;
}

export async function checkLoginStatus() {
  try {
    await axios.get(`Mettre api call`, {
      headers: {
        "Authorization": getCookie("accessToken")
      }
    });
    return true;
  } catch (error) {
    console.error('Erreur lors de la vérification du statut de connexion:', error);
    return false;
  }
}


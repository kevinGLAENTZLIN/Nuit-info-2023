import axios from 'axios';

export function getLocalStorage(key) {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
}

export function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export async function checkLoginStatus() {
  try {
    await axios.get(`http://127.0.0.1:3009/user`, {
      headers: {
        "Authorization": `Bearer ${getLocalStorage("bearerToken")}`
      }
    });
    return true;
  } catch (error) {
    console.error('Erreur lors de la vérification du statut de connexion:', error);
    return false;
  }
}
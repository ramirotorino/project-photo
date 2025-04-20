const BASE_URL = "http://localhost:3000"; // cambiá si estás en local

// Registro
export const register = ({ name, email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  }).then(checkResponse);
};

// Login
export const login = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

// Validación del token
export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

// Función común para validar respuestas
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((err) => {
    throw new Error(err.message || "Ocurrió un error");
  });
}

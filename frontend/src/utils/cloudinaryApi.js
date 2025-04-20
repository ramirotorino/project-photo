export function getPhotos() {
  return fetch("http://localhost:3000/photos", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`, // 🟡 asegúrate de que el token está presente
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Error al obtener fotos desde el servidor");
    }
    return res.json();
  });
}

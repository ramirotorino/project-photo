# 📸 Proyecto Final - Etapa 2

Aplicación full-stack para un fotógrafo profesional. El proyecto está dividido en dos partes: un frontend en React y un backend con Node.js + Express.

## 📁 Estructura del Repositorio

```
project-photo/
├── backend/      → API REST con Express y MongoDB
├── frontend/     → Aplicación React con autenticación
```

---

## 🚀 ¿Qué incluye esta etapa?

✔️ Registro de usuario (`/signup`)  
✔️ Inicio de sesión (`/signin`)  
✔️ Almacenamiento de token JWT  
✔️ Cierre de sesión  
✔️ Header dinámico según estado de sesión  
✔️ Rutas protegidas (`/mis-fotos`)  
✔️ Popup de login y registro  
✔️ Modal `InfoTooltip` con efecto glass  
✔️ Validación de formularios  
✔️ Componentes reutilizables

---

## 🔧 Cómo ejecutar el proyecto localmente

### 1. Backend (API)

```bash
cd backend
npm install
npm run dev
```

🔐 Requiere archivo `.env` con:

```env
JWT_SECRET=una_clave_secreta_segura
```

La API corre por defecto en: `http://localhost:3000`

---

### 2. Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

La aplicación se ejecuta en: `http://localhost:5174`

---

## 📦 Tecnologías utilizadas

- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Base de datos**: MongoDB
- **Autenticación**: JWT
- **Estilos**: CSS modular con BEM
- **Logging**: Morgan + Winston

---

## 🗂️ Organización

- `frontend/src/components/` → Componentes modales y visuales
- `backend/routes/` → Autenticación, usuarios y fotos
- `backend/middleware/` → Autenticación JWT, errores y logging
- `utils/auth.js` → Comunicación frontend con backend

---

## ✅ Estado del Proyecto

✔️ Etapa 1: Completada  
✔️ Etapa 2: Login, registro, rutas protegidas y funcionalidades principales ✅

---

## 🧪 Pruebas

- Crear usuario → aparece mensaje con `InfoTooltip`
- Iniciar sesión → se guarda token y cambia el encabezado
- Acceso a `/mis-fotos` → permitido solo si estás logueado
- Cierre de sesión → elimina token del `localStorage`

---

## 📎 Autor

Ramiro Sosa  
[GitHub - ramirotorino](https://github.com/ramirotorino)

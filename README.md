# Plataforma de Retos - Frontend
Este es el frontend de la **Plataforma de Retos**, una aplicación diseñada para gestionar retos, categorías, respuestas y puntuaciones de usuarios. La plataforma permite a los usuarios participar en retos y mejorar su puntuación, mientras que los administradores pueden gestionar usuarios, categorías y retos.

El frontend está desarrollado en **React** y se comunica con un backend en Laravel a través de una API REST. La autenticación se maneja mediante **JWT (JSON Web Tokens)**.

## 🌍 Enlace del proyecto
🔗 https://proyectoretos-frontend.onrender.com

## 🚀 Propósito del Proyecto
El propósito de esta plataforma es ofrecer una experiencia interactiva para que los usuarios puedan:
- Participar en retos y mejorar su puntuación.
- Explorar categorías y consultar sus estadísticas.
- Los administradores pueden gestionar usuarios, categorías y retos.

## 🛠️ Requisitos del Entorno de Desarrollo
Antes de comenzar, asegúrate de tener instalados los siguientes requisitos:

- **Node.js** (v16 o superior): [Descargar Node.js](https://nodejs.org/)
- **npm** (v8 o superior): Incluido con Node.js.
- **Backend Laravel**: Asegúrate de que el backend esté configurado y ejecutándose. Consulta el README del backend para más detalles.

### Configuración del Proyecto
1. Clona el repositorio:
 git clone https://github.com/tu-usuario/proyectoRetosFrontend.git
 cd proyectoRetosFrontend

2. Instala las dependencias:
 npm install

## Ejecución del Proyecto
1. Inicia el servidor de desarrollo:
 npm start

2. Abre el navegador:
 Ve a http://localhost:5173 para ver la aplicación en ejecución.

3. Asegúrate de que el backend esté ejecutándose en http://localhost:8000 o la URL configurada en REACT_APP_API_URL. 

## Estructura del proyecto
src/
├── components/         # Componentes reutilizables (Navbar, Sidebar, etc.)
├── pageauth/           # Páginas relacionadas con autenticación (Dashboard, Login, etc.)
├── pageuser/           # Páginas para usuarios (Retos, Categorías, etc.)
├── pageadmin/          # Páginas para administradores (Gestión de usuarios, retos, etc.)
├── Config.jsx          # Configuración de la API y servicios
├── App.jsx             # Configuración de rutas principales
└── index.jsx           # Punto de entrada de la aplicación

## Licencia
Este proyecto está bajo la licencia MIT.

## Soporte
Si tienes preguntas o necesitas ayuda, no dudes en abrir un Issue en el repositorio o contactarme a través de mi correo electrónico.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

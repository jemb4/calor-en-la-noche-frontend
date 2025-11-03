# 🌙 Calor en la Noche - Frontend

Esta es la **página web** de la **Asociación Calor en la Noche**, desarrollada con **React + Vite + TypeScript**.  
Está pensada para **dar visibilidad a la labor de la asociación** y facilitar la gestión de **documentos de transparencia** de manera sencilla e intuitiva.

Este repositorio corresponde al **frontend** del proyecto.  
👉 El backend se encuentra en este repositorio: [calor-en-la-noche-backend](https://github.com/jemb4/calor-en-la-noche-backend)

---

## 🚀 Funcionalidades principales

- 📄 Gestión de **documentos de transparencia** (subida, visualización, eliminación)
- 🤝 Información sobre **formas de colaboración** (voluntariado, donaciones, socios)
- 📱 Diseño **responsive** adaptado a todos los dispositivos
- 🔒 Panel de **administración** protegido
- ⚡ Aplicación **rápida y moderna** gracias a **Vite + React**

---

## 🗒️ Páginas principales

- 🏠 Home
- 🫂 Nosotros
- 🪟 Transparencias
- 🗞️ Noticias (deshabilitada por ahora)
- 🔥 Colabora

---

## ⚙️ Requisitos previos

Antes de comenzar asegúrate de tener instalado en tu máquina:

- [Node.js](https://nodejs.org/) (versión recomendada: 18 o superior)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)

---

## 📥 Instalación y despliegue local

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/jemb4/calor-en-la-noche-frontend.git
   ```
2. \*Ir al directorio\*\*
   ```bash
    cd calor-en-la-noche-frontend
   ```
3. **Instalar dependencias**
   ```bash
    npm install
   ```
4. **Ejecutar en modo desarrollo**

   ```bash
   npm run dev
   ```

   El proyecto se abrirá en:
   👉 http://localhost:5173

## 🔗 Conexión con el Backend

Este frontend se conecta con la API del backend desarrollada en Spring Boot.
📌 Repositorio: [calor-en-la-noche-backend](https://github.com/jemb4/calor-en-la-noche-backend)

El backend se encarga de:

Gestión de documentos PDF
Autenticación de usuarios
Endpoints REST para el panel de administración

---

## Arquitectura por features

```bash
📦 calor-en-la-noche/
│
├── .vscode/                     # Configuración de VSCode (snippets, launch, etc.)
├── node_modules/                # Dependencias de Node.js
├── public/                      # Archivos estáticos públicos (favicon, index.html)
│
├── src/                         # Código fuente principal
│   ├── app/                     # Configuración global de la aplicación
│   │   ├── api/                 # Configuración base de Axios, interceptores
│   │   ├── helper/              # Funciones auxiliares (por ejemplo Base64)
│   │   ├── routes/              # Configuración de rutas (react-router)
│   │   ├── store/               # Estado global (contexto, redux o zustand)
│   │   ├── types/               # Tipos globales reutilizables
│   │   └── App.tsx              # Punto principal de la aplicación
│   │   └── __tests__/           # Tests globales (configuración, rutas, store)
│
│   ├── shared/                  # Componentes y estilos compartidos
│   │   ├── assets/              # Recursos globales (logos, iconos genéricos)
│   │   ├── components/          # Componentes genéricos (botones, modales comunes)
│   │   ├── layouts/             # Layouts generales (Header, Footer, Dashboard)
│   │   └── styles/              # CSS/Tailwind global o temas
│
│   ├── features/                # Cada "feature" o módulo funcional independiente
│   │   ├── about-us/            # Página “Nosotros”
│   │   │   ├── components/      # Componentes específicos de esta sección
│   │   │   ├── pages/           # Páginas completas de la sección
│   │   │   └── services/        # Lógica o llamadas HTTP si las hubiera
│   │   │
│   │   ├── auth/                # Autenticación (login/logout)
│   │   │   ├── components/      # Modal Login, formularios
│   │   │   ├── services/        # authService.ts, tokenStorage.ts, etc.
│   │   │   └── hooks/           # useAuth, useUser
│   │   │
│   │   ├── collaborate/         # Página “Colabora con nosotros”
│   │   │   ├── components/
│   │   │   └── pages/
│   │   │
│   │   ├── home/                # Página principal (landing)
│   │   │   ├── components/
│   │   │   └── pages/
│   │   │
│   │   └── transparency/        # Módulo de PDFs y transparencia
│   │       ├── assets/          # Íconos, imágenes locales
│   │       ├── components/      # Modales y cards
│   │       ├── pages/           # Página Transparency.tsx
│   │       └── services/        # pdfService.ts
│   │
│   └── main.tsx                 # Punto de entrada ReactDOM
│
├── .eslintrc.js                 # Configuración de ESLint
├── .gitignore                   # Archivos ignorados por git
├── package.json                 # Dependencias y scripts
├── tailwind.config.js           # Configuración de Tailwind
├── tsconfig.json                # Configuración TypeScript global
├── tsconfig.app.json            # Configuración para el código fuente
├── tsconfig.node.json           # Configuración para Node y Vite
├── vite.config.ts               # Configuración de Vite
└── README.md                    # Documentación del proyecto


```

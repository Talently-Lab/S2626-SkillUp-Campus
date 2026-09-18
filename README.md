# 🎓 SkillUp Campus

**SkillUp Campus** es una startup de tecnología educativa (EdTech) orientada a la digitalización y centralización de la gestión académica. La plataforma reemplaza los procesos manuales (planillas de cálculo y formularios dispersos) por una solución web integral que optimiza la experiencia tanto de los estudiantes como de los administradores.

---

## 🎯 Alcance del Proyecto (MVP)

El objetivo central es desplegar un producto mínimo viable (MVP) estable y funcional estructurado en dos paneles principales:

* **Módulo de Estudiantes:** Registro e inicio de sesión, catálogo público de cursos, proceso de inscripción y panel personal para el seguimiento de clases.
* **Módulo de Administradores:** Panel de control (CRUD) para la creación, edición y eliminación de cursos, junto con la gestión básica de usuarios.

> ⚠️ **Fuera de alcance (Fase 1):** Esta etapa inicial prioriza la funcionalidad del núcleo operativo, excluyendo pasarelas de pago, app móvil, streaming nativo de video, chats internos, certificados y notificaciones automatizadas.

---

## 👥 Equipo de Trabajo e Integrantes

* **Project Manager:** [Marcia Torre]
* **Diseñador UX/UI:** [Daniela Rosales]
* **Desarrollador Backend (NodeJs):** [Leonardo Gonzalez]
* **Desarrollador Backend (NodeJs):** [Brisa Naiara Giavedoni]
* **Desarrollador Frontend (React):** [Kevin Huayta]
* **Data Analyst:** [Abril Milagros Palacin]
* **Especialista de Marketing:** [Jorgelina Riquelme]
* **Tester QA Manual:** [Mayra Elizabeth Ferreira]

---

## 🛠️ Stack Tecnológico

* **Backend:** Node.js, Express, PostgreSQL
* **Frontend:** React + Vite, CSS (Tailwind / Vanilla)
* **QA:** Postman, Google Sheets
* **Data:** PostgreSQL / SQL, Power BI / Looker Studio, Excel
* **Diseño & UX/UI:** Figma, Illustrator, Photoshop
* **Gestión & Comunicación:** Trello / Notion, Discord, GitHub

---

## 📁 Estructura del Repositorio

```text
skillup-workspace/
├── backend/                  # API REST (Node.js + Express)
│   ├── src/                  # Controladores, modelos, rutas
│   ├── .env.example
│   └── package.json
│
├── frontend/                 # Aplicación Web (React)
│   ├── src/                  # Componentes, páginas, estilos
│   └── index.html
│
├── docs/                     # Documentación general del proyecto
│   ├── pm/                   # Cronogramas, minutas de reunión
│   ├── qa/                   # Planes de prueba, reporte de bugs
│   └── api/                  # Colección de Postman exportada
│
├── product_y_growth/         # Áreas de Negocio
│   ├── marketing/            # Estrategia GTM, copys, grillas
│   ├── data/                 # Datasets limpios, links a Dashboards
│   └── design/               # Manual de marca, assets exportados (png/svg)
│ 
└── README.md                 # Presentación del proyecto para el portfolio
```


## ⚡ Guía de Instalación y Ejecución Local

### Clonar el Repositorio
Para obtener una copia local del código fuente, ejecuta en tu terminal:

`git clone https://github.com/S2626-SkillUp-Campus/skillup-campus.git`

`cd skillup-campus`
---

### Levantamiento del Backend (API REST)

1. **Ubicación:** Accede al directorio del servidor:
   `cd backend`

2. **Instalación de Dependencias:** Instala los paquetes requeridos por Node.js:
   `npm install`

3. **Variables de Entorno:** Crea un archivo llamado `.env` en la raíz de la carpeta `backend/` tomando como referencia el archivo `.env.example`:
   `cp .env.example .env`

4. **Ejecución del Servidor:** Inicia la aplicación en modo desarrollo:
   `npm run dev` (Ejecuta el servidor con Nodemon en modo de escucha continua)
    Aclaración:(en producción se utilizará el comando `npm start`)

> ℹ️ **Nota de red:** Una vez iniciado, la API REST estará disponible para recibir peticiones HTTP en la dirección `http://localhost:3000`.

---

### Levantamiento del Frontend (Aplicación Web)

1. **Ubicación:** En una nueva ventana de terminal, dirígete a la carpeta del cliente:
   `cd frontend`

2. **Instalación de Dependencias:** Instala las librerías del cliente:
   `npm install`

3. **Ejecución de la Aplicación:** Inicia el servidor de desarrollo web:
   `npm run dev`

   > ℹ️ **Nota de red:** Una vez iniciado, la API REST estará disponible para recibir peticiones HTTP en la dirección `http://localhost:5173`.



# 🤝 Flujo de Trabajo y Convenciones de Git

Para mantener un historial de cambios ordenado y profesional, el equipo sigue el estándar de **Conventional Commits** y una estrategia basada en ramas temáticas.

---

## 🌿 Estructura de Ramas

* **feature/nombre-de-la-funcionalidad**: Desarrollo de nuevos módulos o componentes.
* **fix/descripcion-del-bug**: Corrección de errores o fallos en el sistema.
* **docs/tipo-de-documentacion**: Modificaciones en el README o documentación general.
* **refactor/area-modificada**: Mejoras de código sin alterar la lógica de negocio.

---

## Comandos Git para el WorkFlow diario(lo que más vas a usar)
* **git checkout -b feature/nombre-de-la-feature **: Creas una rama dividida de la main(trabajas por fuera, una copia del programa original)
* **git add .**: Prepara el espacio para transportar la rama
* **git commit -m "feat: descripción clara del cambio" **: Commit de la rama, se detalla lo que se hizo en el trabajo de la rama. 
* **git push origin feature/nombre-de-la-feature**: Creas el pull request (se confirma en GitHub) para hacer el merge (fusion) de la rama con la main(rama principal)

## 💬 Formato de Commits

| Tipo | Descripción | Ejemplo de Mensaje |
| :--- | :--- | :--- |
| **feat** | Incorporación de una nueva característica | `git commit -m "feat: agregar panel de gestion de cursos"` |
| **fix** | Solución a un error o bug detectado | `git commit -m "fix: corregir ruta de navegacion en login"` |
| **docs** | Actualización o creación de documentación | `git commit -m "docs: actualizar guia de ejecucion en readme"` |
| **refactor** | Reestructuración interna del código | `git commit -m "refactor: optimizar conexion a base de datos"` |

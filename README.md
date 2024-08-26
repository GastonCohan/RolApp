                RolApp - Getting Started

Este proyecto es una aplicación web desarrollada con React que gestiona roles y productos. Fue construida usando Create React App.

                Estructura del Proyecto

La estructura de carpetas sigue una organización modular para facilitar la escalabilidad y el mantenimiento del código. A continuación se describe la estructura principal:

src/
│
├── Components/
│   ├── Header/
│   │   ├── header.tsx
│   │   ├── header-styles.css
│   ├── LoadingSpinner/
│   │   ├── loadingSpinner.tsx
│   │   ├── loadingSpinner-styles.css
│   ├── Product/
│   │   ├── product.tsx
│   │   ├── product-styles.css
│   └── SkeletonProduct/
│       ├── skeletonProduct.tsx
│       ├── skeletonProduct-styles.css
│
├── Context/
│   └── authContext.tsx
│
├── Helpers/
│   ├── firebaseConfig.ts
│   ├── productHelper.ts
│
├── Interfaces/
│   └── product-interface.ts
│
├── Pages/
│   ├── AdminPanel/
│   │   ├── adminPanel.tsx
│   │   ├── adminPanel-styles.css
│   ├── Home/
│   │   ├── home.tsx
│   │   ├── home-styles.css
│
├── App.tsx
├── index.tsx
├── index.css
└── reportWebVitals.ts

            Descripción de Carpetas y Archivos

Components/: Contiene los componentes reutilizables de la aplicación. Cada componente tiene su propia carpeta con sus archivos de lógica (tsx) y estilos (css).

Context/: Define los contextos globales como el de autenticación (authContext.tsx) que se utiliza para gestionar el rol del usuario en toda la aplicación.

Helpers/: Contiene archivos auxiliares como la configuración de Firebase y funciones para manipular datos, como productHelper.ts para interactuar con la base de datos.

Interfaces/: Define las interfaces TypeScript para tipar los objetos utilizados en la aplicación.

Pages/: Incluye las vistas principales de la aplicación (Home y AdminPanel), organizadas en carpetas con sus correspondientes archivos de lógica y estilos.

App.tsx: Punto de entrada principal de la aplicación donde se configuran las rutas.

index.tsx: Archivo raíz donde se inicia React y se configura el enrutador.

                Requisitos Previos

Antes de ejecutar la aplicación, asegúrate de tener instalado:

Node.js (versión 14 o superior)
npm o yarn

                Instalación
Para instalar las dependencias del proyecto, ejecuta:
npm install
o si prefieres usar Yarn:
yarn install

            Ejecución de la Aplicación
Para ejecutar la aplicación en modo de desarrollo:
npm start
o con Yarn:
yarn start

Esto abrirá la aplicación en tu navegador en http://localhost:3000.

La aplicación se recargará automáticamente si realizas cambios en el código. También podrás ver cualquier error o advertencia en la consola.





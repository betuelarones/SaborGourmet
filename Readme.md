# SaborGourmet

Aplicación full‑stack para la gestión de un restaurante.

El frontend está desarrollado con React y Vite. El backend utiliza Spring Boot (Java) como API REST.

<!-- Logos -->
<p align="left">
	<img alt="React" src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" width="120" style="margin-right:24px" />
	<img alt="Spring Boot" src="https://upload.wikimedia.org/wikipedia/commons/4/44/Spring_Framework_Logo_2018.svg" width="140" />
</p>

## Tecnologías usadas

# SaborGourmet

Aplicación full‑stack para la gestión de un restaurante gourmet: gestión de productos/insumos, clientes, mesas, pedidos y compras. Está pensada como proyecto educativo/práctico que combina un front-end en React con un back-end en Spring Boot.

![React](https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg)
![Spring Framework](https://upload.wikimedia.org/wikipedia/commons/4/44/Spring_Framework_Logo_2018.svg)
![MySQL](https://upload.wikimedia.org/wikipedia/en/d/dd/MySQL_logo.svg)
![Postman](https://upload.wikimedia.org/wikipedia/commons/8/87/Postman_%28software%29_logo.svg)

## Resumen

SaborGourmet es una plataforma compuesta por:

- Frontend (cliente): interfaz React (Vite) para la gestión diaria desde el navegador.
- Backend (API): servicios REST desarrollados con Spring Boot que exponen endpoints para operaciones CRUD y autenticación con JWT.

La intención del proyecto es servir como ejemplo práctico de integración entre React y Spring Boot, con conceptos como autenticación, manejo de datos relacionales y diseño de endpoints REST.

## Características principales

- Gestión de clientes (crear, editar, listar, eliminar)
- Gestión de platos e insumos
- Gestión de mesas y pedidos (pendientes / para pagar)
- Registro de compras a proveedores
- Autenticación de usuarios con JWT (login / registro)
- Reportes básicos (ventas)

## Tecnologías usadas

- Frontend
	- React (JSX)
	- Vite (dev server / bundler)
	- Hooks personalizados (ej. `useAuth`)
	- Axios o fetch para llamadas HTTP a la API

- Backend
	- Java 17+
	- Spring Boot (Web, Security, Data JPA)
	- Spring Security + JWT para autenticación
	- Spring Data JPA (Hibernate)
	- Maven (gestor de dependencias y build)

- Herramientas y utilidades
	- (Opcional) Testcontainers para pruebas de integración con DB en contenedores
	- JUnit Jupiter (JUnit 5) como framework de pruebas para el backend

## Estructura del repositorio (resumen)

```
Backend/semana12
	├─ src/main/java/com/tecsup/semana12/        # Código Java / Spring Boot
	├─ src/main/resources/                      # application.properties, recursos
	└─ pom.xml                                  # Maven

Fronted/restaurant-fronted
	├─ src/                                     # React app (App.jsx, páginas, componentes)
	└─ package.json                              # dependencias frontend
```

## Configuración rápida y ejecución

Requisitos previos:

- Java 17+
- Node 16+ (para el frontend)
- Docker (opcional)

Backend (Spring Boot):

1. Asegúrate de configurar la base de datos en `Backend/semana12/src/main/resources/application.properties`.
	 Ejemplo mínimo (PostgreSQL):

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/saborgourmet
spring.datasource.username=tu_usuario
spring.datasource.password=tu_contraseña
# SaborGourmet

Aplicación full‑stack para la gestión de un restaurante gourmet: gestión de productos/insumos, clientes, mesas, pedidos y compras. Está pensada como proyecto educativo/práctico que combina un front-end en React con un back-end en Spring Boot.

![React](https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg)
![Spring Framework](https://upload.wikimedia.org/wikipedia/commons/4/44/Spring_Framework_Logo_2018.svg)

## Resumen

SaborGourmet es una plataforma compuesta por:

- Frontend (cliente): interfaz React (Vite) para la gestión diaria desde el navegador.
- Backend (API): servicios REST desarrollados con Spring Boot que exponen endpoints para operaciones CRUD y autenticación con JWT.

La intención del proyecto es servir como ejemplo práctico de integración entre React y Spring Boot, con conceptos como autenticación, manejo de datos relacionales y diseño de endpoints REST.

## Características principales

- Gestión de clientes (crear, editar, listar, eliminar)
- Gestión de platos e insumos
- Gestión de mesas y pedidos (pendientes / para pagar)
- Registro de compras a proveedores
- Autenticación de usuarios con JWT (login / registro)
- Reportes básicos (ventas)

## Tecnologías usadas

- Frontend
  - React (JSX)
  - Vite (dev server / bundler)
  - Hooks personalizados (ej. `useAuth`)
  - Axios o fetch para llamadas HTTP a la API

- Backend
  - Java 17+
  - Spring Boot (Web, Security, Data JPA)
  - Spring Security + JWT para autenticación
  - Spring Data JPA (Hibernate)
  - Maven (gestor de dependencias y build)

- Herramientas y utilidades
  - (Opcional) Testcontainers para pruebas de integración con DB en contenedores
  - JUnit Jupiter (JUnit 5) como framework de pruebas para el backend

## Estructura del repositorio (resumen)

```
Backend/semana12
  ├─ src/main/java/com/tecsup/semana12/        # Código Java / Spring Boot
  ├─ src/main/resources/                      # application.properties, recursos
  └─ pom.xml                                  # Maven

Fronted/restaurant-fronted
  ├─ src/                                     # React app (App.jsx, páginas, componentes)
  └─ package.json                              # dependencias frontend
```

## Configuración rápida y ejecución

Requisitos previos:

- Java 17+
- Node 16+ (para el frontend)
- Docker (opcional)

Backend (Spring Boot):

1. Asegúrate de configurar la base de datos en `Backend/semana12/src/main/resources/application.properties`.
   Ejemplo mínimo (PostgreSQL):

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/saborgourmet
spring.datasource.username=tu_usuario
spring.datasource.password=tu_contraseña
spring.jpa.hibernate.ddl-auto=update
server.port=8080
```

2. Desde la carpeta `Backend/semana12` construir y ejecutar con el wrapper de Maven:

```powershell
./mvnw clean package
./mvnw spring-boot:run
```

Frontend (React + Vite):

1. Entrar en `Fronted/restaurant-fronted` y instalar dependencias:

```powershell
cd Fronted/restaurant-fronted
npm install
```

2. Ejecutar la app en modo desarrollo:

```powershell
npm run dev
```

Por defecto el frontend se comunica con el backend en `http://localhost:8080`; ajusta la URL base en `apiService.js` si fuera necesario.

## Endpoints de ejemplo

- POST `/api/auth/login` — iniciar sesión
- GET `/api/clientes` — listar clientes
- POST `/api/pedidos` — crear pedido

(Revisa los controladores en `Backend/semana12/src/main/java/com/tecsup/semana12/controller` para la lista completa de rutas y formatos.)

## Notas sobre pruebas

No se han añadido tests en este cambio según lo solicitado. El proyecto ya está preparado para usar JUnit Jupiter en el módulo backend; si más adelante quieres que añada pruebas unitarias o de integración, puedo implementarlas.

## Contribución

- Crea una rama `feature/tu-cambio` y abre un pull request.
- Añade tests que cubran cambios importantes.

## Licencia

Agrega un archivo `LICENSE` en la raíz si deseas publicar bajo una licencia (ej. MIT).

----
Última actualización: 9 de noviembre de 2025


----
Última actualización: 9 de noviembre de 2025

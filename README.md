# LegalSuite Backend

## Descripción
API REST para la gestión de abogados y casos legales en un bufete.  
Incluye autenticación con JWT, manejo de migraciones y seeders con Sequelize, y soporte para operaciones transaccionales.

Este proyecto fue desarrollado como prueba técnica backend usando Node.js, Express y PostgreSQL con Docker.

---

## Nombre del Proyecto
**legalsuite-backend**

---

## Prerequisitos
- Node.js 18+
- npm
- Docker
- Docker Compose

---

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/tu-usuario/legalsuite-test-backend-pt-julieth-perdomo.git
cd legalsuite-backend
```

2. Instalar dependencias:

```bash
npm install
```

3. Crear archivo `.env` basado en `.env.example`:

```env
DB_USER=xxx
DB_PASSWORD=xxx
DB_NAME=xxx
DB_HOST=xxx
DB_PORT=xxx
JWT_SECRET=xxx
```

4. Levantar PostgreSQL con Docker:

```bash
docker-compose up -d
```

---

## Migraciones y Seeders

### Ejecutar migraciones
```bash
npx sequelize-cli db:migrate
```

### Ejecutar seeders
```bash
npx sequelize-cli db:seed:all
```

### Resetear base de datos
```bash
npm run db:reset
```

Este comando:
- Elimina todas las migraciones
- Vuelve a crearlas
- Ejecuta todos los seeders

Ideal para desarrollo y pruebas.

---

## Scripts

```json
"scripts": {
  "start": "node src/server.js",
  "dev": "nodemon src/server.js",
  "db:reset": "npx sequelize-cli db:migrate:undo:all && npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all"
}

## Seguridad
- Autenticación JWT
- Passwords encriptados con bcrypt
- Variables de entorno protegidas con `.env`
- `.env` excluido del repositorio

---

## Base de Datos

- PostgreSQL usando Docker
- Sequelize ORM
- Migraciones versionadas
- Seeders con datos de prueba

---

## Flujo de Desarrollo

1. Clonar proyecto
2. Instalar dependencias
3. Configurar `.env`
4. Levantar Docker
5. Ejecutar migraciones
6. Ejecutar seeders
7. Iniciar servidor

---

## Ejecución

### Desarrollo
```bash
npm run dev
```

### Producción
```bash
npm start
```

---

## Documentación
- Swagger: `/api/docs`
- (http://localhost:3000/api/docs/#/)

---

## Autor
Julieth Perdomo

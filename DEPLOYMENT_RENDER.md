# Guía de Despliegue en Render

## Pasos para Desplegar en Render

### 1. Commitear los cambios

```bash
git add .gitignore render.yaml src/config/firebaseAdmin.ts package.json dist/
git commit -m "Prepare project for Render deployment"
git push
```

### 2. Crear Web Service en Render

1. Ve a [dashboard.render.com](https://dashboard.render.com)
2. Clic en **"New +"** → **"Web Service"**
3. Conecta tu repositorio de GitHub
4. Render detectará automáticamente el archivo `render.yaml` y configurará el servicio

### 3. Configurar Variables de Entorno

En el dashboard de Render, ve a la sección **"Environment"** y agrega estas variables (obtén los valores de tu archivo `serviceAccountKey.json`):

**Variables Obligatorias:**
- `FIREBASE_PROJECT_ID`: `dspm-proyectofinal`
- `FIREBASE_PRIVATE_KEY`: La clave privada completa (incluye los saltos de línea `\n`)
- `FIREBASE_PRIVATE_KEY_ID`: `b51384b453b6688d76b31637e065e5fbe3eb8922`
- `FIREBASE_CLIENT_EMAIL`: `firebase-adminsdk-fbsvc@dspm-proyectofinal.iam.gserviceaccount.com`
- `FIREBASE_CLIENT_ID`: `117435012920143319747`
- `FIREBASE_CLIENT_X509_CERT_URL`: `https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40dspm-proyectofinal.iam.gserviceaccount.com`

**IMPORTANTE:** Para `FIREBASE_PRIVATE_KEY`, copia el valor exacto del archivo JSON, incluyendo los `\n` literales.

### 4. Desplegar y Probar

Render iniciará el despliegue automáticamente. Una vez completado, prueba el endpoint:

```bash
curl https://tu-app-url.onrender.com/api/health
```

Deberías recibir:
```json
{
  "status": "OK",
  "message": "Backend conectado a Firestore correctamente"
}
```

## Endpoints Disponibles

- `GET /api/health` - Health check
- `POST /api/usuarios` - Crear usuario
- `GET /api/usuarios` - Obtener perfil (requiere token)
- `PUT /api/usuarios` - Actualizar perfil (requiere token)
- `GET /api/asignaturas` - Listar asignaturas
- `POST /api/asignaturas` - Crear asignatura
- `GET /api/asignaturas/:id/notas` - Obtener notas de asignatura
- `POST /api/asignaturas/:id/notas` - Crear nota

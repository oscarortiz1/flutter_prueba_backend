# Flutter Prueba — Backend (Mock API)

Este README describe cómo ejecutar el mock API usado por la app Flutter de prueba. El backend está implementado con NestJS + Mongoose y sirve como API de pruebas para autenticación y manejo de movimientos.

# ⚠️ Importante

**DEBES INGRESAR A ESTE LINK PARA QUE RENDER INICIALICE:**  
(https://flutter-prueba-backend.onrender.com/api)

[Ver video en YouTube](https://youtu.be/pVl4b69sT-Y)

![Captura 7](imagenes/Captura%20de%20pantalla%202025-09-18%20201724.png)
![Captura 8](imagenes/Captura%20de%20pantalla%202025-09-18%20201733.png)
![Captura 9](imagenes/Captura%20de%20pantalla%202025-09-18%20201739.png)

![Captura 1](imagenes/Captura%20de%20pantalla%202025-09-18%20201311.png)
![Captura 2](imagenes/Captura%20de%20pantalla%202025-09-18%20201323.png)
![Captura 3](imagenes/Captura%20de%20pantalla%202025-09-18%20201332.png)
![Captura 4](imagenes/Captura%20de%20pantalla%202025-09-18%20201349.png)
![Captura 5](imagenes/Captura%20de%20pantalla%202025-09-18%20201357.png)
![Captura 6](imagenes/Captura%20de%20pantalla%202025-09-18%20201406.png)


Referencia: Swagger UI
- La API expuesta públicamente incluye Swagger en:

  https://flutter-prueba-backend.onrender.com/api

  Usa esa URL para explorar modelos y probar endpoints en el navegador.

Requisitos
- Node.js v18+ (recomendado)
- npm
- MongoDB (local o remoto)

Instalación y ejecución

Desde la carpeta `flutter_prueba_backend`:

```powershell
npm install
# Construir TypeScript -> JS
npm run build
# Iniciar (producción / ejecutable)
npm run start
# Desarrollo con recarga (usa ts-node / nest cli):
npm run start:dev
```

Notas sobre scripts
- `start` ejecuta `node dist/main.js` — asegúrate de que `npm run build` haya generado `dist/main.js`.
- Si ves el error `Cannot find module 'dist/main'` cuando ejecutas `npm run start`, revisa que `dist/` contenga `main.js`. Si no existe, ejecuta `npm run build`.

Configuración de MongoDB
- El backend usa una variable de entorno `MONGO_URI` para conectar a MongoDB. Puedes usar un Mongo local o un cluster en la nube.

Ejemplo con Docker (Mongo local):

```powershell
# Ejecutar MongoDB en Docker
docker run -d --name mongo-test -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=pass mongo:6
# Luego exporta la URI y ejecuta el backend:
$env:MONGO_URI = 'mongodb://admin:pass@localhost:27017'
npm run build
npm run start
```

Endpoints principales
- `POST /auth/otp` — solicitar OTP (mock). Datos: `{ email }`.
- `POST /auth/verify` — verificar OTP. Datos: `{ email, code }` → retorna `access_token`, `refresh_token`.
- `POST /auth/refresh` — refrescar `access_token` con el refresh token.
- `GET /movimientos` — listar movimientos. Soporta query params: `page` (zero-based), `limit`, `q` (filtro). Respuesta: `{ data: [...], total: <int>, totalPages: <int> }`.
- `POST /movimientos` — crear movimiento.
- `DELETE /movimientos/:id` — borrar movimiento por id de servidor.

Desarrollo y debugging
- Asegúrate de compilar TypeScript antes de ejecutar `node dist/main.js`.
- `tsconfig.json` está configurado con `outDir: dist`.

Contribuciones y mejoras
- El backend es minimal y pensado como mock. Puedo añadir más endpoints, validaciones o pruebas unitarias si lo deseas.

Entrega
- Empaqueta el repositorio con el historial de commits o sube a un repositorio privado y comparte el enlace.

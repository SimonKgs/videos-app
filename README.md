# Video App

Es una aplicación creada con NextJS y TypeScript, tiene el objetivo de poder subir videos que se guardarán en la base de datos y en Cloudinary.

Los usuarios tendrán que validarse para poder realizar las acciones de subida y visualización de videos. Su zona privada consta de 2 pantallas, por un la galería de videos donde verán todos los videos públicos y por otro la zona donde podrán subir.

Los usuarios podrán darle like a un video y se contarán las veces que se reproduce.

## Para usar este proyecto en desarrollo

1. Lo primero debes clonarlo o descargarlo de la url

2. Después deber instalar las dependencias
```
npm i
```
3. Configurar Cloudinary

Necesitarás renombrar el archivo copy.env.file to .env.local y modificar sus valores con los tuyos propios, para este punto debes tener o crear una cuenta en cloudinary es donde se almacenarán los videos.

```
CLOUDINARY_CLOUD_NAME:
Lo encontraras segun entras a tu cuenta es el product environment, un desplegable arriba a la izquierda
CLOUDINARY_API_KEY:
Debes crearla, en settings API Keys 
CLOUDINARY_API_SECRET:
Cuando creas la API KEY también tendras el API secret
CLOUDINARY_UPLOAD_PRESET:
También se debe crear, settings -> Upload presets, es la ruta a la que se subirán los assets
```

4. Tener instalado docker, renombrar el archivo template.env.file -> .env y levantar la base de datos con:
```docker compose up -d```

5. Ejecutar las migraciones en prisma
```npx prisma migrate dev```

6. Insertar la semilla inicial
```npm run seed```

10. Ejecutar el proyecto
```npm run dev```

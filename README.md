# Video App

Es una aplicación creada con NextJS y TypeScript, tiene el objetivo de poder subir videos que se guardarán en la base de datos y en Cloudinary.

Los usuarios tendrán que validarse para poder realizar las acciones de subida y visualización de videos. Su zona privada consta de 2 pantallas, por un la galería de videos donde verán todos los videos públicos y por otro la zona donde podrán subir.

Los usuarios podrán darle like a un video y se contarán las veces que se reproduce.

Puedes probar la app aquí: [videos-app](https://kgs-videos-app.vercel.app/)

## Para usar este proyecto en desarrollo

1. Lo primero debes descargarlo o clonarlo: 
```
git clone https://github.com/SimonKgs/videos-app.git
```

2. Después deber instalar las dependencias
```
npm i
```
3. Configurar Cloudinary

Necesitarás renombrar el archivo copy.env.file to .env.local y modificar sus valores con los tuyos propios, para este punto debes tener o crear una cuenta en cloudinary es donde se almacenarán los videos.

```
CLOUDINARY_CLOUD_NAME:
Lo encontraras según entras a tu cuenta es el product environment, un desplegable arriba a la izquierda
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

7. Ejecutar el proyecto
```npm run dev```


# dependencias utilizadas

1. prisma: para las ayudas con la db
2. Tailwind
3. bcrypt: para la encriptación y desencriptación de passwords
4. jsonwebtoken: para manejar el estado de la sesión
5. zustand: Para manejar estados globales

# Estructura del proyecto

Está estructurado por carpetas agrupando tipos de archivos:

1. actions: las interacciones con la base de datos, sustituyen a los endpoints
2. app: las rutas de la aplicación, los layouts y middleware?
3. components: los distintos componentes, estructurado de manera acorde a las pages 
4. interfaces: definicion de los tipos de datos
5. lib: iniciación del cliente de la db
6. prisma: donde se define el schema de la db
7. seed: aquí está la semilla inicial y los datos para ejecutarla
8. store: los estados globales y las acciones para modificarlos.


# Otras herramientas 

1. docker: para la creación rápida de la db en desarrollo
2. postman: para probar los endpoints de cloudinary antes de integrarlos

# Netflix Friends Demo

Demo que simula una nueva feature para una plataforma de streaming: "Recomendaciones de Amigos".

Qué incluye:
- Sección "Recomendaciones de Amigos" en el home.
- Simulación de solicitudes de amistad y aceptación (estado local).
- Datos ficticios de amigos y películas.

Requisitos:
- Node.js >= 16

Cómo ejecutar:

```bash
cd netflix-friends-demo
npm install
npm run dev
```

El demo corre en http://localhost:3000

Despliegue a GitHub Pages
------------------------

1) Preparar el repo en GitHub

- Crea un repositorio en GitHub y enlaza el remoto (por ejemplo `origin`) si aún no lo tienes:

```bash
# desde la raíz del proyecto
git init
git add .
git commit -m "initial"
git remote add origin git@github.com:<tu-usuario>/<tu-repo>.git
git push -u origin main
```

2) Deploy manual (desde tu máquina)

- Instala la dependencia de despliegue:

```bash
npm install --save-dev gh-pages
```

- Para crear los archivos estáticos y publicar en la rama `gh-pages`:

```bash
npm run predeploy    # corre `next build && next export`
npm run deploy       # publica el contenido de `out/` en la rama gh-pages
```

3) Deploy automático con GitHub Actions

He añadido un workflow en `.github/workflows/deploy.yml` que ejecuta `npm run predeploy` y publica la carpeta `out/` en `gh-pages` cada vez que hagas push a `main`.

Notas y problemas comunes
- GitHub Pages sirve contenidos desde la rama `gh-pages` (o desde `gh-pages` como configurado por la action). Asegúrate de que el repo exista en GitHub y que la rama `main` sea la rama de trabajo.
- Si tu app usa llamadas al servidor (getServerSideProps) o APIs que no sean ejecutadas en cliente, `next export` puede fallar; en este demo todo es client-side, así que debería exportar sin problemas.
- Si ves errores de rutas 404 en GitHub Pages, la opción `trailingSlash: true` en `next.config.js` está activada para ayudar con rutas estáticas.

Si quieres, puedo:

- Añadir la dependencia `gh-pages` al `package.json` e instalarla aquí.
- Ejecutar una exportación local (`npm run predeploy`) para validar que la carpeta `out/` se genera correctamente.

Dime cuál prefieres y lo hago.

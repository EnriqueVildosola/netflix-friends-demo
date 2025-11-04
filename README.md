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

## Despliegue a GitHub Pages

Este proyecto está configurado para despliegue automático a GitHub Pages mediante GitHub Actions.

### Deploy automático (Recomendado)

El repositorio incluye un workflow de GitHub Actions en `.github/workflows/deploy.yml` que automáticamente:

1. Construye la aplicación Next.js
2. Genera los archivos estáticos 
3. Despliega a GitHub Pages

**Para activar el deploy automático:**

1. Ve a la configuración de tu repositorio en GitHub: `Settings` > `Pages`
2. En "Build and deployment", selecciona:
   - **Source:** GitHub Actions
3. Cada vez que hagas push a la rama `main`, el sitio se desplegará automáticamente

El sitio estará disponible en: `https://<tu-usuario>.github.io/<tu-repo>/`

### Deploy manual (alternativo)

Si prefieres hacer deploy manual desde tu máquina local:

```bash
npm run predeploy    # Construye la aplicación y genera archivos estáticos
npm run deploy       # Publica el contenido de `out/` en la rama gh-pages
```

**Nota:** Para el deploy manual, asegúrate de que GitHub Pages esté configurado para usar la rama `gh-pages` como fuente.

### Notas técnicas

- La aplicación usa `output: 'export'` en `next.config.js` para generar un sitio completamente estático
- Se incluye un archivo `.nojekyll` para evitar que GitHub Pages procese los archivos con Jekyll
- La opción `trailingSlash: true` está activada para mejor compatibilidad con rutas en GitHub Pages
- Los directorios `.next/` y `out/` están en `.gitignore` ya que son generados durante el build

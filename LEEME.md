# App de Karting League

PWA pública (se instala en Android e iPhone desde el navegador), sin build ni
dependencias: `index.html` es la app entera y lleva los datos dentro.

## Cómo se actualiza

Después de cargar una ronda (resultados, sanciones, generales) como siempre:

```bash
.venv/Scripts/python.exe scripts/generate_app.py
```

Lee `data/` y reescribe el bloque entre `/* KL:DATOS:INICIO */` y
`/* KL:DATOS:FIN */` de `app/index.html`. **No edites ese bloque a mano.**
También prepara `app/img/` y `app/iconos/` (con `--imagenes` los rehace
todos, p. ej. si cambia un logo) y cambia la versión de `sw.js` para que los
móviles se actualicen solos.

No duplica lógica: usa `penalties.py` (penalizaciones de posición),
`generate_tablas_general.py` (carrera a carrera y descartes) y
`generators/build_carnet.py` (carnet, regla v1.1). Si algún total no cuadra
con `data/standings.json`, lo avisa por consola.

## Qué enseña

- **Inicio**: próxima ronda con su trazado y cuenta atrás, progreso de la
  temporada, líderes de K1 y K2, lo último (ganadores, pole, vuelta rápida,
  quién más sube), palmarés T1–T3 y patrocinadores.
- **Mundial**: pilotos (podio, ▲▼ respecto a la ronda anterior, forma de las
  4 últimas mangas), equipos y la tabla manga a manga. Interruptor **Con
  descartes** (las 2 peores mangas; una no disputada cuenta 0). Botón para
  compartir la general como imagen 1080×1350.
- **Rondas**: calendario de las 6 rondas; de cada una, pole, ganadores,
  vueltas rápidas y los resultados de clasificación, C1 y C2 con las
  penalizaciones ya aplicadas (y el puesto de meta a la vista).
- **Carnet**: resumen de dirección de carrera, carnet por puntos de cada
  piloto y todas las resoluciones, filtrables por ronda.
- **Mi piloto**: el usuario elige su piloto; queda destacado en todas las
  listas y con su ficha a mano.
- **Fichas** (suben desde abajo, con URL propia `#p-k1-adricelli`,
  `#e-k1-onlygass`): estadísticas, gráfica de puesto por ronda, manga a manga,
  duelo con el compañero de equipo y carnet.

## Probar en local

```bash
.venv/Scripts/python.exe -m http.server 8765 --directory app
```

y abrir http://localhost:8765. En `localhost` el service worker no se
registra (serviría versiones viejas); solo funciona en `https`.

## Publicar

Es una carpeta estática: vale cualquier hosting `https` (GitHub Pages, como
Pitbike World, Netlify, Cloudflare Pages…). Todas las rutas son relativas.

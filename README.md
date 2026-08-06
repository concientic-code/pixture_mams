# MAMS Grupo Textil — Landing Page

Landing page profesional para MAMS Grupo Textil, empresa textil colombiana (Guarne, Antioquia) con 20+ años de trayectoria en manufactura de prendas seamless, calcetería, teñido y paquete completo.

URL de producción: https://pixture-mams.vercel.app/

## Infraestructura

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Framework | Next.js (App Router) | 16.3.0 |
| Lenguaje | TypeScript | 5.x |
| Estilos | Tailwind CSS + CSS custom properties | 4.x |
| Fuentes | next/font/local (MAMS Display, Artegra Sans, Outfit) | — |
| Imágenes | WebP optimizado (sharp) | — |
| Hosting | Vercel | — |
| Repositorio | GitHub | — |
| CI/CD | Vercel (deploy automático en push a main) | — |

## Estructura del proyecto

```
pixture_mams/
├── public/
│   ├── fonts/              # Fuentes custom (.otf, .ttf)
│   └── images/
│       ├── logos/          # Variantes del logo (blue, cream, coral, sand)
│       └── models/         # Fotos optimizadas (.webp)
├── scripts/
│   └── optimize-images.mjs # Script de optimización de imágenes
├── src/
│   ├── app/
│   │   ├── globals.css     # Tokens CSS + animaciones + reset
│   │   ├── layout.tsx      # Fuentes + metadata SEO + JSON-LD
│   │   ├── page.tsx        # Página principal
│   │   ├── robots.ts       # robots.txt generado
│   │   └── sitemap.ts      # sitemap.xml generado
│   ├── components/
│   │   ├── Preloader.tsx   # Carga progresiva + cortina de revelado
│   │   ├── Header.tsx      # Header fijo con CTA
│   │   ├── Hero.tsx        # Hero con parallax + cinemática
│   │   ├── ProcessSection.tsx
│   │   ├── StickyProcess.tsx
│   │   ├── Results.tsx
│   │   ├── PackageList.tsx
│   │   ├── SocialProof.tsx # Marquee infinito de marcas
│   │   ├── CtaSection.tsx
│   │   ├── ScrollProgress.tsx
│   │   ├── Footer.tsx
│   │   ├── JsonLd.tsx      # Datos estructurados Schema.org
│   │   └── RevealSection.tsx
│   └── hooks/
│       ├── useReveal.ts    # IntersectionObserver para animaciones
│       └── useParallax.ts  # Parallax con interpolación lerp
├── next.config.ts          # Optimización de imágenes + headers de seguridad
├── vercel.json             # Configuración de deploy
├── package.json
└── tsconfig.json
```

## Requisitos previos

- **Node.js** >= 18.18 (recomendado: v20 LTS)
- **npm** >= 9

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/concientic-code/pixture_mams.git
cd pixture_mams

# Instalar dependencias
npm install
```

## Comandos disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo (http://localhost:3000) |
| `npm run build` | Build de producción |
| `npm run start` | Sirve el build de producción localmente |
| `npm run lint` | Ejecuta ESLint |
| `npm run optimize-images` | Optimiza imágenes PNG a WebP |

## Deploy en producción (Vercel)

El proyecto se despliega automáticamente en Vercel con cada push a `main`.

### Primer deploy (si se configura desde cero)

1. Crear cuenta en https://vercel.com (con GitHub)
2. Importar el repositorio `concientic-code/pixture_mams`
3. Dejar la configuración por defecto (Vercel detecta Next.js)
4. Clic en Deploy

### Deploys subsecuentes

```bash
# Hacer cambios en el código...
git add -A
git commit -m "descripción del cambio"
git push
```

Vercel detecta el push y redeploya automáticamente en ~1 minuto.

### Dominio custom

Para conectar un dominio propio (ej: grupotextilmams.com):
1. En Vercel → Settings → Domains → Add domain
2. Configurar DNS del dominio apuntando a Vercel
3. Actualizar `metadataBase` en `src/app/layout.tsx` y `sitemap.ts`

## Acceso por red local (desarrollo)

Para probar desde otros dispositivos en la misma red:

```bash
npm run dev
# Acceder desde: http://<TU_IP_LOCAL>:3000
```

Requiere abrir el puerto en el firewall (ejecutar como admin):
```powershell
netsh advfirewall firewall add rule name="Next.js Dev" dir=in action=allow protocol=tcp localport=3000
```

## Notas importantes

- **No subir** `node_modules/` ni `.next/` al repositorio (están en .gitignore)
- Las imágenes originales `.png` (~20MB) están excluidas del repo. Solo se versionan las `.webp` optimizadas
- Las fuentes en `public/fonts/` requieren verificación de licencia antes de uso comercial
- El dominio en metadata está hardcoded como `grupotextilmams.com` — cambiar si se usa otro

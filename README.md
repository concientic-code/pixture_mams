# MAMS Grupo Textil — Landing Page

Landing page profesional para MAMS Grupo Textil, empresa textil colombiana (Guarne, Antioquia) con 20+ años de trayectoria en manufactura de prendas seamless, calcetería, teñido y paquete completo.

URL de producción: https://pixture-mams.vercel.app/

## Infraestructura

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Framework | Next.js (App Router) | 16.3.0 |
| Lenguaje | TypeScript | 5.x |
| Estilos | Tailwind CSS + CSS custom properties | 4.x |
| Scroll suavizado | Lenis | 1.1.18 |
| Fuentes | next/font/local (MAMS Display, Artegra Sans, Outfit) | — |
| Imágenes | WebP optimizado (sharp) | — |
| Hosting | Vercel (CDN global) | — |
| Repositorio | GitHub | — |
| CI/CD | Vercel (deploy automático en push a main) | — |

## Capas de animación implementadas

| Capa | Nombre | Descripción |
|------|--------|-------------|
| 01 | Preloader | Carga progresiva con barra + cortina de revelado en 3 paneles |
| 02 | Reveal de texto | Titulares con máscara (line-reveal) al entrar en viewport |
| 04 | Parallax sutil | Profundidad con interpolación lerp, distintas velocidades por plano |
| 07 | Microinteracciones | Botones con relleno ascendente, subrayados que se tejen, filas con shift |
| 08 | Scroll suavizado | Inercia tipo Lenis que preserva position:sticky |
| 09 | Banda cinemática | Full-bleed con Ken Burns lento + texto en contra-scroll |

## Diseño responsive

Adaptado para todos los breakpoints:

| Dispositivo | Ancho | Breakpoint |
|-------------|-------|-----------|
| Desktop | 1440px | — |
| Laptop | 1280px | — |
| Tablet landscape | 1024px | `lg:` |
| Tablet portrait | 768px | `md:` |
| Mobile (iPhone 14) | 390px | — |
| Mobile (iPhone 13) | 375px | — |
| Mobile (iPhone SE) | 320px | — |

## Estructura del proyecto

```
pixture_mams/
├── public/
│   ├── fonts/                  # MAMS Display, Artegra Sans, Outfit
│   └── images/
│       ├── logos/              # Variantes del logo
│       └── models/            # Fotos optimizadas (.webp)
├── scripts/
│   └── optimize-images.mjs    # PNG → WebP (82% quality, max 1920px)
├── src/
│   ├── app/
│   │   ├── globals.css        # Tokens + animaciones + reset + responsive
│   │   ├── layout.tsx         # Fuentes + metadata SEO + JSON-LD + Lenis
│   │   ├── page.tsx           # Página principal (composición de secciones)
│   │   ├── robots.ts          # robots.txt generado
│   │   └── sitemap.ts         # sitemap.xml generado
│   ├── components/
│   │   ├── Preloader.tsx      # Capa 01 — carga progresiva + cortina
│   │   ├── SmoothScroll.tsx   # Capa 08 — Lenis scroll suavizado
│   │   ├── Header.tsx         # Header fijo, CTA con underline-weave
│   │   ├── Hero.tsx           # Hero con parallax + reveal
│   │   ├── ProcessSection.tsx # [01] Diseñamos contigo
│   │   ├── CinematicBand.tsx  # Capa 09 — Ken Burns + contra-scroll
│   │   ├── StickyProcess.tsx  # [02] De la fibra al producto (hover → imagen)
│   │   ├── Results.tsx        # [03] Más rápido, mayor escala, más control
│   │   ├── PackageList.tsx    # [04] Paquete completo (lista + row-shift)
│   │   ├── SocialProof.tsx    # Marquee infinito de marcas
│   │   ├── CtaSection.tsx     # [05] CTA con botón btn-fill
│   │   ├── ScrollProgress.tsx # Widget flotante de progreso
│   │   ├── Footer.tsx         # Footer con links underline-weave
│   │   ├── JsonLd.tsx         # Datos estructurados Schema.org
│   │   └── RevealSection.tsx  # Wrapper de reveal reutilizable
│   └── hooks/
│       ├── useReveal.ts       # IntersectionObserver compartido
│       └── useParallax.ts     # RAF compartido, solo activo en scroll
├── next.config.ts             # Imágenes AVIF/WebP + headers seguridad
├── vercel.json                # Config de deploy
├── package.json
└── tsconfig.json
```

## Rendimiento

| Métrica | Valor |
|---------|-------|
| JS bundle | 647 KB (React + Next.js runtime) |
| CSS | 25 KB |
| Imágenes servidas | 173 KB (2 WebP) |
| Fuentes | 276 KB (3 fuentes) |
| Total primera carga | ~1.1 MB |

Optimizaciones activas:
- Parallax con RAF compartido (solo activo mientras se scrollea)
- IntersectionObserver compartido entre componentes
- Imágenes lazy-loaded below-the-fold
- Font display: swap (no bloquea render)
- Static generation (pre-renderizado)
- Cache headers de 1 año para assets estáticos

## Requisitos previos

- **Node.js** >= 18.18 (recomendado: v20 LTS)
- **npm** >= 9

## Instalación

```bash
git clone https://github.com/concientic-code/pixture_mams.git
cd pixture_mams
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

### Primer deploy

1. Crear cuenta en https://vercel.com (con GitHub)
2. Importar el repositorio `concientic-code/pixture_mams`
3. Dejar configuración por defecto (Vercel detecta Next.js)
4. Clic en Deploy

### Deploys subsecuentes

```bash
git add -A
git commit -m "descripción del cambio"
git push
```

Vercel redeploya automáticamente en ~1 minuto.

### Dominio custom

1. En Vercel → Settings → Domains → Add domain
2. Configurar DNS apuntando a Vercel
3. Actualizar `metadataBase` en `layout.tsx` y `sitemap.ts`

## Acceso por red local (desarrollo)

```bash
npm run dev
# Acceder desde: http://<TU_IP_LOCAL>:3000
```

Requiere abrir el puerto en el firewall (ejecutar como admin):
```powershell
netsh advfirewall firewall add rule name="Next.js Dev" dir=in action=allow protocol=tcp localport=3000
```

## Notas importantes

- **No subir** `node_modules/` ni `.next/` al repositorio
- Las imágenes `.png` originales (~20MB) están excluidas del repo
- Las fuentes requieren verificación de licencia antes de uso comercial
- El dominio en metadata está hardcoded como `grupotextilmams.com`
- El año del copyright en el footer se actualiza automáticamente

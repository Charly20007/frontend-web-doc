# Frontend Web - Portal Médico & Blog Quirúrgico

Portal médico para el **Dr. Juan Carlos Marcos Enriquez**, especialista en Cirugía General y del Aparato Digestivo por Mínima Invasión.

Migrado a **Next.js (App Router)** para máxima optimización en posicionamiento orgánico (**SEO**), generación estática (**SSG**), metadatos dinámicos por artículo y datos estructurados (**Schema.org**).

---

## 🚀 Tecnologías Principales

* **Framework:** Next.js (App Router) + React 19
* **Estilos:** Tailwind CSS v4 con variables semánticas médicas y glassmorphism
* **Iconografía:** Lucide React
* **Tipografías:** Plus Jakarta Sans & Outfit (Fontsource Variable)
* **SEO y Metadatos:** Next.js Metadata API, Open Graph, Twitter Cards, robots.ts y sitemap.ts
* **Datos estructurados:** Schema.org (`Physician`, `MedicalWebPage`, `MedicalCondition`)

---

## 📁 Arquitectura del Proyecto

```
src/
├── app/
│   ├── blog/
│   │   ├── [slug]/
│   │   │   └── page.tsx      # Vista editorial SSG con generateStaticParams y generateMetadata
│   │   └── page.tsx          # Catálogo general de artículos médicos
│   ├── globals.css           # Tailwind v4, modo oscuro y temas
│   ├── layout.tsx            # RootLayout con metadatos globales y AppShell
│   ├── page.tsx              # Landing page principal con Schema.org Physician
│   ├── robots.ts             # Directivas robots.txt para Googlebot
│   └── sitemap.ts            # Generador dinámico de sitemap.xml
├── components/
│   ├── feedback/             # LoadingFallback, estados de carga
│   ├── layout/               # Navbar, Footer
│   ├── providers/            # AppShell (manejo de modo oscuro y modal de citas)
│   └── ui/                   # Badge, GlassCard, SectionTitle
└── features/
    ├── blog-medico/          # Artículos, tarjetas, servicios y tipos
    ├── catalogo-servicios/   # Procedimientos quirúrgicos y fichas
    ├── citas/                # Modal de agendamiento
    └── perfil-medico/        # HeroSection, Perfil, Testimonios
```

---

## 🛠️ Comandos Disponibles

```bash
# Servidor de desarrollo
npm run dev

# Compilación de producción con generación estática (SSG)
npm run build

# Servidor de producción
npm run start
```

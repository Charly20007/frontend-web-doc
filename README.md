# Frontend Web - Portal Médico & Blog Quirúrgico

Portal médico para el **Dr. Juan Carlos Marcos Enriquez**, especialista en Cirugía General y del Aparato Digestivo por Mínima Invasión.

Migrado a **Next.js (App Router)** para máxima optimización en posicionamiento orgánico (**SEO**), generación estática (**SSG**), metadatos dinámicos por artículo y datos estructurados (**Schema.org**).

---

## 🚀 Tecnologías Principales

* **Framework:** Next.js (App Router) + React 19
* **Estilos:** Tailwind CSS v4 con la paleta del consultorio (sin modo oscuro)
* **Iconografía:** Lucide React
* **Tipografías:** Plus Jakarta Sans & Outfit (Fontsource Variable)
* **SEO y Metadatos:** Next.js Metadata API, Open Graph, Twitter Cards, robots.ts y sitemap.ts
* **Datos estructurados:** Schema.org (`Physician`, `MedicalWebPage`, `MedicalCondition`)

---

## 📁 Arquitectura del Proyecto

Organización **por funcionalidad** con **servidor primero**: las páginas piden los datos en el servidor
y Google recibe el HTML completo. Solo son de cliente (`'use client'`) las piezas interactivas.

```
src/
├── app/                        # Rutas. Cada page.tsx: pide datos, arma metadatos y compone secciones
│   ├── [...ruta]/              # URLs antiguas → redirecciones 301 configuradas en el CMS
│   ├── api/revalidate/         # La API avisa aquí cuando cambia algo en el CMS
│   ├── blog/  procedimientos/  dr-juan-carlos-marcos/  contacto/  privacidad/ …
│   ├── layout.tsx  globals.css  sitemap.ts  robots.ts
├── components/                 # Piezas compartidas por varias funcionalidades
│   ├── layout/                 # BarraNavegacion, PiePagina, WhatsappFlotante
│   ├── legal/                  # PaginaLegalVista (privacidad, términos, consentimiento)
│   ├── providers/              # MarcoSitio (estructura + modal de cita), SitioContext (datos globales)
│   └── ui/                     # BotonCita, Modal, Formulario, MigasDePan, TituloSeccion, BotonWhatsapp
├── features/                   # Una carpeta por funcionalidad, con sus componentes y tipos
│   ├── inicio/                 # Secciones de la portada
│   ├── procedimientos/         # Encabezado, contenido, cierre y datos estructurados de cada procedimiento
│   ├── blog/                   # Listado, tarjeta y detalle de artículos
│   ├── medico/                 # Perfil del doctor
│   ├── testimonios/            # Sección de testimonios y formulario «Deja tu opinión»
│   └── citas/                  # Modal de reserva con turnos libres
├── lib/
│   ├── cms.ts                  # Lecturas de la API en el servidor (con caché y revalidación)
│   ├── cms-tipos.ts            # Tipos de lo que devuelve la API
│   ├── api-cliente.ts          # Envíos desde el navegador (citas, opiniones) y mensajes de error
│   ├── sitio.ts                # Datos derivados de la configuración (foto, WhatsApp, horarios)
│   ├── seo.ts                  # Metadatos y Schema.org
│   ├── formato.ts              # Teléfonos, enlaces y fechas
│   └── redirecciones.ts
└── config/api.ts               # URL de la API (NEXT_PUBLIC_API_URL)
```

**Reglas:**
- `app/` no contiene diseño largo: compone componentes de `features/`.
- Una funcionalidad puede usar `components/` y `lib/`, pero no componentes de otra funcionalidad
  (salvo secciones pensadas para reutilizarse, como `SeccionTestimonios`).
- Nada del doctor va fijo en el código: nombre, foto, teléfonos y textos vienen del CMS.
- Los componentes de cliente reciben solo los datos que necesitan (por ejemplo, el listado del blog
  recibe el resumen de cada artículo, no su contenido).

---

## Datos y SEO desde el CMS

Todo el contenido (procedimientos, blog, testimonios, datos del consultorio y SEO) se lee de la API .NET
en el servidor, así que llega completo en el HTML que indexa Google.

```bash
cp .env.example .env.local   # NEXT_PUBLIC_API_URL y REVALIDATE_SECRET
```

- `REVALIDATE_SECRET` debe ser igual a `Web:RevalidateSecret` de la API. Cuando se guarda algo en el CMS,
  la API llama a `POST /api/revalidate` y la web muestra el cambio en la siguiente visita.
- Como respaldo, los datos se refrescan solos cada hora.
- La API debe estar encendida para `npm run build` y `npm run dev`.

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

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

Cuatro carpetas, cada una responde una pregunta:

| Carpeta | Pregunta | Contiene |
|---|---|---|
| `app/` | ¿Qué páginas existen? | Una carpeta por URL. Cada `page.tsx` pide datos, arma el SEO y junta secciones |
| `features/` | ¿Qué hace la web? | Una carpeta por funcionalidad con sus secciones, tipos y datos estructurados |
| `shared/` | ¿Qué piezas usa todo el sitio? | Barra, pie de página, botones, modal, formularios, migas de pan |
| `lib/` | ¿Cómo se obtienen y preparan los datos? | API, SEO y formato, sin diseño |

```
src/
├── app/                        # Páginas cortas: datos + SEO + secciones
│   ├── page.tsx                # /
│   ├── procedimientos/         # /procedimientos y /procedimientos/[slug]
│   ├── blog/                   # /blog y /blog/[slug]
│   ├── dr-juan-carlos-marcos/  contacto/  privacidad/  terminos/  consentimiento-informado/
│   ├── [...ruta]/              # URLs antiguas → redirecciones 301 configuradas en el CMS
│   ├── api/revalidate/         # La API avisa aquí cuando cambia algo en el CMS
│   └── layout.tsx  globals.css  sitemap.ts  robots.ts  not-found.tsx  error.tsx
├── features/
│   ├── inicio/                 # HeroInicio, FranjaConfianza, ProcedimientosInicio, SobreDoctor…
│   ├── procedimientos/         # ListaProcedimientos, Encabezado/Contenido/CierreProcedimiento, jsonLd
│   ├── blog/                   # ListaArticulos, TarjetaArticulo, DetalleArticulo, tipos
│   ├── medico/                 # PerfilDoctor, ProcedimientosDelDoctor, LlamadoConsulta, jsonLd
│   ├── contacto/               # DatosContacto, MapaConsultorio
│   ├── testimonios/            # SeccionTestimonios, DejarOpinion
│   └── citas/                  # ModalCita, SelectorTurno, fechas
├── shared/
│   ├── layout/                 # BarraNavegacion, PiePagina, WhatsappFlotante
│   ├── ui/                     # BotonCita, Modal, Formulario, EncabezadoPagina, MigasDePan, TituloSeccion…
│   ├── providers/              # MarcoSitio (estructura + modal de cita), SitioContext (datos globales)
│   └── legal/                  # PaginaLegalVista (privacidad, términos, consentimiento)
├── lib/
│   ├── cms.ts  cms-tipos.ts    # Lecturas de la API en el servidor (con caché y revalidación) y sus tipos
│   ├── api-cliente.ts          # Envíos desde el navegador (citas, opiniones) y mensajes de error
│   ├── seo.ts  sitio.ts  formato.ts  redirecciones.ts
└── config/api.ts               # URL de la API (NEXT_PUBLIC_API_URL)
```

**¿Dónde va un componente nuevo?** Pregúntate quién lo usa:
- **Una sola funcionalidad** → `features/<funcionalidad>/` (por ejemplo, `TarjetaArticulo` solo la usa el blog).
- **Varias funcionalidades** → `shared/` (por ejemplo, `BotonCita` está en la portada, el blog y los procedimientos).

**Reglas:**
- Carpetas de estructura en inglés (`app`, `features`, `shared`, `lib`), por ser convenciones conocidas;
  nombres del negocio en español (`citas`, `testimonios`, `BotonCita`).
- `app/` no contiene diseño largo: compone secciones de `features/`.
- Una funcionalidad puede usar `shared/` y `lib/`, pero no componentes de otra funcionalidad
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

# Auditoría SEO Completa — odontix.eu
**Fecha:** Junio 2026 | **Tipo:** Full Site Audit

---

## Resumen ejecutivo

odontix.eu es una landing page de una sola página que ofrece Agentes IA para clínicas dentales. El sitio tiene una propuesta de valor clara y buena estructura visual, pero presenta **problemas críticos que impiden completamente su posicionamiento**: el dominio no aparece indexado en Google, faltan ficheros técnicos fundamentales (sitemap, robots.txt) y los enlaces de conversión (WhatsApp, Calendly) usan valores de placeholder sin reemplazar. La arquitectura de página única limita severamente el potencial SEO a largo plazo. El mercado de IA dental en España es competitivo y activo en 2026, con rivales ya posicionados. Con correcciones urgentes y una estrategia de contenido, odontix.eu puede capturar tráfico orgánico cualificado de decisores de clínicas dentales.

**Fortaleza principal:** contenido bien estructurado, H1/H2 con jerarquía correcta, `lang="es"` declarado.

**Top 3 prioridades de impacto inmediato:**
1. Corregir los placeholders rotos (`TU_NUMERO`, `TU_ENLACE`) — cada visita actual es una conversión perdida
2. Crear sitemap.xml y robots.txt para que Google pueda indexar el sitio
3. Añadir Schema markup (Organization + Service + FAQ) para aumentar visibilidad en SERPs

---

## Oportunidades de palabras clave

| Keyword | Dificultad est. | Oportunidad | Posición actual | Intención | Tipo de contenido recomendado |
|---|---|---|---|---|---|
| agentes IA clínicas dentales | Media | Alta | Sin ranking | Comercial | Landing page principal |
| chatbot dental WhatsApp | Media | Alta | Sin ranking | Comercial | Landing page /chatbot-dental |
| automatización clínica dental | Media | Alta | Sin ranking | Comercial | Landing page /automatizacion |
| recepcionista IA dental | Baja | Alta | Sin ranking | Comercial | Landing page + blog |
| IA para dentistas | Media | Alta | Sin ranking | Informacional/Comercial | Artículo pilar + landing |
| agente voz dental | Baja | Alta | Sin ranking | Comercial | Landing page /agente-de-voz |
| reducir no-shows clínica dental | Baja | Alta | Sin ranking | Informacional | Artículo de blog |
| captación pacientes dentales IA | Baja | Alta | Sin ranking | Comercial | Caso de uso / landing |
| software gestión citas dental | Alta | Media | Sin ranking | Comercial | Comparativa / blog |
| automatización WhatsApp dental España | Baja | Alta | Sin ranking | Comercial | Landing localizada |
| agente IA WhatsApp para clínicas | Baja | Alta | Sin ranking | Comercial | Landing page |
| cómo reducir cancelaciones clínica dental | Baja | Media | Sin ranking | Informacional | Blog |
| inteligencia artificial odontología | Alta | Media | Sin ranking | Informacional | Artículo pilar |
| chatbot atención pacientes dental | Baja | Alta | Sin ranking | Comercial | Landing page |
| agente captación leads dentales | Baja | Alta | Sin ranking | Comercial | Caso de uso |
| automatización agenda dental | Baja | Alta | Sin ranking | Comercial | Blog + landing |
| IA para clínica dental España | Baja | Alta | Sin ranking | Comercial | Landing localizada |
| respuesta automática WhatsApp dental | Baja | Alta | Sin ranking | Comercial | Landing page |
| agente voz IA llamadas clínica | Baja | Media | Sin ranking | Comercial | Landing /agente-de-voz |
| marketing dental IA conversión | Baja | Media | Sin ranking | Informacional | Blog |

---

## Problemas on-page

| Página | Problema | Severidad | Solución recomendada |
|---|---|---|---|
| / (home) | Placeholders sin reemplazar: `wa.me/TU_NUMERO` aparece 3 veces, `calendly.com/TU_ENLACE` | **Crítica** | Sustituir por número real y enlace Calendly real antes de publicar |
| / (home) | No indexada en Google — dominio sin presencia en SERPs | **Crítica** | Verificar en Google Search Console, eliminar posible noindex, enviar sitemap |
| / (home) | Sin etiqueta canonical | **Alta** | Añadir `<link rel="canonical" href="https://odontix.eu/">` en el `<head>` |
| / (home) | Sin Open Graph ni Twitter Card meta tags | **Alta** | Añadir og:title, og:description, og:image, og:url para compartir en redes |
| / (home) | H1 no incluye keyword principal: "Tu nuevo equipo comercial 24/7" | **Alta** | Modificar a "Agentes IA para Clínicas Dentales — Tu equipo comercial 24/7" |
| / (home) | Email `hola@odontix.ai` pero dominio es `odontix.eu` — inconsistencia de marca | **Media** | Unificar: usar `hola@odontix.eu` o explicar la relación entre dominios |
| / (home) | Sin favicon declarado | **Media** | Añadir `<link rel="icon" href="/favicon.ico">` y crear favicon |
| / (home) | Imágenes PNG sin atributo `loading="lazy"` ni versión WebP | **Media** | Convertir a WebP y añadir `loading="lazy"` en imágenes fuera del fold |
| / (home) | Sin Google Analytics / GTM — sin datos de comportamiento | **Media** | Implementar GA4 + Google Search Console |
| / (home) | Arquitectura de página única — todo el SEO en una URL | **Media** | Planificar estructura multipage (ver sección de brechas de contenido) |
| / (home) | Sin testimonios reales ni logos de clientes | **Baja** | Añadir social proof con nombres de clínicas reales y resultados medibles |
| / (home) | Sin precio orientativo ni modelo de negocio visible | **Baja** | Considerar sección de precios (o rango) para mejorar tasa de conversión |

---

## Análisis técnico SEO

| Verificación | Estado | Detalle |
|---|---|---|
| sitemap.xml | ❌ Fallo | `/sitemap.xml` devuelve contenido vacío — Google no puede descubrir URLs |
| robots.txt | ❌ Fallo | `/robots.txt` no responde — Google opera sin directivas |
| HTTPS | ✅ Pasa | Dominio .eu con protocolo seguro |
| Etiqueta canonical | ❌ Fallo | No declarada — riesgo de contenido duplicado si hay variantes de URL |
| Etiqueta lang | ✅ Pasa | `lang="es"` correctamente declarado |
| Meta title | ✅ Pasa | 57 caracteres, incluye marca y propuesta de valor |
| Meta description | ✅ Pasa | 144 caracteres, descriptiva y con llamada implícita a la acción |
| H1 único | ✅ Pasa | Una sola H1 por página |
| Jerarquía de encabezados | ✅ Pasa | H1 → H2 → H3 correcta en todas las secciones |
| Open Graph | ❌ Fallo | Sin og:title, og:image, og:description — links en redes no se previsualizan |
| Schema markup | ❌ Fallo | Sin datos estructurados (Organization, Service, FAQPage) |
| Core Web Vitals (estimado) | ⚠️ Aviso | Fuentes de Google + JS externo pueden ralentizar LCP. Medir con PageSpeed Insights |
| Mobile-friendly | ✅ Pasa | viewport meta correcta, diseño responsive con menú hamburguesa |
| Imágenes con alt text | ✅ Pasa | Todas las imágenes tienen `alt` descriptivo |
| Broken links internos | ❌ Fallo | 3× `wa.me/TU_NUMERO` y 1× `calendly.com/TU_ENLACE` son URLs no funcionales |
| Indexación en Google | ❌ Fallo | Dominio no encontrado en búsquedas directas — probablemente no indexado |
| Google Search Console | ❌ Fallo | Sin verificación detectada |
| Google Analytics | ❌ Fallo | Sin script de seguimiento en el HTML |

---

## Brechas de contenido

La arquitectura de página única es el mayor limitante SEO estructural. Cada competidor con páginas dedicadas por servicio capta tráfico específico que odontix.eu no puede capturar.

**Páginas de servicio que faltan:**

`/chatbot-dental-whatsapp` — keyword con alta demanda y competencia media. ChatbotDental.es ya rankea con esta URL. Formato: landing de conversión con demo, beneficios y casos. Prioridad: **Alta**. Esfuerzo: moderado (medio día).

`/agente-de-voz-dental` — búsqueda en auge para clínicas que quieren cubrir llamadas telefónicas. Prioridad: **Alta**. Esfuerzo: moderado.

`/automatizacion-clinica-dental` — término paraguas con intención comercial fuerte. Útil como página pilar que enlaza a las de servicio específico. Prioridad: **Alta**. Esfuerzo: moderado.

`/captacion-pacientes-dental-ia` — cubre el caso de uso del Agente de Captación. Prioridad: **Alta**. Esfuerzo: rápido (2 horas adaptando contenido existente).

**Blog / contenido informacional que falta:**

"Cómo reducir las cancelaciones en tu clínica dental" — artículo informacional de alto tráfico que posiciona para keywords de problema. Prioridad: **Alta**. Esfuerzo: moderado.

"IA vs recepcionista tradicional: análisis de costes para clínicas dentales" — convierte la sección comparativa del home en artículo indexable. Prioridad: **Media**. Esfuerzo: rápido.

"Guía completa: automatización con WhatsApp para dentistas" — artículo pilar largo (1.500+ palabras) para capturar tráfico informacional y construir autoridad temática. Prioridad: **Alta**. Esfuerzo: sustancial (1-2 días).

"Casos de éxito: clínicas dentales que usan IA" — contenido EEAT (Experience, Expertise, Authoritativeness, Trustworthiness) que aumenta confianza y conversión. Prioridad: **Alta**. Esfuerzo: depende de datos reales disponibles.

**Ausencias en el funnel:**

No hay contenido de fase de concienciación (el problema de las clínicas sin IA). No hay comparativas con competidores. No hay página de precios o modelo de suscripción. No hay página legal (aviso legal, privacidad, cookies) — obligatoria en la UE y factor de confianza para Google.

---

## Comparativa competidores

| Dimensión | odontix.eu | DentalFlow (dentalflow.es) | ChatbotDental (chatbotdental.es) | InteliBots (intelibots.es) |
|---|---|---|---|---|
| Indexación Google | ❌ Sin presencia | ✅ Indexado | ✅ Indexado | ✅ Indexado |
| Páginas indexadas (est.) | 1 | 10+ | 5+ | 10+ |
| Blog activo | ❌ No | ✅ Sí | ⚠️ Limitado | ✅ Sí |
| Schema markup | ❌ No | ✅ Sí | ✅ Sí | ⚠️ Parcial |
| Casos de éxito / clientes | ❌ No | ✅ Sí | ✅ 70+ clínicas | ✅ Sí |
| Agente de voz | ✅ Sí | ✅ Sí | ✅ Sí | ✅ Sí |
| Multicanal (WA + Insta + Web) | ✅ Sí | ✅ Sí | ✅ Sí | ✅ Sí |
| Precio visible | ❌ No | ✅ Planes en web | ❌ No | ❌ No |
| Velocidad percibida (est.) | ⚠️ Media | ✅ Buena | ✅ Buena | ✅ Buena |
| Ganador | — | DentalFlow | DentalFlow | DentalFlow |

**Diferenciador competitivo disponible para odontix.eu:** ninguno de los competidores identifica explícitamente el dominio europeo (.eu) ni el mercado específicamente europeo. Hay una oportunidad de posicionarse como la solución para clínicas en España, Italia, Francia y Portugal vs. los que se centran solo en España.

---

## Plan de acción priorizado

### Acciones urgentes (esta semana — menos de 2 horas cada una)

**1. Reemplazar todos los placeholders** — Sustituir `TU_NUMERO` por el número real de WhatsApp y `TU_ENLACE` por la URL real de Calendly. Aparecen en 4 lugares del HTML. Impacto: **Crítico** (cada visita actual convierte en cero). Esfuerzo: 15 minutos.

**2. Crear sitemap.xml** — Fichero básico con la URL del home. Cuando se añadan páginas, ampliar. Subirlo a la raíz del dominio y enviarlo a Google Search Console. Impacto: **Alto**. Esfuerzo: 30 minutos.

**3. Crear robots.txt** — Contenido mínimo: `User-agent: * / Allow: / / Sitemap: https://odontix.eu/sitemap.xml`. Impacto: **Alto**. Esfuerzo: 10 minutos.

**4. Verificar Google Search Console** — Comprobar si hay directivas noindex activas o penalizaciones. Enviar el sitemap. Impacto: **Crítico**. Esfuerzo: 30 minutos.

**5. Añadir etiqueta canonical** — `<link rel="canonical" href="https://odontix.eu/">` en el `<head>`. Impacto: **Alto**. Esfuerzo: 5 minutos.

**6. Modificar H1** — Cambiar "Tu nuevo equipo" por "Agentes IA para Clínicas Dentales — Tu equipo comercial 24/7". Impacto: **Alto**. Esfuerzo: 5 minutos.

**7. Añadir Open Graph tags** — og:title, og:description, og:image (1200×630px), og:url, og:type. Impacto: **Alto** para tráfico social. Esfuerzo: 30 minutos.

**8. Añadir páginas legales** — Aviso legal, Política de privacidad y Política de cookies. Obligatorio en la UE. Sin ellas Google rebaja la confianza del dominio (EEAT). Impacto: **Alto**. Esfuerzo: 1-2 horas con plantilla.

### Inversiones estratégicas (este trimestre)

**9. Implementar Schema markup** — Añadir JSON-LD para `Organization`, `Service` (uno por agente), y `FAQPage` (la sección FAQ ya existe — solo hay que estructurarla). Los resultados FAQ en Google aumentan la tasa de clic hasta un 30%. Impacto: **Alto**. Esfuerzo: medio (4-6 horas). Sin dependencias.

**10. Instalar Google Analytics 4 + GSC** — Sin datos de comportamiento es imposible medir ni optimizar. Impacto: **Alto** (base de todo lo demás). Esfuerzo: 1-2 horas.

**11. Crear arquitectura multipage** — Prioridad: `/ → /chatbot-dental-whatsapp → /agente-de-voz-dental → /automatizacion-clinica-dental`. Cada página captura una keyword transaccional propia y enlaza al home. Impacto: **Alto**. Esfuerzo: sustancial (1 semana).

**12. Publicar primer artículo pilar del blog** — "Cómo reducir cancelaciones en tu clínica dental con IA" (1.500+ palabras). Enlaza a las landing pages de servicio. Impacto: **Alto a medio plazo**. Esfuerzo: moderado (medio día).

**13. Añadir casos de éxito reales** — Con nombre de clínica (o iniciales), ciudad, resultado medible ("+40% citas confirmadas en 30 días"). Mejora EEAT y tasa de conversión. Impacto: **Alto**. Depende de: tener clientes con resultados.

**14. Optimización de imágenes** — Convertir PNG a WebP, añadir `loading="lazy"` en imágenes fuera del fold. Mejora Core Web Vitals (LCP). Impacto: **Medio**. Esfuerzo: rápido (1 hora con herramientas como Squoosh).

**15. Estrategia de link building** — Publicar artículos de opinión en medios del sector (odontomarketing.com, gacetadental.com) con enlace a odontix.eu. Participar en foros y comunidades de gestores de clínicas dentales. Impacto: **Alto a largo plazo**. Esfuerzo: sustancial y continuo.

---

*Auditoría generada con Claude · ODONTIX — odontix.eu · Junio 2026*

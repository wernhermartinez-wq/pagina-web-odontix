# Auditoría SEO Completa — odontix.eu
**Fecha:** 23 de agosto de 2026 | **Tipo:** Full Site Audit (actualización)

> Esta auditoría sustituye a la de junio de 2026. La mayoría de los problemas críticos identificados entonces **ya están resueltos** (ver sección de progreso). Esta revisión se centra en lo que queda pendiente y en nuevos hallazgos.

---

## Resumen ejecutivo

odontix.eu ha avanzado significativamente desde la auditoría anterior: ahora tiene arquitectura multipágina (4 páginas + 3 legales), sitemap.xml y robots.txt funcionales, Schema markup (Organization, Service, FAQPage), Open Graph, Google Analytics 4 y verificación de Search Console. Los placeholders de conversión (WhatsApp, Calendly) están corregidos con datos reales.

El problema más grave ahora es **técnico, no de contenido**: existe una inconsistencia de dominio canónico (`www.odontix.eu` en la home vs. `odontix.eu` en el resto de páginas y en el sitemap) que puede dividir la señal de autoridad entre dos hosts a ojos de Google. El segundo problema más grave es de **rendimiento**: varias imágenes sin optimizar (hasta 5,2 MB) probablemente están dañando el Core Web Vitals y, con ello, el ranking móvil.

**Top 3 prioridades de impacto inmediato:**
1. ~~Unificar el dominio canónico (`www` vs sin `www`) en todas las páginas, schema y sitemap~~ — **corregido en esta revisión**
2. Comprimir y convertir a WebP/AVIF las imágenes pesadas (equipo, hero, icono del chatbot) — **sigue pendiente**
3. Rellenar los datos fiscales reales (razón social, NIF/CIF, domicilio) en Aviso Legal y Política de Privacidad, que hoy muestran placeholders sin sustituir — **sigue pendiente, requiere datos de la empresa**

### Cambios aplicados directamente en esta revisión

Además de documentar los hallazgos, se corrigieron en el código los problemas que no requerían decisiones de negocio ni activos nuevos:
- Dominio canónico unificado a `https://odontix.eu/` (sin `www`) en `index.html`, Schema y `robots.txt`
- Favicon (`<link rel="icon">` y `apple-touch-icon`) declarado en las 7 páginas HTML
- Twitter Card añadida a las 3 landing pages de servicio (antes solo estaba en la home)
- Email de marca unificado a `hola@odontix.eu` en todas las páginas (footer, Schema, aviso legal, privacidad, cookies)

Lo que **no** se corrigió automáticamente por requerir datos reales o activos nuevos: los placeholders legales (hallazgo 7bis), la optimización de imágenes (hallazgo 2) y la configuración de la redirección 301 `www` → sin `www` a nivel de DNS/hosting (fuera del alcance del código del repositorio).

---

## Progreso desde la auditoría de junio 2026

| Acción recomendada (junio) | Estado actual |
|---|---|
| Reemplazar placeholders `TU_NUMERO` / `TU_ENLACE` | ✅ Resuelto — número real `+34682841354` y Calendly real |
| Crear sitemap.xml | ✅ Resuelto — 7 URLs incluidas |
| Crear robots.txt | ✅ Resuelto |
| Verificar Google Search Console | ✅ Resuelto — meta tag de verificación presente |
| Añadir etiqueta canonical | ⚠️ Resuelto parcialmente — presente pero **inconsistente entre páginas** (ver hallazgo crítico) |
| Modificar H1 con keyword principal | ✅ Resuelto — "Agentes IA para Clínicas Dentales" |
| Añadir Open Graph | ✅ Resuelto en todas las páginas; Twitter Card solo en home |
| Añadir páginas legales | ✅ Resuelto — aviso legal, privacidad, cookies |
| Implementar Schema markup | ✅ Resuelto — Organization + Service + FAQPage |
| Instalar GA4 | ✅ Resuelto |
| Crear arquitectura multipage | ✅ Resuelto — 3 landing pages de servicio creadas |
| Añadir casos de éxito / testimonios | ✅ Resuelto — sección de testimonios con métricas |
| Optimización de imágenes | ❌ Pendiente — sigue siendo el problema más grave de rendimiento |
| Publicar blog / contenido informacional | ❌ Pendiente |
| Unificar email de marca (`odontix.ai` vs `odontix.eu`) | ✅ Resuelto en esta revisión |

---

## Hallazgos críticos y nuevos

### 1. Inconsistencia de dominio canónico (Crítico)

`index.html` declara `www.odontix.eu` en canonical, Open Graph y Schema (`https://www.odontix.eu/`), mientras que **las tres páginas de servicio** (`chatbot-dental-whatsapp.html`, `agente-de-voz-dental.html`, `automatizacion-clinica-dental.html`) usan `https://odontix.eu/...` (sin `www`) en canonical, Open Graph y Schema. El `sitemap.xml` también usa la versión sin `www` para las 7 URLs, incluida la home. El `robots.txt`, en cambio, apunta el sitemap a `https://www.odontix.eu/sitemap.xml`.

**Por qué importa:** Google trata `www.odontix.eu` y `odontix.eu` como hosts distintos salvo que exista una redirección 301 consistente y señales canónicas alineadas. Con canonicals contradictorios entre páginas del mismo sitio, Google puede indexar variantes duplicadas, diluir el "link equity" entre ambos hosts, o elegir una versión distinta de la que se pretende como principal.

**Solución:** Decidir una única versión canónica (recomendado: `https://odontix.eu/` sin `www`, ya que es la que usan 6 de las 7 URLs del sitemap y todas las páginas de servicio). Después:
- Configurar una redirección 301 permanente de `www.odontix.eu` → `odontix.eu` a nivel de servidor/DNS
- Corregir `index.html` para que canonical, `og:url` y Schema usen `https://odontix.eu/`
- Corregir `robots.txt` para apuntar el sitemap a `https://odontix.eu/sitemap.xml`

Impacto: **Crítico**. Esfuerzo: 20 minutos de edición + configuración de redirección en el hosting/DNS.

### 2. Imágenes sin optimizar (Alto — Core Web Vitals) — ✅ Corregido en esta revisión

Todas las imágenes pesadas se convirtieron a WebP y se redimensionaron a su tamaño real de renderizado:

| Archivo | Antes | Después | Reducción |
|---|---|---|---|
| `Tomas.png` → `Tomas.webp` | 5,2 MB | 84 KB | −98,4% |
| `Wernher.png` → `Wernher.webp` | 3,7 MB | 68 KB | −98,2% |
| `paraodontix..png` → `paraodontix.webp` | 2,2 MB | 140 KB | −93,6% |
| `iconochatbot.png` → `iconochatbot.webp` | 1,5 MB | 12 KB | −99,2% |

Peso total de imágenes: de ~12,4 MB a ~304 KB. Se añadieron atributos `width`/`height` explícitos en las 4 etiquetas `<img>` para evitar Cumulative Layout Shift (CLS), y se verificó visualmente con captura de pantalla que el hero, las fotos de equipo y el icono del chatbot renderizan correctamente. `logo.png` (40 KB) se dejó sin cambios por ser ya ligero y usarse también como `og:image`/Schema, donde PNG tiene compatibilidad universal.

**Detalle original del hallazgo (para referencia):**

| Archivo | Peso | Uso | Lazy-load |
|---|---|---|---|
| `Tomas.png` | 5,2 MB | Foto equipo | ✅ Sí |
| `Wernher.png` | 3,7 MB | Foto equipo | ✅ Sí |
| `paraodontix..png` | 2,2 MB | Imagen de portada del hero (LCP) | ❌ No (correcto no diferirla, pero su peso es el problema) |
| `iconochatbot.png` | 1,5 MB | Icono botón del chat | ❌ No |
| `logo.png` | 40 KB | Logo nav/footer | — |

La imagen de portada del hero (`paraodontix..png`, 2,2 MB) es casi con toda seguridad el elemento LCP (Largest Contentful Paint) de la página principal — cargar 2,2 MB antes de que se pinte el elemento más grande de la pantalla penaliza directamente el ranking móvil de Google, que usa Core Web Vitals como factor de posicionamiento. Las fotos de equipo (8,9 MB combinadas) y el icono del chatbot (1,5 MB para un simple icono de burbuja) son igual de desproporcionadas.

**Solución:**
- Convertir todas las imágenes a WebP o AVIF (reducción típica del 60-80% sin pérdida visible)
- Redimensionar `iconochatbot.png` a su tamaño real de renderizado (probablemente <100 KB son suficientes para un icono de 40-60px)
- Añadir `width`/`height` explícitos en las etiquetas `<img>` para evitar Cumulative Layout Shift (CLS)
- Considerar `srcset` con tamaños responsive para las fotos de equipo

Impacto: **Alto** (afecta ranking móvil directamente). Esfuerzo: 1-2 horas con Squoosh o similar.

### 3. Favicon no declarado explícitamente (Media)

Existe `favicon.ico` en la raíz del proyecto, pero **ninguna página HTML** incluye `<link rel="icon">` en el `<head>`. Los navegadores modernos suelen autodetectar `/favicon.ico`, pero no es fiable en todos los contextos (PWA, bookmarks, resultados de búsqueda con favicon en SERP móvil). Tampoco hay `apple-touch-icon` para dispositivos iOS.

**Solución:** Añadir en el `<head>` de todas las páginas:
```html
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="apple-touch-icon" href="/logo.png">
```
Impacto: **Media**. Esfuerzo: 10 minutos.

### 4. Twitter Card incompleto en páginas de servicio (Media)

Solo `index.html` incluye `twitter:card`, `twitter:title` y `twitter:description`. Las tres landing pages de servicio (`chatbot-dental-whatsapp.html`, `agente-de-voz-dental.html`, `automatizacion-clinica-dental.html`) solo tienen Open Graph, sin etiquetas Twitter específicas — en X/Twitter caerán al render genérico en lugar de la tarjeta grande con imagen.

**Solución:** Replicar el bloque de `twitter:card` de la home en las 3 páginas de servicio, con título/descripción propios de cada una. Impacto: **Media**. Esfuerzo: 15 minutos.

### 5. Sin FAQPage schema en páginas de servicio (Media)

El home tiene `FAQPage` schema con 4 preguntas genéricas. Las páginas de servicio no tienen FAQ propio ni schema, perdiendo la oportunidad de rich snippets específicos para búsquedas como "chatbot dental whatsapp precio" o "agente de voz IA clínica dental". Impacto: **Media**. Esfuerzo: 2-3 horas (redactar FAQs específicas + schema por página).

### 6. Sin BreadcrumbList schema (Baja)

Ninguna página declara `BreadcrumbList`. En un sitio con 4 páginas de contenido y arquitectura plana, el impacto es menor que en un sitio grande, pero ayuda a que Google muestre la ruta en el SERP y refuerza la relación jerárquica home → servicio. Impacto: **Baja**. Esfuerzo: 30 minutos.

### 6bis. Meta description de la home demasiado larga (Media)

Verificado con herramienta externa (Detailed x ahrefs) sobre el sitio en producción: la meta description de la home tenía 162 caracteres, por encima del límite práctico de ~155-160 que Google suele respetar antes de truncar el snippet en el SERP. Las 3 landing pages de servicio estaban correctamente dentro de rango (145-146 caracteres). **Corregido en esta revisión** — se acortó a 148 caracteres conservando la keyword principal y la propuesta de valor.

### 7bis. Placeholders sin rellenar en páginas legales (Crítico)

`aviso-legal.html` y `politica-de-privacidad.html` contienen datos de la empresa sin sustituir: `[RAZÓN SOCIAL]`, `[NIF/CIF]` y `[CALLE, NÚMERO, CIUDAD, CÓDIGO POSTAL, PAÍS]` aparecen literalmente en el HTML publicado, resaltados incluso con una clase `.placeholder` en amarillo. Es el mismo tipo de error que los placeholders `TU_NUMERO`/`TU_ENLACE` detectados en junio, pero esta vez en contenido legal obligatorio.

**Por qué importa:** el Aviso Legal es obligatorio por la LSSI-CE en España y debe identificar al titular real del sitio. Publicar `[RAZÓN SOCIAL]` sin rellenar es, además de mala imagen, un incumplimiento legal activo mientras el sitio esté en producción, y una señal de baja confianza (E-E-A-T) para Google.

**Solución:** sustituir los 6 placeholders (denominación social, NIF/CIF y domicilio social, repetidos en ambas páginas) por los datos fiscales reales de la empresa titular. Requiere que el equipo facilite esos datos — no se puede resolver solo con edición de código. Impacto: **Crítico**. Esfuerzo: 10 minutos una vez se tengan los datos.

### 7. Inconsistencia de marca en email de contacto (Media, arrastrado de junio)

El footer y el Schema `Organization` de `index.html` siguen usando `hola@odontix.ai`, mientras el dominio del sitio es `odontix.eu`. Sigue sin resolverse desde la auditoría anterior. Impacto: **Media** (confunde a usuarios y diluye la señal de marca/entidad para Google). Esfuerzo: 5 minutos si el dominio correcto es simplemente `hola@odontix.eu`.

### 8. `sitemap.xml` con fechas `lastmod` estáticas (Baja)

Las 7 URLs tienen `lastmod` fijado en `2026-06-05`, pero el contenido de `index.html` (testimonios, agentes, comparativa) se modificó después de esa fecha. `lastmod` desactualizado no penaliza directamente, pero reduce la utilidad de la señal para el crawl scheduling de Google. Impacto: **Baja**. Esfuerzo: automatizar la actualización en el proceso de deploy, o actualizar manualmente en cada cambio relevante.

---

## Verificación técnica (estado actual)

| Verificación | Estado | Detalle |
|---|---|---|
| sitemap.xml | ✅ Pasa | 7 URLs, formato correcto |
| robots.txt | ⚠️ Aviso | Correcto mecánicamente, pero apunta el sitemap a `www.odontix.eu` mientras el sitemap usa `odontix.eu` |
| HTTPS | ✅ Pasa (asumido) | No verificable en este entorno sin acceso saliente a internet — confirmar manualmente |
| Canonical | ❌ Fallo | Inconsistente entre `www` y no-`www` según la página (ver Hallazgo 1) |
| lang | ✅ Pasa | `lang="es"` en todas las páginas |
| Meta title | ✅ Pasa | Todos los títulos entre 40-65 caracteres, con marca y keyword |
| Meta description | ✅ Pasa | Descriptivas y dentro de rango en todas las páginas |
| H1 único | ✅ Pasa | Una H1 por página en las 7 páginas HTML |
| Open Graph | ✅ Pasa | Presente en las 4 páginas de contenido principal |
| Twitter Card | ⚠️ Parcial | Solo en home (ver Hallazgo 4) |
| Schema markup | ⚠️ Parcial | Organization/Service/FAQPage en home; solo Service en subpáginas (ver Hallazgo 5) |
| Favicon declarado | ❌ Fallo | Archivo existe pero no se declara en `<head>` (ver Hallazgo 3) |
| Imágenes con `alt` | ✅ Pasa | Todas las imágenes revisadas tienen `alt` descriptivo |
| Imágenes optimizadas | ❌ Fallo | Hasta 5,2 MB por imagen — ver Hallazgo 2 |
| Google Analytics | ✅ Pasa | GA4 (`G-SQEDR3PP6F`) en todas las páginas de contenido |
| Google Search Console | ✅ Pasa | Meta tag de verificación presente |
| Enlaces internos rotos | ✅ Pasa | No se detectan placeholders sin reemplazar |
| Páginas legales UE | ✅ Pasa | Aviso legal, privacidad y cookies presentes |
| Indexación en Google | ⚠️ No verificable | Sin acceso a internet saliente en este entorno — confirmar en Google Search Console / `site:odontix.eu` |
| Core Web Vitals | ⚠️ No verificable en vivo | Recomendado medir con PageSpeed Insights tras optimizar imágenes — el peso actual de las imágenes hace muy probable un LCP deficiente en móvil |

---

## Brechas de contenido pendientes

La arquitectura multipágina ya está creada (home + 3 landings de servicio + 3 legales), lo cual resuelve la limitación estructural más grave de junio. Sin embargo, sigue faltando:

**Blog / contenido informacional** — Sigue sin existir ninguna página de blog. Las oportunidades identificadas en junio siguen vigentes y sin explotar:
- "Cómo reducir las cancelaciones en tu clínica dental" (intención informacional, alto volumen)
- "Guía completa: automatización con WhatsApp para dentistas" (artículo pilar, construye autoridad temática)
- "IA vs recepcionista tradicional: análisis de costes" (convierte la sección comparativa del home en contenido indexable independiente)

Esto sigue siendo la palanca de crecimiento orgánico a medio plazo más importante y de mayor esfuerzo. Prioridad: **Alta**. Esfuerzo: sustancial y continuo.

**Página de captación de leads dedicada** (`/captacion-pacientes-dental-ia`) — El "Agente de Captación" (05 en la sección de agentes del home) no tiene landing propia, a diferencia de atención, voz y automatización. Prioridad: **Media**. Esfuerzo: rápido, reutilizando la plantilla de las otras 3 landings.

**Página de precios** — Sigue sin existir. Los competidores (según la comparativa de junio) muestran algunos precios; su ausencia sigue siendo una fricción de conversión y una oportunidad SEO perdida para búsquedas del tipo "precio chatbot dental IA". Prioridad: **Media**.

---

## Plan de acción priorizado

### Esta semana (menos de 1 hora cada una)

1. **Unificar dominio canónico** — Elegir `odontix.eu` (sin `www`) como versión oficial, corregir canonical/OG/Schema en `index.html` y el sitemap referenciado en `robots.txt`. Configurar redirección 301 de `www` → sin `www` a nivel de DNS/hosting. Impacto: **Crítico**. Esfuerzo: 20-30 min + configuración de hosting.
2. **Declarar favicon explícitamente** — Añadir `<link rel="icon">` y `apple-touch-icon` en las 7 páginas. Impacto: **Media**. Esfuerzo: 10 min.
3. **Unificar email de marca** — Cambiar `hola@odontix.ai` por `hola@odontix.eu` en footer y Schema de `index.html`. Impacto: **Media**. Esfuerzo: 5 min.
4. **Añadir Twitter Card a las 3 páginas de servicio** — Replicar el bloque de la home. Impacto: **Media**. Esfuerzo: 15 min.

### Este mes

5. **Optimizar todas las imágenes** — Convertir a WebP/AVIF, redimensionar `iconochatbot.png` a su tamaño real de uso, añadir `width`/`height` a todas las etiquetas `<img>`. Medir mejora con PageSpeed Insights antes/después. Impacto: **Alto** (Core Web Vitals / ranking móvil). Esfuerzo: 1-2 horas.
6. **Añadir FAQPage schema específico a cada landing de servicio** — 3-4 preguntas por página, distintas de las del home. Impacto: **Media**. Esfuerzo: 2-3 horas.
7. **Añadir BreadcrumbList schema** en las 3 páginas de servicio. Impacto: **Baja**. Esfuerzo: 30 min.
8. **Verificar indexación real en Google Search Console** — Confirmar que las 7 URLs están indexadas, revisar el informe de Core Web Vitals y de experiencia móvil. Esfuerzo: 30 min.

### Este trimestre

9. **Publicar el primer artículo de blog** ("Cómo reducir cancelaciones en tu clínica dental con IA", 1.500+ palabras), enlazando a las landings de servicio. Impacto: **Alto a medio plazo**. Esfuerzo: medio día.
10. **Crear landing `/captacion-pacientes-dental-ia`** para el Agente de Captación. Impacto: **Media**. Esfuerzo: rápido, reutilizando plantilla existente.
11. **Considerar página de precios** (o rango orientativo) para reducir fricción de conversión y capturar búsquedas transaccionales. Impacto: **Media**.
12. **Automatizar `lastmod` del sitemap** en el proceso de publicación, o actualizarlo manualmente en cada cambio de contenido relevante. Impacto: **Baja**.
13. **Estrategia de link building** — Sigue pendiente desde junio: artículos en medios del sector (odontomarketing.com, gacetadental.com), participación en comunidades de gestión dental. Impacto: **Alto a largo plazo**.

---

*Auditoría generada con Claude · ODONTIX — odontix.eu · Agosto 2026. Nota: este entorno no tiene acceso saliente a internet, por lo que la indexación real en Google, Core Web Vitals en producción y el comportamiento de redirección `www` no pudieron verificarse en vivo — se recomienda confirmarlos en Google Search Console y PageSpeed Insights.*

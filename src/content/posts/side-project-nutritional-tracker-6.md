---
title: "Construyendo un Nutritional Tracker: Parte 6 — Arquitectura Visual y Accesibilidad"
published: 2025-11-17T20:58:05.580Z
description: "Cómo diseñar una UI mobile-first, accesible y escalable usando TailwindCSS v4, componentes reutilizables y testing visual con Storybook."
updated: 2025-11-17T22:38:20Z
tags:
  - nutritional-tracker
  - react-project
  - tailwindcss
  - accesibilidad
  - ui-components
series: "nutritional-tracker"
seriesOrder: 6
draft: false
pin: 0
toc: true
lang: "es"
abbrlink: "side-project-nutritional-tracker-6"
---

## Construyendo un Nutritional Tracker: Parte 6 — Arquitectura Visual y Accesibilidad

## Introducción

Tras completar un formulario con validación y persistencia, surgió la pregunta inevitable: ¿cómo se ve esto en manos del usuario?

La respuesta rápida fue honesta: mal. HTML sin estilos produce interfaces frustrantes: elementos táctiles pequeños, contraste bajo y navegación poco clara. En esta entrega documenté cómo llevé la UI desde "cruda" a una capa visual consistente, mobile-first, accesible y fácil de mantener.

Aquí encontrarás las decisiones clave, fragmentos de implementación y pruebas que me dieron confianza para entregar una experiencia usable en móviles y escritorio.

(Coloca aquí la captura del formulario ANTES de aplicar estilos — HTML crudo, desalineado)

(Coloca aquí la captura del formulario DESPUÉS — móvil, limpio y moderno)

---

## Mis lineamientos de diseño

Antes de tocar una clase de Tailwind, definí principios que guiaron todas las decisiones. Los tengo en un archivo llamado `lineamientos-estilos.md` y resumo lo esencial:

### Principios fundamentales

- Mobile‑first por defecto (alto % de uso móvil).
- Targets táctiles ≥ 48 px (mejor usabilidad y accesibilidad).
- Contraste mínimo WCAG AA.
- Labels siempre visibles — nunca usar placeholder como única etiqueta.
- Feedback inmediato: validación inline y mensajes claros.

### Decisiones específicas para inputs

- Formularios cortos: ideal 3–5 campos por pantalla.
- Evitar selects para listas muy cortas → preferir radios.
- Aprovechar tipos nativos: `type="number"`, `type="date"`, etc.
- En móvil: layout de columna única para facilitar el scroll y foco.

---

## Por qué TailwindCSS v4

La elección fue pragmática: rapidez de prototipado y consistencia sin sobresalto de CSS personalizado.

Comparación rápida:

- CSS Modules: control total, pero mucho boilerplate.
- Styled Components: integración con React, pero añade peso.
- CSS vanilla: cero dependencias, pero lento para iterar.
- Tailwind v4: iteración ultrarrápida, pequeño bundle y mentalidad mobile-first.

### Configuración esencial (tailwind.config.cjs)

```javascript
// tailwind.config.cjs (extracto)
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#0ea5e9', light: '#38bdf8', dark: '#0369a1' },
        secondary: { DEFAULT: '#f59e42', light: '#fbbf24', dark: '#b45309' },
        error: { DEFAULT: '#ef4444', bg: '#fee2e2' },
        success: { DEFAULT: '#22c55e', bg: '#dcfce7' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Montserrat', 'Inter', 'sans-serif'],
      },
    },
  },
}
```

---

## Componentes UI reutilizables

El problema más repetido era: repetir 7 veces el mismo patrón label + input + error. La solución fue crear componentes con responsabilidad única.

Antes: duplicación y riesgo de inconsistencias

```tsx
<label className="block text-sm font-medium text-gray-700">
  Alimento <span className="text-red-600">*</span>
</label>
<input className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md" />
<span className="text-sm text-red-600">Campo requerido</span>
```

Después: componentes con API clara

- Label.tsx — muestra el label, el asterisco accesible y el sr-only para lectores de pantalla:

```tsx
<label className="block text-sm text-gray-700 font-medium">
  {children}
  {required && (
    <>
      <span aria-hidden="true" className="text-red-600"> *</span>
      <span className="sr-only"> requerido</span>
    </>
  )}
</label>
```

- Input.tsx — con forwardRef, manejo de estados (default, error, focus) y clases compartidas:

- RadioGroup — sustituyó selects en muchos casos; mejor para móviles por targets grandes:

```tsx
<RadioGroup
  name="mealType"
  options={mealTypeOptions.map(type => ({
    value: type,
    label: MEAL_TYPE_LABELS[type],
  }))}
  layout="grid"
/>
```

---

## Accesibilidad: teoría aplicada y pruebas automáticas

No basta con pensar “es accesible”; hay que medirlo. Integré axe-core en los tests unitarios
para validar accesibilidad en estados dinámicos.

Ejemplo de test (Jest + Testing Library + axe):

```ts
it('formulario con errores visibles sigue accesible', async () => {
  // ... simular submit vacío y mostrar errores
  const results = await runAxe(container)
  expect(results.violations).toHaveLength(0)
})
```

Resultado real en CI: 0 violaciones incluso con errores visibles.

También probé navegación por teclado y foco visible en DevTools:

---

## Storybook: QA visual y documentación viva

Storybook me permitió explorar estados concretos y automatizar interacciones:

- addons: a11y y interactions.
- stories útiles que mantengo activas:
  - Button: Primary / Secondary / Loading / Disabled
  - Input: Default / Error / Typing (con play function)
  - RadioGroup: Vertical / Grid / Error
  - RegistrationForm: MinimalSubmit (flujo feliz automatizado)

---

## Estado actual del proyecto

Lo que ya está implementado:

- ✅ Formulario 100% mobile-first con targets táctiles adecuados
- ✅ Contraste validado automáticamente (axe-core = 0 violaciones)
- ✅ Componentes documentados y testeados en Storybook

Próximos pasos:

- Visualización de datos (gráficos y reportes)
- Búsqueda y filtros en el historial

---

## Reflexión final

Próxima parte → Parte 7: Visualización de datos y reportes.

---

## Navegación de la serie

- [← Parte 5: El Formulario de Registro](./side-project-nutritional-tracker-5.md)
- [Parte 7: Migración a Next.js, Storybook y Accesibilidad →](./side-project-nutritional-tracker-7.md)

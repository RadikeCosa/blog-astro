---
title: "Construyendo un Nutritional Tracker: Parte 6 - Arquitectura Visual y Accesibilidad"
published: 2025-11-17T20:58:05.580Z
description: "Cómo diseñar una UI mobile-first, accesible y escalable usando TailwindCSS v4, componentes reutilizables y testing visual con Storybook."
updated: ''
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

## Construyendo la UI Visual y Accesibilidad — Nutrition Tracker

Este capítulo es el relato de las decisiones: qué problema resolvió cada cambio, qué alternativas descarté y qué señales usé para saber que íbamos por buen camino.

---

## Objetivos (y el motivo detrás)

- Mobile-first: porque el uso real ocurre en pantallas pequeñas. Un dedo, poca paciencia, y sesiones de segundos. Los targets táctiles de 48px+ no son un capricho: evitan toques fallidos y fatiga.
- Accesibilidad práctica: readers, teclado, contraste. No para “cumplir”, sino porque los errores más costosos ocurren cuando alguien no puede completar una tarea simple.
- Consistencia visual: mismo lenguaje en colores, tipografías y espaciados. La UI es un sistema; si cada pieza “habla” distinto, la carga cognitiva aumenta.
- Documentación ligera: para que el yo del futuro (o cualquier colaborador) pueda continuar sin romper lo que ya funciona.

---

## Decisión 1: TailwindCSS v4

Problema: necesitaba velocidad para iterar y una forma de mantener decisiones de diseño en un solo lugar.

Por qué Tailwind v4: la nueva sintaxis con `@import "tailwindcss"` simplifica el arranque, el plugin `@tailwindcss/postcss` funciona bien con Vite, y el theme centraliza colores, tipografías y breakpoints. Pasé de “¿dónde estaba ese estilo?” a “está en el theme”.

Señales de que funcionó:

- Reduje CSS ad hoc en componentes.
- Pude ajustar espaciados y tipografías de forma global sin side effects.

Ejemplo base en `src/styles/tailwind.css`:

```css
@import "tailwindcss";

@layer base {
  html {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}
```

> ![Placeholder: Configuración de Tailwind](../../assets/images/nutrition-tracker-fase4-tailwind-config.jpg)
> Vista del theme extendido (colores, fuentes, breakpoints).

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0ea5e9', // azul principal
          light: '#38bdf8', // azul claro
          dark: '#0369a1', // azul oscuro
        },
        secondary: {
          DEFAULT: '#f59e42', // naranja secundario
          light: '#fbbf24',
          dark: '#b45309',
        },
        error: {
          DEFAULT: '#ef4444', // rojo error
          bg: '#fee2e2', // fondo error
        },
        success: {
          DEFAULT: '#22c55e', // verde éxito
          bg: '#dcfce7', // fondo éxito
        },
        neutral: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          'Avenir',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
        heading: ['Montserrat', 'Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        xs: '0.5rem', // 8px
        sm: '1rem', // 16px
        md: '1.5rem', // 24px
        lg: '2rem', // 32px
        xl: '3rem', // 48px
      },
      borderRadius: {
        sm: '0.375rem', // 6px
        md: '0.5rem', // 8px
        lg: '1rem', // 16px
      },
      screens: {
        'xs': '400px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
}
```

### Cómo leer este config (rápido)

- Paleta: `theme.extend.colors` define colores de marca y estados (`primary`, `secondary`, `error`, `success`, `neutral`). Úsalos con utilidades como `text-primary`, `bg-primary-light`, `border-error` y la escala `neutral` para fondos/separadores.
- Tipografías: `theme.extend.fontFamily` fija `sans` (texto base) y `heading` (títulos). En la UI se aplica `font-sans` al cuerpo y la familia `heading` en componentes de encabezado.
- Breakpoints: `theme.extend.screens` centraliza los cortes (`xs` → `2xl`). Aplica estilos responsivos con prefijos como `sm:`, `md:`, `lg:` para mantener el enfoque mobile-first.

---

## Decisión 2: Componentes UI reutilizables

Problema: cada campo tenía microvariaciones de estilo y validación. Eso se vuelve inmanejable cuando crecen los formularios.

Por qué extraer componentes: encapsular patrones (“label encima”, `aria-invalid`, bordes de error, focus states) y dejar que la lógica del formulario se enfoque en datos.

Qué cambió en la práctica:

- `Input`, `Select`, `Textarea` y `RadioGroup` comparten convenciones.
- `Label` agrega el asterisco accesible cuando es requerido.
- `ErrorMessage` y `FeedbackMessage` estandarizan cómo mostramos problemas y éxitos.

Fragmento real del formulario:

```tsx
<div>
  <Label htmlFor="food" required>Alimento</Label>
  <Input id="food" placeholder="Ej. Manzana" hasError={!!errors.food} {...register('food')} />
  <ErrorMessage message={errors.food?.message} />
</div>
```

> ![Placeholder: Formulario con componentes](../../assets/images/nutrition-tracker-fase4-form-components.jpg)
> El formulario habla “un mismo idioma” visual.

---

## Decisión 3: Accesibilidad desde el inicio

Problema: la accesibilidad suele postergarse y luego cuesta el doble. Quise evitar deuda técnica.

Qué hice: añadí axe-core a la suite y diseñé casos reales (errores visibles, loading, disabled, radiogroups sin selección, etc.).

Señales de que funcionó:

- Cero violaciones tras activar reglas de contraste.
- Las etiquetas están asociadas a controles; hay foco visible y navegación por teclado.

Ejemplo de helper de test:

```ts
async function runAxe(container: HTMLElement) {
  return await axe.run(container)
}
```

> ![Placeholder: Tests de accesibilidad](../../assets/images/nutrition-tracker-fase4-a11y-tests.jpg)
> La accesibilidad se valida en cada ejecución, no solo antes de publicar.

### Snippets de tests (axe-core)

```tsx
// Helper reutilizable
async function runAxe(container: HTMLElement) {
  return await axe.run(container)
}

// Registro inicial sin violaciones (incluye contraste)
it('no violations on initial render (including contrast)', async () => {
  // const { container } = render(<RegistrationForm />)
  const results = await runAxe(container)
  expect(results.violations).toHaveLength(0)
})
```

```tsx
// Estados dinámicos: loading y error vinculado
it('Loading Button state has no violations', async () => {
  // const { container } = render(<Button isLoading>Guardar registro</Button>)
  const results = await runAxe(container)
  expect(results.violations).toHaveLength(0)
})

it('Input with aria-invalid + linked ErrorMessage has no violations', async () => {
  // const { container } = render(
  //   <div>
  //     <label htmlFor="food">Alimento</label>
  //     <Input id="food" aria-invalid="true" aria-describedby="food-error" />
  //     <ErrorMessage id="food-error" message="Alimento requerido" />
  //   </div>
  // )
  const results = await runAxe(container)
  expect(results.violations).toHaveLength(0)
})
```

---

## Decisión 4: Storybook para ver lo que no dicen los tests

Problema: los tests unitarios no muestran “cómo se ve” un estado. Y los edge cases aparecen tarde.

Por qué Storybook: documenta estados (error, disabled, loading) y variantes (primary/secondary, vertical/grid) en aislamiento. Ideal para QA visual y feedback rápido.

> ![Placeholder: Storybook de componentes](../../assets/images/nutrition-tracker-fase4-storybook.jpg)
> Historias con interacciones mínimas para validar estilos y estados.

---

## Próximos pasos

- Visualización de datos y reportes (gráficos simples primero, utilidad antes que sofisticación).
- Búsqueda y filtros para el historial.

---

## Referencias

- [TailwindCSS v4](https://tailwindcss.com)
- [axe-core](https://github.com/dequelabs/axe-core)
- [Storybook](https://storybook.js.org)
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- [React Hook Form](https://react-hook-form.com)

> **Nota**: Las capturas mencionadas son placeholders. Las agregaré cuando estén listas.

---

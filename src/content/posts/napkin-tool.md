---
title: "Home Tools - Napkin Calculator"
published: 2025-12-12T02:26:41.279Z
description: 'Calculadora interactiva para estimar cuántas servilletas podés cortar de un paño de tela y el costo por unidad, como parte del hub de utilidades Home Tools.'
updated: ''
tags:
  - algoritmos
draft: true
pin: 0
toc: true
lang: "es"
abbrlink: "napkin-tool"
---
## Napkin Calculator: una mini-herramienta dentro de “Home Tools”

Este proyecto está pensado como un “hub” de herramientas digitales simples (utilities) construidas con Next.js (App Router). Una de esas herramientas es **Napkin Calculator**, una calculadora que te ayuda a estimar cuántas servilletas podés cortar desde un paño de tela y cuánto te costaría cada una.

La idea general: cada utilidad vive como una ruta independiente dentro de `app/` y el home actúa como tablero de acceso.

---

## Stack y enfoque

- **Next.js + App Router**: cada herramienta es una ruta (por ejemplo `/napkin-calculator`).
- **React (Client Components)**: la calculadora usa estado local (`useState`) porque es una UI interactiva.
- **TypeScript**: tipa el resultado (`NapkinResult`) para mantener consistencia.
- **Tailwind CSS + variables CSS**: se usan clases utility y además variables globales (`--color-*`, `--font-*`) para mantener un “design system” simple.

---

## Estructura de archivos (lo importante)

Dentro de esta utilidad:

```text
app/

  napkin-calculator/
    page.tsx
    README.md
    components/
      Napkins.tsx
      NapkinForm.tsx
      NapkinResults.tsx
```

Y a nivel “hub” del proyecto:

- `app/page.tsx`: lista de utilidades (un array con `path`, `title`, `description`) y renderiza tarjetas.
- `components/UtilityCard.tsx`: tarjeta clickeable (Link) para navegar a cada herramienta.
- `app/layout.tsx`: layout global con header/footer.
- `app/globals.css`: define variables globales para colores y fuentes.

Este esquema escala bien: para agregar otra utilidad, típicamente creás `app/<tu-utilidad>/page.tsx`, su carpeta `components/`, y agregás una entrada en el array del home.

---

## Cómo funciona Napkin Calculator (flujo de la app)

La ruta [`app/napkin-calculator/page.tsx`](./page.tsx) es intencionalmente mínima: solo monta el componente principal.

La lógica está centralizada en [`app/napkin-calculator/components/Napkins.tsx`](./components/Napkins.tsx):

1. Mantiene el estado de los inputs como strings (`fabricPrice`, `fabricWidth`, `fabricLength`, `napkinWidth`, `napkinHeight`).
1. Al enviar el formulario (**Calculate** o tecla **Enter**), convierte a números (`parseFloat`) y valida con `Number.isFinite(...)` y `> 0`. Si la validación falla, no muestra resultados y presenta un mensaje de error **inline** en el formulario (sin `alert()`).
1. Calcula cuántas servilletas entran en **dos orientaciones**:

   - **Normal**: servilleta $(ancho \times alto)$
   - **Rotada 90°**: servilleta $(alto \times ancho)$

1. Elige la orientación que produzca mayor cantidad total.
1. Si el cálculo da `totalNapkins === 0` (por ejemplo, porque la servilleta es más grande que la tela), no se renderizan resultados y se muestra un error indicando que no entra ninguna servilleta con esas dimensiones.
1. Calcula métricas:
   - `totalNapkins`
   - `costPerNapkin = price / totalNapkins`
   - `utilization = usedArea / fabricArea * 100`
1. Renderiza el resultado con [`NapkinResults.tsx`](./components/NapkinResults.tsx).

La UI se divide en componentes bien separados:

- [`NapkinForm.tsx`](./components/NapkinForm.tsx): inputs + botones (Calculate / Clear).
- [`NapkinResults.tsx`](./components/NapkinResults.tsx): salida formateada (incluye una barra visual para el % de utilización).

---

## Detalle del cálculo (en palabras)

Con una tela de **ancho** $W$ y **largo** $L$, y una servilleta de **ancho** $w$ y **alto** $h$:

- Orientación normal:

  - `napkinsPerRow1 = floor(W / w)`
  - `napkinsPerCol1 = floor(L / h)`
  - `total1 = napkinsPerRow1 * napkinsPerCol1`

- Orientación rotada:
  - `napkinsPerRow2 = floor(W / h)`
  - `napkinsPerCol2 = floor(L / w)`
  - `total2 = napkinsPerRow2 * napkinsPerCol2`

Luego se toma `max(total1, total2)` y se reporta la orientación elegida (con un aviso si la rotación mejora el resultado).

---

## Puntos fuertes

- **Separación clara de responsabilidades**: formulario, cálculo y resultados están en componentes distintos.
- **Decisión inteligente de orientación**: comparar “normal vs rotada” es una mejora real para el usuario final.
- **UI responsive y consistente**: se apoya en Tailwind y en variables CSS globales para mantener coherencia visual.
- **Tipado del resultado**: `NapkinResult` evita inconsistencias al renderizar.
- **Extensible como “hub de herramientas”**: el home basado en un array permite sumar utilidades de forma rápida.

---

## Posibilidades de mejora (prácticas y realistas)

### UX y accesibilidad (ya implementado)

- En vez de `alert()`, el formulario muestra un mensaje de error **inline** (más claro y menos intrusivo).
- Se puede disparar el cálculo con **Enter** gracias a un `<form onSubmit>` (con `preventDefault`).
- Los campos numéricos incluyen `min`, `step` e `inputMode` para mejorar usabilidad (especialmente en móvil).

### Validaciones y robustez (ya implementado)

- La validación usa `Number.isFinite(...)` y `> 0` para diferenciar vacío/NaN de valores inválidos.
- Se maneja explícitamente el caso `totalNapkins === 0`: se limpia el resultado y se muestra un error.

### Dominio (corte real)

- Mostrar también **desperdicio** (área sobrante) y/o una recomendación: “te conviene rotar / usar otra medida”.

### Arquitectura y testeo

- Extraer el cálculo a una función pura (ej. `calculateNapkins(...)`) y agregar tests unitarios.
- Si sumás más utilidades, definir un “contrato” (tipo) para el listado del home (`Utility` con `path/title/description`).

---

## Cierre

Napkin Calculator es un muy buen ejemplo de utilidad pequeña pero completa: UI clara, cálculo útil y estructura lista para escalar. A medida que sumes herramientas, el mayor salto de calidad va a venir de estandarizar validaciones, mensajes de error y extraer lógica a funciones testeables.

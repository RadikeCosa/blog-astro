---
title: "Par For The Hole - FreeCodeCamp #154 Daily Challenge"
published: 2026-01-12T16:48:01.606Z
description: 'Resolvemos "Par For The Hole" (FreeCodeCamp Daily Challenge): cómo mapear el score de golf a términos clásicos. Análisis, código comentado y reflexiones.'
updated: ''
tags:
  - freecodecamp
  - daily-challenge
  - algoritmos
draft: false
pin: 0
toc: true
lang: "es"
abbrlink: "par-for-the-hole"
---

## Par For The Hole: Análisis y Explicación

### Enunciado

Dado el par de un hoyo de golf y la cantidad de golpes realizados, devuelve el score usando términos clásicos del golf:

- "Hole in one!" si se hace en un solo golpe.
- "Eagle" si se hace en dos golpes menos que el par.
- "Birdie" si se hace en un golpe menos que el par.
- "Par" si se hace en el mismo número de golpes que el par.
- "Bogey" si se hace en un golpe más que el par.
- "Double bogey" si se hace en dos golpes más que el par.

## Análisis Inicial

### Comprensión del Problema

El problema requiere comparar dos enteros y devolver el término adecuado según la diferencia entre golpes y par, siguiendo las reglas del golf.

### Casos de Prueba

- golfScore(3, 3) → "Par"
- golfScore(4, 3) → "Birdie"
- golfScore(3, 1) → "Hole in one!"
- golfScore(5, 7) → "Double bogey"
- golfScore(4, 5) → "Bogey"
- golfScore(5, 3) → "Eagle"

## Desarrollo de la Solución

### Enfoque

El enfoque consiste en una serie de condicionales que comparan los dos enteros y retornan el string correspondiente según las reglas del golf.

### Implementación Paso a Paso

1. Definir la función `golfScore` que toma dos parámetros: `par` y `strokes`.
2. Usar condicionales para comparar `strokes` con `par` y retornar el string adecuado.

### Código Final

```javascript
/**
 * Determina el score de golf basado en el par y los golpes realizados.
 * @param {number} par - El par para el hoyo.
 * @param {number} strokes - El número de golpes realizados.
 * @returns {string} El score en términos golfísticos.
 */
function golfScore(par, strokes) {
  if (strokes === 1)
    return 'Hole in one!'
  if (strokes <= par - 2)
    return 'Eagle'
  if (strokes === par - 1)
    return 'Birdie'
  if (strokes === par)
    return 'Par'
  if (strokes === par + 1)
    return 'Bogey'
  if (strokes === par + 2)
    return 'Double bogey'
  // Opcional: manejar otros casos
  return 'Fuera de rango'
}
```

## Análisis de Complejidad

### Complejidad Temporal

La función realiza comparaciones condicionales simples, todas en tiempo constante. Por lo tanto, la complejidad temporal es $O(1)$.

### Complejidad Espacial

El uso de espacio es $O(1)$, ya que no se utilizan estructuras adicionales.

## Casos Edge y Consideraciones

- Si los golpes son menores a par - 2 (por ejemplo, par 5 y 2 golpes), la función retorna "Eagle".
- Si los golpes son mayores a par + 2, ahora retorna "Fuera de rango" para mayor claridad.

## Reflexiones y Aprendizajes

### Conceptos Aplicados

- Uso de condicionales encadenados para mapear reglas de negocio simples
- Simulación de lógica de scoring basada en reglas del dominio (golf)

### Posibles Optimizaciones

- Se puede extender para contemplar otros términos de golf si la consigna lo requiere.

## Recursos y Referencias

- [Wikipedia: Par (score)](https://en.wikipedia.org/wiki/Par_(score))
- [Wikipedia: Glossary of golf](https://en.wikipedia.org/wiki/Glossary_of_golf)

---

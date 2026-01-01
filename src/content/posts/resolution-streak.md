---
title: "Racha de Resoluciones - FreeCodeCamp #144 Daily Challenge"
published: 2026-01-01T23:12:42.550Z
description: 'Resolvemos "Resolution Streak" de FreeCodeCamp #144 Daily Challenge utilizando JS.'
updated: ''
tags:
  - algoritmos
draft: false
pin: 0
toc: true
lang: "es"
abbrlink: "resolution-streak"
---

## Racha de Resoluciones — Análisis y solución

### Enunciado

Se recibe un array de días; cada día es un array con tres valores numéricos: `[pasos, minutosPantalla, paginasLeidas]`.

Un día se considera exitoso si se cumplen las tres condiciones:

- Haber caminado al menos 10.000 pasos.
- Tener como máximo 120 minutos de tiempo de pantalla.
- Haber leído al menos 5 páginas.

Si todos los días de la entrada son exitosos, la función debe devolver:

`Resolution on track: N day streak.`

Si existe un día que no cumple las condiciones, debe devolver la primera falla indicando el día (1-based) y la racha hasta ese punto:

`Resolution failed on day X: M day streak.`

### Enfoque

Recorrer los días en orden, validar cada entrada y mantener un contador de días exitosos. En la primera falla, devolver el mensaje correspondiente (salida temprana). Si se procesan todos los días sin fallos, devolver el mensaje de "on track" con el total de días exitosos.

La solución es O(n) en tiempo y O(1) en espacio adicional.

### Implementación (JavaScript)

```javascript
/**
 * Determina la racha de días exitosos según las metas diarias.
 * @param {Array<Array<number|string>>} days - Array de días, cada uno con [pasos, minutosPantalla, paginasLeidas]
 * @returns {string} Mensaje con el estado de la racha
 */
function resolutionStreak(days) {
  if (!Array.isArray(days))
    throw new TypeError('Se esperaba un array de días')

  let successfulDays = 0

  for (let i = 0; i < days.length; i++) {
    const day = days[i]

    if (!Array.isArray(day) || day.length < 3) {
      throw new TypeError(`Día inválido en el índice ${i}: se esperaba [pasos, minutosPantalla, paginasLeidas]`)
    }

    const [steps, screenTime, pagesRead] = day.map(Number)

    if (!Number.isFinite(steps) || !Number.isFinite(screenTime) || !Number.isFinite(pagesRead)) {
      throw new TypeError(`Valores numéricos inválidos en el día ${i + 1}`)
    }

    const isSuccessful = steps >= 10000 && screenTime <= 120 && pagesRead >= 5

    if (isSuccessful) {
      successfulDays++
    }
    else {
      return `Resolution failed on day ${i + 1}: ${successfulDays} day streak.`
    }
  }

  return `Resolution on track: ${successfulDays} day streak.`
}

export default resolutionStreak
```

### Ejemplos

```javascript
import resolutionStreak from './resolutionStreak'

console.log(resolutionStreak([[10000, 120, 5], [12000, 90, 10]]))
// → "Resolution on track: 2 day streak."

console.log(resolutionStreak([[10000, 120, 5], [9000, 80, 6]]))
// → "Resolution failed on day 2: 1 day streak."
```

### Complejidad

- Temporal: $O(n)$, donde $n$ es el número de días (se procesa cada día una vez).
- Espacial: $O(1)$ adicional.

### Casos límite y validación

- Entrada vacía: devuelve `Resolution on track: 0 day streak.`.
- Estructura inválida o valores no numéricos: se lanza `TypeError`.
- Se aceptan números en formato de cadena (por ejemplo, `"10000"`) gracias a la conversión con `Number()`; si la conversión no produce un número finito se considera inválido.

### Reflexiones

La estrategia de salida temprana (early exit) permite detectar la primera falla sin procesar días adicionales, lo que es óptimo para este problema. Si se requiriera encontrar la racha máxima (no necesariamente desde el inicio), habría que usar un algoritmo diferente que rastree subsecuencias consecutivas.

### Recursos

- FreeCodeCamp Daily Coding Challenge
- Patrones: validación de entrada, salida temprana

---
title: "Eliminar el Más Frecuente - FreeCodeCamp #132 Daily Challenge"
published: 2025-12-20T12:08:54.082Z
description: 'Resolvemos "Purge Most Frequent": eliminar todos los elementos más frecuentes de un array, manejando empates y tipos variados. Incluye explicación, código y análisis.'
updated: ''
tags:
  - daily-challenge
  - freecodecamp
draft: false
pin: 0
toc: true
lang: "es"
abbrlink: "purge-most-frequent"
---

## Eliminar el Más Frecuente - Análisis y Explicación

### Enunciado

Dado un array, elimina todas las ocurrencias del elemento más frecuente y devuelve el array resultante.

- Si hay empate en la frecuencia máxima, elimina todos esos elementos.
- El orden de los demás elementos no debe cambiar.

## Análisis Inicial

### ¿Qué pide el problema?

Identificar el/los elemento(s) más frecuentes en el array y eliminar todas sus ocurrencias, manteniendo el orden de los demás.

#### Ejemplos

1. `[1, 2, 2, 3]` → `[1, 3]`  (el más frecuente es `2`)
2. `["a", "b", "d", "b", "c", "d", "c", "d", "c", "d"]` → `["a", "b", "b", "c", "c", "c"]`  (el más frecuente es `d`)
3. `["red", "blue", "green", "red", "blue", "green", "blue"]` → `["red", "green", "red", "green"]`  (el más frecuente es `blue`)
4. `[5, 5, 5, 5]` → `[]`  (todos son el más frecuente)

**Casos edge:**

- Array vacío: `[]` → `[]`
- Todos con la misma frecuencia: `[1, 2, 3, 4]` → `[]`
- Elementos no primitivos: `[{a:1}, {a:1}, {b:2}]` (cada objeto es único por referencia)
- Booleanos: `[true, false, true, false, true]` → `[false, false]`

## Solución y Explicación

### Enfoque propuesto

1. Contar la frecuencia de cada elemento usando un `Map`.
2. Identificar la frecuencia máxima y todos los valores que la alcanzan (puede haber empate).
3. Filtrar el array original excluyendo los elementos más frecuentes, manteniendo el orden.

Este método es eficiente, claro y maneja empates y cualquier tipo de dato primitivo.

### Implementación en JavaScript

```javascript
function purgeMostFrequent(arr) {
  const frequencyMap = new Map()
  // Contar frecuencias
  for (const item of arr) {
    frequencyMap.set(item, (frequencyMap.get(item) || 0) + 1)
  }
  // Encontrar la frecuencia máxima
  const maxFrequency = Math.max(...frequencyMap.values())
  // Identificar los elementos más frecuentes
  const mostFrequent = new Set(
    [...frequencyMap.entries()]
      .filter(([_, freq]) => freq === maxFrequency)
      .map(([item]) => item)
  )
  // Filtrar el array original
  return arr.filter(item => !mostFrequent.has(item))
}
```

## Análisis de Complejidad

- **Tiempo:** $O(n + k)$, donde $n$ es la longitud del array y $k$ el número de elementos únicos. En el peor caso, $O(n)$.
- **Espacio:** $O(k)$, por el `Map` y el `Set` de elementos únicos.

## Casos Edge y Consideraciones

- Array vacío: retorna array vacío.
- Todos con la misma frecuencia: resultado vacío.
- Elementos no primitivos: cada objeto es único por referencia.
- Booleanos, null, undefined: manejados correctamente.
- Inmutabilidad: el array original no se modifica.

## Reflexiones y Aprendizajes

- Uso de `Map` y `Set` para conteo y filtrado eficiente.
- Separación clara de fases: conteo, identificación y filtrado.
- El patrón de filtrado por propiedad global es muy útil en arrays.
- Si los datos son siempre primitivos, se podría usar un objeto simple en vez de `Map`.
- Algoritmos de una sola pasada no son viables aquí, porque hay que conocer la frecuencia máxima antes de filtrar.

## Recursos y Referencias

- [MDN Web Docs: Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
- [MDN Web Docs: Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
- [Counting Elements in JavaScript](https://2ality.com/2015/01/es6-set-operations.html)

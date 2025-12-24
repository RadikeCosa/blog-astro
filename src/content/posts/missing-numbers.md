---
title: "Números Faltantes - FreeCodeCamp #34 Daily Challenge"
published: 2025-12-24T01:34:16.986Z
description: 'Resolvemos "Missing Numbers" de FreeCodeCamp, un desafío de algoritmos que implica encontrar números faltantes en una secuencia.'
updated: ''
tags:
  - freecodecamp
  - daily-challenge
draft: false
pin: 0
toc: true
lang: "es"
abbrlink: "missing-numbers"
---

## Enunciado

Dado un array de enteros del 1 al n (inclusive), devuelve un array con todos los números que faltan en el rango [1, n], donde n es el valor máximo del array.

- El array puede estar desordenado y tener duplicados.
- El resultado debe estar en orden ascendente.
- Si no falta ningún número, retorna un array vacío.

## Análisis Inicial

El objetivo es identificar los números ausentes en el rango [1, n], considerando duplicados y desorden. El resultado siempre debe estar ordenado.

### Casos de Prueba

1. **Sin faltantes:**
  - Input: [1, 2, 3, 4, 5]
  - Output: []
2. **Faltan intermedios:**
  - Input: [1, 3, 5]
  - Output: [2, 4]
3. **Solo extremos:**
  - Input: [1, 10]
  - Output: [2, 3, 4, 5, 6, 7, 8, 9]
4. **Duplicados y desorden:**
  - Input: [10, 1, 10, 1, 10, 1]
  - Output: [2, 3, 4, 5, 6, 7, 8, 9]
5. **Faltan valores dispersos:**
  - Input: [3, 1, 4, 1, 5, 9]
  - Output: [2, 6, 7, 8]
6. **Un solo faltante, muchos duplicados:**
  - Input: [1, 2, 3, 4, 5, 7, 8, 9, 10, 12, 6, 8, 9, 3, 2, 10, 7, 4]
  - Output: [11]

## Solución y Explicación

El método más directo es:

1. Encontrar el valor máximo del array (`n`).
2. Usar un array auxiliar o un `Set` para marcar los números presentes.
3. Recorrer el rango [1, n] y recolectar los que no están presentes.

Esto permite manejar duplicados y desorden, y asegura que el resultado esté ordenado.

## Código Final

```js
function findMissingNumbers(arr) {
  const max = Math.max(...arr)
  const count = new Array(max + 1).fill(0)
  for (const num of arr) count[num] = 1
  const missing = []
  for (let i = 1; i <= max; i++) {
    if (!count[i])
      missing.push(i)
  }
  return missing
}
```

## Análisis de Complejidad

- **Tiempo:** $O(n + m)$, donde $n$ es la longitud del array y $m$ el valor máximo.
- **Espacio:** $O(m)$ por el array auxiliar.

## Edge Cases y Consideraciones

- Si el array está vacío, retorna [].
- Si no falta ningún número, retorna [].
- Soporta duplicados y desorden.

## Recursos

- [Documentación de Array en MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array)

---

---
title: "Duplicados en Array - FreeCodeCamp Daily Challenge"
published: 2025-12-11T21:40:59.335Z
description: 'Resolvemos "Array Duplicates", un desafío de FreeCodeCamp que implica encontrar números duplicados en un array de enteros. Analizamos el problema, desarrollamos una solución eficiente y discutimos su complejidad.'
updated: ''
tags:
  - freecodecamp
  - daily-challenge
draft: false
pin: 0
toc: true
lang: "es"
abbrlink: "array-duplicates"
---

## Array Duplicates: Análisis y Solución

## Enunciado

Dado un array de enteros, retorna un nuevo array con los números que aparecen más de una vez, ordenados de menor a mayor y sin repeticiones. Si no hay duplicados, retorna un array vacío.

## Análisis Inicial

**Puntos clave:**

- Solo se consideran duplicados los números que aparecen al menos dos veces.
- El resultado no debe contener repeticiones.
- El array de salida debe estar ordenado de menor a mayor.
- Si no hay duplicados, el resultado es un array vacío.

### Casos de Prueba

| Entrada | Salida esperada | Explicación |
|---|---|---|
| `[1, 2, 3, 4, 5]` | `[]` | No hay duplicados |
| `[1, 2, 3, 4, 1, 2]` | `[1, 2]` | 1 y 2 aparecen más de una vez |
| `[2, 34, 0, 1, -6, 23, 5, 3, 2, 5, 67, -6, 23, 2, 43, 2, 12, 0, 2, 4, 4]` | `[-6, 0, 2, 4, 5, 23]` | Varios duplicados, incluyendo negativos y ceros |

## Desarrollo de la Solución

### Estrategia

1. Usar un `Map` para contar la frecuencia de cada número (soporta negativos y ceros).
2. Filtrar los números cuya frecuencia sea mayor a 1.
3. Ordenar el resultado de menor a mayor.
4. Retornar el array (vacío si no hay duplicados).

### Código Final Comentado

```javascript
/**
 * Retorna los números duplicados de un array, ordenados y sin repeticiones.
 * @param {number[]} arr - Array de enteros
 * @returns {number[]} Array de duplicados ordenados
 */
function findDuplicates(arr) {
  const frequencyMap = new Map() // Guarda la frecuencia de cada número
  const result = []

  // Contar frecuencias
  for (const num of arr) {
    frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1)
  }

  // Filtrar duplicados
  for (const [num, count] of frequencyMap.entries()) {
    if (count > 1)
      result.push(num)
  }

  // Ordenar de menor a mayor
  result.sort((a, b) => a - b)
  return result
}

export default findDuplicates
```

## Análisis de Complejidad

### Temporal

- Contar frecuencias: $O(n)$
- Filtrar duplicados: $O(n)$
- Ordenar duplicados: $O(k \log k)$, donde $k$ es la cantidad de duplicados
- **Total:** $O(n + k \log k)$

### Espacial

- `Map` de frecuencias: hasta $O(n)$
- Array de resultado: hasta $O(n)$
- **Total:** $O(n)$

## Casos Edge y Consideraciones

- Array vacío → retorna `[]`
- Todos únicos → retorna `[]`
- Todos iguales → retorna `[valor]`
- Números negativos, ceros y positivos → soportados
- Arrays grandes → eficiente

## Reflexiones y Aprendizajes

- Uso de `Map` para conteo eficiente
- Filtrado y ordenamiento numérico
- Validación de casos edge

## Recursos

- [MDN: Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
- [MDN: Array.prototype.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

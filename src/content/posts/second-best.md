---
title: "Segundo Mejor - FreeCodeCamp Daily Challenge"
published: 2025-12-09T22:32:36.337Z
description: 'Resolvimos "Second Best" de FreeCodeCamp, un desafío que implica encontrar el segundo laptop más caro dentro de un presupuesto dado, ignorando precios duplicados.'
updated: ''
tags:
  - freecodecamp
  - daily-challenge
draft: false
pin: 0
toc: true
lang: "es"
abbrlink: "second-best"
---
## Enunciado del Problema

Dado un arreglo de enteros que representa los precios de diferentes laptops y un entero que representa tu presupuesto, implementa una función que retorne:

- El segundo laptop más caro si está dentro de tu presupuesto, o
- El laptop más caro que esté dentro de tu presupuesto, o
- 0 si ningún laptop está dentro de tu presupuesto.

Los precios duplicados deben ser ignorados.

## Análisis Inicial

### Comprensión del Problema

La función debe recibir una lista de precios de laptops y un presupuesto máximo. El objetivo es identificar cuál es el laptop más caro que puedes comprar, pero si hay al menos dos laptops dentro del presupuesto, debes devolver el precio del segundo más caro. Es importante ignorar precios duplicados para que cada laptop se considere solo una vez. Si no hay laptops que puedas comprar con tu presupuesto, la función debe devolver 0.

### Casos de Prueba Identificados

1. `[1500, 2000, 1800, 1400], 1900` → Debe devolver `1800` (el más caro dentro del presupuesto).
2. `[1500, 2000, 2000, 1800, 1400], 1900` → Debe devolver `1800` (ignora duplicados, el más caro dentro del presupuesto).
3. `[2099, 1599, 1899, 1499], 2200` → Debe devolver `1899` (el más caro dentro del presupuesto).
4. `[2099, 1599, 1899, 1499], 1000` → Debe devolver `0` (ningún laptop dentro del presupuesto).
5. `[1200, 1500, 1600, 1800, 1400, 2000], 1450` → Debe devolver `1400` (el más caro dentro del presupuesto).
6. `[1000, 1200, 1300, 1400], 1500` → Debe devolver `1300` (el más caro es 1400, el segundo más caro es 1300, ambos dentro del presupuesto).

El caso 6 es importante para verificar que la función devuelve el segundo más caro cuando ambos (el más caro y el segundo más caro) están dentro del presupuesto.

## Desarrollo de la Solución

### Enfoque Elegido

El enfoque consiste en procesar la lista de precios para obtener únicamente los valores únicos, eliminando cualquier duplicado mediante la utilización de un `Set`. Luego, se filtran los precios que no superen el presupuesto disponible. A continuación, se ordenan los precios válidos de mayor a menor. Si tanto el precio más caro como el segundo más caro están dentro del presupuesto, se retorna el segundo más caro. Si el precio más caro está fuera del presupuesto, se retorna el más caro que sí entra. Si solo hay un precio dentro del presupuesto, se retorna ese valor; y si no hay ninguno, se retorna 0. Este método garantiza que se cumplan todas las condiciones del enunciado de manera eficiente y clara.

### Implementación Paso a Paso

1. Convertir el arreglo de precios en un `Set` para eliminar duplicados y luego volverlo a un arreglo.
2. Filtrar los precios para quedarse solo con aquellos que sean menores o iguales al presupuesto.
3. Ordenar el arreglo filtrado de mayor a menor.
4. Verificar la cantidad de precios dentro del presupuesto:
   - Si hay al menos dos, devolver el segundo más caro (índice 1).
   - Si hay solo uno, devolver ese precio (índice 0).
   - Si no hay ninguno, devolver 0.

### Código de la Solución

```javascript
/**
 * FreeCodeCamp Problem: Second Best
 * Category: FreeCodeCamp
 *
 * @param {number[]} laptops - Array de precios de laptops
 * @param {number} budget - Presupuesto disponible
 * @returns {number} El precio del segundo mejor laptop dentro del presupuesto, o el mejor, o 0
 */
function getLaptopCost(laptops, budget) {
  const uniquePrices = Array.from(new Set(laptops))
  uniquePrices.sort((a, b) => b - a)

  // Filtrar los precios que están dentro del presupuesto
  const affordable = uniquePrices.filter(price => price <= budget)

  if (affordable.length === 0) {
    return 0
  }

  // Si el más caro está dentro del presupuesto y hay al menos dos, devolver el segundo más caro
  if (affordable.length >= 2) {
    return affordable[1]
  }

  return affordable[0]
}

export default getLaptopCost
```

La complejidad temporal de la solución es $O(n + k \log k)$, donde $n$ es la cantidad de precios en el arreglo original y $k$ es la cantidad de precios únicos.

- Eliminar duplicados con `Set`: $O(n)$

### Complejidad Espacial

- Si todos los precios están por encima del presupuesto, la función retorna 0.
- Si solo hay un precio dentro del presupuesto, se retorna ese valor.
- Si hay dos o más precios dentro del presupuesto y el más caro está dentro, se retorna el segundo más caro.
- Si el más caro está fuera del presupuesto, se retorna el más caro que sí entra.
- Eliminar duplicados garantiza que no se cuenten laptops repetidos.

## Reflexiones y Aprendizajes

### Conceptos Aplicados

- Uso de `Set` para eliminar duplicados de manera eficiente.
- Filtrado y ordenamiento de arreglos.
- Manejo de condiciones y casos edge en problemas de selección.

### Posibles Optimizaciones

- Para arreglos muy grandes, se podría optimizar el ordenamiento si solo interesa el primero y segundo más caro dentro del presupuesto, usando algoritmos de selección en vez de ordenar todo el arreglo.
- El uso de estructuras como heaps podría ser útil si el problema se extiende a encontrar el k-ésimo más caro.

## Recursos y Referencias

- [Documentación de Set en JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Set)
- [Array.prototype.sort()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
- [Algoritmos de selección](https://en.wikipedia.org/wiki/Selection_algorithm)

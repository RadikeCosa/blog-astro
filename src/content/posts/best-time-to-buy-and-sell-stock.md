---
title: "Mejor Momento Para Comprar y Vender Acciones - LeetCode #121 Top-Interview 7/150"
published: 2025-11-25T11:45:49.663Z
description: ''
updated: ''
tags:
  - top-interview-150
  - leetcode
draft: false
pin: 0
toc: true
lang: "es"
abbrlink: "best-time-to-buy-and-sell-stock"
---
## Introducción

Hoy abordamos problema de LeetCode #121: **Mejor momento para comprar y vender acciones**. Es el septimo desafio del conjunto Top Interview 150 de LeetCode.

## Enunciado del Problema

Se te da un array `prices` donde `prices[i]` representa el precio de una acción en el día `i`. Tu objetivo es maximizar el beneficio eligiendo **un solo día** para comprar y un día posterior para vender. Si no hay ganancia posible, debes devolver `0`.

**Ejemplo 1:**

```text
Input: prices = [7,1,5,3,6,4]
Output: 5
Explicación: Compra en el día 1 (precio = 1), vende en el día 4 (precio = 6) → 6-1 = 5
```

**Ejemplo 2:**

```text
Input: prices = [7,6,4,3,1]
Output: 0
Explicación: Los precios solo bajan, no hay ganancia posible.
```

**Ejemplo 3:**

```text
Input: prices = [2,4,1]
Output: 2
```

**Restricciones:**

- $1 \leq prices.length \leq 10^5$
- $0 \leq prices[i] \leq 10^4$

## Casos de Prueba Identificados

| Caso                    | Input           | Output | Comentario                  |
| ----------------------- | --------------- | ------ | --------------------------- |
| Caso clásico            | `[7,1,5,3,6,4]` | 5      | Múltiples subidas y bajadas |
| Precios decrecientes    | `[7,6,4,3,1]`   | 0      | Sin ganancia                |
| Solo 2 días (sube)      | `[1,5]`         | 4      | Caso mínimo con ganancia    |
| Solo 2 días (baja)      | `[5,1]`         | 0      | Caso mínimo sin ganancia    |
| Un solo día             | `[10]`          | 0      | Imposible operar            |
| Todos precios iguales   | `[3,3,3,3]`     | 0      | Sin variación               |
| Mejor ganancia al final | `[1,2,3,4,5]`   | 4      | Compra día 0, vende día 4   |

## Enfoque y Análisis

### Estrategia: One Pass (una sola pasada)

La solución óptima consiste en recorrer el array una sola vez, manteniendo el precio más bajo visto hasta el momento y calculando el beneficio máximo posible en cada paso. Este patrón es conocido como **greedy** o en español **codicioso**
 por la manera en que se toma la decision sin pensar en el futuro.

```typescript
export function maxProfit(prices: number[]): number {
  let maxProfit = 0
  let minPrevPrice = prices[0]

  for (let i = 1; i < prices.length; i++) {
    const maxProfitThatDay = prices[i] - minPrevPrice
    maxProfit = Math.max(maxProfit, maxProfitThatDay)
    minPrevPrice = Math.min(minPrevPrice, prices[i])
  }
  return maxProfit
}
```

### Explicación Paso a Paso

1. Inicializamos `maxProfit` en 0 y `minPrevPrice` con el primer precio.
2. Iteramos desde el segundo día:
   - Calculamos el beneficio si vendemos ese día: `prices[i] - minPrevPrice`.
   - Actualizamos `maxProfit` si este beneficio es mayor.
   - Actualizamos `minPrevPrice` si encontramos un precio más bajo.
3. Al final, devolvemos el máximo beneficio encontrado.

### Ejemplo paso a paso con `[7,1,5,3,6,4]`

| Día | Precio | minPrice | Ganancia si vende hoy | maxProfit | Acción              |
| --- | ------ | -------- | --------------------- | --------- | ------------------- |
| 0   | 7      | 7        | -                     | 0         | Inicio              |
| 1   | 1      | **1**    | -                     | 0         | Nuevo mínimo        |
| 2   | 5      | 1        | 5-1=4                 | **4**     | Actualiza beneficio |
| 3   | 3      | 1        | 3-1=2                 | 4         | No mejora           |
| 4   | 6      | 1        | 6-1=5                 | **5**     | ¡Nuevo récord!      |
| 5   | 4      | 1        | 4-1=3                 | 5         | No mejora           |

## Complejidad

- **Tiempo:** $O(n)$
- **Espacio:** $O(1)$

## Edge Cases y Consideraciones

| Caso                 | Comportamiento del código                            |
| -------------------- | ---------------------------------------------------- |
| Array vacío o `null` | `prices.length < 2` → devuelve `0`                   |
| Un solo elemento     | Mismo manejo → `0`                                   |
| Precios iguales      | `maxProfit` nunca se actualiza → `0`                 |
| Mínimo al final      | Nunca se vende con ganancia → `0`                    |
| Múltiples picos      | Solo importa el mayor salto desde un mínimo anterior |

## Reflexiones y Aprendizajes

- **Greedy:** Siempre mantenemos la mejor opción local (el precio más bajo visto).
- **Estado mínimo:** Solo necesitamos recordar dos valores en todo momento.

## Conclusión

Este problema es un excelente ejemplo de cómo un enfoque greedy y el análisis de estados mínimos pueden llevar a soluciones óptimas y elegantes. El patrón de mantener el mínimo y calcular el máximo beneficio aparece en muchos problemas de arrays y optimización.

### Recursos Adicionales

- [Greedy Algorithms - GeeksforGeeks](https://www.geeksforgeeks.org/greedy-algorithms/)

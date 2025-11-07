---
title: 'El menor número con todos los bits en 1 - LeetCode #3360'
published: 2025-11-07T15:14:50.893Z
description: 'Resolviendo el problema "Smallest Number With All Set Bits" de LeetCode. Análisis, estrategia y solución en TypeScript.'
updated: ''
tags:
  - leetcode
  - bit-manipulation
  - math
  - ejercicio
draft: false
pin: 0
toc: true
lang: 'es'
abbrlink: 'smallest-number-all-set-bits'
---

## Resumen

Dado un número positivo n, hay que encontrar el menor número x ≥ n cuya representación binaria esté formada únicamente por bits 1 (por ejemplo: 1, 3, 7, 15, …). Este ejercicio es útil para practicar técnicas de manipulación de bits.

## Enunciado del problema

Dado un número positivo n, devuelve el menor número x ≥ n tal que la representación binaria de x esté formada sólo por unos.

Restricciones:

- 1 ≤ n ≤ 1000

## Ejemplos

| n   | bin(n) | resultado | bin(resultado) |
|-----:|:------:|----------:|:--------------:|
| 5   | 0101   | 7         | 111            |
| 10  | 1010   | 15        | 1111           |
| 3   | 11     | 3         | 11             |

## Observaciones y propiedades de bits

Los números cuya representación binaria está formada sólo por unos tienen la forma 2^k − 1 (por ejemplo: 1, 3, 7, 15, 31, …). Con esta observación, el problema se reduce a encontrar el menor k tal que 2^k − 1 ≥ n.

## Estrategia / Idea principal

Encontrar el exponente k tal que 2^k − 1 ≥ n. Esto es equivalente a calcular k = ceil(log2(n + 1)). Una vez obtenido k, el resultado es 2^k − 1.

## Implementación (TypeScript / JavaScript)

```typescript
export function smallestNumber(n: number): number {
  // Encontrar el exponente k tal que 2^k - 1 >= n
  // Esto es equivalente a encontrar el techo de log2(n+1)
  const k = Math.ceil(Math.log2(n + 1))

  // Calcular 2^k - 1
  return (1 << k) - 1
}
```

## Ejecución de ejemplo

```typescript
console.log(smallestNumber(5)) // 7
console.log(smallestNumber(10)) // 15
console.log(smallestNumber(3)) // 3
console.log(smallestNumber(1000))// 1023
```

## Análisis de complejidad

Tiempo: O(1)  Espacio: O(1).

## Casos límite y pruebas adicionales

- n = 1 → salida: 1
- n = 1000 → salida: 1023 (2^10 − 1)

## Detalles de la implementación

En la implementación se utiliza Math.log2 para calcular el logaritmo en base 2 de (n + 1) y Math.ceil para redondear hacia arriba al entero más cercano. Luego se emplea el operador de desplazamiento de bits izquierdo (`<<`) para calcular 2^k y se resta 1 para obtener el número con todos los bits establecidos. Se optó por mantener el desplazamiento de bits en esta versión por claridad de lectura.

## Conclusión

El enfoque aprovecha la propiedad estructural de los números compuestos sólo por unos en binario y permite calcular la solución en tiempo constante.

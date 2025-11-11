---
title: 'El Menor de Puros Unos - LeetCode #3360'
published: 2025-11-07T15:14:50.893Z
description: 'Resolviendo el problema "Smallest Number With All Set Bits" de LeetCode. Análisis, estrategia y solución en TypeScript.'
updated: ''
tags:
  - leetcode
draft: false
pin: 0
toc: true
lang: 'es'
abbrlink: 'smallest-number-all-set-bits'
---

## El Menor de Puros Unos — LeetCode #3360

> **Problema:**
> Dado un número positivo $n$, encuentra el menor número $x \geq n$ cuya representación binaria esté formada únicamente por bits 1 (por ejemplo: 1, 3, 7, 15, …).

## 📝 Resumen

Este ejercicio es útil para practicar técnicas de **manipulación de bits** y reconocer patrones en la representación binaria de los números.

## 📋 Enunciado del problema

- **Entrada:** Un número positivo $n$.
- **Salida:** El menor número $x \geq n$ tal que la representación binaria de $x$ contiene solo unos.

**Restricciones:**
$1 \leq n \leq 1000$

## 📊 Ejemplos

| $n$  | bin($n$) | resultado | bin(resultado) |
|------|:--------:|----------:|:--------------:|
| 5    | 0101     | 7         | 111            |
| 10   | 1010     | 15        | 1111           |
| 3    | 11       | 3         | 11             |

## 💡 Observaciones clave

Los números con todos los bits en 1 tienen la forma $2^k - 1$ (por ejemplo: 1, 3, 7, 15, 31, …).
**El problema se reduce a encontrar el menor $k$ tal que $2^k - 1 \geq n$.**

## 🧠 Estrategia

1. **Calcular $k$:**
   $k = \lceil \log_2(n + 1) \rceil$
2. **Obtener el resultado:**
   $x = 2^k - 1$

## 🛠️ Implementación (TypeScript / JavaScript)

```typescript
export function smallestNumber(n: number): number {
  // Encontrar el exponente k tal que 2^k - 1 >= n
  const k = Math.ceil(Math.log2(n + 1))
  // Calcular 2^k - 1
  return (1 << k) - 1
}
```

## ▶️ Ejecución de ejemplo

```typescript
console.log(smallestNumber(5)) // 7
console.log(smallestNumber(10)) // 15
console.log(smallestNumber(3)) // 3
console.log(smallestNumber(1000)) // 1023
```

## ⏱️ Análisis de complejidad

- **Tiempo:** $O(1)$
- **Espacio:** $O(1)$

## ⚠️ Casos límite y pruebas adicionales

- $n = 1$ → salida: 1
- $n = 1000$ → salida: 1023 ($2^{10} - 1$)

## 🛎️ Detalles de la implementación

- Se utiliza `Math.log2` para calcular el logaritmo en base 2 de $(n + 1)$.
- `Math.ceil` redondea hacia arriba al entero más cercano.
- El operador de desplazamiento de bits izquierdo (`<<`) calcula $2^k$.
- Se resta 1 para obtener el número con todos los bits establecidos.

## ✅ Conclusión

El enfoque aprovecha la propiedad estructural de los números compuestos sólo por unos en binario y permite calcular la solución en **tiempo constante**.

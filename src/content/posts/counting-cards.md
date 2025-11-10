---
title: 'Contando Cartas - FreeCodeCamp Daily Challenge'
published: 2025-11-07T12:24:45.141Z
description: 'Solución al desafío diario de FreeCodeCamp: Counting Cards. Explicación paso a paso y análisis de estrategia.'
updated: ''
tags:
  - freecodecamp
  - daily-challenge
draft: false
pin: 0
toc: true
lang: 'es'
abbrlink: 'counting-cards-freecodecamp'
---

> ### Counting Cards
>
> Un mazo estándar de cartas tiene 13 cartas únicas en cada palo. Dado un entero que representa la cantidad de cartas a elegir del mazo, devuelve el número de combinaciones únicas de cartas que puedes elegir.

El orden no importa. Elegir la carta A y luego la carta B es lo mismo que elegir la carta B y luego la carta A.

Por ejemplo, dado 52, devuelve 1. Solo hay una combinación de 52 cartas para elegir de un mazo de 52 cartas. Y dado 2, devuelve 1326. Hay 1326 combinaciones de cartas que puedes obtener al elegir 2 cartas del mazo.

Ejemplos:

- combinations(52) → 1
- combinations(1)  → 52
- combinations(2)  → 1326
- combinations(5)  → 2598960
- combinations(10) → 15820024220
- combinations(50) → 1326  (since C(52,50) = C(52,2))

## Enfoque

El hecho de que el orden no importe es clave, ya que nos permite usar el coeficiente binomial para calcular el número de combinaciones posibles. La fórmula para el coeficiente binomial es:

$$
C(52, n) = \frac{52!}{n!\,(52 - n)!}
$$

Donde "!" denota el factorial de un número. Esta fórmula nos permite calcular el número de formas de elegir $n$ elementos de un conjunto de 52 elementos sin importar el orden.

En otras palabras, para calcular el número de combinaciones posibles de $n$ cartas de una baraja de 52 tenemos que calcular el factorial de 52 dividido por el producto del factorial de $n$ y el factorial de (52 menos $n$).

> **Nota — límites numéricos**
>Los factoriales crecen extremadamente rápido, por lo que es fundamental considerar los límites de los tipos numéricos en JavaScript. Para evitar problemas, implementé una solución **iterativa** que no requiere calcular factoriales completos. En el peor caso (N = 52), los resultados caben cómodamente dentro del tipo `Number`, por lo que **no es necesario usar `BigInt`**.

### Precisión segura en JavaScript

El tipo `Number` en JS representa enteros con precisión exacta hasta `Number.MAX_SAFE_INTEGER` (2⁵³ − 1 ≈ **9.007 × 10¹⁵**). Más allá de este valor, se recomienda usar `BigInt`.

### Operaciones en coma flotante

Al realizar multiplicaciones y divisiones con números en **coma flotante**, pueden aparecer pequeñas imprecisiones debido a la representación interna de JavaScript. Por ejemplo, un cálculo que debería dar `2598960` podría resultar en `2598959.9999998`.
**Solución:** Usar `Math.round()` al final para corregir estos errores de redondeo y garantizar un entero exacto.

### Optimización con simetría binomial

El coeficiente binomial cumple la propiedad:
> **C(n, k) = C(n, n − k)**

Por eso, si `k > n/2`, calculamos `C(n, n − k)` en su lugar.
**Ejemplo:** Para `C(52, 30)` → calculamos `C(52, 22)`.
Esto reduce significativamente la cantidad de operaciones y minimiza el riesgo de desbordamiento intermedio.

## Implementación

Comienzo con validación de entrada y casos rápidos, y aprovecho de la simetría del coeficiente binomial para reducir la cantidad de cálculos necesarios. La función siguiente implementa la fórmula multiplicativa:

```javascript
function combinations(cards) {
  // Validación de entrada
  if (!Number.isInteger(cards)) {
    throw new TypeError('cards must be an integer')
  }

  const N = 52
  const k = cards

  if (k < 0 || k > N) {
    throw new RangeError('cards must be between 0 and 52 inclusive')
  }

  // Casos rápidos
  if (k === 0 || k === N)
    return 1

  // Aprovechar simetría: calcular con m = min(k, N-k)
  const m = Math.min(k, N - k)

  // Fórmula multiplicativa: C(N, m) = ∏_{i=1..m} (N - m + i) / i
  let result = 1
  for (let i = 1; i <= m; i++) {
    result = result * (N - m + i) / i
  }

  // Como precaución, redondeamos al entero más cercano
  return Math.round(result)
}
```

## Notas y extensiones

- Simetría: C(N, k) = C(N, N − k), de ahí la elección de `m = min(k, N − k)` para reducir cálculos.
- Rendimiento: la fórmula multiplicativa evita factoriales completos y es O(k) en tiempo con O(1) espacio.

### Sobre el redondeo (por qué usamos Math.round)

Durante el bucle multiplicativo hacemos operaciones de multiplicación y división en punto flotante. Matemáticamente el resultado debe ser un entero, pero las operaciones en coma flotante pueden introducir pequeñas imprecisiones (por ejemplo 2598959.9999998). Usar `Math.round` al final corrige esos efectos acumulados y asegura que devolvemos el entero exacto esperado. Para los valores que manejamos aquí (N ≤ 52) esta corrección es segura y no oculta errores lógicos.

## Análisis de complejidad

- Tiempo: O(m) donde m = min(k, N − k). En el peor caso m = k ≈ N/2, por lo que podemos considerar O(k). Cada iteración realiza una multiplicación y una división.
- Espacio: O(1). Solo almacenamos un acumulador `result` y variables auxiliares, independientemente del tamaño de la entrada.
- Precisión: las operaciones se realizan en `Number` (coma flotante de doble precisión). La estrategia multiplicativa reduce la necesidad de manejar factoriales enormes y, junto con `Math.round`, resuelve la pequeña imprecisión numérica final.

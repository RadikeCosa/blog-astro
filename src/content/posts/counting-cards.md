---
title: 'Contando Cartas - 7 de Noviembre de 2025'
published: 2025-11-07T12:24:45.141Z
description: 'Solución al desafío diario de FreeCodeCamp: Counting Cards. Explicación paso a paso y análisis de estrategia.'
updated: ''
tags:
  - freecodecamp
  - daily-challenge
  - javascript
draft: false
pin: 0
toc: true
lang: 'es'
abbrlink: 'counting-cards-freecodecamp'
---

Hoy el desafío diario de FreeCodeCamp es "Counting Cards". Es un ejercicio excelente para repasar combinatoria básica y practicar JavaScript, en particular el manejo de tipos numéricos: `Number` (aritmética habitual y decimales) y `BigInt`.

El enunciado del problema es el siguiente:

> ### Counting Cards
>
> **Problem.** A standard deck of playing cards contains 52 distinct cards. Given an integer `n` representing the number of cards to pick from the deck, return the number of unique combinations of `n` cards.
>
> Order does not matter: picking card A then B is the same as picking B then A. In combinatorics this is the binomial coefficient $C(52, n)$ ("52 choose n").

Examples:

- combinations(52) → 1
- combinations(1)  → 52
- combinations(2)  → 1326
- combinations(5)  → 2598960
- combinations(10) → 15820024220
- combinations(50) → 1326  (since C(52,50) = C(52,2))

Constraints:

- Deck size: 52 cards.
- Input: integer n in the range 0..52 (inclusive).

## Enfoque

Después de un rápido análisis y repaso de fundamentos de matemáticas, encontré que la fórmula para calcular combinaciones, también conocida como coeficiente binomial, es:

$$
C(52, n) = \frac{52!}{n!\,(52 - n)!}
$$

Donde "!" denota el factorial de un número. Esta fórmula nos permite calcular el número de formas de elegir $n$ elementos de un conjunto de 52 elementos sin importar el orden.

En otras palabras, para calcular el número de combinaciones posibles de $n$ cartas de una baraja de 52 tenemos que calcular el factorial de 52 dividido por el producto del factorial de $n$ y el factorial de (52 menos $n$).

> **Nota — límites numéricos**
>
> JavaScript `Number` representa enteros con precisión segura hasta `Number.MAX_SAFE_INTEGER` (2^53 − 1, ≈ 9.007×10^15). Para valores mayores conviene usar `BigInt`.
> En este ejercicio (n ≤ 52) todos los resultados caben cómodamente en `Number`, por lo que elegimos una implementación iterativa que evita calcular factoriales completos y funciona con `Number` de forma segura y eficiente.

## Implementación

Comienzo con validación de entrada y casos rápidos, y me aprovecho de la simetría del coeficiente binomial para reducir la cantidad de cálculos necesarios. La función siguiente implementa la fórmula multiplicativa:

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

En este archivo opté por no usar `BigInt` para mantener la implementación simple y centrada en `Number`. Como se explicó arriba, para los límites del problema (una baraja estándar de 52 cartas) esta implementación es correcta y segura; si el dominio del problema cambiara a números mucho mayores, sería más apropiado pasar a `BigInt`.

## Notas y extensiones

- Simetría: C(N, k) = C(N, N − k), de ahí la elección de `m = min(k, N − k)` para reducir cálculos.
- Rendimiento: la fórmula multiplicativa evita factoriales completos y es O(k) en tiempo con O(1) espacio.
- Visualización: conviene añadir una gráfica de C(52, n) vs n (escala log) para ilustrar cómo crecen las combinaciones y el pico cerca de n = 26.

### Sobre el redondeo (por qué usamos Math.round)

Durante el bucle multiplicativo hacemos operaciones de multiplicación y división en punto flotante. Matemáticamente el resultado debe ser un entero, pero las operaciones en coma flotante pueden introducir pequeñas imprecisiones (por ejemplo 2598959.9999998). Usar `Math.round` al final corrige esos efectos acumulados y asegura que devolvemos el entero exacto esperado. Para los valores que manejamos aquí (N ≤ 52) esta corrección es segura y no oculta errores lógicos.

## Análisis de complejidad

- Tiempo: O(m) donde m = min(k, N − k). En el peor caso m = k ≈ N/2, por lo que podemos considerar O(k). Cada iteración realiza una multiplicación y una división.
- Espacio: O(1). Solo almacenamos un acumulador `result` y variables escalares.
- Precisión: las operaciones se realizan en `Number` (coma flotante de doble precisión). La estrategia multiplicativa reduce la necesidad de manejar factoriales enormes y, junto con `Math.round`, resuelve la pequeña imprecisión numérica final.

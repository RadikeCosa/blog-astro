---
title: "Primos Circulares - FreeCodeCamp #152 Daily Challenge"
published: 2026-01-12T14:54:17.169Z
description: 'Resolvemos "Circular Prime" (FreeCodeCamp Daily Challenge): ¿cómo detectar si un número es un primo circular? Análisis, código comentado, visuales y reflexiones.'
updated: ''
tags:
  - freecodecamp
  - daily-challenge
draft: false
pin: 0
toc: true
lang: "es"
abbrlink: "circular-prime"
---

## Primos Circulares: Análisis y Explicación

### Enunciado

Dado un entero, determina si es un primo circular.
Un primo circular es un número donde **todas las rotaciones de sus dígitos** también son números primos.
Por ejemplo, 197 es un primo circular porque 197, 971 y 719 son todos primos.

## Análisis Inicial

### Comprensión del Problema

La función debe determinar si un número dado es un "primo circular". Es decir, al rotar sus dígitos en todas las posiciones posibles, **todas** las variantes deben ser números primos. Si alguna rotación no es prima, el número no es un primo circular.

### Casos de Prueba

- isCircularPrime(197) → true (197, 971, 719 son todos primos)
- isCircularPrime(1193) → true (1193, 1931, 9311, 3119 son todos primos)
- isCircularPrime(23) → false (23 es primo, pero 32 no)
- isCircularPrime(2) → true (único dígito primo)
- isCircularPrime(101) → false (101 es primo, pero 110 no)

## Desarrollo de la Solución

### Enfoque

1. Verificar si el número y todas sus rotaciones son primos.
2. Para cada rotación, usar una función auxiliar para rotar los dígitos y otra para verificar la primalidad.
  Si alguna rotación no es prima, se retorna false inmediatamente. Si todas lo son, se retorna true.

### Implementación Paso a Paso

1. Definir una función auxiliar `isPrime` que verifica si un número es primo (divisibilidad hasta su raíz cuadrada).
2. Definir una función auxiliar `rotateNumber` que rota los dígitos hacia la izquierda.
3. Iterar sobre todas las rotaciones posibles:
  - Si alguna rotación no es prima, retornar false.
  - Si todas las rotaciones son primas, retornar true.

### Código Final

```javascript
/**
 * FreeCodeCamp Problem: Circular Prime
 * Determina si un número es un primo circular.
 * Un primo circular es aquel que sigue siendo primo al rotar sus dígitos en cualquier posición.
 * Por ejemplo, 197 es primo circular porque 197, 971 y 719 son todos primos.
 * @param {number} n - Número a verificar
 * @returns {boolean} True si es primo circular, false en caso contrario
 */
function isCircularPrime(n) {
  // Verifica si un número es primo
  const isPrime = (num) => {
    if (num < 2)
      return false
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0)
        return false
    }
    return true
  }

  // Rota los dígitos hacia la izquierda
  const rotateNumber = (num) => {
    const str = num.toString()
    return Number(str.slice(1) + str[0])
  }

  let rotated = n
  do {
    if (!isPrime(rotated))
      return false
    rotated = rotateNumber(rotated)
  } while (rotated !== n)
  return true
}
```

## Análisis de Complejidad

### Complejidad Temporal

Sea $d$ la cantidad de dígitos de $n$ y $k$ el valor del número:

- `isPrime` es $O(\sqrt{k})$.
- Se hacen $d$ rotaciones y para cada una se verifica primalidad.
- Complejidad total: $O(d \cdot \sqrt{k})$.

En la práctica, para números pequeños, el algoritmo es eficiente. Para números grandes, la verificación de primalidad puede ser costosa. Como el primo circular más grande conocido tiene 4 dígitos, este enfoque es suficiente para la mayoría de los casos prácticos.

### Complejidad Espacial

El uso de espacio es $O(1)$, ya que solo se almacenan variables escalares.

## Casos Edge y Consideraciones

- Números de un solo dígito: solo se verifica si es primo.
- Números con dígitos repetidos: todas las rotaciones pueden ser iguales o distintas, pero se verifica cada una.
- Números con ceros: si al rotar aparece un cero a la izquierda, el número resultante puede perder dígitos (ejemplo: 101 → 011 → 11), lo que puede afectar la verificación.

## Reflexiones y Aprendizajes

### Conceptos Aplicados

- Primalidad básica (trial division)
- Manipulación de strings y rotación de dígitos

### Posibles Optimizaciones

- Usar un test de primalidad más eficiente para números grandes.
- Filtrar rápidamente números que contienen dígitos pares o 5 (excepto el 2 y 5), ya que alguna rotación será múltiplo de 2 o 5.

## Recursos y Referencias

- [Wikipedia: Circular prime](https://en.wikipedia.org/wiki/Circular_prime)
- [OEIS: Circular primes](https://oeis.org/A068652)

---

¿Te gustaría ver más retos resueltos o tienes dudas? ¡Déjalo en los comentarios! 🚀

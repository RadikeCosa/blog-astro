---
title: "Enésimo número de Fibonacci - FreeCodeCamp #145 Daily Challenge"
published: 2026-01-02T14:08:46.995Z
description: 'Resolvemos "Nth Fibonacci Number" (FreeCodeCamp #145): explicación, implementación en JavaScript y consideraciones de precisión.'
updated: ''
tags:
  - freecodecamp
  - daily-challenge
draft: false
pin: 0
toc: true
lang: "es"
abbrlink: "nth-fibonacci-number"
---

## Enunciado

Dado un entero positivo `n`, devuelve el enésimo número de la sucesión de Fibonacci. La sucesión comienza así (posiciones 1-based):

1 → 0
2 → 1
3 → 1
4 → 2
5 → 3
6 → 5

Ejemplos de referencia:

- `nthFibonacci(4)` → `2`
- `nthFibonacci(10)` → `34`
- `nthFibonacci(15)` → `377`
- `nthFibonacci(40)` → `63245986`
- `nthFibonacci(75)` → `1304969544928657`

## Análisis

La entrada `n` se interpreta como 1-based: `n = 1` corresponde a `0`, `n = 2` a `1`. El objetivo es devolver el valor en la posición `n`.

Requisitos y consideraciones:

- Aceptar `n` como entero positivo.
- Mantener eficiencia para `n` moderados (p. ej. hasta decenas de miles si se usa `BigInt`).
- Manejar limitaciones de precisión en JavaScript para números muy grandes.

## Solución (Enfoque)

La solución más simple y eficiente en espacio es iterativa: mantener los dos últimos valores y avanzar hasta la posición `n`. La solución tiene tiempo O(n) y espacio O(1).

### Implementación (JavaScript, 1-based)

```javascript
function nthFibonacci(n) {
  if (n <= 0)
    throw new Error('n debe ser un entero positivo (1-based)')
  if (n === 1)
    return 0
  if (n === 2)
    return 1

  let a = 0
  let b = 1
  for (let i = 3; i <= n; i++) {
    const next = a + b
    a = b
    b = next
  }
  return b
}

// Ejemplo de uso
console.log(nthFibonacci(4)) // 2
console.log(nthFibonacci(10)) // 34
```

## Complejidad

- Complejidad temporal: O(n).
- Complejidad espacial: O(1).

## Casos borde y notas

- `n <= 0`: se lanza un error (entrada inválida).
- `n = 1` y `n = 2`: casos base retornan `0` y `1` respectivamente.
- Precisión: usar `BigInt` si se espera que el resultado supere `Number.MAX_SAFE_INTEGER`.
- Alternativas más rápidas (tiempo O(log n)) incluyen la exponenciación de matrices o multiplicación por logaritmos; estas son útiles para `n` extremadamente grandes.

## Conclusión

La solución iterativa es clara, eficiente y suficiente para la mayoría de los usos prácticos. Para entornos que requieran precisión en números muy grandes, usar `BigInt` o algoritmos en tiempo logarítmico.

## Recursos

- [Serie de Fibonacci - Wikipedia](https://es.wikipedia.org/wiki/Sucesi%C3%B3n_de_Fibonacci)
- [freeCodeCamp - Daily Coding Challenge](https://www.freecodecamp.org/learn/daily-coding-challenge/)

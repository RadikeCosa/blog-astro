---
title: Conteo de Permutaciones - FreeCodeCamp Daily Challenge
published: 2025-12-04T14:08:29.981Z
description: 'Resolvemos "Permutation Count" del Daily Challenge de FreeCodeCamp. Explicamos la fórmula matemática y presentamos una solución eficiente en TypeScript.'
updated: ''
tags:
  - freecodecamp
  - daily-challenge
draft: false
pin: 0
toc: true
lang: "es"
abbrlink: "permutation-count"
---

## Introducción

El conteo de permutaciones es un clásico de la combinatoria y aparece frecuentemente en entrevistas y desafíos de programación. En este artículo, resolvemos el problema "Permutation Count" de FreeCodeCamp, donde debemos calcular cuántas formas únicas existen de reordenar los caracteres de un string, considerando posibles repeticiones.

## Enunciado del Problema

> Dado un string, devuelve el número de permutaciones distintas que se pueden formar con sus caracteres. Si hay caracteres repetidos, las permutaciones duplicadas solo deben contarse una vez.

**Ejemplo:**

- Input: `"abb"`
- Output: `3` ("abb", "bab", "bba")

Supón que tienes las letras `a`, `b`, `b`:

Las permutaciones "abb", "bab" y "bba" son únicas. Si intentaras listar todas las permutaciones posibles (3! = 6), notarías que algunas se repiten debido a la presencia de dos 'b'.

## Repaso Matemático: Permutaciones con Repetición

Cuando hay caracteres repetidos, usamos la fórmula:

$$
\text{Permutaciones\ únicas} = \frac{n!}{k_1! \cdot k_2! \cdot \ldots \cdot k_m!}
$$

donde:

- $n$ es el número total de caracteres
- $k_i$ es la frecuencia de cada carácter repetido

**Ejemplo:**

- Para "aabb": $n = 4$, $k_1 = 2$ ('a'), $k_2 = 2$ ('b')
- $$\frac{4!}{2! \cdot 2!} = \frac{24}{4} = 6$$

## Estrategia y Análisis

1. **Contar la frecuencia de cada carácter**
2. **Calcular el factorial del total de caracteres**
3. **Calcular el producto de los factoriales de las frecuencias**
4. **Aplicar la fórmula de permutaciones con repetición**

## Implementación en JavaScript

```javascript
function countPermutations(str) {
  function factorial(n) {
    if (n === 0 || n === 1)
      return 1
    let result = 1
    for (let i = 2; i <= n; i++) {
      result *= i
    }
    return result
  }
  const freq = {}
  for (let char of str) {
    freq[char] = (freq[char] || 0) + 1
  }
  const n = str.length
  let numerator = factorial(n)
  let denominator = 1
  for (let key in freq) {
    denominator *= factorial(freq[key])
  }
  return numerator / denominator
}
```

## Casos de Prueba y Edge Cases

| Input   | Output | Razonamiento                       |
|---------|--------|------------------------------------|
| "abc"   | 6      | 3! = 6 (todos únicos)              |
| "aabb"  | 6      | 4!/(2!*2!) = 6                     |
| "aaaa"  | 1      | 4!/4! = 1 (todas iguales)          |
| "abcde" | 120    | 5! = 120 (todos únicos)            |
| ""      | 1      | Solo la cadena vacía               |

## Complejidad

- **Tiempo:** $O(n + m)$, donde $n$ es la longitud del string y $m$ el número de caracteres únicos.
- **Espacio:** $O(m)$, por el objeto de frecuencias.

## Reflexiones y Aprendizajes

- El uso de HashMap para contar frecuencias es fundamental en problemas de strings.
- La fórmula de permutaciones con repetición es clave en combinatoria.
- Precalcular factoriales o usar memoización puede optimizar para strings largos.

## Recursos

- [Permutaciones con repetición - Wikipedia](https://es.wikipedia.org/wiki/Permutaci%C3%B3n#Permutaciones_con_repetici%C3%B3n)
- [Factorial - Wikipedia](https://es.wikipedia.org/wiki/Factorial)

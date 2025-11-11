---
title: "Vocales y Consonantes: FreeCodeCamp Daily Challenge"
published: 2025-11-11T14:29:33.550Z
description: 'Resolviendo el problema diario de FreeCodeCamp: Vocales y Consonantes. Análisis paso a paso y explicación de la solución.'
updated: ''
tags:
  - freecodecamp
  - daily-challenge
draft: false
pin: 0
toc: true
lang: "es"
abbrlink: "vowels-and-consonants"
---

## Introducción

En el reto diario de FreeCodeCamp, se nos pide analizar un string y determinar cuántas vocales y consonantes contiene. Este tipo de ejercicio es útil para practicar el manejo de cadenas, expresiones regulares y la lógica de conteo en JavaScript.

## Enunciado del Problema

Dado un string, devuelve un array con el número de vocales y consonantes que contiene.

- Las **vocales** son: a, e, i, o, u (mayúsculas y minúsculas)
- Las **consonantes** son todas las letras del alfabeto que no son vocales (mayúsculas y minúsculas)
- Los espacios y caracteres que no son letras no cuentan ni como vocales ni como consonantes

**Ejemplo:**

```text
Input: "Hello World!"
Output: [3, 7] // 3 vocales (e, o, o) y 7 consonantes (H, l, l, W, r, l, d)
```

## Enfoque y Análisis

La solución más eficiente utiliza **expresiones regulares** para identificar vocales y consonantes en el string. Esto permite buscar patrones de manera rápida y clara, evitando la necesidad de iterar manualmente por cada caracter.

### Casos de Prueba

| Entrada                                        | Salida Esperada |
| ---------------------------------------------- | --------------- |
| "Hello World!"                                 | [3, 7]          |
| "JavaScript"                                   | [3, 7]          |
| "Python"                                       | [1, 5]          |
| "freeCodeCamp"                                 | [5, 7]          |
| "Hello, World!"                                | [3, 7]          |
| "The quick brown fox jumps over the lazy dog." | [11, 24]        |

## Solución

La función implementada en JavaScript es la siguiente:

```javascript
function count(str) {
  const vowels = str.match(/[aeiou]/gi)
  const consonants = str.match(/[b-df-hj-np-tv-z]/gi)
  return [vowels ? vowels.length : 0, consonants ? consonants.length : 0]
}
```

- Se definen dos expresiones regulares: una para vocales y otra para consonantes.
- Se usa el método `match()` para encontrar todas las vocales y consonantes.
- Se devuelve un array con los conteos respectivos.

## Análisis de Complejidad

- **Complejidad temporal:** $O(n)$, donde $n$ es la longitud del string.
- **Complejidad espacial:** $O(k)$, donde $k$ es el número de coincidencias encontradas (vocales y consonantes).

## Casos Edge y Consideraciones

- String vacío: retorna `[0, 0]`
- Solo símbolos o números: retorna `[0, 0]`
- Mayúsculas y minúsculas se cuentan igual
- Caracteres especiales y espacios se ignoran

## Reflexiones y Aprendizajes

Este ejercicio refuerza el uso de expresiones regulares y el manejo de casos edge en cadenas. La solución es clara y eficiente para la mayoría de los casos prácticos.

## Recursos

- [MDN: String.match()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/match)
- [MDN: Expresiones Regulares](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_Expressions)

---

_💡 La claridad y simplicidad en la solución suelen ser la mejor optimización para problemas de conteo._

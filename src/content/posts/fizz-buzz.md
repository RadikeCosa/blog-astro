---
title: "FizzBuzz - FreeCodeCamp Daily Challenge"
published: 2025-11-25T11:11:11.354Z
description: 'Resolvemos el clásico problema de FizzBuzz con una explicación detallada.'
updated: ''
tags:
  - freecodecamp
  - daily-challenge
draft: false
pin: 0
toc: true
lang: "es"
abbrlink: "fizz-buzz"
---

## Introducción

FizzBuzz es uno de los problemas más populares en entrevistas técnicas y retos de programación. Aunque parece sencillo, es ideal para practicar lógica, condicionales y manipulación de arrays.

## Enunciado del Problema

Dado un entero $n$, devuelve un array con los números del 1 al $n$ (inclusive), pero reemplazando:

- Los múltiplos de 3 por "Fizz".
- Los múltiplos de 5 por "Buzz".
- Los múltiplos de ambos 3 y 5 por "FizzBuzz".

Por ejemplo, para $n = 15$ el resultado sería:

```javascript
[1, 2, 'Fizz', 4, 'Buzz', 'Fizz', 7, 8, 'Fizz', 'Buzz', 11, 'Fizz', 13, 14, 'FizzBuzz']
```

## Enfoque y Análisis

La clave está en identificar los múltiplos de 3 y 5 en el rango y reemplazarlos por las cadenas correspondientes. Usamos el operador módulo (%) para saber si un número es múltiplo: si `num % divisor === 0`, entonces es múltiplo.

### Casos de Prueba

- fizzBuzz(2) → [1, 2]
- fizzBuzz(4) → [1, 2, "Fizz", 4]
- fizzBuzz(8) → [1, 2, "Fizz", 4, "Buzz", "Fizz", 7, 8]
- fizzBuzz(15) → [1, 2, "Fizz", 4, "Buzz", "Fizz", 7, 8, "Fizz", "Buzz", 11, "Fizz", 13, 14, "FizzBuzz"]

## Solución

La solución más clara y directa es iterar desde 1 hasta $n$ y aplicar condicionales para decidir qué agregar al array:

```javascript
function fizzBuzz(n) {
  const result = []
  for (let i = 1; i <= n; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      result.push('FizzBuzz')
    }
    else if (i % 3 === 0) {
      result.push('Fizz')
    }
    else if (i % 5 === 0) {
      result.push('Buzz')
    }
    else {
      result.push(i)
    }
  }
  return result
}
```

## Complejidad

- **Tiempo:** $O(n)$, recorremos todos los números una vez.
- **Espacio:** $O(n)$, almacenamos el array de resultados.

## Reflexiones y Aprendizajes

FizzBuzz es un excelente ejercicio para practicar condicionales, bucles y el uso del operador módulo. Además, nos recuerda la importancia de considerar casos especiales y escribir código claro y legible.

## Recursos

- [Documentación de JavaScript sobre el operador módulo](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Remainder)

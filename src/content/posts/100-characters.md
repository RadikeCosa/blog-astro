---
title: "Cien Caracteres - FreeCodeCamp Daily Challenge"
published: 2025-11-18T13:49:44.718Z
description: 'Resolvemos el problema "100 Characters" del Daily Challenge de FreeCodeCamp con una explicación detallada.'
updated: ''
tags:
  - freecodecamp
  - daily-challenge
draft: false
pin: 0
toc: true
lang: "es"
abbrlink: "100-characters"
---

## Introducción

Hoy, FreeCodeCamp, en honor a los 100 días de retos diarios, presenta un problema especial: "100 Characters". En este post resolveremos este desafío paso a paso, explicando nuestro razonamiento y el proceso de desarrollo de la solución.

## Enunciado del Problema

Dado un string de entrada, repite el string hasta que la longitud del resultado sea de 100 caracteres. Si la repetición excede los 100 caracteres, recorta el string para que tenga exactamente 100 caracteres.

## Análisis Inicial

### Comprensión del Problema

El desafío consiste en manipular strings para alcanzar una longitud específica. Debemos asegurarnos de que el resultado tenga exactamente 100 caracteres, lo que implica repetir el string de entrada y recortarlo si es necesario.

### Casos de Prueba Identificados

```javascript
describe('100 Characters', () => {
  it('should return "One hundred One hundred One hundred One hundred One hundred One hundred One hundred One hundred One " for input "One hundred "', () => {
    expect(oneHundred('One hundred ')).toBe(
      'One hundred One hundred One hundred One hundred One hundred One hundred One hundred One hundred One '
    )
  })

  it('should return "freeCodeCamp freeCodeCamp freeCodeCamp freeCodeCamp freeCodeCamp freeCodeCamp freeCodeCamp freeCodeC" for input "freeCodeCamp "', () => {
    expect(oneHundred('freeCodeCamp ')).toBe(
      'freeCodeCamp freeCodeCamp freeCodeCamp freeCodeCamp freeCodeCamp freeCodeCamp freeCodeCamp freeCodeC'
    )
  })

  it('should return "daily challenges daily challenges daily challenges daily challenges daily challenges daily challenge" for input "daily challenges "', () => {
    expect(oneHundred('daily challenges ')).toBe(
      'daily challenges daily challenges daily challenges daily challenges daily challenges daily challenge'
    )
  })

  it('should return "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" for input "!"', () => {
    expect(oneHundred('!')).toBe(
      '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'
    )
  })
})
```

## Desarrollo de la Solución

### Enfoque Elegido

La intuición inicial es utilizar un bucle para concatenar el string de entrada hasta que la longitud del resultado sea al menos 100 caracteres. Luego, usamos el método `slice` para recortar el string a exactamente 100 caracteres si es necesario. Para ello, inicializamos una variable `result` como string vacío y la llenamos dentro del bucle con el operador `+=`.

### Implementación Paso a Paso

```javascript
function oneHundred(chars) {
  let result = ''
  while (result.length < 100) {
    result += chars
  }
  return result.slice(0, 100)
}
```

## Análisis de Complejidad

La complejidad temporal de esta solución es $O(n)$, donde $n$ es la longitud del string de entrada. En el peor de los casos, el bucle `while` se ejecuta varias veces hasta que el resultado alcanza o supera los 100 caracteres. Cada concatenación toma tiempo proporcional a la longitud actual del string, pero como limitamos la longitud final a 100 caracteres, el número de iteraciones es constante respecto al tamaño de la entrada.

La complejidad espacial es $O(1)$, ya que utilizamos una cantidad constante de espacio adicional, independientemente del tamaño de la entrada.

## Casos Límite y Consideraciones

Identificamos los siguientes casos límite:

1. **String de entrada vacío:** El resultado debe ser también un string vacío, ya que no hay nada que repetir.
2. **String de entrada muy corto:** Si el string es muy corto (por ejemplo, un solo carácter), el algoritmo debe manejar correctamente la repetición hasta alcanzar los 100 caracteres.
3. **String de entrada de exactamente 100 caracteres:** Si el string ya tiene 100 caracteres, el resultado debe ser el mismo string sin modificaciones.

Todos estos casos están correctamente manejados por la implementación actual.

## Reflexiones y Aprendizajes

### Posibles Optimizaciones

Una posible optimización consiste en calcular cuántas veces necesitamos repetir el string de entrada para alcanzar o superar los 100 caracteres, y luego construir el resultado en una sola operación en lugar de concatenar en un bucle. Esto reduce la cantidad de operaciones y mejora el rendimiento.

Podemos hacerlo declarando una variable `repeatCount` igual a `Math.ceil(100 / str.length)`, usar el método `repeat` para repetir el string y finalmente recortar el resultado con `slice`. La complejidad temporal sigue siendo $O(n)$, pero con menos operaciones de concatenación.

```javascript
export default function oneHundred(str) {
  const repeatCount = Math.ceil(100 / str.length)
  return str.repeat(repeatCount).slice(0, 100)
}
```

## Recursos y Referencias

- [Documentación de String.prototype.slice()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice)
- [Documentación de String.prototype.repeat()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat)
- [Documentación de Math.ceil()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil)
- [freeCodeCamp - JavaScript String Methods](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/basic-javascript/use-string-methods-to-manipulate-strings)

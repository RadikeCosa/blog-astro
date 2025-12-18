---
title: "Tablero de Damas - FreeCodeCamp #130 Daily Challenge"
published: 2025-12-18T22:03:36.307Z
description: 'Resolvemos "Checkerboard", el desafío #130 de FreeCodeCamp, creando un tablero de damas utilizando algoritmos eficientes en JavaScript.'
updated: ''
tags:
  - freecodecamp
  - daily-challenge
draft: false
pin: 0
toc: true
lang: "es"
abbrlink: "checkerboard"
---

## Checkerboard - Análisis y Explicación

## Enunciado del Problema

Dado un array con dos números, el primero indica filas y el segundo columnas. Debes retornar una matriz (array de arrays) de "X" y "O" alternados, como un tablero de damas. La esquina superior izquierda siempre es "X".

Ejemplo para [3, 3]:

```text
[
  ["X", "O", "X"],
  ["O", "X", "O"],
  ["X", "O", "X"]
]
```

## Análisis Inicial

El reto consiste en construir una matriz bidimensional que simule un tablero de damas, alternando "X" y "O" en cada celda. El patrón debe mantenerse en filas y columnas, alternando los caracteres en cada posición.

## Casos de Prueba Identificados

- [3, 3]: [["X", "O", "X"], ["O", "X", "O"], ["X", "O", "X"]]
- [6, 1]: [["X"], ["O"], ["X"], ["O"], ["X"], ["O"]]
- [2, 10]: [["X", "O", ...], ["O", "X", ...]]
- [5, 4]: [["X", "O", "X", "O"], ["O", "X", "O", "X"], ...]

## Desarrollo de la Solución

La clave está en recorrer la matriz y decidir el valor de cada celda según la suma de sus índices: si la suma es par, va "X"; si es impar, va "O". Así se genera el patrón alternante de forma eficiente.

### Por que funciona?

Al sumar los índices de fila y columna, obtenemos un valor que determina la paridad de la posición. Las posiciones con suma par corresponden a "X" y las impares a "O", creando el patrón deseado. Por ejemplo:

- (0,0) → 0 + 0 = 0 (par) → "X"
- (0,1) → 0 + 1 = 1 (impar) → "O"
- (1,0) → 1 + 0 = 1 (impar) → "O"
- (1,1) → 1 + 1 = 2 (par) → "X"

### Implementación

```javascript
function createBoard(dimensions) {
  // Usamos destructuring para obtener filas y columnas
  const [rows, cols] = dimensions
  // Inicializamos la matriz vacía de tantos elementos como filas y columnas
  const board = new Array(rows).fill(null).map(() => new Array(cols))
  // Recorremos cada celda para asignar "X" u "O"
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      // Asignamos "X" si la suma de índices es par, "O" si es impar
      board[i][j] = (i + j) % 2 === 0 ? 'X' : 'O'
    }
  }
  return board
}
```

## Complejidad

- Temporal: $O(n \times m)$, donde $n$ es filas y $m$ columnas.
- Espacial: $O(n \times m)$, por la matriz generada.

## Casos Edge

- Si alguna dimensión es cero, retorna matriz vacía.
- Para [1, 1], retorna [["X"]].
- Funciona para cualquier tamaño positivo.

## Reflexiones

- Uso de bucles anidados y aritmética modular.
- Inicialización eficiente de arrays en JavaScript.
- La solución es óptima: cada celda se calcula en tiempo constante.

## Recursos

- [MDN Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [Wikipedia Checkerboard](https://en.wikipedia.org/wiki/Checkerboard)

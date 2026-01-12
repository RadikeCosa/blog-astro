---
title: "Ta Te Ti - FreeCodeCamp #153 Daily Challenge"
published: 2026-01-12T15:36:18.816Z
description: 'Resolvemos "Tic Tac Toe" (FreeCodeCamp Daily Challenge): cómo determinar el estado de un juego de Ta Te Ti. Análisis, código comentado, visuales y reflexiones.'
updated: ''
tags:
  - freecodecamp
  - daily-challenge
draft: false
pin: 0
toc: true
lang: "es"
abbrlink: "tic-tac-toe"
---

## Ta Te Ti: Análisis y Explicación

### Enunciado

Dada una matriz (array de arrays) 3x3 que representa un tablero completo de Ta Te Ti, determina el ganador.

- Cada elemento de la matriz puede ser "X" u "O".
- Un jugador gana si tiene tres de sus símbolos en línea horizontal, vertical o diagonal.

Debes retornar:

- "X wins" si X es el ganador
- "O wins" si O es el ganador
- "Draw" si no hay ganador

## Análisis Inicial

### Comprensión del Problema

El objetivo es analizar un tablero de Ta Te Ti y determinar el ganador según las posiciones de "X" y "O". Un jugador gana si tiene tres de sus símbolos en línea (horizontal, vertical o diagonal). Si ninguno cumple esta condición, el resultado es empate.

### Casos de Prueba

- ticTacToe([["X", "O", "X"], ["O", "X", "O"], ["O", "X", "X"]]) → "X wins" (X gana en diagonal)
- ticTacToe([["O", "O", "O"], ["X", "X", "O"], ["X", "O", "X"]]) → "O wins" (O gana en horizontal)
- ticTacToe([["X", "O", "X"], ["O", "X", "O"], ["O", "X", "O"]]) → "Draw" (empate)
- ticTacToe([["X", "X", "X"], ["O", "O", "X"], ["O", "X", "O"]]) → "X wins" (X gana en horizontal)
- ticTacToe([["O", "X", "X"], ["O", "X", "O"], ["O", "X", "O"]]) → "O wins" (O gana en vertical)

## Desarrollo de la Solución

### Enfoque

1. Verificar todas las filas para ver si alguna tiene tres "X" o tres "O".
2. Verificar todas las columnas para ver si alguna tiene tres "X" o tres "O".
3. Verificar las dos diagonales para ver si alguna tiene tres "X" o tres "O".
4. Si se encuentra un ganador, retornar el resultado correspondiente.
5. Si no hay ganador, retornar "Draw".

### Implementación Paso a Paso

1. Crear una función `ticTacToe` que reciba una matriz 3x3.
2. Implementar verificaciones para filas, columnas y diagonales.
3. Retornar el resultado según corresponda.

### Código Final

```javascript
/**
 * FreeCodeCamp Problem: Tic Tac Toe
 * Determina el estado de un tablero de Ta Te Ti 3x3.
 * @param {string[][]} board - Matriz 3x3 con "X" y "O"
 * @returns {string} "X wins", "O wins" o "Draw"
 */
function ticTacToe(board) {
  // Verifica si un jugador ganó en alguna línea
  const check = (a, b, c) => a === b && b === c && a !== ''

  // Revisar filas
  for (let i = 0; i < 3; i++) {
    if (check(board[i][0], board[i][1], board[i][2]))
      return `${board[i][0]} wins`
  }
  // Revisar columnas
  for (let j = 0; j < 3; j++) {
    if (check(board[0][j], board[1][j], board[2][j]))
      return `${board[0][j]} wins`
  }
  // Revisar diagonales
  if (check(board[0][0], board[1][1], board[2][2]))
    return `${board[0][0]} wins`
  if (check(board[0][2], board[1][1], board[2][0]))
    return `${board[0][2]} wins`
  // Si nadie ganó
  return 'Draw'
}
```

## Análisis de Complejidad

### Complejidad Temporal

La función recorre todas las filas, columnas y diagonales. Cada verificación es $O(1)$ porque la matriz es de tamaño fijo (3x3). Por lo tanto, la complejidad temporal es $O(1)$ (constante).

### Complejidad Espacial

El uso de espacio también es $O(1)$, ya que solo se utilizan variables escalares.

## Casos Edge y Consideraciones

- Tableros donde ambos jugadores tienen línea ganadora: según la implementación, se retorna el primer ganador encontrado (por filas, luego columnas, luego diagonales).
- Tableros con solo un tipo de símbolo: el algoritmo retorna el ganador si hay línea, o "Draw" si no.
- Tableros con múltiples líneas ganadoras para el mismo jugador: el resultado sigue siendo correcto.

## Reflexiones y Aprendizajes

### Conceptos Aplicados

- Simulación de juegos de tablero
- Recorrido sistemático de matrices
- Separación de lógica en funciones auxiliares para mejorar legibilidad

### Posibles Optimizaciones

Para un tablero 3x3, la solución es óptima y no requiere mejoras. Si el tablero fuera de tamaño variable, se podría generalizar la función para aceptar cualquier dimensión y cantidad de símbolos en línea para ganar.

## Recursos y Referencias

- [Wikipedia: Tres en línea](https://es.wikipedia.org/wiki/Tres_en_l%C3%ADnea)
- [Wikipedia: Tic-tac-toe](https://en.wikipedia.org/wiki/Tic-tac-toe)

---

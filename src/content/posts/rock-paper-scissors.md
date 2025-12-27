---
title: "Piedra, Papel o Tijeras - FreeCodeCamp #139 Daily Challenge"
published: 2025-12-27T20:04:58.915Z
description: 'Resolvemos "Rock Paper Scissors" (FreeCodeCamp) con lógica clara y eficiente en JavaScript. Incluye análisis, código y visuales.'
updated: ''
tags:
  - freecodecamp
  - daily-challenge
draft: false
pin: 0
toc: true
lang: "es"
abbrlink: "rock-paper-scissors"
---

## Piedra, Papel o Tijeras - Análisis y Explicación

### Enunciado

Dado un juego de "Piedra, Papel o Tijeras", recibe dos strings representando la elección de cada jugador: "Rock", "Paper" o "Scissors". Determina el resultado según las reglas clásicas:

- Piedra gana a Tijeras
- Papel gana a Piedra
- Tijeras gana a Papel

Retorna:

- "Player 1 wins" si gana el jugador uno
- "Player 2 wins" si gana el jugador dos
- "Tie" si hay empate

---

## Análisis Inicial

Solo se requiere comparar las elecciones y decidir el resultado. No es necesario validar entradas, ya que siempre serán válidas.

---

## Casos de Prueba

```js
rockPaperScissors('Rock', 'Rock') // "Tie"
rockPaperScissors('Rock', 'Paper') // "Player 2 wins"
rockPaperScissors('Scissors', 'Paper') // "Player 1 wins"
rockPaperScissors('Rock', 'Scissors') // "Player 1 wins"
rockPaperScissors('Scissors', 'Scissors') // "Tie"
rockPaperScissors('Scissors', 'Rock') // "Player 2 wins"
```

Estos cubren todas las combinaciones posibles.

---

## Desarrollo de la Solución

### Enfoque

Se usa una estructura condicional directa:

- Si ambos eligen igual, es empate.
- Si la combinación es una de las tres donde el jugador uno gana, retorna "Player 1 wins".
- En cualquier otro caso, gana el jugador dos.

### Paso a Paso

1. Si player1 === player2 → "Tie"
2. Si (player1, player2) es una de:

- ('Rock', 'Scissors')
- ('Paper', 'Rock')
- ('Scissors', 'Paper')
  → "Player 1 wins"

3. Si no, "Player 2 wins"

---

## Código Final

```javascript
/**
 * FreeCodeCamp: Rock Paper Scissors
 * @param {string} player1 - "Rock", "Paper" o "Scissors"
 * @param {string} player2 - "Rock", "Paper" o "Scissors"
 * @returns {string} Resultado: "Player 1 wins", "Player 2 wins" o "Tie"
 */
function rockPaperScissors(player1, player2) {
  if (player1 === player2)
    return 'Tie'
  if (
    (player1 === 'Rock' && player2 === 'Scissors')
    || (player1 === 'Paper' && player2 === 'Rock')
    || (player1 === 'Scissors' && player2 === 'Paper')
  ) {
    return 'Player 1 wins'
  }
  return 'Player 2 wins'
}

export default rockPaperScissors
```

## Análisis de Complejidad

### Temporal

La función es $O(1)$: solo compara strings y evalúa condicionales.

### Espacial

No usa estructuras auxiliares: $O(1)$.

---

## Casos Edge y Consideraciones

No existen casos edge fuera de los cubiertos, ya que los inputs siempre son válidos y limitados.

---

## Reflexiones y Aprendizajes

**Conceptos aplicados:**

- Comparación de strings
- Condicionales
- Lógica de juegos

---

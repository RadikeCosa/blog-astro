---
title: "Mejor Momento Para Comprar y Vender Acciones 2 - LeetCode #122 Top-Interview 8/150"
published: 2025-11-26T12:07:57.898Z
description: 'Resolviendo el problema de la serie Top-Interview de LeetCode "Best Time to Buy and Sell Stock II" utilizando un enfoque de suma de ganancias.'
updated: ''
tags:
  - top-interview-150
  - leetcode
  - greedy
draft: false
pin: 0
toc: true
lang: "es"
abbrlink: "best-time-to-buy-and-sell-stock-ii"
---

## Mejor Momento Para Comprar y Vender Acciones 2 - LeetCode #122 (Top-Interview 8/150)

Ayer resolvimos el **#121 – Best Time to Buy and Sell Stock** (solo una transacción). El enfoque era: mantener el precio mínimo visto hasta el momento y calcular el beneficio máximo posible con una sola compra-venta.

Hoy subimos la dificultad un puntito: **¡podemos comprar y vender todas las veces que queramos!**

## ¿Cuál es la diferencia clave con el problema de ayer?

| Característica               | #121 (ayer)                  | #122 (hoy)                          |
|------------------------------|------------------------------|-------------------------------------|
| Nº de transacciones          | Máximo 1                     | Ilimitadas                          |
| Restricción de tenencia      | Una acción a la vez          | Una acción a la vez (pero se puede comprar y vender el mismo día) |
| Enfoque óptimo               | Precio mínimo + beneficio máximo | **¡Sumar todas las subidas del precio!** |

## La Clave: Sumar todas las subidas del precio

Imagina este array de precios:

```text
Día:     0  1  2  3  4  5
Precio:  7  1  5  3  6  4
```

Si compras en $1 y vendes en $5 → +4
Luego compras en $3 y vendes en $6 → +3
**Total: 7**

Ahora fíjate en las diferencias día a día:

```text
1→5 : +4
5→3 : -2 (ignoras)
3→6 : +3
6→4 : -2 (ignoras)
```

¡Suma de diferencias positivas = 4 + 3 = 7!
Exactamente la misma ganancia máxima.

**Conclusión mágica**:
Cuando puedes hacer todas las transacciones que quieras, la ganancia máxima es simplemente **la suma de todas las subidas diarias**.

## Solución en una sola pasada (Greedy)

```typescript
function maxProfit(prices: number[]): number {
  let profit = 0

  for (let i = 1; i < prices.length; i++) {
    const diff = prices[i] - prices[i - 1]
    if (diff > 0) {
      profit += diff
    }
  }

  return profit
}
```

¡Eso es todo! 7 líneas de código.

### Complejidad

- **Tiempo**: O(n) – una sola pasada
- **Espacio**: O(1) – solo una variable

## Ejemplos paso a paso

| Precios            | Diferencias diarias       | Ganancia acumulada | Resultado final |
|--------------------|---------------------------|--------------------|-----------------|
| `[7,1,5,3,6,4]`   | -6, +4, -2, +3, -2       | +4 → +7            | 7               |
| `[1,2,3,4,5]`     | +1, +1, +1, +1            | +1+1+1+1           | 4               |
| `[7,6,4,3,1]`     | -1, -2, -1, -2            | (ninguna positiva) | 0               |

## ¿Por qué funciona este truco?

Porque cualquier estrategia óptima se puede "descomponer" en una serie de compras justo antes de una subida y ventas justo después. Al final, esas pequeñas ganancias individuales forman exactamente la suma de todas las subidas del precio.

## Casos edge (todos cubiertos automáticamente)

- Un solo día → devuelve 0
- Precios constantes → 0
- Precios que solo bajan → 0
- Precios que solo suben → máxima ganancia posible

## Conclusión del día

Ayer necesitábamos rastrear el precio mínimo.
Hoy solo necesitamos mirar al vecino de la derecha y decir:
**"¿Subió? ¡Perfecto, me lo llevo!"**

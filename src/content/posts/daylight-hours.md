---
title: "Horas de Luz en el Solsticio - FreeCodeCamp #133 Daily Challenge"
published: 2025-12-21T15:09:31.161Z
description: 'Resolvemos el reto de estimar las horas de luz diarias según la latitud en el solsticio de diciembre, usando una tabla de referencia y búsqueda del valor más cercano.'
updated: ''
tags:
  - daily-challenge
  - freecodecamp
draft: false
pin: 0
toc: true
lang: "es"
abbrlink: "daylight-hours"
---

## Horas de Luz en el Solsticio: Análisis y Explicación

## Enunciado del Problema

El 21 de diciembre ocurre el solsticio: el día más largo del año en el hemisferio sur y el más corto en el norte. Dada una latitud entre -90 y +90 grados, queremos estimar cuántas horas de luz diurna hay ese día, usando la siguiente tabla de referencia:

| Latitud (grados) | Horas de luz diarias |
| ---------------- | -------------------- |
| -90              | 24                   |
| -75              | 23                   |
| -60              | 21                   |
| -45              | 15                   |
| -30              | 13                   |
| -15              | 12                   |
| 0                | 12                   |
| 15               | 11                   |
| 30               | 10                   |
| 45               | 9                    |
| 60               | 6                    |
| 75               | 2                    |
| 90               | 0                    |

Si la latitud no coincide exactamente con un valor de la tabla, se debe usar el valor más cercano (por distancia absoluta).

## Análisis Inicial

### ¿Qué pide el reto?

Para cualquier latitud válida, debemos devolver las horas de luz del solsticio según la tabla. No hay fórmulas ni cálculos astronómicos: solo buscar el valor más cercano en la tabla y devolver su cantidad de horas.

### Casos de Prueba Clave

- Latitud exacta: daylightHours(-90) → 24, daylightHours(0) → 12, daylightHours(45) → 9
- Latitud entre dos valores: daylightHours(-10) → 12 (más cerca de -15 y 0, ambos 12), daylightHours(23) → 10 (más cerca de 30), daylightHours(70) → 2 (más cerca de 75)
- Extremos: daylightHours(90) → 0, daylightHours(-90) → 24
- Equidistantes: si está justo en el medio, se puede devolver cualquiera de los dos valores más cercanos (la implementación retorna el primero que encuentra)

## Desarrollo de la Solución

### Estrategia

1. Guardar la tabla como un array de objetos o tuplas.
2. Para la latitud dada, calcular la distancia absoluta a cada latitud de la tabla.
3. Buscar el índice con menor distancia.
4. Devolver las horas de luz asociadas.

### Código Comentado

```javascript
// Devuelve la cantidad estimada de horas de luz para una latitud dada en el solsticio de diciembre
function daylightHours(latitude) {
  // Tabla de referencia: latitud → horas de luz
  const daylightTable = [
    { lat: -90, hours: 24 }, // Polo Sur: día completo
    { lat: -75, hours: 23 },
    { lat: -60, hours: 21 },
    { lat: -45, hours: 15 },
    { lat: -30, hours: 13 },
    { lat: -15, hours: 12 },
    { lat: 0, hours: 12 }, // Ecuador
    { lat: 15, hours: 11 },
    { lat: 30, hours: 10 },
    { lat: 45, hours: 9 },
    { lat: 60, hours: 6 },
    { lat: 75, hours: 2 },
    { lat: 90, hours: 0 }, // Polo Norte: noche polar
  ]
  // Buscar el valor más cercano
  let closest = daylightTable[0]
  let minDiff = Math.abs(latitude - closest.lat)
  for (let i = 1; i < daylightTable.length; i++) {
    const diff = Math.abs(latitude - daylightTable[i].lat)
    if (diff < minDiff) {
      minDiff = diff
      closest = daylightTable[i]
    }
  }
  return closest.hours
}
```

## Análisis de Complejidad

### Complejidad Temporal

Recorremos la tabla una vez: $O(n)$, donde $n$ es la cantidad de filas (13). Como $n$ es fijo y pequeño, es instantáneo en la práctica.

### Complejidad Espacial

El espacio es $O(1)$: la tabla es fija y no depende de la entrada.

## Casos Edge y Consideraciones

- Si la latitud coincide exactamente, se retorna ese valor.
- Si está equidistante entre dos, se retorna el primero que encuentra.
- No se validan latitudes fuera de [-90, 90] (la consigna lo descarta).

## Reflexiones y Aprendizajes

- Buscar el valor más cercano en una lista es un patrón útil para problemas de mapeo directo.
- Usar tablas de referencia simplifica problemas que, de otro modo, requerirían fórmulas complejas.

## Recursos y Referencias

- [Solsticio de diciembre - Wikipedia](https://es.wikipedia.org/wiki/Solsticio_de_diciembre)
- [freeCodeCamp - Daily Coding Challenge](https://www.freecodecamp.org/learn/daily-coding-challenge/2025-12-21/)

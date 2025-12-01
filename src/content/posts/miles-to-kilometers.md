---
title: "Miles a Kilómetros - FreeCodeCamp Daily Challenge"
published: 2025-12-01T12:00:08.152Z
description: 'Resolvemos el reto de conversión de millas a kilómetros, analizando el proceso y presentando una solución óptima en JavaScript.'
updated: ''
tags:
  - freecodecamp
  - daily-challenge
draft: false
pin: 0
toc: true
lang: "es"
abbrlink: "miles-to-kilometers"
---

## Conversión de Millas a Kilómetros: Un Problema Clásico de Algoritmos

Hoy resolvemos el desafío diario de FreeCodeCamp: convertir una distancia dada en millas a su equivalente en kilómetros, redondeando el resultado a dos decimales. Este tipo de ejercicios nos ayuda a practicar operaciones matemáticas y manipulación de números decimales.

## Enunciado del Problema

> Dada una distancia en millas (número no negativo), retorna la distancia equivalente en kilómetros.
> 1 milla equivale a 1.60934 kilómetros.
> Redondea el resultado a dos decimales.

### Ejemplos

| Entrada | Salida esperada |
|---------|-----------------|
| 1       | 1.61            |
| 21      | 33.8            |
| 3.5     | 5.63            |
| 0       | 0               |
| 0.621371| 1               |

## Análisis y Enfoque

La clave está en aplicar correctamente la tasa de conversión y redondear el resultado. El proceso se puede resumir en tres pasos:

1. Multiplicar el número de millas por 1.60934.
2. Redondear el resultado a dos decimales.
3. Retornar el valor final.

### ¿Por qué es útil este tipo de ejercicios?

- Refuerza el manejo de operaciones aritméticas básicas.
- Practica el redondeo y formato de números decimales.

## Implementación en JavaScript

Veamos cómo se traduce este proceso en código:

```js
function convertToKm(millas) {
  const kilometrosPorMilla = 1.60934
  let resultado = millas * kilometrosPorMilla
  resultado = Number.parseFloat(resultado.toFixed(2))
  return resultado
}
```

### Explicación paso a paso

- Se declara la constante `kilometrosPorMilla` para mayor claridad y mantenibilidad.
- Se multiplica la entrada por la tasa de conversión.
- Se usa `toFixed(2)` para redondear a dos decimales y `parseFloat` para devolver un número.

## Análisis de Complejidad

La función realiza operaciones aritméticas simples y redondeo:

$$
T(n) = O(1)
$$

La complejidad espacial también es $O(1)$, ya que no se usan estructuras adicionales.

## Casos Edge y Consideraciones

- Si la entrada es 0, el resultado será 0.
- Si la entrada es decimal, la conversión y el redondeo funcionan correctamente.
- No se manejan valores negativos ni entradas no numéricas, ya que el enunciado garantiza entradas válidas.

## Reflexiones y Aprendizajes

- Importancia de declarar constantes para tasas de conversión.
- Uso correcto de funciones de redondeo.
- Validar los casos de prueba y edge cases.

## Recursos y Referencias

- [MDN: Number.prototype.toFixed()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed)
- [Conversión de unidades en Wikipedia](https://es.wikipedia.org/wiki/Conversi%C3%B3n_de_unidades)

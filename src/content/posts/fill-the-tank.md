---
title: "Llenar el Tanque - FreeCodeCamp #39 Daily Challenge"
published: 2025-12-24T23:03:07.000Z
description: 'Resolvemos "Fill The Tank", un desafío de FreeCodeCamp que implica cálculos matemáticos simples para determinar el costo de llenar un tanque de combustible.'
updated: ''
tags:
  - freecodecamp
  - daily-challenge
draft: false
pin: 0
toc: true
lang: "es"
abbrlink: "fill-the-tank"
---

## Llenar el Tanque - Análisis y Explicación 🚗⛽

## Fill The Tank - Análisis y Explicación

### Enunciado del Problema

Dado un tamaño de tanque de combustible, el nivel actual de combustible y el precio por galón, devuelve el costo de llenarlo.

- `tankSize`: Capacidad total del tanque (galones)
- `fuelLevel`: Combustible actual en el tanque (galones)
- `pricePerGallon`: Precio por galón
- El resultado debe ser una cadena en formato monetario, con dos decimales: "$d.dd"

## Análisis Inicial

El reto consiste en calcular cuántos galones faltan para llenar el tanque y multiplicar ese valor por el precio por galón. El resultado debe estar formateado como monto en dólares con dos decimales.

### Casos de Prueba

| tankSize | fuelLevel | pricePerGallon | Salida esperada |
|----------|-----------|----------------|-----------------|
| 15       | 5         | 3.50           | "$35.00"        |
| 10       | 10        | 4.00           | "$0.00"         |
| 20       | 0         | 2.75           | "$55.00"        |
| 15       | 5         | 0.00           | "$0.00"         |
| 10       | 12        | 3.00           | "$0.00"         |
| 12.5     | 7.3       | 4.20           | "$21.84"        |
| 15.75    | 10.5      | 3.80           | "$19.95"        |
| 20       | 5         | 2.95           | "$44.25"        |
| 18.5     | 9.75      | 3.65           | "$31.19"        |

---

## Desarrollo de la Solución

### Estrategia

1. Calcular galones faltantes: $faltantes = tankSize - fuelLevel$
2. Si $faltantes \leq 0$ o $pricePerGallon = 0$, devolver "$0.00"
3. Calcular $costo = faltantes \times pricePerGallon$
4. Formatear el resultado a dos decimales con símbolo de dólar

### Implementación en JavaScript

```js
function fillTheTank(tankSize, fuelLevel, pricePerGallon) {
  // Calcular galones faltantes
  const faltantes = tankSize - fuelLevel
  // Si no se necesita combustible o el precio es cero
  if (faltantes <= 0 || pricePerGallon === 0)
    return '$0.00'
  // Calcular costo total
  const costo = faltantes * pricePerGallon
  // Formatear a dos decimales
  return `$${costo.toFixed(2)}`
}
```

#### Ejemplo de uso

```js
fillTheTank(15, 5, 3.50) // "$35.00"
fillTheTank(10, 10, 4.00) // "$0.00"
fillTheTank(12.5, 7.3, 4.20) // "$21.84"
```

---

## Análisis de Complejidad

- **Tiempo:** $O(1)$ (operaciones aritméticas simples)
- **Espacio:** $O(1)$ (solo variables escalares)

---

## Casos Edge y Consideraciones

- Si `fuelLevel >= tankSize` → "$0.00"
- Si `pricePerGallon === 0` → "$0.00"
- Soporta valores decimales
- Se asume que los inputs son válidos y no negativos

---

## Reflexiones y Aprendizajes

- Práctica de aritmética básica y formateo de strings
- Validación de edge cases para robustez
- El problema es directo y no requiere optimizaciones

---

## Recursos

- [Método toFixed() en JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed)
- [Formateo de moneda en JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)

---

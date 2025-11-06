---
title: 'Resolviendo el Weekly Finder: Cómo obtener el día de la semana en JavaScript'
published: 2025-11-06T15:18:28.517Z
description: 'Análisis completo del desafío Weekly Finder de FreeCodeCamp: cómo obtener el día de la semana desde una fecha string, evitando problemas con zonas horarias y explorando múltiples enfoques de solución.'
updated: ''
tags:
  - javascript
  - freecodecamp
  - algorithms
  - dates
  - problem-solving
draft: false
pin: 0
toc: true
lang: 'es'
abbrlink: 'weekly-finder-javascript-timezone-solution'
---

## El Desafío

El daily challenge de hoy en FreeCodeCamp se llama **Weekly Finder**. El enunciado es aparentemente simple:

> **Weekday Finder**
> Given a string date in the format YYYY-MM-DD, return the day of the week.
>
> Valid return days are:
>
> - "Sunday"
> - "Monday"
> - "Tuesday"
> - "Wednesday"
> - "Thursday"
> - "Friday"
> - "Saturday"
>
> **Be sure to ignore time zones.**

Al principio, esa última línea sobre "ignorar las zonas horarias" no me quedaba clara, pero después entendí perfectamente por qué era crucial.

## Primera Aproximación

Lo primero que pensé fue usar un objeto `Date` con el string que recibo como parámetro y buscar algún método para obtener el día de la semana con el nombre completo.

No recordaba exactamente el método, pero busqué rápidamente y encontré `toLocaleDateString()`, que recibe como primer parámetro el locale y como segundo parámetro un objeto con opciones. Usé `'en-US'` como locale y en las opciones puse `weekday: 'long'` para obtener el día de la semana en formato largo.

```javascript
function getDayName(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { weekday: 'long' })
}
```

En teoría, el método `toLocaleDateString()` se encarga de devolver el día de la semana en el formato correcto.

## El Problema de las Zonas Horarias

Pero cuando corrí los tests, fallaban. Debugueé con un `console.log` y en todos los tests me devolvía un día menos al que esperaba. Ahí recordé que el enunciado decía **"Be sure to ignore time zones"**, e inmediatamente supe que ahí estaba el motivo del error.

:::tip
**El problema**: Cuando JavaScript crea un objeto `Date` desde un string como `"2025-11-06"`, lo interpreta como UTC y luego lo convierte a la zona horaria local, lo que puede cambiar el día.
:::

¿Cómo podía ignorar las zonas horarias? Muy sencillo: simplemente agregando `'T00:00:00'` al string que recibía como parámetro. De esta forma siempre estaría creando la fecha a la medianoche y no habría problemas con las zonas horarias.

```javascript
function getDayName(dateString) {
  const date = new Date(`${dateString}T00:00:00`)
  return date.toLocaleDateString('en-US', { weekday: 'long' })
}
```

## Enfoques Alternativos

### Opción 2: Usando getUTCDay()

También podría haber usado el método `getUTCDay()` para obtener el día de la semana en formato numérico (0-6) y luego usar un array para mapear los números a los días de la semana, pero me pareció más sencillo usar `toLocaleDateString()`.

```javascript
function getDayName(dateString) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const date = new Date(`${dateString}T00:00:00`)
  return days[date.getUTCDay()]
}
```

### Opción 3: Algoritmo Matemático (Fórmula de Zeller)

Otra aproximación podría haber sido sin crear un objeto `Date`, simplemente usando un array con los días de la semana y una fórmula para calcular el día de la semana a partir de la fecha. Pero me pareció más complicado y menos legible.

La **Fórmula de Zeller** permite calcular el día de la semana para cualquier fecha:

$$f = d + \left\lfloor \frac{13(m+1)}{5} \right\rfloor + y + \left\lfloor \frac{y}{4} \right\rfloor - \left\lfloor \frac{y}{100} \right\rfloor + \left\lfloor \frac{y}{400} \right\rfloor$$

Donde:

- $d$ = día del mes
- $m$ = mes ajustado (marzo=3, abril=4, ..., diciembre=12, enero=13, febrero=14)
- $y$ = año (se resta 1 si es enero o febrero)

```javascript
function getDayName(dateString) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const [year, month, day] = dateString.split('-').map(Number)
  const k = month < 3 ? month + 12 : month
  const m = month < 3 ? year - 1 : year
  const f = day + Math.floor((13 * (k + 1)) / 5) + m + Math.floor(m / 4) + Math.floor(m / 400) - Math.floor(m / 100)
  const dayOfWeek = f % 7
  return days[(dayOfWeek + 5) % 7] // Ajuste para que 0 = Sunday
}
```

## Comparación de Enfoques

| Método                | Simplicidad | Legibilidad | Eficiencia |
|-----------------------|-------------|-------------|------------|
| toLocaleDateString    | Alta        | Alta        | Media      |
| getUTCDay            | Media       | Alta        | Alta       |
| Fórmula de Zeller     | Baja        | Media       | Alta       |

Esta tabla resume las ventajas y desventajas de cada enfoque, ayudando a elegir el más adecuado según el caso de uso.

## Conclusión

Al final me quedé con la primera opción que es la más sencilla y legible. La clave del desafío no era tanto el algoritmo, sino entender el comportamiento de JavaScript con las fechas y las zonas horarias.

:::note
**Lección aprendida**: Siempre que trabajes with fechas en JavaScript, ten en cuenta las zonas horarias. Un simple `T00:00:00` puede ahorrarte muchos dolores de cabeza.
:::

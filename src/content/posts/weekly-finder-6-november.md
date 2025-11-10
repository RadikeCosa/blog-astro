---
title: 'Buscador Semanal (Weekly Finder): FreeCodeCamp Daily Challenge'
published: 2025-11-06T15:18:28.517Z
description: 'Análisis completo del desafío Weekly Finder de FreeCodeCamp: cómo obtener el día de la semana desde una fecha string, evitando problemas con zonas horarias y explorando múltiples enfoques de solución.'
updated: ''
tags:
  - freecodecamp
  - daily-challenge
draft: false
pin: 0
toc: true
lang: 'es'
abbrlink: 'weekly-finder'
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

La primera idea fue crear un objeto `Date` a partir del string que recibimos y usar un método de formateo para obtener el nombre del día de la semana.

Aunque no recordaba el método exacto, encontré `toLocaleDateString()`, que con las opciones adecuadas devuelve el día en formato largo. El objeto `Date` de JavaScript representa instantes temporales y permite crear, manipular y formatear fechas. Se puede construir a partir de una cadena ISO (`YYYY-MM-DD`) o mediante componentes individuales (año, mes, día, hora, minuto, segundo). En este caso usamos la cadena que llega como parámetro.

El método `toLocaleDateString()` formatea la fecha según la configuración regional. Si pasamos `'en-US'` y `{ weekday: 'long' }` obtendremos el nombre completo del día en inglés (por ejemplo: "Monday", "Tuesday").

```javascript
function getDayName(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { weekday: 'long' })
}
```

La función recibe un `dateString` en formato `YYYY-MM-DD`, crea un `Date` y devuelve el nombre del día de la semana en inglés. A primera vista, el desafío parecía resuelto.

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

### Opción 2: Algoritmo Matemático (Fórmula de Zeller)

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
| Fórmula de Zeller     | Baja        | Media       | Alta       |

Esta tabla resume las ventajas y desventajas de cada enfoque, ayudando a elegir el más adecuado según el caso de uso.

## Conclusión

Al final me quedé con la primera opción que es la más sencilla y legible. La clave del desafío no era tanto el algoritmo, sino entender el comportamiento de JavaScript con las fechas y las zonas horarias.

:::note
**Lección aprendida**: Siempre que trabajes con  fechas en JavaScript, ten en cuenta las zonas horarias. Un simple `T00:00:00` puede ahorrarte muchos dolores de cabeza.
:::

---
title: "Dias Hasta El Fin de Semana- FreeCodeCamp Daily Challenge"
published: 2025-11-14T13:10:00.000Z
description: "Análisis de solución al problema Days Until Weekend, con calendario visual, explicación paso a paso y uso eficiente de fechas en JS."
tags:
  - freecodecamp
  - daily-challenge
draft: false
toc: true
lang: "es"
abbrlink: "days-until-weekend"
---

## Days Until Weekend — FreeCodeCamp Daily Challenge

Uno de los problemas cotidianos en programación es calcular cuántos días faltan para el fin de semana. Vamos a analizar cómo resolverlo en JavaScript de manera sencilla y didáctica.

---

## 📝 Enunciado del Problema

> El fin de semana comienza el sábado.
>
> - Si la fecha dada es sábado o domingo, retorna `"It's the weekend!"`.
> - Si no, retorna `"X days until the weekend."`, donde X es la cantidad de días hasta el sábado.
> - Si X es 1, usa `"day"` en singular.
> - Ignora la zona horaria local en la cuenta.

---

## 🧪 Test Cases

- daysUntilWeekend("2025-11-14") → `"1 day until the weekend."`
- daysUntilWeekend("2025-01-01") → `"3 days until the weekend."`
- daysUntilWeekend("2025-12-06") → `"It's the weekend!"`
- daysUntilWeekend("2026-01-27") → `"4 days until the weekend."`
- daysUntilWeekend("2026-09-07") → `"5 days until the weekend."`
- daysUntilWeekend("2026-11-29") → `"It's the weekend!"`

---

## 🔍 Análisis y Enfoque

La solución se basa en aprovechar el método `getUTCDay()` del objeto Date, que devuelve el día de la semana en formato UTC (0 = domingo, ..., 6 = sábado).

El esquema general sería:

1. Crear un objeto Date usando el string de fecha.
2. Obtener el día de la semana en UTC.
3. Si es sábado o domingo, retornar mensaje de fin de semana.
4. Si no, calcular restantes hasta sábado y retornar el mensaje adecuado (cuidando singular/plural).

---

## 💡 Solución en JavaScript

```js
function daysUntilWeekend(dateString) {
  const date = new Date(dateString)
  const dayOfWeek = date.getUTCDay()

  // Validación opcional (recomendable si se espera input incorrecto)
  // if (isNaN(date.getTime())) return "Invalid date.";

  if (dayOfWeek === 6 || dayOfWeek === 0) {
    return 'It\'s the weekend!'
  }

  const daysUntilSaturday = 6 - dayOfWeek
  return daysUntilSaturday === 1
    ? '1 day until the weekend.'
    : `${daysUntilSaturday} days until the weekend.`
}
```

---

## 🛠️ Ejemplo paso a paso (con console.log):

Supón la fecha `"2025-11-14"`:

```js
const dateString = '2025-11-14'
const date = new Date(dateString)
const dayOfWeek = date.getUTCDay()

console.log('Día de la semana (UTC):', dayOfWeek) // 5 → Viernes

if (dayOfWeek === 6 || dayOfWeek === 0) {
  console.log('It\'s the weekend!')
}
else {
  const daysUntilSaturday = 6 - dayOfWeek
  if (daysUntilSaturday === 1) {
    console.log('1 day until the weekend.')
  }
  else {
    console.log(`${daysUntilSaturday} days until the weekend.`)
  }
}
// Salida: "1 day until the weekend."
```

---

## 📊 Complejidad

- **Tiempo:** \( O(1) \) (operaciones constantes).
- **Espacio:** \( O(1) \) (solo variables escalares y un objeto Date).

---

## ⚠️ Casos Edge y Consideraciones

- Usa UTC para evitar problemas de zona horaria local.
- Si la fecha es sábado (6) o domingo (0), retorna mensaje de fin de semana.
- Si la fecha es viernes (5), retorna "1 day until the weekend." (singular).
- Si la fecha es inválida: se retorna "NaN days…" (no cubierto en los tests, pero puede mejorarse).
- Para mayor robustez: agrega validación para fechas inválidas.

---

## 📑 Relación y diferencias con Weekday Finder

> Si te interesan los desafíos de fechas, revisa [mi artículo sobre Weekday Finder](https://blog-astro-rouge.vercel.app/posts/weekly-finder/), donde detallo cómo obtener el nombre del día a partir de una fecha usando JavaScript y cómo evitar errores de zona horaria.

Si bien ambos problemas giran en torno al manejo de fechas en JavaScript y la zona horaria puede causar errores sutiles, existe una diferencia clave:

- **Days Until Weekend** solo necesita el número del día en la semana (de 0 a 6) y lo obtiene de forma segura usando `getUTCDay()`, lo que ignora la zona horaria local y siempre da el resultado correcto para el cálculo de días que faltan hasta el sábado.

- **Weekday Finder** necesita el nombre del día ("Monday", "Tuesday"...). Si usás el método directo de JavaScript (`toLocaleDateString` sobre un string tipo "YYYY-MM-DD"), podés tener errores porque la fecha se interpreta como UTC y se convierte a la zona horaria local. Esto causa que, en sistemas con ciertas configuraciones, la función devuelva el día anterior al esperado.

**Lección clave**:
Cuando trabajes con fechas en JS, no solo pienses en el formato, sino también en cómo la zona horaria afecta la interpretación.
En "Days Until Weekend", usar UTC es suficiente. En "Weekday Finder", agregar `"T00:00:00"` al string de entrada asegura que la fecha se interprete como local y el resultado sea consistente.

🔗 [Lee el análisis completo de Weekday Finder](https://blog-astro-rouge.vercel.app/posts/weekly-finder/)

---

## 🧩 Reflexiones y Aprendizajes

- El método `getUTCDay()` permite trabajar sin preocuparse por la zona horaria local.
- El operador ternario permite ajustar el mensaje sing/plural con claridad.
- Siempre resulta útil visualizar el calendario para entender la lógica.
- Si el problema se internacionaliza, se puede adaptar fácilmente.

---

## 🔎 Recursos clave

- [MDN Date.prototype.getUTCDay](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCDay)
- [MDN Date constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date)
- [LeetCode: Date problems](https://leetcode.com/tag/date/)
- [MDN Operador ternario (Conditional Operator)](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)
- [Weekday Finder Analysis](https://blog-astro-rouge.vercel.app/posts/weekly-finder/)

---

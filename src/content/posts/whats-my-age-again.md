---
title: "Cual Es Mi Edad De Nuevo? - FreCodecamp Daily Challenge"
published: 2025-11-27T10:31:20.681Z
description: 'Resolvemos "What''s My Age Again?" de FreeCodeCamp Daily Challenge utilizando JavaScript.'
updated: ''
tags:
  - freecodecamp
  - daily-challenge
draft: false
pin: 0
toc: true
lang: "es"
abbrlink: "whats-my-age-again"
---

## ¿Cuál es mi edad de nuevo? – Resolviendo el Daily Challenge con sabor a Blink-182

### “What’s My Age Again?”

> “And that’s about the time that she walked away from me…
> Nobody likes you when you’re 23!”

Sí, el desafío del día lleva por título la canción más icónica de **Blink-182** de *Enema of the State* (1999). Un ejercicio para calcular la edad con el título de la canción que habla de no querer crecer.

## El enunciado

Dado un string con fecha de nacimiento `YYYY-MM-DD`, devuelve la edad exacta **al día de hoy (27 de noviembre de 2025)**.
Y sí, hay que tener en cuenta si ya cumpliste años en 2025.

## Mi primer impulso (el error clásico)

```js
2025 - añoDeNacimiento
```

Listo. Me voy a tocar el bajo.

…pero no, porque alguien nacido el 28 de noviembre todavía tiene un año menos. Pensé que sabía mi edad… hasta que tenemos que programar cómo averiguarla.

## La solución

```js
function getAge(birthday) {
  const [y, m, d] = birthday.split('-').map(Number)
  const today = new Date()
  const age = today.getFullYear() - y

  const hasHadBirthdayThisYear
    = (today.getMonth() + 1) > m
      || ((today.getMonth() + 1) === m && today.getDate() >= d)

  return hasHadBirthdayThisYear ? age : age - 1
}
```

## Conceptos clave

- **Desestructuración de arrays**: Extraemos año, mes y día directamente del string.
- **Objeto Date**: Usamos `new Date()` para obtener la fecha actual.
- **No usamos objeto Date para la fecha de nacimiento**: Solo necesitamos los componentes individuales.
- **Cálculo de edad**: Restamos años y ajustamos según si ya pasó el cumpleaños en el año actual.

> “No one should take themselves so seriously…”
> — Blink-182, *What’s My Age Again?*

### Recursos adicionales

- [Documentación de Date en MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
- [Disco Enema of the State - Blink-182](https://en.wikipedia.org/wiki/Enema_of_the_State)
- [What's My Age Again? - Letra y Video](https://www.youtube.com/watch?v=9Ht5RZpzPqw)

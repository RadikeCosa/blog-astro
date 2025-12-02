---
title: "Test de huella digital - FreeCodeCamp Daily Challenge"
published: 2025-11-17T11:33:17.020Z
description: 'Resolvemos el daily challenge "fingerprint-test" de FreeCodeCamp.'
updated: ''
tags:
  - freecodecamp
  - daily-challenge
draft: false
pin: 0
toc: true
lang: "es"
abbrlink: "fingerprint-test"
---

## ¿De qué trata el reto?

En este desafío de FreeCodeCamp, tenemos dos cadenas de texto (huellas digitales) hechas solo con letras minúsculas. Queremos saber si son lo suficientemente parecidas para considerarlas "iguales" según dos reglas simples:

1. **Deben tener la misma longitud** (el mismo número de letras).
2. **No pueden ser muy diferentes**: solo se permite que hasta el 10% de las letras sean distintas.

## Ejemplos fáciles

- `helloworld` y `jelloworld` → Solo cambia la primera letra, así que sí coinciden.
- `abc` y `xyz` → Todas las letras son diferentes, así que no coinciden.

## ¿Cómo lo resolvemos?

La idea es comparar letra por letra:

- Si las cadenas no tienen la misma cantidad de letras, devolvemos `false`.
- Si sí, contamos cuántas letras son diferentes.
- Si las diferencias no superan el 10% del total, devolvemos `true`.

## Código simple en JavaScript

```javascript
function isMatch(fingerprint1, fingerprint2) {
  if (fingerprint1.length !== fingerprint2.length)
    return false
  let diferencias = 0
  for (let i = 0; i < fingerprint1.length; i++) {
    if (fingerprint1[i] !== fingerprint2[i])
      diferencias++
  }
  return diferencias <= fingerprint1.length * 0.1
}
```

## ¿Por qué funciona?

- Compara solo lo necesario.
- Es rápido incluso para cadenas largas.
- Es fácil de entender y modificar.

## Casos curiosos

- Si ambas cadenas están vacías, se consideran iguales.
- Si solo una letra es diferente y el total es 10 o más, todavía coinciden.

## Prueba tú mismo

```javascript
isMatch('helloworld', 'jelloworld') // true
isMatch('abc', 'xyz') // false
isMatch('test', 'test') // true
isMatch('abc', 'abx') // true
```

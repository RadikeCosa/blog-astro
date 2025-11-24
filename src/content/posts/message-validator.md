---
title: "Validación de Mensajes - FreeCodeCamp Daily Challenge"
published: 2025-11-24T12:48:16.260Z
description: 'Resolvemos el problema "Message Validator" de FreeCodeCamp utilizando expresiones regulares en JavaScript.'
updated: ''
tags:
  - freecodecamp
  - daily-challenge
draft: false
pin: 0
toc: true
lang: "es"
abbrlink: "message-validator"
---

## Introducción

### Enunciado del Problema

Dado un string de mensaje y un string de validación, determina si el mensaje es válido.
Un mensaje es válido si cada palabra en el mensaje comienza con la letra correspondiente en el string de validación, en orden.
Las letras no distinguen entre mayúsculas y minúsculas.
Las palabras en el mensaje están separadas por espacios simples.

## Análisis Inicial

### Comprensión del Problema

- El mensaje se divide en palabras usando espacios como separadores.
- Cada palabra debe comenzar con la letra correspondiente en el string de validación.
- La comparación es insensible a mayúsculas y minúsculas.
- El número de palabras en el mensaje debe coincidir con la longitud del string de validación.
- Si alguna palabra no cumple con la condición, el mensaje es inválido.
- Si todas las palabras cumplen, el mensaje es válido.
- Retornar `true` si el mensaje es válido, `false` en caso contrario.

### Casos de Prueba Identificados

| Entrada                                                        | Salida Esperada | Cumple |
| -------------------------------------------------------------- | --------------- | ------ |
| `"hello world", "hw"`                                          | `true`          | Yes    |
| `"ALL CAPITAL LETTERS", "acl"`                                 | `true`          | Yes    |
| `"Coding challenge are boring.", "cca"`                        | `false`         | Yes    |
| `"The quick brown fox jumps over the lazy dog.", "TQBFJOTLD"`  | `true`          | Yes    |
| `"The quick brown fox jumps over the lazy dog.", "TQBFJOTLDT"` | `false`         | Yes    |

## Desarrollo de la Solución

### Enfoque Elegido

- Dividir el mensaje en palabras utilizando espacios como separadores.
- Comparar la primera letra de cada palabra con la letra correspondiente en el string de validación.
- Asegurarse de que el número de palabras coincida con la longitud del string de validación.
- Implementar la comparación de manera insensible a mayúsculas y minúsculas.
- Retornar `true` si todas las palabras cumplen con la condición, `false` en caso contrario.

### Implementación en JavaScript

```javascript
/**
 * FreeCodeCamp Problem: Message Validator
 * Category: FreeCodeCamp
 *
 * @param {string} message - The message to validate
 * @param {string} validator - The validator string
 * @returns {boolean} Whether the message is valid according to the validator
 */
function isValidMessage(message, validator) {
  const words = message
    .replace(/[^a-z\s]/gi, '')
    .trim()
    .split(/\s+/)
    .filter(word => word.length > 0)

  if (words.length !== validator.length) {
    return false
  }

  for (let i = 0; i < words.length; i++) {
    if (words[i][0].toLowerCase() !== validator[i].toLowerCase()) {
      return false
    }
  }

  return true
}
```

## Análisis de Complejidad

### Complejidad Temporal

La complejidad temporal de esta solución es \(O(n)\), donde \(n\) es el número de palabras en el mensaje. Esto se debe a que iteramos sobre cada palabra una vez para realizar las comparaciones necesarias.

### Complejidad Espacial

La complejidad espacial es \(O(m)\), donde \(m\) es la cantidad de espacio adicional utilizado para almacenar las palabras del mensaje después de dividirlo.

### Recursos Adicionales

- [Documentación de String.prototype.split()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split)
- [Documentación de String.prototype.toLowerCase()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase)
- [Expresiones Regulares en JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)

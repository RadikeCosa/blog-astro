---
title: "De Camello a Vibora - FreeCodeCamp Daily Challenge"
published: 2025-12-02T11:31:38.756Z
description: 'Resolvemos el desafio diario de FreeCodeCamp, en el dia de hoy "Camel To Snake", parece un numero de circo pero es un desafio de manipulacion de strings.'
updated: ''
tags:
  - freecodecamp
  - daily challenge
draft: false
pin: 0
toc: true
lang: "es"
abbrlink: "camel-to-snake"
---

## De Camello a Víbora

Aunque el título suene a número de circo, el desafío de hoy consiste en convertir cadenas escritas en formato camelCase a snake_case.

**Camel Case** es un estilo donde las palabras se unen sin espacios y cada palabra (excepto la primera) comienza con mayúscula, por ejemplo: `camelCaseExample`.
**Snake Case** utiliza solo minúsculas y separa las palabras con guiones bajos, por ejemplo: `snake_case_example`.

### Enunciado del Problema

Dado un string en camelCase, devolvé su versión en snake_case siguiendo estas reglas:

- El string contiene solo letras (A-Z y a-z) y siempre comienza con minúscula.
- Cada letra mayúscula indica el inicio de una nueva palabra.
- Convertí todas las letras a minúsculas.
- Separá las palabras con guiones bajos (`_`).

### Enfoque de la Solución

La primera intuición es recorrer el string y detectar las letras mayúsculas. Cada vez que encontramos una, la convertimos a minúscula y la precedemos con un guion bajo en el resultado.
Para identificar mayúsculas en JavaScript, podemos comparar `char === char.toUpperCase()` o usar `char >= 'A' && char <= 'Z'`.

Otra opción es usar expresiones regulares con `replace`, buscando todas las mayúsculas y reemplazándolas por un guion bajo seguido de la letra en minúscula. El método `replace` permite pasar una función para transformar el match.

### Implementación

#### Solución con Bucle

```javascript
function toSnakeLoop(camelCaseStr) {
  let snakeCaseStr = ''
  for (let char of camelCaseStr) {
    if (char >= 'A' && char <= 'Z') {
      snakeCaseStr += `_${char.toLowerCase()}`
    }
    else {
      snakeCaseStr += char
    }
  }
  return snakeCaseStr
}
```

#### Solución con Expresiones Regulares

```javascript
function toSnakeRegex(camelCaseStr) {
  return camelCaseStr.replace(/([A-Z])/g, (match) => {
    return `_${match.toLowerCase()}`
  })
}
```

### Análisis de Complejidad

- **Tiempo:** $O(n)$, donde $n$ es la longitud del string. Ambas soluciones recorren el string una vez.
- **Espacio:** $O(n)$, ya que se genera un nuevo string proporcional al tamaño de la entrada.

### Consideraciones Finales

Ambas soluciones son eficientes y cumplen con los requisitos. La elección entre bucle o expresión regular depende de la preferencia personal y el contexto. Las expresiones regulares suelen ser más concisas, mientras que el bucle puede resultar más claro para quienes no están familiarizados con regex.

### Recursos Adicionales

- [Aprender Regex](https://regexlearn.com/es/)
- [Documentación de String.replace() en MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/replace)

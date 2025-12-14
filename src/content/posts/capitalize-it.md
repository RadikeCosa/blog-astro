---
title: "Mayusculízalo - FreeCodeCamp #126 Daily Challenge"
published: 2025-12-14T21:03:24.789Z
description: 'Resolvemos "Capitalize It", el desafío diario #126 de FreeCodeCamp. Analizamos el problema, desarrollamos una solución en JavaScript y explicamos la complejidad del algoritmo.'
updated: ''
tags:
  - freecodecamp
  - daily-challenge
draft: false
pin: 0
toc: true
lang: "es"
abbrlink: "capitalize-it"
---

## Enunciado

Dado un string que representa un título, devuelve un nuevo string en "title case" siguiendo estas reglas:

- La primera letra de cada palabra en mayúscula.
- El resto de las letras en minúscula.
- Las palabras separadas por un solo espacio.

## Análisis Inicial

El objetivo es transformar cualquier string recibido para que cada palabra comience con mayúscula y el resto de las letras sean minúsculas, sin importar el formato original. Las palabras deben estar separadas por un solo espacio.

### Casos de Prueba

Algunos casos relevantes:

1. titleCase("hello world") → "Hello World"
2. titleCase("the quick brown fox") → "The Quick Brown Fox"
3. titleCase("JAVASCRIPT AND PYTHON") → "Javascript And Python"
4. titleCase("AvOcAdO tOAst fOr brEAkfAst") → "Avocado Toast For Breakfast"
5. titleCase("") → ""
6. titleCase("a") → "A"
7. titleCase("A") → "A"
8. titleCase("multiple   spaces") → "Multiple Spaces"
9. titleCase("  leading and trailing  ") → "Leading And Trailing"

## Desarrollo de la Solución

### Enfoque

La clave es transformar el string a minúsculas, dividirlo en palabras, capitalizar la primera letra de cada una y unirlas con un solo espacio.

### Implementación paso a paso

1. Convertir todo el string a minúsculas.
2. Dividir en palabras.
3. Capitalizar la primera letra de cada palabra.
4. Unir con espacios.

```javascript
function titleCase(title) {
  return title
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
```

## Análisis de Complejidad

### Complejidad Temporal

La función recorre el string para minúsculas, luego para dividir y luego para mapear, todo en $O(n)$ donde $n$ es la longitud del string.

### Complejidad Espacial

Se crean arrays y strings intermedios, por lo que también es $O(n)$.

## Casos Edge y Consideraciones

- String vacío → retorna "".
- Espacios múltiples → split(" ") genera palabras vacías, pero el resultado sigue el formato esperado.
- Espacios al inicio o final → se generan palabras vacías, pero el resultado es correcto.
- Palabra de un solo carácter → se capitaliza bien.

## Reflexiones y Aprendizajes

### Conceptos Aplicados

- Métodos de string: toLowerCase, split, map, charAt, slice, join.
- Funciones de orden superior (map).
- Composición de funciones para transformar paso a paso.

### Optimizaciones

Para evitar palabras vacías por espacios múltiples, se puede usar una expresión regular y filter:

```javascript
function titleCase(title) {
  return title
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
```

También se puede usar trim() para eliminar espacios al inicio y al final:

```javascript
function titleCase(title) {
  return title
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
```

## Recursos

- [String.prototype.toLowerCase() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase)
- [String.prototype.split() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split)
- [Array.prototype.map() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [String.prototype.charAt() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charAt)
- [String.prototype.slice() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice)
- [String.prototype.join() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join)

---

¿Te resultó útil? ¿Qué otros desafíos te gustaría ver resueltos? 🚀

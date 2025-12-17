---
title: "Caracteres Unicos - FreeCodeCamp #30 Daily Challenge"
published: 2025-12-16T16:45:42.925Z
description: "Resolvemos el clásico problema de 'Unique Characters': ¿cómo saber si una cadena tiene todos sus caracteres distintos? Analizamos, optimizamos y explicamos paso a paso."
updated: ''
tags:
  - daily-challenge
  - freecodecamp
draft: false
pin: 0
toc: true
lang: "es"
abbrlink: "unique-characters"
---

### Enunciado

Dado un string, determina si **todos los caracteres** son únicos (sin repeticiones).

> ⚠️ **Nota:** Mayúsculas y minúsculas cuentan como diferentes ("a" ≠ "A").

## Análisis Inicial

### ¿Qué buscamos?

Verificar si una cadena tiene **todos los caracteres distintos**.

### Casos de Prueba

| Entrada              | Salida Esperada |
|----------------------|-----------------|
| "abc"                | true            |
| "aA"                 | true            |
| "QwErTy123!@"        | true            |
| "~!@#$%^&*()_+"      | true            |
| "hello"              | false           |
| "freeCodeCamp"       | false           |
| "!@#_$%^&_()aA"      | false           |

## Desarrollo de la Solución

### Estrategia Elegida

Usamos un `Set` para guardar los caracteres que ya vimos. Si encontramos uno repetido, devolvemos `false` al instante. Si llegamos al final sin repeticiones, devolvemos `true`.

### Código en JavaScript

```js
// Devuelve true si todos los caracteres son únicos
function tieneCaracteresUnicos(str) {
  const vistos = new Set()
  for (const char of str) {
    if (vistos.has(char)) {
      // Encontramos un duplicado
      return false
    }
    vistos.add(char)
  }
  // Todos los caracteres son únicos
  return true
}

// Ejemplo de uso
console.log(tieneCaracteresUnicos('abc')) // true
console.log(tieneCaracteresUnicos('hello')) // false
console.log(tieneCaracteresUnicos('aA')) // true
```

## Análisis de Complejidad

- **Tiempo:** $O(n)$, donde $n$ es la longitud de la cadena (recorremos cada carácter una vez).
- **Espacio:** $O(n)$ en el peor caso (todos los caracteres son únicos y se guardan en el Set).

## Casos Edge y Consideraciones

- Cadena vacía: retorna `true` (no hay repeticiones).
- Caracteres especiales, números y letras: todos cuentan como distintos.
- Mayúsculas y minúsculas: se consideran diferentes ("a" ≠ "A").
- Cadenas largas con todos los caracteres únicos: más uso de memoria.

## Reflexiones y Aprendizajes

### ¿Qué aprendimos?

- El `Set` es ideal para detectar duplicados de forma eficiente.
- Detectar repeticiones temprano ahorra tiempo.
- Este patrón es útil en validaciones, passwords, y más.

## Recursos y Referencias

- [Set en JavaScript (MDN)](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Set)

---

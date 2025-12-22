---
title: "Oración Invertida - FreeCodeCamp #32 Daily Challenge"
published: 2025-12-22T21:05:57.146Z
description: 'Resolvemos "Reverse Sentence" de FreeCodeCamp, un desafío de manipulación de strings: invertir el orden de las palabras y normalizar espacios.'
updated: ''
tags:
  - freecodecamp
  - daily-challenge
draft: false
pin: 0
toc: true
lang: "es"
abbrlink: "reverse-sentence"
---

## Reverse Sentence — Análisis y Explicación 🚀

### Enunciado del Problema

Dado un string de palabras, devuelve un nuevo string con las palabras en orden inverso. Por ejemplo, la primera palabra debe estar al final y la última al principio.

**Condiciones:**
- Las palabras pueden estar separadas por uno o más espacios.
- La cadena retornada debe tener solo un espacio entre cada palabra.

## Análisis Inicial

### ¿Qué pide el reto?

Invertir el orden de las palabras y normalizar los espacios. Es decir:

1. Separar correctamente las palabras (ignorando espacios extra).
2. Reordenar e imprimirlas en orden inverso, separadas por un solo espacio.

Para esto, los métodos `split`, `reverse` y `join` de JavaScript son ideales.

### Casos de Prueba Clave

- Entrada: `"world hello"` → Salida: `"hello world"`
- Entrada: `"push   commit git"` → Salida: `"git commit push"`
- Entrada: `"npm    install   sudo"` → Salida: `"sudo install npm"`
- Entrada: `"import   default function   export"` → Salida: `"export function default import"`

Todos los casos normalizan los espacios y revierten el orden de las palabras.

## Desarrollo de la Solución

### Estrategia

1. **Dividir** usando `.split(/\s+/)` para obtener solo palabras.
2. **Invertir** el arreglo.
3. **Unir** con `.join(' ')` para asegurar un solo espacio.

### Implementación en JavaScript

```javascript
function reverseSentence(sentence) {
  return sentence
    .trim() // Elimina espacios al inicio y al final
    .split(/\s+/) // Divide en palabras, ignora espacios extra
    .reverse() // Invierte el arreglo
    .join(' ') // Une con un solo espacio
}
```

## Análisis de Complejidad

### Temporal

Cada operación (`trim`, `split`, `reverse`, `join`) recorre la cadena o el arreglo una vez: $$O(n)$$

### Espacial

Se crean arreglos auxiliares proporcionales al tamaño de la entrada: $$O(n)$$

## Casos Edge y Consideraciones

- **Cadena vacía o solo espacios:** retorna "" (vacío).
- **Espacios al inicio/final:** se eliminan.
- **Múltiples espacios entre palabras:** normalizados a uno solo.
- **Una sola palabra:** retorna igual, sin espacios extra.

## Reflexiones y Aprendizajes

🔹 **Strings y arreglos:** manipulación eficiente en JS.
🔹 **Expresiones regulares:** robustez ante entradas "sucias".
🔹 **Composición funcional:** código legible y compacto.

💡 La solución es óptima y legible. No requiere optimizaciones adicionales.

## Recursos y Referencias

- [String.prototype.split() - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/split)
- [Array.prototype.reverse() - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)
- [Array.prototype.join() - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/join)

---

---
title: "Cuenta Caracteres - FreeCodeCamp Daily Challenge"
published: 2025-11-24T12:41:48.247Z
description: 'Resolvemos el problema "Character Count" de FreeCodeCamp utilizando arrays y manipulación de cadenas en JavaScript.'
updated: ''
tags:
  - freecodecamp
  - daily-challenge
draft: false
pin: 0
toc: true
lang: "es"
abbrlink: "character-count"
---
## Cuenta de Caracteres

### Enunciado del Problema

Dado un string que contiene una oración, devuelve un **array de strings** con el conteo de cada letra presente, en **orden alfabético**.

**Reglas**:

- Mayúsculas y minúsculas cuentan como la misma letra.
- Ignorar espacios, números, puntuación y cualquier carácter no alfabético.
- Solo incluir letras que aparezcan al menos una vez.
- Salida en minúsculas y formato `"letra conteo"` → ejemplo: `"a 5"`

### Analisis Inicial

El problema requiere contar la frecuencia de cada letra en una oración dada, ignorando mayúsculas, minúsculas, espacios y caracteres no alfabéticos. La salida debe ser un array ordenado alfabéticamente con el formato especificado.

### Enfoque Elegido

Para resolver este problema, utilizaremos un array fijo de 26 posiciones para contar las ocurrencias de cada letra del alfabeto. Luego, construiremos el resultado en el formato requerido.

### Implementación Paso a Paso

```javascript
/**
 * Cuenta las letras de una oración (ignorando case, números, espacios y puntuación)
 * y devuelve un array ordenado alfabéticamente con formato "letra conteo".
 * Complejidad: O(n) tiempo → O(1) espacio auxiliar
 * @param {string} sentence
 * @returns {string[]}
 */
function countCharacters(sentence) {
  // Array fijo de 26 posiciones: índice 0 = 'a', 1 = 'b', ..., 25 = 'z'
  const counts = Array.from({ length: 26 }).fill(0)
  // Normalizamos una sola vez
  const lower = sentence.toLowerCase()
  // Fase 1: Contar letras (O(n))
  for (const char of lower) {
    if (char >= 'a' && char <= 'z') {
      const index = char.charCodeAt(0) - 97 // 'a' → 0
      counts[index]++
    }
  }
  // Fase 2: Construir resultado (orden natural, O(26) = O(1))
  const result = []
  for (let i = 0; i < 26; i++) {
    if (counts[i] > 0) {
      const letter = String.fromCharCode(97 + i)
      result.push(`${letter} ${counts[i]}`)
    }
  }
  return result
}
```

### Explicación del Código

- Creamos un array `counts` de 26 posiciones para almacenar el conteo de cada letra.
- Convertimos la oración a minúsculas para normalizar la comparación.
- Iteramos sobre cada carácter de la oración, verificando si es una letra entre 'a' y 'z'. Si lo es, calculamos su índice correspondiente y aumentamos su conteo.
- Finalmente, construimos el array de resultados recorriendo el array `counts` y agregando las letras con conteo mayor a cero en el formato requerido.
- Devolvemos el array resultante.

## Análisis de Complejidad

| Métrica          | Complejidad | Explicación                                                   |
| ---------------- | ----------- | ------------------------------------------------------------- |
| Tiempo           | **O(n)**    | Un pase por el string + un pase fijo de 26 → O(n + 26) = O(n) |
| Espacio auxiliar | **O(1)**    | Siempre 26 enteros (array fijo)                               |
| Espacio total    | O(k)        | k ≤ 26 (salida) → sigue siendo O(1) en práctica               |

**Ventaja clave**: No se ordena nada → el orden alfabético sale gratis por la estructura del array.

## Casos Edge y Pruebas

| Entrada                                         | Salida Esperada                                                   | Cumple |
| ----------------------------------------------- | ----------------------------------------------------------------- | ------ |
| `""`                                            | `[]`                                                              | Yes    |
| `"!!!123 @#$%"`                                 | `[]`                                                              | Yes    |
| `"a"`                                           | `["a 1"]`                                                         | Yes    |
| `"AAAaaa"`                                      | `["a 6"]`                                                         | Yes    |
| `"The quick brown fox jumps over the lazy dog"` | 26 elementos (pangrama)                                           | Yes    |
| `"JavaScript123!!!"`                            | `["a 2", "c 1", "i 2", "j 1", "p 1", "r 1", "s 1", "t 1", "v 1"]` | Yes    |

## Reflexiones y Aprendizajes

- Cuando el dominio es pequeño y conocido (26 letras), **un array fijo siempre gana** a un HashMap.
- Evitar `.sort()` cuando el orden ya está implícito → mejora dramática de rendimiento.
- Usar `charCodeAt()` y aritmética de índices es una técnica clásica y muy eficiente en problemas de conteo de caracteres.

### Recursos Adicionales

- [Documentación de JavaScript sobre Strings](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String)
- [Documentación de JavaScript sobre Arrays](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [Método charCodeAt()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt)
- [Manipulación de Cadenas en JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String)

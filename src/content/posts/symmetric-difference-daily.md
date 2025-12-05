---
title: "Diferencia Simétrica - FreeCodeCamp Daily Challenge"
published: 2025-12-05T15:07:30.025Z
description: "Cómo encontrar elementos exclusivos entre dos arrays usando Sets en JavaScript. Análisis de complejidad O(n+m) y teoría de conjuntos aplicada."
updated: ""
tags:
  - freecodecamp
  - daily-challenge
draft: false
pin: 0
toc: true
lang: "es"
abbrlink: "symmetric-difference-daily"
---

## Introducción - Enunciado

Dados dos arrays, devuelve un nuevo array que contenga la diferencia simétrica entre ellos.

La diferencia simétrica entre dos conjuntos es el conjunto de valores que aparecen en uno u otro conjunto, pero no en ambos.

Devuelve los valores en el orden en que aparecen por primera vez en los arrays de entrada.

Array A: [1, 2, 3]
Array B: [2, 3, 4]

- El 1 está solo en A ✓
- El 2 está en ambos ✗
- El 3 está en ambos ✗
- El 4 está solo en B ✓

Diferencia simétrica: [1, 4]

## Análisis Inicial

### Comprensión del Problema

Necesitamos encontrar los elementos únicos de cada array. La **diferencia simétrica** implica eliminar los elementos presentes en ambos arrays y conservar solo los exclusivos de cada uno.

**La función debe:**

1. Recibir dos arrays como entrada
2. Identificar los elementos únicos en cada array
3. Combinar estos elementos únicos en un solo array de salida
4. Mantener el orden de aparición

Es una operación de conjuntos:

$$
A \triangle B = (A - B) \cup (B - A)
$$

```mermaid
flowchart LR
    A["Array A"] --> SA["Set A"]
    B["Array B"] --> SB["Set B"]
    SA --> F1["Filtrar: no en B"]
    SB --> F2["Filtrar: no en A"]
    F1 --> R["Resultado"]
    F2 --> R
```

| Pregunta                                     | Respuesta                      |
| -------------------------------------------- | ------------------------------ |
| ¿Qué hacemos con duplicados en el resultado? | Solo incluir una vez           |
| ¿Importa el orden?                           | Sí, orden de primera aparición |
| ¿Los arrays pueden estar vacíos?             | Sí, es un caso edge            |
| ¿Qué tipos de datos contienen?               | Típicamente números            |

### Casos de Prueba Identificados

```javascript
// Caso básico
sym([1, 2, 3], [2, 3, 4]); // → [1, 4]

// Sin elementos en común
sym([1, 2], [3, 4]); // → [1, 2, 3, 4]

// Todos los elementos en común
sym([1, 2], [1, 2]); // → []

// Array vacío
sym([], [1, 2]); // → [1, 2]
sym([1, 2], []); // → [1, 2]

// Con duplicados en entrada
sym([1, 1, 2], [2, 3]); // → [1, 3]

// Arrays idénticos
sym([1, 2, 3], [1, 2, 3]); // → []
```

## Desarrollo de la Solución

### Enfoque Elegido

Utilizamos **Set** como estructura de datos principal por dos razones:

1. **Elimina duplicados automáticamente** al convertir cada array
2. **Búsqueda en O(1)** con el método `.has()` para verificar existencia

La estrategia consiste en:

1. Convertir ambos arrays a Sets
2. Filtrar elementos de A que **no están** en B
3. Filtrar elementos de B que **no están** en A
4. Concatenar ambos resultados

### Implementación Paso a Paso

```javascript
function sym(arrA, arrB) {
  // Paso 1: Convertir a Sets (elimina duplicados)
  const setA = new Set(arrA);
  const setB = new Set(arrB);

  // Paso 2: Elementos de A que NO están en B
  const onlyInA = [...setA].filter((x) => !setB.has(x));

  // Paso 3: Elementos de B que NO están en A
  const onlyInB = [...setB].filter((x) => !setA.has(x));

  // Paso 4: Combinar ambos resultados
  return [...onlyInA, ...onlyInB];
}
```

> **¿Por qué spread operator(`...`)?**
>
> `Set` no tiene el método `.filter()` —solo tiene `.has()`, `.add()`, `.delete()` y `.forEach()`. Al usar `[...setA]` convertimos el Set a un Array, lo que nos permite usar `.filter()`. Alternativas equivalentes serían `Array.from(setA)` o un loop manual con `for...of`.

```text
Entrada: arrA = [1, 1, 2, 3], arrB = [2, 3, 4, 4]

Paso 1 - Crear Sets:
setA = {1, 2, 3}
setB = {2, 3, 4}

Paso 2 - Filtrar A (¿está en B?):
1 → setB.has(1) = false ✓ → incluir
2 → setB.has(2) = true ✗ → excluir
3 → setB.has(3) = true ✗ → excluir
onlyInA = [1]

Paso 3 - Filtrar B (¿está en A?):
2 → setA.has(2) = true ✗ → excluir
3 → setA.has(3) = true ✗ → excluir
4 → setA.has(4) = false ✓ → incluir
onlyInB = [4]

Paso 4 - Combinar:
resultado = [1, 4]

```

## Análisis de Complejidad

### Complejidad Temporal

| Operación             | Complejidad        |
| --------------------- | ------------------ |
| Crear `setA`          | O(n)               |
| Crear `setB`          | O(m)               |
| Filtrar `setA`        | O(n) × O(1) = O(n) |
| Filtrar `setB`        | O(m) × O(1) = O(m) |
| Concatenar resultados | O(n + m)           |

**Total: O(n + m)** donde `n` y `m` son los tamaños de los arrays de entrada.

> La búsqueda con `.has()` en un Set es O(1), lo que hace que el filtrado sea lineal.

### Complejidad Espacial

| Estructura      | Espacio               |
| --------------- | --------------------- |
| `setA`          | O(n)                  |
| `setB`          | O(m)                  |
| `onlyInA`       | O(n) en peor caso     |
| `onlyInB`       | O(m) en peor caso     |
| Array resultado | O(n + m) en peor caso |

**Total: O(n + m)** donde `n` y `m` son los tamaños de los arrays de entrada.

## Casos Edge y Consideraciones

| Caso               | Entrada             | Salida         | ¿Manejado? |
| ------------------ | ------------------- | -------------- | ---------- |
| Arrays vacíos      | `[], []`            | `[]`           | ✅         |
| Un array vacío     | `[1, 2], []`        | `[1, 2]`       | ✅         |
| Sin intersección   | `[1, 2], [3, 4]`    | `[1, 2, 3, 4]` | ✅         |
| Totalmente iguales | `[1, 2], [1, 2]`    | `[]`           | ✅         |
| Con duplicados     | `[1, 1, 2], [2, 3]` | `[1, 3]`       | ✅         |

## Reflexiones y Aprendizajes

### Conceptos Aplicados

- **Set**: estructura de datos que almacena valores únicos y permite búsqueda en O(1)
- **Spread operator (`...`)**: para convertir iterables (como Set) a Array
- **Higher-order functions**: uso de `.filter()` con una función callback para filtrar elementos repetidos.
- **Teoría de conjuntos**: diferencia simétrica como $A \triangle B = (A - B) \cup (B - A)$

### Posibles Optimizaciones

Una alternativa es usar loops manuales en lugar de `.filter()`, evitando crear arrays intermedios:

```javascript
function sym(arrA, arrB) {
  const setA = new Set(arrA);
  const setB = new Set(arrB);
  const result = [];

  for (const x of setA) {
    if (!setB.has(x)) result.push(x);
  }
  for (const x of setB) {
    if (!setA.has(x)) result.push(x);
  }

  return result;
}
```

| Aspecto              | Versión con filter | Versión con loop  |
| -------------------- | ------------------ | ----------------- |
| Complejidad temporal | O(n + m)           | O(n + m)          |
| Complejidad espacial | O(n + m)           | O(n + m)          |
| Legibilidad          | ✅ Más declarativa | ⚠️ Más imperativa |
| Arrays intermedios   | 2 arrays extra     | 0 arrays extra    |

> **Conclusión**: la diferencia de rendimiento es mínima. La versión con `.filter()` es más legible y expresiva, lo cual suele ser preferible a menos que se optimice para casos extremos de memoria.

## Recursos y Referencias

- [MDN Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
- [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [Teoría de Conjuntos - Diferencia Simétrica](https://es.wikipedia.org/wiki/Diferencia_sim%C3%A9trica)

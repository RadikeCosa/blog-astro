---
title: 'Fabrica de Matrices - FreeCodeCamp Daily Challenge'
published: 2025-11-05T14:04:58.646Z
description: 'Solución al desafío diario de FreeCodeCamp: construir matrices con Array.from(). Comparación de enfoques y análisis de cuándo usar cada uno.'
updated: ''
tags:
  - freecodecamp
  - daily-challenge
draft: false
pin: 0
toc: true
lang: 'es'
abbrlink: 'matrix-builder-freecodecamp-nov5'
---

El desafío de hoy de FreeCodeCamp es "Matrix Builder". El objetivo es crear una función que genere una matriz (array de arrays) de un tamaño especificado, llenándola con ceros.

## El Problema

Necesitamos implementar una función que tome dos parámetros:

- `rows`: cantidad de filas (arrays externos)
- `cols`: cantidad de columnas (elementos por fila)

Y devuelva una matriz de `rows x cols` llena de ceros.

En otros terminos la funcion recibe dos parametros, y debe devolver un array que contiene "rows" arrays, cada uno con "cols" posiciones llenas de ceros.

## Ejemplos

Aquí están los casos de prueba proporcionados:

1. `buildMatrix(3, 2)` debería devolver `[[0, 0], [0, 0], [0, 0]]`.
2. `buildMatrix(2, 4)` debería devolver `[[0, 0, 0, 0], [0, 0, 0, 0]]`.
3. `buildMatrix(1, 5)` debería devolver `[[0, 0, 0, 0, 0]]`.
4. `buildMatrix(4, 1)` debería devolver `[[0], [0], [0], [0]]`.

## ¿Qué es Array.from()?

Antes de ver la solución, entendamos esta herramienta clave de JavaScript moderno.

`Array.from()` crea un nuevo array a partir de algo que "parece" un array pero no lo es. Toma hasta 3 parámetros:

```javascript
Array.from(arrayLike, mapFunction, thisArg)
```

**Parámetros:**

1. **`arrayLike`** (requerido): Un objeto iterable o array-like que quieres convertir
2. **`mapFunction`** (opcional): Función que transforma cada elemento (como `.map()`)
3. **`thisArg`** (opcional): Valor para usar como `this` en la función de mapeo

**El truco con `{ length: N }`:**

JavaScript trata `{ length: N }` como un array-like object, y `Array.from()` lo convierte en un array real:

```javascript
// Crear array de 5 elementos undefined
Array.from({ length: 5 }) // [undefined, undefined, undefined, undefined, undefined]

// Crear array de 5 elementos con índices
Array.from({ length: 5 }, (_, i) => i) // [0, 1, 2, 3, 4]

// Llenar con un valor específico
Array.from({ length: 3 }, () => 0) // [0, 0, 0]
```

## Solución con Array.from()

Para este problema usamos `Array.from()` dos veces: la primera para crear el array externo (las filas), y la segunda para crear cada array interno (las columnas con ceros).

```javascript
function buildMatrix(rows, cols) {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => 0))
}
```

### Explicación Paso a Paso

1. **Primera llamada**: `Array.from({ length: rows }, ...)` crea un array de `rows` elementos.
2. **Función de mapeo externa**: Para cada elemento (fila), ejecutamos la función que devuelve un array.
3. **Segunda llamada**: `Array.from({ length: cols }, () => 0)` crea un array de `cols` elementos, todos con valor 0.
4. Devolvemos la matriz resultante: un array de arrays.

## Comparación de Enfoques

### Array.from() - Nuestra Solución

**✅ Más conveniente cuando:**

- Usas JavaScript moderno (ES6+, Node.js 8+, navegadores actuales)
- Prefieres estilo declarativo/funcional
- Necesitas código conciso y expresivo: "crear X filas de Y ceros"
- Trabajas con matrices multidimensionales (3D, 4D, etc.)
- Requieres inicialización compleja con valores diferentes por posición

**❌ Menos conveniente cuando:**

- Necesitas compatibilidad con IE11 o Node.js muy antiguo
- Prefieres código más explícito para debugging

### Bucles Anidados

**✅ Más conveniente cuando:**

- **Debugging**: Fácil agregar `console.log()` en cada paso
- **Compatibilidad**: Funciona en cualquier versión de JavaScript
- **Control fino**: Necesitas lógica condicional durante la creación
- **Aprendizaje**: Más fácil de entender para principiantes
- **Performance crítica**: En algunos motores JS muy antiguos

**❌ Menos conveniente cuando:**

- El código se vuelve verboso (6–8 líneas vs 1).
- Existe mayor riesgo de errores "off-by-one" al manejar índices manualmente — un fallo clásico al confundir índices basados en 0 con la longitud del array.

## Tabla Comparativa por Escenario

| Escenario | Recomendado | Razón |
|-----------|-------------|-------|
| Producción legacy | Bucles | ✅ Máxima compatibilidad |
| Debugging complejo | Bucles | ✅ Fácil inspeccionar cada paso |
| Performance crítica | Bucles | ✅ Menos overhead funcional |
| Código académico | `Array.from()` | ✅ Muestra conocimiento moderno |
| Matrices 3D+ | `Array.from()` | ✅ Anidamiento natural |

## Complejidad

**Todas las soluciones tienen la misma complejidad:**

- **Temporal**: O(rows × cols) - Debemos crear `rows × cols` elementos
- **Espacial**: O(rows × cols) - La matriz resultante ocupa ese espacio

No hay diferencia significativa de performance entre los enfoques para casos de uso típicos.

## Conclusión

 `Array.from()` es la opción más elegida porque:

1. **Expresa intención claramente**: "Crear X filas, cada una con Y ceros"
2. **Menos código**: Una línea vs 6-8 líneas
3. **Menos errores**: No hay variables de loop ni índices manuales
4. **Más mantenible**: Fácil cambiar valores o lógica

Sin embargo, conocer las alternativas da una perspectiva más amplia. Los bucles siguen siendo valiosos para debugging y compatibilidad, mientras que `Array.from()` brilla en código moderno y expresivo.

<!-- TODO: Personalizar el artículo con tu voz
- Agrega una introducción personal: ¿Por qué te gusta hacer estos desafíos diarios?
- Incluye anécdotas: ¿Cuándo aprendiste Array.from()? ¿Te sorprendió algo del problema?
- Conecta con otros temas: Menciona si has trabajado con matrices en proyectos reales
- Hazlo conversacional: "Al principio me confundió..." o "Una vez cometí este error..."
- Agrega llamadas a acción: Invita a los lectores a compartir sus soluciones
-->

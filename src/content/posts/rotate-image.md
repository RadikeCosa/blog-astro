---
title: "Rotar Imagen - LeetCode #48 Top Interview 11/150"
published: 2025-12-04T16:41:51.394Z
description: 'Resolvemos el problema "Rotate Image" de LeetCode (Top Interview 150). Explicamos el enfoque de transposición e inversión'
updated: ''
tags:
  - leetcode
  - top-interview-150
draft: false
pin: 0
toc: true
lang: "es"
abbrlink: "rotate-image"
---
## Introducción

Rotar una matriz cuadrada 90° en sentido horario es un clásico de entrevistas y algoritmos. La clave está en hacerlo **in-place**, es decir, sin usar memoria adicional. En este post, desglosamos el patrón de solución, visualizamos el proceso y analizamos su eficiencia.

## Enunciado

> Dada una matriz cuadrada `n x n`, rota la matriz 90 grados en sentido horario **in-place** (sin crear otra matriz).

**Ejemplo:**

Antes:
```
1 2 3
4 5 6
7 8 9
```

Después:

```

7 4 1
8 5 2
9 6 3
```

## Estrategia: Transponer y Revertir

1. **Transponer la matriz**: Intercambia filas por columnas.
2. **Invertir cada fila**: Reversa cada fila para completar la rotación.

### ¿Por qué funciona?

- La transposición convierte filas en columnas.
- Invertir cada fila reubica los elementos en la posición correcta para la rotación de 90°.

## Implementación Paso a Paso

```javascript
function rotate(matrix) {
  const n = matrix.length
  // Transponer
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]]
    }
  }
  // Invertir filas
  for (let i = 0; i < n; i++) {
    matrix[i].reverse()
  }
}
```

## Análisis de Complejidad

- **Tiempo:** $O(n^2)$ (dos recorridos completos)
- **Espacio:** $O(1)$ (in-place, sin memoria extra)

## Reflexiones y Aprendizajes

- El patrón transponer + invertir es útil para rotaciones y manipulación de matrices.
- Manipular in-place es clave para optimizar espacio.
- Visualizar el movimiento ayuda a entender el algoritmo.

## Recursos

- [Matrices (Wikipedia)](https://en.wikipedia.org/wiki/Matrix_(mathematics))
- [Transposición de Matrices](https://en.wikipedia.org/wiki/Transpose)

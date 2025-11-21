---
title: "Rotar un Array - LeetCode #189 - Serie Top-Interview 6/150"
published: 2025-11-21T21:45:52.387Z
description: "Resolvemos el problema de LeetCode 'Shift Array' con tres enfoques distintos, incluyendo uno optimizado a O(n) tiempo y O(1) espacio extra."
updated: ""
tags:
  - leetcode
  - top-interview
draft: false
pin: 0
toc: true
lang: "es"
abbrlink: "shift-array-leetcode"
---

## Rotar un Array - LeetCode #189

En este artículo abordamos el problema **"Rotate Array"** de LeetCode, un desafío clásico que pone a prueba tu habilidad para manipular arrays de manera eficiente. Este problema es común en entrevistas técnicas, ya que evalúa tu capacidad para optimizar tanto el tiempo como el espacio de una solución. Exploraremos tres enfoques diferentes, incluyendo uno optimizado que utiliza solo **O(1)** espacio extra.

---

## Enunciado del Problema

Dado un array de enteros `nums`, rota el array hacia la derecha por `k` pasos, donde `k` es un número no negativo.

### Ejemplo 1

```plaintext
Input: nums = [1,2,3,4,5,6,7], k = 3
Output: [5,6,7,1,2,3,4]
```

### Ejemplo 2

```plaintext
Input: nums = [-1,-100,3,99], k = 2
Output: [3,99,-1,-100]
```

### Normalizar K

Antes de implementar cualquier solución, es importante normalizar el valor de `k`. Si `k` es mayor que la longitud del array, rotar el array `k` veces es equivalente a rotarlo `k % length` veces. Esto asegura que no realicemos operaciones innecesarias.

---

## Solución 1: Usando `splice` y `slice`

En este enfoque, usamos los métodos `slice` y `splice` para dividir y reasignar el array in-place.

### Código (Solución 1)

```typescript
function rotate(nums: number[], k: number): void {
  const n = nums.length
  k = k % n

  if (k === 0)
    return

  nums.splice(0, n, ...nums.slice(-k), ...nums.slice(0, -k))
}
```

### Ejemplo Visual (Solución 1)

Supongamos que tenemos el array `nums = [1, 2, 3, 4, 5, 6, 7]` y queremos rotarlo 3 posiciones a la derecha (`k = 3`).

1. Usamos `splice` para extraer los últimos `k` elementos: `[5, 6, 7]`.
2. Luego, concatenamos estos elementos al inicio del array original: `[5, 6, 7, 1, 2, 3, 4]`.

Este enfoque modifica el array original directamente.

### Complejidad (Solución 1)

- **Tiempo**: `O(n)` debido a las operaciones `slice` y `splice`.
- **Espacio**: `O(k)` por las sublistas creadas con `slice`.

---

## Solución 2: Usando un Array Auxiliar

En este enfoque, creamos un array auxiliar para calcular las posiciones finales de los elementos. Luego, copiamos los valores de vuelta al array original.

### Código (Solución 2)

```typescript
function rotate(nums: number[], k: number): void {
  const n = nums.length
  k = k % n

  const result = Array.from({ length: n })

  for (let i = 0; i < n; i++) {
    const newPos = (i + k) % n
    result[newPos] = nums[i]
  }

  for (let i = 0; i < n; i++) {
    nums[i] = result[i]
  }
}
```

### Ejemplo Paso a Paso (Solución 2)

| Iteración | Índice Original | Valor | Nueva Posición | Resultado Parcial |
|-----------|-----------------|-------|----------------|--------------------|
| 1         | 0               | 1     | 3              | `[ , , , 1, , , ]` |
| 2         | 1               | 2     | 4              | `[ , , , 1, 2, , ]` |
| 3         | 2               | 3     | 5              | `[ , , , 1, 2, 3, ]` |
| 4         | 3               | 4     | 6              | `[ , , , 1, 2, 3, 4]` |
| 5         | 4               | 5     | 0              | `[5, , , 1, 2, 3, 4]` |
| 6         | 5               | 6     | 1              | `[5, 6, , 1, 2, 3, 4]` |
| 7         | 6               | 7     | 2              | `[5, 6, 7, 1, 2, 3, 4]` |

Este enfoque es intuitivo, pero utiliza espacio adicional proporcional al tamaño del array.

### Complejidad (Solución 2)

- **Tiempo**: `O(n)` por los dos bucles.
- **Espacio**: `O(n)` por el array auxiliar.

---

## Solución 3: Técnica de los Tres Reverses

Este enfoque optimizado utiliza la técnica de invertir partes del array para lograr la rotación in-place con **O(1)** espacio extra.

### Concepto (Solución 3)

1. Invierte todo el array.
2. Invierte los primeros `k` elementos.
3. Invierte los elementos restantes.

### Ejemplo Paso a Paso (Solución 3)

Supongamos que tenemos el array `nums = [1, 2, 3, 4, 5, 6, 7]` y queremos rotarlo 3 posiciones a la derecha (`k = 3`).

1. **Invertir Todo el Array**:

   ```plaintext
   [7, 6, 5, 4, 3, 2, 1]
   ```

2. **Invertir los Primeros k Elementos**:

   ```plaintext
   [5, 6, 7, 4, 3, 2, 1]
   ```

3. **Invertir el Resto del Array**:

   ```plaintext
   [5, 6, 7, 1, 2, 3, 4]
   ```

### Código (Solución 3)

```typescript
function rotate(nums: number[], k: number): void {
  const n = nums.length
  k = k % n

  const reverse = (start: number, end: number) => {
    while (start < end) {
      [nums[start], nums[end]] = [nums[end], nums[start]]
      start++
      end--
    }
  }

  reverse(0, n - 1) // Invertir todo el array
  reverse(0, k - 1) // Invertir los primeros k elementos
  reverse(k, n - 1) // Invertir el resto
}
```

### Complejidad (Solución 3)

- **Tiempo**: `O(n)` por las tres pasadas lineales.
- **Espacio**: `O(1)` ya que no se utiliza memoria adicional.

---

## Reflexiones y Aprendizajes

- **Manipulación in-place**: Aprendimos a modificar arrays sin usar espacio extra.
- **Uso del operador módulo**: Es fundamental para manejar índices circulares en problemas de rotación.
- **Elegancia de los 3 reverses**: Este enfoque demuestra cómo una solución matemática puede ser la más eficiente.

---

## Recursos y Referencias

- [MDN: Array.reverse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)
- [GeeksforGeeks: Reverse Algorithm](https://www.geeksforgeeks.org/dsa/program-for-array-rotation-continued-reversal-algorithm/)
- [MDN: Array.splice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)
-[Desplazando Array](/posts/shift-array-leetcode/)

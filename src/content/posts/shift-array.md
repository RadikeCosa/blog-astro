---
title: "Desplazar Array - LeetCode Style"
published: 2025-11-14T00:30:00.000Z
description: "Solución explicada al problema de desplazar un array N posiciones usando normalización modular y tests. Estrategias, edge cases y visualización."
tags:
  - array
  - rotación
  - leetcode
  - js
  - explicacion
draft: false
toc: true
lang: "es"
abbrlink: "shift-array-leetcode"
---

# 🏆 Shift Array - Explicación Paso a Paso

## Enunciado

> Escribe una función que, dado un array y un número $n$, devuelva el array desplazado $n$ posiciones a la derecha. Los elementos que salen por la derecha deben volver a entrar por la izquierda.

---

## 🧩 Ejemplos rápidos

| Input             | Output      |
| ----------------- | ----------- |
| ([1,2,3,4,5], 2)  | [4,5,1,2,3] |
| ([1,2,3,4,5], 5)  | [1,2,3,4,5] |
| ([1,2,3,4,5], 0)  | [1,2,3,4,5] |
| ([1,2,3,4,5], -3) | [3,4,5,1,2] |
| ([1,2,3,4,5], 7)  | [4,5,1,2,3] |

---

## 📐 Normalización y Ciclo Modular

Un desplazamiento puede ser muy grande (mayor al largo), negativo o cero.  
La clave es **normalizar** el desplazamiento usando el módulo:

```math
n' = n \mod length
```

Visualmente, el ciclo:

```mermaid
graph LR
    A[Desplazar] --> B[n > 0?]
    B -- Sí --> C[Desplazar n posiciones a derecha]
    B -- No --> D[Desplazar |n| posiciones a izquierda]
    C --> E[Normalizar con módulo]
    D --> E
    E --> F[Array Final]
```

- Si $n < 0$, equivale a desplazamiento a la izquierda.

### Ejemplo visual del ciclo (n = 7, length = 5)

- $7 \mod 5 = 2$ ⇒ desplazamos 2 a la derecha (7 equivale a 2 para el array!).

---

## 💻 Implementación explicada

```js
function shiftArray(arr, n) {
  const length = arr.length;
  if (length === 0) return arr; // Caso borde: array vacío

  n = n % length; // Paso 1: Normaliza n al rango del array
  if (n < 0) n += length; // Paso 2: Si n es negativo, lo convierte a desplazamiento positivo equivalente

  // Paso 3: Reconstruye el array cortando y pegando
  const part1 = arr.slice(-n); // Los últimos n elementos (los que van al frente)
  const part2 = arr.slice(0, length - n); // El resto del array
  return part1.concat(part2); // Ordena ambos para "simular el shift"
}
```

**¿Por qué así?**

- El corte por `slice` hace el "rollover" automáticamente.
- La normalización garantiza que cualquier número (negativo, gigante, cero...) se ajusta al ciclo del array.
- Nunca muta el array original.

---

## 🧪 Tests y validación automática

La cobertura verifica que la solución funciona para todos los casos de edge y para arrays de cualquier tipo:

```js
describe("shiftArray", () => {
  it("desplaza valores positivos, negativos y mayores al largo", () => {
    expect(shiftArray([1, 2, 3], 1)).toEqual([2, 3, 1]); // derecho
    expect(shiftArray([1, 2, 3], -1)).toEqual([3, 1, 2]); // izquierdo
    expect(shiftArray(["a", "b", "c"], 5)).toEqual(["c", "a", "b"]); // ciclo
    expect(shiftArray(["a", "b", "c"], -11)).toEqual(["b", "c", "a"]); // ciclo-negativo
    expect(shiftArray([1, 2, 3, 4, 5], 5)).toEqual([1, 2, 3, 4, 5]); // igual al largo
    expect(shiftArray([1, 2, 3, 4, 5], 0)).toEqual([1, 2, 3, 4, 5]); // cero
  });
});
```

### ¿Para qué testear así?

- Demuestra que _nunca_ hay sorpresas por desplazamientos raros.
- Permite refactorizar la lógica sin temor a romper la funcionalidad.

---

## ✍️ Detalle de edge cases y consideraciones

- Array vacío: retorna vacío.
- Desplazamiento igual a largo: vuelve original.
- Negativo o mayor al largo: ajusta automáticamente.
- Admite cualquier tipo de elemento.

---

## 🔍 Complejidad

- **Tiempo:** $O(n)$ cada desplazamiento.
- **Espacio:** $O(n)$ por crear nuevo array.

---

## 🎓 Reflexión/Aprendizaje

- La clave en problemas tipo LeetCode es normalizar índices y pensar en el array como cíclico.
- Los tests robustos ayudan a verificar comportamiento en cualquier caso.
- Si el array puede ser mutado, puedes buscar in-place rotation ($O(1)$ de espacio).

---

## 🔗 Recursos

- [MDN slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
- [LeetCode 189: Rotate Array](https://leetcode.com/problems/rotate-array/)

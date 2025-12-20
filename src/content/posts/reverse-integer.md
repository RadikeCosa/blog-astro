---
title: "Invertir un Entero - LeetCode #7 Daily Challenge"
published: 2025-12-20T11:37:36.852Z
description: 'Resolvemos "Reverse Integer" de LeetCode: invertir los dígitos de un entero de 32 bits, controlando overflow y casos edge. Incluye explicación, código y análisis.'
updated: ''
tags:
  - leetcode
  - daily-challenge
  - algoritmos
draft: false
pin: 0
toc: true
lang: "es"
abbrlink: "reverse-integer"
---

## Invertir un Entero - Análisis y Explicación

### Enunciado

Dado un entero de 32 bits con signo `x`, devuelve `x` con sus dígitos invertidos. Si la reversión causa que el valor se salga del rango $[-2^{31},\ 2^{31}-1]$, devuelve 0.

## Análisis Inicial

### ¿Qué pide el problema?

Invertir los dígitos de un número entero, conservando el signo y asegurando que el resultado esté dentro del rango de 32 bits. Si se sale del rango, devolver 0.

#### Ejemplos

- x = 123 → 321
- x = -123 → -321
- x = 120 → 21
- x = 0 → 0
- x = 1534236469 (overflow) → 0
- x = -2147483648 (mínimo valor) → 0

**Restricción:**

$-2^{31} \leq x \leq 2^{31} - 1$

## Solución y Explicación

### Enfoque matemático (sin strings)

1. Extraer el último dígito de `x` usando módulo 10.
2. Construir el número invertido multiplicando el resultado parcial por 10 y sumando el dígito.
3. Repetir hasta que `x` sea 0.
4. Antes de cada suma, verificar si el resultado se sale del rango permitido. Si es así, devolver 0.

**Ventajas:**

- Control directo del rango
- Sin conversiones a string
- Elimina ceros a la izquierda automáticamente

#### Pseudocódigo

```text
resultado = 0
signo = x < 0 ? -1 : 1
x = abs(x)
mientras x != 0:
  digito = x % 10
  x = x // 10
  si resultado > (2^31 - 1) // 10:
    devolver 0
  resultado = resultado * 10 + digito
devolver resultado * signo
```

### Implementación en TypeScript

```typescript
export default function reverse(x: number): number {
  // Definir límites de 32 bits
  const INT_MAX = 2 ** 31 - 1
  const INT_MIN = -(2 ** 31)
  // Variable para el resultado
  let resultado = 0
  // Determinar el signo
  const signo = x < 0 ? -1 : 1
  // Trabajar con el valor absoluto
  x = Math.abs(x)
  // Invertir dígitos
  while (x !== 0) {
    // Extraer el último dígito
    const digito = x % 10
    // Eliminar el último dígito de x
    x = Math.trunc(x / 10)
    // Verificar overflow antes de actualizar resultado
    if (
      resultado > Math.trunc(INT_MAX / 10)
      || (resultado === Math.trunc(INT_MAX / 10) && digito > INT_MAX % 10)
    ) {
      return 0
    }
    // Construir el número invertido
    resultado = resultado * 10 + digito
  }
  // Aplicar el signo
  resultado *= signo
  // Verificar rango final
  if (resultado < INT_MIN || resultado > INT_MAX) {
    return 0
  }
  return resultado
}
```

## Análisis de Complejidad

- **Tiempo:** $O(k)$, donde $k$ es la cantidad de dígitos de $x$. Para 32 bits, $k \leq 10$ (prácticamente constante).
- **Espacio:** $O(1)$, solo variables auxiliares.

## Casos Edge y Consideraciones

- Números negativos: el signo se conserva.
- Ceros a la izquierda: se eliminan automáticamente (ej: 120 → 21).
- Overflow: si el resultado se sale del rango, retorna 0.
- 0: retorna 0.
- Mínimo y máximo de 32 bits: controlados en cada paso.

## Reflexiones y Aprendizajes

- Manipulación matemática de dígitos y control de overflow.
- Evitar strings da mayor eficiencia y control.
- El ciclo while y los operadores aritméticos permiten una solución clara y robusta.
- Si el dominio fuera mayor, habría que adaptar el control de overflow.

## Recursos y Referencias

- [LeetCode - Reverse Integer](https://leetcode.com/problems/reverse-integer/)
- [Overflow y límites de enteros en JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER)

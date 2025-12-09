---
title: "Desorder de Operaciones - FreeCodeCamp Daily Challenge"
published: 2025-12-09T18:29:42.501Z
description: 'Resolvemos "Unorder Of Operations" del Daily Coding Challenge de freeCodeCamp del mes de Agosto. Analizamos el problema, desarrollamos una solución en JavaScript y discutimos su complejidad.'
updated: ''
tags:
  - freecodecamp
  - daily-challenge
draft: false
pin: 0
toc: true
lang: "es"
abbrlink: "unorder-of-operations"
---

## Unorder Of Operations - Análisis y Explicación

## Enunciado

Dado un arreglo de números enteros y otro de operadores (como cadenas), aplica las operaciones de izquierda a derecha, ignorando la precedencia matemática habitual. Los operadores se repiten en orden si hay más números que operadores. Devuelve el resultado final.

Ejemplo:

- Números: $[1,\, 2,\, 3,\, 4,\, 5]$
- Operadores: $['+',\, '*']$

Se evalúa así, sin precedencia:

$$
1 + 2 * 3 + 4 * 5
$$

Cada operación se realiza en orden, sin importar el tipo de operador.

Operadores válidos: $+$, $-$, $\times$, $\div$, $\%$ (módulo).

## Análisis Inicial

### ¿Qué pide el problema?

Recorrer el arreglo de números y aplicar los operadores en orden, ignorando la precedencia matemática. Los operadores se repiten si hay más números que operadores. El resultado se obtiene realizando cada operación en secuencia.

### Casos de Prueba Clave

Se consideran los siguientes escenarios:

- Operadores que se repiten y se aplican estrictamente de izquierda a derecha.
- Uso de todos los operadores válidos: suma ($+$), resta ($-$), multiplicación ($\times$), división ($\div$), módulo ($\%$).
- Diferentes longitudes de arreglos, verificando la repetición cíclica de operadores.
- Resultados negativos, divisiones y módulos.

Ejemplos:

- $\texttt{evaluate([5,\, 6,\, 7,\, 8,\, 9],\ ['+',\ '-'])}$ → $3$
- $\texttt{evaluate([17,\, 61,\, 40,\, 24,\, 38,\, 14],\ ['+',\ '%'])}$ → $38$
- $\texttt{evaluate([20,\, 2,\, 4,\, 24,\, 12,\, 3],\ ['*',\ '/'])}$ → $60$
- $\texttt{evaluate([11,\, 4,\, 10,\, 17,\, 2],\ ['*',\ '*',\ '%'])}$ → $30$
- $\texttt{evaluate([33,\, 11,\, 29,\, 13],\ ['/',\ '-'])}$ → $-2$

## Desarrollo de la Solución

### Enfoque

Se recorre el arreglo de números y se aplica el operador correspondiente en cada paso, ignorando la precedencia matemática. El operador se selecciona de forma cíclica. El resultado se acumula y se retorna al final.

### Implementación

1. Inicializar el resultado con el primer número.
2. Recorrer el resto de los números.
3. Seleccionar el operador usando el índice, repitiendo si es necesario.
4. Aplicar la operación entre el acumulador y el número actual.
5. Retornar el resultado.

Código:

```javascript
/**
 * Aplica operaciones aritméticas secuencialmente de izquierda a derecha sobre un arreglo de números,
 * ignorando la precedencia estándar. Los operadores se repiten en orden si es necesario.
 * @param {number[]} numbers - Números a evaluar.
 * @param {string[]} operators - Operadores ('+', '-', '*', '/', '%').
 * @returns {number} Resultado final.
 */
function evaluate(numbers, operators) {
  let result = numbers[0]
  for (let i = 1; i < numbers.length; i++) {
    const op = operators[(i - 1) % operators.length]
    const num = numbers[i]
    switch (op) {
      case '+': result += num; break
      case '-': result -= num; break
      case '*': result *= num; break
      case '/': result = Math.trunc(result / num); break
      case '%': result %= num; break
    }
  }
  return result
}

export default evaluate
```

**Explicación:**
El bucle recorre los números y aplica el operador correspondiente en cada paso, seleccionándolo de forma cíclica. El bloque `switch` aplica la operación indicada. Se usa `Math.trunc` para asegurar que la división sea entera. La función retorna el resultado acumulado.

---

## Análisis de Complejidad

**Temporal:** $\mathcal{O}(n)$, donde $n$ es la cantidad de números.

**Espacial:** $\mathcal{O}(1)$, solo se usa una variable acumuladora.

---

## Casos Edge y Consideraciones

- Si hay menos operadores que números, se repiten en orden.
- Se asume que los datos son válidos: no hay divisiones por cero ni operadores inválidos.
- La división se trunca hacia cero para coincidir con los ejemplos.

---

## Reflexiones y Aprendizajes

**Conceptos:**
Simulación, manejo de arreglos, uso de bucle `for` y `switch` para operaciones dinámicas.

**Optimizaciones:**
La solución es óptima para el problema. Si se requiere validación de entrada o manejo de errores, se pueden agregar comprobaciones extra.

---

## Recursos

- [Operadores aritméticos en JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Expressions_and_Operators)
- [Math.trunc en JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc)
- Problema original en [freeCodeCamp](https://www.freecodecamp.org/learn/daily-coding-challenge/2025-08-27/)

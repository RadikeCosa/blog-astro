---
title: "Invertir Paréntesis - FreeCodeCamp Daily Challenge"
published: 2025-11-28T14:35:48.670Z
description: 'Resolviendo el desafío diario de FreeCodeCamp "Reverse Parentheses" para invertir el contenido dentro de paréntesis en JavaScript.'
updated: ''
tags:
  - freeCodeCamp
  - daily-challenge
draft: false
pin: 0
toc: true
lang: "es"
abbrlink: "reverse-parenthesis"
---

## Desafío: Invertir Paréntesis (FreeCodeCamp Daily Challenge)

## Introducción

Hoy resolvemos un clásico de los desafíos de programación: invertir el contenido dentro de paréntesis en una cadena. Es un problema que aparece en entrevistas y plataformas como FreeCodeCamp y LeetCode, y es ideal para practicar el uso de **pilas** y el manejo de estructuras anidadas.

## Enunciado del Problema

> Dada una cadena con paréntesis bien balanceados y anidados, invierte el contenido dentro de cada par de paréntesis. Al final, elimina todos los paréntesis.

**Ejemplos:**

- `(abcd)` → `dcba`
- `(uoy)` → `you`
- `(f(b(dc)e)a)` → `abcdef`

## Análisis y Primeros Pasos

Antes de escribir código, pensemos cómo podríamos resolverlo:

1. **¿Qué significa "invertir" dentro de paréntesis?**
   - Cada vez que encontramos un paréntesis de cierre, debemos revertir lo que está dentro del último paréntesis abierto.
2. **¿Qué pasa si hay paréntesis dentro de otros?**
   - Primero se invierte lo más interno, luego lo externo.

Esto sugiere que necesitamos una estructura que nos permita "apilar" el trabajo pendiente y resolverlo en orden inverso: ¡una **pila**!

## Estrategia para Resolver el Problema

Cada vez que encontramos un `(`, guardamos lo que llevamos en la pila y empezamos una nueva "capa". Al encontrar `)`, revertimos lo que hay en esa capa y lo juntamos con lo anterior.

## Nuestra Solución: Usando una Pila

La forma más clara y eficiente de resolverlo es con una pila. Aquí tienes el código explicado paso a paso:

```javascript
function decode(str) {
  // La pila guarda cadenas en cada nivel de paréntesis
  const stack = []
  let current = ''

  for (let char of str) {
    if (char === '(') {
      stack.push(current)
      current = ''
    }
    else if (char === ')') {
      current = current.split('').reverse().join('')
      if (stack.length > 0) {
        const previous = stack.pop()
        current = previous + current
      }
    }
    else {
      current += char
    }
  }
  return current
}
```

### ¿Cómo funciona paso a paso?

Tomemos el ejemplo `(f(b(dc)e)a)`:

1. Empieza con `current = ""` y `stack = []`.
2. Lee `f` → `current = "f"`
3. Encuentra `(` → apila "f", `current = ""`, `stack = ["f"]`
4. Lee `b` → `current = "b"`
5. Encuentra `(` → apila "b", `current = ""`, `stack = ["f", "b"]`
6. Lee `d` y `c` → `current = "dc"`
7. Encuentra `)` → revierte "dc" → "cd", desapila "b" → `current = "bcd"`, `stack = ["f"]`
8. Lee `e` → `current = "bcde"`
9. Encuentra `)` → revierte "bcde" → "edcb", desapila "f" → `current = "fedcb"`, `stack = []`
10. Lee `a` → `current = "fedcba"`
11. Fin → devuelve "abcdef"

## Casos de Prueba y Edge Cases

- Cadena sin paréntesis: se devuelve igual.
- Paréntesis vacíos `()` → se ignoran.
- Varios niveles de anidamiento: la pila los maneja sin problema.

**Ejemplo avanzado:**

`((is?)(a(t d)h)e(n y( uo)r)aC)` → `Can you read this?`

## Análisis de Complejidad

- **Tiempo:** $O(n)$ (recorremos la cadena una vez, revertir es lineal)
- **Espacio:** $O(n)$ (la pila puede crecer hasta el tamaño de la cadena)

## Reflexiones y Aprendizajes

- La **pila** es la estructura ideal para problemas de paréntesis y anidamiento.
- Revertir strings en JavaScript: `str.split('').reverse().join('')`
- Pensar en capas y niveles ayuda a visualizar el proceso.

## Recursos y Problemas Relacionados

- [Explicación visual de pilas (YouTube)](https://www.youtube.com/watch?v=wjI1WNcIntg)

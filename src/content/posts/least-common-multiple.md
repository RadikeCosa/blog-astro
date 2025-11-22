---
title: "Mínimo Común Múltiplo (MCM) - FreeCodeCamp Daily Challenge"
published: 2025-11-22T02:03:56.082Z
description: "Resolvemos el problema Least Common Multiple (LCM) utilizando la relación entre MCD y MCM en JavaScript."
updated: ""
tags:
  - freecodecamp
  - daily-challenge
draft: false
pin: 0
toc: true
lang: "es"
abbrlink: "least-common-multiple"
---

## Mínimo Común Múltiplo (MCM)

En este artículo resolvemos el problema **"Least Common Multiple (LCM)"** aplicando la relación matemática entre el MCD (Máximo Común Divisor) y el MCM. Exploraremos la idea matemática, implementaremos una solución en JavaScript, analizaremos su complejidad y discutiremos casos especiales.

---

## 📝 Enunciado del Problema

Dado dos enteros positivos \(a\) y \(b\), devuelve su **mínimo común múltiplo (MCM)**, denotado como \(\operatorname{mcm}(a, b)\). El MCM de dos enteros es el número entero positivo más pequeño que es múltiplo de ambos números.

### Ejemplo

- \(a = 4, b = 6 \rightarrow \operatorname{mcm}(4, 6) = 12\)
- \(a = 7, b = 5 \rightarrow \operatorname{mcm}(7, 5) = 35\)

---

## 💡 Idea Matemática

La forma más eficiente de calcular el MCM es utilizando la relación entre el MCD y el MCM:

```math
\operatorname{mcm}(a, b) = \frac{|a \cdot b|}{\operatorname{mcd}(a, b)}
```

Donde \(\operatorname{mcd}(a, b)\) se calcula usando el **Algoritmo de Euclides**. Si no estás familiarizado con este algoritmo, consulta nuestro artículo sobre el [Máximo Común Divisor (MCD)](/posts/gcd/).

---

## 🛠️ Implementación en JavaScript

A continuación, presentamos una implementación eficiente del cálculo del MCM en JavaScript:

```javascript
function lcm(a, b) {
  // Función auxiliar para calcular el Máximo Común Divisor (MCD)
  function gcd(x, y) {
    while (y !== 0) {
      [x, y] = [y, x % y]
    }
    return Math.abs(x)
  }

  if (a === 0 || b === 0) {
    throw new Error('El MCM no está definido para 0')
  }

  return Math.abs(a * b) / gcd(a, b)
}
```

### Explicación del Código

1. **Cálculo del MCD**: Utilizamos el Algoritmo de Euclides para calcular el MCD de \(a\) y \(b\).
2. **Validación de Entrada**: Si alguno de los números es 0, lanzamos un error, ya que el MCM no está definido en este caso.
3. **Cálculo del MCM**: Aplicamos la fórmula \(\operatorname{mcm}(a, b) = \frac{|a \cdot b|}{\operatorname{mcd}(a, b)}\).

---

## 📊 Análisis de Complejidad

### Complejidad Temporal

El cálculo del MCD usando el Algoritmo de Euclides tiene una complejidad temporal de:

```math
O(\log(\min(a, b)))
```

Por lo tanto, la complejidad total para calcular el MCM también es:

```math
O(\log(\min(a, b)))
```

ya que el cálculo del producto y la división son operaciones constantes.

### Complejidad Espacial

La complejidad espacial es:

```math
O(1)
```

ya que solo utilizamos unas pocas variables auxiliares para el cálculo, independientemente del tamaño de los números de entrada.

---

## ⚠️ Casos Edge y Consideraciones

- **Entrada con ceros**: Si \(a = 0\) o \(b = 0\), el MCM no está definido. En la implementación, esto se maneja lanzando una excepción.
- **Números negativos**: Si los números son negativos, el MCM se calcula utilizando sus valores absolutos.
- **Uno de los números es 1**: Si \(a = 1\) o \(b = 1\), el MCM es simplemente el otro número.
- **Ambos números son iguales**: Si \(a = b\), el MCM es ese mismo número.

---

## Reflexiones y Aprendizajes

- **Relación entre MCD y MCM**: La fórmula:

```math
\operatorname{mcm}(a, b) = \frac{|a \cdot b|}{\operatorname{mcd}(a, b)}
```

es una herramienta poderosa para resolver problemas de múltiplos y divisores.

- **Eficiencia del Algoritmo de Euclides**: Este algoritmo es extremadamente eficiente para calcular el MCD, lo que lo convierte en la base ideal para calcular el MCM.

- **Validación de Entrada**: Es importante manejar casos especiales como ceros o números negativos para evitar errores en el cálculo.

---

## Recursos y Referencias

- [Wikipedia: Mínimo Común Múltiplo](https://es.wikipedia.org/wiki/M%C3%ADnimo_com%C3%BAn_m%C3%BAltiplo)
- [Wikipedia: Algoritmo de Euclides](https://es.wikipedia.org/wiki/Algoritmo_de_Euclides)
- [GCD en este Blog](/posts/gcd/)

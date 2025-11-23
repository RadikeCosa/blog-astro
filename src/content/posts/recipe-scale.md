---
title: "Escala de Receta - FreeCodeCamp Daily Challenge"
published: 2025-11-22T23:47:21.909Z
description: 'Resolvemos el problema "Recipe Scale" de FreeCodeCamp aplicando manipulación de cadenas y estructuras de datos en JavaScript.'
updated: ''
tags:
  - freecodecamp
  - daily-challenge
draft: false
pin: 0
toc: true
lang: "es"
abbrlink: "recipe-scale"
---

## Introducción

El desafío diario de hoy es el problema **"Recipe Scale"** de FreeCodeCamp. Lo resolvemos utilizando técnicas como la desestructuración de arrays, manipulación de cadenas y bucles en JavaScript. Exploraremos el enunciado del problema, desarrollaremos una solución paso a paso, analizaremos su complejidad y discutiremos casos especiales.

## Enunciado del Problema

Dado un array de ingredientes de una receta y un número para escalar la receta, devuelve un array con las cantidades ajustadas en consecuencia. Cada elemento del array será una cadena con el formato: "cantidad unidad ingrediente". Por ejemplo: "2 C Harina".

Escala la cantidad por el número dado, manteniendo el formato original. No incluyas ceros innecesarios ni conviertas las unidades. Devuelve los elementos escalados en el mismo orden en que se proporcionan.

### Ejemplo

- `scaleRecipe(["2 C Flour", "1.5 T Sugar"], 2)` debería devolver `["4 C Flour", "3 T Sugar"]`.
- `scaleRecipe(["4 T Flour", "1 C Milk", "2 T Oil"], 1.5)` debería devolver `["6 T Flour", "1.5 C Milk", "3 T Oil"]`.
- `scaleRecipe(["3 C Milk", "2 C Oats"], 0.5)` debería devolver `["1.5 C Milk", "1 C Oats"]`.
- `scaleRecipe(["2 C All-purpose Flour", "1 t Baking Soda", "1 t Salt", "1 C Butter", "0.5 C Sugar", "0.5 C Brown Sugar", "1 t Vanilla Extract", "2 C Chocolate Chips"], 2.5)` debería devolver `["5 C All-purpose Flour", "2.5 t Baking Soda", "2.5 t Salt", "2.5 C Butter", "1.25 C Sugar", "1.25 C Brown Sugar", "2.5 t Vanilla Extract", "5 C Chocolate Chips"].`

## Desarrollo de la Solución

### Enfoque

Para resolver este problema, utilizaremos el método `map` para iterar sobre cada ingrediente del array, dividir la cadena en sus componentes, escalar la cantidad y luego reconstruir la cadena con la nueva cantidad.

### Implementación

```javascript
function scaleRecipe(ingredients, scale) {
  return ingredients.map((item) => {
    const [quantity, unit, ...ingredientParts] = item.split(' ')
    const ingredient = ingredientParts.join(' ')
    const scaledQuantity = Number.parseFloat(quantity) * scale
    return `${scaledQuantity} ${unit} ${ingredient}`
  })
}
```

### Explicación del Código

1. **Desestructuración**: Dividimos cada cadena en `cantidad`, `unidad` y el resto de la descripción del ingrediente.
2. **Escalado**: Multiplicamos la cantidad por el factor de escala proporcionado.
3. **Reconstrucción**: Combinamos los valores escalados con las unidades y el nombre del ingrediente para mantener el formato original.

## Complejidad

### Complejidad Temporal

La complejidad temporal de esta solución es \(O(n)\), donde \(n\) es el número de ingredientes en la receta. Esto se debe a que usamos el método `map` para iterar una vez sobre el array, realizando operaciones constantes para cada elemento.

### Complejidad Espacial

La complejidad espacial es \(O(n)\), ya que estamos creando un nuevo array para almacenar los ingredientes escalados. Cada elemento del array original se transforma en un nuevo elemento en el array resultante.

## Reflexiones y Aprendizajes

### Conceptos Aplicados

- **Manipulación de cadenas**: Uso de `split`, `join` y template literals.
- **Estructuras de datos**: Uso de arrays para almacenar y modificar los ingredientes.
- **Funciones de orden superior**: Uso de `map` para transformar arrays de manera concisa.
- **Desestructuración de arrays**: Extracción de múltiples valores de un array en una sola declaración.
- **Manejo de números**: Conversión de cadenas a números y operaciones aritméticas para escalar cantidades.
- **Mantenimiento del formato**: Asegurar que la salida mantenga el formato original de los ingredientes.
- **Uso de métodos modernos de JavaScript**: Aplicación de ES6+ para escribir código más limpio y eficiente.

### Recursos Adicionales

- [Documentación de JavaScript sobre Arrays](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [Manipulación de Cadenas en JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String)
- [Funciones de Orden Superior en JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

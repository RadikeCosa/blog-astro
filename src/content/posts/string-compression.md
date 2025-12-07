---
title: "Compresion de Cadenas - FreeCodeCamp Daily-Challenge"
published: 2025-12-07T12:24:38.096Z
description: 'Resolvemos el problema diario "String Compression" de FreeCodeCamp, buscamos alternativas y analizamos su complejidad.'
updated: ''
tags:
  - freecodecamp
  - daily-challenge
draft: false
pin: 0
toc: true
lang: "es"
abbrlink: "string-compression"
---

## String Compression - Análisis y Explicación

## Enunciado del Problema

Dada una cadena de texto, devuelve una versión comprimida de la cadena donde las palabras duplicadas consecutivas se reemplazan por la palabra seguida del número de veces que se repite entre paréntesis.

Solo se comprimen los duplicados consecutivos.
Las palabras están separadas por un solo espacio.
Por ejemplo, dado "yes yes yes please", se debe devolver "yes(3) please".

## Análisis Inicial

### Comprensión del Problema

Para resolver este problema, primero debemos dividir la cadena en palabras, usando los espacios como separadores. Esto se puede hacer con el método `split(" ")`, aunque si queremos ignorar signos de puntuación podríamos usar una expresión regular.

Luego, recorremos el array de palabras y vamos comparando cada palabra con la anterior. Si son iguales, incrementamos un contador; si no, agregamos la palabra (y el contador si es mayor a 1) al resultado y reiniciamos el contador.

Existen varias formas de implementar esto:

- Usar un bucle clásico (`for` o `while`), que es muy legible y eficiente en cuanto a complejidad ($O(n)$).
- Usar el método `reduce`, que puede ser más funcional y compacto, pero a veces menos intuitivo para quienes no están familiarizados con este patrón.

Ambos enfoques son eficientes ($O(n)$), pero el bucle clásico suele ser más claro y fácil de mantener, especialmente para este tipo de problemas donde se requiere comparar elementos consecutivos.

### Casos de Prueba Identificados

#### Tabla de Casos de Prueba

| Entrada                                 | Salida                   |
|-----------------------------------------|--------------------------|
| yes yes yes please                      | yes(3) please            |
| I have have have apples                 | I have(3) apples         |
| one one three and to the the the the    | one(2) three and to the(4) |
| route route route ... tee tee tee ...   | route(6) tee(6)          |
| a b c d                                 | a b c d                  |
| hello                                   | hello                    |
| ""                                      | ""                       |
| a b a a                                 | a b a(2)                 |

## Desarrollo de la Solución

### Enfoque Elegido

Aunque el enunciado no menciona explícitamente qué hacer con los signos de puntuación, considero que lo más consistente es eliminarlos antes de procesar la cadena, para evitar que palabras como "hola" y "hola," se traten como diferentes. Para esto, utilizo una expresión regular que remueve los signos de puntuación.

Luego, convierto la cadena en un array de palabras usando `split(" ")`. Para comprimir las palabras consecutivas, se puede usar tanto un bucle clásico como el método `reduce`. Ambos enfoques son igual de eficientes ($O(n)$), pero opto por `reduce` porque permite escribir la lógica de acumulación de manera más compacta y funcional, manteniendo la legibilidad si se comenta adecuadamente.

### Implementación Paso a Paso

1. **Eliminar signos de puntuación:**
   Utilizamos una expresión regular para remover los signos de puntuación comunes de la cadena, asegurando que palabras como "hola" y "hola," sean tratadas igual.

2. **Dividir la cadena en palabras:**
   Usamos `split(" ")` para obtener un array de palabras, y `filter(Boolean)` para eliminar posibles elementos vacíos.

3. **Recorrer el array con reduce:**
   Aplicamos el método `reduce` para acumular el resultado comprimido.

   - Si la palabra actual es igual a la anterior, incrementamos el contador.
   - Si es diferente, agregamos la palabra anterior (y el contador si es mayor a 1) al resultado y reiniciamos el contador.

4. **Agregar la última palabra:**
   Al finalizar el reduce, nos aseguramos de agregar la última palabra procesada con su contador correspondiente.

5. **Unir el resultado:**
   Finalmente, unimos el array resultado con espacios para obtener la cadena comprimida.

**Ejemplo de código:**

```javascript
function compressString(sentence) {
  // 1. Eliminar signos de puntuación y dividir en palabras
  const words = sentence
    .replace(/[.,!?;:]/g, '')
    .split(' ')
    .filter(Boolean)

  if (words.length === 0)
    return ''

  // 2. Usar reduce para comprimir palabras consecutivas
  const compressed = words.reduce(
    (acc, word, idx, arr) => {
      if (word === acc.prev) {
        acc.count++
      }
      else {
        if (acc.prev !== null) {
          acc.result.push(
            acc.count > 1 ? `${acc.prev}(${acc.count})` : acc.prev
          )
        }
        acc.prev = word
        acc.count = 1
      }
      // Al llegar al final, agregar la última palabra
      if (idx === arr.length - 1) {
        acc.result.push(acc.count > 1 ? `${acc.prev}(${acc.count})` : acc.prev)
      }
      return acc
    },
    { result: [], prev: null, count: 0 }
  )

  // 3. Unir el resultado
  return compressed.result.join(' ')
}
```

## Análisis de Complejidad

### Complejidad Temporal

La complejidad temporal de la solución es $O(n)$, donde $n$ es la cantidad de palabras en la cadena.

- El proceso de eliminar signos de puntuación y dividir la cadena en palabras es lineal respecto al tamaño de la cadena.
- El recorrido con `reduce` también es lineal, ya que se procesa cada palabra una sola vez.

### Complejidad Espacial

La complejidad espacial es $O(n)$, ya que se crea un array de palabras y otro array para el resultado comprimido, ambos proporcionales al número de palabras en la cadena original.

## Casos Edge y Consideraciones

- **Cadena vacía:** Si la entrada es una cadena vacía, el resultado debe ser una cadena vacía.
- **Una sola palabra:** Si la cadena contiene solo una palabra, se debe devolver esa palabra sin modificaciones.
- **Sin palabras repetidas:** Si no hay palabras consecutivas repetidas, la cadena se devuelve igual.
- **Palabras repetidas no consecutivas:** Solo se comprimen las repeticiones consecutivas, no las que están separadas por otras palabras.
- **Signos de puntuación:** Se eliminan antes de procesar para evitar que afecten la comparación.
- **Espacios múltiples:** Se eliminan elementos vacíos tras el split para evitar errores por espacios extra.

### Edge Case

- ✔️ Cadena vacía → ""
- ✔️ Una sola palabra → "hello"
- ✔️ Sin palabras repetidas → "a b c d"
- ❌ Palabras repetidas no consecutivas → solo comprime consecutivas

## Reflexiones y Aprendizajes

### Conceptos Aplicados

- Manipulación de cadenas y arrays en JavaScript.
- Uso de expresiones regulares para limpiar cadenas.
- Uso del método `reduce` para acumulación y transformación de datos.

### Posibles Optimizaciones

Aunque la solución con `reduce` es eficiente y compacta, se puede optar por un enfoque más simple y legible utilizando un bucle clásico. Este método facilita la comprensión y el mantenimiento del código, especialmente para quienes no están familiarizados con la programación funcional.

**Ejemplo de código optimizado y legible:**

```javascript
function compressString(sentence) {
  // 1. Eliminar signos de puntuación y dividir en palabras
  //    - Reemplaza los signos de puntuación comunes por vacío
  //    - Divide la cadena en palabras usando el espacio
  //    - Elimina posibles elementos vacíos (espacios múltiples)
  const words = sentence
    .replace(/[.,!?;:]/g, '')
    .split(' ')
    .filter(Boolean)

  // 2. Si no hay palabras, retorna cadena vacía
  if (words.length === 0)
    return ''

  let result = [] // Array para almacenar el resultado comprimido
  let count = 1 // Contador de repeticiones consecutivas

  // 3. Recorre el array de palabras desde la segunda posición
  for (let i = 1; i <= words.length; i++) {
    // Si la palabra actual es igual a la anterior, incrementa el contador
    if (words[i] === words[i - 1]) {
      count++
    }
    // Si es diferente (o llegamos al final), agrega la anterior al resultado
    else {
      // Si hubo repeticiones, agrega "palabra(n)", si no, solo la palabra
      result.push(count > 1 ? `${words[i - 1]}(${count})` : words[i - 1])
      count = 1 // Reinicia el contador
    }
  }

  // 4. Une el array resultado en una cadena separada por espacios
  return result.join(' ')
}
```

## Recursos y Referencias

- [Documentación Array.prototype.reduce](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
- [Expresiones regulares en JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_Expressions)

---
title: "Parseador de Negritas en Markdown - FreeCodeCamp Daily Challenge"
published: 2025-12-10T13:14:33.022Z
description: Resolvemos "Markdown Bold Parser", el desafío diario de FreeCodeCamp, explicando el análisis, la solución y la implementación en detalle.'
updated: ''
tags:
  - freecodecamp
  - daily-challenge
draft: false
pin: 0
toc: true
lang: "es"
abbrlink: "markdown-bold-parser"
---
## Markdown Bold Parser

### Enunciado del Problema

Dado un string que puede incluir texto en negrita usando sintaxis Markdown, devuelve el string HTML equivalente.

El texto en negrita en Markdown es cualquier texto que comienza y termina con dos asteriscos (\*\*) o dos guiones bajos (\_\_). No puede haber espacios entre el texto y los asteriscos o guiones bajos, aunque sí puede haber espacios dentro del texto. Convierte todas las ocurrencias de negrita a etiquetas HTML `<b>` y devuelve el string resultante.

Por ejemplo, dado "**Esto es negrita**", se debe devolver `"<b>Esto es negrita</b>"`.

## Casos de Prueba Identificados

```text
- "**This is bold**" → "<b>This is bold</b>"
- "**This is also bold**" → "<b>This is also bold</b>"
- "**This is not bold **" → "**This is not bold **" (no válido porque hay un espacio antes de los asteriscos finales)
- "** This is also not bold**" → "** This is also not bold**" (no válido porque hay un espacio después de los guiones bajos iniciales)
- "The **quick** brown fox **jumps** over the **lazy** dog." → "The <b>quick</b> brown fox <b>jumps</b> over the <b>lazy</b> dog."
```

## Análisis Inicial

### Comprensión del Problema

La función debe identificar si el input contiene fragmentos de texto que cumplen con las condiciones de negrita en Markdown (es decir, texto delimitado por \*\* o \_\_, sin espacios entre el texto y los delimitadores). Si se cumplen estas condiciones, debe reemplazar esos fragmentos por la versión equivalente en HTML usando la etiqueta `<b>`. Para identificar estos patrones, se puede utilizar una expresión regular (regex) que detecte correctamente los delimitadores y el texto válido entre ellos.

## Desarrollo de la Solución

### Enfoque Elegido

Para resolver el problema, se opta por utilizar una expresión regular (regex) que identifique correctamente los fragmentos de texto en negrita según la sintaxis Markdown. La expresión regular debe buscar secuencias que comiencen y terminen con dos asteriscos (\*\*) o dos guiones bajos (\_\_), asegurándose de que no haya espacios entre los delimitadores y el texto. Una vez identificados estos fragmentos, se reemplazan por la etiqueta HTML `<b>`correspondiente, manteniendo el resto del string sin cambios. Este enfoque permite procesar múltiples ocurrencias en una misma cadena y evita falsos positivos donde los delimitadores no cumplen las reglas.

### Implementación Paso a Paso

1. Definir una expresión regular que detecte correctamente los fragmentos de texto en negrita, es decir, aquellos que están rodeados por \*\* o \_\_, sin espacios entre los delimitadores y el texto.
2. La expresión debe capturar el delimitador de apertura (\*\* o \_\_), el contenido (permitiendo espacios internos, pero no al inicio o final), y el delimitador de cierre correspondiente.
3. Utilizar el método `replace` de JavaScript con la expresión regular global para buscar todas las ocurrencias en el string.
4. En cada coincidencia, reemplazar el fragmento por `<b>contenido</b>`, manteniendo el texto original dentro de la etiqueta.
5. Devolver el string resultante, donde todas las ocurrencias válidas de negrita en Markdown han sido convertidas a HTML.
6. Asegurarse de que los casos no válidos (por ejemplo, delimitadores mal formados o con espacios indebidos) permanezcan sin cambios.

### Código Final

```javascript
function parseBold(markdown) {
  // Regular expression to match bold text in Markdown
  const boldRegex = /(\*\*|__)(\S(?:.*?\S)?)\1/g

  // Replace Markdown bold with HTML <b> tags
  markdown = markdown.replace(boldRegex, (_, delimiter, content) => {
    return `<b>${content}</b>`
  })

  return markdown
}
```

#### Explicación de la Expresión Regular y el Método replace

El núcleo de la solución es el uso conjunto de una expresión regular y el método `replace` de JavaScript para transformar el texto en negrita de Markdown a HTML.

Esto permite procesar múltiples ocurrencias y asegura que solo los patrones válidos sean convertidos.

La expresión regular `/(\*\*|__)(.*?)\1/g` funciona así:

- `(\*\*|__)` captura el delimitador de apertura, que puede ser dos asteriscos (`**`) o dos guiones bajos (`__`).
- `(.*?)` es un grupo de captura que toma cualquier secuencia de caracteres (incluyendo vacío) de manera no codiciosa, permitiendo así negrita vacía y múltiples ocurrencias en la misma cadena.
- `\1` asegura que el delimitador de cierre coincida exactamente con el de apertura (es decir, si abrió con `**`, debe cerrar con `**`; lo mismo para `__`).
- La bandera `g` permite buscar todas las ocurrencias en el string.

El método `replace` se utiliza con esta expresión regular y una función de reemplazo. Por cada coincidencia encontrada:

- La función recibe como parámetros el match completo, el delimitador y el contenido capturado.
- Retorna una nueva cadena donde el contenido capturado se envuelve en la etiqueta `<b>`, reemplazando así el fragmento original de Markdown por su equivalente en HTML.

De este modo, el proceso recorre todo el string y transforma cada fragmento válido de negrita Markdown en su versión HTML, dejando el resto del texto sin cambios y manejando correctamente casos como negrita vacía o múltiples ocurrencias en la misma línea.

## Análisis de Complejidad

### Complejidad Temporal

La complejidad temporal de la función es O(n), donde n es la longitud del string de entrada. Esto se debe a que el método `replace` con una expresión regular global recorre el string una sola vez para encontrar todas las coincidencias y realizar los reemplazos. El procesamiento de cada coincidencia (envolver el contenido en `<b>`) es una operación de tiempo constante.

### Complejidad Espacial

La complejidad espacial es O(n) también, ya que el método `replace` genera un nuevo string basado en el original, y en el peor de los casos, el tamaño del string resultante será proporcional al tamaño del string de entrada.

## Casos Edge y Consideraciones

- Delimitadores no coincidentes: por ejemplo, `**bold__` no se transforma, ya que los delimitadores de apertura y cierre deben coincidir.
- Espacios indebidos: si hay espacios entre el delimitador y el texto, como en `** bold**` o `__ bold __`, no se realiza la conversión.
- Múltiples ocurrencias: la función maneja correctamente varias negritas en una misma línea.
- Anidamiento: si hay delimitadores anidados, solo se procesa el delimitador externo válido.

## Reflexiones y Aprendizajes

### Conceptos Aplicados

- Uso de expresiones regulares para procesamiento de texto.
- Aplicación del método `replace` con función de reemplazo para transformar patrones complejos.
- Manejo de casos edge y validación de sintaxis Markdown.

## Recursos y Referencias

- [Documentación de String.prototype.replace() en MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/replace)
- [Expresiones regulares en JavaScript (MDN)](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_Expressions)

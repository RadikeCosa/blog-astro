---
title: "Conversor de encabezados Markdown - FreeCodeCamp Daily-Challenge"
published: 2025-11-19T20:23:45.843Z
description: 'Resolvemos el desafio "Markdown Heading Converter" de FreeCodeCamp, convirtiendo encabezados Markdown a HTML.'
updated: ''
tags:
  - freecodecamp
  - daily-challenge
draft: false
pin: 0
toc: true
lang: "es"
abbrlink: "markdown-heading-converter"
---

## Introducción

En este post resolvemos el Daily-Challenge de FreeCodeCamp "Markdown Heading Converter", que consiste en convertir un encabezado Markdown al formato HTML correspondiente. Es un ejercicio ideal para practicar expresiones regulares y manejo de errores en JavaScript.

## Enunciado del problema

Dado un string que representa un encabezado en formato Markdown, conviértelo al encabezado HTML correspondiente.
Un encabezado Markdown válido debe:

- Comenzar con cero o más espacios,
- Seguido de uno o más caracteres '#' (de 1 a 6) que indican el nivel del encabezado,
- Al menos un espacio después de los '#',
- Y finalmente, el texto del encabezado.

Si el string no cumple con el formato correcto, la función debe devolver `"Invalid format"`.

**Ejemplos:**

- `convert("# Mi encabezado nivel 1")` debe devolver `"<h1>Mi encabezado nivel 1</h1>"`
- `convert("Mi encabezado")` debe devolver `"Invalid format"`
- `convert("##### Encabezado nivel 5")` debe devolver `"<h5>Encabezado nivel 5</h5>"`
- `convert("#Mi encabezado")` debe devolver `"Invalid format"`
- `convert(" ### Encabezado nivel 3")` debe devolver `"<h3>Encabezado nivel 3</h3>"`
- `convert("####### Encabezado nivel 7")` debe devolver `"Invalid format"`
- `convert("## Mi #2 encabezado")` debe devolver `"<h2>Mi #2 encabezado</h2>"`

## Enfoque y análisis

### Observaciones iniciales

El desafío principal es validar correctamente el formato del encabezado Markdown y extraer el nivel y el texto. Las expresiones regulares son ideales para esta tarea, ya que permiten identificar patrones y capturar grupos de forma eficiente.

### Claves del problema

- La cantidad de caracteres '#' determina el nivel del encabezado (de 1 a 6).
- Debe haber al menos un espacio después de los '#'.
- El texto del encabezado debe estar presente y puede incluir cualquier carácter.

### Estrategia elegida

Utilizamos una expresión regular para validar y extraer las partes necesarias:

- `^(\s*)` captura los espacios iniciales.
- `(#{1,6})` captura entre 1 y 6 caracteres '#'.
- `\s+` asegura al menos un espacio después de los '#'.
- `(.+)$` captura el texto del encabezado.

Si el string coincide, extraemos el nivel y el texto, y construimos el string HTML. Si no, devolvemos `"Invalid format"`.

## Solución

```javascript
function convert(heading) {
  const regex = /^(\s*)(#{1,6})\s+(.+)$/
  const match = heading.match(regex)

  if (!match) {
    return 'Invalid format'
  }

  const level = match[2].length // El número de '#' determina el nivel
  const text = match[3] // Texto del encabezado

  return `<h${level}>${text}</h${level}>`
}
```

## Análisis de complejidad

- **Complejidad temporal:** $O(n)$, donde $n$ es la longitud del string de entrada. La operación principal es el match de la expresión regular.
- **Complejidad espacial:** $O(n)$, por almacenar el resultado del match y construir el string de salida.

## Casos límite y consideraciones

- Encabezados con más de 6 caracteres '#' son inválidos.
- Encabezados sin espacio después de los '#' son inválidos.
- Encabezados con solo espacios y sin texto son inválidos.
- Encabezados con caracteres especiales en el texto son válidos.

Todos estos casos se manejan con la expresión regular.

## Conceptos aplicados

- **Expresiones regulares:** Para validación y extracción.
- **Template literals:** Para construir el string HTML.
- **Manejo de errores:** Para devolver un mensaje claro si el formato es inválido.

## Posibles optimizaciones

Para este problema, la solución actual es eficiente y legible. Si se procesara una gran cantidad de encabezados, precompilar la expresión regular podría ofrecer una mejora menor, pero no es necesario en este contexto.

## Referencias

- [Documentación de Expresiones Regulares en JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_Expressions)
- [Documentación de Template Literals en JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Template_literals)

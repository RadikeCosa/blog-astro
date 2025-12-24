---
title: "Parseador de Imágenes en Markdown - FreeCodeCamp #136 Daily Challenge"
published: 2025-12-24T11:18:16.755Z
description: 'Resolvemos "Markdown Image Parser" de FreeCodeCamp: extraemos y convertimos imágenes en formato Markdown a HTML usando JavaScript y expresiones regulares. Incluye explicación, código y análisis.'
updated: ''
tags:
  - freecodecamp
  - daily-challenge
category: "december"
lang: "es"
abbrlink: "markdown-image-parser"
draft: false
pin: 0
toc: true
---

## 1. Enunciado

Dado un string que representa una imagen en formato Markdown, devuelve el string equivalente en HTML.

Formato Markdown: `![alt text](image_url)`

- `alt text`: descripción de la imagen (atributo `alt` en HTML)
- `image_url`: URL de la imagen (atributo `src` en HTML)

Debes retornar el string HTML con los atributos en el orden y formato exactos:

```md
![Cute cat](cat.png)
```

debe retornar:

```html
<img src="cat.png" alt="Cute cat">
```

> El orden, espaciado y comillas deben coincidir exactamente con el ejemplo.

## 2. Casos de Prueba

| Entrada | Salida esperada |
 |---|---|
| `![Cute cat](cat.png)` | `<img src="cat.png" alt="Cute cat">` |
| `![Rocket Ship](https://freecodecamp.org/cdn/rocket-ship.jpg)` | `<img src="https://freecodecamp.org/cdn/rocket-ship.jpg" alt="Rocket Ship">` |
| `![Cute cats!](https://freecodecamp.org/cats.jpeg)` | `<img src="https://freecodecamp.org/cats.jpeg" alt="Cute cats!">` |

Estos cubren texto simple, signos de exclamación y URLs absolutas/relativas.

## 3. Solución y Explicación

Usamos una expresión regular para extraer el texto alternativo y la URL, y luego formateamos el string HTML:

```js
function parseImage(markdown) {
  // Extrae alt text y URL usando regex
  const regex = /!\[(.*?)\]\((.*?)\)/
  const match = markdown.match(regex)
  if (match) {
    const altText = match[1]
    const imageUrl = match[2]
    return `<img src="${imageUrl}" alt="${altText}">`
  }
  // Si no hay coincidencia, retorna string vacío
  return ''
}
```

## 4. Análisis de Complejidad

- **Tiempo:** $O(n)$, donde $n$ es la longitud del string de entrada (evaluación de regex).
- **Espacio:** $O(1)$, solo se almacenan los grupos capturados y el string de salida.

## 5. Casos Edge y Consideraciones

- Si la entrada no sigue el formato exacto, retorna string vacío.
- No se manejan espacios extra, escapes ni múltiples imágenes (solo la primera coincidencia).

## 6. Reflexiones y Aprendizajes

- Las regex son ideales para patrones fijos y delimitados.
- Si se necesitara soportar múltiples imágenes, se puede usar `matchAll`.
- Para robustez extra, se podría validar la URL o sanitizar el alt text (no requerido aquí).

## 7. Recursos

- [MDN: Expresiones Regulares](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
- [MDN: String.prototype.match()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match)
- [HTML img element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img)

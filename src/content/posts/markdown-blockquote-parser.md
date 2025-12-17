---
title: 'Parseador de Blockquotes en Markdown - Freecodecamp #129 Daily Challenge'
published: 2025-12-17T12:37:12.847Z
description: 'Resolvemos "Markdown Blockquote Parser": cómo convertir un bloque de cita en Markdown a HTML. Analizamos, optimizamos y explicamos paso a paso.'
updated: ''
tags:
  - freecodecamp
  - daily-challenge
draft: false
pin: 0
toc: true
lang: 'es'
abbrlink: 'markdown-blockquote-parser'
---

## Markdown Blockquote Parser

### Enunciado

Dado un string que contiene un bloque de cita en formato Markdown, devuelve su equivalente en HTML.

**Reglas del blockquote en Markdown:**

- Puede comenzar con cero o más espacios
- Luego un símbolo mayor que (`>`)
- Uno o más espacios
- El texto de la cita

El resultado debe envolver el texto en `<blockquote>...</blockquote>`.

**Ejemplo:**

Entrada: `> this is a quote`
Salida: `<blockquote>this is a quote</blockquote>`

## Análisis y Casos de Prueba

¿Qué buscamos? Detectar y convertir líneas de blockquote Markdown a HTML, respetando los espacios y el formato.

**Casos de prueba clave:**

| Entrada                                 | Salida esperada                                 |
|------------------------------------------|-------------------------------------------------|
| "> Esto es una cita"                      | `<blockquote>Esto es una cita</blockquote>`      |
| "   > Cita con espacios iniciales"        | `<blockquote>Cita con espacios iniciales</blockquote>` |
| ">     Texto con espacios después del símbolo" | `<blockquote>Texto con espacios después del símbolo</blockquote>` |
| "Esto no es una cita"                     | `Esto no es una cita`                            |
| ">"                                       | `<blockquote></blockquote>`                      |
| "" o "    "                               | `""` o `"    "` (sin blockquote)                |

## Solución y Explicación

### Estrategia

Usamos una **expresión regular** para identificar líneas de blockquote, permitiendo espacios antes y después del símbolo `>`. Si hay match, extraemos el texto y lo envolvemos en `<blockquote>`. Si no, devolvemos la línea original.

### Código JavaScript

```js
// Devuelve el HTML de un blockquote Markdown (una sola línea)
function parseBlockquote(markdown) {
  const blockquoteRegex = /^\s*>+\s*(.*)$/
  const match = markdown.match(blockquoteRegex)
  if (match) {
    return `<blockquote>${match[1].trim()}</blockquote>`
  }
  return markdown
}
```

## Análisis de Complejidad

- **Tiempo:** $O(n)$, donde $n$ es la longitud de la línea (una pasada para buscar y otra para limpiar).
- **Espacio:** $O(n)$, proporcional al tamaño de la entrada y salida.

## Edge Cases y Mejoras

- **¿Y si hay varias líneas?**
  La función original solo procesa una línea. Para textos multilínea, podemos mejorarla así:

```js
// Procesa blockquotes en textos multilínea
function parseBlockquotesMultiline(markdown) {
  return markdown
    .split('\n')
    .map((line) => {
      const match = line.match(/^\s*>+\s*(.*)$/)
      if (match) {
        return `<blockquote>${match[1].trim()}</blockquote>`
      }
      return line
    })
    .join('\n')
}
```

Así, cada línea se analiza y solo las que cumplen el formato se transforman.

## Aprendizajes y Reflexión

- Las **expresiones regulares** son potentes para parsear formatos simples como Markdown.
- Pensar en casos edge y entradas reales (multilínea, espacios, líneas vacías) hace la solución más robusta.
- El patrón de "dividir, mapear, unir" es muy útil para procesar texto línea a línea.

## Recursos

- [Expresiones regulares en JavaScript (MDN)](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_Expressions)
- [String.prototype.match() (MDN)](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/match)
- [Blockquotes en Markdown (Markdown Guide)](https://www.markdownguide.org/basic-syntax/#blockquotes)

---
title: "Generador de Copos de Nieve - FreeCodeCamp #137 Daily Challenge"
published: 2025-12-25T13:06:17.663Z
description: 'Resolvemos el reto "Snowflake Generator" de FreeCodeCamp: manipulación de strings para reflejar patrones de texto. Incluye explicación, código, casos edge y análisis.'
updated: ''
tags:
  - freecodecamp
  - daily-challenge
draft: false
pin: 0
toc: true
lang: "es"
abbrlink: "snowflake-generator"
---

## Enunciado del Problema

> Dado un string multilínea (separado por `\n`), devuelve un nuevo string donde cada línea se concatena con su versión reflejada horizontalmente (invertida carácter por carácter, incluyendo espacios). No se deben modificar ni eliminar espacios ni saltos de línea.

**Ejemplo:**

Entrada: `"_ \n _\n* "` (visualizado como)

```text

*
 *
*
```

Salida esperada: `"* _\n ** \n_ *"` (visualizado como)

```text
*  *
 **
*  *
```

## Análisis Inicial

### ¿Qué pide el reto?

- Tomar un string con saltos de línea (`\n`) que representa un patrón.
- Para cada línea, crear su reflejo horizontal (invertir todos los caracteres, incluidos los espacios).
- Concatenar la línea original con su reflejo, sin modificar espacios ni saltos de línea.

### Casos de Prueba Clave

- Entrada: `"_ \n _\n* "` → Salida: `"* _\n ** \n_ *"`
- Entrada: `"X=~"` → Salida: `"X=~~=X"`
- Entrada: `" X \n v \nX--=\n ^ \n X "` → Salida: `" X X \n v v \nX--==--X\n ^ ^ \n X X "`
- Entrada: `"* _\n _ _ \n_ * _\n _ _ \n_ _"` → Salida: `"_ ** _\n _ * * _ \n_ * ** * _\n _ * * _ \n_ ** *"`
- Entrada: `"_ -\n _ -\n* -"` → Salida: `"* -- _\n _ -- _ \n_ -- *"`

Estos cubren patrones con distintos caracteres, espacios y longitudes de línea.

### Estrategia

1. **Dividir el string en líneas:** Usar `split('\n')`.
2. **Reflejar cada línea:** Invertir con `split('')`, `reverse()`, `join('')`.
3. **Concatenar original y reflejo:** Para cada línea, unir original + reflejo.
4. **Reconstruir el string final:** Unir con `join('\n')`.

Así se respeta el formato y los espacios.

## Implementación

```javascript
/**
 * FreeCodeCamp Problem: Snowflake Generator
 * @param {string} crystals - Patrón de copo de nieve en string multilínea
 * @returns {string} String con cada línea reflejada y concatenada
 */
function generateSnowflake(crystals) {
  const lines = crystals.split('\n')
  return lines
    .map(line => line + line.split('').reverse().join(''))
    .join('\n')
}
export default generateSnowflake
```

## Análisis de Complejidad

- **Temporal:** Si $n$ es el número de líneas y $m$ la longitud máxima de una línea, la complejidad es $O(n \cdot m)$.
- **Espacial:** También $O(n \cdot m)$, ya que duplicamos cada línea.

## Casos Edge y Consideraciones

- **Líneas vacías:** Se duplican correctamente.
- **Espacios:** Se preservan todos, incluso al inicio/final.
- **Sin saltos de línea:** Se refleja como una sola línea.
- **Caracteres especiales:** Se reflejan igual, no hay restricciones.

## Reflexiones y Aprendizajes

- Manipulación de strings y arrays en JavaScript.
- Métodos clave: `split`, `reverse`, `join`.
- Importancia de respetar formato y espacios en problemas de texto.

## Recursos

- [MDN: String.prototype.split](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/split)
- [MDN: Array.prototype.reverse](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)
- [MDN: Array.prototype.join](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/join)

---

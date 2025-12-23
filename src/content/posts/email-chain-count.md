---
title: "Contador de Cadenas de Email - FreeCodeCamp #135 Daily Challenge"
published: 2025-12-23T21:58:37.053Z
description: 'Resolvemos "Email Chain Count", un reto de FreeCodeCamp sobre conteo de prefijos en asuntos de email. Incluye análisis, código, visuales y reflexiones.'
updated: ''
tags:
   - freecodecamp
   - daily-challenge
draft: false
pin: 0
toc: true
lang: "es"
abbrlink: "email-chain-count"
---

## 📨 Enunciado del Problema

Dado un string que representa el asunto de un email, determina cuántas veces fue reenviado o respondido.
Contamos como reenviado o respondido si el string contiene alguno de estos prefijos (sin importar mayúsculas/minúsculas):

- `FWD:`
- `FW:`
- `RE:`

---

## 🔎 Análisis Inicial

El reto consiste en identificar y contar cuántas veces aparecen los prefijos típicos de reenvío o respuesta en el asunto de un correo.

### Casos de Prueba

| Asunto                                 | Salida | Explicación                                      |
|-----------------------------------------|--------|--------------------------------------------------|
| RE: Meeting Tomorrow                   | 1      | Respondido una vez                               |
| FWD: RE: Fw: Project Update            | 3      | Dos reenvíos, una respuesta                      |
| Project Update                         | 0      | No hay prefijos                                  |
| fWd: rE: fW: Important Notice          | 3      | Insensible a mayúsculas/minúsculas               |

---

## 🛠️ Desarrollo de la Solución

### Enfoque

Utilizaremos una expresión regular para buscar los prefijos, aprovechando la insensibilidad a mayúsculas/minúsculas y la búsqueda global.

### Código Comentado

```javascript
function emailChainCount(subject) {
  // Buscar los prefijos FWD:, FW: o RE: sin importar mayúsculas/minúsculas
  const regex = /(FWD:|FW:|RE:)/gi
  // Coincidencias encontradas
  const matches = subject.match(regex)
  // Retornar el número de coincidencias, o 0 si no hay ninguna
  return matches ? matches.length : 0
}
```

---

## 📊 Análisis de Complejidad

- **Tiempo:** $O(n)$, donde $n$ es la longitud del string.
- **Espacio:** $O(k)$, donde $k$ es la cantidad de coincidencias (en la práctica, pequeño).

---

## ⚠️ Casos Edge y Consideraciones

- Prefijos con espacios entre letras y dos puntos (ej: `FW :`) **no** cuentan.
- Prefijos anidados o repetidos (`RE: RE: RE:`) se cuentan todos.
- Prefijos en cualquier posición del asunto son válidos.
- Prefijos incompletos o con otros caracteres (`FW`, `RE-`) **no** cuentan.
- El conteo es insensible a mayúsculas/minúsculas.

---

## 💡 Reflexiones y Aprendizajes

- Expresiones regulares para búsqueda de patrones.
- Insensibilidad a mayúsculas/minúsculas con el flag `i`.
- Métodos nativos de JavaScript para manipulación de strings.

---

## 📚 Recursos

- [MDN Web Docs: String.prototype.match()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match)
- [MDN Web Docs: Expresiones Regulares](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_Expressions)

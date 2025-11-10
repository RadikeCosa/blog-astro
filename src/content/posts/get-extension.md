---
title: Get Extension - FreeCodeCamp Daily Challenge 10/11/2025
published: 2025-11-10T11:43:03.707Z
description: "Resolviendo el desafío diario de FreeCodeCamp: Obtener la extensión de un nombre de archivo."
updated: ""
tags:
  - algoritmos
  - daily
  - freecodecamp
draft: false
pin: 0
toc: true
lang: "es"
abbrlink: "get-extension"
---

## Extension Extractor - Desafío Diario de FreeCodeCamp

Este problema nos pide extraer la extensión de un nombre de archivo dado. Vamos a analizarlo paso a paso y crear una solución eficiente.

## 📋 Enunciado del Problema

**Extension Extractor**
Dado una cadena de texto que representa el nombre de un archivo, devuelve la extensión del archivo.

La extensión es la parte del nombre del archivo que viene después del último punto (`.`).
Si el nombre del archivo no contiene un punto o termina con un punto, devuelve `"none"`.
La extensión debe devolverse tal cual, preservando mayúsculas y minúsculas.

## 🧠 Análisis del Problema

### Comprensión del Problema

Necesitamos identificar la extensión de un archivo, que es todo lo que viene después del último punto. Pero hay casos especiales:

- Archivos sin extensión: `"README"` → `"none"`
- Archivos con extensión: `"document.txt"` → `"txt"`
- Archivos que empiezan con punto: `".gitignore"` → `"gitignore"`
- Archivos con múltiples puntos: `"archive.tar.gz"` → `"gz"`
- Archivos que terminan con punto: `"final.draft."` → `"none"`

### Estrategia de Resolución

El algoritmo es simple: encontrar la posición del último punto y extraer lo que viene después, con validaciones.

```mermaid
flowchart TD
    A[Recibir filename] --> B[Buscar último punto con lastIndexOf('.')]
    B --> C{¿Hay punto?}
    C -->|No| D[Retornar 'none']
    C -->|Sí| E{¿Punto al final?}
    E -->|Sí| D
    E -->|No| F[Extraer substring desde punto + 1]
    F --> G[Retornar extensión]
```

## 🛠️ Desarrollo de la Solución

### Implementación en JavaScript

```javascript
function getExtension(filename) {
  const lastDotIndex = filename.lastIndexOf(".");

  if (lastDotIndex === -1 || lastDotIndex === filename.length - 1) {
    return "none";
  }

  return filename.substring(lastDotIndex + 1);
}
```

### Explicación del Código

1. **Buscar el último punto**: Usamos `lastIndexOf('.')` para encontrar la posición del último punto.
2. **Validar casos inválidos**:
   - Si no hay punto (`lastDotIndex === -1`)
   - Si el punto es el último carácter (`lastDotIndex === filename.length - 1`)
3. **Extraer la extensión**: `substring(lastDotIndex + 1)` nos da todo desde después del punto.

## 📊 Casos de Prueba

Vamos a probar nuestra función con diferentes casos:

| Caso | Entrada            | Salida Esperada | Explicación                      |
| ---- | ------------------ | --------------- | -------------------------------- |
| 1    | `"document.txt"`   | `"txt"`         | Extensión estándar               |
| 2    | `"README"`         | `"none"`        | Sin extensión                    |
| 3    | `"image.PNG"`      | `"PNG"`         | Preserva mayúsculas              |
| 4    | `".gitignore"`     | `"gitignore"`   | Archivo que empieza con punto    |
| 5    | `"archive.tar.gz"` | `"gz"`          | Múltiples puntos, toma el último |
| 6    | `"final.draft."`   | `"none"`        | Termina con punto                |

```javascript
console.log(getExtension("document.txt")); // 'txt'
console.log(getExtension("README")); // 'none'
console.log(getExtension("image.PNG")); // 'PNG'
console.log(getExtension(".gitignore")); // 'gitignore'
console.log(getExtension("archive.tar.gz")); // 'gz'
console.log(getExtension("final.draft.")); // 'none'
```

## 📈 Análisis de Complejidad

- **Tiempo**: O(n) donde n es la longitud del string
- **Espacio**: O(1) adicional

## 🤔 Reflexiones Finales

Este problema nos enseña a manejar manipulación de strings de manera eficiente. Los métodos `lastIndexOf` y `substring` son herramientas poderosas en JavaScript.

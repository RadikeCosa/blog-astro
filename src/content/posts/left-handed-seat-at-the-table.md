---
title: "Asientos para Zurdos en la Mesa - FreeCodeCamp #146 Daily Challenge"
published: 2026-01-03T14:24:21.033Z
description: 'Resolvemos "Left Handed Seat at the Table", un Daily Challenge de FreeCodeCamp donde modelamos la orientación de los asientos y contamos cuántos lugares puede ocupar una persona zurda.'
updated: ''
tags:
  - freecodecamp
  - daily-challenge
draft: false
pin: 0
toc: true
lang: "es"
abbrlink: "left-handed-seat-at-the-table"
---

## Introducción

En este Daily Challenge de FreeCodeCamp ("Left Handed Seat at the Table") nos dan una mesa con asientos ocupados y libres. La tarea es contar cuántos asientos vacíos se pueden asignar a una persona zurda, respetando una regla simple con un detalle importante: la noción de "izquierda" cambia según desde qué lado de la mesa estés mirando.

## Enunciado del Problema

Dada una matriz de **2x4** (array de arrays) que representa la disposición de asientos en una mesa para una comida, determina **cuántos asientos vacíos pueden ser ocupados por una persona zurda**.

### Reglas

Una persona zurda **no puede sentarse** donde haya una persona diestra en el asiento **inmediatamente a su izquierda**.

### Representación de la Matriz

En la matriz dada:

- **`R`** (Right-handed): Asiento ocupado por una persona diestra
- **`L`** (Left-handed): Asiento ocupado por una persona zurda
- **`U`** (Unoccupied): Asiento vacío

### Restricciones Importantes

- Únicamente los asientos vacíos (`U`) están disponibles para ser ocupados
- Los asientos en la **fila superior** están orientados **hacia abajo**
- Los asientos en la **fila inferior** están orientados **hacia arriba** (como en una mesa real)
- Por lo tanto, **izquierda y derecha son relativas a la orientación del asiento**
- Los asientos de las **esquinas** solo tienen un vecino a un lado

### Ejemplo

Considera la siguiente matriz:

```js
[
  ['U', 'R', 'U', 'L'],
  ['U', 'R', 'R', 'R'],
]
```

**Análisis:**

- En la **fila superior** (fila 0), la izquierda de la persona corresponde a la **columna siguiente** (`col + 1`). Por eso, el asiento **(0,0)** no puede ocuparse: su vecino inmediato a la izquierda es **(0,1)** y es `R`.
- Los **otros dos asientos libres** (`U`) sí pueden ser ocupados porque no tienen un `R` inmediatamente a su izquierda (según la orientación de su fila).

**Resultado:** `2` asientos disponibles para una persona zurda

## Análisis Inicial

### Comprensión del Problema

El problema nos pide identificar los asientos vacíos (`U`) que no tengan vecinos diestros (`R`) a su izquierda, considerando la orientación de los asientos. Debido a que los asientos están enfrentados (como en una mesa real), la dirección "izquierda" cambia según la fila:

- **Fila superior (índice 0):** Los asientos miran hacia abajo (↓), por lo que su izquierda física apunta hacia **índices mayores** (→)
- **Fila inferior (índice 1):** Los asientos miran hacia arriba (↑), por lo que su izquierda física apunta hacia **índices menores** (←)

### Visualización de la Mesa

```
        Índices:   0    1    2    3
                  ┌────┬────┬────┬────┐
Fila 0 (↓):       │    │    │    │    │
                  └────┴────┴────┴────┘
                  ════════════════════════ MESA
                  ┌────┬────┬────┬────┐
Fila 1 (↑):       │    │    │    │    │
                  └────┴────┴────┴────┘
```

### Casos de Prueba Identificados

**Caso 1 - Básico:**

```js
[
  ['U', 'R', 'U', 'L'],
  ['U', 'R', 'R', 'R'],
]
// Resultado: 2
// - Fila 0[0]U: bloqueado por R en [1]
// - Fila 0[2]U: válido (izquierda es L)
// - Fila 1[0]U: válido (esquina)
```

**Caso 2 - Todos Vacíos:**

```js
[
  ['U', 'U', 'U', 'U'],
  ['U', 'U', 'U', 'U'],
]
// Resultado: 8 (todos los asientos disponibles)
```

**Caso 3 - Ninguno Disponible:**

```js
[
  ['U', 'R', 'U', 'R'],
  ['L', 'R', 'R', 'U'],
]
// Resultado: 0 (todos los vacíos están bloqueados por diestros)
```

**Caso 4 - Esquinas:**

```js
[
  ['L', 'U', 'R', 'R'],
  ['L', 'U', 'R', 'R'],
]
// Resultado: 1
// - Fila 0[1]U: bloqueado por R en [2]
// - Fila 1[1]U: válido (izquierda es L)
```

**Caso 5 - Mixto:**

```js
[
  ['U', 'R', 'U', 'U'],
  ['U', 'U', 'L', 'U'],
]
// Resultado: 5
```

## Desarrollo de la Solución

### Enfoque Elegido

Utilizamos un enfoque de **iteración directa** con lógica condicional basada en la fila para determinar la dirección de la "izquierda" relativa. La solución maneja casos especiales de esquinas verificando los límites del array antes de acceder a vecinos.

### Implementación Paso a Paso

1. **Inicializar contador:** Comenzamos con `count = 0` para llevar la cuenta de asientos válidos.

2. **Iterar por cada fila y columna:** Usamos dos bucles anidados para recorrer toda la matriz.

3. **Filtrar asientos vacíos:** Solo procesamos posiciones con valor `"U"`.

4. **Lógica por orientación:**

   **Fila superior (row === 0):**

   ```js
   // Su izquierda física = índice siguiente (seat + 1)
   if (seat === table[row].length - 1 || table[row][seat + 1] !== 'R') {
     count++
   }
   ```

   - Si es la **última columna** (esquina derecha): es válido
   - Si el asiento a la derecha en el array **no es `"R"`**: es válido

   **Fila inferior (row === 1):**

   ```js
   // Su izquierda física = índice anterior (seat - 1)
   if (seat === 0 || table[row][seat - 1] !== 'R') {
     count++
   }
   ```

   - Si es la **primera columna** (esquina izquierda): es válido
   - Si el asiento a la izquierda en el array **no es `"R"`**: es válido

5. **Retornar resultado:** Devolvemos el contador final.

### Código Completo

```javascript
function findLeftHandedSeats(table) {
  let count = 0

  for (let row = 0; row < table.length; row++) {
    for (let seat = 0; seat < table[row].length; seat++) {
      if (table[row][seat] === 'U') {
        if (row === 0) {
          // Fila superior (mirando hacia abajo): izquierda física = índice siguiente
          if (seat === table[row].length - 1 || table[row][seat + 1] !== 'R') {
            count++
          }
        }
        else {
          // Fila inferior (mirando hacia arriba): izquierda física = índice anterior
          if (seat === 0 || table[row][seat - 1] !== 'R') {
            count++
          }
        }
      }
    }
  }
  return count
}
```

## Análisis de Complejidad

### Complejidad Temporal: O(n × m)

Donde `n` es el número de filas y `m` es el número de columnas en la matriz.

- Recorremos cada elemento de la matriz exactamente una vez con los dos bucles anidados
- Las operaciones dentro de los bucles (comparaciones, accesos a array) son O(1)
- Para una matriz de 2×4 (como en este problema), realizamos 8 iteraciones en total
- **En general:** O(n × m) donde típicamente n=2 y m=4, resultando en O(8) = O(1) para este problema específico

### Complejidad Espacial: O(1)

- Solo utilizamos una variable `count` para almacenar el resultado
- No creamos estructuras de datos adicionales que escalen con el tamaño de la entrada
- Las variables de iteración (`row`, `seat`) ocupan espacio constante
- **Espacio constante** independientemente del tamaño de la matriz de entrada

## Reflexiones y Aprendizajes

### Conceptos Aplicados

1. **Simulación de orientación espacial:**  La clave del problema es entender que "izquierda" es relativa a la dirección en que mira cada persona
2. **Lógica condicional basada en contexto:**  La misma pregunta ("¿hay un diestro a la izquierda?") se responde de manera diferente según la fila
3. **Manejo de casos borde:** Las esquinas son casos especiales que necesitan tratamiento explícito

### Lecciones Clave

1. **Visualización es crucial:** Dibujar el problema ayuda a entender la orientación relativa
2. **Los casos borde importan:** Las esquinas requieren atención especial
3. **Simplicidad sobre complejidad:** La solución directa es suficiente para este problema
4. **Tests exhaustivos:** Los 5 casos de prueba cubren todos los escenarios importantes

### Posibles Optimizaciones

**Para este problema específico:**

- La solución actual es óptima en términos de complejidad temporal y espacial
- No hay optimizaciones significativas posibles sin complicar innecesariamente el código

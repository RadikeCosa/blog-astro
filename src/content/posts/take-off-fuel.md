---
title: "Combustible Para Despegue - FreeCodeCamp #141 Daily Challenge"
published: 2025-12-30T14:57:40.162Z
description: 'Analizamos y resolvemos "Take Off Fuel": un desafío de FreeCodeCamp sobre conversión de unidades y lógica de redondeo. Incluye explicación paso a paso, código en JavaScript y análisis de complejidad.'
updated: ''
tags:
  - freecodecamp
  - daily-challenge
draft: false
pin: 0
toc: true
lang: "es"
abbrlink: "take-off-fuel"
---

## Enunciado del Problema

Dado el número de galones de combustible que actualmente tiene tu avión, y el número requerido de litros de combustible para llegar a destino, determina cuántos galones adicionales necesitas agregar para completar el viaje.

- 1 galón = 3.78541 litros
- Si el avión ya tiene suficiente combustible, retorna 0.
- Solo puedes agregar combustible en galones enteros.
- No incluyas decimales en la respuesta.

## Análisis Inicial

### Comprensión del Problema

El objetivo es determinar la cantidad mínima de galones enteros de combustible que debemos añadir a un avión para completar un trayecto. El problema nos proporciona el combustible actual en **galones** y el combustible necesario en **litros**, lo que implica una conversión inicial utilizando la tasa de $1 \text{ galón} = 3.78541 \text{ litros}$.

Debemos considerar tres condiciones clave:

1. **Suficiencia:** Si el combustible actual ya cubre los litros requeridos, el resultado debe ser `0`.
2. **Unidades de carga:** Solo se pueden agregar galones completos (números enteros).
3. **Redondeo:** Si falta combustible, cualquier fracción de galón necesaria obliga a cargar el galón completo siguiente (redondeo hacia arriba o _ceiling_), asegurando que nunca falte combustible por decimales.

### Casos de Prueba Identificados

1. **Sin combustible inicial:** `fuelToAdd(0, 1)` retorna `1`. Aunque se requiere una cantidad mínima de litros, al no tener combustible y solo poder cargar galones enteros, el mínimo a añadir es 1.
2. **Combustible insuficiente (con decimales):** `fuelToAdd(5, 40)` retorna `6`. 40 litros equivalen a $\approx 10.56$ galones. Como ya tenemos 5, faltan $\approx 5.56$, lo que obliga a cargar 6 galones enteros para cubrir el excedente.
3. **Combustible suficiente:** `fuelToAdd(10, 30)` retorna `0`. 30 litros equivalen a $\approx 7.92$ galones. Al tener 10 galones, el avión ya supera el requerimiento, por lo que no se añade nada.
4. **Grandes volúmenes:** `fuelToAdd(896, 20500)` retorna `4520` y `fuelToAdd(1000, 50000)` retorna `12209`. Estos casos validan que la lógica de conversión y redondeo sea precisa incluso con cantidades elevadas de combustible.

## Desarrollo de la Solución

### Enfoque Elegido

Para resolver este problema, utilizaremos un enfoque puramente matemático y secuencial. La estrategia se basa en la **unificación de magnitudes** y el **redondeo hacia el techo** (_ceiling_).

```mermaid
flowchart TD
  Start(["Inicio"]) --> Input["Entrada: currentGallons, requiredLiters"]
  Input --> Convert["Convertir requiredLiters a galones<br/>(litros / 3.78541)"]
  Convert --> Diff["Calcular diferencia:<br/>needed = requiredGallons - currentGallons"]
  Diff --> Check{¿needed > 0?}
  Check -- No --> Zero["Retornar 0"]
  Check -- Sí --> Ceil["Retornar Math.ceil(needed)"]
  Zero --> End(["Fin"])
  Ceil --> End
```

La lógica sigue estos pasos:

1. **Normalización:** Convertir el requerimiento de litros a galones para poder compararlo directamente con el combustible actual.
2. **Cálculo de la brecha:** Determinar la diferencia entre lo necesario y lo que ya se tiene.
3. **Ajuste a restricciones:** Si falta combustible, redondear el resultado al entero superior para cumplir con la regla de "solo galones enteros".

### Implementación Paso a Paso

1. **Definir la constante de conversión:** Establecer $1 \text{ galón} = 3.78541 \text{ litros}$.
2. **Calcular galones requeridos:** Dividir `requiredLiters` por la constante de conversión.
3. **Calcular el faltante:** Restar `currentGallons` al valor obtenido en el paso anterior.
4. **Retornar el resultado:**
   - Si el faltante es menor o igual a 0, retornar `0`.
   - Si es mayor a 0, retornar `Math.ceil(faltante)` para asegurar que cubrimos el requerimiento con unidades enteras.

### Código Completo

```javascript
function fuelToAdd(currentGallons, requiredLiters) {
  const LITERS_PER_GALLON = 3.78541
  const requiredGallons = requiredLiters / LITERS_PER_GALLON
  const needed = requiredGallons - currentGallons

  return needed <= 0 ? 0 : Math.ceil(needed)
}
```

## Análisis de Complejidad

### Complejidad Temporal

La complejidad temporal es **$O(1)$** (tiempo constante). La función realiza un número fijo de operaciones aritméticas (división, resta) y una comparación lógica, independientemente de la magnitud de los valores de entrada. El tiempo de ejecución no escala con el tamaño de los datos.

### Complejidad Espacial

La complejidad espacial es **$O(1)$** (espacio constante). Solo utilizamos una cantidad mínima de memoria para almacenar constantes y variables intermedias (`LITERS_PER_GALLON`, `requiredGallons`, `needed`), las cuales no dependen de ninguna estructura de datos dinámica.

## Casos Edge y Consideraciones

- **Combustible exacto:** Si el combustible actual es exactamente igual al requerido tras la conversión, la diferencia será `0` y la función retornará `0` correctamente.
- **Entradas en cero:** Si `requiredLiters` es `0`, el resultado será `0` (o negativo si ya hay combustible), manejando correctamente la ausencia de necesidad de carga.
- **Precisión de punto flotante:** Al trabajar con una constante de conversión de 5 decimales ($3.78541$), JavaScript maneja la precisión necesaria para que `Math.ceil` actúe correctamente sobre el remanente decimal más pequeño.

## Reflexiones y Aprendizajes

### Conceptos Aplicados

- **Conversión de Unidades:** Aplicación de factores de conversión para normalizar datos antes de operar.
- **Lógica de Redondeo:** Uso de `Math.ceil()` para satisfacer requisitos de negocio donde "cualquier fracción cuenta como una unidad entera adicional".
- **Programación Defensiva:** El uso del operador ternario o condicional para asegurar que nunca se retorne un número negativo de galones a añadir.

### Posibles Optimizaciones

Dado que la solución actual ya opera en tiempo y espacio constante ($O(1)$), no existen optimizaciones de rendimiento significativas. La legibilidad es el factor clave aquí, por lo que mantener la constante de conversión clara y los pasos intermedios bien definidos es la mejor práctica.

## Recursos y Referencias

- [MDN Web Docs: Math.ceil()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil)
- [FreeCodeCamp: Take Off Fuel](https://www.freecodecamp.org/learn/daily-coding-challenge/2025-12-29/)

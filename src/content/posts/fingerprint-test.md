---
title: "Test de huella digital - FreeCodeCamp Daily Challenge"
published: 2025-11-17T11:33:17.020Z
description: 'Resolvemos el daily challenge "fingerprint-test" de FreeCodeCamp.'
updated: ''
tags:
  - freecodecamp
  - daily-challenge
draft: false
pin: 0
toc: true
lang: "es"
abbrlink: "fingerprint-test"
---

## Introducción

En este artículo resolvemos el reto diario **"Fingerprint Test"** de FreeCodeCamp. El problema presenta un escenario práctico: dadas dos cadenas que representan huellas digitales (compuestas únicamente por letras minúsculas), determinar si "coinciden" según dos criterios:

1. **Longitud idéntica**: Ambas cadenas deben tener exactamente la misma longitud.
2. **Tolerancia de diferencias**: El número de caracteres distintos no debe exceder el 10% de la longitud total.

Presentaré una solución eficiente en JavaScript, explicaré el razonamiento paso a paso, analizaré la complejidad algorítmica y exploraré casos de prueba y consideraciones de implementación.

## Enunciado del Problema

Dadas dos cadenas `fingerprint1` y `fingerprint2`, determinar si son coincidentes según las siguientes reglas:

**Regla 1 - Longitud idéntica:**
$$
\text{length}(\text{fingerprint1}) = \text{length}(\text{fingerprint2})
$$

**Regla 2 - Tolerancia de diferencias:**
$$
\frac{d}{n} \leq 0.10
$$

Donde $d$ es el número de posiciones con caracteres distintos y $n$ es la longitud de las cadenas.

## Ejemplos

### Ejemplo 1: Coincidencia válida

```bash
fingerprint1 = "helloworld"
fingerprint2 = "jelloworld"
```

- Longitud: $n = 10$
- Diferencias: $d = 1$ (posición 0: 'h' vs 'j')
- Proporción: $\frac{1}{10} = 0.1 \leq 0.10$ ✓ → Coincide

### Ejemplo 2: No coincide

```bash
fingerprint1 = "abc"
fingerprint2 = "xyz"
```

- Longitud: $n = 3$
- Diferencias: $d = 3$ (todas las posiciones)
- Proporción: $\frac{3}{3} = 1.0 > 0.10$ ✗ → No coincide

## Solución propuesta

```javascript
/**
 * FreeCodeCamp Problem: Is Match
 *
 * @param {string} fingerprint1 - The first fingerprint string
 * @param {string} fingerprint2 - The second fingerprint string
 * @returns {boolean} True if the fingerprints match according to the rules, otherwise false
 */
function isMatch(fingerprint1, fingerprint2) {
  const len1 = fingerprint1.length
  const len2 = fingerprint2.length

  // Si las longitudes difieren, no coinciden
  if (len1 !== len2) {
    return false
  }

  let differences = 0

  for (let i = 0; i < len1; i++) {
    if (fingerprint1[i] !== fingerprint2[i]) {
      differences++
    }
  }

  // comparación con el umbral del 10%
  return differences <= len1 * 0.1
}

export default isMatch
```

## Análisis y estrategia

La solución sigue un enfoque directo de comparación línea por línea con tres pasos fundamentales:

### 1. Validación de longitud

Si $|\text{fingerprint1}| \neq |\text{fingerprint2}|$, devolvemos `false` inmediatamente.

### 2. Conteo de diferencias

Recorremos ambas cadenas y contamos las posiciones con caracteres distintos:

$$
d = \sum_{i=0}^{n-1} \mathbb{1}[\text{fingerprint1}[i] \neq \text{fingerprint2}[i]]
$$

Donde $\mathbb{1}[\cdot]$ es la función indicadora.

### 3. Evaluación del umbral

Comparamos $d$ con el 10% de la longitud:

$$
\text{match} \iff d \leq 0.1 \cdot n
$$

### Variante entera (para evitar punto flotante)

Si prefieres evitar operaciones en punto flotante, usa la condición equivalente:

$$
10 \cdot d \leq n
$$

o en código:

```javascript
return differences * 10 <= len1;
```

Esto elimina cualquier posible problema de redondeo.

## Diagrama de flujo

```mermaid
flowchart TD
    Start([Inicio]) --> Input[/fingerprint1, fingerprint2/]
    Input --> CheckLen{¿len1 = len2?}
    CheckLen -- No --> ReturnFalse1[Retornar false]
    CheckLen -- Sí --> Init[d = 0<br/>i = 0]
    Init --> Loop{i < n?}
    Loop -- Sí --> Compare{fingerprint1[i] ≠ fingerprint2[i]?}
    Compare -- Sí --> Inc[d = d + 1]
    Compare -- No --> Next[i = i + 1]
    Inc --> Next
    Next --> Loop
    Loop -- No --> CheckThreshold{d ≤ 0.1 × n?}
    CheckThreshold -- Sí --> ReturnTrue[Retornar true]
    CheckThreshold -- No --> ReturnFalse2[Retornar false]
    ReturnTrue --> End([Fin])
    ReturnFalse1 --> End
    ReturnFalse2 --> End

    style Start fill:#e1f5e1
    style End fill:#ffe1e1
    style ReturnTrue fill:#90EE90
    style ReturnFalse1 fill:#FFB6C1
    style ReturnFalse2 fill:#FFB6C1
```

## Consideraciones de implementación

- Precisión: la comparación actual usa punto flotante (`differences <= len1 * 0.1`), que está bien en la práctica; si quieres evitarlo, usa la variante entera (`differences * 10 <= len1`) o calcula `Math.floor`/`Math.ceil` según las reglas de negocio.
- Cadenas vacías: si ambas cadenas están vacías ($n = 0$), se considera que coinciden ($d = 0$ ⇒ `true`).
- El enunciado garantiza entrada en minúsculas (a–z). Si no fuera así, habría que normalizar.

## Complejidad

- Temporal: O(n), con n = longitud de las cadenas (recorrido simple).
- Espacial: O(1), uso constante de memoria adicional.

## Casos de prueba (Vitest)

Los tests que ya tienes cubren los casos relevantes. Ejemplos:

```javascript
expect(isMatch('helloworld', 'helloworld')).toBe(true)
expect(isMatch('helloworld', 'helloworlds')).toBe(false)
expect(isMatch('helloworld', 'jelloworld')).toBe(true)
expect(isMatch('thequickbrownfoxjumpsoverthelazydog', 'thequickbrownfoxjumpsoverthelazydog')).toBe(true)
```

### Ejecución de tests

```bash
# Instalar dependencias
npm install

# Ejecutar tests
npm test
```

## Optimizaciones y variantes

- Umbral entero con redondeo: usar `Math.floor(n * 0.1)` o `Math.ceil(n * 0.1)` según la política del dominio.
- Salida diagnóstica: devolver un objeto `{ match, differences, threshold, diffPositions }` útil para debugging.
- Si las huellas permiten inserciones/borrados, considerar distancia de Levenshtein (más costosa).

## Casos límite

- ("", "") → true
- ("a", "b") → false
- Para n pequeños, ten en cuenta que 10% puede ser < 1; decide si quieres floor/ceil.

---

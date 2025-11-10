---
title: "side-project-nutritional-tracker-4"
published: 2025-11-10T17:18:33.385Z
description: ''
updated: ''
tags:
  - algoritmos
draft: false
pin: 0
toc: true
lang: "es"
abbrlink: "side-project-nutritional-tracker-4"
---

## Introducción

En esta cuarta entrega me centro en la implementación de la capa de persistencia usando `localStorage`. Partiendo de las decisiones y esquemas definidos en la entrega anterior, aquí detallo la API de almacenamiento, las decisiones de diseño, el manejo de errores y cómo lo cubrí con tests automatizados.

El objetivo práctico de esta entrega es tener una capa robusta y tolerante que permita: guardar registros nutricionales, leerlos de forma segura cuando haya entradas corruptas, obtener filtros por usuario, listar alimentos registrados y soportar operaciones de mantenimiento para tests (borrado/limpieza).

## Objetivos de esta entrega

- Implementar `src/lib/storage/localStorage.ts` con las funciones públicas necesarias.
- Adoptar una estrategia de lectura tolerante (`best-effort parse`) que ignore entradas corruptas pero registre advertencias en consola.
- Validar estrictamente antes de persistir (usar Zod solo en el flujo de guardado).
- Exponer mensajes de error legibles por la UI mediante un tipo `Result<T>`.
- Añadir y describir la batería de tests que garantizan comportamiento y rutas de error (QuotaExceededError, SecurityError, datos mixtos, etc.).

## Contrato mínimo (inputs/outputs)

- Input principal: objetos tipo `NewRegisterInput` (todos los campos del registro excepto `id` y `createdAt`).
- Output de operaciones críticas: `Result<T>` con `success: true` o `success: false` y mensajes/amplio detalle guardado en consola.

Ejemplo de tipos (resumen):

```ts
type NewRegisterInput = Omit<Register, 'id' | 'createdAt'>

type Result<T>
  = | { success: true, data: T, message?: string }
    | { success: false, error: { code: string, message: string } }
```

## Diseño de la API de almacenamiento

Funciones públicas implementadas (resumen):

- `getAllRegisters(): Register[]`
- `saveRegister(input: NewRegisterInput): Result<Register>` — genera `id` y `createdAt`, valida con Zod, persiste.
- `getRegistersByUserId(userId: string): Register[]`
- `deleteRegister(registerId: string): Result<null>`
- `clearAllRegisters(): Result<null>` — útil para tests y debug.
- `getRegisteredFoods(): string[]` — devuelve lista única y ordenada de nombres de `food`.

Además, utilidades internas:

- `generateId()` — `crypto.randomUUID()` con fallback.
- `safeSetItem` / `safeGetItem` — envolver `localStorage` y transformar DOMException en códigos legibles (`STORAGE_ERROR`, `SECURITY_ERROR`).
- `parseRegisters(raw: string | null, schema?: ZodSchema): Register[]` — parsing tolerante por ítem (ver sección siguiente).

A continuación hay un diagrama que resume el flujo principal al guardar un registro (validación → persistencia):

```mermaid
flowchart TD
  UI[UI / Form] -->|submit| SR[saveRegister(input)]
  SR --> V[Validate with Zod]
  V -->|valid| GID[generateId() & createdAt]
  V -->|invalid| VERR[Return VALIDATION_ERROR]
  GID --> SS[safeSetItem(storageKey, newArray)]
  SS -->|ok| SOK[Return success with Register]
  SS -->|DOMException| SERR[Return STORAGE_ERROR or SECURITY_ERROR]
  SOK --> UI
  SERR --> UI
  VERR --> UI
```

## parseRegisters: comportamiento y razonamiento

La función `parseRegisters` está diseñada para ser rápida y tolerante ante corrupción parcial de datos. Sus reglas principales:

- Si `raw` es `null` → retorna `[]`.
- Si `raw` no es JSON válido → retorna `[]` y hace `console.warn` con detalle.
- Si el JSON parseado no es un array → retorna `[]` y advierte.
- Si es un array, procesa cada elemento individualmente con `schema.safeParse(item)` y devuelve sólo los ítems válidos.
- Para cada ítem inválido hace `console.warn` indicando índice y motivo; no provoca una excepción global.

Racional: mantener lecturas rápidas en la UI, recuperar datos válidos aunque existan entradas corruptas y dejar pistas en consola para depuración.

Diagrama del flujo de `parseRegisters` (comprobaciones y filtrado por ítem):

```mermaid
flowchart TD
  Raw[raw string from localStorage] -->|null| Empty[Return []]
  Raw -->|parse fail| NotJson[console.warn → Return []]
  Raw -->|parsed| Parsed
  Parsed -->|not array| NotArray[console.warn → Return []]
  Parsed -->|array| ForEach[for each item]
  ForEach --> SP[schema.safeParse(item)]
  SP -->|ok| Collect[collect into result array]
  SP -->|fail| Warn[console.warn(index, reason)]
  Collect --> Return[Return validated items array]
  Warn --> ForEach
```

## Estrategia de validación

- No validar exhaustivamente en `getAllRegisters` por rendimiento y tolerancia (solo `safeParse` por ítem).
- Validación estricta con Zod en `saveRegister` justo antes de persistir. Si falla, retornamos `Result` con `VALIDATION_ERROR` y un mensaje apto para UI; los detalles completos del error se registran en consola.

Mensajes de error esperados (ejemplos):

- `VALIDATION_ERROR` — input inválido según Zod (mensaje amigable para mostrar en UI).
- `STORAGE_ERROR` — fallo al escribir en `localStorage` (ej. `QuotaExceededError`).
- `NOT_FOUND` — al intentar eliminar un registro inexistente.
- `SECURITY_ERROR` — `localStorage` no disponible (p. ej. `SecurityError`).

En todos los casos, la consola mantiene logs técnicos para depuración y `Result.error.message` queda apto para mostrarse al usuario.

## Tests y cobertura (resumen de la suite implementada)

La suite de tests está pensada para Vitest y cubre rutas felices y caminos de error mencionados en la planificación:

- saveRegister:
  - Persiste correctamente un registro válido y devuelve `success: true` con `id` y `createdAt` generados.
  - Simula fallo de `localStorage.setItem` (DOMException con `name = 'QuotaExceededError'`) → devuelve `STORAGE_ERROR`.

- getAllRegisters / parseRegisters:
  - `raw = null` → `[]`.
  - `raw = 'no es json'` → `[]` y `console.warn` llamado.
  - `raw = JSON.stringify({})` (no-array) → `[]` y advertencia.
  - `raw` con mezcla de items válidos e inválidos → retorna sólo válidos y `console.warn` para los inválidos (se usan spies para verificar avisos).

- getRegistersByUserId: filtra correctamente por `userId`.

- getRegisteredFoods: devuelve nombres únicos y ordenados.

- deleteRegister:
  - Elimina registro existente y persiste estado.
  - Si `setItem` falla durante la operación → devuelve `STORAGE_ERROR`.

- clearAllRegisters: limpia la clave de almacenamiento y devuelve `success: true`.

Además, se simulan excepciones tipo `SecurityError` para verificar que la función `safe*` capture y retorne `SECURITY_ERROR`.

Notas de testeo:

- Se reutiliza el mock de `localStorage` definido en `tests/setup.ts`.
- Se usan `beforeEach` para limpiar `localStorage` y spies en `console.warn` cuando se prueban entradas mixtas.

## Ejemplos de uso (API resumida)

Guardar un registro (ejemplo ilustrativo):

```ts
const input: NewRegisterInput = {
  userId: '...-uuid',
  userName: 'Ana',
  food: 'Yogur natural',
  amount: 150,
  unit: 'gr',
  date: '2025-11-10',
  time: '09:00',
  mealType: 'breakfast',
}

const res = saveRegister(input)
if (res.success) {
  // res.data -> Register con id y createdAt
}
else {
  // res.error -> { code, message }
}
```

Lectura tolerante:

```ts
const all = getAllRegisters() // solo registros válidos
const foods = getRegisteredFoods() // lista única y ordenada
```

## Decisiones técnicas y notas importantes

- Mantener `console.warn` durante parsing: útil en desarrollo para detectar corrupción parcial sin romper la experiencia del usuario.
- Exportar `NewRegisterInput` y `Result<T>` para facilitar su uso en tests y en la capa de UI.
- Manejar errores de `localStorage` (Quota, Security) y devolver códigos claros para la UI.
- No implementar todavía estrategias automáticas de limpieza ante QuotaExceededError: se dejó como mejora futura (posible LRU local o compresión).

## Próximos pasos sugeridos

1. Integrar esta capa con el formulario de registro y mostrar errores de guardado legibles en la UI.
2. Añadir una página de administración que permita exportar/importar registros (CSV/JSON).
3. Evaluar optimizaciones: debounced saves, compresión o migración a IndexedDB si el tamaño crece.
4. Implementar migraciones si cambia la forma del `Register` (versión en la estructura guardada).

## Conclusión

Con esta entrega la aplicación cuenta con una capa de persistencia local sólida: lectura tolerante, validación estricta al persistir, mensajes de error pensados para la UI y una suite de tests que cubre rutas críticas y errores simulados. Esto permite avanzar con confianza a la integración con la interfaz y funcionalidades de análisis.

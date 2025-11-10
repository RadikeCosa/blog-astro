---
title: 'Side-Project: Nutritional Tracker: 3'
published: 2025-11-07T00:00:00.000Z
description: 'Tercera entrega del desarrollo del proyecto de registro nutricional. En esta parte, abordamos la definición de modelos de datos y las validaciones iniciales.'
updated: ''
tags:
  - side-project
  - nutritional-tracker
  - react
  - vite
  - desarrollo
  - validaciones
  - modelo-de-datos
draft: false
pin: 1
toc: true
lang: 'es'
abbrlink: 'nutritional-tracker-side-project-3'
---
## Introducción

## Repaso de la entrega anterior

En la segunda entrega del proyecto, nos enfocamos en preparar el entorno de desarrollo y configurar las herramientas de testing. Se instalaron las dependencias necesarias, se creó la configuración de Vitest y se implementó un mock para `localStorage`, asegurando que el entorno fuera robusto y confiable para futuras pruebas. Además, se documentaron los principales desafíos encontrados durante la configuración y cómo se resolvieron, dejando el proyecto listo para avanzar hacia la definición del modelo de datos y las primeras validaciones.

## Objetivos de esta parte

En esta etapa del desarrollo, el objetivo principal es definir y validar el modelo de datos central para los registros nutricionales. Esto implica:

- Establecer los tipos y enums necesarios en TypeScript para representar cada campo del registro.
- Implementar el esquema de validación usando Zod, asegurando que todos los campos obligatorios y opcionales cumplan con los requisitos de formato y rango.
- Escribir pruebas unitarias para verificar que el esquema acepta registros válidos y rechaza datos incorrectos o incompletos.
- Documentar las convenciones adoptadas (nombres en inglés, ubicación de archivos) y las decisiones técnicas tomadas durante el proceso.

Al finalizar esta fase, se debe contar con un modelo de datos robusto, validado y cubierto por tests, listo para integrarse con el formulario y la capa de persistencia en las siguientes etapas.

## Definición del modelo de datos

El modelo de datos central del proyecto está diseñado para registrar de manera flexible y precisa los consumos alimenticios de cada usuario. Desde la primera entrega, se decidió unificar alimentos y bebidas bajo una sola entidad (`Register`), utilizando nombres de campos en inglés para mantener la consistencia y facilitar futuras integraciones.

La estructura principal incluye los siguientes campos obligatorios:

- `id`: Identificador único (UUID) para cada registro.
- `userId`: ID del usuario que realiza el registro.
- `userName`: Nombre del usuario.
- `food`: Nombre del alimento consumido (texto libre).
- `amount`: Cantidad consumida (número positivo).
- `unit`: Unidad de medida (enum: gr, ml, unit, portion, small-portion, large-portion).
- `date`: Fecha de consumo (formato YYYY-MM-DD).
- `time`: Hora de consumo (formato HH:MM).
- `mealType`: Tipo de comida (enum: breakfast, lunch, snack, dinner, collation).
- `createdAt`: Timestamp ISO de creación del registro.

Además, se incluyen campos opcionales para mayor flexibilidad:

- `sweetener`: Tipo de endulzante (`null`, "sugar", "sweetener").
- `notes`: Notas adicionales (texto libre).

Esta estructura permite registrar consumos variados, analizar patrones alimenticios y adaptar el modelo a futuras necesidades, como categorización automática o reportes avanzados. El uso de enums y validaciones estrictas garantiza la calidad y coherencia de los datos desde el inicio del proyecto.

## Convenciones y decisiones técnicas

Para mantener la coherencia y facilitar futuras integraciones, se adoptaron las siguientes convenciones:

- **Nombres en inglés:** Todos los campos y entidades se definen en inglés, incluso en la versión en español del código y los tests.
- **Ubicación de esquemas:** Los esquemas de validación Zod se almacenan en `src/lib/schemas/`.
- **Ubicación de tests:** Los tests unitarios se ubican en la carpeta `tests/`, siguiendo la estructura del proyecto.
- **Inferencia de tipos:** Se utiliza `z.infer<typeof RegisterSchema>` para derivar el tipo TypeScript directamente del esquema Zod, evitando duplicaciones y asegurando sincronía entre validación y tipado.
- **Validaciones estrictas:** Se prioriza la cobertura total de validaciones antes de avanzar a la siguiente fase del desarrollo.

## Estructura y tipos en TypeScript

El modelo de datos se representa mediante tipos y enums en TypeScript para garantizar seguridad y claridad en el código. El tipo principal `Register` se infiere del esquema Zod, y los enums definen las opciones válidas para los campos con valores fijos.

```typescript
// filepath: src/types/register.ts
import { z } from 'zod'
import { RegisterSchema } from '../lib/schemas/registerSchema'

export type Register = z.infer<typeof RegisterSchema>

export enum Unit {
  GR = 'gr',
  ML = 'ml',
  UNIT = 'unit',
  PORTION = 'portion',
  SMALL_PORTION = 'small-portion',
  LARGE_PORTION = 'large-portion',
}

export enum MealType {
  BREAKFAST = 'breakfast',
  LUNCH = 'lunch',
  SNACK = 'snack',
  DINNER = 'dinner',
  COLLATION = 'collation',
}

export type Sweetener = null | 'sugar' | 'sweetener'
```

## Implementación del esquema de validación con Zod

El esquema de validación se implementa con Zod, definiendo reglas para cada campo:

- **UUIDs:** Validación de formato para `id` y `userId`.
- **Fechas y horas:** Expresiones regulares para asegurar formato ISO.
- **Cantidad:** Debe ser un número positivo.
- **Enums:** Validación estricta para `unit`, `mealType` y `sweetener`.
- **Campos opcionales:** `notes` y `sweetener` pueden estar ausentes o ser nulos.

```typescript
// filepath: src/lib/schemas/registerSchema.ts
import { z } from 'zod'

export const RegisterSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  userName: z.string().min(1),
  food: z.string().min(1),
  amount: z.number().positive(),
  unit: z.enum(['gr', 'ml', 'unit', 'portion', 'small-portion', 'large-portion']),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^\d{2}:\d{2}$/),
  mealType: z.enum(['breakfast', 'lunch', 'snack', 'dinner', 'collation']),
  createdAt: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/),
  sweetener: z.enum(['sugar', 'sweetener']).nullable().optional(),
  notes: z.string().optional(),
})
```

## Ejemplos de registros válidos y no válidos

A continuación se muestran ejemplos prácticos para ilustrar cómo funciona la validación:

**Registro válido:**

```typescript
const validRegister = {
  id: 'a1b2c3d4-e5f6-7890-abcd-1234567890ab',
  userId: 'b2c3d4e5-f6a7-8901-bcde-2345678901bc',
  userName: 'Juan',
  food: 'Manzana',
  amount: 1,
  unit: 'unit',
  date: '2025-11-07',
  time: '08:30',
  mealType: 'breakfast',
  createdAt: '2025-11-07T08:31:00Z',
  sweetener: null,
  notes: 'Sin endulzante',
}
```

**Registro no válido (cantidad negativa y formato de fecha incorrecto):**

```typescript
const invalidRegister = {
  id: 'a1b2c3d4-e5f6-7890-abcd-1234567890ab',
  userId: 'b2c3d4e5-f6a7-8901-bcde-2345678901bc',
  userName: 'Juan',
  food: 'Manzana',
  amount: -2, // Inválido
  unit: 'unit',
  date: '07-11-2025', // Inválido
  time: '08:30',
  mealType: 'breakfast',
  createdAt: '2025-11-07T08:31:00Z',
  sweetener: null,
  notes: 'Sin endulzante',
}
```

## Pruebas unitarias del modelo de datos

Se implementaron pruebas unitarias con Vitest para asegurar la robustez del esquema:

- El esquema acepta registros válidos y rechaza los inválidos.
- Se testean casos de campos obligatorios faltantes, valores fuera de rango y formatos incorrectos.
- Se verifica que los campos opcionales sean correctamente aceptados o ignorados.

```typescript
// filepath: tests/registerSchema.test.ts
import { describe, expect, it } from 'vitest'
import { RegisterSchema } from '../src/lib/schemas/registerSchema'

describe('RegisterSchema', () => {
  it('acepta un registro válido', () => {
    expect(() => RegisterSchema.parse(validRegister)).not.toThrow()
  })

  it('rechaza cantidad negativa', () => {
    expect(() => RegisterSchema.parse(invalidRegister)).toThrow()
  })

  it('rechaza fecha con formato incorrecto', () => {
    const badDate = { ...validRegister, date: '07-11-2025' }
    expect(() => RegisterSchema.parse(badDate)).toThrow()
  })

  it('acepta campos opcionales ausentes', () => {
    const noOptional = { ...validRegister }
    delete noOptional.sweetener
    delete noOptional.notes
    expect(() => RegisterSchema.parse(noOptional)).not.toThrow()
  })
})
```

## Reflexión sobre el proceso y próximos pasos

La definición y validación exhaustiva del modelo de datos es clave para la calidad y mantenibilidad del proyecto. Este enfoque permite detectar errores temprano, facilita la integración con el formulario y la persistencia, y sienta las bases para futuras extensiones como reportes y categorizaciones avanzadas.

**Próximos pasos:**

- Extender los tests para cubrir casos límite y errores específicos.
- Implementar la capa de persistencia en `localStorage`.
- Integrar el modelo con el formulario de registro y validar la experiencia de usuario.

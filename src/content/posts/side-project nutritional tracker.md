---
title: side-project nutritional tracker
published: 2025-11-05T16:53:16.913Z
description: 'Documentación del proceso de diseño y desarrollo de una aplicación React para registro y seguimiento nutricional, desde la configuración inicial hasta las decisiones de arquitectura del modelo de datos.'
updated: ''
tags:
  - Tag
draft: false
pin: 0
toc: true
lang: 'es'
abbrlink: 'nutritional-tracker-side-project'
---

## Introducción

En este post voy a registrar el paso a paso de un proyecto paralelo que me surgió para llevar un control nutricional y ayudar a tomar mejores decisiones en cuanto a la alimentación diaria. Decidí hacerlo a partir de un proyecto en blanco en React usando Vite como bundler, ya que quería probar algunas cosas nuevas y evitar usar un framework completo como Next.js o Remix. También quería que el desarrollo fuera rápido y sencillo, sin preocuparme por la configuración del servidor o el enrutamiento, y con facilidad para reutilizar partes en otros proyectos.

## Configuración Inicial

El primer paso fue iniciar el proyecto con el siguiente comando:

```bash
npm create vite@latest playground -- --template react
```

Una vez configurado el entorno, decidí que un buen primer paso sería definir el modelo de datos para trabajar sobre el formulario de carga. Para la primera etapa, opté por usar `localStorage` para el almacenamiento.

## Modelo de Datos Inicial

El modelo de datos inicial que diseñé es el siguiente:

```javascript
const registroConsumo = {
  id: 'uuid-generado', // ID único del registro
  userId: 'user123', // ID del usuario que registra
  userName: 'NombreUsuario', // Nombre del usuario

  // Qué se consumió
  alimento: 'Manzana roja', // Texto libre
  cantidad: 2, // Número
  unidad: 'unidad', // Opciones: "gr", "ml", "porcion", "unidad", "porcion-chica", "porcion-grande"

  // Cuándo se consumió
  fecha: '2025-11-05', // Formato ISO YYYY-MM-DD
  hora: '09:30', // Formato 24hs HH:MM
  tipoComida: 'desayuno', // Opciones: "desayuno", "almuerzo", "merienda", "cena", "colacion"

  // Características adicionales
  endulzante: null, // Opciones: "azucar", "edulcorante", null (sin endulzar)
  notas: '', // Campo opcional, texto libre

  // Metadata
  fechaCreacion: '2025-11-05T09:35:00Z' // Timestamp ISO de cuándo se creó el registro
}
```

## Documentación del Proceso de Diseño

### Necesidad Inicial

Crear una app para registrar consumos alimenticios con capacidad de análisis posterior mediante gráficos.

### Requisitos Identificados

#### Obligatorios

- Usuario (ID y nombre)
- Alimento consumido
- Cantidad y unidad
- Fecha y hora
- Tipo de comida

#### Opcionales

- Endulzante (azúcar/edulcorante/ninguno)
- Notas adicionales

### Decisiones de Diseño Clave

#### Unificación de Alimentos y Bebidas

**Decisión**: Un solo concepto de "registro de consumo" en lugar de separar alimentos y bebidas.

**Razonamiento**:

- Simplifica el modelo.
- La diferencia está en la unidad (gr vs ml).
- Evita duplicación de campos comunes.
- Facilita consultas y reportes futuros.

#### Alimento como Texto Libre

**Decisión**: Campo alimento sin estructura ni categorización inicial.

**Razonamiento**:

- Permite iterar rápido sin sobre-ingeniería.
- Los patrones reales de uso guiarán futuras categorizaciones.
- Más flexible para el usuario en el MVP.
- Se pueden agregar categorías en versiones futuras basándose en datos reales.

#### Tipo de Comida + Horario (ambos obligatorios)

**Decisión**: Mantener ambos campos como independientes y obligatorios.

**Razonamiento**:

- Permite análisis por tipo de comida ("¿en qué horarios desayuno?").
- No asume horarios fijos (desayuno a las 2 PM es válido).
- Agregamos "colación" para consumos que no encajan en comidas principales.
- Datos más ricos para gráficos de distribución temporal.

#### Sistema de Unidades Flexible

**Decisión**: Unidades: gr, ml, unidad, porción (con variantes de tamaño).

**Razonamiento**:

- Cubre casos reales: pesados, líquidos, contables, subjetivos.
- Las porciones son inherentemente subjetivas, se mantienen como concepto.
- Permite al usuario elegir la granularidad que prefiera.

#### Endulzante como Campo Ternario

**Decisión**: `null | "azucar" | "edulcorante"`

**Razonamiento**:

- `null` representa "no aplica" o "sin endulzar".
- Diferencia explícita entre azúcar y edulcorante.
- Permite análisis de consumo de azúcar en el tiempo.
- No obligatorio porque no todos los alimentos se endulzan.

## Campos de Metadata

### IDs

- `id`: Identificador único del registro (permite edición/eliminación futura).
- `userId`: Identificador del usuario (multi-usuario desde el inicio).

### Timestamps

- `fecha + hora`: Cuándo se consumió (dato del dominio).
- `fechaCreacion`: Cuándo se registró (metadata técnica, útil para auditoría).

## Consideraciones Futuras (No implementadas en MVP)

### Categorizaciones

- Una vez recolectados datos reales, se podrán identificar patrones.
- Posible migración a lista sugerida con autocompletado.
- Tags o categorías múltiples (frutas, verduras, proteínas, etc.).

### Validaciones

- Horarios válidos.
- Cantidades positivas.
- Combinaciones lógicas (`ml` solo para líquidos).

### Reportes Contemplados

- Distribución por tipo de comida.
- Heatmap de horarios de consumo.
- Tracking de azúcar/edulcorante.
- Frecuencia de alimentos.
- Variedad alimenticia en períodos.
- Análisis por usuario (si es multi-usuario).

## Tecnología

Para el MVP, se utiliza `localStorage`, lo que permite un desarrollo rápido sin backend y mantiene los datos en el navegador del usuario.

---

<!-- Comentarios para el autor:
1. ¿Quieres agregar ejemplos de gráficos o diagramas para ilustrar los reportes futuros?
2. Considera incluir una sección de "Próximos pasos" para detallar las siguientes etapas del desarrollo.
3. ¿Te gustaría agregar una tabla con ejemplos de registros de consumo para mayor claridad? -->

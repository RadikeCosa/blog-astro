---
title: 'Side-Project Nutritional Tracker: Segunda Parte'
published: 2025-11-06T00:00:00.000Z
description: 'Continuación del desarrollo del proyecto paralelo para el registro nutricional. En esta entrega, exploramos la implementación de almacenamiento persistente y validaciones.'
updated: ''
tags:
  - side-project
  - nutritional-tracker
  - react
  - vite
  - desarrollo
  - validaciones
  - almacenamiento

draft: false
pin: 0
toc: true
lang: 'es'
abbrlink: 'nutritional-tracker-side-project-2'
---

## Introducción

En esta segunda parte del proyecto, vamos a ensuciarnos las manos y empezar a construir las bases. Prepararemos el entorno de desarrollo, configuraremos las herramientas de testing y dejaremos todo listo para avanzar con confianza.

En el artículo anterior, definimos el objetivo del proyecto, las funcionalidades principales y la estructura general que seguiremos. Ahora, con un proyecto en React utilizando Vite y una estructura de datos definida, es momento de dar el siguiente paso: configurar el entorno de pruebas.

## ¿Por qué es importante el testing?

El testing no solo nos ayuda a detectar errores, sino que también nos da la tranquilidad de que nuestro código funciona como esperamos. Además, escribir pruebas desde el principio nos obliga a pensar cómo estructurar el código de forma más limpia y modular.

## Herramientas que usaremos

Para nuestro entorno de pruebas, elegimos las siguientes herramientas:

| Paquete                  | Propósito                                           |
|--------------------------|---------------------------------------------------|
| `vitest`                | Test runner rápido y moderno (alternativa a Jest). |
| `@vitejs/plugin-react`  | Permite a Vitest entender JSX/TSX.                 |
| `@testing-library/react`| Facilita el testing de componentes React.          |
| `@testing-library/jest-dom` | Agrega matchers adicionales como `toBeInTheDocument`. |
| `@testing-library/user-event` | Permite simular interacciones de usuario.         |
| `jsdom`                 | Simula el DOM del navegador en Node.js.            |

Estas herramientas nos permitirán escribir pruebas unitarias y de integración de manera eficiente.

## Instalación de dependencias

Abre tu terminal en la raíz del proyecto y ejecuta:

```bash
npm install -D vitest @vitejs/plugin-react
npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event
npm install -D jsdom
```

## Configuración de Vitest

Con las dependencias listas, configuraremos Vitest para integrarlo correctamente en el proyecto. Este paso es clave para que nuestras pruebas se ejecuten sin problemas.

### Crear el archivo de configuración

Crea un archivo llamado `vitest.config.ts` en la raíz del proyecto con este contenido:

```typescript
import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // Simula el navegador
    globals: true, // Permite usar describe/it/expect sin importarlos
    setupFiles: './tests/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'tests/',
        '*.config.ts',
        '*.config.js',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

### ¿Por qué esta configuración?

- `globals: true` → Evita importar `describe`, `it`, `expect` en cada archivo.
- `setupFiles` → Permite centralizar configuración común.
- `coverage` → Activa reportes de cobertura.
- `alias` → Facilita imports absolutos como `@/components/X`.

## Configuración del archivo de setup

Ahora crearemos un archivo de configuración para preparar el entorno de pruebas. Extenderá los matchers, limpiará el DOM entre tests y mockeará `localStorage`.

### Crear el archivo de setup

Crea la carpeta `tests/` en la raíz del proyecto y dentro, un archivo `setup.ts` con este contenido:

```typescript
// tests/setup.ts
import * as matchers from '@testing-library/jest-dom/matchers'
import { cleanup } from '@testing-library/react'
import { afterEach, expect } from 'vitest'

// Extiende los matchers de jest-dom
expect.extend(matchers)

// Limpia el DOM después de cada test
afterEach(() => {
  cleanup()
})

// Mock de localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString()
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    },
  }
})()

globalThis.localStorage = localStorageMock as Storage

// Limpia localStorage antes de cada test
beforeEach(() => {
  localStorage.clear()
})
```

### ¿Qué hace este archivo?

- Extiende `expect` con matchers como `toBeInTheDocument()` y `toHaveValue()`.
- Limpia el DOM después de cada test para evitar efectos colaterales.
- Mockea `localStorage` para que funcione en Node.js.
- Restaura su estado antes de cada prueba.

## Actualizar `package.json` con los scripts de testing

Agrega estos scripts en tu `package.json`:

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest run --coverage",
    "test:watch": "vitest --watch"
  }
}
```

### ¿Qué hace cada script?

- `test` → Ejecuta los tests en modo interactivo (se vuelven a correr al guardar).
- `test:ui` → Abre la interfaz visual de Vitest en el navegador.
- `test:coverage` → Genera el reporte de cobertura.
- `test:watch` → Fuerza el modo watch de forma explícita.

## Verificar que el entorno de testing funciona correctamente

Para confirmar que todo está bien configurado, crea un test de ejemplo en `tests/example.test.ts`:

```typescript
// tests/example.test.ts
import { describe, expect, it } from 'vitest'

describe('Setup de testing', () => {
  it('debe pasar este test básico', () => {
    expect(1 + 1).toBe(2)
  })

  it('debe tener acceso a los matchers de jest-dom', () => {
    const element = document.createElement('div')
    element.textContent = 'Hola'
    document.body.appendChild(element)

    expect(element).toBeInTheDocument()
  })

  it('debe tener localStorage mockeado', () => {
    localStorage.setItem('test', 'value')
    expect(localStorage.getItem('test')).toBe('value')
  })
})
```

Luego, ejecuta los tests:

```bash
npm run test
```

Si todo está funcionando, deberías ver un resultado como este:

```bash
✓ tests/example.test.ts (3)
  ✓ Setup de testing (3)
    ✓ debe pasar este test básico
    ✓ debe tener acceso a los matchers de jest-dom
    ✓ debe tener localStorage mockeado

Test Files  1 passed (1)
Tests       3 passed (3)
```

✅ Con esto confirmado, el entorno de testing queda oficialmente listo. El próximo paso será instalar las librerías para el manejo de formularios y validaciones, y preparar el scaffolding inicial.

## Diagrama del flujo de configuración

Para visualizar mejor el proceso de configuración del entorno de pruebas, aquí tienes un diagrama de flujo:

```mermaid
graph TD
    A[Inicio] --> B[Instalar dependencias]
    B --> C[Crear vitest.config.ts]
    C --> D[Crear tests/setup.ts]
    D --> E[Actualizar package.json]
    E --> F[Crear test de ejemplo]
    F --> G[Ejecutar pruebas]
    G --> H[Entorno listo]
```

Este diagrama resume los pasos clave para configurar el entorno de pruebas de manera clara y visual.

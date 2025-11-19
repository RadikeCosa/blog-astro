---
title: "Construyendo un Nutritional Tracker: Parte 7 - Migración a Next.js, Storybook y Accesibilidad"
published: 2025-11-19T12:10:23.397Z
description: "En este post comparto el proceso de migración de la app a Next.js, los desafíos enfrentados y las soluciones implementadas."
updated: ""
tags:
  - nutritional-tracker
  - migration
draft: false
pin: 0
toc: true
lang: "es"
abbrlink: "side-project-nutritional-tracker-7"
---

## Construyendo un Nutritional Tracker: Parte 7 — Migración a Next.js, Storybook y Accesibilidad

## Introducción

La decisión de migrar nació de la evolución natural del proyecto. Inicialmente, Vite ofrecía velocidad y simplicidad para crear prototipos y MVPs de frontend. Sin embargo, a medida que la aplicación creció, surgieron necesidades típicas de sistemas más complejos: manejo simple de rutas, interacciones con bases de datos, generación de páginas en servidor.

## ¿Por qué migrar a Next.js?

Next.js ofrece ventajas técnicas y capacidades de escalabilidad que se alinean perfectamente con las necesidades emergentes del proyecto:

- **Sistema de rutas basado en archivos:** Simplifica la gestión de rutas sin necesidad de configuración adicional.
- **API Routes y Server Actions:** Permite crear endpoints backend y llamadas a bases de datos directamente en el frontend.
- **Optimizaciones automáticas:** Desde imágenes hasta code splitting, Next.js optimiza el bundle sin configuración manual.
- **Ecosistema maduro:** Amplia documentación, comunidad activa y compatibilidad con herramientas modernas.

## Proceso de migración

### 1. Configuración inicial del proyecto Next.js

Comencé creando un nuevo proyecto Next.js con TypeScript usando el CLI oficial:

```bash
npx create-next-app@latest nutritional-tracker-nextjs --typescript --tailwind --app
```

Esto generó la estructura base con el App Router, que utiliza la carpeta `app/` en lugar del antiguo sistema de `pages/`.

### 2. Transferencia de componentes y tests

Copié los componentes y los tests del proyecto original, revisando importaciones, tipados y estilos para asegurar compatibilidad. Por ejemplo, componentes que antes usaban rutas definidas por React Router ahora debían integrarse al sistema de rutas por archivos de Next (`pages/` o `app/`).

Los tests (unitarios e integración) se ajustaron para correr correctamente en el nuevo entorno, manteniendo la misma cobertura y calidad.

> **Ejemplo**
>
> Antes (React Router):
> ```tsx
> import { Link } from 'react-router-dom'
>
> <Link to="/perfil">Perfil</Link>
> ```
>
> Después (Next.js):
> ```tsx
> import Link from 'next/link'
>
> <Link href="/perfil">Perfil</Link>
> ```

### 3. Ajuste de dependencias y configuración

Ajusté las versiones de **React**, **TypeScript**, **Testing Library** y otras dependencias clave para evitar incompatibilidades, modificando el archivo `package.json`.

Eliminé todo lo relacionado con Vite y sus plugins, sumando los scripts recomendados por Next.js:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint",
  "test": "vitest run",
  "storybook": "storybook dev -p 6006"
}
```

También fue necesario ajustar la configuración de ESLint y los archivos de TypeScript (`tsconfig.json`) para que funcionaran correctamente con Next.js.

## Storybook: Desarrollo, documentación y testing visual

### ¿Qué es Storybook y por qué usarlo?

Storybook es una herramienta para el desarrollo aislado de componentes UI. Permite trabajar, visualizar y testear cada componente de forma independiente, sin depender del backend ni de otras partes de la aplicación. Esto facilita la detección de errores visuales, la documentación interactiva y la colaboración entre desarrolladores y diseñadores.

**Principales ventajas de Storybook:**

- **Desarrollo aislado:** Puedes crear y probar componentes en diferentes estados (por ejemplo, con error, deshabilitado, cargando, etc.) sin necesidad de montar toda la app.
- **Documentación interactiva:** Cada componente tiene ejemplos (stories) que muestran sus variantes y usos, funcionando como documentación viva y actualizada.
- **Testing visual:** Permite revisar manualmente el aspecto y comportamiento de los componentes, acelerando la detección de problemas de UI.
- **Colaboración:** El equipo puede ver y probar componentes desde una interfaz web, sin necesidad de instalar el proyecto completo.

**¿Por qué lo usé en este proyecto?**

Aunque no era estrictamente necesario para una app pequeña, decidí integrar Storybook para aprender su funcionamiento y evaluar su utilidad real. Al principio tuve algunas dificultades de configuración, pero tras migrar a Next.js esas incompatibilidades se suavizaron notablemente. La documentación oficial y los ejemplos incluidos me ayudaron a construir las stories, incluso cuando aún no entendía del todo el alcance de la herramienta.

En resumen, Storybook aporta valor al desarrollo frontend profesional, incluso en proyectos pequeños, al permitir crear componentes más robustos, reutilizables y fáciles de mantener. Además, su documentación interactiva y el testing visual aceleran el desarrollo y mejoran la calidad del producto final.

### Implementación en el proyecto

La implementación de Storybook comenzó en la versión previa del proyecto con Vite, donde enfrenté algunas dificultades de compatibilidad y versionado. Por ejemplo, ciertos addons y configuraciones no funcionaban correctamente con la estructura de Vite, lo que me obligó a investigar soluciones y adaptar la configuración manualmente.

Al migrar a Next.js, el proceso se simplificó considerablemente: Storybook tiene mejor soporte y documentación para Next, lo que permitió ajustar rápidamente los archivos de configuración.

La estructura de las historias se mantuvo clara y organizada. Cada componente tiene su propio archivo `.stories.tsx` en la carpeta correspondiente, donde se definen variantes como `Default`, `WithError` y `Disabled`.

La configuración principal se realiza en el archivo `main.js`, donde se indica la ruta de los stories y los addons a utilizar. Gracias a tener las stories ya creadas en la versión anterior, la migración solo requirió ajustes menores en las importaciones y algunos parámetros.

### Ejemplo de una historia de componente

Para ilustrar cómo funciona Storybook, aquí va un ejemplo sencillo de una historia para un componente de botón (`Button`). Las historias permiten mostrar el componente en diferentes estados y con distintas propiedades, facilitando el desarrollo y la documentación.

Tomemos un componente `Button.tsx`. Su historia se define en un archivo `Button.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Botón reutilizable con variantes de color y estado.',
      },
    },
  },
}
export default meta

type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    children: 'Enviar',
    disabled: false,
    variant: 'primary',
  },
}

export const Disabled: Story = {
  args: {
    children: 'Enviar',
    disabled: true,
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Cancelar',
    disabled: false,
    variant: 'secondary',
  },
}
```

**Explicación:**

- El archivo `.stories.tsx` define cómo se muestra el componente en Storybook.
- Cada export (`Default`, `Disabled`, `Secondary`) es una "historia" que representa un estado diferente del botón.
- Los `args` permiten cambiar las propiedades del componente de forma visual y rápida desde la interfaz de Storybook.
- Así puedes ver y probar el botón con distintos textos, estilos y estados sin modificar el código principal de la app.

Este enfoque ayuda a detectar errores visuales, probar variantes y documentar el uso correcto de cada componente.

### Valor que aporta Storybook

En un proyecto personal y pequeño como este, Storybook podría considerarse un extra innecesario o incluso un "overhead". Sin embargo, integrarlo fue una decisión estratégica para experimentar y aprender su funcionamiento en un entorno real. Probándolo en este contexto, quedó en evidencia su verdadero valor en proyectos más grandes y colaborativos, donde la documentación visual, el desarrollo aislado y el testing manual de componentes son fundamentales para mantener la calidad y la escalabilidad del código.

## Tests de accesibilidad con axe-core

### ¿Por qué tener tests de accesibilidad?

Si bien para la naturaleza personal del proyecto no es estrictamente necesario, implementar tests de accesibilidad desde el inicio inculca buenas prácticas de desarrollo y garantiza que los componentes sean inclusivos. Por lo tanto, al igual que en el caso de Storybook, decidí incluirlos con fines educativos y de aprendizaje.

### ¿Qué son y por qué importan?

La accesibilidad web consiste en diseñar interfaces que puedan ser usadas por todas las personas, incluyendo aquellas con discapacidades visuales, auditivas o motoras. Cumplir con los estándares de accesibilidad (como WCAG 2.1 AA) no solo es una buena práctica, sino que también mejora la experiencia de usuario y amplía el alcance de la aplicación. Axe-core es una librería que permite automatizar la detección de problemas de accesibilidad en los componentes, ayudando a identificar errores comunes como falta de contraste, ausencia de etiquetas o navegación deficiente por teclado.

### Implementación de los tests de accesibilidad

Los tests de accesibilidad se ubican junto a los tests de los componentes, usando Testing Library y la integración de axe-core. Cada vez que se renderiza un componente en los tests, se ejecuta axe para verificar que no existan violaciones de accesibilidad. Esto asegura que los componentes cumplan con los estándares antes de ser integrados en la aplicación.

### Ejemplo de test de accesibilidad

```tsx
// Button.test.tsx
import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Button } from './Button'

expect.extend(toHaveNoViolations)

test('Button es accesible', async () => {
  const { container } = render(<Button>Enviar</Button>)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
```

**Explicación:**
Este test renderiza el componente `Button` y ejecuta axe sobre el resultado. Si se detecta algún problema de accesibilidad, el test falla y muestra un reporte detallado, permitiendo corregir el error antes de publicar el componente.

### Buenas prácticas aplicadas

- **Asociación de labels:** Todos los campos de formulario tienen etiquetas asociadas correctamente para facilitar la navegación por lectores de pantalla.
- **Mensajes accesibles:** Los mensajes de error y validación son claros y están vinculados a los campos correspondientes.
- **Contraste:** Se verifica que los colores de texto y fondo tengan suficiente contraste para ser legibles.
- **Estados dinámicos:** Los componentes informan correctamente sus estados (activo, deshabilitado, error) tanto visualmente como a través de atributos accesibles (`aria-*`).

Estas prácticas, junto con los tests automáticos, ayudan a garantizar que la aplicación sea usable y accesible para todos los usuarios.

---

## Navegación de la serie

- [← Parte 6: Arquitectura Visual y Accesibilidad](./side-project-nutritional-tracker-6.md)

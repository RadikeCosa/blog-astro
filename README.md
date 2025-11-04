# Blog de Ramiro N. Cosa

¡Hola! Soy **Ramiro N. Cosa**, y este es mi blog personal donde comparto mis experiencias, proyectos y aprendizaje en el mundo del desarrollo web y otras tecnologías.

## 🚀 Acerca del Blog

Este blog está construido con [Astro](https://astro.build/) y utiliza el tema [Retypeset](https://github.com/radishzzz/astro-theme-retypeset), adaptado para crear una experiencia de lectura elegante inspirada en libros impresos. El diseño pone énfasis en la tipografía y la experiencia de usuario.

### Características

- ⚡ **Rendimiento Optimizado**: Construido con Astro para máxima velocidad
- 🎨 **Diseño Elegante**: Tema Retypeset con tipografía cuidada
- 🌍 **Multilingüe**: Contenido disponible en español e inglés
- 📱 **Responsive**: Diseño adaptativo para todos los dispositivos
- 🌓 **Modo Oscuro/Claro**: Alterna entre temas según tu preferencia
- 📝 **Soporte MDX**: Artículos con componentes interactivos
- 🔍 **SEO Optimizado**: Metadatos y sitemap automáticos
- 📊 **Analytics**: Integración con servicios de analítica
- 💬 **Sistema de Comentarios**: Waline y Twikoo disponibles

## 🛠️ Tecnologías Utilizadas

- **Framework**: [Astro](https://astro.build/)
- **Styling**: [UnoCSS](https://unocss.dev/)
- **Tipografía**: EarlySummer Serif (fuente personalizada)
- **Comentarios**: Waline / Twikoo
- **Despliegue**: Netlify / Vercel
- **CMS**: Contenido en Markdown/MDX

## 📁 Estructura del Proyecto

```bash
src/
├── content/
│   ├── posts/          # Artículos del blog
│   └── about/          # Páginas "Sobre mí"
├── components/         # Componentes reutilizables
├── layouts/           # Layouts de página
├── pages/             # Rutas de página
├── styles/            # Estilos CSS
├── i18n/              # Configuración de idiomas
├── plugins/           # Plugins de remark/rehype
└── utils/             # Utilidades
```

## 🚀 Inicio Rápido

### Prerrequisitos

- [Node.js](https://nodejs.org/) (versión 18+)
- [pnpm](https://pnpm.io/) (recomendado)

### Instalación

1. **Clona el repositorio**

   ```bash
   git clone https://github.com/RadikeCosa/blog-astro.git
   cd blog-astro
   ```

2. **Instala las dependencias**

   ```bash
   pnpm install
   ```

3. **Inicia el servidor de desarrollo**

   ```bash
   pnpm dev
   ```

4. **Abre tu navegador** en `http://localhost:4321`

### Comandos Disponibles

```bash
# Desarrollo
pnpm dev              # Inicia servidor de desarrollo
pnpm build           # Construye para producción
pnpm preview         # Vista previa de la build

# Contenido
pnpm new-post "Título del post"    # Crea nuevo artículo
pnpm format-posts                 # Formatea posts existentes

# Mantenimiento
pnpm lint             # Ejecuta linter
pnpm lint:fix         # Corrige errores de linting
pnpm update-theme     # Actualiza el tema base
```

## 📝 Creando Contenido

### Nuevo Artículo

```bash
pnpm new-post "Mi Nuevo Artículo"
```

Esto crea un archivo Markdown con frontmatter pre-configurado.

### Frontmatter de Ejemplo

```yaml
---
title: Mi Primer Artículo
published: 2025-01-15
description: Una descripción breve del artículo
tags: [desarrollo-web, tutorial]
draft: false
---
```

## 🌍 Internacionalización

El blog soporta múltiples idiomas:

- **Español** (`es`): Contenido principal
- **Inglés** (`en`): Traducciones disponibles

Las páginas se sirven automáticamente según el idioma preferido del usuario.

## 🚀 Despliegue

### Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/RadikeCosa/blog-astro)

### Vercel

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/RadikeCosa/blog-astro)

### Manual

```bash
# Construye el sitio
pnpm build

# El resultado estará en la carpeta 'dist/'
```

## 📞 Contacto

- **Autor**: Ramiro N. Cosa
- **GitHub**: [@radikeCosa](https://github.com/radikeCosa)
- **Email**: [ramirocosa@gmail.com](mailto:ramirocosa@gmail.com)
- **Portfolio**: [ramirocosa.is-a.dev](https://ramirocosa.is-a.dev)
- **LinkedIn**: [linkedin.com/in/ramicosa](https://www.linkedin.com/in/ramicosa)

## 📄 Licencia

Este proyecto está basado en el tema [Retypeset](https://github.com/radishzzz/astro-theme-retypeset) y está disponible bajo la misma licencia.

## 🙏 Créditos

- [Retypeset Theme](https://github.com/radishzzz/astro-theme-retypeset) - Tema base
- [Astro](https://astro.build/) - Framework web
- [UnoCSS](https://unocss.dev/) - Motor de estilos
- [EarlySummer Serif](https://github.com/GuiWonder/EarlySummerSerif) - Tipografía personalizada

---

# Protección de la Rama Main - Guía Rápida

## ✅ ¿Qué se ha implementado?

Se ha creado un **ruleset completo de GitHub** para proteger la rama `main` del repositorio, junto con workflows de CI/CD para automatizar las verificaciones de calidad.

### Archivos Creados

```
.github/
├── rulesets/
│   ├── main-branch-protection.json  # Configuración del ruleset
│   └── README.md                    # Documentación detallada
└── workflows/
    ├── build.yml                    # Verificación de build
    └── lint.yml                     # Verificación de linting
```

## 🔒 Protecciones Implementadas

El ruleset configurado incluye las siguientes protecciones:

1. **✓ Pull Request Requerido**
   - Se requiere al menos 1 aprobación antes de fusionar
   - Las revisiones antiguas se descartan automáticamente con nuevos cambios
   - Todos los comentarios deben resolverse antes de fusionar

2. **✓ Prevención de Force Push**
   - No se permiten force pushes a la rama main
   - Protege el historial de commits

3. **✓ Prevención de Eliminación**
   - La rama main no puede ser eliminada

4. **✓ Firmas de Commits Requeridas**
   - Los commits deben estar firmados con GPG/SSH

5. **✓ Verificaciones de Estado (CI/CD)**
   - Build Check: Valida que el sitio se construya correctamente
   - Lint Check: Valida el estilo del código con ESLint

## 🚀 Cómo Aplicar el Ruleset

### Opción 1: A través de la Interfaz Web de GitHub (Recomendado)

1. Ve a tu repositorio en GitHub: https://github.com/RadikeCosa/blog-astro

2. Navega a **Settings** → **Rules** → **Rulesets**

3. Haz clic en **New ruleset** → **Import a ruleset**

4. Sube el archivo `.github/rulesets/main-branch-protection.json`

5. Haz clic en **Create** para activar el ruleset

### Opción 2: Usando GitHub CLI

Si tienes `gh` instalado:

```bash
gh api \
  --method POST \
  -H "Accept: application/vnd.github+json" \
  /repos/RadikeCosa/blog-astro/rulesets \
  --input .github/rulesets/main-branch-protection.json
```

### Opción 3: Configuración Manual

También puedes crear el ruleset manualmente siguiendo estos pasos:

1. Ve a **Settings** → **Rules** → **Rulesets** → **New branch ruleset**
2. Configura:
   - **Name**: Main Branch Protection
   - **Enforcement status**: Active
   - **Target branches**: main
   - **Rules**: Marca las siguientes opciones:
     - ☑ Require a pull request before merging (1 approval)
     - ☑ Require conversation resolution before merging
     - ☑ Block force pushes
     - ☑ Restrict deletions
     - ☑ Require signed commits
3. **Bypass list**: Add administrators

## 📋 Verificaciones CI/CD

Los workflows creados se ejecutarán automáticamente:

### Build Check
- **Cuándo**: En cada Pull Request a `main` y en cada push a `main`
- **Qué hace**:
  - Instala dependencias con pnpm
  - Ejecuta `pnpm astro check`
  - Construye el sitio con `pnpm build`
  
### Lint Check
- **Cuándo**: En cada Pull Request a `main` y en cada push a `main`
- **Qué hace**:
  - Instala dependencias con pnpm
  - Ejecuta `pnpm lint` para validar el estilo del código

## 🧪 Probando las Protecciones

Para verificar que las protecciones están funcionando:

1. **Intenta hacer push directo a main** (debería fallar):
   ```bash
   git checkout main
   echo "test" >> test.txt
   git add test.txt
   git commit -m "test: should fail"
   git push origin main  # ❌ Esto será bloqueado
   ```

2. **Crea un Pull Request** (la forma correcta):
   ```bash
   git checkout -b feature/test-protection
   echo "test" >> test.txt
   git add test.txt
   git commit -m "feat: testing branch protection"
   git push origin feature/test-protection
   # Luego crea un PR desde GitHub
   ```

## 📖 Más Información

Para más detalles sobre personalización y configuración avanzada, consulta:
- **Documentación completa**: `.github/rulesets/README.md`
- **GitHub Rulesets Docs**: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets

## 🎯 Beneficios

✅ Previene commits accidentales directamente en main  
✅ Requiere revisión de código antes de fusionar  
✅ Mantiene el historial limpio sin force pushes  
✅ Protege contra eliminación de la rama principal  
✅ Mejora la seguridad con firmas de commits  
✅ Automatiza verificaciones de calidad con CI/CD  
✅ Facilita la colaboración mediante pull requests

---

**Nota Importante**: El ruleset está definido en el archivo JSON pero **debe ser aplicado manualmente** a través de la interfaz de GitHub o GitHub CLI para que las protecciones sean efectivas.

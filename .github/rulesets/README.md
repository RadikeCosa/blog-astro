# Protección de la Rama Main

Este documento describe la configuración del ruleset de GitHub para proteger la rama `main` del repositorio.

## 📋 Configuración Actual

El archivo `.github/rulesets/main-branch-protection.json` define las siguientes protecciones:

### 🔒 Reglas Activas

1. **Pull Request Requerido** (`pull_request`)
   - Se requiere al menos 1 aprobación antes de fusionar
   - Las revisiones antiguas se descartan automáticamente cuando se hace push de nuevos cambios
   - Se requiere que todos los hilos de conversación estén resueltos antes de fusionar

2. **Verificaciones de Estado** (`required_status_checks`)
   - Configurado para requerir que las verificaciones de estado pasen antes de fusionar
   - Política estricta: la rama debe estar actualizada antes de fusionar

3. **Prevención de Force Push** (`non_fast_forward`)
   - No se permiten "force pushes" a la rama main
   - Protege el historial de commits de sobrescrituras accidentales

4. **Prevención de Eliminación** (`deletion`)
   - La rama main no puede ser eliminada
   - Garantiza que la rama principal siempre exista

5. **Firmas de Commits Requeridas** (`required_signatures`)
   - Se requiere que los commits estén firmados con GPG/SSH
   - Mejora la seguridad y verificación de autoría

### 👥 Actores con Bypass

- **Administradores del Repositorio**: Pueden bypass estas reglas cuando sea necesario
  - Útil para mantenimiento de emergencia o situaciones excepcionales
  - Actor ID 5 corresponde al rol "Admin" de GitHub

## 🚀 Aplicando el Ruleset

### Método 1: GitHub CLI (Recomendado)

Si tienes `gh` instalado:

```bash
# El ruleset se aplicará automáticamente al subir este archivo al repositorio
gh repo view --web
# Navega a Settings → Rules → Rulesets
```

### Método 2: Interfaz Web de GitHub

1. Ve a tu repositorio en GitHub
2. Navega a **Settings** → **Rules** → **Rulesets**
3. Haz clic en **New ruleset** → **Import a ruleset**
4. Sube el archivo `.github/rulesets/main-branch-protection.json`

### Método 3: Aplicación Automática

GitHub puede detectar y sugerir aplicar rulesets definidos en el repositorio:

1. Haz commit y push de este archivo
2. Ve a la configuración del repositorio
3. GitHub puede mostrar una notificación para aplicar el ruleset

## 📝 Personalizando el Ruleset

### Cambiar el Número de Aprobaciones Requeridas

Edita la propiedad `required_approving_review_count`:

```json
{
  "type": "pull_request",
  "parameters": {
    "required_approving_review_count": 2 // Cambia a 2 o más
  }
}
```

### Agregar Verificaciones de Estado (CI/CD)

Si tienes GitHub Actions u otros checks:

```json
{
  "type": "required_status_checks",
  "parameters": {
    "required_status_checks": [
      {
        "context": "build", // Nombre del check
        "integration_id": null // Null para cualquier integración
      },
      {
        "context": "test",
        "integration_id": null
      }
    ],
    "strict_required_status_checks_policy": true
  }
}
```

### Requerir Revisión de Code Owners

Si tienes un archivo `CODEOWNERS`:

```json
{
  "type": "pull_request",
  "parameters": {
    "require_code_owner_review": true // Cambiar a true
  }
}
```

## ⚙️ Configuración Recomendada para Este Proyecto

### Agregar GitHub Actions

Para máxima protección, considera agregar estos workflows:

1. **Build Check** (`.github/workflows/build.yml`)
   ```yaml
   name: Build Check
   on:
     pull_request:
       branches: [main]

   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: pnpm/action-setup@v4
         - uses: actions/setup-node@v4
           with:
             node-version: 18
             cache: pnpm
         - run: pnpm install
         - run: pnpm build
   ```

2. **Lint Check** (`.github/workflows/lint.yml`)
   ```yaml
   name: Lint Check
   on:
     pull_request:
       branches: [main]

   jobs:
     lint:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: pnpm/action-setup@v4
         - uses: actions/setup-node@v4
           with:
             node-version: 18
             cache: pnpm
         - run: pnpm install
         - run: pnpm lint
   ```

### Actualizar el Ruleset con Status Checks

Una vez que tengas workflows activos, actualiza el ruleset:

```json
{
  "type": "required_status_checks",
  "parameters": {
    "required_status_checks": [
      {
        "context": "Build Check",
        "integration_id": null
      },
      {
        "context": "Lint Check",
        "integration_id": null
      }
    ],
    "strict_required_status_checks_policy": true
  }
}
```

## 🔍 Verificando la Configuración

### Probar las Protecciones

1. Crea una rama de prueba:
   ```bash
   git checkout -b test-protection
   echo "test" >> README.md
   git add README.md
   git commit -m "test: verify branch protection"
   git push origin test-protection
   ```

2. Intenta hacer push directo a main (debería fallar):
   ```bash
   git checkout main
   git pull
   echo "test" >> README.md
   git add README.md
   git commit -m "test: this should fail"
   git push origin main  # Esto debería ser bloqueado
   ```

3. Crea un Pull Request en su lugar

## 📚 Referencias

- [GitHub Rulesets Documentation](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets)
- [Creating Rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/creating-rulesets-for-a-repository)
- [Available Rules](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets)

## 🎯 Beneficios de Esta Configuración

✅ **Previene commits accidentales** directamente en main
✅ **Requiere revisión de código** antes de fusionar
✅ **Mantiene el historial limpio** sin force pushes
✅ **Protege contra eliminación** de la rama principal
✅ **Mejora la seguridad** con firmas de commits
✅ **Facilita la colaboración** mediante pull requests

---

**Nota**: El ruleset definido en este archivo es un template. Para que las protecciones sean efectivas, debes aplicarlo a través de la interfaz de GitHub o GitHub CLI.

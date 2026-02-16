# Guía de Instalación

Esta guía te ayudará a configurar y ejecutar el proyecto de Formulario de Reserva de Eventos.

## Requisitos Previos

- **Node.js** 18.0 o superior
- **npm** 9.0 o superior (incluido con Node.js)
- **Git** para clonar el repositorio

## Instalación

### 1. Clonar el Repositorio

```bash
git clone <repository-url>
cd evento-reservas
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Verificar Instalación

```bash
npm run dev
```

El proyecto debería estar disponible en `http://localhost:5173`

## Scripts Disponibles

### Desarrollo
```bash
# Ejecutar servidor de desarrollo
npm run dev

# El servidor se ejecuta en http://localhost:5173
# Recarga automática al guardar cambios
```

### Testing
```bash
# Ejecutar todos los tests
npm run test

# Ejecutar tests con cobertura
npm run test:coverage

# Ejecutar tests en modo watch
npm run test -- --watch
```

### Construcción
```bash
# Construir para producción
npm run build

# Previsualizar build de producción
npm run preview
```

### Documentación
```bash
# Ejecutar documentación en desarrollo
npm run docs:dev

# Construir documentación
npm run docs:build
```

## Estructura del Proyecto

```
evento-reservas/
├── src/
│   ├── components/          # Componentes Vue
│   ├── composables/         # Lógica reutilizable
│   ├── types/              # Tipos TypeScript
│   ├── utils/              # Utilidades
│   ├── tests/              # Tests
│   ├── App.vue             # Componente raíz
│   ├── main.ts             # Punto de entrada
│   └── style.css           # Estilos globales
├── docs/                   # Documentación VuePress
├── public/                 # Archivos estáticos
├── index.html              # HTML principal
├── package.json            # Dependencias y scripts
├── vite.config.ts          # Configuración Vite
├── vitest.config.ts        # Configuración Vitest
└── tsconfig.json           # Configuración TypeScript
```

## Configuración del Entorno

### Variables de Entorno (Opcional)

Crear archivo `.env.local`:

```env
# Puerto del servidor de desarrollo
VITE_PORT=5173

# Modo de desarrollo
VITE_MODE=development
```

### Configuración del Editor

#### VS Code (Recomendado)

Instalar extensiones:
- **Volar** - Soporte para Vue 3
- **TypeScript Vue Plugin** - Mejor integración TS
- **ESLint** - Linting
- **Prettier** - Formateo de código

#### Configuración `.vscode/settings.json`:

```json
{
  "typescript.preferences.includePackageJsonAutoImports": "off",
  "vue.codeActions.enabled": true,
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## Solución de Problemas

### Error: "Cannot resolve dependency"

```bash
# Limpiar cache y reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Error: "Port already in use"

```bash
# Usar puerto diferente
npm run dev -- --port 3000
```

### Tests fallan por falta de DOM

```bash
# Verificar que jsdom esté instalado
npm install --save-dev jsdom
```

### Error de TypeScript

```bash
# Verificar configuración TypeScript
npx tsc --noEmit
```

## Comandos Útiles

### Análisis de Bundle
```bash
npm run build -- --analyze
```

### Linting
```bash
# Si tienes ESLint configurado
npm run lint
npm run lint:fix
```

### Formateo
```bash
# Si tienes Prettier configurado
npm run format
```

## Desarrollo

### Hot Reload
- Los cambios en archivos `.vue`, `.ts`, `.css` se reflejan automáticamente
- No es necesario recargar la página manualmente

### Debugging
- Usar Vue DevTools en el navegador
- Breakpoints en VS Code funcionan con source maps
- Console.log disponible en desarrollo

### Testing en Desarrollo
```bash
# Tests en modo watch
npm run test -- --watch

# Tests específicos
npm run test -- validation.test.ts

# Tests con UI
npm run test -- --ui
```

## Despliegue

### Build de Producción
```bash
npm run build
```

Los archivos se generan en `dist/` y están listos para servir desde cualquier servidor web estático.

### Verificar Build
```bash
npm run preview
```

## Soporte

Si encuentras problemas:

1. Verifica que tienes las versiones correctas de Node.js y npm
2. Revisa que todas las dependencias estén instaladas
3. Consulta la documentación de cada herramienta
4. Revisa los logs de error en la consola
# Patrón Singleton: AppConfig

## Propósito

El patrón Singleton se eligió para la configuración de la aplicación para garantizar una única "fuente de la verdad" para todos los ajustes de la interfaz de usuario. Esto asegura que:

- Solo existe una instancia de configuración en toda la aplicación
- Todos los componentes acceden a la misma configuración
- Los cambios se propagan automáticamente a todos los consumidores
- Se mantiene consistencia en el estado global

## Interfaz IAppSettings

```ts
export interface IAppSettings {
  theme: 'light' | 'dark'
  language: 'es' | 'en' | 'fr'
  fontSize: 'small' | 'medium' | 'large'
  fontFamily: 'Arial' | 'Verdana' | 'Georgia'
}
```

## API Pública

### getInstance(): AppConfig
Método estático que devuelve la única instancia de la clase.

```ts
const config = AppConfig.getInstance();
```

### getSettings(): DeepReadonly<Ref<IAppSettings>>
Devuelve una versión reactiva y de solo lectura de la configuración.

```ts
const settings = config.getSettings()
console.log(settings.value.theme) // 'light'
```

### setTheme(theme: 'light' | 'dark'): void
Cambia el tema de la aplicación.

```ts
config.setTheme('dark')
```

### setLanguage(lang: 'es' | 'en' | 'fr'): void
Cambia el idioma de la aplicación.

```ts
config.setLanguage('en')
```

### setFontSize(size: 'small' | 'medium' | 'large'): void
Cambia el tamaño de fuente.

```ts
config.setFontSize('large')
```

### setFontFamily(family: 'Arial' | 'Verdana' | 'Georgia'): void
Cambia la familia de fuente.

```ts
config.setFontFamily('Arial')
```

## Guía de Uso

### Leer la Configuración

```ts
const settings = AppConfig.getInstance().getSettings()

const themeClass = computed(() => {
  return settings.value.theme === 'dark' ? 'dark-theme' : 'light-theme'
})
```

### Modificar la Configuración

```ts
const configService = AppConfig.getInstance()

function cambiarTema() {
  const currentTheme = configService.getSettings().value.theme
  const newTheme = currentTheme === 'light' ? 'dark' : 'light'
  configService.setTheme(newTheme)
}

function cambiarIdioma(idioma: 'es' | 'en' | 'fr') {
  configService.setLanguage(idioma)
}
```

## Características

### Reactividad
- Los cambios se reflejan automáticamente en todos los componentes
- Utiliza el sistema reactivo de Vue 3
- No requiere re-renderizado manual

### Persistencia
- Guarda automáticamente en localStorage
- Carga la configuración al iniciar la aplicación
- Valores por defecto si no existe configuración previa

### Singleton
- Una sola instancia en toda la aplicación
- Constructor privado previene instanciación directa
- Acceso controlado mediante getInstance()
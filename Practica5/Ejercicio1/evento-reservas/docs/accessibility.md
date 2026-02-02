# Accesibilidad

El formulario cumple con las pautas WCAG 2.1 AA para garantizar la accesibilidad.

## Características de Accesibilidad Implementadas

### Navegación por Teclado
- ✅ **Tab**: Navegación secuencial entre campos
- ✅ **Shift+Tab**: Navegación hacia atrás
- ✅ **Enter**: Envío del formulario
- ✅ **Escape**: Salir de campos (comportamiento nativo)

### Atributos ARIA

#### Labels y Descripciones
```html
<label for="nombreCompleto">Nombre Completo *</label>
<input 
  id="nombreCompleto"
  aria-describedby="nombreCompleto-error"
  required
/>
<div id="nombreCompleto-error" role="alert">
  Mensaje de error
</div>
```

#### Roles Semánticos
- `role="alert"` para mensajes de error
- `aria-label` para el input range
- `fieldset` y `legend` para agrupación

### Indicadores Visuales

#### Estados de Focus
```css
input:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}
```

#### Estados de Error
```css
input.error {
  border-color: var(--error-color);
}
```

### Mensajes de Error Accesibles

- **Identificación clara**: Cada error tiene un ID único
- **Asociación**: `aria-describedby` conecta input con error
- **Anuncio**: `role="alert"` hace que lectores anuncien errores
- **Iconos**: Emojis como indicadores visuales adicionales

### Responsive y Adaptativo

#### Preferencias del Usuario
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

@media (prefers-contrast: high) {
  :root {
    --border-color: #000000;
    --text-color: #000000;
  }
}
```

#### Diseño Responsivo
- **Mobile-first**: Diseño optimizado para móviles
- **Breakpoints**: 768px y 480px
- **Touch targets**: Botones de al menos 44px
- **Legibilidad**: Tamaños de fuente escalables

### Estructura Semántica

#### HTML Semántico
```html
<form novalidate>
  <fieldset>
    <legend>Datos Personales</legend>
    <!-- campos relacionados -->
  </fieldset>
  
  <fieldset>
    <legend>Detalles del Evento</legend>
    <!-- campos relacionados -->
  </fieldset>
</form>
```

#### Jerarquía de Encabezados
- `h1`: Título principal del formulario
- `legend`: Títulos de secciones
- Sin saltos en la jerarquía

### Validación Accesible

#### Feedback Inmediato
- Errores anunciados automáticamente
- Limpieza de errores al corregir
- Estado del formulario siempre visible

#### Botón de Envío
```html
<button type="submit" :disabled="!isFormValid">
  Enviar Reserva
</button>
```
- Deshabilitado hasta que el formulario sea válido
- Estado visual claro
- Texto descriptivo

### Testing de Accesibilidad

#### Herramientas Recomendadas
- **axe-core**: Auditoría automática
- **WAVE**: Evaluación web
- **Lighthouse**: Puntuación de accesibilidad
- **Lectores de pantalla**: NVDA, JAWS, VoiceOver

#### Checklist Manual
- [ ] Navegación completa por teclado
- [ ] Todos los elementos tienen labels
- [ ] Contraste de colores adecuado
- [ ] Errores anunciados correctamente
- [ ] Formulario funciona sin JavaScript
- [ ] Responsive en todos los dispositivos
# Validaciones del Formulario

El sistema implementa validaciones robustas usando expresiones regulares y lógica personalizada.

## Expresiones Regulares Utilizadas

### Nombre Completo
```javascript
/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,50}$/
```
- Solo letras (incluye tildes y ñ)
- Espacios permitidos
- Longitud: 3-50 caracteres

### NIF/NIE
```javascript
/^[0-9]{8}[A-Z]$|^[XYZ][0-9]{7}[A-Z]$/
```
- **NIF**: 8 dígitos + letra mayúscula
- **NIE**: X/Y/Z + 7 dígitos + letra mayúscula
- Incluye validación de letra de control

### Teléfono Móvil
```javascript
/^[679][0-9]{8}$/
```
- 9 dígitos totales
- Debe empezar por 6, 7 o 9
- Solo números españoles

### Email
```javascript
/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
```
- Formato estándar de email
- Permite puntos, guiones y guiones bajos
- Dominio con al menos 2 caracteres

## Validaciones Especiales

### Validación de Letra NIF
Utiliza el algoritmo oficial español:
```javascript
const NIF_LETTERS = 'TRWAGMYFPDXBNJZSQVHLCKE'
const letter = NIF_LETTERS.charAt(number % 23)
```

### Validación de Letra NIE
Convierte el prefijo a número:
- X → 0
- Y → 1  
- Z → 2

### Validación de Fechas
- **Fecha mínima**: 7 días desde hoy
- **Fecha máxima**: 1 año desde hoy
- Usa objetos Date para comparación precisa

### Validación de Horas
- **Rango permitido**: 08:00 - 23:00
- Extrae las horas del formato HH:MM
- Valida solo el componente de horas

### Validación de Asistentes
- **Rango**: 10-500 personas
- Validación numérica estricta
- Sincronización entre input number y range

## Mensajes de Error

Los mensajes son claros y específicos:

- ❌ "Solo letras, espacios y tildes (3-50 caracteres)"
- ❌ "Letra de control del NIF incorrecta"
- ❌ "Formato de teléfono inválido (9 dígitos, empezando por 6, 7 o 9)"
- ❌ "La fecha debe ser al menos 7 días desde hoy"
- ❌ "La hora debe estar entre 08:00 y 23:00"

## Validación en Tiempo Real

- **onBlur**: Validación completa al salir del campo
- **onInput**: Limpieza de errores al escribir
- **onChange**: Validación inmediata en selects y dates
- **Sincronización**: Los inputs number/range se validan mutuamente
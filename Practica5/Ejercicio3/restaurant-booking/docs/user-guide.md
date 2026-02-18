# Cómo Usar VueDining

Guía paso a paso para realizar reservas en el sistema.

## Flujo de Reserva

### 1. Seleccionar Horario

En la parte superior de la aplicación, encontrarás botones con diferentes franjas horarias:

- **13:00** - Comida temprana
- **14:00** - Comida
- **15:00** - Comida tardía
- **20:00** - Cena temprana
- **21:00** - Cena

**Acción**: Haz clic en el horario deseado. El mapa de mesas se actualizará automáticamente mostrando la disponibilidad para ese horario.

### 2. Visualizar Disponibilidad

El mapa del restaurante muestra todas las mesas con códigos de color:

- 🟢 **Verde (Libre)**: Mesa disponible para reservar
- 🔴 **Rojo (Ocupada)**: Mesa ya reservada en ese horario
- 🔵 **Azul (Seleccionada)**: Mesa que has seleccionado

Cada mesa muestra:
- Número de mesa
- Capacidad (número de personas)

### 3. Seleccionar Mesa

**Acción**: Haz clic en una mesa libre (verde) para seleccionarla.

**Navegación por Teclado**:
- Usa **TAB** para navegar entre mesas
- Presiona **ENTER** para seleccionar una mesa
- Las mesas ocupadas no son seleccionables

### 4. Completar Formulario

Una vez seleccionada una mesa libre, aparecerá el formulario de reserva:

#### Campos Obligatorios:

**Nombre Completo**
- Introduce tu nombre completo
- Mínimo 3 caracteres

**Email**
- Dirección de correo electrónico válida
- Formato: usuario@dominio.com

**Número de Comensales**
- Selecciona cuántas personas asistirán
- No puede exceder la capacidad de la mesa
- Usa el input numérico o el slider

### 5. Confirmar Reserva

**Acción**: Haz clic en "Confirmar Reserva"

El sistema validará:
- ✅ Todos los campos están completos
- ✅ El email tiene formato válido
- ✅ El número de comensales no excede la capacidad
- ✅ La mesa sigue disponible

Si todo es correcto, verás un mensaje de confirmación.

## Consejos de Uso

### Cambiar de Horario

Puedes cambiar el horario seleccionado en cualquier momento. El mapa se actualizará automáticamente.

### Cambiar de Mesa

Si ya seleccionaste una mesa pero quieres cambiar:
1. Haz clic en otra mesa libre
2. El formulario se actualizará con la nueva mesa

### Cancelar Selección

Para deseleccionar una mesa:
- Haz clic nuevamente en la mesa seleccionada (azul)
- El formulario desaparecerá

## Accesibilidad

### Navegación por Teclado

- **TAB**: Navegar entre elementos
- **SHIFT + TAB**: Navegar hacia atrás
- **ENTER**: Activar botones y seleccionar mesas
- **SPACE**: Activar botones

### Lectores de Pantalla

Cada mesa anuncia:
- Número de mesa
- Capacidad
- Estado actual (libre, ocupada, seleccionada)

Los mensajes de error se anuncian automáticamente.

## Solución de Problemas

### "La mesa ya no está disponible"

Otra persona reservó la mesa mientras completabas el formulario. Selecciona otra mesa.

### "El número de comensales excede la capacidad"

Reduce el número de comensales o selecciona una mesa con mayor capacidad.

### "Email inválido"

Verifica que el email tenga el formato correcto: usuario@dominio.com

## Datos de Ejemplo

### Mesas Disponibles

- **Mesa 1**: 2 personas
- **Mesa 2**: 4 personas
- **Mesa 3**: 4 personas
- **Mesa 4**: 6 personas
- **Mesa 5**: 2 personas
- **Mesa 6**: 8 personas

### Horarios Disponibles

- **Comida**: 13:00, 14:00, 15:00
- **Cena**: 20:00, 21:00
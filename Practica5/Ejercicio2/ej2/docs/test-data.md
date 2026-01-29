# Datos de Prueba

## Tarjetas de Crédito Válidas

Estas tarjetas pasan la validación del **algoritmo de Luhn** y pueden usarse para testing:

### 💳 Visa
```
Número: 4532015112830366
Titular: JUAN PEREZ GARCIA
Expiración: 12/25
CVV: 123
```

```
Número: 4111111111111111
Titular: MARIA LOPEZ SANTOS
Expiración: 06/26
CVV: 456
```

### 💳 Mastercard
```
Número: 5425233430109903
Titular: CARLOS RODRIGUEZ MARTIN
Expiración: 09/25
CVV: 789
```

```
Número: 5555555555554444
Titular: ANA FERNANDEZ RUIZ
Expiración: 03/27
CVV: 321
```

### 💳 American Express
```
Número: 374245455400126
Titular: PEDRO GONZALEZ LOPEZ
Expiración: 11/25
CVV: 1234
```

```
Número: 378282246310005
Titular: LUCIA MARTINEZ DIAZ
Expiración: 08/26
CVV: 5678
```

## Códigos Postales Válidos

El sistema simula la validación de códigos postales españoles:

### 🏙️ Madrid
```
Código: 28001
Ciudad: Madrid
Provincia: Madrid
Gastos de envío: 3.99€
Tiempo de entrega: 1 día
```

### 🏙️ Barcelona
```
Código: 08001
Ciudad: Barcelona
Provincia: Barcelona
Gastos de envío: 3.99€
Tiempo de entrega: 1 día
```

### 🏙️ Sevilla
```
Código: 41001
Ciudad: Sevilla
Provincia: Sevilla
Gastos de envío: 5.99€
Tiempo de entrega: 3 días
```

### 🏙️ Valencia
```
Código: 46001
Ciudad: Valencia
Provincia: Valencia
Gastos de envío: 5.99€
Tiempo de entrega: 3 días
```

### 🏝️ Canarias (Simulado)
```
Código: 35001
Ciudad: Las Palmas
Provincia: Las Palmas
Gastos de envío: 12.99€
Tiempo de entrega: 5 días
```

## Códigos de Descuento

### 🎟️ Códigos Válidos

```
BIENVENIDO10
Descuento: 10%
Descripción: Descuento de bienvenida para nuevos usuarios
```

```
VERANO20
Descuento: 20%
Descripción: Promoción especial de verano
```

```
VIP30
Descuento: 30%
Descripción: Descuento exclusivo para clientes VIP
```

### ❌ Códigos Inválidos (para testing de errores)
- `EXPIRED`
- `INVALID_CODE`
- `TEST123`
- `DESCUENTO50`

## NIFs/CIFs de Prueba

### ✅ NIFs Válidos
```
12345678Z
87654321X
00000000T
11111111H
22222222J
```

### ✅ CIFs Válidos
```
A12345674
B98765432
G12345678
H87654321
N11111111
```

### ❌ NIFs/CIFs Inválidos (para testing de errores)
```
12345678A  (letra incorrecta)
123456789  (sin letra)
ABCDEFGHI  (formato incorrecto)
1234567Z   (pocos dígitos)
```

## Teléfonos de Prueba

### ✅ Teléfonos Válidos (formato español)
```
612345678
687654321
634567890
698765432
611223344
```

### ❌ Teléfonos Inválidos
```
512345678  (no empieza por 6-9)
12345678   (pocos dígitos)
6123456789 (demasiados dígitos)
+34612345678 (con prefijo)
```

## Emails de Prueba

### ✅ Emails Válidos
```
usuario@example.com
test.email@domain.es
nombre.apellido@empresa.org
user123@test-domain.net
```

### ❌ Emails Inválidos
```
usuario@          (dominio incompleto)
@domain.com       (sin usuario)
usuario.domain.com (sin @)
usuario@domain    (sin TLD)
```

## Datos Completos de Prueba

### 👤 Usuario de Prueba 1
```
Nombre: Juan Pérez García
NIF: 12345678Z
Email: juan.perez@example.com
Teléfono: 612345678
Dirección: Calle Mayor, 123, 2º A
Código Postal: 28001
Ciudad: Madrid (autocompletado)
Provincia: Madrid (autocompletado)
País: España
```

### 👤 Usuario de Prueba 2
```
Nombre: María López Santos
NIF: 87654321X
Email: maria.lopez@test.es
Teléfono: 687654321
Dirección: Avenida Diagonal, 456
Código Postal: 08001
Ciudad: Barcelona (autocompletado)
Provincia: Barcelona (autocompletado)
País: España
```

## Escenarios de Testing

### ✅ Flujo Completo Exitoso
1. Usar datos del Usuario de Prueba 1
2. Seleccionar "Misma dirección de envío"
3. Pagar con tarjeta Visa: 4532015112830366
4. Aplicar código: BIENVENIDO10
5. Aceptar términos y confirmar

### ❌ Flujo con Errores
1. Dejar campos obligatorios vacíos
2. Usar NIF inválido: 12345678A
3. Usar tarjeta inválida: 1234567890123456
4. Usar código de descuento inválido: EXPIRED
5. No aceptar términos y condiciones

### 🔄 Flujo con Borrador
1. Completar paso 1 con datos válidos
2. Usar "Guardar borrador"
3. Recargar la página
4. Aceptar recuperar borrador
5. Continuar desde donde se quedó
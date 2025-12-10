# Patrón Factoría: Sistema de Notificaciones

## Concepto

El patrón Factoría es un patrón de diseño creacional que proporciona una interfaz para crear objetos sin especificar sus clases concretas. En este sistema de notificaciones, evitamos tener múltiples `if/else` o `switch` repartidos por toda la aplicación, centralizando la lógica de creación en una sola función.

## Ventajas del Patrón

- **Centralización**: Toda la lógica de creación está en un lugar
- **Extensibilidad**: Fácil añadir nuevos tipos de notificación
- **Mantenibilidad**: Cambios en la creación no afectan el código cliente
- **Polimorfismo**: Todos los objetos comparten la misma interfaz

## La Interfaz INotifier

```typescript
export interface INotifier {
  send(message: string): void;
}
```

Esta interfaz define el contrato que deben cumplir todos los notificadores, garantizando que tengan un método `send` común.

## Implementaciones Concretas

### EmailNotifier
```typescript
export class EmailNotifier implements INotifier {
  send(message: string): void {
    console.log(`[EMAIL] Enviando correo con el cuerpo: "${message}"`);
  }
}
```

### SmsNotifier
```typescript
export class SmsNotifier implements INotifier {
  send(message: string): void {
    console.log(`[SMS] Enviando mensaje de texto: "${message}"`);
  }
}
```

### PushNotifier
```typescript
export class PushNotifier implements INotifier {
  send(message: string): void {
    console.log(`[PUSH] Enviando a token de dispositivo: "${message}"`);
  }
}
```

## La Factoría de Notificaciones

```typescript
export type NotificationType = 'email' | 'sms' | 'push';

export function notificationFactory(type: NotificationType): INotifier {
  switch (type) {
    case 'email':
      return new EmailNotifier();
    case 'sms':
      return new SmsNotifier();
    case 'push':
      return new PushNotifier();
    default:
      const exhaustiveCheck: never = type;
      throw new Error(`Tipo de notificación no soportado: ${exhaustiveCheck}`);
  }
}
```

**Parámetros:**
- `type`: Tipo de notificación a crear ('email', 'sms', 'push')

**Retorna:**
- Una instancia que implementa `INotifier`

**Lanza:**
- `Error` si el tipo no está soportado

## Uso en Componentes Vue

```typescript
// En el componente
const notifier = notificationFactory(selectedType.value);
notifier.send(message.value);
```

El código cliente no necesita saber qué tipo específico de notificador está usando, solo llama al método `send`.

## Cómo Añadir un Nuevo Notificador (WhatsApp)

### 1. Crear la Clase
```typescript
// src/notifications/WhatsAppNotifier.ts
import type { INotifier } from './INotifier';

export class WhatsAppNotifier implements INotifier {
  send(message: string): void {
    console.log(`[WHATSAPP] Enviando mensaje: "${message}"`);
  }
}
```

### 2. Actualizar el Tipo
```typescript
// En notificationFactory.ts
export type NotificationType = 'email' | 'sms' | 'push' | 'whatsapp';
```

### 3. Añadir a la Factoría
```typescript
// En notificationFactory.ts
import { WhatsAppNotifier } from './WhatsAppNotifier';

export function notificationFactory(type: NotificationType): INotifier {
  switch (type) {
    case 'email':
      return new EmailNotifier();
    case 'sms':
      return new SmsNotifier();
    case 'push':
      return new PushNotifier();
    case 'whatsapp':
      return new WhatsAppNotifier();
    default:
      const exhaustiveCheck: never = type;
      throw new Error(`Tipo de notificación no soportado: ${exhaustiveCheck}`);
  }
}
```

### 4. Actualizar la UI (Opcional)
```vue
<!-- En NotificationComposer.vue -->
<select v-model="selectedType">
  <option value="email">Email</option>
  <option value="sms">SMS</option>
  <option value="push">Push (Token)</option>
  <option value="whatsapp">WhatsApp</option>
</select>
```

## Extensibilidad y Mantenibilidad

Este patrón demuestra:

- **Principio Abierto/Cerrado**: Abierto para extensión (nuevos notificadores), cerrado para modificación (código existente)
- **Principio de Responsabilidad Única**: Cada clase tiene una sola responsabilidad
- **Inversión de Dependencias**: El código cliente depende de abstracciones, no de implementaciones concretas

## Casos de Uso

- Sistemas de notificación multi-canal
- Creación de diferentes tipos de reportes
- Implementación de múltiples estrategias de pago
- Generación de diferentes formatos de archivo
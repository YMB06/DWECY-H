# Formulario de Reserva de Eventos

Sistema de gestión de reservas para eventos desarrollado con **Vue 3**, **TypeScript** y **Vite**, siguiendo las mejores prácticas de desarrollo frontend.

## 🚀 Características

- ✅ **Vue 3** con Composition API y `<script setup>`
- ✅ **TypeScript** para tipado estático
- ✅ **Validaciones en tiempo real** con expresiones regulares
- ✅ **Accesibilidad completa** (WCAG 2.1 AA)
- ✅ **Diseño responsivo** y mobile-first
- ✅ **Testing completo** con Vitest (>80% cobertura)
- ✅ **Documentación** con VuePress

## 📋 Campos del Formulario

### Datos Personales
- **Nombre Completo**: Validación con regex `/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,50}$/`
- **NIF/NIE**: Formato español con validación de letra de control
- **Teléfono**: Formato español `/^[679][0-9]{8}$/`
- **Email**: Validación estándar de email

### Detalles del Evento
- **Tipo de Evento**: Select con opciones predefinidas
- **Fecha**: Entre 7 días y 1 año desde hoy
- **Hora**: Entre 08:00 y 23:00
- **Asistentes**: 10-500 personas (inputs sincronizados)

## 🛠️ Instalación y Uso

```bash
# Clonar el repositorio
git clone <repository-url>
cd evento-reservas

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Ejecutar tests
npm run test

# Tests con cobertura
npm run test:coverage

# Documentación
npm run docs:dev
npm run docs:build
```

## 🧪 Testing

El proyecto incluye tests completos con **Vitest**:

- **Validaciones**: Tests unitarios para todas las funciones de validación
- **Componentes**: Tests de integración para el formulario
- **Cobertura**: >80% en todas las métricas

```bash
# Ejecutar tests
npm run test

# Ver cobertura
npm run test:coverage
```

## 📚 Documentación

La documentación completa está disponible con **VuePress**:

```bash
# Ejecutar documentación en desarrollo
npm run docs:dev

# Construir documentación
npm run docs:build
```

## 🎨 Características de Accesibilidad

- **Navegación por teclado** completa
- **Atributos ARIA** apropiados
- **Mensajes de error** anunciados por lectores de pantalla
- **Contraste de colores** WCAG AA
- **Responsive design** para todos los dispositivos
- **Preferencias del usuario** (reduced motion, high contrast)

## 🏗️ Arquitectura

```
src/
├── components/
│   └── ReservaForm.vue      # Componente principal del formulario
├── types/
│   └── reserva.ts           # Tipos TypeScript
├── utils/
│   └── validation.ts        # Utilidades de validación
├── tests/
│   ├── validation.test.ts   # Tests de validación
│   └── ReservaForm.test.ts  # Tests del componente
├── App.vue                  # Componente raíz
├── main.ts                  # Punto de entrada
└── style.css               # Estilos globales
```

## 🔧 Tecnologías

- **Vue 3.4+** - Framework reactivo
- **TypeScript 5.2+** - Tipado estático
- **Vite 5.0+** - Build tool
- **Vitest 1.0+** - Framework de testing
- **VuePress 2.0+** - Generador de documentación
- **CSS3** - Estilos con variables personalizadas

## 📝 Buenas Prácticas Implementadas

1. **Código limpio y mantenible**
2. **Componentes pequeños y reutilizables**
3. **Separación de responsabilidades**
4. **Uso adecuado de TypeScript** (sin `any`)
5. **Comentarios en código complejo**
6. **Commits atómicos y descriptivos**
7. **Accesibilidad** (labels, aria-*, navegación por teclado)
8. **Responsive design**

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.
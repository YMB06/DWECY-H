# sorteonavidad1 — Documentación técnica

Proyecto: Sorteo de Navidad — Vue 3 + TypeScript + Vite

Este README combina: documentación técnica, diagrama de clases simplificado, descripción de tipos/interfaces y ejemplos de uso para la aplicación situada en `src/`.

## Contenido
- Descripción general
- Diagrama de clases (ASCII)
- Interfaces y tipos principales
- Decisiones de diseño
- Ejemplos de uso (TypeScript)
- Instrucciones de compilación y ejecución

---

## Descripción general

La aplicación gestiona participantes y un tablero de 100 casillas (números del 0 al 99). Cada participante puede reservar números, el tablero persiste su estado en `localStorage` y existen servicios para consultar estadísticas y determinar el ganador.

Carpetas clave:
- `src/models/` — modelos (Participante, TableroCasilla)
- `src/services/` — lógica de negocio y persistencia (ParticipanteService, TableroService, SorteoService, EstadisticasService)
- `src/components/` — componentes UI que consumen los servicios

## Diagrama de clases (ASCII)

El diagrama muestra relaciones principales (clase / funciones exportadas):

```
+----------------------+        uses         +-------------------------+
| Participante         |<-------------------| ParticipanteService     |
| - nombre:String      |                    | - agregarParticipante*  |
| - email:String       |                    | - obtenerParticipantes  |
| - telefono:String    |                    | - asignarNumero*        |
| - numeros: number[]  |  serializes to     +-------------------------+
+----------------------+  POJO (toJSON)

				 ^
				 | persisted in localStorage
				 |
----------------------+        manages        +------------------------+
| TableroCasilla       |<---------------------| Tablero (TableroService)|
| - numero: number     |                      | - reservarNumero*      |
| - reservado: boolean |                      | - liberarNumero*       |
| - participante?:str  |                      | - obtenerTablero       |
----------------------+                      +------------------------+

												used by
												 |
												 v
								+---------------------+
								| SorteoService       |
								| - determinarGanador |
								+---------------------+

								+----------------------+
								| EstadisticasService  |
								| - obtenerEstadisticas|
								| - obtenerNumerosPorParticipante|
								+----------------------+

---

## Interfaces y tipos principales

- `IParticipante` (en `src/models/Participante.ts`)
	- nombre: string
	- email: string
	- telefono: string
	- numeros: number[]

	La clase `Participante` implementa `IParticipante` y añade validaciones y utilidades:
	- `addNumero(num: number)` lanza `DuplicateError` si ya existe
	- `removeNumero(num: number)` elimina un número
	- `toJSON()` devuelve un POJO para persistencia

- `TableroCasilla` (en `src/models/TableroCasilla.ts`)
	- numero: number
	- reservado: boolean
	- participante?: string

- `ResultadoSorteo` (en `src/services/SorteoService.ts`)
	- ganador: any (POJO participante o null)
	- mensaje: string

- `Estadisticas` (en `src/services/EstadisticasService.ts`)
	- totalParticipantes: number
	- numerosOcupados: number
	- numerosLibres: number
	- porcentajeOcupado: number

Errores exportados relevantes:
- `ValidationError`, `DuplicateError` (Participante)
- `TableroError`, `RangeErrorTablero`, `AlreadyReservedError`, `NotReservedError` (Tablero)

---

## Decisiones de diseño

- Persistencia local: el estado de participantes y tablero se guarda en `localStorage` bajo claves separadas (`participantes_v2`, `tablero_v2`). Esto simplifica el desarrollo sin backend y permite una UX inmediata.
- Separación de responsabilidades: los `services` encapsulan la lógica, validaciones y persistencia; los `components` (UI) consumen estos servicios. Esto facilita testing unitario de la lógica sin montar la UI.
- API dual para componentes y programación:
	- Muchas operaciones disponen de una versión que devuelve `boolean` para facilitar integrarlas en la UI (no lanzar excepciones) y una versión `OrThrow` para flujos donde se desea capturar errores explícitamente.
- Validaciones en el modelo: la clase `Participante` valida nombre/email/teléfono en el constructor. Esto centraliza reglas y evita duplicación.
- Tablero como singleton: `Tablero` se instancia una vez (size=100 por defecto) y se exportan wrappers que lo usan. Evita inconsistencias entre varias instancias.
- Diseño simple y predecible: las funciones devuelven POJOs cuando el UI las consume (por ejemplo `obtenerParticipantes()`), evitando exponer instancias con métodos en las plantillas.

Consideraciones/limitaciones:
- El proyecto asume que `localStorage` está disponible (ej. navegador). Para migrar a servidor sería necesario extraer adaptadores de persistencia.
- La validación de email y teléfono es deliberadamente sencilla; puede mejorarse con reglas más estrictas si se desea.

---

## Ejemplos de uso (TypeScript)

Los ejemplos muestran el uso directo de los servicios en `src/services/*`. En componentes Vue normalmente se importan estas funciones y se enlazan a la UI.

Nota: los métodos terminados en `OrThrow` lanzan excepciones. Las versiones sin `OrThrow` devuelven `boolean`.

1) Agregar participante (manejo sencillo):

```ts
import { agregarParticipante } from './src/services/ParticipanteService';

const ok = agregarParticipante('María Pérez', 'maria@example.com', '+34 600 000 000');
if (!ok) {
	console.warn('No se pudo añadir el participante (duplicado o dato inválido)');
}
```

2) Agregar participante y controlar errores (programático):

```ts
import { agregarParticipanteOrThrow } from './src/services/ParticipanteService';

try {
	const p = agregarParticipanteOrThrow('Juan López', 'juan@example.com', '600123456');
	console.log('Participante creado:', p.toJSON());
} catch (e) {
	// Puede ser DuplicateError o ValidationError
	console.error('Error al crear participante:', e.message);
}
```

3) Reservar un número en el tablero (UI-friendly):

```ts
import { reservarNumero } from './src/services/TableroService';

const reservado = reservarNumero(42, 'María Pérez');
console.log(reservado ? 'Reservado' : 'No se pudo reservar');
```

4) Reservar con manejo de errores detallado:

```ts
import { reservarNumeroOrThrow } from './src/services/TableroService';

try {
	reservarNumeroOrThrow(42, 'María Pérez');
	console.log('Reserva OK');
} catch (e) {
	console.error('Error de reserva:', e.message);
}
```

5) Liberar número:

```ts
import { liberarNumeroTablero } from './src/services/TableroService';

liberarNumeroTablero(42);
```

6) Obtener estado del tablero y estadísticas:

```ts
import { obtenerTablero } from './src/services/TableroService';
import { obtenerEstadisticas, obtenerNumerosPorParticipante } from './src/services/EstadisticasService';

console.log('Tablero:', obtenerTablero());
console.log('Estadísticas:', obtenerEstadisticas());
console.log('Números de maria@example.com:', obtenerNumerosPorParticipante('maria@example.com'));
```

7) Determinar ganador a partir de los últimos dos dígitos:

```ts
import { determinarGanador } from './src/services/SorteoService';

const resultado = determinarGanador(42); // usa número entre 0..99
console.log(resultado.mensaje);
if (resultado.ganador) console.log('Ganador:', resultado.ganador);
```

Estos ejemplos cubren las funcionalidades principales: creación de participantes, asignación/liberación de números, consulta del tablero y estadísticas, y determinación de ganador.

---

## Instrucciones de compilación y ejecución

Requisitos: Node.js (versión moderna), npm.

Instalar dependencias:

```powershell
npm install
```

Desarrollo (servidor con hot-reload):

```powershell
npm run dev
```

Generar build de producción:

```powershell
npm run build
```

Previsualizar build:

```powershell
npm run preview
```

Ejecutar tests (Jest):

```powershell
npm test
```

Los scripts se corresponden con el `package.json` del proyecto:

- `dev` → `vite`
- `build` → `vite build`
- `preview` → `vite preview`
- `test` → `jest`


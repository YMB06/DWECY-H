# Tipos e Interfaces

## IAsignatura

```typescript
export interface IAsignatura {
  nombre: string;
  profesor: string;
  grupo: string;
}
```

## BloqueHorario

```typescript
export type BloqueHorario = IAsignatura | null;
```

## HorarioAula

```typescript
export type HorarioAula = BloqueHorario[][];
```

## HorariosData

```typescript
export type HorariosData = Record<string, HorarioAula>;
```
import type { calendarEvent } from "@/types/calendarEvent";

export const calendar: calendarEvent[] = [
  {
    date: new Date('2025-11-15'),
    title: 'Reunión con equipo de diseño',
    type: 'busy',
  },
  {
    date: new Date('2025-11-18'),
    title: 'Llamada con cliente internacional',
    type: 'tentative',
  },
  {
    date: new Date('2025-12-06'),
    title: 'Día de la Constitución (España)',
    type: 'holiday',
  },
  {
    date: new Date('2025-12-24'),
    title: 'Cena de Nochebuena',
    type: 'busy',
  },
  {
    date: new Date('2025-12-25'),
    title: 'Navidad',
    type: 'holiday',
  },
  {
    date: new Date('2026-01-01'),
    title: 'Año Nuevo',
    type: 'holiday',
  },
  {
    date: new Date('2026-01-03'),
    title: 'Planificación Q1',
    type: 'tentative',
  },
  {
    date: new Date('2026-01-06'),
    title: 'Día de Reyes',
    type: 'holiday',
  }
];


export interface calendarEvent {
date: Date;
title: string;
type: 'busy' | 'tentative' | 'holiday'; // Para estilado condicional
}
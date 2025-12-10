import type { INotifier } from './INotifier';

export class EmailNotifier implements INotifier {
  send(message: string): void {
    console.log(`[EMAIL] Enviando correo con el cuerpo: "${message}"`);
  }
}
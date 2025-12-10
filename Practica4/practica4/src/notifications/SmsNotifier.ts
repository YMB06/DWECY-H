import type { INotifier } from './INotifier';

export class SmsNotifier implements INotifier {
  send(message: string): void {
    console.log(`[SMS] Enviando mensaje de texto: "${message}"`);
  }
}
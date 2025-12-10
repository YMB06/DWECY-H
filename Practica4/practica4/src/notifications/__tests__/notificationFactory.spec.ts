import { describe, it, expect } from 'vitest';
import { notificationFactory } from '../notificationFactory';
import { EmailNotifier } from '../EmailNotifier';
import { SmsNotifier } from '../SmsNotifier';
import { PushNotifier } from '../PushNotifier';

describe('notificationFactory', () => {
  it('Test 1: Factoría de Email', () => {
    const notifier = notificationFactory('email');
    expect(notifier).toBeInstanceOf(EmailNotifier);
  });

  it('Test 2: Factoría de SMS', () => {
    const notifier = notificationFactory('sms');
    expect(notifier).toBeInstanceOf(SmsNotifier);
  });

  it('Test 3: Factoría de Push', () => {
    const notifier = notificationFactory('push');
    expect(notifier).toBeInstanceOf(PushNotifier);
  });

  it('Test 4: Error en tipo inválido', () => {
    expect(() => notificationFactory('telegram' as any)).toThrow();
    expect(() => notificationFactory('whatsapp' as any)).toThrow('Tipo de notificación no soportado');
  });
});
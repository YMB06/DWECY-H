import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useToastStore } from '../stores/toast';

describe('Toast Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should initialize with empty toasts', () => {
    const toastStore = useToastStore();
    expect(toastStore.toasts).toEqual([]);
  });

  it('should add a toast', () => {
    const toastStore = useToastStore();

    toastStore.addToast('Test message', 'success');

    expect(toastStore.toasts).toHaveLength(1);
    expect(toastStore.toasts[0].message).toBe('Test message');
    expect(toastStore.toasts[0].type).toBe('success');
  });

  it('should add multiple toasts', () => {
    const toastStore = useToastStore();

    toastStore.addToast('Message 1', 'success');
    toastStore.addToast('Message 2', 'error');

    expect(toastStore.toasts).toHaveLength(2);
  });

  it('should remove a toast', () => {
    const toastStore = useToastStore();

    const id = toastStore.addToast('Test message', 'info');
    expect(toastStore.toasts).toHaveLength(1);

    toastStore.removeToast(id);
    expect(toastStore.toasts).toHaveLength(0);
  });

  it('should clear all toasts', () => {
    const toastStore = useToastStore();

    toastStore.addToast('Message 1', 'success');
    toastStore.addToast('Message 2', 'error');

    expect(toastStore.toasts).toHaveLength(2);

    toastStore.clearAll();
    expect(toastStore.toasts).toHaveLength(0);
  });

  it('should handle toast with default duration', () => {
    const toastStore = useToastStore();

    const id = toastStore.addToast('Test', 'info');
    const toast = toastStore.toasts[0];

    expect(toast.duration).toBe(3000);
  });

  it('should handle toast types correctly', () => {
    const toastStore = useToastStore();

    toastStore.addToast('Success message', 'success');
    toastStore.addToast('Error message', 'error');
    toastStore.addToast('Warning message', 'warning');
    toastStore.addToast('Info message', 'info');

    expect(toastStore.toasts[0].type).toBe('success');
    expect(toastStore.toasts[1].type).toBe('error');
    expect(toastStore.toasts[2].type).toBe('warning');
    expect(toastStore.toasts[3].type).toBe('info');
  });
});

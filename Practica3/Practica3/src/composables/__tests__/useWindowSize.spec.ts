import { describe, it, expect, beforeEach } from 'vitest';
import { useWindowSize } from '../useWindowSize';

describe('useWindowSize', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 768,
    });
  });

  it('establece valores iniciales correctamente', () => {
    const { width, height } = useWindowSize();
    
    expect(width.value).toBe(1024);
    expect(height.value).toBe(768);
  });

  it('actualiza valores al redimensionar ventana', () => {
    const { width, height } = useWindowSize();
    
    window.innerWidth = 1920;
    window.innerHeight = 1080;
    window.dispatchEvent(new Event('resize'));
    
    expect(width.value).toBe(1920);
    expect(height.value).toBe(1080);
  });
});
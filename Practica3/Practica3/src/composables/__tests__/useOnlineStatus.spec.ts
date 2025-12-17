import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useOnlineStatus } from '../useOnlineStatus';

describe('useOnlineStatus', () => {
  it('estado inicial online', () => {
    vi.spyOn(navigator, 'onLine', 'get').mockReturnValue(true);
    
    const { isOnline } = useOnlineStatus();
    
    expect(isOnline.value).toBe(true);
  });

  it('estado inicial offline', () => {
    vi.spyOn(navigator, 'onLine', 'get').mockReturnValue(false);
    
    const { isOnline } = useOnlineStatus();
    
    expect(isOnline.value).toBe(false);
  });

  it('reactividad a eventos de conexión', () => {
    vi.spyOn(navigator, 'onLine', 'get').mockReturnValue(true);
    
    const { isOnline } = useOnlineStatus();
    
    expect(isOnline.value).toBe(true);
    
    window.dispatchEvent(new Event('offline'));
    expect(isOnline.value).toBe(false);
    
    window.dispatchEvent(new Event('online'));
    expect(isOnline.value).toBe(true);
  });
});
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AppConfig } from '../AppConfig';

describe('AppConfig', () => {
  beforeEach(() => {
    localStorage.clear();
    (AppConfig as any).instance = undefined;
  });

  it('Test de Unicidad (Singleton)', () => {
    const instancia1 = AppConfig.getInstance();
    const instancia2 = AppConfig.getInstance();
    
    expect(instancia1).toBe(instancia2);
  });

  it('Test de Modificación de Estado', () => {
    const config = AppConfig.getInstance();
    
    config.setTheme('dark');
    
    expect(config.getSettings().value.theme).toBe('dark');
  });

  it('Test de Persistencia', () => {
    const spy = vi.spyOn(localStorage, 'setItem');
    const config = AppConfig.getInstance();
    
    config.setLanguage('fr');
    
    expect(spy).toHaveBeenCalledWith('app-config', JSON.stringify({
      theme: 'light',
      language: 'fr',
      fontSize: 'medium',
      fontFamily: 'Verdana'
    }));
  });

  it('Test de carga desde localStorage', () => {
    const savedConfig = {
      theme: 'dark',
      language: 'en',
      fontSize: 'large',
      fontFamily: 'Arial'
    };
    localStorage.setItem('app-config', JSON.stringify(savedConfig));
    
    const config = AppConfig.getInstance();
    
    expect(config.getSettings().value).toEqual(savedConfig);
  });

  it('Test de todos los setters', () => {
    const config = AppConfig.getInstance();
    
    config.setTheme('dark');
    config.setLanguage('en');
    config.setFontSize('large');
    config.setFontFamily('Arial');
    
    const settings = config.getSettings().value;
    expect(settings.theme).toBe('dark');
    expect(settings.language).toBe('en');
    expect(settings.fontSize).toBe('large');
    expect(settings.fontFamily).toBe('Arial');
  });
});
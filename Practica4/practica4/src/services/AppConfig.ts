import { ref, readonly, type DeepReadonly, type Ref } from 'vue';
import type { IAppSettings } from '@/types/4-4/config';

export class AppConfig {
  private static instance: AppConfig;
  private readonly _settings: Ref<IAppSettings>;

  private constructor() {
    const savedSettings = localStorage.getItem('app-config');
    const defaultSettings: IAppSettings = {
      theme: 'light',
      language: 'es',
      fontSize: 'medium',
      fontFamily: 'Verdana',
    };

    this._settings = ref(savedSettings ? JSON.parse(savedSettings) : defaultSettings);
  }

  public static getInstance(): AppConfig {
    if (!AppConfig.instance) {
      AppConfig.instance = new AppConfig();
    }
    return AppConfig.instance;
  }

  public getSettings(): DeepReadonly<Ref<IAppSettings>> {
    return readonly(this._settings);
  }

  public setTheme(theme: IAppSettings['theme']): void {
    this._settings.value.theme = theme;
    this.saveToLocalStorage();
  }

  public setLanguage(lang: IAppSettings['language']): void {
    this._settings.value.language = lang;
    this.saveToLocalStorage();
  }

  public setFontSize(size: IAppSettings['fontSize']): void {
    this._settings.value.fontSize = size;
    this.saveToLocalStorage();
  }

  public setFontFamily(family: IAppSettings['fontFamily']): void {
    this._settings.value.fontFamily = family;
    this.saveToLocalStorage();
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('app-config', JSON.stringify(this._settings.value));
  }
}
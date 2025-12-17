import { describe, it, expect } from 'vitest';
import { useCurrencyFormatter } from '../useCurrencyFormatter';

describe('useCurrencyFormatter', () => {
  it('formatea correctamente diferentes divisas y locales', () => {
    const { formatCurrency } = useCurrencyFormatter();
    
    expect(formatCurrency(12345.67, 'en-US', 'USD')).toBe('$12,345.67');
    expect(formatCurrency(12345.67, 'de-DE', 'EUR')).toBe('12.345,67 €');
    expect(formatCurrency(5000, 'ja-JP', 'JPY')).toBe('￥5,000');
  });
});
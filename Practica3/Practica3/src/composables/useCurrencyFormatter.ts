export function useCurrencyFormatter() {
  function formatCurrency(amount: number, locale: string, currencyCode: string): string {
    return new Intl.NumberFormat(locale, { 
      style: 'currency', 
      currency: currencyCode 
    }).format(amount);
  }

  return {
    formatCurrency
  };
}
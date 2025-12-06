import { describe, it, expect } from 'vitest';
import { Pila } from '../Pila';

describe('Pila', () => {
  it('push y pop siguen el orden LIFO', () => {
    const pila = new Pila<number>();
    
    pila.push(1);
    pila.push(2);
    pila.push(3);
    
    expect(pila.pop()).toBe(3);
    expect(pila.pop()).toBe(2);
    expect(pila.pop()).toBe(1);
  });

  it('peek devuelve el elemento superior sin eliminarlo', () => {
    const pila = new Pila<string>();
    
    pila.push('A');
    pila.push('B');
    
    expect(pila.peek()).toBe('B');
    expect(pila.size()).toBe(2);
    expect(pila.peek()).toBe('B');
  });

  it('isEmpty y size funcionan correctamente', () => {
    const pila = new Pila<number>();
    
    expect(pila.isEmpty()).toBe(true);
    expect(pila.size()).toBe(0);
    
    pila.push(10);
    expect(pila.isEmpty()).toBe(false);
    expect(pila.size()).toBe(1);
    
    pila.push(20);
    expect(pila.size()).toBe(2);
    
    pila.pop();
    expect(pila.size()).toBe(1);
    
    pila.pop();
    expect(pila.isEmpty()).toBe(true);
  });
});

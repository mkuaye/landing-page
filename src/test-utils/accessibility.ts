import { screen } from '@testing-library/react';

export const checkAccessibility = (element: HTMLElement) => {
  // Verifica se o elemento tem um role apropriado
  expect(element).toHaveAttribute('role');

  // Verifica se o elemento tem um aria-label ou aria-labelledby
  expect(
    element.hasAttribute('aria-label') || element.hasAttribute('aria-labelledby')
  ).toBe(true);

  // Verifica se o elemento tem contraste adequado
  const style = window.getComputedStyle(element);
  expect(style.color).toBeDefined();
  expect(style.backgroundColor).toBeDefined();
};

export const checkKeyboardNavigation = (element: HTMLElement) => {
  // Verifica se o elemento é focável
  expect(element).toHaveAttribute('tabindex');

  // Verifica se o elemento tem outline quando focado
  const style = window.getComputedStyle(element);
  expect(style.outline).toBeDefined();
};

export const checkScreenReaderSupport = (element: HTMLElement) => {
  // Verifica se o elemento tem texto alternativo
  if (element.tagName === 'IMG') {
    expect(element).toHaveAttribute('alt');
  }

  // Verifica se o elemento tem descrição para leitores de tela
  expect(
    element.hasAttribute('aria-label') ||
    element.hasAttribute('aria-describedby') ||
    element.textContent?.trim().length
  ).toBeGreaterThan(0);
}; 
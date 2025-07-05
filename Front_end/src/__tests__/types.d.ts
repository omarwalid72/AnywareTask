/// <reference types="jest" />
/// <reference types="@testing-library/jest-native" />

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeOnTheScreen(): R;
      toHaveDisplayValue(value: string): R;
      toHaveStyle(style: object): R;
      toBeEnabled(): R;
      toBeDisabled(): R;
    }
  }
}

export {};

export const colors = {
  surface: '#100b1b',
  surfaceContainer: '#1c162a',
  surfaceContainerHigh: '#231c32',
  surfaceBright: '#302841',
  onSurface: '#ece1f9',
  onSurfaceVariant: '#b0a7be',
  primary: '#c59aff',
  primaryDim: '#9547f7',
  secondary: '#00e3fd',
  tertiary: '#ff6f7c',
  border: '#231c32',
  white: '#ffffff',
} as const;

export type ColorKey = keyof typeof colors;

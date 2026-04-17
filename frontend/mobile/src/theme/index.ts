export const colors = {
  surface: "#100b1b",
  surfaceContainer: "#1c162a",
  surfaceContainerHigh: "#231c32",
  surfaceBright: "#302841",
  onSurface: "#ece1f9",
  onSurfaceVariant: "#b0a7be",
  primary: "#c59aff",
  primaryDim: "#9547f7",
  secondary: "#00e3fd",
  tertiary: "#ff6f7c",
  border: "#231c32",
  white: "#ffffff",
} as const;

export const color_stats = {
  vitality: {
    lightest: "#ffebee",
    veryLight: "#ffcdd2",
    lighter: "#ef9a9a",
    light: "#e57373",
    mediumLight: "#ef5350",
    base: "#f44336", // Pleasant red
    mediumDark: "#e53935",
    dark: "#d32f2f",
    darker: "#c62828",
    darkest: "#b71c1c",
    background: "#000000",
  },
  focus: {
    lightest: "#fff3e0",
    veryLight: "#ffe0b2",
    lighter: "#ffcc80",
    light: "#ffb74d",
    mediumLight: "#ffa726",
    base: "#ff9800", // Monochromatic orange
    mediumDark: "#fb8c00",
    dark: "#f57c00",
    darker: "#ef6c00",
    darkest: "#e65100",
    background: "#000000",
  },
  intelligence: {
    lightest: "#e8f5e9",
    veryLight: "#c8e6c9",
    lighter: "#a5d6a7",
    light: "#81c784",
    mediumLight: "#66bb6a",
    base: "#4caf50", // Monochromatic green
    mediumDark: "#43a047",
    dark: "#388e3c",
    darker: "#2e7d32",
    darkest: "#1b5e20",
    background: "#000000",
  },
  spirit: {
    lightest: "#e3f2fd",
    veryLight: "#bbdefb",
    lighter: "#90caf9",
    light: "#64b5f6",
    mediumLight: "#42a5f5",
    base: "#2196f3", // Monochromatic blue
    mediumDark: "#1e88e5",
    dark: "#1976d2",
    darker: "#1565c0",
    darkest: "#0d47a1",
    background: "#000000",
  },
  charisma: {
    lightest: "#e0f2f1",
    veryLight: "#b2dfdb",
    lighter: "#80cbc4",
    light: "#4db6ac",
    mediumLight: "#26a69a",
    base: "#009688", // Monochromatic teal/green to differentiate from intelligence
    mediumDark: "#00897b",
    dark: "#00796b",
    darker: "#00695c",
    darkest: "#004d40",
    background: "#000000",
  },
} as const;

export type ColorKey = keyof typeof colors;

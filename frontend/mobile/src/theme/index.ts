import { Book } from "lucide-react-native";
import {
  Focus,
  MessageSquare,
  Shield,
  Sparkles,
} from "lucide-react-native/icons";
import { ViewStyle } from "react-native";

/**
 * Standard Tailwind-like color scale
 */
export type ColorScale = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string; // Base
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
  background: string;
};

/**
 * Semantic Theme definition
 * Maps specific UI roles to colors
 */

// --- Data Structures ---

export const skills: Record<string, any> = {
  vitality: {
    palette: {
      50: "#ffebee",
      100: "#ffcdd2",
      200: "#ef9a9a",
      300: "#e57373",
      400: "#ef5350",
      500: "#f44336",
      600: "#e53935",
      700: "#d32f2f",
      800: "#c62828",
      900: "#b71c1c",
      950: "#7f1d1d",
    },
    background: "#000000",
    icon: Shield,
  },
  focus: {
    palette: {
      50: "#fff3e0",
      100: "#ffe0b2",
      200: "#ffcc80",
      300: "#ffb74d",
      400: "#ffa726",
      500: "#ff9800",
      600: "#fb8c00",
      700: "#f57c00",
      800: "#ef6c00",
      900: "#e65100",
      950: "#7c2d12",
    },
    background: "#000000",
    icon: Focus,
  },
  intelligence: {
    palette: {
      50: "#e8f5e9",
      100: "#c8e6c9",
      200: "#a5d6a7",
      300: "#81c784",
      400: "#66bb6a",
      500: "#4caf50",
      600: "#43a047",
      700: "#388e3c",
      800: "#2e7d32",
      900: "#1b5e20",
      950: "#064e3b",
    },
    background: "#000000",
    icon: Book,
  },
  spirit: {
    palette: {
      50: "#e3f2fd",
      100: "#bbdefb",
      200: "#90caf9",
      300: "#64b5f6",
      400: "#42a5f5",
      500: "#2196f3",
      600: "#1e88e5",
      700: "#1976d2",
      800: "#1565c0",
      900: "#0d47a1",
      950: "#1e3a8a",
    },
    background: "#000000",
    icon: Sparkles,
  },
  charisma: {
    palette: {
      50: "#e0f2f1",
      100: "#b2dfdb",
      200: "#80cbc4",
      300: "#4db6ac",
      400: "#26a69a",
      500: "#009688",
      600: "#00897b",
      700: "#00796b",
      800: "#00695c",
      900: "#004d40",
      950: "#042f2e",
    },
    background: "#000000",
    icon: MessageSquare,
  },
};

export const appTheme = {
  colors: {
    surface: {
      main: "#100b1b",
      container: "#1c162a",
      containerHigh: "#231c32",
      bright: "#302841",
      glow: "rgba(197, 154, 255, 0.15)", // Libertic addition: Primary glow
      background: "#000000",
    },
    content: {
      base: "#ece1f9",
      variant: "#b0a7be",
      white: "#ffffff",
    },
    primary: "#c59aff",
    primaryDim: "#9547f7",
    secondary: "#00e3fd",
    tertiary: "#ff6f7c",
    border: "#231c32",
    background: "#000000",
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },

  textVariants: {
    heading1: {
      fontSize: 32,
      fontWeight: "bold",
      lineHeight: 40,
    },
    heading2: {
      fontSize: 24,
      fontWeight: "bold",
      lineHeight: 32,
    },
    body: {
      fontSize: 16,
      fontWeight: "normal",
      lineHeight: 24,
    },
    label: {
      fontSize: 12,
      fontWeight: "600",
      textTransform: "uppercase" as const,
      letterSpacing: 0.5,
    },
  },
} as const;

// Optional: Extract the type from the object so you don't have to write the interface manually

export interface CardTheme {
  background: string;
  border: string;
  padding: number; // CHANGED: Must be a number in RN
  shadow: ViewStyle; // CHANGED: Using RN's style object
  glowColor: string;
  surface: string;
  surfaceBright: string;
  foreground: string;
  surfaceContainerHigh: string;
}

export const cardTheme = {
  from: (palette: ColorScale): CardTheme => {
    return {
      background: palette.background, // Keep a constant dark background
      border: palette[800], // Use a dark shade for the border
      padding: 1.5,
      shadow: {
        shadowColor: palette[950],
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8,
      },
      glowColor: palette[500], // The "pop" color
      surfaceBright: palette[200],
      surface: palette[400],
      foreground: "#ffffff",
      surfaceContainerHigh: palette[300],
    };
  },
};

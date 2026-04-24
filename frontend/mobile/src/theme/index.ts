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
    // Monochromatic Red
    palette: {
      50: "#fef2f2",
      100: "#fee2e2",
      200: "#fecaca",
      300: "#fca5a5",
      400: "#f87171",
      500: "#ef4444",
      600: "#dc2626",
      700: "#b91c1c",
      800: "#991b1b",
      900: "#7f1d1d",
      950: "#450a0a",
    },
    background: "#000000",
    icon: Shield,
  },
  focus: {
    // Monochromatic Orange
    palette: {
      50: "#fff7ed",
      100: "#ffedd5",
      200: "#fed7aa",
      300: "#fdba74",
      400: "#fb923c",
      500: "#f97316",
      600: "#ea580c",
      700: "#c2410c",
      800: "#9a3412",
      900: "#7c2d12",
      950: "#431407",
    },
    background: "#000000",
    icon: Focus,
  },
  intelligence: {
    // Monochromatic Purple
    palette: {
      50: "#faf5ff",
      100: "#f3e8ff",
      200: "#e9d5ff",
      300: "#d8b4fe",
      400: "#c084fc",
      500: "#a855f7",
      600: "#9333ea",
      700: "#7e22ce",
      800: "#6b21a8",
      900: "#581c87",
      950: "#3b0764",
    },
    background: "#000000",
    icon: Book,
  },
  spirit: {
    // Monochromatic Blue
    palette: {
      50: "#eff6ff",
      100: "#dbeafe",
      200: "#bfdbfe",
      300: "#93c5fd",
      400: "#60a5fa",
      500: "#3b82f6",
      600: "#2563eb",
      700: "#1d4ed8",
      800: "#1e40af",
      900: "#1e3a8a",
      950: "#172554",
    },
    background: "#000000",
    icon: Sparkles,
  },
  charisma: {
    // Monochromatic Green
    palette: {
      50: "#f0fdf4",
      100: "#dcfce7",
      200: "#bbf7d0",
      300: "#86efac",
      400: "#4ade80",
      500: "#22c55e",
      600: "#16a34a",
      700: "#15803d",
      800: "#166534",
      900: "#14532d",
      950: "#052e16",
    },
    background: "#000000",
    icon: MessageSquare,
  },
};

// ... (keep your skills and ColorScale types)

export const appTheme = {
  colors: {
    surface: {
      main: "#1a1429",
      container: "#231c35",
      containerHigh: "#2d2542",
      bright: "#3d3456",
      glow: "rgba(197, 154, 255, 0.15)",
      onSurface: "#ece1f9",
      onSurfaceVariant: "#b0a7be",
    },
    primary: "#c59aff",
    primaryDim: "#9547f7",
    secondary: "#00e3fd",
    tertiary: "#ff6f7c",
    border: "#2d2542",
    background: "#0f0a1a",

    quest: {
      background: "#0f0a1a",
      surface: "#1c162a",
      surfaceHigh: "#231c32",
      fabGradient: ["#c59aff", "#9547f7"],
      accent: skills.vitality.palette[500],
      accentLight: skills.vitality.palette[400],
      accentDark: skills.vitality.palette[800],
      accentDeep: skills.vitality.palette[950],
      accentGlow: skills.vitality.palette[500] + "4D",
      textMuted: skills.vitality.palette[300],
    },
    battle: {
      nodeActive: "#c59aff",
      nodeLocked: "#4b4558",
      nodeAvailable: "#ff6f7c",
      lineActive: "#00e3fd",
      lineInactive: "rgba(197, 154, 255, 0.2)",
      bg: "#100b1b",
      surface: "#1c162a",
    },

    map: {
      parchment: "#d1b894", // Aged parchment base
      parchmentDark: "#bca67d",
      leyLineStart: "#00e3fd", // Secondary
      leyLineEnd: "#c59aff", // Primary
      nodeLocked: "#7a7287",
      nodeActive: "#c59aff",
      nodeCompleted: "#00e3fd",
    },
  },

  // 1. SPACING SCALE (The 8px Grid System)
  // Use these instead of hardcoded numbers like padding: 17
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    page: 20, // Standard screen gutter
  },

  // 2. BORDER RADIUS PRESETS
  // Ensures consistency across the app
  radius: {
    rigid: 4, // For bars, small buttons
    soft: 12, // For standard cards
    glass: 24, // For the "floating" glass cards
    pill: 999, // For avatars, FABs, badges
  },

  // 3. TYPOGRAPHY SYSTEM
  // This removes the need to define fontSize/fontWeight in every component
  typography: {
    display: {
      fontSize: 32,
      fontWeight: "900" as const,
      letterSpacing: 2,
      textTransform: "uppercase" as const,
    },
    h1: {
      fontSize: 24,
      fontWeight: "800" as const,
      letterSpacing: 1,
      textTransform: "uppercase" as const,
    },
    h2: {
      fontSize: 18,
      fontWeight: "700" as const,
      letterSpacing: 0.5,
    },
    body: {
      fontSize: 14,
      fontWeight: "400" as const,
      lineHeight: 20,
    },
    label: {
      fontSize: 10,
      fontWeight: "800" as const,
      letterSpacing: 1.5,
      textTransform: "uppercase" as const,
    },
    stat: {
      fontSize: 28,
      fontWeight: "900" as const,
      fontStyle: "italic" as const,
    },
    caption: {
      fontSize: 11,
      fontWeight: "500" as const,
      opacity: 0.7,
    },
  },
} as const;

// Helper type for TypeScript autocomplete
export type AppTheme = typeof appTheme;
// Optional: Extract the type from the object so you don't have to write the interface manually
export interface CardTheme {
  background: string;
  border: string;
  padding: number;
  shadow: any;
  glowColor: string;
  surface: string;
  surfaceBright: string;
  surfaceChartTop: string; // New: Darker top half
  surfaceChartBottom: string; // New: Brighter bottom half
  chartDivider: string; // New: The dividing line color
  foreground: string;
  onSurface: string;
}
export const cardTheme = {
  from: (category: any): CardTheme => {
    const scale = category.palette;

    return {
      background: appTheme.colors.background,
      border: scale[500],
      padding: 1.5,
      shadow: {
        shadowColor: scale[500],
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25, // Softer glow
        shadowRadius: 15,
        elevation: 8,
      },
      glowColor: scale[500],

      // BLENDING: Use a color that is almost the background,
      // but we will add transparency in the style sheet.
      surface: "#1a1429",
      surfaceBright: scale[800],
      surfaceChartTop: "#1c172e",
      surfaceChartBottom: "#251e3d",
      chartDivider: scale[600],

      onSurface: scale[300],
      foreground: scale[100],
    };
  },
};

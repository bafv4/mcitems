import type { DefineComponent } from 'vue';

export interface MinecraftItemIconProps {
  /** Minecraft item ID (e.g., "minecraft:diamond_sword") */
  itemId: string;
  /** Icon size in pixels (default: 48) */
  size?: number;
  /** NBT data for special items like potions */
  nbtData?: { Potion?: string };
  /** Base URL for textures (default: "") */
  textureBaseUrl?: string;
  /** Show fallback on error (default: true) */
  showFallbackOnError?: boolean;
  /** Additional CSS class */
  class?: string;
}

export declare const MinecraftItemIcon: DefineComponent<MinecraftItemIconProps>;

// Re-export all core functionality
export * from './core';

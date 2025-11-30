// Core exports for Minecraft 1.16 - no framework dependencies

// Re-export shared types
export type {
  ItemCategory,
  MinecraftItem,
  NBTItem,
  Enchantment,
  CategoryDefinition,
} from '../../shared/types';

// Re-export item data
export {
  MINECRAFT_ITEMS,
  getAllItems,
  getItemsByCategory,
  ITEM_CATEGORIES,
  getCraftableItems,
  getCraftableItemsByCategory,
  POTION_VARIANTS,
} from './items';

// Re-export potion effects
export {
  POTION_EFFECTS,
  getPotionEffectInfo,
  formatPotionName,
  formatPotionEffect,
  getPotionTextureVariant,
  POTION_EFFECT_TO_TEXTURE,
} from './potionEffects';
export type { PotionEffectInfo } from './potionEffects';

// Re-export translations
export { getItemNameJa } from './translations';

// Additional utilities for item searching and formatting
import { getAllItems } from './items';
import { getItemNameJa } from './translations';
import { getPotionTextureVariant, getPotionEffectInfo, formatPotionName } from './potionEffects';

/**
 * Minecraft version for this module
 */
export const MINECRAFT_VERSION = '1.16';

/**
 * Texture path pattern for this version
 */
export const TEXTURE_PATH = '1.16.1/items';

/**
 * Parse potion item ID with effect (e.g., "minecraft:potion.fire_resistance")
 * Returns the base item ID and the potion effect
 */
export function parsePotionItemId(itemId: string): { baseId: string; potionEffect?: string } {
  // Check if the item ID contains a potion effect suffix
  const potionTypes = ['potion', 'splash_potion', 'lingering_potion'];

  for (const potionType of potionTypes) {
    const prefix = `minecraft:${potionType}.`;
    if (itemId.startsWith(prefix)) {
      const effect = itemId.slice(prefix.length);
      return {
        baseId: `minecraft:${potionType}`,
        potionEffect: `minecraft:${effect}`,
      };
    }
  }

  return { baseId: itemId };
}

/**
 * Search items by ID or name
 */
export function searchItems(query: string): string[] {
  if (!query) return getAllItems();
  const lowerQuery = query.toLowerCase();

  return getAllItems().filter((item: string) => {
    if (item.toLowerCase().includes(lowerQuery)) {
      return true;
    }

    const itemName = item.replace(/^minecraft:/, '');
    if (itemName.toLowerCase().includes(lowerQuery)) {
      return true;
    }

    // Also search by formatted name
    const formattedName = formatItemName(item);
    if (formattedName.toLowerCase().includes(lowerQuery)) {
      return true;
    }

    return false;
  });
}

/**
 * Format item ID to display name (Japanese preferred)
 */
export function formatItemName(itemId: string): string {
  // Handle potion variant IDs (e.g., "minecraft:potion.fire_resistance")
  const { baseId, potionEffect } = parsePotionItemId(itemId);

  if (potionEffect) {
    // Use formatPotionName for potion variants
    return formatPotionName(baseId, potionEffect);
  }

  const jaName = getItemNameJa(itemId);
  if (jaName) {
    return jaName;
  }

  return itemId
    .replace('minecraft:', '')
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Get the texture URL for a Minecraft item
 */
export function getTextureUrl(
  itemId: string,
  nbtData?: { Potion?: string },
  baseUrl: string = ''
): string {
  // Parse potion item ID with effect suffix
  const { baseId, potionEffect: parsedPotionEffect } = parsePotionItemId(itemId);
  let normalizedId = baseId;

  // Handle special cases
  if (baseId === 'minecraft:shulker_box') {
    normalizedId = 'minecraft:purple_shulker_box';
  }

  // Handle potions with effect variants
  if (
    baseId === 'minecraft:potion' ||
    baseId === 'minecraft:splash_potion' ||
    baseId === 'minecraft:lingering_potion'
  ) {
    // Use parsed effect from item ID, or fall back to nbtData
    const potionEffect = parsedPotionEffect || nbtData?.Potion;
    const variant = getPotionTextureVariant(potionEffect);

    if (variant) {
      const itemName = baseId.replace('minecraft:', '');
      normalizedId = `minecraft:${itemName}_${variant}`;
    }
  }

  const fileName = normalizedId.replace('minecraft:', 'minecraft_');
  return `${baseUrl}/${TEXTURE_PATH}/${fileName}.png`;
}

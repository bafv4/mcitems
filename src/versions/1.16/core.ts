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
import { getPotionTextureVariant } from './potionEffects';

/**
 * Minecraft version for this module
 */
export const MINECRAFT_VERSION = '1.16';

/**
 * Texture path pattern for this version
 */
export const TEXTURE_PATH = '1.16.1/items';

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

    return false;
  });
}

/**
 * Format item ID to display name (Japanese preferred)
 */
export function formatItemName(itemId: string): string {
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
  let normalizedId = itemId;

  // Handle special cases
  if (itemId === 'minecraft:shulker_box') {
    normalizedId = 'minecraft:purple_shulker_box';
  }

  // Handle potions with effect variants
  if (
    itemId === 'minecraft:potion' ||
    itemId === 'minecraft:splash_potion' ||
    itemId === 'minecraft:lingering_potion'
  ) {
    const potionEffect = nbtData?.Potion;
    const variant = getPotionTextureVariant(potionEffect);

    if (variant) {
      const itemName = itemId.replace('minecraft:', '');
      normalizedId = `minecraft:${itemName}_${variant}`;
    }
  }

  const fileName = normalizedId.replace('minecraft:', 'minecraft_');
  return `${baseUrl}/${TEXTURE_PATH}/${fileName}.png`;
}

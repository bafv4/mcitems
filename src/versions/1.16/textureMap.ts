// Texture utilities for Minecraft items
// Textures are loaded dynamically from the assets folder

/**
 * Get the texture URL for a Minecraft item
 * @param itemId - The item ID (e.g., "minecraft:diamond_sword")
 * @param baseUrl - Base URL for textures (default: '')
 * @returns The texture URL
 */
export function getTextureUrl(itemId: string, baseUrl: string = ''): string {
  const normalizedId = itemId.replace('minecraft:', 'minecraft_');
  return `${baseUrl}/1.16.1/items/${normalizedId}.png`;
}

/**
 * Get texture path for an item
 * @param itemId - The item ID
 * @returns The texture path
 */
export function getTexturePath(itemId: string): string {
  const normalizedId = itemId.replace('minecraft:', 'minecraft_');
  return `/1.16.1/items/${normalizedId}.png`;
}

// For backward compatibility
export const textureMap: Record<string, string> = {};

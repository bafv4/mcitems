// Shared utility functions for MinecraftItemIcon component

/**
 * Generate a unique color for an item based on its ID
 */
export function getItemColor(itemId: string): string {
  const itemName = itemId.replace(/^minecraft:/, '');

  // Fire Resistance potion color (pink) for all potions
  if (itemName.includes('potion')) {
    return 'hsl(330, 81%, 66%)';
  }

  // Hash the item name to get a consistent color
  let hash = 0;
  for (let i = 0; i < itemName.length; i++) {
    hash = itemName.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue = Math.abs(hash % 360);
  return `hsl(${hue}, 65%, 55%)`;
}

/**
 * Get emoji icon based on item category
 */
export function getItemEmoji(itemId: string): string {
  const itemName = itemId.replace(/^minecraft:/, '');

  // Tools
  if (itemName.includes('pickaxe')) return '⛏️';
  if (itemName.includes('axe')) return '🪓';
  if (itemName.includes('shovel')) return '🏗️';
  if (itemName.includes('hoe')) return '🌾';
  if (itemName.includes('sword')) return '⚔️';

  // Armor
  if (itemName.includes('helmet')) return '🪖';
  if (itemName.includes('chestplate')) return '🦺';
  if (itemName.includes('leggings')) return '👖';
  if (itemName.includes('boots')) return '👢';

  // Food
  if (itemName.includes('apple')) return '🍎';
  if (itemName.includes('bread')) return '🍞';
  if (
    itemName.includes('meat') ||
    itemName.includes('beef') ||
    itemName.includes('porkchop')
  )
    return '🍖';
  if (
    itemName.includes('fish') ||
    itemName.includes('cod') ||
    itemName.includes('salmon')
  )
    return '🐟';
  if (itemName.includes('carrot')) return '🥕';
  if (itemName.includes('potato')) return '🥔';

  // Blocks
  if (itemName.includes('stone') || itemName.includes('cobblestone'))
    return '🪨';
  if (
    itemName.includes('wood') ||
    itemName.includes('log') ||
    itemName.includes('planks')
  )
    return '🪵';
  if (itemName.includes('glass')) return '🔲';
  if (itemName.includes('dirt') || itemName.includes('grass')) return '🟫';
  if (itemName.includes('wool')) return '🧶';
  if (itemName.includes('iron_bars')) return '🔒';

  // Items
  if (itemName.includes('diamond')) return '💎';
  if (itemName.includes('emerald')) return '💚';
  if (itemName.includes('gold')) return '🟡';
  if (itemName.includes('iron')) return '⚙️';
  if (itemName.includes('book')) return '📖';
  if (itemName.includes('potion')) return '🧪';
  if (itemName.includes('bow')) return '🏹';
  if (itemName.includes('arrow')) return '➡️';
  if (itemName.includes('bed')) return '🛏️';
  if (itemName.includes('chest')) return '📦';
  if (itemName.includes('door')) return '🚪';
  if (itemName.includes('torch')) return '🔦';
  if (itemName.includes('bucket')) return '🪣';

  // Nether update items (1.16)
  if (itemName.includes('respawn_anchor')) return '⚓';
  if (itemName.includes('lodestone')) return '🧲';
  if (itemName.includes('campfire')) return '🔥';
  if (itemName.includes('lantern')) return '🏮';

  // Default
  return '📦';
}

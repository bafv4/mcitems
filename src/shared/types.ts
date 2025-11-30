// Shared type definitions across all Minecraft versions

// Minecraft Item Types (based on Creative Inventory tabs)
export type ItemCategory =
  | 'all' // すべて
  | 'building_blocks' // 建築ブロック
  | 'decorations' // 装飾ブロック
  | 'redstone' // レッドストーン
  | 'transportation' // 交通
  | 'miscellaneous' // 雑貨
  | 'foodstuffs' // 食料
  | 'tools' // 道具
  | 'combat' // 戦闘
  | 'brewing'; // 醸造

export interface MinecraftItem {
  id: string; // "minecraft:wooden_pickaxe"
  name: string; // Display name
  category: ItemCategory;
  stackSize?: number; // Stack size (default: 64)
}

// NBT Enchantment structure
export interface Enchantment {
  id: string; // "minecraft:sharpness"
  lvl: number; // Enchantment level
}

// NBT Item structure (for inventory)
export interface NBTItem {
  id: string;
  Count: number;
  Slot?: number;
  tag?: {
    Enchantments?: Enchantment[];
    Damage?: number;
    Potion?: string; // Potion effect ID (e.g., "minecraft:swiftness")
    display?: {
      Name?: string;
    };
  };
}

// Potion effect info
export interface PotionEffectInfo {
  id: string;
  name: string;
  variant?: number;
  duration?: string;
  level?: number;
}

// Category definition
export interface CategoryDefinition {
  id: ItemCategory;
  name: string;
}

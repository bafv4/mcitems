# @bafv4/mcitems

Minecraft item data, textures, and translations for React and Vue applications with multi-version support.

## Installation

```bash
# From GitHub
pnpm add github:bafv4/mcitems

# Or with a specific tag
pnpm add github:bafv4/mcitems#v2.0.0
```

## Features

- **Multi-Version Support**: Separate modules for different Minecraft versions
- **Item Data**: Complete list of Minecraft items organized by Creative Inventory categories
- **Textures**: PNG textures for all items and blocks
- **Translations**: Japanese translations for all items
- **React Component**: `MinecraftItemIcon` for displaying item icons
- **Vue Component**: `MinecraftItemIcon` for Vue 3 applications
- **Potion Effects**: Full support for potion effect variants
- **Framework Independent**: React and Vue are optional peer dependencies

## Supported Versions

| Version | Import Path | Status |
|---------|-------------|--------|
| 1.16.x | `@bafv4/mcitems/1.16` | Supported |
| 1.20.x | `@bafv4/mcitems/1.20` | Coming Soon |
| 1.21.x | `@bafv4/mcitems/1.21` | Coming Soon |

## Usage

### React

```tsx
import { MinecraftItemIcon, getAllItems } from '@bafv4/mcitems/1.16/react';

// Basic usage
<MinecraftItemIcon itemId="minecraft:diamond_sword" size={48} />

// With potion effect
<MinecraftItemIcon
  itemId="minecraft:potion"
  nbtData={{ Potion: 'minecraft:fire_resistance' }}
  size={32}
/>

// With custom texture base URL
<MinecraftItemIcon
  itemId="minecraft:iron_pickaxe"
  textureBaseUrl="/assets/mcitems"
  size={48}
/>

// Using data functions
const items = getAllItems();
```

### Vue

```vue
<script setup lang="ts">
import { MinecraftItemIcon, getAllItems } from '@bafv4/mcitems/1.16/vue';

const items = getAllItems();
</script>

<template>
  <!-- Basic usage -->
  <MinecraftItemIcon itemId="minecraft:diamond_sword" :size="48" />

  <!-- With potion effect -->
  <MinecraftItemIcon
    itemId="minecraft:potion"
    :nbtData="{ Potion: 'minecraft:fire_resistance' }"
    :size="32"
  />

  <!-- With custom texture base URL -->
  <MinecraftItemIcon
    itemId="minecraft:iron_pickaxe"
    textureBaseUrl="/assets/mcitems"
    :size="48"
  />
</template>
```

### Core Functions Only (No Framework)

```typescript
import { getAllItems, formatItemName, MINECRAFT_VERSION } from '@bafv4/mcitems/1.16';

console.log(MINECRAFT_VERSION); // "1.16"

const items = getAllItems();
const name = formatItemName('minecraft:diamond_sword');
```

### Item Data Functions

```typescript
import {
  getAllItems,
  getItemsByCategory,
  getCraftableItems,
  searchItems,
  formatItemName,
  ITEM_CATEGORIES,
} from '@bafv4/mcitems/1.16';

// Get all items
const items = getAllItems();

// Get items by category
const tools = getItemsByCategory('tools');

// Get craftable items only (for recipe search)
const craftable = getCraftableItems();

// Search items
const results = searchItems('diamond');

// Format item name (Japanese)
const name = formatItemName('minecraft:diamond_sword');
// => 'ダイヤモンドの剣'

// Available categories
ITEM_CATEGORIES.forEach(cat => {
  console.log(cat.id, cat.name);
});
```

### Potion Effects

```typescript
import {
  POTION_EFFECTS,
  getPotionEffectInfo,
  formatPotionName,
  formatPotionEffect,
} from '@bafv4/mcitems/1.16';

// Get potion info
const info = getPotionEffectInfo('minecraft:fire_resistance');
// => { id: 'minecraft:fire_resistance', name: '火炎耐性', variant: 12, duration: '3:00' }

// Format potion name
const name = formatPotionName('minecraft:splash_potion', 'minecraft:fire_resistance');
// => '火炎耐性のスプラッシュポーション'

// Format effect with duration
const effect = formatPotionEffect('minecraft:long_fire_resistance');
// => '火炎耐性 (8:00)'
```

## Texture Setup

Textures are included in `dist/textures/` after building. You need to serve them statically:

### Next.js

Copy textures to `public/` folder:

```bash
cp -r node_modules/@bafv4/mcitems/dist/textures public/mcitems
```

Then use with `textureBaseUrl`:

```tsx
<MinecraftItemIcon
  itemId="minecraft:diamond"
  textureBaseUrl="/mcitems"
/>
```

### Vite (React / Vue)

Add to `vite.config.ts`:

```typescript
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'node_modules/@bafv4/mcitems/dist/textures',
          dest: 'assets',
        },
      ],
    }),
  ],
});
```

### Nuxt 3

Copy textures to `public/` folder:

```bash
cp -r node_modules/@bafv4/mcitems/dist/textures public/mcitems
```

Then use with `textureBaseUrl`:

```vue
<MinecraftItemIcon
  itemId="minecraft:diamond"
  textureBaseUrl="/mcitems"
/>
```

## Item Categories

| ID | Name |
|----|------|
| `all` | すべて |
| `building_blocks` | 建築ブロック |
| `decorations` | 装飾ブロック |
| `redstone` | レッドストーン |
| `transportation` | 交通 |
| `miscellaneous` | 雑貨 |
| `foodstuffs` | 食料 |
| `tools` | 道具 |
| `combat` | 戦闘 |
| `brewing` | 醸造 |

## API Reference

### Components

- `MinecraftItemIcon` (React) - React component for displaying item icons (`@bafv4/mcitems/1.16/react`)
- `MinecraftItemIcon` (Vue) - Vue 3 component for displaying item icons (`@bafv4/mcitems/1.16/vue`)

### Functions

- `getAllItems()` - Get all item IDs
- `getItemsByCategory(category)` - Get items by category
- `getCraftableItems()` - Get craftable items only
- `getCraftableItemsByCategory(category)` - Get craftable items by category
- `searchItems(query)` - Search items by ID
- `formatItemName(itemId)` - Format item ID to display name (Japanese)
- `getItemNameJa(itemId)` - Get Japanese translation
- `getTextureUrl(itemId, nbtData, baseUrl)` - Get texture URL
- `getPotionEffectInfo(effect)` - Get potion effect info
- `formatPotionName(itemId, effect)` - Format potion display name
- `formatPotionEffect(effect)` - Format effect with duration

### Constants

- `MINECRAFT_VERSION` - Version string (e.g., "1.16")
- `TEXTURE_PATH` - Texture path pattern (e.g., "1.16.1/items")
- `MINECRAFT_ITEMS` - Items organized by category
- `ITEM_CATEGORIES` - Category definitions
- `POTION_EFFECTS` - Potion effect data

### Types

- `ItemCategory` - Category type union
- `MinecraftItem` - Item interface
- `NBTItem` - NBT item structure
- `PotionEffectInfo` - Potion effect info interface

## Adding New Versions

To add support for a new Minecraft version:

1. Create a new version folder: `src/versions/1.20/`
2. Copy and modify the data files (items.ts, potionEffects.ts, translations.ts)
3. Update `TEXTURE_PATH` constant for the new version
4. Add entry points to `tsup.config.ts`
5. Add exports to `package.json`

## License

MIT

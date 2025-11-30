<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { getPotionTextureVariant } from './potionEffects';
import { getItemColor, getItemEmoji } from '../../shared/utils';

export interface MinecraftItemIconProps {
  itemId: string;
  size?: number;
  showFallbackOnError?: boolean;
  nbtData?: {
    Potion?: string;
    [key: string]: unknown;
  };
  /** Base URL for textures (e.g., '/textures' or 'https://cdn.example.com/textures') */
  textureBaseUrl?: string;
}

const TEXTURE_PATH = '1.16.1/items';

const props = withDefaults(defineProps<MinecraftItemIconProps>(), {
  size: 48,
  showFallbackOnError: true,
  textureBaseUrl: '',
});

const hasError = ref(false);

/**
 * Get the texture URL for a Minecraft item (1.16 version)
 */
function getTextureUrl(
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

const imageUrl = computed(() =>
  getTextureUrl(props.itemId, props.nbtData, props.textureBaseUrl)
);
const fallbackColor = computed(() => getItemColor(props.itemId));
const fallbackEmoji = computed(() => getItemEmoji(props.itemId));

// Reset error state when itemId changes
watch(
  () => props.itemId,
  () => {
    hasError.value = false;
  }
);

watch(
  () => props.nbtData,
  () => {
    hasError.value = false;
  }
);

function handleError() {
  hasError.value = true;
}

function handleLoad() {
  hasError.value = false;
}
</script>

<template>
  <div
    v-if="hasError && showFallbackOnError"
    class="minecraft-item-icon-fallback"
    :style="{
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: fallbackColor,
      fontSize: `${size * 0.5}px`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '4px',
      border: '2px solid rgba(128, 128, 128, 0.5)',
    }"
    :title="itemId"
  >
    <span style="filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))">
      {{ fallbackEmoji }}
    </span>
  </div>
  <img
    v-else
    :src="imageUrl"
    :alt="itemId"
    class="minecraft-item-icon"
    :style="{
      width: `${size}px`,
      height: `${size}px`,
      imageRendering: 'pixelated',
    }"
    loading="lazy"
    @error="handleError"
    @load="handleLoad"
  />
</template>

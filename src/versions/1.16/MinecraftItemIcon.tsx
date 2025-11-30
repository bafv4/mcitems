import { useState, useEffect, ImgHTMLAttributes } from 'react';
import { getPotionTextureVariant } from './potionEffects';
import { getItemColor, getItemEmoji } from '../../shared/utils';
import { TEXTURE_PATH } from './core';

export interface MinecraftItemIconProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  itemId: string;
  size?: number;
  fallback?: React.ReactNode;
  showFallbackOnError?: boolean;
  nbtData?: {
    Potion?: string;
    [key: string]: unknown;
  };
  /** Base URL for textures (e.g., '/textures' or 'https://cdn.example.com/textures') */
  textureBaseUrl?: string;
}

/**
 * Parse potion item ID with effect (e.g., "minecraft:potion.fire_resistance")
 * Returns the base item ID and the potion effect
 */
function parsePotionItemId(itemId: string): { baseId: string; potionEffect?: string } {
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
 * Get the texture URL for a Minecraft item (1.16 version)
 */
function getTextureUrl(
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

export function MinecraftItemIcon({
  itemId,
  size = 48,
  fallback,
  showFallbackOnError = true,
  nbtData,
  textureBaseUrl = '',
  className,
  style,
  ...props
}: MinecraftItemIconProps) {
  const [hasError, setHasError] = useState(false);
  const [imageUrl, setImageUrl] = useState(() =>
    getTextureUrl(itemId, nbtData, textureBaseUrl)
  );

  // Reset state when itemId or nbtData changes
  useEffect(() => {
    setImageUrl(getTextureUrl(itemId, nbtData, textureBaseUrl));
    setHasError(false);
  }, [itemId, nbtData, textureBaseUrl]);

  const handleError = () => {
    setHasError(true);
  };

  const handleLoad = () => {
    setHasError(false);
  };

  // Show fallback if error occurred
  if (hasError && showFallbackOnError) {
    if (fallback) {
      return <>{fallback}</>;
    }

    // Default fallback: show unique colored box with emoji
    const color = getItemColor(itemId);
    const emoji = getItemEmoji(itemId);

    return (
      <div
        className={className}
        style={{
          width: size,
          height: size,
          backgroundColor: color,
          fontSize: size * 0.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 4,
          border: '2px solid rgba(128, 128, 128, 0.5)',
          ...style,
        }}
        title={itemId}
        {...(props as React.HTMLAttributes<HTMLDivElement>)}
      >
        <span style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }}>
          {emoji}
        </span>
      </div>
    );
  }

  return (
    <img
      src={imageUrl}
      alt={itemId}
      className={className}
      style={{
        width: size,
        height: size,
        imageRendering: 'pixelated',
        ...style,
      }}
      onError={handleError}
      onLoad={handleLoad}
      loading="lazy"
      {...props}
    />
  );
}

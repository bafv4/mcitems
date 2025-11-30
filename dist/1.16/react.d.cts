import * as react_jsx_runtime from 'react/jsx-runtime';
import { ImgHTMLAttributes } from 'react';
export { CategoryDefinition, Enchantment, ITEM_CATEGORIES, ItemCategory, MINECRAFT_ITEMS, MINECRAFT_VERSION, MinecraftItem, NBTItem, POTION_EFFECTS, POTION_EFFECT_TO_TEXTURE, POTION_VARIANTS, PotionEffectInfo, TEXTURE_PATH, formatItemName, formatPotionEffect, formatPotionName, getAllItems, getCraftableItems, getCraftableItemsByCategory, getItemNameJa, getItemsByCategory, getPotionEffectInfo, getPotionTextureVariant, getTextureUrl, parsePotionItemId, searchItems } from './index.cjs';

interface MinecraftItemIconProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
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
declare function MinecraftItemIcon({ itemId, size, fallback, showFallbackOnError, nbtData, textureBaseUrl, className, style, ...props }: MinecraftItemIconProps): react_jsx_runtime.JSX.Element;

export { MinecraftItemIcon, type MinecraftItemIconProps };

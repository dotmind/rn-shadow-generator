import { Platform } from "react-native";
import { DirectionType, ShadowType } from "../types";
import { adjustShadowOffsetOnDirection } from "./direction";

const interpolate = (
  i: number,
  a: number,
  b: number,
  a2: number,
  b2: number
) => {
  return ((i - a) * (b2 - a2)) / (b - a) + a2;
};

/**
 * @param {number} level Shadow level you want to set (default to 4)
 * @param {string} shadowColor Shadow color you want to set (default to Black)
 * @returns {ShadowType} a full shadow object that depends on OS (iOS or Android)
 */
const generateShadow = (params?: {
  level?: number,
  shadowColor?: string,
  direction?: DirectionType,
}): ShadowType => {
  const level = params?.level || 4;
  const shadowColor = params?.shadowColor || '#000';
  const direction = params?.direction || 'bottom';
  const shadowOffset = adjustShadowOffsetOnDirection(level, direction);
  const shadowOpacity = Number(interpolate(level, 1, 24, 0.2, 0.6).toFixed(2));
  const shadowRadius = Number(interpolate(level, 1, 38, 1, 16).toFixed(2));
  return Platform.select({
    ios: {
      shadowColor,
      shadowOffset,
      shadowOpacity,
      shadowRadius,
    },
    android: {
      shadowColor,
      elevation: level,
    },
  }) || {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
    elevation: level,
  };
};

export {
  interpolate,
  generateShadow,
}
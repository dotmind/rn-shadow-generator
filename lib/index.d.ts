import * as React from 'react';
import { ViewStyle } from 'react-native';
declare type ShadowType = Pick<ViewStyle, 'shadowColor' | 'shadowOpacity' | 'shadowRadius' | 'elevation'>;
declare type DirectionType = 'bottom' | 'top' | 'left' | 'right' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
declare const interpolate: (i: number, a: number, b: number, a2: number, b2: number) => number;
declare const adjustShadowOffsetOnDirection: (level: number, direction: DirectionType) => {
    width: number;
    height: number;
};
/**
 * @param {number} level Shadow level you want to set (default to 4)
 * @param {string} shadowColor Shadow color you want to set (default to Black)
 * @returns {ShadowType} a full shadow object that depends on OS (iOS or Android)
 */
declare const generateShadow: ({ level, shadowColor, direction, }: {
    level?: number | undefined;
    shadowColor?: string | undefined;
    direction?: DirectionType | undefined;
}) => ShadowType;
interface ShadowViewProps {
    level?: number;
    shadowColor?: string;
    direction?: DirectionType;
    children?: React.ReactNode;
    style?: ViewStyle;
}
declare const ShadowView: ({ level, shadowColor, direction, children, style, }: ShadowViewProps) => JSX.Element;
export { interpolate, generateShadow, adjustShadowOffsetOnDirection, ShadowView, ShadowType, DirectionType, };

import * as React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
const interpolate = (i, a, b, a2, b2) => {
    return ((i - a) * (b2 - a2)) / (b - a) + a2;
};
const adjustShadowOffsetOnDirection = (level, direction) => {
    const distance = Math.floor(level * 0.5);
    switch (direction) {
        case 'bottom':
            return { width: 0, height: distance };
        case 'top':
            return { width: 0, height: -distance };
        case 'left':
            return { width: -distance, height: 0 };
        case 'right':
            return { width: distance, height: 0 };
        case 'topLeft':
            return { width: -distance, height: -distance };
        case 'topRight':
            return { width: distance, height: -distance };
        case 'bottomLeft':
            return { width: -distance, height: distance };
        case 'bottomRight':
            return { width: -distance, height: distance };
        default:
            return { width: 0, height: distance };
    }
};
/**
 * @param {number} level Shadow level you want to set (default to 4)
 * @param {string} shadowColor Shadow color you want to set (default to Black)
 * @returns {ShadowType} a full shadow object that depends on OS (iOS or Android)
 */
const generateShadow = ({ level = 4, shadowColor = '#000', direction = 'bottom', }) => {
    const shadowOffset = adjustShadowOffsetOnDirection(level, direction);
    const shadowOpacity = Number(interpolate(level, 1, 24, 0.2, 0.6).toFixed(2));
    const shadowRadius = Number(interpolate(level, 1, 38, 1, 16).toFixed(2));
    return Object.assign({}, Platform.select({
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
    }));
};
const ShadowView = ({ level, shadowColor, direction, children, style, }) => (<View style={[
        styles.shadowContainer,
        Object.assign(Object.assign({}, style), generateShadow({ level, shadowColor, direction })),
    ]}>
    {children}
  </View>);
const styles = StyleSheet.create({
    shadowContainer: {
        backgroundColor: '#FFF',
        margin: 20,
        marginBottom: 30,
        marginTop: 0,
        height: 50,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
});
export { interpolate, generateShadow, adjustShadowOffsetOnDirection, ShadowView, };

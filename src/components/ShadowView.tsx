import * as React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { DirectionType } from '../types';
import { generateShadow } from '../utils/shadow';

interface ShadowViewProps {
  level?: number;
  shadowColor?: string;
  direction?: DirectionType;
  children?: React.ReactNode;
  style?: ViewStyle;
}

const ShadowView = ({
  level,
  shadowColor,
  direction,
  children,
  style,
}: ShadowViewProps) => (
  <View
    style={[
      styles.shadowContainer,
      {
        ...style,
        ...generateShadow({level, shadowColor, direction}),
      },
    ]}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  shadowContainer: {
    backgroundColor: '#FFF',
  },
});

export { ShadowView };

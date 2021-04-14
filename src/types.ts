import { ViewStyle } from 'react-native';

type ShadowType = Pick<
  ViewStyle,
  'shadowColor' | 'shadowOffset' | 'shadowOpacity' | 'shadowRadius' | 'elevation'
>;

type DirectionType = 'bottom' | 'top' | 'left' | 'right' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

export {
  ShadowType,
  DirectionType,
}
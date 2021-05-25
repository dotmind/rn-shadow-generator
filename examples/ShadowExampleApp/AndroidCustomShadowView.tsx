import React from 'react';
import { requireNativeComponent, ViewProps } from 'react-native';
import 'react-native-gesture-handler';

const RCTAndroidCustomShadowView = requireNativeComponent('AndroidCustomShadowView')

interface AndroidCustomShadowViewProps extends ViewProps {
   elevation: number;
   children?: React.ReactNode | React.ReactNode[];
}

const AndroidCustomShadowView = ({ children, ...props }: AndroidCustomShadowViewProps) => {
   return <RCTAndroidCustomShadowView {...props}>{children}</RCTAndroidCustomShadowView>
}

export default AndroidCustomShadowView;

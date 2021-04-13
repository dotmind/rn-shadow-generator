import React from 'react';
import renderer from 'react-test-renderer';

import { ShadowView, interpolate, ShadowType, adjustShadowOffsetOnDirection } from '@dotmind/rn-shadow-generator';

const defaultLevel = 4;
const defaultShadowColor = '#000';
const defaultHeight = Math.floor(defaultLevel * 0.5);

const defaultAndroidStyle = {
  shadowColor: defaultShadowColor,
  elevation: defaultLevel,
};

const defaultIOSStyle = {
  shadowColor: defaultShadowColor,
  shadowOffset: {
    width: 0,
    height: defaultHeight,
  },
  shadowOpacity: Number(interpolate(defaultLevel, 1, 24, 0.2, 0.6).toFixed(2)),
  shadowRadius: Number(interpolate(defaultLevel, 1, 38, 1, 16).toFixed(2)),
};

const mockPlatform = (OS: 'ios' | 'android', version?: number) => {
  jest.resetModules();
  jest.doMock("react-native/Libraries/Utilities/Platform", () => ({
    OS,
    select: (objs: { ios: ShadowType, android: ShadowType}) => objs[OS],
    Version: version || undefined
  }));
};

test('[ANDROID] renders correctly', () => {
  mockPlatform("android");
  const tree = renderer.create(<ShadowView />).toTree();
  // @ts-ignore
  const style = tree.rendered.props.style[1];
  expect(style.shadowColor).toBe(defaultAndroidStyle.shadowColor);
  expect(style.elevation).toBe(defaultAndroidStyle.elevation);
});

test('[iOS] renders correctly', () => {
  mockPlatform("ios");
  const tree = renderer.create(<ShadowView />).toTree();
  // @ts-ignore
  const style = tree.rendered.props.style[1];
  expect(style.shadowColor).toBe(defaultIOSStyle.shadowColor);
  expect(style.shadowOffset).toStrictEqual(defaultIOSStyle.shadowOffset);
  expect(style.shadowOpacity).toBe(defaultIOSStyle.shadowOpacity);
  expect(style.shadowRadius).toBe(defaultIOSStyle.shadowRadius);
});

test('[ANDROID] renders correctly when level up', () => {
  mockPlatform("android");
  Array(20).forEach((level) => {
    const tree = renderer.create(<ShadowView level={level} />).toTree();
    // @ts-ignore
    const style = tree.rendered.props.style[1];
    expect(style.shadowOffset.elevation).toBe(level);
  });
});

test('[iOS] renders correctly when level up', () => {
  mockPlatform("ios");
  Array(20).forEach((level) => {
    const height = Math.floor(level * 0.5);
    const tree = renderer.create(<ShadowView level={level} />).toTree();
    // @ts-ignore
    const style = tree.rendered.props.style[1];
    expect(style.shadowOffset.height).toBe(height);
  });
});

test('[iOS] renders correctly when direction change', () => {
  mockPlatform("ios");
  ['top', 'left', 'right', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight', undefined].forEach((direction) => {
    const tree = renderer.create(<ShadowView direction={direction} />).toTree();
    const shadowOffset = adjustShadowOffsetOnDirection(defaultLevel, direction);
    const shadowOpacity = Number(interpolate(defaultLevel, 1, 24, 0.2, 0.6).toFixed(2));
    const shadowRadius = Number(interpolate(defaultLevel, 1, 38, 1, 16).toFixed(2));
    // @ts-ignore
    const style = tree.rendered.props.style[1];
    expect(style.shadowOffset).toStrictEqual(shadowOffset);
    expect(style.shadowOpacity).toBe(shadowOpacity);
    expect(style.shadowRadius).toBe(shadowRadius);
  });
});
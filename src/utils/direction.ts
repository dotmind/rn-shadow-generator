import { DirectionType } from '../types';

const adjustShadowOffsetOnDirection = (level: number, direction: DirectionType) => {
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
}

export {
  adjustShadowOffsetOnDirection,
};

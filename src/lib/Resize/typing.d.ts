import { MouseEvent } from 'react';

export type ResizeData = {
  node: HTMLElement,
  axis: ResizeHandleAxis;
  w: number, h: number, // 本次拖拽的距离
  deltaW: number, deltaH: number,
};

export type ResizeEventHandler = (e: MouseEvent, d: ResizeData) => void | false;

export type ResizeHandleAxis = 's' | 'w' | 'e' | 'n' | 'sw' | 'nw' | 'se' | 'ne';

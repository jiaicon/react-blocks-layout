import { MouseEvent } from 'react';

export type DragData = {
  node: HTMLElement,
  x: number, y: number, // 本次拖拽的距离
  deltaX: number, deltaY: number,
  // lastX: number, lastY: number,
};

export type DragEventHandler = (e: MouseEvent, data: DragData) => void | false;

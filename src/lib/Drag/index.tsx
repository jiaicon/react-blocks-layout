/**
 * @author Icon
 * @file drag.tsx
 * @description // TODO
 * @date 2023-01-12 11:39
 */
import React, { useRef, useEffect, MouseEvent, ReactElement, CSSProperties } from 'react';
import classNames from 'classnames';
import { DragEventHandler, DragData } from './typing';

export type IProps = {
  x?: number;
  y?: number;
  className?: string;
  style?: CSSProperties;
  onDragStart?: DragEventHandler;
  onDrag?: DragEventHandler;
  onDragStop?: DragEventHandler;
  children: ReactElement<any>;
};

interface LastPosition {
  lastX: number;
  lastY: number;
}
const Index: React.FC<IProps> = (props) => {
  const { x, y, className, style } = props;
  const lastPosition = useRef<LastPosition | null>(null);
  const dragging = useRef<boolean>(false);
  const blockRef = useRef<HTMLDivElement | null>(null);
  const positionRecord = useRef<{ x: number, y: number }>({ x: x || Infinity, y: y || Infinity });
  // _x, _y 拖拽的距离
  const buildDragData = (_x: number, _y: number): DragData => {
    const { x: px, y: py } = positionRecord.current;
    positionRecord.current = {
      x: (typeof px === 'number' && px !== Infinity) ? px + _x : Infinity, y: (typeof py === 'number' && py !== Infinity) ? py + _y : Infinity,
    }
    return {
      node: blockRef.current!,
      ...positionRecord.current,
      deltaX: _x, deltaY: _y,
    }
  }
  const handleDragStart = (e: MouseEvent) => {
    if (dragging.current || !blockRef.current) return;
    const position = { x: e.clientX, y: e.clientY }

    dragging.current = true;
    const dragData = buildDragData(0, 0);

    lastPosition.current = { lastX: position.x, lastY: position.y };
    props.onDragStart?.(e, dragData);
    const { ownerDocument } = blockRef.current;

    ownerDocument.addEventListener<'mousemove'>('mousemove', handleDrag);
    ownerDocument.addEventListener<'mouseup'>('mouseup', handleDragEnd);
  }

  const handleDrag = (e: MouseEvent | GlobalEventHandlersEventMap['mouseup']) => {
    if (!dragging.current || !blockRef.current || typeof lastPosition.current?.lastX !== 'number') return;

    dragging.current = true;
    const position = { x: e.clientX, y: e.clientY }

    const deltaX = position.x - lastPosition.current.lastX;
    const deltaY = position.y - lastPosition.current.lastY;

    const dragData = buildDragData(deltaX, deltaY);
    lastPosition.current = { lastX: position.x, lastY: position.y };

    props.onDrag?.(e as MouseEvent, dragData);
  }
  const handleDragEnd = (e: MouseEvent | GlobalEventHandlersEventMap['mouseup']) => {
    if (!dragging.current || !blockRef.current || typeof lastPosition.current?.lastX !== 'number') return;
    dragging.current = false;
    const position = { x: e.clientX, y: e.clientY }
    const deltaX = position.x - lastPosition.current.lastX;
    const deltaY = position.y - lastPosition.current.lastY;
    lastPosition.current = { lastX: position.x, lastY: position.y };
    const dragData = buildDragData(deltaX, deltaY);
    props.onDragStop?.(e as MouseEvent, dragData);
    lastPosition.current = null;

    const { ownerDocument } = blockRef.current;
    ownerDocument.removeEventListener<'mousemove'>('mousemove', handleDrag);
    ownerDocument.removeEventListener<'mouseup'>('mouseup', handleDragEnd);
  }
  useEffect(() => {
    return () => {
      blockRef.current?.ownerDocument?.removeEventListener<'mousemove'>('mousemove', handleDrag);
      blockRef.current?.ownerDocument?.removeEventListener<'mouseup'>('mouseup', handleDragEnd);
    }
  }, [])
  const onMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    return handleDragStart(e);
  }
  const onMouseUp = (e: MouseEvent) => {
    return handleDragEnd(e);
  }
  if (!props.children) return null

  const boxStyle: CSSProperties = {
    position: 'absolute',
  }
  return React.cloneElement(React.Children.only(props.children), {
    onMouseDown,
    onMouseUp,
    ref: blockRef,
    className: classNames(className, props.children?.props.className),
    style: { left: x, top: y, ...boxStyle, ...style, ...props.children?.props.style, },
  })
}

export default Index;
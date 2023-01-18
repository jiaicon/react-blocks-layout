/**
 * @author Icon
 * @file dragAndResize.tsx
 * @description // TODO
 * @date 2023-01-16 09:22
 */
import React, { CSSProperties, ReactElement, cloneElement, useRef, MouseEvent } from 'react';
import Drag from './../Drag';
import Resize from './../Resize';
import { DragData } from './../Drag/typing'
import { ResizeData, ResizeHandleAxis } from './../Resize/typing';
import { Block, DragAndResizeEventHandler } from './typing';

export interface IProps extends Block {
  className?: string;
  scale?: number;
  style?: CSSProperties;
  children: ReactElement<any>;
  resizeHandles: ResizeHandleAxis[],
  onDragStart?: DragAndResizeEventHandler;
  onDrag?: DragAndResizeEventHandler;
  onDragStop?: DragAndResizeEventHandler;
  onResizeStart?: DragAndResizeEventHandler;
  onResize?: DragAndResizeEventHandler;
  onResizeStop?: DragAndResizeEventHandler;
  onBlockChange?: DragAndResizeEventHandler;
};
type EventName = 'onDragStart' | 'onDrag' | 'onDragStop' | 'onResizeStart' | 'onResize' | 'onResizeStop';
const Index: React.FC<IProps> = (props) => {
  const { w, h, x, y, minW = 80, minH = 80, maxW, maxH, className, style, children, onBlockChange, resizeHandles } = props;
  const old_block = useRef<Block>({ w, h, x, y, minW, minH, maxW, maxH });
  const new_block = useRef<Block>({ w, h, x, y, minW, minH, maxW, maxH });
  const elementRef = useRef();
  const onDragStart = () => {
    handleDrag('onDragStart', old_block.current);
  }
  const onDrag = (e: MouseEvent, { deltaX, deltaY }: DragData) => {
    new_block.current = { ...old_block.current, x: old_block.current.x + deltaX, y: old_block.current.y + deltaY };
    handleDrag('onDrag', new_block.current);
  }
  const onDragStop = (e: MouseEvent, { deltaX, deltaY }: DragData) => {
    new_block.current = { ...old_block.current, x: old_block.current.x + deltaX, y: old_block.current.y + deltaY };
    handleDrag('onDragStop', new_block.current);
  }

  const handleDrag = (handler: EventName, uiData: Block) => {
    props[handler]?.(uiData, old_block.current);
    onBlockChange?.(uiData, old_block.current);
    old_block.current = new_block.current;
  }

  const mixDrag = (child: ReactElement) => {
    return (<Drag
      {...child.props}
      x={props.x}
      y={props.y}
      onDragStart={onDragStart}
      onDrag={onDrag}
      onDragStop={onDragStop}
    >
      {child}
    </Drag>)
  }

  const onResizeStart = () => {
    handleDrag('onResizeStart', old_block.current);
  }
  const onResize = (e: MouseEvent, { axis, deltaW, deltaH }: ResizeData) => {
    let { w, h, x, y, ...others } = old_block.current;

    if (axis.indexOf('w') !== -1) {
      w = w - deltaW;
    } else {
      w = w + deltaW;
    }
    if (axis.indexOf('n') !== -1) {
      h = h - deltaH;
    } else {
      h = h + deltaH;
    }

    if (typeof minH === 'number' && h <= minH) {
      h = minH;
    } else if (typeof maxH === 'number' && h >= maxH) {
      h = maxH;
    } else {
      if (axis.indexOf('n') !== -1) {
        y = y + deltaH;
      }
    }
    
    if (typeof minW === 'number' && w <= minW) {
      w = minW;
    } else if (typeof maxW === 'number' && w >= maxW) {
      w = maxW;
    } else {
      if (axis.indexOf('w') !== -1) {
        x = x + deltaW;
      }
    }

    new_block.current = {
      ...others,
      w, h, x, y,
    }
    handleResize('onResize', new_block.current);
  }
  const onResizeStop = (e: MouseEvent, { deltaW, deltaH }: ResizeData) => {
    new_block.current = { ...old_block.current, w: old_block.current.w + deltaW, h: old_block.current.h + deltaH };
    handleResize('onResizeStop', new_block.current);
  }

  const handleResize = (handler: EventName, uiData: Block) => {
    props[handler]?.(uiData, old_block.current);
    onBlockChange?.(uiData, old_block.current);
    old_block.current = new_block.current;
  }

  const mixResize = (child: ReactElement) => {
    return (<Resize
      {...child.props}
      w={props.w}
      h={props.h}
      resizeHandles={resizeHandles}
      onResizeStart={onResizeStart}
      onResize={onResize}
      onResizeStop={onResizeStop}
    >
      {child}
    </Resize>)
  }
  let newChild = cloneElement(React.Children.only(children), {
    className,
    ref: elementRef,
    style: { ...style, ...children?.props.style, },
  })
  newChild = mixResize(newChild);
  newChild = mixDrag(newChild);

  return newChild;
}

export default Index;
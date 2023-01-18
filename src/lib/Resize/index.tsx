/**
 * @author Icon
 * @file resize.tsx
 * @description // TODO
 * @date 2023-01-15 16:23
 */
import React, { ReactElement, CSSProperties, useRef, MouseEvent, forwardRef } from 'react';
import classNames from 'classnames';
import Drag from './../Drag';
import { DragData } from './../Drag/typing';
import { ResizeData, ResizeEventHandler, ResizeHandleAxis } from './typing';
import './styles.less';

export interface IProps {
  w?: number;
  h?: number;
  minW?: number;
  minH?: number;
  maxW?: number;
  maxH?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactElement<any>;
  resizeHandle?: ReactElement | ((axis: ResizeHandleAxis) => ReactElement<any>);
  resizeHandles?: ResizeHandleAxis[];
  onResizeStart?: ResizeEventHandler;
  onResize?: ResizeEventHandler;
  onResizeStop?: ResizeEventHandler;
}
export type DragEventHandler = (e: MouseEvent, data: ResizeData) => void | false;
export type EventName = 'onResizeStart' | 'onResize' | 'onResizeStop';
const Index: React.FC<IProps> = forwardRef((props, ref) => {
  const { w, h, minW = 40, minH = 40, maxW, maxH, className, style, resizeHandle, resizeHandles = ['se'], children, onResizeStart, onResize, onResizeStop, ...rest } = props;
  const blockRef = useRef<HTMLElement>(null);
  const resizeRef = useRef<{ w: number, h: number }>({ w: w || Infinity, h: h || Infinity });

  const renderHandles = (axis: ResizeHandleAxis) => {
    if (!resizeHandle) {
      return <span className={`--resize ${'--resize-' + axis}`}></span>
    }
    if (typeof resizeHandle === 'function') {
      return resizeHandle(axis);
    }
    const isDOMElement = typeof resizeHandle.type === 'string';
    const props = {
      ref,
      ...(isDOMElement ? {} : { axis })
    };
    return React.cloneElement(resizeHandle, props);
  }

  const buildResizeData = (axis: ResizeHandleAxis, { deltaX, deltaY }: DragData): ResizeData => {
    const { w, h } = resizeRef.current;
    let deltaW = 0, deltaH = 0;

    if (axis.indexOf('s') !== -1 || axis.indexOf('n') !== -1) {
      deltaH = deltaY;
      if (typeof h === 'number' && h !== Infinity) {
        const _h = h + deltaY;
        if (_h <= minH) {
          resizeRef.current.h = minH;
        } else if (typeof maxH === 'number' && _h >= maxH) {
          resizeRef.current.h = maxH;
        } else {
          resizeRef.current.h = _h;
        }
      } else {
        resizeRef.current.h = Infinity;
      }
    }

    if (axis.indexOf('e') !== -1 || axis.indexOf('w') !== -1) {
      deltaW = deltaX;
      if (typeof w === 'number' && w !== Infinity) {
        const _w = w + deltaX;
        if (_w <= minW) {
          resizeRef.current.w = minW;
        } else if (typeof maxW === 'number' && _w >= maxW) {
          resizeRef.current.w = maxW;
        } else {
          resizeRef.current.w = _w;
        }
      } else {
        resizeRef.current.w = Infinity;
      }
    }

    return {
      axis,
      node: blockRef.current!,
      w: resizeRef.current.w, h: resizeRef.current.h,
      deltaW, deltaH
    }
  }

  const handleResize = (axis: ResizeHandleAxis, handler: EventName, e: MouseEvent, uiData: DragData) => {
    props[handler]?.(e, buildResizeData(axis, uiData));
  }

  const boxStyle: CSSProperties = {
    position: 'absolute',
    boxSizing: 'border-box',
  };
  return React.cloneElement(React.Children.only(children), {
    ...rest,
    ref: ref || blockRef,
    className: classNames(className, children?.props.className),
    style: { width: w, height: h, ...style, ...children?.props.style, ...boxStyle },
    children: [
      children.props.children,
      ...resizeHandles.map((axis) => {
        return (
          <Drag
            key={axis}
            children={renderHandles(axis)}
            onDragStart={(e, uiData) => { handleResize(axis, 'onResizeStart', e, uiData) }}
            onDrag={(e, uiData) => { handleResize(axis, 'onResize', e, uiData) }}
            onDragStop={(e, uiData) => { handleResize(axis, 'onResizeStop', e, uiData) }}
          />
        )
      })
    ],
  })
})

export default Index;
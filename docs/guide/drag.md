---
order: 2
---

## 不传递坐标信息（x、y）

```jsx
/**
 * title: 不传递组件位置信息
 * description: 需要自己计算位置
 */
import { useState } from 'react';
import { Drag } from 'react-blocks-layout';

const block = { w: 100, h: 100, x: 100, y: 100 };
export default () => {
  const [position, setPosition] = useState<Block>({ x: 100, y: 100 });
  return (
    <div style={{ position: 'relative', width: '100%', height: 500 }}>
      <Drag
        onDrag={(e, { deltaX, deltaY }) => { // 未传x、y，返回拖拽量
          setPosition(({ x, y }) => {
            return { 
              x: x + deltaX,
              y: y + deltaY,
            }
          })
        }}
        style={{
          border: '1px solid #eee',
          cursor: 'move',
          
          width: block.w,
          height: block.h,
          left: position?.x,
          top: position?.y,
        }}
      >
        <div style={{ textAlign: 'center' }}>Drag</div>
      </Drag>
    </div>
  )
}
```

## 传递坐标信息（x、y）

```jsx
/**
 * title: 传递了组件位置
 * description: 可直接使用组件返回的位置信息，也可以使用返回的 deltaX/deltaY 自己计算
 */
import { useState } from 'react';
import { Drag } from 'react-blocks-layout';

const block = { w: 100, h: 100, x: 100, y: 100 };
export default () => {
  const [position, setPosition] = useState<Block>({ x: 100, y: 100 });
  return (
    <div style={{ position: 'relative', width: '100%', height: 500 }}>
      <Drag
        x={block.x}
        y={block.y}
        onDrag={(e, { x, y }) => { // 传递x、y时，返回有实时位置信息
          setPosition(() => ({ x, y }))
        }}
        style={{
          position: 'absolute',
          display: 'inline-block',
          border: '1px solid #eee',
          cursor: 'move',
          
          width: block.w,
          height: block.h,
          left: position?.x,
          top: position?.y,
        }}
      >
        <div style={{ textAlign: 'center' }}>Drag</div>
      </Drag>
    </div>
  )
}
```

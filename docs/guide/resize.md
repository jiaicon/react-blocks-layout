---
order: 3
---

## 不传递组件宽高（w、h）

```jsx
/**
 * title: 不传递组件宽高
 * description: 需要自己计算宽高
 */
import { useState } from 'react';
import { Resize } from 'react-blocks-layout';

const block = { w: 100, h: 100, x: 100, y: 100 };
export default () => {
  const [size, setSize] = useState<Block>({ w: 100, h: 100 });
  return (
    <div style={{ position: 'relative', width: '100%', height: 500 }}>
      <Resize
        onResize={(e, { deltaW, deltaH }) => { // 未传w、h，返回宽高变化量
          setSize(({ w, h }) => {
        console.log(w, h, deltaW, deltaH)

            return { 
              w: w + deltaW,
              h: h + deltaH,
            }
          })
        }}
        style={{
          position: 'absolute',
          display: 'inline-block',
          border: '1px solid #eee',
          cursor: 'move',
          
          width: size.w,
          height: size.h,
          left: block.x,
          top: block.y,
        }}
      >
        <div style={{ textAlign: 'center' }}>Resize</div>
      </Resize>
    </div>
  )
}
```

## 传递组件宽高（w、h）

```jsx
/**
 * title: 传递了组件宽高
 * description: 可直接使用组件返回的宽高，也可以使用返回的 deltaW/deltaH 自己计算
 */
import { useState } from 'react';
import { Resize } from 'react-blocks-layout';

const block = { w: 100, h: 100, x: 100, y: 100 };
export default () => {
  const [size, setSize] = useState<Block>({ w: 100, h: 100 });
  return (
    <div style={{ position: 'relative', width: '100%', height: 500 }}>
      <Resize
        w={block.w}
        h={block.h}
        onResize={(e, { w, h }) => { // 传w、h，返回实时宽高
          setSize(() => ({ w, h }))
        }}
        resizeHandles={['se', 'e', 'ne', 's', 'sw', 'w', 'nw', 'n']}
        style={{
          position: 'absolute',
          display: 'inline-block',
          border: '1px solid #eee',
          cursor: 'move',
          
          width: size.w,
          height: size.h,
          left: block.x,
          top: block.y,
        }}
      >
        <div style={{ textAlign: 'center' }}>Resize</div>
      </Resize>
    </div>
  )
}
```

## 限制宽高（minW、minH、maxW、maxH）

```jsx
/**
 * title: 限制组件宽高
 * description: 通知设置 minW、minH、maxW、maxH 来限制缩放时组件的大小，minW、minH 默认40,（因为默认拖拽图片的宽高是20），组件的宽高必传
 */
import { useState } from 'react';
import { Resize } from 'react-blocks-layout';

const block = { w: 100, h: 100, x: 100, y: 100 };
export default () => {
  const [size, setSize] = useState<Block>({ w: 100, h: 100 });
  return (
    <div style={{ position: 'relative', width: '100%', height: 500 }}>
      <Resize
        w={block.w}
        h={block.h}
        minW={80}
        minH={80}
        maxW={300}
        maxH={300}
        onResize={(e, { w, h }) => { // 传w、h，返回实时宽高
          setSize(() => ({ w, h }))
        }}
        resizeHandles={['w']}
        style={{
          position: 'absolute',
          display: 'inline-block',
          border: '1px solid #eee',
          cursor: 'move',
          
          width: size.w,
          height: size.h,
          left: block.x,
          top: block.y,
        }}
      >
        <div style={{ textAlign: 'center' }}>Resize</div>
      </Resize>
    </div>
  )
}
```

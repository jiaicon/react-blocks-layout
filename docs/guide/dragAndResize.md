---
order: 4
---

## DragAndResize

Eg:

```jsx
import { useState } from 'react';
import { DragAndResize } from 'react-blocks-layout';

const block = { w: 200, h: 200, x: 100, y: 100 };
export default () => {
  const [positionAndSize, setPositionAndSize] = useState<Block>({ ...block });
  return (
    <div style={{ position: 'relative', width: '100%', height: 500 }}>
      <DragAndResize
        {...positionAndSize}
        onBlockChange={(new_block) => {
          setPositionAndSize(() => new_block)
        }}
        resizeHandles={['se', 'e', 'ne', 's', 'sw', 'w', 'nw', 'n']}
        style={{
          position: 'absolute',
          display: 'inline-block',
          border: '1px solid #eee',
          cursor: 'move',
          
          width: positionAndSize?.w,
          height: positionAndSize?.h,
          left: positionAndSize?.x,
          top: positionAndSize?.y,
        }}
      >
        <div style={{ textAlign: 'center' }}>DragAndResize</div>
      </DragAndResize>
    </div>
  )
}
```
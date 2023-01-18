---
order: 4
---

## React Blocks Layout

```jsx
import { useState } from 'react';
import { ReactBlocksLayout, Block } from 'react-blocks-layout';

const block = { w: 200, h: 200, x: 100, y: 100, minW: 40, minH: 40, maxW: 400, maxH: 400 };
const init_blocks = Array.from({ length: 4 }).map((item, index) => ({ ...block, x: block.w * index, i: index.toString() }));
export default () => {
  const [blocks, setBlocks] = useState<Block[]>(init_blocks);
  return (
    <div style={{ position: 'relative', width: '100%', height: 500 }}>
      <ReactBlocksLayout
        blocks={blocks}
        resizeHandles={['se', 'e', 'ne', 's', 'sw', 'w', 'nw', 'n']}
        onBlocksChange={(new_blocks) => {
          setBlocks(() => new_blocks)
        }}
      >
        {
          blocks.map(block => (
            <div key={block.i} style={{ textAlign: 'center' }}>block-{block.i}</div>
          ))
        }
      </ReactBlocksLayout>
    </div>
  )
}
```

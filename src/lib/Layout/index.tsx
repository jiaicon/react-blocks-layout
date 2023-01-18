/**
 * @author Icon
 * @file index.tsx
 * @description // TODO
 * @date 2023-01-17 16:43
 */
import React, { useRef } from 'react';
import DragAndResize from './../DragAndResize';
import { ResizeHandleAxis } from './../index';
import { getBlockByKey } from './../utils';
import { Block, ReactBlocksLayoutCallback, ReactBlockDragCallback, ReactBlockResizeCallback } from './typing';
import { BasicBlock } from './../index';
import './styles.less';

export interface IProps {
  children: React.ReactElement;
  blocks?: Block[];
  resizeHandles: ResizeHandleAxis[];
  onBlocksChange?: ReactBlocksLayoutCallback;
  onResizeStart?: ReactBlockResizeCallback;
  onResize?: ReactBlockResizeCallback;
  onResizeStop?: ReactBlockResizeCallback;
  onDragStart?: ReactBlockDragCallback;
  onDrag?: ReactBlockDragCallback;
  onDragStop?: ReactBlockDragCallback;
}
const Index: React.FC<IProps> = (props) => {
  const { blocks = [], resizeHandles, children, onBlocksChange, onDragStart, onDrag, onDragStop, onResizeStart, onResize, onResizeStop } = props;
  const old_blocks = useRef<Block[]>(blocks);
  const buildNewBlocks = (new_block: BasicBlock, block: Block) => {
    return old_blocks.current.map(old_block => {
      if (old_block.i === block.i) {
        return { ...old_block, ...new_block };
      }
      return { ...old_block }
    })
  }
  const handleCallback = (handler: 'onBlocksChange' | 'onResizeStart' | 'onResize' | 'onResizeStop' | 'onDragStart' | 'onDrag' | 'onDragStop', new_block: BasicBlock, block: Block) => {
    const next_blocks = buildNewBlocks(new_block, block);
    const old_block = getBlockByKey(old_blocks.current, block.i);
    props[handler]?.(next_blocks, old_blocks.current, new_block, old_block!);
    old_blocks.current = next_blocks;
  }
  return (
    <div className={'react-blocks-layout'}>
      {
        React.Children.map(children, child => {
          if (!child || !child.key) return null;
          const block = getBlockByKey(blocks, child.key?.toString());
          if (!block) return null;

          return (
            <DragAndResize
              {...block}
              key={block.i}
              className={'react-blocks-layout-item'}
              resizeHandles={resizeHandles}
              onBlockChange={(new_block) => {
                handleCallback('onBlocksChange', new_block, block);
              }}
              onDragStart={(new_block) => {
                handleCallback('onDragStart', new_block, block);
              }}
              onDrag={(new_block) => {
                handleCallback('onDrag', new_block, block);
              }}
              onDragStop={(new_block) => {
                handleCallback('onDragStop', new_block, block);
              }}
              onResizeStart={(new_block) => {
                handleCallback('onResizeStart', new_block, block);
              }}
              onResize={(new_block) => {
                handleCallback('onResize', new_block, block);
              }}
              onResizeStop={(new_block) => {
                handleCallback('onResizeStop', new_block, block);
              }}
            >
              {child}
            </DragAndResize>
          )
        })
      }
    </div>
  )
}

export default Index;
import { BasicBlock } from './../index';

export interface Block extends BasicBlock {
  i: string;
}

export type ReactBlocksLayoutCallback = (new_blocks: Block[], old_blocks: Block[], new_block: BasicBlock, old_block: BasicBlock) => void;
export type ReactBlockDragCallback = (new_blocks: Block[], old_blocks: Block[], new_block: BasicBlock, old_block: BasicBlock) => void;
export type ReactBlockResizeCallback = (new_blocks: Block[], old_blocks: Block[], new_block: BasicBlock, old_block: BasicBlock) => void;

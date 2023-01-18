export interface DragAndResizeData {
  block: IProps;
  old_block: IProps;
}

export type DragAndResizeEventHandler = (block: Block, old_block: Block) => void | false;

export interface Block {
  w: number;
  h: number;
  x: number;
  y: number;
  minW?: number;
  minH?: number;
  maxW?: number;
  maxH?: number;
}
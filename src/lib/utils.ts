import { DragData, Block } from './index';

export function createDraggableData(blockData: { x: number, y: number, scale: number }, coreData: DragData): DragData {
  const scale = blockData.scale;

  return {
    node: coreData.node,
    x: blockData.x + (coreData.deltaX / scale), y: blockData.y + (coreData.deltaY / scale),
    deltaX: (coreData.deltaX / scale), deltaY: (coreData.deltaY / scale),
  };
}

export function getBlockByKey(blocks: Block[], key: string): Block | undefined {
  return blocks.find(block => block.i === key);
}

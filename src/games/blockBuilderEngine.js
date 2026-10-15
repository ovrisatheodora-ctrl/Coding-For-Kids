const DIRECTIONS = [
  { dx: 0, dy: -1 },
  { dx: 1, dy: 0 },
  { dx: 0, dy: 1 },
  { dx: -1, dy: 0 },
];

export function countProgramBlocks(blocks) {
  return blocks.reduce(
    (total, block) => total + 1 + (block.type === 'repeat' ? countProgramBlocks(block.children) : 0),
    0,
  );
}

export function simulateBlockProgram(level, program, maxSteps = 200, boardSize = 4) {
  let x = level.start[0];
  let y = level.start[1];
  let direction = level.direction;
  let steps = 0;
  let executionLimitReached = false;
  let leftBoard = false;
  const frames = [];

  function advance(block, path) {
    if (steps >= maxSteps) {
      executionLimitReached = true;
      return false;
    }
    steps += 1;

    if (block.type === 'forward') {
      x += DIRECTIONS[direction].dx;
      y += DIRECTIONS[direction].dy;
      if (x < 0 || x >= boardSize || y < 0 || y >= boardSize) leftBoard = true;
    } else if (block.type === 'left') {
      direction = (direction + 3) % 4;
    } else if (block.type === 'right') {
      direction = (direction + 1) % 4;
    }

    frames.push({ x, y, direction, path, leftBoard });
    return !leftBoard;
  }

  function runBlocks(blocks, parentPath = []) {
    for (let index = 0; index < blocks.length; index += 1) {
      const block = blocks[index];
      const path = [...parentPath, index];
      if (block.type === 'repeat') {
        for (let iteration = 0; iteration < block.count; iteration += 1) {
          if (!advance(block, path) || !runBlocks(block.children, path)) return false;
        }
      } else if (!advance(block, path)) {
        return false;
      }
    }
    return true;
  }

  runBlocks(program);
  const reachedGoal = !executionLimitReached && !leftBoard
    && x === level.goal[0] && y === level.goal[1];
  return {
    position: [x, y],
    direction,
    steps,
    frames,
    reachedGoal,
    executionLimitReached,
    leftBoard,
  };
}

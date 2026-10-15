import assert from 'node:assert/strict';
import test from 'node:test';
import { countProgramBlocks, simulateBlockProgram } from '../src/games/blockBuilderEngine.js';
import { BLOCK_BUILDER_LEVELS } from '../src/games/blockBuilderLevels.js';

test('every Block Builder optimal program reaches its goal using the recorded block count', () => {
  assert.equal(BLOCK_BUILDER_LEVELS.levels.length, 5);

  for (const [index, level] of BLOCK_BUILDER_LEVELS.levels.entries()) {
    const programSize = countProgramBlocks(level.optimalProgram);
    const result = simulateBlockProgram(
      level,
      level.optimalProgram,
      BLOCK_BUILDER_LEVELS.maxExecutionSteps,
      BLOCK_BUILDER_LEVELS.boardSize,
    );

    assert.equal(
      result.reachedGoal,
      true,
      `level ${index + 1} optimal program must reach its goal`,
    );
    assert.equal(
      result.executionLimitReached,
      false,
      `level ${index + 1} optimal program must stay under the execution limit`,
    );
    assert.equal(
      programSize,
      level.optimalBlockCount,
      `level ${index + 1} optimal block count must match its recorded count`,
    );
    assert.ok(
      programSize <= level.blockLimit,
      `level ${index + 1} optimal program must fit its block limit`,
    );
  }
});

test('repeat programs stop at the execution step cap', () => {
  const level = BLOCK_BUILDER_LEVELS.levels[3];
  const result = simulateBlockProgram(
    level,
    [{ type: 'repeat', count: 1000, children: [{ type: 'right' }] }],
    BLOCK_BUILDER_LEVELS.maxExecutionSteps,
    BLOCK_BUILDER_LEVELS.boardSize,
  );

  assert.equal(result.steps, BLOCK_BUILDER_LEVELS.maxExecutionSteps);
  assert.equal(result.executionLimitReached, true);
  assert.equal(result.reachedGoal, false);
});

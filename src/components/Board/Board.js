import React, { useContext, useEffect, useState } from 'react';
import { InteractionManager, LayoutAnimation, View, Image } from 'react-native';
import { func, object } from 'prop-types';

import { CellSize, BorderWidth } from '../GlobalStyle';

import styles from './BoardStyles';
import Grid from '../Grid/Grid';
import Stack from '../Stack/Stack';
import { sudoku, isNumber } from '../../utils';

import { GameContext } from '../../contexts/GameContext';
import createIconUrl from '../../images/create.png';
import eraserIconUrl from '../../images/eraser.png';
import lightbulbIconUrl from '../../images/lightbulb.png';
import replayIconUrl from '../../images/replay.png';

const stack = [0, 1, 2, 3, 4, 5, 6, 7, 8];

function toXY(index) {
  const x = index % 9;
  const y = (index - x) / 9;
  return { x, y };
}

function toZ(index) {
  const { x, y } = toXY(index);
  return (x - (x % 3)) / 3 + (y - (y % 3));
}

const Board = ({
  onInit,
  solve,
  initPuzzle,
  initEditing,
  onMove,
  onErrorMove,
  onFinish,
}) => {
  // eslint-disable-next-line no-unused-vars
  const [count, setCount] = useContext(GameContext);

  const [index, setIndex] = useState(-1);

  let puzzle = solve || initPuzzle;
  let original = puzzle;
  let cells = [];
  let stacks = stack.map(() => new Array(9));
  let movedStacks = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  let hightlightNumber = null;
  let hightlightIndex = null;
  let editing = initEditing;
  let inited = false;
  let solved = false;

  const onCellPress = (newIndex, number) => {
    if (!inited || solved) return;
    if (isNumber(number)) {
      if (isNumber(hightlightIndex)) cells[hightlightIndex].setHighlight(false);
      if (isNumber(hightlightNumber)) {
        setHighlight(hightlightNumber, false);
      }
      setHighlight(number, true);
      hightlightNumber = number;
      setIndex(-1);
      return;
    }
    if (newIndex != index) {
      LayoutAnimation.easeInEaseOut();
      setIndex(newIndex);
    }

    if (isNumber(hightlightIndex)) cells[hightlightIndex].setHighlight(false);
    cells[index].setHighlight(true);
    hightlightIndex = index;

    if (isNumber(hightlightNumber)) {
      setHighlight(hightlightNumber, false);
      hightlightNumber = null;
    }
  };

  const onStackPress = (number) => {
    if (!inited) return;
    const localIndex = index;
    if (localIndex == -1) {
      if (isNumber(hightlightNumber)) {
        setHighlight(hightlightNumber, false);
        if (hightlightNumber == number) {
          hightlightNumber = null;
          return;
        }
      }
      setHighlight(number, true);
      hightlightNumber = number;
      return;
    }
    if (initEditing) {
      cells[localIndex].setHintNumber(number);
      return;
    }
    const stack = stacks[number][8 - movedStacks[number]];
    stack.moveTo(localIndex, () => {
      const { x, y } = toXY(localIndex);
      const z = toZ(localIndex);
      let collision = [];
      puzzle.forEach((item, idx) => {
        if (item != number) return;
        const pos = toXY(idx);
        if (pos.x == x || pos.y == y || toZ(idx) == z) collision.push(idx);
      });
      if (collision.length) {
        collision.forEach((i) => cells[i].setHighlight(true));
        stack.moveBack(() => {
          collision.forEach((i) => cells[i].setHighlight(false));
        });
        return;
      }
      let nextPuzzle = puzzle.slice();
      nextPuzzle[localIndex] = number;
      if (!sudoku.solvepuzzle(nextPuzzle)) {
        stack.moveBack(() => {
          onErrorMove();
        });
        return;
      }
      movedStacks[number]++;
      cells[localIndex].updateNumber(number);
      onMove();
      stack.setHide(true);
      puzzle[localIndex] = number;
      if (
        puzzle.filter((item, idx) => item != null && toZ(idx) == z).length == 9
      ) {
        animateGrid(z);
      }
      if (
        puzzle.filter((item, idx) => item != null && toXY(idx).y == y).length ==
        9
      ) {
        animateRow(y);
      }
      if (
        puzzle.filter((item, idx) => item != null && toXY(idx).x == x).length ==
        9
      ) {
        animateColumn(x);
      }
      if (puzzle.filter((x) => x == number).length == 9) {
        animateNumber(number);
      }
      if (puzzle.filter((x) => x != null).length == 81) {
        solved = true;
        cells[localIndex].setHighlight(false);
        setIndex(-1);
        onFinish();
        InteractionManager.runAfterInteractions(() => {
          animateAll();
        });
        return;
      }
      if (isNumber(hightlightNumber)) {
        setHighlight(hightlightNumber, false);
      }
      setHighlight(number, true);
      hightlightNumber = number;

      if (localIndex != index) return;
      setIndex(-1);
    });
  };

  const initBoard = () => {
    inited = false;
    solved = false;
    movedStacks = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    hightlightNumber = null;
    hightlightIndex = null;
    let count = 0;
    let fixedStack = [];
    const numberCount = puzzle.filter((x) => x != null).length;
    const gap = 150;
    for (let i = 0; i < 81; i++) {
      const number = puzzle[i];
      if (isNumber(number)) {
        count++;
        setTimeout(
          (count) => {
            const stack = stacks[number][8 - movedStacks[number]];
            fixedStack.push(stack);
            movedStacks[number]++;
            stack.moveTo(i, () => {
              cells[i].updateNumber(number, original[i] == puzzle[i]);
              if (count == numberCount) {
                requestAnimationFrame(() => {
                  fixedStack.map((item) => item.setHide(true));
                });
                setTimeout(() => {
                  inited = true;
                  onInit();
                }, gap);
              }
            });
          },
          gap * count,
          count
        );
      }
    }
  };

  useEffect(() => {
    initEditing = editing;

    if (!puzzle | (original == puzzle)) return;
    setIndex(-1);

    cells.forEach((x) => x.reset());
    movedStacks.forEach((x, number) => {
      for (let i = 0; i < x; i++) stacks[number][8 - i].reset();
    });

    // eslint-disable-next-line no-undef
    puzzle = solve || puzzle;
    // eslint-disable-next-line no-undef
    original = puzzle;

    initBoard();
  }, [editing, puzzle, solve]);

  const animateRow = (x) => {
    stack.forEach((i) => cells[i + x * 9].animate());
  };

  const animateColumn = (y) => {
    stack.forEach((i) => cells[i * 9 + y].animate());
  };

  const animateGrid = (z) => {
    const x = z % 3;
    const y = (z - x) / 3;
    stack.forEach((i) => {
      const xx = i % 3;
      const yy = (i - xx) / 3;
      const index = xx + yy * 3 * 3 + y * 27 + x * 3;
      cells[index].animate();
    });
  };

  const animateNumber = (number) => {
    puzzle.forEach((item, i) => {
      if (item == number) cells[i].animate();
    });
  };

  const animateAll = () => {
    puzzle.forEach((item, i) => {
      cells[i].animate();
    });
  };

  const setHighlight = (number, highlight) => {
    puzzle.forEach((item, i) => {
      if (item == number) cells[i].setHighlight(highlight);
    });
  };

  const { x, y } = toXY(index);
  const top = y * CellSize + Math.floor(y / 3) * BorderWidth * 2;
  const left = x * CellSize + Math.floor(x / 3) * BorderWidth * 2;

  return (
    <View style={styles.container}>
      <View style={styles.boardContainer}>
        <View style={styles.board}>
          <Grid
            ref={(ref) => ref && (cells = ref.cells)}
            onPress={onCellPress}
          />
          {index != -1 && (
            <View pointerEvents="none" style={[styles.row, { top }]} />
          )}
          {index != -1 && (
            <View pointerEvents="none" style={[styles.column, { left }]} />
          )}
        </View>
      </View>
      <View style={styles.iconsWrap}>
        <View style={styles.icons}>
          <Image style={styles.icon} source={replayIconUrl} />
        </View>
        <View style={styles.icons}>
          <Image style={styles.icon} source={eraserIconUrl} />
        </View>
        <View style={styles.icons}>
          <Image style={styles.icon} source={createIconUrl} />
        </View>
        <View style={styles.icons}>
          <Image
            style={{ ...styles.icon, ...styles.lastIcon }}
            source={lightbulbIconUrl}
          />
        </View>
      </View>
      <Stack
        ref={(ref) => ref && (stacks = ref.stacks)}
        onPress={onStackPress}
      />
    </View>
  );
};

Board.propTypes = {
  onInit: func.isRequired,
  solve: object,
  initPuzzle: object,
  initEditing: object,
  onMove: func.isRequired,
  onErrorMove: func.isRequired,
  onFinish: func.isRequired,
};

Board.defaultProps = {
  solve: null,
  initPuzzle: null,
  initEditing: null,
};

export default Board;

import React, {useState} from 'react';

import {InteractionManager, LayoutAnimation, View} from 'react-native';

import {CellSize, BorderWidth} from '../GlobalStyle';

import styles from './BoardStyles';
import Grid from '../Grid/Grid';
import Stack from '../Stack/Stack';
import {sudoku, isNumber} from '../../utils';

const stack = [0, 1, 2, 3, 4, 5, 6, 7, 8];

function toXY(index) {
  const x = index % 9;
  const y = (index - x) / 9;
  return {x, y};
}

function toZ(index) {
  const {x, y} = toXY(index);
  return (x - (x % 3)) / 3 + (y - (y % 3));
}

const Board = (
  onInit,
  solve,
  initPuzzle,
  initEditing,
  onMove,
  onErrorMove,
  onFinish,
) => {
  const [index, setIndex] = useState(-1);

  let puzzle = solve || initPuzzle;
  let original = puzzle;
  let cells = [];
  let stacks = stack.map((x) => new Array(9));
  let movedStacks = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  let hightlightNumber = null;
  let hightlightIndex = null;
  let editing = initEditing;
  let inited = false;
  let solved = false;

  const onCellPress = (index, number, fixed) => {
    if (!this.inited || this.solved) return;
    if (isNumber(number)) {
      if (isNumber(this.hightlightIndex))
        this.cells[this.hightlightIndex].setHighlight(false);
      if (isNumber(this.hightlightNumber)) {
        setHighlight(this.hightlightNumber, false);
      }
      setHighlight(number, true);
      this.hightlightNumber = number;
      this.setState({
        index: -1,
      });
      return;
    }
    if (index != this.state.index) {
      LayoutAnimation.easeInEaseOut();
      this.setState({index});
    }

    if (isNumber(this.hightlightIndex))
      this.cells[this.hightlightIndex].setHighlight(false);
    this.cells[index].setHighlight(true);
    this.hightlightIndex = index;

    if (isNumber(this.hightlightNumber)) {
      setHighlight(this.hightlightNumber, false);
      this.hightlightNumber = null;
    }
  };

  const onStackPress = (number) => {
    if (!this.inited) return;
    const localIndex = index;
    if (localIndex == -1) {
      if (isNumber(this.hightlightNumber)) {
        setHighlight(this.hightlightNumber, false);
        if (this.hightlightNumber == number) {
          this.hightlightNumber = null;
          return;
        }
      }
      setHighlight(number, true);
      this.hightlightNumber = number;
      return;
    }
    if (initEditing) {
      this.cells[localIndex].setHintNumber(number);
      return;
    }
    const stack = this.stacks[number][8 - this.movedStacks[number]];
    stack.moveTo(localIndex, () => {
      const {x, y} = toXY(localIndex);
      const z = toZ(localIndex);
      let collision = [];
      puzzle.forEach((item, idx) => {
        if (item != number) return;
        const pos = toXY(idx);
        if (pos.x == x || pos.y == y || toZ(idx) == z) collision.push(idx);
      });
      if (collision.length) {
        collision.forEach((i) => this.cells[i].setHighlight(true));
        stack.moveBack(() => {
          collision.forEach((i) => this.cells[i].setHighlight(false));
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
      this.movedStacks[number]++;
      this.cells[localIndex].updateNumber(number);
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
        this.solved = true;
        this.cells[localIndex].setHighlight(false);
        setIndex(-1);
        onFinish();
        InteractionManager.runAfterInteractions(() => {
          animateAll();
        });
        return;
      }
      if (isNumber(this.hightlightNumber)) {
        setHighlight(this.hightlightNumber, false);
      }
      setHighlight(number, true);
      this.hightlightNumber = number;

      if (localIndex != index) return;
      setIndex(-1);
    });
  };

  const initBoard = () => {
    this.inited = false;
    this.solved = false;
    this.movedStacks = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.hightlightNumber = null;
    this.hightlightIndex = null;
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
            const stack = this.stacks[number][8 - this.movedStacks[number]];
            fixedStack.push(stack);
            this.movedStacks[number]++;
            stack.moveTo(i, () => {
              this.cells[i].updateNumber(number, this.original[i] == puzzle[i]);
              if (count == numberCount) {
                requestAnimationFrame(() => {
                  fixedStack.map((item, idx) => item.setHide(true));
                });
                setTimeout(() => {
                  this.inited = true;
                  onInit();
                }, gap);
              }
            });
          },
          gap * count,
          count,
        );
      }
    }
  };

  // componentWillReceiveProps(nextProps) {
  //   initEditing = nextProps.editing;
  //   if (!nextProps.puzzle | (this.original == nextProps.puzzle)) return;
  //   this.setState({index: -1});
  //   this.cells.forEach((x) => x.reset());
  //   this.movedStacks.forEach((x, number) => {
  //     for (let i = 0; i < x; i++) this.stacks[number][8 - i].reset();
  //   });
  //   puzzle = nextProps.solve || nextProps.puzzle;
  //   this.original = nextProps.puzzle;
  //   initBoard();
  // }

  const animateRow = (x) => {
    stack.forEach((i) => this.cells[i + x * 9].animate());
  };

  const animateColumn = (y) => {
    stack.forEach((i) => this.cells[i * 9 + y].animate());
  };

  const animateGrid = (z) => {
    const x = z % 3;
    const y = (z - x) / 3;
    stack.forEach((i) => {
      const xx = i % 3;
      const yy = (i - xx) / 3;
      const index = xx + yy * 3 * 3 + y * 27 + x * 3;
      this.cells[index].animate();
    });
  };

  const animateNumber = (number) => {
    puzzle.forEach((item, i) => {
      if (item == number) this.cells[i].animate();
    });
  };

  const animateAll = () => {
    puzzle.forEach((item, i) => {
      this.cells[i].animate();
    });
  };

  const setHighlight = (number, highlight) => {
    puzzle.forEach((item, i) => {
      if (item == number) this.cells[i].setHighlight(highlight);
    });
  };

  const {x, y} = toXY(index);
  const top = y * CellSize + Math.floor(y / 3) * BorderWidth * 2;
  const left = x * CellSize + Math.floor(x / 3) * BorderWidth * 2;

  return (
    <View style={styles.container}>
      <View style={styles.boardContainer}>
        <View style={styles.board}>
          <Grid
            ref={(ref) => ref && (this.cells = ref.cells)}
            onPress={onCellPress}
          />
          {index != -1 && (
            <View pointerEvents="none" style={[styles.row, {top}]} />
          )}
          {index != -1 && (
            <View pointerEvents="none" style={[styles.column, {left}]} />
          )}
        </View>
      </View>
      <Stack
        ref={(ref) => ref && (this.stacks = ref.stacks)}
        onPress={onStackPress}
      />
    </View>
  );
};

export default Board;

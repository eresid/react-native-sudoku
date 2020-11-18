import React, { useEffect, useState } from 'react';
import {
  AppState,
  Alert,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import { object } from 'prop-types';

import styles from './BoardScreenStyles';
import TimerHelper from '../../utils/TimerHelper';
import { Store, sudoku } from '../../utils';
import I18n from '../../utils/i18n';
import formatTime from '../../utils/formatTime';
import Board from '../../components/Board/Board';
import arrowBackUrl from '../../images/arrow_back.png';

const BoardScreen = ({ navigation: { goBack } }) => {
  const [puzzle, setPuzzle] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [initing, setIniting] = useState(false);
  const [editing, setEditing] = useState(false);

  const timer = new TimerHelper();

  let initPuzzle = null;
  let solve = null;
  let error = 0;
  let elapsed = null;
  let fromStore = false;
  let records = [];
  let nextPuzzle = null;

  const handeleAppStateChange = (currentAppState) => {
    if (currentAppState != 'active') onShowModal();
  };

  const initData = async () => {
    try {
      records = (await Store.get('records')) || [];
      const puzzle = await Store.get('puzzle');
      if (puzzle) {
        initPuzzle = puzzle.slice();
        fromStore = true;
        solve = await Store.get('solve');
        error = (await Store.get('error')) || 0;
        elapsed = await Store.get('elapsed');
      }
    } catch (e) {
      alert(e.message);
    }
  };

  useEffect(() => {
    AppState.addEventListener('change', handeleAppStateChange);

    initData();

    return () => {
      AppState.removeEventListener('change', handeleAppStateChange);
    };
  }, []);

  // eslint-disable-next-line no-unused-vars
  const disabled = !playing && !fromStore;
  if (puzzle && !solve) solve = puzzle.slice();

  const onInit = () => {
    setIniting(false);
    setPlaying(true);
  };

  const onErrorMove = () => {
    error++;
    const message =
      error > 3 ? I18n.t('fail') : I18n.t('errormove', { error: error });
    Alert.alert(I18n.t('nosolve'), message, [
      { text: I18n.t('ok') },
      { text: I18n.t('newgame'), onPress: onCreate },
    ]);
  };

  const onFinish = () => {
    setPlaying(false);

    Store.multiRemove('puzzle', 'solve', 'error', 'elapsed');
    let elapsed = null;
    solve = null;
    fromStore = false;
    elapsed = timer.stop();
    if (error > 3) {
      setTimeout(() => {
        Alert.alert(
          I18n.t('congrats'),
          I18n.t('success') + formatTime(elapsed) + '\n' + I18n.t('fail'),
          [
            { text: I18n.t('ok') },
            { text: I18n.t('newgame'), onPress: onCreate },
          ]
        );
      }, 2000);
      return;
    }
    if (!records.includes(elapsed)) {
      records.push(elapsed);
      records.sort((a, b) => a - b);
      records = records.slice(0, 5);
      Store.set('records', records);
    }
    const length = records.length;
    const newRecord = elapsed == records[0] && length > 1;
    setTimeout(() => {
      Alert.alert(
        I18n.t('congrats'),
        (newRecord ? I18n.t('newrecord') : I18n.t('success')) +
          formatTime(elapsed),
        [{ text: I18n.t('ok') }, { text: I18n.t('newgame'), onPress: onCreate }]
      );
    }, 2000);
  };
  const onCreate = async () => {
    elapsed = null;
    error = 0;
    solve = null;
    fromStore = false;
    timer.reset();
    let puzzle;
    if (nextPuzzle) {
      puzzle = nextPuzzle.slice();
      nextPuzzle = null;
    } else {
      puzzle = sudoku.makepuzzle();
    }

    setPuzzle(puzzle);
    setIniting(true);
    setEditing(false);
    setPlaying(false);

    await Store.multiRemove('puzzle', 'solve', 'error', 'elapsed');
    initPuzzle = puzzle.slice();
    Store.set('puzzle', initPuzzle);
  };

  const onShowModal = () => {
    if (!initing) {
      if (solve) Store.set('solve', solve);
      if (error) Store.set('error', error);
      elapsed = timer.pause();
      if (elapsed) Store.set('elapsed', elapsed);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backIcon}
          activeOpacity={1}
          onPress={() => goBack()}
        >
          <Image source={arrowBackUrl} />
        </TouchableOpacity>
        <Text style={styles.title}>{I18n.t('name')}</Text>
      </View>
      <Board
        puzzle={puzzle}
        solve={solve}
        editing={editing}
        onInit={onInit}
        onErrorMove={onErrorMove}
        onFinish={onFinish}
      />
    </View>
  );
};

BoardScreen.propTypes = {
  navigation: object.isRequired,
};

export default BoardScreen;

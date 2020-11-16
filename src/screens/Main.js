import React, { useEffect, useState } from 'react';

import {
  AppState,
  Alert,
  Modal,
  Image,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import styles from './MainStyles';
import TimerHelper from '../utils/TimerHelper';
import { Store, sudoku } from '../utils';
import I18n from '../utils/i18n';
import formatTime from '../utils/formatTime';
import { onShare, onRate } from '../utils/sharerate';
import Board from '../components/Board/Board';
import menuUrl from '../images/menu.png';
import editUrl from '../images/edit.png';
import playUrl from '../images/play.png';
import reloadUrl from '../images/reload.png';
import shuffleUrl from '../images/shuffle.png';
import shareUrl from '../images/share.png';
import closeUrl from '../images/close.png';
import rateUrl from '../images/rate.png';

const Main = () => {
  const [puzzle, setPuzzle] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [initing, setIniting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [gameTime, setGameTime] = useState(0);

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

  useEffect(() => {
    if (showModal) {
      if (!nextPuzzle) nextPuzzle = sudoku.makepuzzle();
    }
  }, [showModal]);

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

    setShowModal(true);
  };

  useEffect(() => {
    AppState.addEventListener('change', handeleAppStateChange);

    initData();

    return () => {
      AppState.removeEventListener('change', handeleAppStateChange);
    };
  }, []);

  const disabled = !playing && !fromStore;
  if (puzzle && !solve) solve = puzzle.slice();

  const onInit = () => {
    setIniting(false);
    setPlaying(true);
    setShowModal(false);

    timer.start((elapsed) => {
      console.log(setGameTime(elapsed));
    });
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

  const onToggleEditing = () => {
    setEditing(!editing);
  };

  const onResume = () => {
    if (fromStore) {
      timer.setElapsed(elapsed);

      setPuzzle(initPuzzle);
      setIniting(true);
      setShowModal(false);

      fromStore = false;
      return;
    }
    timer.resume();

    setShowModal(false);
  };

  const onClear = () => {
    elapsed = null;
    error = 0;
    solve = null;
    fromStore = false;
    timer.reset();
    Store.multiRemove('solve', 'error', 'elapsed');

    setPuzzle(initPuzzle.slice());
    setIniting(true);
    setEditing(false);
    setPlaying(false);
    setShowModal(false);
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
    setShowModal(false);

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

    setShowModal(true);
  };

  const onCloseModal = () => {
    timer.resume();

    requestAnimationFrame(() => {
      setShowModal(false);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.8}
          disabled={initing}
          onPress={() => onShowModal()}
        >
          <Image
            style={[styles.icon, initing && styles.disabled]}
            source={menuUrl}
          />
        </TouchableOpacity>
        <Text style={[styles.timerText, styles.timer]}>
          {formatTime(gameTime)}
        </Text>
        <TouchableOpacity
          activeOpacity={0.8}
          disabled={!playing}
          onPress={() => onToggleEditing()}
        >
          <Image
            style={[
              styles.icon,
              editing && { tintColor: 'khaki' },
              !playing && styles.disabled,
            ]}
            source={editUrl}
          />
        </TouchableOpacity>
      </View>
      <Board
        puzzle={puzzle}
        solve={solve}
        editing={editing}
        onInit={onInit}
        onErrorMove={onErrorMove}
        onFinish={onFinish}
      />
      <Modal
        animationType="slide"
        visible={showModal}
        transparent={true}
        onRequestClose={onCloseModal}
      >
        <View style={styles.modal}>
          <View style={[styles.modalContainer]}>
            <Text style={styles.title}>{I18n.t('name')}</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              disabled={disabled}
              style={styles.button}
              onPress={onResume}
            >
              <Image
                style={[styles.buttonIcon, disabled && styles.disabled]}
                source={playUrl}
              />
              <Text style={[styles.buttonText, disabled && styles.disabled]}>
                {I18n.t('continue')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              disabled={disabled}
              style={styles.button}
              onPress={onClear}
            >
              <Image
                style={[styles.buttonIcon, disabled && styles.disabled]}
                source={reloadUrl}
              />
              <Text style={[styles.buttonText, disabled && styles.disabled]}>
                {I18n.t('restart')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.button}
              onPress={onCreate}
            >
              <Image style={styles.buttonIcon} source={shuffleUrl} />
              <Text style={styles.buttonText}>{I18n.t('newgame')}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.footer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.button}
              onPress={onShare}
            >
              <Image
                style={[styles.buttonIcon, styles.disabled]}
                source={shareUrl}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.button}
              onPress={onCloseModal}
            >
              <Image
                style={[styles.buttonIcon, styles.disabled]}
                source={closeUrl}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.button}
              onPress={onRate}
            >
              <Image
                style={[styles.buttonIcon, styles.disabled]}
                source={rateUrl}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Main;

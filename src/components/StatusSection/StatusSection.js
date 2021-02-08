import React from 'react';
import { View, Text, Image, Switch, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { bool, func } from 'prop-types';

import styles from './StatusSectionStyles';
import NumberStack from '../NumberStack/NumberStack';

import eraserIconUrl from '../../images/eraser.png';
import lightbulbIconUrl from '../../images/lightbulb.png';
import replayIconUrl from '../../images/replay.png';

const StatusSection = ({
  mistakesMode,
  fastMode,
  onClickNumber,
  // onChange,
  onClickUndo,
  onClickErase,
  onClickHint,
  onClickMistakesMode,
  onClickFastMode,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.boardContainer}></View>
      <DropDownPicker
        items={[
          {
            label: 'USA',
            value: 'usa',
            hidden: true,
          },
          {
            label: 'UK',
            value: 'uk',
          },
          {
            label: 'France',
            value: 'france',
          },
        ]}
        defaultValue={'uk'}
        containerStyle={{ height: 40 }}
        style={{ backgroundColor: '#fafafa' }}
        itemStyle={{
          justifyContent: 'flex-start',
        }}
        dropDownStyle={{ backgroundColor: '#fafafa' }}
        onChangeItem={(item) => alert(item)}
      />
      <View style={styles.iconsWrap}>
        <TouchableOpacity onPress={onClickUndo}>
          <View style={styles.icons}>
            <Image style={styles.icon} source={replayIconUrl} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClickErase}>
          <View style={styles.icons}>
            <Image style={styles.icon} source={eraserIconUrl} />
          </View>
        </TouchableOpacity>
        {/* <View style={styles.icons}>
            <Image style={styles.icon} source={createIconUrl} />
          </View> */}
        <TouchableOpacity onPress={onClickHint}>
          <View style={styles.icons}>
            <Image
              style={{ ...styles.icon, ...styles.lastIcon }}
              source={lightbulbIconUrl}
            />
          </View>
        </TouchableOpacity>
      </View>
      <NumberStack onPress={(number) => onClickNumber(number.toString())} />
      <View style={styles.modelsWrapper}>
        <View style={styles.modelsTitle}>
          <Text>Models</Text>
        </View>
        <View style={styles.modelsSwitchesWrapper}>
          <View style={styles.modelsSwitch}>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={mistakesMode ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={onClickMistakesMode}
              value={mistakesMode}
            />
            <Text>Mistakes</Text>
          </View>

          <View style={styles.modelsSwitch}>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={fastMode ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={onClickFastMode}
              value={fastMode}
            />
            <Text>Fast</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

StatusSection.propTypes = {
  mistakesMode: bool,
  fastMode: bool,
  onClickNumber: func.isRequired,
  onClickUndo: func.isRequired,
  onClickErase: func.isRequired,
  onClickHint: func.isRequired,
  onClickMistakesMode: func.isRequired,
  onClickFastMode: func.isRequired,
};

StatusSection.defaultProps = {
  mistakesMode: false,
};

export default StatusSection;

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet } from 'react-native';

import HomeScreen from '../screens/HomeScreen/HomeScreen';
import StatisticScreen from '../screens/StatisticScreen/StatisticScreen';
import homeIconUrl from '../images/home.png';
import statisticIconUrl from '../images/statistic.png';

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

const Tab = createBottomTabNavigator();

export function TabMainNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          if (route.name === 'Home') {
            return (
              <Image
                source={homeIconUrl}
                style={styles.icon}
                tintColor={color}
              />
            );
          } else if (route.name === 'Statistic') {
            return (
              <Image
                source={statisticIconUrl}
                style={styles.icon}
                tintColor={color}
              />
            );
          }
        },
      })}
      tabContainerStyle={{
        elevation: 0,
      }}
      tabBarOptions={{
        activeTintColor: '#2196f3',
        style: {
          height: 60,
          paddingBottom: 16,
        },

        tabStyle: {
          borderTopColor: '#fff',
          borderTopWidth: 15,
          marginTop: -15,
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
      tabBarBadgeStyle={{
        color: 'green',
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Statistic" component={StatisticScreen} />
    </Tab.Navigator>
  );
}

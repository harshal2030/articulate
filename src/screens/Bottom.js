import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { commonGrey, commonBlue, greyWithAlpha } from './../styles';
import HomeScreen from './Home';
import Profile from './Profile';

const Tab = createMaterialBottomTabNavigator();

const Navigator = () => {
    return (
        <Tab.Navigator
            initialRouteName="home"
            activeColor={commonBlue}
            shifting={true}
            barStyle={{
                borderTopColor: greyWithAlpha(0.5),
                borderTopWidth: 0.4,
                backgroundColor: '#fff',
            }}
            inactiveColor={commonGrey}>
            <Tab.Screen
                name="home"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <Entypo name="home" color={color} size={20} />
                    ),
                }}
            />
            <Tab.Screen
                name="search"
                component={Profile}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="account"
                            color={color}
                            size={20}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default Navigator;

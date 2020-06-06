/**
 * @format
 */
import React from 'react';
import { AppRegistry } from 'react-native';
import App from './src/App';
import { NavigationContainer } from '@react-navigation/native';
import { name as appName } from './app.json';

const Wrapper = () => (
    <NavigationContainer>
        <App />
    </NavigationContainer>
);

AppRegistry.registerComponent(appName, () => Wrapper);

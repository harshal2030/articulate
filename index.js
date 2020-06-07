/**
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import { AppRegistry } from 'react-native';
import App from './src/App';
import { NavigationContainer } from '@react-navigation/native';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore';
console.disableYellowBox = true;

const store = configureStore();

const Wrapper = () => (
    <Provider store={store}>
        <NavigationContainer>
            <App />
        </NavigationContainer>
    </Provider>
);

AppRegistry.registerComponent(appName, () => Wrapper);

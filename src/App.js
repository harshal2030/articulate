import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as registerToken from './actions/registerToken';
import { Spinner } from './components/Spinner';

import SignUp from './screens/SignUp';
import LogIn from './screens/LogIn';

import Home from './screens/Bottom';
import PostArticle from './screens/PostArticle';
import FullScreen from './screens/FullScreen';

const Stack = createStackNavigator();

class App extends React.Component {
    state = {
        loading: true,
    };

    check = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            this.props.actions.registerToken(token);
            this.setState({ loading: false });
        } catch (e) {
            console.log(e);
        }
    };

    componentDidMount() {
        this.check();
    }

    render() {
        if (this.state.loading) {
            return <Spinner />;
        } else {
            return (
                <Stack.Navigator headerMode="none">
                    {this.props.token === null ? (
                        <>
                            <Stack.Screen name="signup" component={SignUp} />
                            <Stack.Screen name="login" component={LogIn} />
                        </>
                    ) : (
                        <>
                            <Stack.Screen name="home" component={Home} />
                            <Stack.Screen name="post" component={PostArticle} />
                            <Stack.Screen name="full" component={FullScreen} />
                        </>
                    )}
                </Stack.Navigator>
            );
        }
    }
}

const ActionCreators = Object.assign({}, registerToken);

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

const mapStateToProps = (state) => ({
    token: state.token.token,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

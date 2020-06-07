import * as React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Header, Container, Body, Title } from 'native-base';
import { commonBackground, commonBlue, statusbarColor } from '../styles';
import { TextInput, Button } from 'react-native-paper';
import { Spinner } from './../components/Spinner';
import { signupURL } from './../url.json';
import AsynStorage from '@react-native-community/async-storage';
import * as registerToken from './../actions/registerToken';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class SignUp extends React.Component {
    state = {
        username: '',
        password: '',
    };

    storeData = async (token) => {
        try {
            await AsynStorage.setItem('token', token);
        } catch (e) {}
    };

    sendData = () => {
        const { username, password } = this.state;

        if (username.length < 1 || password.length < 6) {
            return Alert.alert('Invalid values');
        }

        fetch(signupURL, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            }),
        })
            .then((res) => {
                console.log(res.status);
                if (res.status !== 200) {
                    throw new Error();
                }

                return res.json();
            })
            .then((json) => {
                this.storeData(json.token);
                this.props.actions.registerToken(json.token);
            })
            .catch((e) => {
                Alert.alert('Something went wrong');
                console.log(e);
            });
    };

    updateButton = () => {
        if (this.state.activityIndicator_loading) {
            return <Spinner />;
        } else {
            return (
                <Button
                    mode="contained"
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{
                        marginTop: 20,
                        borderRadius: 8,
                        backgroundColor: commonBlue,
                    }}
                    onPress={this.sendData}>
                    Create Account
                </Button>
            );
        }
    };

    render() {
        console.log(this.props.actions);
        const { container } = styles;
        return (
            <Container style={{ backgroundColor: commonBackground }}>
                <Header
                    style={{ backgroundColor: commonBlue }}
                    androidStatusBarColor={statusbarColor}>
                    <Body>
                        <Title style={{ color: '#fff' }}>Create Account</Title>
                    </Body>
                </Header>
                <View style={container}>
                    <TextInput
                        label="username"
                        value={this.state.username}
                        maxLength={25}
                        onChangeText={(username) => this.setState({ username })}
                        mode="outlined"
                        autoCapitalize="none"
                        error={this.state.usernameError}
                        theme={{
                            roundness: 8,
                            colors: {
                                primary: commonBlue,
                            },
                        }}
                    />
                    <TextInput
                        label="Password"
                        secureTextEntry={true}
                        value={this.state.password}
                        onChangeText={(password) =>
                            this.setState({ password: password })
                        }
                        mode="outlined"
                        theme={{
                            roundness: 8,
                            colors: {
                                primary: commonBlue,
                            },
                        }}
                    />
                    {this.updateButton()}
                    <Button
                        compact={true}
                        onPress={() => this.props.navigation.navigate('login')}>
                        Already have an account? Log In.
                    </Button>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
});

const ActionCreators = Object.assign({}, registerToken);

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

const mapStateTopProps = (state) => ({
    token: state.token.token,
});

export default connect(mapStateTopProps, mapDispatchToProps)(SignUp);

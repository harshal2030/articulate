import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Header, Container, Body, Title } from 'native-base';
import { commonBackground, commonBlue, statusbarColor } from '../styles';
import { TextInput, Button } from 'react-native-paper';
import { Spinner } from './../components/Spinner';

class SignUp extends React.Component {
    state = {
        username: '',
        password: '',
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
                    Log In
                </Button>
            );
        }
    };

    render() {
        const { container } = styles;
        return (
            <Container style={{ backgroundColor: commonBackground }}>
                <Header
                    style={{ backgroundColor: commonBlue }}
                    androidStatusBarColor={statusbarColor}>
                    <Body>
                        <Title style={{ color: '#fff' }}>Log In</Title>
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
                        onPress={() => this.props.navigation.goBack()}>
                        New User? Create Account.
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

export default SignUp;

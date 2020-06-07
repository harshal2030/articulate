import * as React from 'react';
import {
    FlatList,
    View,
    ImageBackground,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import {
    Header,
    Right,
    Title,
    Button,
    Icon,
    Container,
    Body,
    Left,
} from 'native-base';
import {
    commonBackground,
    commonBlue,
    statusbarColor,
    greyWithAlpha,
} from './../styles';
import { postURL, imgURL, avatarURL, logoutURL } from './../url.json';
import { connect } from 'react-redux';
import { Thumbnail, Text } from 'native-base';
import RNRestart from 'react-native-restart';
import AsyncStorage from '@react-native-community/async-storage';

class Home extends React.Component {
    state = {
        loaded: false,
        data: [],
    };

    removeData = async () => {
        try {
            await AsyncStorage.removeItem('token');
        } catch (e) {}
    };

    componentDidMount() {
        this.getData();
    }
    getData = () => {
        fetch(postURL, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.props.token,
            },
        })
            .then((res) => {
                console.log(res.status);
                if (res.status !== 200) {
                    throw new Error();
                }

                return res.json();
            })
            .then((json) => {
                this.setState({ data: json, loaded: true });
            })
            .catch((e) => {
                console.log(e);
            });
    };

    renderComponent = ({ item }) => {
        return (
            <TouchableOpacity
                style={styles.container}
                onPress={() =>
                    this.props.navigation.navigate('full', {
                        id: item.id,
                    })
                }>
                <ImageBackground
                    source={{ uri: `${imgURL}/${item.photo}` }}
                    style={styles.img}>
                    <View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                padding: 5,
                                backgroundColor: greyWithAlpha(0.4),
                            }}>
                            <Thumbnail
                                source={{ uri: `${avatarURL}/${item.avatar}` }}
                                small
                                style={{ backgroundColor: '#fff' }}
                            />
                            <Text style={{ color: '#fff' }}>
                                {item.username}
                            </Text>
                        </View>
                        <View>
                            <Title style={{ marginLeft: 10 }}>
                                {item.title}
                            </Title>
                        </View>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        );
    };

    logout = () => {
        fetch(logoutURL, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + this.props.token,
            },
        })
            .then((response) => {
                console.log(response.status);
                console.log(response.text());
                if (response.status !== 200) {
                    throw new Error('Unable to logout');
                }

                this.removeData();
                RNRestart.Restart();
            })
            .catch((e) => {
                console.log(e);
            });
    };

    renderList = () => {
        if (this.state.loaded) {
            return (
                <FlatList
                    data={this.state.data}
                    renderItem={this.renderComponent}
                />
            );
        }
    };

    render() {
        return (
            <Container style={{ backgroundColor: commonBackground }}>
                <Header
                    style={{ backgroundColor: '#fff' }}
                    androidStatusBarColor={statusbarColor}>
                    <Left>
                        <Button transparent onPress={this.logout}>
                            <Icon
                                name="log-out"
                                type="Entypo"
                                style={{ color: commonBlue }}
                            />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: commonBlue }}>Home</Title>
                    </Body>
                    <Right>
                        <Button
                            transparent
                            onPress={() =>
                                this.props.navigation.navigate('post')
                            }>
                            <Icon name="add" style={{ color: commonBlue }} />
                        </Button>
                    </Right>
                </Header>
                {this.renderList()}
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    img: {
        height: 150,
        width: '100%',
        borderWidth: 1,
        backgroundColor: commonBlue,
    },
    container: {
        alignItems: 'center',
        borderWidth: 1,
        borderColor: commonBackground,
        borderRadius: 10,
        overflow: 'hidden',
        marginTop: 10,
        marginBottom: 10,
    },
});

const mapStateToProps = (state) => ({
    token: state.token.token,
});

export default connect(mapStateToProps)(Home);

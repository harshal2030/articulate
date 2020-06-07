import * as React from 'react';
import { View, Image } from 'react-native';
import { postURL, imgURL, avatarURL } from './../url.json';
import { connect } from 'react-redux';
import {
    Header,
    Left,
    Body,
    Title,
    Right,
    Thumbnail,
    Container,
    Content,
    Button,
    Icon,
    Text,
} from 'native-base';
import { commonBackground, commonBlue, statusbarColor } from './../styles';

class FullScreen extends React.Component {
    state = {
        data: {},
    };

    componentDidMount() {
        this.getData();
    }
    getData = () => {
        fetch(`${postURL}/${this.props.route.params.id}`, {
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
                this.setState({ data: json });
            })
            .catch((e) => console.log(e));
    };
    render() {
        const { title, avatar, text, photo, username } = this.state.data;
        return (
            <Container style={{ backgroundColor: commonBackground }}>
                <Header
                    style={{ backgroundColor: '#fff' }}
                    androidStatusBarColor={statusbarColor}>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.popToTop()}>
                            <Icon
                                name="arrow-back"
                                style={{ color: commonBlue }}
                            />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: '#000' }}>Article</Title>
                    </Body>
                    <Right />
                </Header>
                <Content padder>
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Thumbnail source={{ uri: `${avatarURL}/${avatar}` }} />
                        <Text style={{ fontWeight: 'bold' }}>{username}</Text>
                    </View>
                    <Text
                        style={{
                            color: '#000',
                            fontSize: 20,
                            fontWeight: 'bold',
                            marginTop: 15,
                        }}>
                        {title}
                    </Text>
                    <Image
                        source={{ uri: `${imgURL}/${photo}` }}
                        style={{ height: 200, width: '100%', marginTop: 20 }}
                    />
                    <Text style={{ marginTop: 15 }}>{text}</Text>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    token: state.token.token,
});

export default connect(mapStateToProps)(FullScreen);

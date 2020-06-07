import * as React from 'react';
import {
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    Alert,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {
    Header,
    Left,
    Body,
    Title,
    Container,
    Button,
    Icon,
    Right,
    Content,
    Form,
    Item,
    Input,
    Text,
} from 'native-base';
import {
    commonBackground,
    commonBlue,
    statusbarColor,
    greyWithAlpha,
} from './../styles';
import RNFetchBlob from 'rn-fetch-blob';
import { postURL } from './../url.json';
import { connect } from 'react-redux';

const options = {
    title: 'Select a photo',
    takePhotoButtonTitle: 'Take a photo',
    chooseFromLibraryButtonTitle: 'Pick from gallery',
    quality: 0.8,
};

class PostArticle extends React.Component {
    state = {
        uri: null,
        title: '',
        text: '',
        loading: false,
    };

    selectPhoto() {
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log(
                    'User tapped custom button: ',
                    response.customButton,
                );
            } else {
                const source = { uri: response.uri };

                this.setState({
                    uri: source.uri,
                });
            }
        });
    }

    uploadMedia = () => {
        const data =
            this.state.uri === null ? null : RNFetchBlob.wrap(this.state.uri);

        this.setState({ loading: true }, () => {
            RNFetchBlob.fetch(
                'POST',
                postURL,
                {
                    Authorization: 'Bearer ' + this.props.token,
                    'Content-Type': 'multipart/form-data',
                },
                [
                    {
                        name: 'image',
                        filename: 'image.png',
                        data: data,
                    },
                    {
                        name: 'info',
                        data: JSON.stringify({
                            text: this.state.text,
                            title: this.state.title,
                        }),
                    },
                ],
            )
                .then((response) => {
                    console.log(response.respInfo.status);
                    console.log(response.text());
                    if (response.respInfo.status !== 200) {
                        Alert.alert('Something went wrong! Try again later');
                        this.setState({ loading: false });
                        throw new Error();
                    } else {
                        this.setState({ loading: false });
                        this.props.navigation.popToTop();
                    }
                })
                .catch(() => {
                    Alert.alert(
                        'Error',
                        'Something went wrong in upload this post. Please try again later.',
                    );
                    this.setState({ loading: false });
                });
        });
    };

    render() {
        return (
            <Container style={{ backgroundColor: commonBackground }}>
                <Header
                    style={{ backgroundColor: '#fff' }}
                    androidStatusBarColor={statusbarColor}>
                    <Left>
                        <Button transparent>
                            <Icon
                                name="arrow-back"
                                style={{ color: commonBlue }}
                            />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: '#000' }}>Create Article</Title>
                    </Body>
                    <Right>
                        <Button
                            small
                            rounded
                            bordered
                            onPress={this.uploadMedia}
                            style={{ borderColor: commonBlue }}>
                            <Text style={{ color: commonBlue }}>Create</Text>
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <ImageBackground
                        source={{ uri: this.state.uri }}
                        style={styles.image}>
                        <TouchableOpacity
                            style={styles.imgOverlay}
                            onPress={this.selectPhoto.bind(this)}>
                            <Button transparent>
                                <Icon name="camera" style={{ color: '#fff' }} />
                            </Button>
                        </TouchableOpacity>
                    </ImageBackground>
                    <Form>
                        <Item floatingLabel>
                            <Input
                                placeholder="All Bolds Here"
                                style={styles.postTitleStyle}
                                onChangeText={(title) =>
                                    this.setState({ title })
                                }
                            />
                        </Item>
                        <Input
                            multiline={true}
                            onChangeText={(text) => this.setState({ text })}
                            placeholder="Start your article"
                            underline={false}
                            value={this.state.text}
                            style={styles.postDescriptionStyle}
                        />
                    </Form>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        height: 200,
        width: '100%',
        backgroundColor: commonBlue,
    },
    imgOverlay: {
        backgroundColor: greyWithAlpha(0.4),
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    postTitleStyle: {
        fontWeight: 'bold',
        fontSize: 20,
        height: 50,
    },
    postDescriptionStyle: {
        marginLeft: 15,
    },
});

const mapStateToProps = (state) => ({
    token: state.token.token,
});

export default connect(mapStateToProps)(PostArticle);

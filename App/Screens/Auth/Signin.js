import React from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Platform,
    TouchableOpacity,
    Image,
    Alert,
} from 'react-native';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { mapStateToProps, mapDispatchToProps } from './../../Redux/Actions/userActions';
import { connect } from 'react-redux';
import { Loader } from '../Component';
import Expo from 'expo-constants';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import * as AppleAuthentication from 'expo-apple-authentication';

import DiscoverPakistanIcon from './../../Assets/svg/Discover_Pakistan_Small_Icon.svg'
import EmailIcon from './../../Assets/svg/Email_Sign_Up-24px.svg'
import PassswordIcon from './../../Assets/svg/Password_Sign_Up-24px.svg'

import FbIcon from './../../Assets/svg/Facebook_icon-24px.svg'
import GoogleIcon from './../../Assets/svg/Google_icon-24px.svg';
// import AppleIcon from './../../Assets/svg/app-store.svg';
// const AppleIcon = require('./../../Assets/applelogo_2x.png');
const AppleIcon = require('./../../Assets/white-logo-masked-circular_2x.png');
import LineIcon from './../../Assets/svg/Line_Sign_Up-24px.svg'
import BackIcon from './../../Assets/svg/return.svg'

import { SOCIAL_LOGIN, URI } from '../../Constants';
import Api from '../../Constants/Api';
import { displayMessage, isNullRetNull, isObjEmpty, simplify } from '../../Helpers/general';
import { ScrollView } from 'react-native-gesture-handler';
import { color } from '../../Constants/theme';
import ForgotPassword from '../Component/ForgotPassword';
Facebook.initializeAsync(SOCIAL_LOGIN.FACEBOOK, 'Discover Pakistan')

class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: false,
            // email:'demo@demo.com',
            // password:'demo',
            email: '',
            password: '',
            isShowResetPassword: false
        }
    }

    UNSAFE_componentWillMount() {
        if (this.props.isLoggedIn) {
            this.props.navigation.replace("Home")
        }
    }

    setStateObj(obj) {
        this.setState({ ...this.state, ...obj })
    }

    facebookLogIn = async () => {
        const {
            type,
            token,
            expires,
            permissions,
            declinedPermissions,
        } = await Facebook.logInWithReadPermissionsAsync({ permissions: ['public_profile'], });

        if (type === 'success') {
            // Get the user's name using Facebook's Graph API
            const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,birthday,picture.type(large)`);
            const result = await response.json();
            let obj = {
                email: simplify(isNullRetNull(result.name)) + '@facebook.com',
                password: simplify(isNullRetNull(result.name))
            }

            setTimeout(() => {
                this.doLogin(obj)
            }, 500)
        }
    }

    async signInWithGoogleAsync() {
        try {
            const result = await Google.logInAsync({
                // behaviour: 'web',
                iosClientId: SOCIAL_LOGIN.GOOGLE_IOS,
                androidClientId: SOCIAL_LOGIN.GOOGLE_ANDROID,
                scopes: ['profile', 'email'],
            });
            console.log(result)
            if (result.type === 'success') {
                let obj = {
                    email: simplify(isNullRetNull(result.user.email)),
                    password: simplify(isNullRetNull(result.user.id)),
                }
                setTimeout(() => {
                    this.doLogin(obj)
                }, 500)
            } else {
                return { cancelled: true };
            }
        } catch (e) {
            return { error: true };
        }
    }

    doLogin(obj = {}) {
        this.setStateObj({ loader: true });
        let payload = {
            uri: URI.LOGIN,
            method: 'post',
            data: isObjEmpty(obj) ?
                {
                    email: this.state.email,
                    password: this.state.password
                } : obj
        }
        Api(payload)
            .then((res) => {
                this.setStateObj({ loader: false });
                displayMessage(res)
                if (res.data.message === 'success') {
                    this.props.setLoginStatus(true);
                    this.props.setUserData(res.data)
                    if (isNullRetNull(this.props.navigation.getParam("isGoBack")) === 'goBack') {
                        this.props.navigation.goBack()
                        return;
                    }
                    this.props.navigation.replace("Home")
                } else {
                    alert(res.data.data)
                }
            })
            .catch((err) => {
                this.setStateObj({ loader: false });
                alert("Unkown Error : " + err)
            })
    }

    signInWithApple = async () => {
        try {
            let obj = {};
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
            });
            if (credential) {
                if (isNullRetNull(credential.email, false) === false) {
                    alert("Please allow your email address")
                    return;
                }
                obj = {
                    email: simplify(isNullRetNull(credential.email)),
                    password: simplify(isNullRetNull(credential.user)),
                }
                this.doLogin(obj)
            }
        } catch (e) {
            if (e.code === 'ERR_CANCELED') {
                // handle that the user canceled the sign-in flow
            } else {
                // handle other errors
            }
        }
    }

    doResetPassword(text) {
        this.setStateObj({ loader: true, isShowResetPassword: false });
        let payload = {
            uri: URI.RESET_PASSWORD + text,
            method: 'get',
            data: {}
        }
        Api(payload)
            .then((res) => {
                this.setStateObj({ loader: false });
                let title = res.data.status === 'error' ? "Failed!" : "Success!"
                setTimeout(() => { Alert.alert(title, res.data.message) }, 500)
            })
            .catch((err) => {
                this.setStateObj({ loader: false });
                alert("Unkown Error : " + err)
                console.log(err)
            })
    }

    render() {
        const { loader, email, password, isShowResetPassword } = this.state;

        return (
            <Grid style={[styles.mainContainer]}>
                <Loader isLoader={loader} />
                <Row style={{ height: 1, width: widthPercentageToDP('100') }}>
                    <LineIcon />
                </Row>
                <TouchableOpacity
                    style={{ marginLeft: heightPercentageToDP('1'), width: heightPercentageToDP('3'), top: heightPercentageToDP('4'), zIndex: 2 }}
                    onPress={() => {
                        this.props.navigation.goBack();
                    }}>
                    <BackIcon fill="black" />
                </TouchableOpacity>

                <ScrollView>
                    <Row style={styles.headRow}><DiscoverPakistanIcon /></Row>
                    <Row style={styles.welcomeRow}>
                        <Text style={styles.helloText}>Hello</Text>
                        <Text style={styles.headText}>Sign in to your account</Text>
                    </Row>
                    <Col style={styles.inputTextCol}>

                        <Row style={styles.inputTextRow}>
                            <View style={styles.inputTextIcon}><EmailIcon width={widthPercentageToDP('4')} /></View>
                            <TextInput
                                value={email}
                                style={styles.inputText}
                                placeholder="E-mail Address"
                                keyboardType="email-address"
                                onChangeText={(char) => { this.setStateObj({ email: char }) }}
                            />
                        </Row>

                        <Row style={styles.inputTextRow}>
                            <View style={styles.inputTextIcon}><PassswordIcon width={widthPercentageToDP('4')} /></View>
                            <TextInput
                                value={password}
                                style={styles.inputText}
                                secureTextEntry={true}
                                placeholder="Password"
                                keyboardType="visible-password"
                                onChangeText={(char) => { this.setStateObj({ password: char }) }} />
                        </Row>
                        <Row style={styles.forgotRow}>
                            <TouchableOpacity
                                onPress={() => {
                                    // this.props.navigation.navigate("Forgot")
                                    this.setStateObj({ isShowResetPassword: true })
                                }}>
                                <Text>Forgot Your Password?</Text>
                            </TouchableOpacity>
                        </Row>

                        <Row style={styles.btnRow}>
                            <TouchableOpacity
                                disabled={password === "" || email === ""}
                                style={[styles.btn, password === "" || email === "" ? { opacity: 0.5 } : {}]}
                                onPress={() => {
                                    this.doLogin()
                                }}>
                                <Text style={styles.btnText}>SIGN IN</Text>
                            </TouchableOpacity>
                        </Row>


                        <Row style={styles.notesRow}>
                            <Text style={styles.notesText}>Login with Account</Text>
                        </Row>

                        <Row style={styles.socialMediaRow}>
                            {
                                Platform.OS === 'ios' &&
                                <TouchableOpacity
                                    style={styles.socialMediaBtn}
                                    onPress={() => {
                                        this.signInWithApple();
                                    }}>
                                    <View style={{
                                        overflow: 'hidden',
                                        height: widthPercentageToDP('10'),
                                        width: widthPercentageToDP('10'),
                                        borderRadius: 50,
                                    }}>
                                        {/* <AppleIcon width={widthPercentageToDP('10')} height={widthPercentageToDP('10')} /> */}
                                        <Image source={AppleIcon} style={{ height: '100%', width: '100%' }} />
                                    </View>
                                </TouchableOpacity>
                            }

                            <TouchableOpacity
                                style={styles.socialMediaBtn}
                                onPress={() => {
                                    this.facebookLogIn()
                                }}>
                                <FbIcon width={widthPercentageToDP('10')} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.socialMediaBtn}
                                onPress={() => {
                                    this.signInWithGoogleAsync()
                                }}>
                                <GoogleIcon width={widthPercentageToDP('10')} />
                            </TouchableOpacity>
                        </Row>

                    </Col>

                    <Row style={styles.gotoSignUpRow}>
                        <Text style={styles.gotoSignUpNotes}>Don't have an account? </Text>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate("Signup")
                            }}>
                            <Text style={styles.gotoSignUpBtnText}>Sign Up</Text>
                        </TouchableOpacity>
                    </Row>
                </ScrollView>

                <ForgotPassword
                    isShowModal={isShowResetPassword}
                    showHide={(is) => {
                        this.setStateObj({ isShowResetPassword: is })
                    }}
                    onSubmit={(data) => {
                        this.doResetPassword(data.text)
                    }} />
            </Grid>
        );
    }
};

const styles = StyleSheet.create({
    mainContainer: {
        height: heightPercentageToDP('100%'),
        width: widthPercentageToDP('100%'),
        marginTop: Expo.statusBarHeight
    },
    headRow: {
        height: heightPercentageToDP('14%'),
        width: widthPercentageToDP('100%'),
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginBottom: heightPercentageToDP('4')
    },

    welcomeRow: {
        height: heightPercentageToDP('12%'),
        width: widthPercentageToDP('90'),
        alignSelf: 'center',
        justifyContent: 'space-around',
        flexDirection: 'column',
    },
    helloText: {
        fontSize: 48,
        fontWeight: 'bold',
    },
    headText: {
        fontSize: 18,
        color: color.secondary
    },

    inputTextCol: {
        height: heightPercentageToDP('54%'),
        width: widthPercentageToDP('100%'),
        justifyContent: 'space-around',
    },
    inputTextRow: {
        width: widthPercentageToDP('100'),
        height: heightPercentageToDP('7'),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: heightPercentageToDP('2'),
    },
    inputTextIcon: {
        position: 'absolute',
        left: widthPercentageToDP('8'),
        zIndex: 1
    },
    inputText: {
        borderColor: 'gray',
        borderWidth: 0.4,
        width: widthPercentageToDP('90'),
        height: heightPercentageToDP('7'),
        alignSelf: 'center',
        backgroundColor: color.tertiary,
        padding: heightPercentageToDP('1'),
        paddingLeft: heightPercentageToDP('5'),
        fontSize: 18,
        shadowColor: "rgba(138,138,138,0.5)",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.50,
        shadowRadius: 8.68,
    },

    forgotRow: {
        width: widthPercentageToDP('90'),
        height: heightPercentageToDP('3'),
        alignSelf: 'center',
        justifyContent: 'flex-end',
        marginTop: -6
    },
    forgotText: {
        fontSize: 14,
        color: color.secondary
    },

    btnRow: {
        width: widthPercentageToDP('100'),
        height: heightPercentageToDP('6'),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: heightPercentageToDP('1'),
        shadowColor: "rgba(138,138,138,0.5)",
        elevation: 5,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.50,
        shadowRadius: 8.68,
    },
    btn: {
        backgroundColor: color.design,
        paddingLeft: heightPercentageToDP('3'),
        paddingRight: heightPercentageToDP('3'),
        height: '100%',
        justifyContent: 'center',
    },
    btnText: {
        fontSize: 22,
        color: color.tertiary,
        fontWeight: '600',
    },
    notesRow: {
        height: heightPercentageToDP('4'),
        marginTop: heightPercentageToDP('2'),
        marginBottom: -heightPercentageToDP('4'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    notesText: {
        fontSize: 20,
        fontWeight: '500',
    },
    socialMediaRow: {
        height: heightPercentageToDP('7'),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: heightPercentageToDP('2')
    },
    socialMediaBtn: {
        margin: 4
    },

    gotoSignUpRow: {
        ...Platform.select({
            ios: {
                height: heightPercentageToDP('8'),
            },
            android: {
                height: heightPercentageToDP('10'),
                marginTop: heightPercentageToDP('2')
            }
        }),
        width: widthPercentageToDP('100'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    gotoSignUpNotes: {
        fontSize: 14,
    },
    gotoSignUpBtnText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: color.design
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image, Platform,
  Alert
} from 'react-native';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { mapStateToProps, mapDispatchToProps } from './../../Redux/Actions/userActions';
import { connect } from 'react-redux';
import { Loader } from '../Component';
import Expo from 'expo-constants';
import * as Facebook from 'expo-facebook';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as ImagePicker from 'expo-image-picker';

import ProfileIcon from './../../Assets/svg/signup_profile_holder_24px.svg';
import PlusIcon from './../../Assets/svg/Circle_Plus_icon-24px.svg';
import NameIcon from './../../Assets/svg/Full_Name_Sign_Up-24px.svg'
import EmailIcon from './../../Assets/svg/Email_Sign_Up-24px.svg'
import PassswordIcon from './../../Assets/svg/Password_Sign_Up-24px.svg'

import FbIcon from './../../Assets/svg/Facebook_icon-24px.svg'
import GoogleIcon from './../../Assets/svg/Google_icon-24px.svg'
const AppleIcon = require('./../../Assets/white-logo-masked-circular_2x.png');
import LineIcon from './../../Assets/svg/Line_Sign_Up-24px.svg'
import CheckBox from '../Component/CheckBox';
import { SOCIAL_LOGIN, URI } from '../../Constants';
import Api from '../../Constants/Api';
import BackIcon from './../../Assets/svg/return.svg'
import { ScrollView } from 'react-native-gesture-handler';
import { isNullRetNull, isObjEmpty, simplify } from '../../Helpers/general';
import * as Google from 'expo-google-app-auth';
import { color } from '../../Constants/theme';

Facebook.initializeAsync(SOCIAL_LOGIN.FACEBOOK, 'Discover Pakistan')

class Signup extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loader:false,
            name:'',
            email:'',
            username:'',
            password:'',
            password_confirmation:'',
            phone:'',
            checked: false,
            file:{}
        }
    }

    UNSAFE_componentWillMount(){
        if(this.props.isLoggedIn){
            this.props.navigation.replace("Home")
        }
        // console.log(ImagePicker)
    }

    setStateObj(obj){
        this.setState({ ...this.state, ...obj })
    }

    pickFile = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
                return;
            }
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.cancelled) {
            result['type'] = '*/*';
            delete result['cancelled'];
            let tempArray = result.uri.split('/');
            result['name'] = tempArray[tempArray.length-1]
            this.setStateObj({ file:result })
        }
    };

    grantAccessForImage = ()=> {
        Alert.alert(
            "Discover Pakistan Would like to Access the Gallery to upload Profile Picture",
            "Allow access photos, media, and files on your device?",
            [
            
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => this.pickFile() }
            ],
            { cancelable: false }
        );
    }

    async signInWithGoogleAsync() {
        try {
          const result = await Google.logInAsync({
            iosClientId: SOCIAL_LOGIN.GOOGLE_IOS,
            androidClientId: SOCIAL_LOGIN.GOOGLE_ANDROID,
            scopes: ['profile', 'email'],
          });
          if (result.type === 'success') {
            let obj = {
                name:result.user.name,
                email:simplify(isNullRetNull(result.user.email)),
                password:simplify(isNullRetNull(result.user.id)),
                password_confirmation:simplify(isNullRetNull(result.user.id)),
                image_url:result.user.photoUrl
            }
            setTimeout(()=>{
                this.doSignup(obj)
            },500)
          } else {
            return { cancelled: true };
          }
        } catch (e) {
          return { error: true };
        }
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
            const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,email,name,birthday,picture.type(large)`);
            const result = await response.json();
            let img_url = undefined
            if (isNullRetNull(result.picture, false)) {
                if (isNullRetNull(result.picture.data, false)) {
                    if (isNullRetNull(result.picture.data, false)) {
                        img_url = result.picture.data.url;
                    }
                }
            }
            let obj = {
                name:result.name,
                email:simplify(isNullRetNull(result.id))+'@facebook.com',
                password:simplify(isNullRetNull(result.name)),
                password_confirmation:simplify(isNullRetNull(result.name)),
                image_url:img_url
            }
            setTimeout(()=>{
                this.doSignup(obj)
            },500)
        }
    }

    doSignup(obj={}){
        if(this.state.password !== this.state.password_confirmation){
            alert("Passwords does not match!")
            return
        }
        this.setStateObj({ loader: true });
        let payload = {
            uri:URI.SIGNUP,
            method:'post',
            data:isObjEmpty(obj) ? {
                name:this.state.name,
                email:this.state.email,
                password:this.state.password,
                password_confirmation:this.state.password_confirmation,
                file:this.state.file
            } : obj
        }
        // console.log(payload)
        Api(payload)
        .then((res)=>{
            this.setStateObj({ loader: false });
            if(res.data.status === 'success'){
                this.props.setLoginStatus(true);
                this.props.setUserData(res.data)
                this.props.navigation.replace("Home")
            }else{
                alert(res.data.data)
            }
        })
        .catch((err)=>{
            this.setStateObj({ loader: false });
            alert("Unkown Error : ", err)
        })
    }

    signUpWithApple = async () => {
        try {
            let obj = {};
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
            });
            if(credential){
                if(isNullRetNull(credential.email, false) === false){
                    alert("Please allow your email address")
                    return;
                }
                obj = {
                    email:simplify(isNullRetNull(credential.email)),
                    name:isNullRetNull(credential.fullName.givenName,'')+' '+isNullRetNull(credential.fullName.familyName,''),
                    password_confirmation:simplify(isNullRetNull(credential.user)),
                    password:simplify(isNullRetNull(credential.user)),
                }
                this.doSignup(obj)
            }
        } catch (e) {
            console.log(e)
            if (e.code === 'ERR_CANCELED') {
            // handle that the user canceled the sign-in flow
            } else {
            // handle other errors
            }
        }
    }

    render(){
        const {
            checked,
            name,
            email,
            password,
            password_confirmation,
            loader,
            file
        } = this.state;
        const { isLoader } = this.props;

        const isDisabled = () => {
            return name === "" ||
            email === "" ||
            password === "" ||
            password_confirmation === "" ||
            password !== password_confirmation ||
            checked === false 
            // ||
            // (typeof(file) === 'object' && isObjEmpty(file))
        }

        return (<>
            <Loader isLoader={loader} />
            <ScrollView style={{ flex:1 }}>
                <Grid style={[styles.mainContainer]}>
                    <Row style={{ height:1, width:widthPercentageToDP('100') }}><LineIcon /></Row>

                    <TouchableOpacity
                        style={{
                            position:'absolute',
                            top:heightPercentageToDP('4'),
                            left:heightPercentageToDP('1.5'),
                            zIndex:100,
                        }}
                        onPress={()=>{
                            this.props.navigation.goBack();
                        }}>
                        <BackIcon fill="black" />
                    </TouchableOpacity>

                    <Row style={styles.headRow}>
                        <View style={{ width:widthPercentageToDP('30'), justifyContent:'flex-end' }}>
                            <View style={{ height:heightPercentageToDP('15'), width:heightPercentageToDP('15'), alignItems:'center', justifyContent:'center' }}>
                                {
                                    isNullRetNull(file.uri, false) === false ?
                                        <ProfileIcon width={widthPercentageToDP('30')} />
                                        :
                                        <Image
                                            source={{ uri:isNullRetNull(file.uri, 'https://') }}
                                            style={styles.userImg}/>
                                }
                            </View>
                            <View style={{ position:'absolute', bottom:-6, right:0 }}>
                                <TouchableOpacity
                                    onPress={()=>{
                                        //this.pickFile()
                                        this.grantAccessForImage()
                                    }}>
                                    <PlusIcon width={widthPercentageToDP('8')} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Row>

                    <Col style={styles.inputTextCol}>
                        <Row style={styles.inputTextRow}>
                            <View style={styles.inputTextIcon}><NameIcon width={widthPercentageToDP('4')}/></View>
                            <TextInput
                                style={styles.inputText}
                                placeholder="Full Name"
                                keyboardType="default"
                                onChangeText={(char)=>{ this.setStateObj({ name:char }) }}
                            />
                        </Row>

                        <Row style={styles.inputTextRow}>
                            <View style={styles.inputTextIcon}><EmailIcon width={widthPercentageToDP('4')}/></View>
                            <TextInput
                                style={styles.inputText}
                                placeholder="E-mail Address"
                                keyboardType="email-address"
                                onChangeText={(char)=>{ this.setStateObj({ email:char }) }}
                            />
                        </Row>
                        
                        <Row style={styles.inputTextRow}>
                            <View style={styles.inputTextIcon}><PassswordIcon width={widthPercentageToDP('4')}/></View>
                            <TextInput
                                style={styles.inputText}
                                secureTextEntry={true}
                                placeholder="Password"
                                keyboardType="visible-password"
                                onChangeText={(char)=>{ this.setStateObj({ password:char }) }}
                            />
                        </Row>

                        <Row style={styles.inputTextRow}>
                            <View style={styles.inputTextIcon}><PassswordIcon width={widthPercentageToDP('4')}/></View>
                            <TextInput
                                style={styles.inputText}
                                secureTextEntry={true}
                                placeholder="Password Confirmation"
                                keyboardType="visible-password"
                                onChangeText={(char)=>{ this.setStateObj({ password_confirmation:char }) }}
                            />
                        </Row>

                        <Row style={styles.checkBoxRow}>
                            <CheckBox
                                checkBoxStyle={{ marginRight:10 }}
                                checked={checked}
                                onChecked={(isChecked)=>{
                                    this.setStateObj({ checked:isChecked })
                                }}/>
                            <Text style={styles.checkBoxRowTitle}>I accept all terms and conditions</Text>
                        </Row>

                        <Row style={styles.btnRow}>
                            <TouchableOpacity
                                style={[styles.btn, { opacity: isDisabled() ? 0.5 : 1 } ]}
                                disabled={isDisabled()}
                                onPress={()=>{
                                    this.doSignup()
                                }}>
                                <Text style={styles.btnText}>SIGN UP</Text>
                            </TouchableOpacity>
                        </Row>

                        <Row style={styles.notesRow}>
                            <Text style={styles.notesText}>or create account using social media</Text>
                        </Row>

                        <Row style={styles.socialMediaRow}>
                            {
                                Platform.OS === 'ios' &&
                                <TouchableOpacity
                                    style={styles.socialMediaBtn}
                                    onPress={()=>{
                                        this.signUpWithApple();
                                    }}>
                                    <View style={{
                                        overflow:'hidden',
                                        height:widthPercentageToDP('10'),
                                        width:widthPercentageToDP('10'),
                                        borderRadius:50
                                    }}>
                                        {/* <AppleIcon width={widthPercentageToDP('10')} height={widthPercentageToDP('10')} /> */}
                                        <Image source={AppleIcon} style={{ height:'100%', width:'100%' }}/>
                                    </View>
                                </TouchableOpacity>
                            }
                            <TouchableOpacity
                                style={styles.socialMediaBtn}
                                onPress={()=>{
                                    this.facebookLogIn()
                                }}>
                                <FbIcon width={widthPercentageToDP('10')}/>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.socialMediaBtn}
                                onPress={()=>{
                                    this.signInWithGoogleAsync()
                                }}>
                                <GoogleIcon width={widthPercentageToDP('10')}/>
                            </TouchableOpacity>
                        </Row>

                    </Col>
                </Grid>
            </ScrollView>
        </>);
    }
};

const styles = StyleSheet.create({
    mainContainer:{
        height:heightPercentageToDP('100%'),
        width:widthPercentageToDP('100%'),
        marginTop:Expo.statusBarHeight
    },
    BackIcon:{
        marginLeft:heightPercentageToDP('1'),
        width:heightPercentageToDP('3'),
        top:heightPercentageToDP('4'),
        zIndex:2
    },
    headRow:{
        height:heightPercentageToDP('22%'),
        width:widthPercentageToDP('100%'),
        justifyContent:'center'
    },
    userImg:{
        height:heightPercentageToDP('13.3'),
        width:heightPercentageToDP('13.3'),
        borderWidth:1,
        borderColor:color.quaternary,
        borderRadius:100
    },
    inputTextCol:{
        height:heightPercentageToDP('70%'),
        width:widthPercentageToDP('100%'),
    },
    inputTextRow:{
        width:widthPercentageToDP('100'),
        height:heightPercentageToDP('7'),
        alignItems:'center',
        justifyContent:'center',
        marginTop:heightPercentageToDP('2'),
    },
    inputTextIcon:{
        position:'absolute',
        left:widthPercentageToDP('8'),
        zIndex:1
    },
    inputText:{
        borderColor:'gray',
        borderWidth:0.4,
        width:widthPercentageToDP('90'),
        height:heightPercentageToDP('7'),
        alignSelf:'center',
        backgroundColor:color.tertiary,
        padding:heightPercentageToDP('1'),
        paddingLeft:heightPercentageToDP('5'),
        fontSize:18,
        shadowColor: "rgba(138,138,138,0.5)",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.50,
        shadowRadius: 8.68,
    },
    checkBoxRow:{
        width:widthPercentageToDP('90'),
        height:heightPercentageToDP('4'),
        alignItems:'center',
        alignSelf:'center',
        marginTop:heightPercentageToDP('2'),
    },
    checkBoxRowTitle:{
        color:color.secondary,
        fontSize:16
    },

    btnRow:{
        width:widthPercentageToDP('100'),
        height:heightPercentageToDP('6'),
        alignItems:'center',
        justifyContent:'center',
        marginTop:heightPercentageToDP('1'),
        shadowColor: "rgba(138,138,138,0.5)",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.50,
        shadowRadius: 8.68,
    },
    btn:{
        backgroundColor:color.design,
        paddingLeft:heightPercentageToDP('3'),
        paddingRight:heightPercentageToDP('3'),
        height:'100%',
        justifyContent:'center',
    },
    btnText:{
        fontSize:22,
        color:color.tertiary,
        fontWeight:'600',
    },
    notesRow:{
        height:heightPercentageToDP('2'),
        alignItems:'center',
        justifyContent:'center',
        marginTop:heightPercentageToDP('2')
    },
    notesText:{
        color:color.secondary,
        fontSize:14,
        fontWeight:'500',
    },
    socialMediaRow:{
        height:heightPercentageToDP('7'),
        alignItems:'center',
        justifyContent:'center',
        marginTop:heightPercentageToDP('2')
    },
    socialMediaBtn:{
        margin:4
    }
    
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
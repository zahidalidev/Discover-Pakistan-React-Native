import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image, Platform
} from 'react-native';
import { Grid, Row } from 'react-native-easy-grid';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { mapStateToProps, mapDispatchToProps } from './../../Redux/Actions/userActions';
import { connect } from 'react-redux';
import { Loader, ProfileDropDown } from '../Component';
import * as ImagePicker from 'expo-image-picker';

import ProfileIcon from './../../Assets/svg/signup_profile_holder_24px.svg';
import PlusIcon from './../../Assets/svg/Circle_Plus_icon-24px.svg';
import NameIcon from './../../Assets/svg/Full_Name_Sign_Up-24px.svg'
import EmailIcon from './../../Assets/svg/Email_Sign_Up-24px.svg'
import PassswordIcon from './../../Assets/svg/Password_Sign_Up-24px.svg'

import { URI } from '../../Constants';
import Api from '../../Constants/Api';
import BackIcon from './../../Assets/svg/return.svg';
import { ScrollView } from 'react-native-gesture-handler';
import Header from '../Component/Header';
import DrawerModal from '../Component/DrawerModal';
import FooterDrawerModal from '../Component/FooterDrawerModal';
import Footer from '../Component/Footer';
import { isEmpty, isNullRetNull, isObjEmpty } from '../../Helpers/general';

class Profile extends React.Component {
    constructor(props){
        super(props);
        const usr = this.props.userData
        this.state = {
            loader:false,
            name:usr.name,
            email:usr.email,
            password:'',
            password_confirmation:'',
            checked: false,
            isShowMidModal:false,
            isShowBottomModal: false,
            isDropDown:false,
            file:{}
        }
    }

    UNSAFE_componentWillMount(){
        this.getUserDetails()
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
            mediaTypes: ImagePicker.MediaTypeOptions.All,
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

    updateUserImage(file){
        this.setStateObj({ loader: true });
        let payload = {
            uri:URI.UPDATE_PROFILE_PIC,
            method:'post',
            headers:{ 'Content-Type': 'multipart/form-data;' },
            data:{
                user_id: this.props.userData.user_id,
                file:file
            }
        }
        Api(payload)
            .then((res)=>{
                console.log(res)
                this.setStateObj({ loader: false });
                if(res.data.message === 'success'){
                    alert(res.data.data);
                }else{
                    alert("Error : "+res.data.data);
                }
            })
            .catch((err)=>{
                console.log(err)
                this.setStateObj({ loader: false });
                alert("Unkown Error \n"+err)
            })
    }

    doUpdateReq(){
        if(this.state.password !== this.state.password_confirmation){
            alert("Passwords does not match!")
            return
        }
        this.setStateObj({ loader: true });
        let payload = {
            uri:URI.UPDATE_PROFILE,
            method:'post',
            data:{
                id:this.props.userData.user_id,
                name:this.state.name,
                email:this.state.email,
                password:this.state.password,
                password_confirmation:this.state.password_confirmation,
                photo: this.state.file
            }
        }
        // console.log(payload)
        Api(payload)
        .then((res)=>{
            console.log(res)
            this.setStateObj({ loader: false });
            if(res.data.status === 'success'){
                alert(res.data.data)
                this.getUserDetails()
            }else{
                alert(res.data.data)
            }
        })
        .catch((err)=>{
            this.setStateObj({ loader: false });
            alert("Unkown Error : "+ err)
        })
    }

    getUserDetails(){
        if(isEmpty(this.props.userData) || !this.props.isLoggedIn){
            this.props.navigation.navigate("Signin")
            return;
        }
        this.setStateObj({ loader: true });
        let payload = {
            uri:URI.GET_USER_DETAILS,
            method:'post',
            data:{
                id:this.props.userData.user_id
            }
        }
        Api(payload)
        .then((res)=>{
            console.log(res)
            this.setStateObj({ loader: false });
            if(res.data.status === 'success'){
                this.props.setUserData(res.data.userInfo)
            }else{
                alert(res.data.data)
            }
        })
        .catch((err)=>{
            this.setStateObj({ loader: false });
            alert("Unkown Error : "+ err)
        })
    }

    render(){
        const {
            name,
            email,
            password,
            password_confirmation,
            loader,
            isShowMidModal,
            isShowBottomModal,
            isDropDown,
            file,
        } = this.state;
        const { userData, isLoggedIn } = this.props;

        const isDisabled = () => {
            return name === "" ||
            email === "" ||
            password !== password_confirmation
        }

        return (<>
            <Loader isLoader={loader} />
            <Grid style={{ flex:1, flexDirection:'column' }}>

                <Header
                    containerStyle={{ height:heightPercentageToDP('1') }}
                    navigation={this.props.navigation}
                    toggleDrawer={()=>{
                        this.setStateObj({ isShowMidModal: !isShowMidModal })
                    }}
                    isDropDown={isDropDown}
                    setDropDown={(isActive)=>{ 
                        this.setStateObj({ isDropDown: isActive })
                    }}
                    isShowSearch
                    // isShowSubHeader
                    tempArray={[]}
                    filterFun={(data)=>{ }}
                    isRenderPlayer={false}/>

                <Row style={{ height:heightPercentageToDP('80'), width:widthPercentageToDP('100') }}>
                    <ScrollView style={{  }}>

                        <TouchableOpacity
                            style={{ left:heightPercentageToDP('1.5'), width:heightPercentageToDP('3'), top:heightPercentageToDP('1'), zIndex:2 }}
                            onPress={()=>{
                                this.props.navigation.goBack();
                            }}>
                            <BackIcon fill="black" />
                        </TouchableOpacity>
                        
                        <Row style={styles.headRow}>
                            <View style={{ width:widthPercentageToDP('30'), justifyContent:'flex-end' }}>
                                <View style={{ height:heightPercentageToDP('15'), alignItems:'center', justifyContent:'center' }}>
                                    { isNullRetNull(userData.img, false) === false && isNullRetNull(file.uri, false) === false?
                                        <ProfileIcon width={widthPercentageToDP('30')} />
                                        : <Image source={{ uri:isNullRetNull(file.uri, false) ? file.uri : isNullRetNull(userData.img,'') }} style={{ borderColor:'gray', borderRadius:heightPercentageToDP('50'), borderWidth:1, height:widthPercentageToDP('30'), width:widthPercentageToDP('30') }}/>
                                    }
                                </View>
                                <View style={{ position:'absolute', bottom:-4, right:2 }}>
                                    <TouchableOpacity
                                        onPress={()=>{ 
                                            this.pickFile()
                                        }}>
                                        <PlusIcon width={widthPercentageToDP('6')} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Row>

                        <Row style={styles.inputTextCol}>
                            <Row style={styles.inputTextRow}>
                                <View style={styles.inputTextIcon}><NameIcon width={widthPercentageToDP('4')}/></View>
                                <TextInput
                                    value={name}
                                    style={styles.inputText}
                                    placeholder="Full Name"
                                    keyboardType="default"
                                    onChangeText={(char)=>{ this.setStateObj({ name:char }) }}
                                />
                            </Row>

                            <Row style={styles.inputTextRow}>
                                <View style={styles.inputTextIcon}><EmailIcon width={widthPercentageToDP('4')}/></View>
                                <TextInput
                                    value={email}
                                    style={styles.inputText}
                                    placeholder="E-mail Address"
                                    keyboardType="email-address"
                                    onChangeText={(char)=>{ this.setStateObj({ email:char }) }}
                                />
                            </Row>
                            
                            <Row style={styles.inputTextRow}>
                                <View style={styles.inputTextIcon}><PassswordIcon width={widthPercentageToDP('4')}/></View>
                                <TextInput
                                    value={password}
                                    style={styles.inputText}
                                    placeholder="Password"
                                    keyboardType="visible-password"
                                    onChangeText={(char)=>{ this.setStateObj({ password:char }) }}
                                />
                            </Row>

                            
                            <Row style={styles.inputTextRow}>
                                <View style={styles.inputTextIcon}><PassswordIcon width={widthPercentageToDP('4')}/></View>
                                <TextInput
                                    value={password_confirmation}
                                    style={styles.inputText}
                                    placeholder="Password Confirmation"
                                    keyboardType="visible-password"
                                    onChangeText={(char)=>{ this.setStateObj({ password_confirmation:char }) }}
                                />
                            </Row>

                            <Row style={styles.checkBoxRow}>
                            </Row>

                            <Row style={styles.btnRow}>
                                <TouchableOpacity
                                    style={[styles.btn, { opacity: isDisabled() ? 0.5 : 1 } ]}
                                    disabled={isDisabled()}
                                    onPress={()=>{
                                        this.doUpdateReq()
                                    }}>
                                    <Text style={styles.btnText}>UPDATE PROFILE</Text>
                                </TouchableOpacity>
                            </Row>

                        </Row>
                    </ScrollView>
                </Row>

                
                <ProfileDropDown
                    isDropDown={isDropDown}
                    props={this.props}
                    setDropDown={(isActive)=>{ this.setStateObj({ isDropDown:isActive }) }}/>

                <DrawerModal
                    navigation={this.props.navigation}
                    toggleDrawer={()=>{ this.setStateObj({ isShowMidModal: !isShowMidModal }) }}
                    isShowModal={isShowMidModal}/>

                <FooterDrawerModal
                    navigation={this.props.navigation}
                    toggleDrawer={()=>{ this.setStateObj({ isShowBottomModal: !isShowBottomModal }) }}
                    isShowModal={isShowBottomModal}/>

                <Footer navigation={this.props.navigation} toggleDrawer={()=>{ this.setStateObj({ isShowBottomModal: !isShowBottomModal }) }} />
            </Grid>
        </>);
    }
};

const styles = StyleSheet.create({
    headRow:{
        height:heightPercentageToDP('16%'),
        width:widthPercentageToDP('100%'),
        justifyContent:'center'
    },
    inputTextCol:{
        height:"100%",
        width:widthPercentageToDP('100%'),
        flexDirection:'column'
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
        backgroundColor:'#FFFFFF',
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
        color:'#333333',
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
        backgroundColor:'#53AF57',
        paddingLeft:heightPercentageToDP('3'),
        paddingRight:heightPercentageToDP('3'),
        height:'100%',
        justifyContent:'center',
    },
    btnText:{
        fontSize:22,
        color:'#FFFFFF',
        fontWeight:'600',
    },
    notesRow:{
        height:heightPercentageToDP('2'),
        alignItems:'center',
        justifyContent:'center',
        marginTop:heightPercentageToDP('2')
    },
    notesText:{
        color:"#333333",
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
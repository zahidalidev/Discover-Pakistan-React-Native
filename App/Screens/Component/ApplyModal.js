import React from 'react';
import {
  StyleSheet,
  Text,
  Modal,
  TouchableOpacity,
  Platform,
//   KeyboardAvoidingView,
} from 'react-native';
import { Col, Row } from 'react-native-easy-grid';
import { connect } from 'react-redux';
import Expo from 'expo-constants';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { mapStateToProps, mapDispatchToProps } from '../../Redux/Actions/userActions';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import * as DocumentPicker from 'expo-document-picker';

import EmailIcon from './../../Assets/svg/Email_Sign_Up-24px.svg'
import UserNameIcon from './../../Assets/svg/Full_Name_Sign_Up-24px.svg'
import PhoneIcon from './../../Assets/svg/Phone_Number_Sign_Up-24px.svg'

import InstaIcon from './../../Assets/svg/Instagram_icon-24px.svg'
import FbIcon from './../../Assets/svg/Facebook_icon-24px.svg'
import TwitterIcon from './../../Assets/svg/Twitter_icon-24px.svg'
import GoogleIcon from './../../Assets/svg/Google_icon-24px.svg'

import CheckBox from './CheckBox';
import { URI } from '../../Constants';
import Api from '../../Constants/Api';
import { isNullRetNull, isObjEmpty } from '../../Helpers/general';


class ApplyModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            checked01: false,
            checked02: false,
            name:isNullRetNull(this.props.userData.name),
            email:isNullRetNull(this.props.userData.email),
            phone:'',
            job:isNullRetNull(this.props.selectedPostion.title),
            experince:'',
            postion:'',
            file:{},
            comment:''
        }
    }

    UNSAFE_componentWillMount(){
        this._isMounted = true;
        if(this._isMounted){

        }
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    doApply(){
        this.setStateObj({ loader: true });
        const { name, email, phone, job, experince, file, postion, comment } = this.state;
        let payload = {
            uri:URI.APPLY_FOR_JOB,
            method:'post',
            headers:{ 'Content-Type': 'multipart/form-data;' },
            data:{
                name:name,
                email:email,
                phone:phone,
                job:job,
                experince:experince,
                postion:postion,
                file:file,
                comment:comment
            }
        }

        Api(payload)
            .then((res)=>{
                console.log(res)
                this.setStateObj({ loader: false });
                if(res.data.message === 'success'){
                    alert(res.data.data);
                    this.props.showHide()
                }
            })
            .catch((err)=>{
                console.log(err)
                this.setStateObj({ loader: false });
                alert("Unkown Error \n"+err)
            })
    }

    async pickFile(){
        const file = await DocumentPicker.getDocumentAsync({ type:'*/*', copyToCacheDirectory:true })
        if(file.type === "success"){
            file['type'] = '*/*'
            this.setStateObj({ file:file })
        }
    }

    setStateObj(obj){
        this.setState({ ...this.state, ...obj })
    }

    render(){
        const { navigation, isShowModal, showHide, selectedPostion } = this.props
        const {
            checked01,
            checked02,
            name,
            email,
            phone,
            job,
            experince,
            postion,
            comment,
            file
        } = this.state

        const checkIsEmpty = () => {
            if(isNullRetNull(name, false) === false) return true;
            if(isNullRetNull(email, false) === false) return true;
            if(isNullRetNull(phone, false) === false) return true;
            if(isNullRetNull(job, false) === false) return true;
            if(isNullRetNull(experince, false) === false) return true;
            if(isNullRetNull(postion, false) === false) return true;
            if(isNullRetNull(comment, false) === false) return true;
            if(checked01 === false) return true;
            if(checked02 === false) return true;
            if(isObjEmpty(file)) return true;
            return false
        }

        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={isShowModal}>
                    <Col style={{ alignItems:'center', justifyContent:'center' }}>
                        <TouchableOpacity style={styles.modalBackground} onPress={showHide} />
                        <Row style={styles.modalRow}>
                            <ScrollView>
                                <Row style={styles.headRow}>
                                    <Text style={styles.headTitle}>Job Application Lahore Pakistan</Text>
                                    <Text style={styles.headDesription}>Please Provide the following information to start your application process</Text>
                                </Row>
                                <Col style={styles.headCol}>
                                    <Row style={styles.textInputRow}>
                                        <Row style={styles.icon}><UserNameIcon width={hp('2')} /></Row>
                                        <TextInput
                                            value={name}
                                            onChangeText={(char)=>{
                                                this.setStateObj({ name:char })
                                            }}
                                            style={styles.textInput}
                                            placeholder="Name"/>
                                    </Row>

                                    <Row style={styles.textInputRow}>
                                        <Row style={styles.icon}><EmailIcon width={hp('2')} /></Row>
                                        <TextInput
                                            value={email}
                                            onChangeText={(char)=>{
                                                this.setStateObj({ email:char })
                                            }}
                                            style={styles.textInput}
                                            placeholder="Email"/>
                                    </Row>

                                    <Row style={styles.textInputRow}>
                                        <Row style={styles.icon}><PhoneIcon width={hp('2')} /></Row>
                                        <TextInput
                                            value={phone}
                                            onChangeText={(char)=>{
                                                this.setStateObj({ phone:char })
                                            }}
                                            style={styles.textInput}
                                            placeholder="Phone"/>
                                    </Row>

                                    <Row style={styles.textInputRow}>
                                        <Row style={styles.icon}><UserNameIcon width={hp('2')} /></Row>
                                        <TextInput
                                            value={experince}
                                            onChangeText={(char)=>{
                                                this.setStateObj({ experince:char })
                                            }}
                                            style={styles.textInput}
                                            placeholder="Year of Experiance"/>
                                    </Row>

                                    <Row style={styles.textInputRow}>
                                        <TextInput
                                            value={job}
                                            onChangeText={(char)=>{
                                                this.setStateObj({ job:char })
                                            }}
                                            style={[styles.textInput, { paddingLeft:hp('1.2') }]}
                                            placeholder="Applying For ?"
                                            editable={false}/>
                                    </Row>

                                    <Row style={[styles.textInputRow01, { flexDirection:'column', height:hp('14') }]}>
                                        <Text style={{ fontSize:12, color:'#333', marginBottom:hp('1') }}>Why you are think you are a good fit for this position?</Text>
                                        <TextInput
                                            ellipsizeMode="tail"
                                            numberOfLines={4}
                                            // value={postion}
                                            onChangeText={(char)=>{
                                                this.setStateObj({ postion:char })
                                            }}
                                            style={[styles.textBox01]}
                                            multiline/>
                                    </Row>

                                    <Row style={[styles.textInputRow01, { ...Platform.select({ android:{ height:hp('5') }, ios:{ height:hp('3') } }), alignItems:'center', justifyContent:'space-between' }]}>
                                        <Text style={{ fontSize:14, color:'#333' }}>Attach CV</Text>
                                        <TouchableOpacity
                                            style={styles.chooseFile}
                                            onPress={()=>{
                                                this.pickFile()
                                            }}>
                                            <Text style={styles.chooseFileText}>Choose File</Text>
                                        </TouchableOpacity>
                                    </Row>

                                    <Row style={styles.checkBoxRow}>
                                        <CheckBox
                                            checkBoxStyle={{ borderColor:"#19b24b", marginRight:10, height:hp('2'), width:hp('2') }}
                                            selectorStyle={{ height:hp('1.5'), width:hp('1.5') }}
                                            checked={checked01}
                                            onChecked={(isChecked)=>{
                                                this.setState({ checked01:isChecked })
                                            }}/>
                                        <Text style={styles.checkBoxRowTitle}>I wish to take part in the upcomming recruitment drive</Text>
                                    </Row>

                                    <Row style={[styles.textInputRow01, { flexDirection:'column', height:hp('14') }]}>
                                        <Text style={{ fontSize:16, color:'#333', marginBottom:hp('1') }}>Comments</Text>
                                        <TextInput
                                            ellipsizeMode="tail"
                                            numberOfLines={4}
                                            onChangeText={(char)=>{
                                                this.setStateObj({ comment:char })
                                            }}
                                            style={[styles.textBox01]}
                                            multiline/>
                                    </Row>

                                    <Row style={styles.notesRow}>
                                        <Text style={styles.notesText}>Join our social media to get to know what's happening at Discover Pakistan</Text>
                                    </Row>

                                    <Row style={styles.socialMediaRow}>
                                        <TouchableOpacity style={styles.socialMediaBtn}>
                                            <FbIcon width={wp('10')}/>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={styles.socialMediaBtn}>
                                            <InstaIcon width={wp('10')}/>
                                        </TouchableOpacity>
                                    
                                        <TouchableOpacity style={styles.socialMediaBtn}>
                                            <GoogleIcon width={wp('10')}/>
                                        </TouchableOpacity>
                                        
                                        <TouchableOpacity style={styles.socialMediaBtn}>
                                            <TwitterIcon width={wp('10')}/>
                                        </TouchableOpacity>
                                    </Row>

                                    <Row style={[styles.checkBoxRow, { height:hp('6'), alignItems:'flex-start' }]}>
                                        <Row style={{ flexWrap:'wrap', flexDirection:'column' }}>
                                            <Row style={{ alignItems:'center', height:hp('3') }}>
                                                <CheckBox
                                                    checkBoxStyle={{ borderColor:"#19b24b", marginRight:5, height:hp('2'), width:hp('2') }}
                                                    selectorStyle={{ height:hp('1.5'), width:hp('1.5') }}
                                                    checked={checked02}
                                                    onChecked={(isChecked)=>{
                                                        this.setState({ checked02:isChecked })
                                                    }}/>
                                                <Text style={[styles.checkBoxRowTitle]}>By applying for the said position at Discover Pakistan</Text>
                                            </Row>
                                            <Row style={{ marginTop:-hp('0.5'), paddingLeft:hp('3') }}>
                                                <Text style={[styles.checkBoxRowTitle, { paddingTop:2 } ]}>I hereby agree to the following </Text>
                                                <Text style={styles.termsAndConditionText}>Terms and Conditions.</Text>
                                            </Row>
                                        </Row>
                                    </Row>

                                    <Row style={[styles.textInputRow01, { justifyContent:'center' }]}>
                                        <TouchableOpacity
                                            disabled={checkIsEmpty()}
                                            style={[styles.submitBtn, { opacity: checkIsEmpty() ? 0.5 : 1 }]}
                                            onPress={()=>{ this.doApply() }}>
                                            <Text style={styles.submitBtnText}>SUBMIT APPLICATION</Text>
                                        </TouchableOpacity>
                                    </Row>

                                </Col>
                            </ScrollView>
                        </Row>
                    </Col>
            </Modal>
        );
    }
};

const styles = StyleSheet.create({
    modalBackground:{
        position:'absolute',
        backgroundColor:'black',
        height:hp('100'),
        width:wp('100'),
        opacity:0.8
    },
    dissmiss:{
        position:'absolute',
        height:hp('6'),
        width:hp('6'),
        backgroundColor:'#FFFFFF',
        borderRadius:hp('10'),
        zIndex:1,
        top:Expo.statusBarHeight+hp('3.5'),
        alignItems:'center',
        justifyContent:'center',
        borderColor:'#333333',
        borderWidth:0.3
    },
    modalRow:{
        backgroundColor:'#FFFFFF',
        height:hp('82'),
        width:wp('96'),
        borderRadius:4,
        shadowColor: "rgba(138,138,138,0.3)",
        elevation: 10,
        alignItems:'flex-start',
        shadowOffset: { width: 5, hesight: 5 },
        shadowOpacity: 4,
        shadowRadius: 10,
    },
    headRow:{
        marginTop:hp('2'),
        alignItems:'center',
        flexDirection:'column'
    },
    headTitle:{
        fontSize:18,
        fontWeight:'500',
        ...Platform.select({ios:{},android:{}}),
    },
    headDesription:{
        marginTop:hp('1'),
        ...Platform.select({
            ios:{ width:wp('60'), },
            android:{ width:wp('70'),}
        }),
        fontSize:12,
        textAlign:'center',
    },
    headCol:{
        width:wp('90'),
        height:hp('130%'),
        alignSelf:'center',
        alignItems:'center',
    },
    textInputRow:{
        width:wp('90'),
        height:hp('6'),
        marginTop:hp('2'),
        backgroundColor:'#FFFFFF',
        shadowColor: "rgba(138,138,138,0.3)",
        elevation: 1,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 6,
    },
    textInputRow01:{
        width:wp('90'),
        height:hp('6'),
        marginTop:hp('2'),
    },
    textInput:{
        position:'absolute',
        zIndex:-2,
        borderColor:'gray',
        borderWidth:0.6,
        width:wp('90'),
        height:hp('6'),
        paddingLeft:hp('5'),
        paddingRight:hp('1'),
        fontSize:18,
        borderRadius:2,
        ...Platform.select({ios:{},android:{}}),
    },
    icon:{
        position:'absolute',
        zIndex:2,
        ...Platform.select({
            ios:{
                height:hp('6'),
            },
            android:{
                height:hp('6'),
                // top:-40
            }
        }),
        width:hp('5'),
        justifyContent:'center',
        alignItems:'center'
    },

    textBox01:{
        backgroundColor:'#FFFFFF',
        borderColor:'gray',
        borderWidth:0.6,
        width:wp('90'),
        height:hp('12'),
        padding:hp('1'),
        fontSize:18,
        borderRadius:2,
        shadowColor: "rgba(138,138,138,0.3)",
        elevation: 1,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 6,
        textAlign:'justify'
    },
    chooseFile:{
        backgroundColor:'#19b24b',
        width:wp('30'),
        height:hp('4'),
        alignItems:'center',
        justifyContent:'center',
        shadowColor: "rgba(138,138,138,0.3)",
        elevation: 1,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 6,
    },
    chooseFileText:{
        color:'#FFFFFF',
        fontSize:16,
        fontWeight:'600'
    },

    checkBoxRow:{
        width:wp('86'),
        ...Platform.select({
            ios:{
                height:hp('4'),
            },
            android:{
                height:hp('5'),
            }
        }),
        alignItems:'center',
        alignSelf:'center',
        marginTop:hp('2'),
    },
    checkBoxRowTitle:{
        color:'#333333',
        fontSize:12
    },

    notesRow:{
        width:wp('86'),
        height:hp('6'),
        alignItems:'center',
        alignSelf:'center',
        marginTop:hp('2'),
    },
    notesText:{
        fontSize:16,
        textAlign:'center',
        flexWrap:'wrap',
        fontWeight:'bold',
        color:'gray',
        width:wp('86'),
    },

    socialMediaRow:{
        height:hp('4'),
        alignItems:'center',
        justifyContent:'center',
        marginTop:hp('2')
    },
    socialMediaBtn:{
        margin:4
    },

    termsAndConditionText:{
        fontSize:12,
        fontWeight:'bold',
        color:'#19b24b',
        paddingTop:2
    },

    submitBtn:{
        backgroundColor:'#19b24b',
        paddingLeft:hp('3'),
        paddingRight:hp('3'),
        height:hp('5'),
        alignItems:'center',
        justifyContent:'center',
        shadowColor: "rgba(138,138,138,0.3)",
        elevation: 1,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 6,
    },
    submitBtnText:{
        color:'#FFFFFF',
        fontSize:16,
        fontWeight:'600'
    },
    

});

export default connect(mapStateToProps, mapDispatchToProps)(ApplyModal);
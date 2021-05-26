import React from 'react';
import { StyleSheet, Text, Modal, TouchableOpacity, View, TextInput } from 'react-native';
import { connect } from 'react-redux';
import Expo from 'expo-constants';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { mapStateToProps, mapDispatchToProps } from '../../Redux/Actions/userActions';
import { color } from '../../Constants/theme';
import { AntDesign } from 'react-native-vector-icons';

class ForgotPassword extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            text:''
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

    setStateObj(obj){
        this.setState({ ...this.state, ...obj })
    }

    render(){
        const { isShowModal, showHide, onSubmit } = this.props;
        const { text } = this.state;

        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={isShowModal}>
                    <View style={styles.main}>
                        <TouchableOpacity style={styles.modalBackground} onPress={showHide} />
                        <View style={styles.modalRow}>
                            <View style={styles.closeBtnView}>
                                <TouchableOpacity onPress={()=>{ if(showHide) showHide(!isShowModal) }}>
                                    <AntDesign name="close" size={28} color={color.primery}/>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.text01}>Forgot Password</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder={"Enter your email"}
                                value={text}
                                onChangeText={(t)=>{
                                    this.setStateObj({ text:t })
                                }}/>

                            <TouchableOpacity
                                disabled={text === ""}
                                style={[styles.btn, text === "" ? {opacity:0.5} : {}]}
                                onPress={()=>{
                                    if(onSubmit) onSubmit({ text:text.toLowerCase() })
                                }}>
                                <Text style={styles.btnText}>Reset Password</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
            </Modal>
        );
    }
};

const styles = StyleSheet.create({
    main:{ flex:1, alignItems:'center', justifyContent:'center' },
    modalBackground:{
        position:'absolute',
        backgroundColor:'black',
        height:hp('100'),
        width:wp('100'),
        opacity:0.8,
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
        // height:hp('10'),
        paddingTop:hp('4'),
        paddingBottom:hp('2'),
        paddingLeft:hp('1'),
        paddingRight:hp('1'),
        width:wp('96'),
        borderRadius:4,
        shadowColor: "rgba(138,138,138,0.3)",
        elevation: 10,
        alignItems:'flex-start',
        shadowOffset: { width: 5, hesight: 5 },
        shadowOpacity: 4,
        shadowRadius: 10,
    },
    text01:{
        color:color.primery,
        fontSize:20,
        fontWeight:'500',
        alignSelf:'center'
    },
    textInput:{
        height:hp('6'),
        marginTop:hp('2'),
        width:'96%',
        alignSelf:'center',
        backgroundColor:color.tertiary,
        borderWidth:1,
        borderColor:color.quaternary,
        paddingLeft:hp('1'),
        paddingRight:hp('1'),
        fontSize:16,
        fontWeight:'500'
    },
    btn:{
        backgroundColor:color.design,
        paddingLeft:hp('3'),
        paddingRight:hp('3'),
        height:hp('6'),
        justifyContent:'center',
        alignSelf:'center',
        marginTop:hp('2')
    },
    btnText:{
        fontSize:18,
        color:color.tertiary,
        fontWeight:'600',
    },
    closeBtnView:{
        position:'absolute',
        top:hp('1'),
        right:hp('1'),
        zIndex:10
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
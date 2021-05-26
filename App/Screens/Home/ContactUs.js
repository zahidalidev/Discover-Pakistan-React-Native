import React from 'react';
import { StyleSheet, Text, ActivityIndicator, ImageBackground } from 'react-native';
import { Grid, Row } from 'react-native-easy-grid';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../Redux/Actions/userActions';
import { ProfileDropDown } from '../Component';
import Header from '../Component/Header';
import DrawerModal from '../Component/DrawerModal';
import Footer from '../Component/Footer';
import FooterDrawerModal from '../Component/FooterDrawerModal';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { URI } from '../../Constants';
import Api from '../../Constants/Api';

const BgImg = './../../Assets/contact.jpg';

import Internet from './../../Assets/svg/internet.svg';
import Phone from './../../Assets/svg/Phone_Number_Sign_Up-24px.svg';
import Mail from './../../Assets/svg/internet.svg';
import Address from './../../Assets/svg/Home-24px.svg';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import WebView from 'react-native-webview';
import { color } from '../../Constants/theme';
import { SearchList } from '../Component/searchBox';

class ContactUs extends React.Component {
    Loader = true;
    _isMounted = false;
    constructor(props){
        super(props);
        this.state = {
            loader:false,
            isShowMidModal:false,
            isShowBottomModal: false,
            array:[],
            tempArray:[],
            categoryName:"MOST ACTIVE COMMUNITIES",
            isDropDown:false,
        }
    }

    async UNSAFE_componentWillMount(){
        this._isMounted = true;
        if (this._isMounted) {
            // this.getContactDetails()
        }
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    getContactDetails(){
        this.setStateObj({ loader: true })
        let payload = {
            uri:URI.COMMUNITIES,
            method:"post",
            data:{}
        }
        Api(payload)
        .then((res)=>{
            if(res.data.message === "success"){
                this.setStateObj({ loader: false, array:res.data.data, data:res.data.data, tempArray:res.data.data })
            }else{
                this.setStateObj({ loader: false })
            }
        })
        .catch((err)=>{
            this.setStateObj({ loader: false });
            alert("Unkown Error "+ err)
        })
    }

    setStateObj(obj){
        if(this._isMounted){ this.setState({ ...this.state, ...obj }) }
    }

    render(){
        const {
            loader,
            isShowMidModal,
            isShowBottomModal,
            isDropDown
        } = this.state;
        
        return (<>
            <Grid style={styles.grid}>
                <Header
                    navigation={this.props.navigation}
                    isShowSearch={true}
                    isDropDown={isDropDown}
                    setDropDown={(isActive)=>{ this.setStateObj({ isDropDown: isActive }) }}
                    toggleDrawer={()=>{ this.setStateObj({ isShowMidModal: !isShowMidModal }) }}
                    isShowSubHeader
                    tempArray={[]}
                    filterFun={(data)=>{  }}
                    isApiSearch={true}
                    apiLoader={(is)=>{ this.setState((state)=>{ return{ ...state, searchLoader:is } }) }}
                    onTypeResult={(data)=>{ this.setState((state)=>{ return{ ...state, searchData:data } }) }}
                    renderPlayer={()=>{
                        return(<>
                            <ImageBackground source={require(BgImg)} style={{ flex:1, alignItems:'center', justifyContent:'center', resizeMode:'conatian' }}>
                                <Text style={{ color:color.tertiary, fontSize:30, fontWeight:'600' }}>
                                    Contact Us
                                </Text>
                            </ImageBackground>
                        </>)
                    }}/>

                { loader ? 
                    (
                        <Row style={[styles.contents, { marginTop:0, height:'50%', justifyContent:'center' }]}>
                            <ActivityIndicator size="large" color={color.design}/>
                        </Row>
                    ):
                    <Row style={{ }}>
                        <ScrollView style={{ }}>
                            <Row style={styles.detailsContent01}>
                                <Text style={{ fontSize:24, fontWeight:'500', color:color.secondary, marginTop:hp('2') }}>
                                    Contact Details
                                </Text>

                                <Row style={styles.contactDetalRow}>
                                    <Row style={{ alignItems:'center', padding:hp('1') }}>
                                        <Internet style={{ opacity:0.7 }}/>
                                        <Text style={{ fontSize:18, fontWeight:'300', paddingLeft:hp('1') }}>
                                            www.discoverpakistan.tv
                                        </Text>
                                    </Row>

                                    <Row style={{ alignItems:'center', padding:hp('1') }}>
                                        <Mail style={{ opacity:0.7 }}/>
                                        <Text style={{ fontSize:18, fontWeight:'300', paddingLeft:hp('1') }}>
                                            info@discoverpakistan.tv
                                        </Text>
                                    </Row>

                                    <Row style={{ alignItems:'center', padding:hp('1') }}>
                                        <Phone />
                                        <Text style={{ fontSize:18, fontWeight:'300', paddingLeft:hp('1') }}>
                                            +92 (042) 35975008
                                        </Text>
                                    </Row>

                                    <Row style={{ padding:hp('1'), height:hp('8') }}>
                                        <Address width="22" height="22" style={{ opacity:0.7 }}/>
                                        <Text numberOfLines={2} style={{ fontSize:18, fontWeight:'300', paddingLeft:hp('1'), width:'90%' }}>
                                            DISCOVER PAKISTAN, PAF Falcon Complex, Gulberg |||, Lahore.
                                        </Text>
                                    </Row>
                                </Row>

                                <Text style={{ fontSize:27, fontWeight:'400', color:color.secondary, marginTop:hp('4') }}>
                                    Get in touch with us
                                </Text>


                                <Row style={{ alignItems:'center', marginTop:hp('2') }}>
                                    <Icon name="user" size={hp('2')} color={color.secondary} style={{ position:'absolute', zIndex:2, left:hp('1') }}/>
                                    <TextInput
                                        style={styles.inputText}
                                        placeholder={"Full Name"}
                                        onChangeText={(char)=>{
                                            this.setStateObj({  })
                                        }}/>
                                </Row>

                                <Row style={{ alignItems:'center', marginTop:hp('2') }}>
                                    <Entypo name="mail" size={hp('2')} color={color.secondary} style={{ position:'absolute', zIndex:2, left:hp('1') }}/>
                                    <TextInput
                                        style={styles.inputText}
                                        placeholder={"E-mail Address"}
                                        onChangeText={(char)=>{
                                            this.setStateObj({  })
                                        }}/>
                                </Row>

                                <Row style={{ alignItems:'center', marginTop:hp('2') }}>
                                    <Icon name="phone" size={hp('2')} color={color.secondary} style={{ position:'absolute', zIndex:2, left:hp('1') }}/>
                                    <TextInput
                                        style={styles.inputText}
                                        placeholder={"Telephone Number"}
                                        onChangeText={(char)=>{
                                            this.setStateObj({  })
                                        }}/>
                                </Row>

                                <Row style={{ alignItems:'center', marginTop:hp('2') }}>
                                    <MaterialIcons name="subject" size={hp('2')} color={color.secondary} style={{ position:'absolute', zIndex:2, left:hp('1') }}/>
                                    <TextInput
                                        style={styles.inputText}
                                        placeholder={"Subject"}
                                        onChangeText={(char)=>{
                                            this.setStateObj({  })
                                        }}/>
                                </Row>

                                <Row style={{ alignItems:'center', marginTop:hp('2'), marginBottom:hp('2') }}>
                                    <MaterialIcons name="message" size={hp('2')} color={color.secondary} style={{ position:'absolute', zIndex:2, left:hp('1') }}/>
                                    <TextInput
                                        multiline
                                        numberOfLines={4}
                                        style={[styles.inputText, { height:hp('16'), justifyContent:'flex-start' }]}
                                        placeholder={""}
                                        onChangeText={(char)=>{
                                            this.setStateObj({  })
                                        }}/>
                                </Row>

                                <Row style={{ alignItems:'center', marginTop:hp('1'), marginBottom:hp('4') }}>
                                    <TouchableOpacity
                                        style={{ backgroundColor:color.design, height:hp('5'), width:wp('30'), alignItems:'center', justifyContent:'center' }}
                                        onPress={()=>{

                                        }}>
                                            <Text style={{ color:color.tertiary, fontSize:18, fontWeight:'600' }}>
                                                Send
                                            </Text>
                                    </TouchableOpacity>
                                </Row>

                                <WebView
                                    style={{ height:hp('30'), width:wp('100') }}
                                    source={{
                                        html:`
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1737.6221882978507!2d-98.48650795000005!3d29.421653200000023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x865c58aa57e6a56f%3A0xf08a9ad66f03e879!2sHenry+B.+Gonzalez+Convention+Center!5e0!3m2!1sen!2sus!4v1393884854786"
                                            width="100%"
                                            height="100%"
                                            frameborder="0"
                                            style="border:0">
                                        </iframe>
                                        `
                                    }}
                                    />
                            </Row>
                        </ScrollView>
                    </Row>
                }

                <SearchList
                    { ...this.state }
                    { ...this.props }
                    onClick={(video, list, category)=>{
                        this.props.setCatDetails(list)
                        this.setStateObj({ searchData:undefined })
                        this.props.navigation.navigate("RedirectTo", { path:"ShowDetails", obj:{ category:category, video:video, screen:'Search' } })
                    }}/>

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
    grid:{
        paddingBottom:hp('5'),
        width:wp('100'),
    },
    detailsContent01:{
        width:wp('100'),
        alignSelf:'center',
        marginTop:hp('0.6'),
        marginBottom:hp('1'),
        alignItems:'center',
        flexDirection:'column',
    },
    contactDetalRow:{
        flexDirection:'column',
        backgroundColor:color.tertiary,
        height:wp('55'),
        width:wp('90'),
        marginTop:hp('2'),
        paddingLeft:hp('2'),
        justifyContent:'center',
        shadowColor:'gray',
        shadowOffset:{
            width:4,
            height:4
        },
        shadowOpacity:0.3,
        shadowRadius:5,
        elevation:5
    },

    inputText:{
        flexDirection:'column',
        backgroundColor:color.tertiary,
        height:hp('7'),
        width:wp('90'),
        paddingLeft:hp('2'),
        justifyContent:'center',
        shadowColor:'gray',
        shadowOffset:{
            width:4,
            height:4
        },
        shadowOpacity:0.3,
        shadowRadius:5,
        elevation:5
    }
    
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);
import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row } from 'react-native-easy-grid';
import { StyleSheet, Text, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { mapStateToProps, mapDispatchToProps } from '../../Redux/Actions/userActions';
import FooterDrawerModal from '../Component/FooterDrawerModal';
import Footer from '../Component/Footer';
import Header from '../Component/Header';
import { Loader, ProfileDropDown } from '../Component';
import DrawerModal from '../Component/DrawerModal';

import CheckIcon from './../../Assets/svg/check_icon.svg'
import FbIcon from './../../Assets/svg/Facebook_icon-24px.svg'
import GoBackIcon from './../../Assets/svg/go_back_arrow.svg'
import GoogleIcon from './../../Assets/svg/Google_icon-24px.svg'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { isNullRetNull } from '../../Helpers/general';
import { SearchList } from '../Component/searchBox';

const PartnersImage = './../../Assets/partners_bg.jpg';

class ThankYouScreen extends React.Component {
    _isMounted = false;
    constructor(props){
        super(props);
        this.state = {
            isLoader:false,
            isShowMidModal:false,
            isShowBottomModal: false,
            isDropDown:false,
            orderId:isNullRetNull(this.props.navigation.getParam("orderId"), Math.floor(100000 + Math.random() * 900000))
        }
    }

    async UNSAFE_componentWillMount(){
        this._isMounted = true;
        if (this._isMounted) {
            this.props.setCartList([])
        }
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    setStateObj(obj){
        this.setState({ ...this.state, ...obj })
    }

    render(){
        const {
            isLoader,
            isShowMidModal,
            isShowBottomModal,
            isDropDown,
            orderId
        } = this.state;

        return (<>
            <Loader isLoader={isLoader} />
            <Grid style={styles.grid}>
                <Header
                    containerStyle={{ height:hp('1') }}
                    navigation={this.props.navigation}
                    toggleDrawer={()=>{ this.setStateObj({ isShowMidModal: !isShowMidModal }) }}
                    isDropDown={isDropDown}
                    setDropDown={(isActive)=>{ this.setStateObj({ isDropDown: isActive }) }}
                    isShowSearch
                    tempArray={[]}
                    filterFun={(data)=>{ }}
                    isApiSearch={true}
                    apiLoader={(is)=>{ this.setState((state)=>{ return{ ...state, searchLoader:is } }) }}
                    onTypeResult={(data)=>{ this.setState((state)=>{ return{ ...state, searchData:data } }) }}
                    isRenderPlayer={false}/>

                <Row style={styles.cardsCol}>
                    <Row style={{ width:'100%', height:"15%", justifyContent:'center', alignItems:'center' }}>
                        <CheckIcon style={{ padding:hp('4') }} />
                    </Row>
                    <Row style={{ width:'100%', height:"8%", justifyContent:'center', alignItems:'center' }}>
                        <Text style={{ fontSize:32, fontWeight:'500', color:"#333" }}>That's all,</Text>
                        <Text style={{ fontSize:32, fontWeight:'500', color:"#19b24b" }}>Thank You!</Text>
                    </Row>
                    <Row style={{ width:'100%', height:"8%", justifyContent:'center', alignItems:'center' }}>
                        <Text style={{ fontSize:18, fontWeight:'500' }}>Order #: {orderId}</Text>
                    </Row>
                    <Row style={{ width:'90%', height:"3%", justifyContent:'center', }}>
                        <View style={{ borderBottomColor:'#333', borderBottomWidth:1 }}>
                            <Text style={{ fontSize:12, fontWeight:'400', textAlign:'center', color:"#333" }}>
                                We really appreciate your time and doing business with you
                            </Text>
                        </View>
                    </Row>
                    <Row style={{ width:'100%', height:"12%", justifyContent:'center', alignItems:"flex-end" }}>
                        <Text style={{ fontSize:32, fontWeight:'500', color:"#19b24b" }}>
                            Tell Your Friends
                        </Text>
                    </Row>
                    <Row style={{ width:'100%', height:"14%", justifyContent:'center', alignItems:"flex-end" }}>
                        <FbIcon width={wp('10')} style={{ marginRight:wp('2') }}/>
                        <GoogleIcon width={wp('10')} style={{ marginLeft:wp('2') }}/>
                    </Row>
                    <Row style={{ width:'100%', height:"5%", justifyContent:'center', alignItems:"flex-end" }}>
                        <TouchableOpacity
                            style={{ flexDirection:'row', width:wp('32'), alignSelf:'center', alignItems:'center', justifyContent:'space-between' }}
                            onPress={()=>{
                                this.props.navigation.replace("ECommerce")
                            }}>
                            <GoBackIcon />
                            <Text style={{ fontSize:12, fontWeight:'400', textAlign:'center', color:"#333" }}>
                                BACK TO HOME
                            </Text>
                        </TouchableOpacity>
                    </Row>
                </Row>

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
    cardsCol:{
        width:wp('100'),
        height:hp("70"),
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'column'
    },

});

export default connect(mapStateToProps, mapDispatchToProps)(ThankYouScreen);
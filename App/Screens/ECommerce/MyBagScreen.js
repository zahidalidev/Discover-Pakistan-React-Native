import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row } from 'react-native-easy-grid';
import { TextInput, StyleSheet, Text, Image, Platform, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { mapStateToProps, mapDispatchToProps } from '../../Redux/Actions/userActions';
import FooterDrawerModal from '../Component/FooterDrawerModal';
import { ScrollView } from 'react-native-gesture-handler';
import Footer from '../Component/Footer';
import Header from '../Component/Header';
import { Loader, ProfileDropDown } from '../Component';

import DrawerModal from '../Component/DrawerModal';
import { isEmpty, isNullRetNull, isObjEmpty } from '../../Helpers/general';
import { URI } from '../../Constants';
import Api from '../../Constants/Api';
import { SearchList } from '../Component/searchBox';

const PartnersImage = './../../Assets/partners_bg.jpg';

class MyBagScreen extends React.Component {
    _isMounted = false;
    constructor(props){
        super(props);
        this.state = {
            isLoader:false,
            isShowMidModal:false,
            isShowBottomModal: false,
            isDropDown:false,
            totalAmount:0
        }
    }

    async UNSAFE_componentWillMount(){
        this._isMounted = true;
        if (this._isMounted) {
            this.calculateTotalAmount()
        }
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    setStateObj(obj){
        this.setState({ ...this.state, ...obj })
    }

    calculateTotalAmount(){
        let tempAmount = 0;
        if(this.props.getCartList && this.props.getCartList.length > 0){
            this.props.getCartList.map((item)=>{
                tempAmount = (Number(isNullRetNull(item.price, 0))*Number(isNullRetNull(item.quantity, 0))) + Number(tempAmount)
            })
        }else{
            this.props.navigation.goBack()
        }
        this.setStateObj({ totalAmount:tempAmount })
    }

    editProduct(id){
        this.setStateObj({ isLoader: true });
        let payload = {
            uri:URI.GET_SINGLE_PRODUCT,
            method:'post',
            data:{ id: id }
        }
        Api(payload)
            .then((res)=>{
                this.setStateObj({ isLoader: false })
                if(res.data.message === 'success'){
                    if(res.data.data.images.length > 0 && !isObjEmpty(res.data.data)){
                        this.props.navigation.navigate("ProductDetails", { data:res.data.data })
                    }
                }
            })
            .catch((err)=>{
                this.setStateObj({ isLoader: false });
                alert("Unkown Error\n"+ err)
            })
    }

    deleteProduct(id){
        if(isEmpty(this.props.userData) || !this.props.isLoggedIn){
            this.props.navigation.navigate("Signin", { isGoBack:'goBack' })
            return;
        }
        this.setStateObj({ isLoader: true });
        let payload = {
            uri:URI.REMOVE_CART,
            method:'post',
            data:{
                product_id:id,
                user_id: Number(this.props.userData.user_id),
            }
        }
        Api(payload)
            .then((res)=>{
                console.log(res, payload)
                if(res.data.message === 'success'){
                    alert(res.data.data)
                }
                this.getCartList()
            })
            .catch((err)=>{
                this.setStateObj({ isLoader: false });
                alert("Unkown Error\n"+ err)
            })
    }

    getCartList(){
        this.setStateObj({ isLoader: true });
        let payload = {
            uri:URI.GET_CART_LIST,
            method:'post',
            data:{
                user_id: Number(this.props.userData.user_id),
            }
        }
        Api(payload)
            .then((res)=>{
                if(res.data.message === 'success'){
                    this.setStateObj({ isLoader: false, })
                    this.props.setCartList(res.data.data)
                    this.calculateTotalAmount()
                }else{
                    this.setStateObj({ isLoader: false })
                }
            })
            .catch((err)=>{
                this.setStateObj({ isLoader: false });
                alert("Unkown Error \n"+ err)
            })
    }

    render(){
        const {
            isLoader,
            isShowMidModal,
            isShowBottomModal,
            totalAmount,
            isDropDown
        } = this.state;

        const {
            getCartList,
            userData,
            isLoggedIn
        } = this.props;

        if(this.props.getCartList.length < 1){
            this.props.navigation.replace("ECommerce")
        }

        return (<>
            <Loader isLoader={isLoader} />
            <Grid style={styles.grid}>
                <Header
                    navigation={this.props.navigation}
                    toggleDrawer={()=>{ this.setStateObj({ isShowMidModal: !isShowMidModal }) }}
                    isDropDown={isDropDown}
                    setDropDown={(isActive)=>{ this.setStateObj({ isDropDown: isActive }) }}
                    isShowSubHeader
                    isShowSearch
                    tempArray={[]}
                    filterFun={(data)=>{}}
                    isApiSearch={true}
                    apiLoader={(is)=>{ this.setState((state)=>{ return{ ...state, searchLoader:is } }) }}
                    onTypeResult={(data)=>{ this.setState((state)=>{ return{ ...state, searchData:data } }) }}
                    renderPlayer={()=>{
                        return(
                            <Row style={{ height:hp('25') }}>
                                <Image source={require(PartnersImage)} style={{ width:wp('100'), height:'100%' }} />
                            </Row>
                        )
                    }}/>

                <Row style={styles.cardsCol}>
                    <ScrollView>
                        <Row style={{ flexDirection:'column', alignItems:'center', paddingTop:hp('2') }}>
                            <Text style={styles.headTitle}>My Bag ({getCartList.length})</Text>
                            <Text style={styles.subTotalRs}>Subtotal: Rs. {totalAmount}</Text>

                            <Row style={styles.checkOutRow}>
                                {
                                    isLoggedIn && !isObjEmpty(userData) ?
                                    <>
                                        <TouchableOpacity
                                            style={styles.simpleCheckOut}
                                            onPress={()=>{
                                                this.props.navigation.navigate("Orders")
                                            }}>
                                            <Text style={{ color:'#FFF', }}>
                                                Checkout
                                            </Text>
                                        </TouchableOpacity>
                                    </>:
                                    <>
                                        <TouchableOpacity
                                            style={styles.guestCheckOut}
                                            onPress={()=>{
                                                this.props.navigation.navigate("Orders")
                                            }}>
                                            <Text style={{ color:'#333', }}>
                                                Guest Checkout
                                            </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={styles.signInCheckOut}
                                            onPress={()=>{
                                                this.props.navigation.navigate("Orders")
                                            }}>
                                            <Text style={{ color:'#FFF', }}>
                                                Sign in & Checkout
                                            </Text>
                                        </TouchableOpacity>
                                    </>
                                }
                            </Row>

                            {   getCartList &&
                                getCartList.map((p, i)=>{
                                    return(
                                        <Row key={i} style={styles.productRow}>
                                            <Image source={{ uri:isNullRetNull(p.img, 'https://') }} style={styles.productImg} />
                                            <Row style={styles.productInnerRow}>
                                                <Text ellipsizeMode="tail" numberOfLines={2} style={styles.productName}>{p.name}</Text>
                                                <Text ellipsizeMode="tail" numberOfLines={1} style={styles.productName}>Rs. {p.price}</Text>
                                                <View style={{ width:"70%", flexDirection:'row' }}>
                                                    <Text ellipsizeMode="tail" numberOfLines={1} style={styles.productProperties}>ID: {p.product_id}</Text>
                                                    <Text ellipsizeMode="tail" numberOfLines={1} style={[styles.productProperties,{ marginLeft:hp('2') }]}>{isNullRetNull(p.size, false) && 'Size: '+p.size}</Text>
                                                </View>
                                                <Text ellipsizeMode="tail" numberOfLines={1} style={styles.productProperties}>Quantity: {p.quantity} at Rs. {p.quantity*p.price}</Text>
                                            
                                            
                                                <View style={styles.productActionsRow}>
                                                    <TouchableOpacity
                                                        onPress={()=>{
                                                            this.editProduct(p.product_id)
                                                        }}>
                                                        <Text style={styles.productActionsBtn}>Edit</Text>
                                                    </TouchableOpacity>
                                                    {/* <TouchableOpacity>
                                                        <Text style={styles.productActionsBtn}>Save For Later</Text>
                                                    </TouchableOpacity> */}
                                                    <TouchableOpacity
                                                        onPress={()=>{
                                                            this.deleteProduct(p.product_id)
                                                        }}>
                                                        <Text style={styles.productActionsBtn}>Remove</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </Row>
                                        </Row>
                                    )
                                })
                            }

                            {/* <Row style={styles.almostRow}>
                                <Text style={styles.almostText}>Almost there!</Text>
                                <Text style={styles.almostText}>Rs. 200 away from free shipping</Text>
                                <Row style={{ height:"50%", width:'95%', alignItems:'center', justifyContent:'space-around' }}>
                                    <Text style={styles.almostText}>Rs: 0</Text>
                                    <Row style={styles.barWhiteArea}>
                                        <Row style={[styles.barGreenArea, { width:'75%' }]}/>
                                    </Row>
                                    <Text style={styles.almostText}>Rs: 75</Text>
                                </Row>
                            </Row> */}

                            <Row style={styles.promoCodeRow}>
                                <Text style={{ fontSize:14, }}>Promo Code</Text>
                                <TouchableOpacity>
                                    <Text style={styles.promoCodeRowText02}>View Current Promotions</Text>
                                </TouchableOpacity>
                            </Row>

                            <Row style={[styles.promoCodeRow]}>
                                <TextInput
                                    style={styles.promoCodeTextInput}
                                    placeholder={"Enter Code"}/>
                                
                                <TouchableOpacity style={styles.applyCodeBtn}>
                                    <Text style={styles.applyCode}>Apply</Text>
                                </TouchableOpacity>
                            </Row>

                            <Row style={styles.summaryRow}>
                                <Text style={{ fontSize:18,  opacity:0.6, marginBottom:hp('3'), }}>Order Summary</Text>
                                <Row style={{ justifyContent:'space-between' }}>
                                    <Text style={styles.summaryText}>Subtotal</Text>
                                    <Text style={styles.summaryText}>Rs. {totalAmount}</Text>
                                </Row>
                                <Row style={{ justifyContent:'space-between' }}>
                                    <Text style={styles.summaryText}>Est. Shipping and Headling</Text>
                                    <Text style={styles.summaryText}>Rs. 0.00</Text>
                                </Row>
                                <Row style={{ justifyContent:'space-between' }}>
                                    <Text style={styles.summaryText}>Ext. Sales Tax</Text>
                                    <Text style={styles.summaryText}>Rs. 0.00</Text>
                                </Row>

                                <Row style={{ width:wp('90'), height:hp('1'), marginBottom:hp('2'), borderBottomColor:'gray', borderBottomWidth:1 }} />

                                <Row style={{ justifyContent:'space-between' }}>
                                    <Text style={styles.summaryText}>Total</Text>
                                    <Text style={styles.summaryText}>Rs. {totalAmount}</Text>
                                </Row>

                                <Text style={[styles.summaryText, { opacity:0.5 }]}>*Tax will be estimated during checkout</Text>
                            </Row>
                            
                            <Row style={styles.checkOutRow}>
                                {
                                    isLoggedIn && !isObjEmpty(userData) ?
                                    <>
                                        <TouchableOpacity
                                            style={styles.simpleCheckOut}
                                            onPress={()=>{
                                                this.props.navigation.navigate("Orders")
                                            }}>
                                            <Text style={{ color:'#FFF', }}>
                                                Checkout
                                            </Text>
                                        </TouchableOpacity>
                                    </>:
                                    <>
                                        <TouchableOpacity
                                            style={styles.guestCheckOut}
                                            onPress={()=>{
                                                this.props.navigation.navigate("Orders")
                                            }}>
                                            <Text style={{ color:'#333', }}>
                                                Guest Checkout
                                            </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={styles.signInCheckOut}
                                            onPress={()=>{
                                                this.props.navigation.navigate("Orders")
                                            }}>
                                            <Text style={{ color:'#FFF', }}>
                                                Sign in & Checkout
                                            </Text>
                                        </TouchableOpacity>
                                    </>
                                }
                            </Row>

                        </Row>
                    </ScrollView>
                </Row>

                <SearchList
                    { ...this.state }
                    { ...this.props }
                    onClick={(video, list, category)=>{
                        this.props.setCatDetails(list)
                        this.setStateObj({ searchData:undefined })
                        this.props.navigation.navigate("RedirectTo", { path:"ShowDetails", obj:{ category:category, video:video, screen:'Search' } })
                    }}/>

                <DrawerModal
                    navigation={this.props.navigation}
                    toggleDrawer={()=>{ this.setStateObj({ isShowMidModal: !isShowMidModal }) }}
                    isShowModal={isShowMidModal}/>

                <ProfileDropDown
                    isDropDown={isDropDown}
                    props={this.props}
                    setDropDown={(isActive)=>{ this.setStateObj({ isDropDown:isActive }) }}/>

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
    grid:{ height:hp('100'), width:wp('100') },
    cardsCol:{ ...Platform.select({ ios:{ height:hp('47') }, android:{ height:hp('52') } }), width:wp('100'), alignSelf:'center' },
    headTitle:{ fontSize:20, color:'#333333' },
    subTotalRs:{ fontSize:12, color:'#333333', marginTop:hp('1') },
    checkOutRow:{ height:hp('10'), width:wp('100'), alignItems:'center', justifyContent:'center' },
    guestCheckOut:{
        margin:hp('1'),
        borderWidth:1,
        borderColor:'gray',
        width:wp('40'),
        height:hp('6'),
        justifyContent:'center',
        alignItems:'center'
    },
    signInCheckOut:{
        margin:hp('1'),
        width:wp('40'),
        height:hp('6'),
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#19b24b'
    },
    simpleCheckOut:{
        margin:hp('1'),
        width:wp('70'),
        height:hp('6'),
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#19b24b'
    },

    productRow:{ borderTopWidth:1, borderTopColor:'gray', height:hp('20'), width:wp('96'), alignItems:'center' },
    productInnerRow:{
        flexDirection:'column',
        paddingLeft:wp('2'),
        width:"74%",
        height:'70%'
    },
    productImg:{
        borderWidth:1,
        borderColor:'#a3a3a3',
        height:'70%',
        width:'25%',
        resizeMode:'contain'
    },
    productName:{ color:"#333", fontSize:14, marginTop:wp('1') },
    productProperties:{ color:"#333", fontSize:12, opacity:0.5, marginTop:wp('1') },
    productActionsRow:{ width:"80%", flexDirection:'row', height:'25%', alignItems:'flex-end', justifyContent:'space-between' },
    productActionsBtn: { color:"#19b24b", fontSize:12, borderBottomColor:'#19b24b', borderBottomWidth:2 },

    almostRow:{ flexDirection:'column', height:hp('14'), width:wp('90'), marginTop:hp('4'), marginBottom:hp('4'), alignItems:'center', justifyContent:'center', backgroundColor:'#DFDCDC' },
    barWhiteArea:{ backgroundColor:'#fff', height:'40%', width:"65%" },
    barGreenArea:{ backgroundColor:'#19b24b', height:'100%' },
    almostText:{ fontSize:12, opacity:0.5 },
    promoCodeRow:{ height:hp('6'), width:wp('90'), justifyContent:'space-between', alignSelf:'center', alignItems:'center' },
    promoCodeRowText02:{ fontSize:14, borderBottomWidth:1, borderBottomColor:'gray' },
    applyCodeBtn:{ borderWidth:1, borderColor:'gray', height:"90%", width:"30%", alignItems:'center', justifyContent:'center' },
    applyCode:{ fontSize:14, ...Platform.select({ios:{},android:{  }}) },
    promoCodeTextInput:{ paddingLeft:wp('2'), height:"90%", borderBottomWidth:1, fontSize:16, borderBottomColor:'gray', width:"65%" },
    summaryRow:{ height:hp('26'), width:wp('90'), alignSelf:'center', marginTop:hp('5'), flexDirection:'column' },
    summaryText:{ fontSize:14, opacity:0.6 },



});

export default connect(mapStateToProps, mapDispatchToProps)(MyBagScreen);
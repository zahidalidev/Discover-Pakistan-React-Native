import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row } from 'react-native-easy-grid';
import { StyleSheet, Text, Image, Platform, TextInput, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { mapStateToProps, mapDispatchToProps } from '../../Redux/Actions/userActions';
import FooterDrawerModal from '../Component/FooterDrawerModal';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Footer from '../Component/Footer';
import Header from '../Component/Header';
import { Loader, ProfileDropDown } from '../Component';
import { Input, CheckBox } from 'react-native-elements';
import DrawerModal from '../Component/DrawerModal';
import { URI } from '../../Constants';
import Api from '../../Constants/Api';

const PartnersImage = './../../Assets/partners_bg.jpg';
import PakFlagIcon from './../../Assets/svg/pakistan-flag.svg';
import { isEmpty, isNullRetNull } from '../../Helpers/general';
import { SearchList } from '../Component/searchBox';

class Orders extends React.Component {
    _isMounted = false;
    constructor(props){
        super(props);
        this.state = {
            isLoader:false,
            isShowMidModal:false,
            isShowBottomModal: false,
            isDropDown:false,
            payload:{
                user_id:this.props.userData.user_id,
                billing_first_name:'',
                billing_last_name:'',
                zip_code:'',
                billing_address_1:'',
                billing_address_2:'',
                billing_country:'Pakistan',
                order_comments:'',
                billing_phone:'',
                payment_method:true,
            },
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

    setPayload(obj){
        this.setStateObj({ payload:{ ...this.state.payload, ...obj } })
    }

    calculateTotalAmount(){
        let tempAmount = 0;
        if(this.props.getCartList.length > 0){
            this.props.getCartList.map((item)=>{
                tempAmount = Number(isNullRetNull(item.price, 0)) + Number(tempAmount)
            })
        }else{
            this.props.navigation.goBack()
        }
        this.setStateObj({ totalAmount:tempAmount })
    }

    submitOrder(){
        if(isEmpty(this.props.userData) || !this.props.isLoggedIn){
            this.props.navigation.navigate("Signin", { isGoBack:'goBack' })
            return;
        }
        this.setStateObj({ isLoader: true });
        let payload = {
            uri:URI.ORDER_PRODUCTS,
            method:'post',
            data:this.state.payload
        }
        Api(payload)
            .then((res)=>{
                this.setStateObj({ isLoader: false })
                console.log(res)
                if(res.data.message === 'success'){
                    this.props.navigation.navigate("ThankYouScreen", { orderId:Math.floor(100000 + Math.random() * 900000) })
                    this.props.setCartList([]);
                }else{
                    alert(res.data.data)
                }
            })
            .catch((err)=>{
                this.setStateObj({ isLoader: false });
                alert("Unkown Error\n"+ err)
            })
    }

    render(){
        const {
            isLoader,
            isShowMidModal,
            isShowBottomModal,
            isDropDown,
            payload,
            totalAmount
        } = this.state;
        const {
            getCartList
        } = this.props;

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

                        <Text style={styles.headTitle}>Complete Your Order</Text>                        

                        <Row style={styles.shippingInfoRow}>
                            <Row style={{ height:wp('7'), alignItems:'center' }}>
                                <Row style={styles.headGreenDot}>
                                    <Text style={styles.headGreenDotText}>1</Text>
                                </Row>
                                <Text style={styles.shippingInfoText}>Shipping Info</Text>
                            </Row>
                            <Text style={[styles.enterShippingAddress]}>Enter Your Shipping Address</Text>
                            <Text style={styles.countyRegionText}>Country/Region*</Text>
                            <Input
                                style={styles.inputText}
                                placeholder="Pakistan"
                                value={payload.billing_country}
                                onChangeText={(text)=>{
                                    this.setPayload({ billing_country:text })
                                }}/>
                            
                            <Input
                                style={styles.inputText}
                                placeholder="First Name*"
                                value={payload.billing_first_name}
                                onChangeText={(text)=>{
                                    this.setPayload({ billing_first_name:text })
                                }}/>
                            
                            <Input
                                style={styles.inputText}
                                placeholder="Last Name*"
                                value={payload.billing_last_name}
                                onChangeText={(text)=>{
                                    this.setPayload({ billing_last_name:text })
                                }}/>

                            <Input
                                style={styles.inputText}
                                placeholder="Address 1*"
                                value={payload.billing_address_1}
                                onChangeText={(text)=>{
                                    this.setPayload({ billing_address_1:text })
                                }}/>
                            
                            <Input
                                style={styles.inputText}
                                placeholder="Address 2*"
                                value={payload.billing_address_2}
                                onChangeText={(text)=>{
                                    this.setPayload({ billing_address_2:text })
                                }}/>
                            
                            <Input
                                style={styles.inputText}
                                placeholder="Zip code*"
                                value={payload.zip_code}
                                onChangeText={(text)=>{
                                    this.setPayload({ zip_code:text })
                                }}/>
                            
                            <Input
                                style={[styles.inputText]}
                                placeholder="Phone Number*"
                                value={payload.billing_phone}
                                leftIcon={<PakFlagIcon />}
                                onChangeText={(text)=>{
                                    this.setPayload({ billing_phone:text })
                                }}/>

                            <Text style={styles.chooseDelMethod}>
                                Choose a Delivery Method
                            </Text>

                            <Row style={{ borderWidth:0.5, borderColor:'gray' }}/>
                            
                            <CheckBox
                                containerStyle={{ left:-10, backgroundColor:'transparent' }}
                                textStyle={{ fontWeight:'300', fontSize:20 }}
                                checkedColor={"#19b24b"}
                                uncheckedColor={"#19b24b"}
                                title='T.C.S Standrad'
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                checked={payload.payment_method}
                                onPress={()=>{ this.setPayload({ payment_method:!payload.payment_method }) }}/>

                            <Text style={{ fontWeight:'300', color:'gray', alignSelf:'center', width:'80%', top:-10 }}>currently four days, unless otherwise noted</Text>

                            {/* <TouchableOpacity
                                style={styles.paymentBtn}
                                onPress={()=>{

                                }}>
                                    <Text style={{ color:"#FFFFFF", fontWeight:'500', fontSize:18 }}>Continue to Payment</Text>
                            </TouchableOpacity> */}
                        </Row>

                        <Row style={styles.paymentInfoRow}>
                            <Row style={{ height:wp('7'), alignItems:'center' }}>
                                <Row style={styles.headGreenDot}>
                                    <Text style={styles.headGreenDotText}>2</Text>
                                </Row>
                                <Text style={[styles.shippingInfoText, { fontWeight:'300' }]}>Payment Info</Text>
                            </Row>
                        </Row>

                        <Row style={styles.itemSummeryRow}>
                            <Text style={[styles.editBtnText]}>Item Summary</Text>
                            <TouchableOpacity
                                style={{ borderBottomWidth:1, borderBottomColor:'#19b24b' }}
                                onPress={()=>{

                                }}>
                                <Text style={[styles.editBtnText, { color:"#19b24b" }]}>Edit</Text>
                            </TouchableOpacity>
                        </Row>


                        {
                            getCartList.map((p,i)=>{
                                return(
                                    <Row key={i} style={styles.productRow}>
                                        <Image source={{ uri:isNullRetNull(p.img, 'https://') }} style={styles.productImg} />
                                        <Row style={styles.productInnerRow}>
                                            <Text ellipsizeMode="tail" numberOfLines={2} style={styles.productName}>{p.name}</Text>
                                            <Text ellipsizeMode="tail" numberOfLines={1} style={styles.productName}>Rs. {p.price}</Text>
                                            <Text ellipsizeMode="tail" numberOfLines={1} style={styles.productProperties}>ID: {p.product_id}</Text>
                                            <Text ellipsizeMode="tail" numberOfLines={1} style={[styles.productProperties]}>{isNullRetNull(p.size, false) && 'Size: '+p.size }</Text>
                                            <Text ellipsizeMode="tail" numberOfLines={1} style={styles.productProperties}>Quantity: {p.quantity} at Rs. {p.quantity*p.price}</Text>
                                        </Row>
                                    </Row>
                                )
                            })
                        }


                        <Row style={styles.shippingInfoRow}>
                            <Text style={styles.orderSummaryText}>Order Summary</Text>

                            <Row style={styles.summaryDetailRow}>
                                <Text style={{ color:'gray' }}>Subtotal</Text>
                                <Text style={{ color:'gray' }}>Rs. {totalAmount}</Text>
                            </Row>
                            <Row style={styles.summaryDetailRow}>
                                <Text style={{ color:'gray' }}>Est. Shopping and Headling</Text>
                                <Text style={{ color:'gray' }}>Rs. 0.00</Text>
                            </Row>
                            <Row style={styles.summaryDetailRow}>
                                <Text style={{ color:'gray' }}>Est. Sales Tax</Text>
                                <Text style={{ color:'gray' }}>Rs. 0.00</Text>
                            </Row>

                            <Row style={[styles.summaryDetailRow, {height:hp('2')}]}>
                                <Row style={{ width:'100%', alignSelf:'center', borderBottomWidth:1 }} />
                            </Row>
                            
                            <Row style={styles.summaryDetailRow}>
                                <Text>Total</Text>
                                <Text>Rs. {totalAmount}</Text>
                            </Row>

                            <Row style={[styles.summaryInstractions]}>
                                <Text style={{ color:'gray', fontSize:16, textAlign:'auto' }}>
                                    Your credit card will not be charged until {`\n`}your order has shipped unless it is a {`\n`}part of supscription program.{`\n`}
                                    by clicking "Submit Order" I agree{`\n`}to the discover pakistan shop Term of Use.
                                </Text>
                            </Row>

                            <TouchableOpacity
                                style={styles.submitOrders}
                                onPress={()=>{
                                    this.submitOrder()
                                }}>
                                    <Text style={{ color:"#FFFFFF", fontWeight:'500', fontSize:18 }}>Submit Order</Text>
                            </TouchableOpacity>

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
    grid:{ height:hp('100'), width:wp('100') },
    cardsCol:{ ...Platform.select({ios:{ height:hp('47') }, android:{ height:hp('52') } }), width:wp('100'), alignSelf:'center' },

    headTitle:{ fontSize:20, marginTop:hp('2'), color:'#333333', alignSelf:'center', },
    shippingInfoRow:{ flexDirection:'column', width:wp('92'), borderColor:'gray', borderWidth:1, alignSelf:'center', marginTop:hp('2') },
    shippingInfoText:{ fontSize:18, marginLeft:hp('1'), fontWeight:'500', alignSelf:'center', },
    editBtnText:{ fontSize:18, fontWeight:'300', alignSelf:'center', },
    headGreenDot:{ backgroundColor:'#19b24b', width:wp('7'), height:wp('7'), alignItems:'center', justifyContent:'center' },
    headGreenDotText:{ color:"#FFFFFF", fontSize:16 },
    enterShippingAddress:{ fontSize:14, marginLeft:wp('5'), fontWeight:'500', marginTop:hp('1'), marginBottom:hp('0.5') },
    countyRegionText:{ color:"gray", fontWeight:'300', fontSize:16, marginLeft:wp('5') },
    inputText:{ height:hp('6'), width:'86%', borderBottomColor:'gray', borderBottomWidth:1, alignSelf:'center', color:"gray", fontSize:20, paddingBottom:0 },
    chooseDelMethod:{ fontSize:20, fontWeight:'200', color:'#333333', width:'94%', alignSelf:'center', height:hp('4') },

    itemSummeryRow:{ width:wp('92'), height:hp('8'), alignItems:'center', justifyContent:'space-between', alignSelf:'center' },

    paymentInfoRow:{ flexDirection:'column', width:wp('92'), borderColor:'gray', borderWidth:1, alignSelf:'center', marginTop:hp('3'), },
    paymentBtn:{ 
        backgroundColor:"#97F3B5",
        height:hp('7'),
        width:'90%',
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center',
        marginBottom:hp('2'),
        marginTop:hp('1')
    },

    productRow:{ borderTopWidth:1, borderTopColor:'gray', height:hp('16'), width:wp('92'), alignSelf:'center', alignItems:'center' },
    productInnerRow:{ flexDirection:'column', paddingLeft:wp('2'), width:"74%", height:'80%' },
    productImg:{ borderWidth:1, borderColor:'gray', height:'80%', width:'25%', resizeMode:'contain' },
    productName:{ color:"#333", ...Platform.select({ios:{},android:{  }}), fontSize:14, marginTop:wp('1') },
    productProperties:{ color:"#333", ...Platform.select({ios:{},android:{  }}), fontSize:12, opacity:0.5, marginTop:wp('1') },

    orderSummaryText:{ fontSize:22, fontWeight:'500', width:'90%', alignSelf:'center', marginTop:hp('1'), marginBottom:hp('2') },
    summaryDetailRow:{ alignSelf:'center', width:'90%', height:hp('4'), justifyContent:'space-between', alignItems:'center' },
    summaryInstractions:{ alignSelf:'center', alignItems:'center',height:hp('14'), width:'89%' },
    submitOrders:{ 
        backgroundColor:"#90B65C",
        height:hp('7'),
        width:'90%',
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center',
        marginBottom:hp('2'),
        marginTop:hp('1')
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
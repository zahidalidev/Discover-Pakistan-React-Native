import React from 'react';
import {
  StyleSheet,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { Row } from 'react-native-easy-grid';
import { connect } from 'react-redux';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { mapStateToProps, mapDispatchToProps } from '../../Redux/Actions/userActions';
import { ScrollView } from 'react-native-gesture-handler';

import { isNullRetNull } from '../../Helpers/general';

class CartListModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            totalAmount:0
        }
    }

    UNSAFE_componentWillMount(){
        this._isMounted = true;
        if(this._isMounted){
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
        if(this.props.getCartList){
            this.props.getCartList.map((item)=>{
                tempAmount = (Number(isNullRetNull(item.price, 0)) * Number(isNullRetNull(item.quantity, 0))) + Number(tempAmount)
            })
        }
        this.setStateObj({ totalAmount:tempAmount })
    }

    render(){
        const { navigation, isShowModal, onCloseBtn, getCartList } = this.props;
        const { totalAmount } = this.state;
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={isShowModal}>
                <Row style={styles.modalBg}/>

                <Row style={styles.modalBody}>
                    <Row style={styles.modalBodyMainRow}>
                        {
                            onCloseBtn &&
                            <TouchableOpacity
                                style={styles.closeBtn}
                                onPress={onCloseBtn}>
                                <Text style={{ fontSize:18, paddingRight:5 }}>X</Text>
                            </TouchableOpacity>
                        }
                        <Row style={styles.headRow}>
                            <Text style={styles.headTitle}>My Bag ({isNullRetNull(getCartList.length,0)})</Text>
                            <TouchableOpacity
                                style={styles.viewFullBtn}
                                onPress={()=>{ 
                                    navigation.navigate("MyBagScreen")
                                    if(onCloseBtn){
                                        onCloseBtn()
                                    }
                                }}>
                                    <Text style={{ 
                                        color:'#FFFFFF',
                                        ...Platform.select({ios:{},android:{}}),
                                    }}>View Full Bag</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.continueBtn}
                                onPress={()=>{ 
                                    // navigation.navigate("MyBagScreen")
                                    if(onCloseBtn){
                                        onCloseBtn()
                                    }
                                }}>
                                    <Text style={{ 
                                        color:'#333333',
                                        ...Platform.select({ios:{},android:{}}),
                                    }}>Continue Shopping</Text>
                            </TouchableOpacity>
                        </Row>

                        <Row style={styles.cartDetailsRow}>
                            <ScrollView style={{ flex:1 }}>
                                {
                                    getCartList.map((item, i)=>{
                                        return(
                                            <Row style={{ height:hp('14') }} key={i}>
                                                {
                                                    typeof(isNullRetNull(item.images)) === 'object' ?
                                                    <Image source={{ uri:isNullRetNull(item.images[0].img) }} style={styles.productImg} />
                                                    : <Image source={{ uri:isNullRetNull(item.img) }} style={styles.productImg} />
                                                }
                                                <Row style={{ flexDirection:'column' }}>
                                                    <Text ellipsizeMode="tail" numberOfLines={2} style={styles.productName}>
                                                        {isNullRetNull(item.name)}
                                                    </Text>
                                                    <Text style={styles.simpleText}>Rs. {isNullRetNull(item.price,'')}</Text>
                                                    <Text style={styles.simpleText}>Quantity: {isNullRetNull(item.quantity,0)}</Text>
                                                    {
                                                        item.color && <Text style={styles.simpleText}>Color: {isNullRetNull(item.color, 'n/a')}</Text>
                                                    }
                                                </Row>
                                            </Row>
                                        )
                                    })
                                }
                            </ScrollView>
                            <Row style={{ backgroundColor:'#19b24b', height:hp('5'), width:wp('100'), justifyContent:'center', flexDirection:'column' }}>
                                <Text style={{ alignSelf:'flex-end', fontWeight:'600', color:"#333", paddingRight:wp('4') }}>Sub Total Rs. {isNullRetNull(totalAmount, 0)}</Text>
                            </Row>
                        </Row>

                    </Row>
                </Row>
            </Modal>
        );
    }
};

const styles = StyleSheet.create({
    modalBg:{ position:'absolute', zIndex:-1, width:wp('100'), height:hp('100'), backgroundColor:"#333333", opacity:0.6, alignItems:'center', justifyContent:'center' },
    modalBody:{ width:wp('100'), height:hp('100'), alignItems:'center', justifyContent:'center' },
    modalBodyMainRow:{ backgroundColor:'#FFFFFF', height:hp('75'), width:wp('100%'), flexDirection:'column' },
    closeBtn:{ position:'absolute', zIndex:2, right:0, top:0, alignItems:'center', justifyContent:'center', height:hp('5'), width:hp('5') },
    headRow:{ flexDirection:'column', alignItems:'center', justifyContent:'space-around', height:hp('22'), borderBottomColor:'gray', borderBottomWidth:1 },
    headTitle:{
        fontSize:18,
        ...Platform.select({ios:{},android:{}}),
        color:'#333333'
    },
    viewFullBtn:{ height:hp('6'), width:wp('70'), backgroundColor:'#19b24b', alignItems:'center', justifyContent:'center' },
    continueBtn:{ borderWidth:1, borderColor:'gray', height:hp('6'), width:wp('70'), alignItems:'center', justifyContent:'center', marginBottom:hp('1') },

    cartDetailsRow:{ width:wp('100'), paddingTop:wp('4'), flexDirection:'column' },
    productImg:{
        marginLeft:wp('4'),
        marginRight:wp('4'),
        borderWidth:1,
        borderColor:'gray',
        height:hp('12'),
        width:wp('22'),
    },
    productName:{ width:wp('66'), color:'#333', ...Platform.select({ ios:{}, android:{} }) },
    suggestedImgRow:{ alignItems:'center', justifyContent:'center', flexDirection:'column' },
    suggestedImg:{ marginLeft:wp('2'), marginRight:wp('2'), height:hp('15'), width:wp('22'), resizeMode:'contain', borderWidth:1, borderColor:'gray' },
    suggestedImgName:{
        width:wp('20'),
        fontSize:12,
        textAlign:'center',
        ...Platform.select({ios:{},android:{}}),
        marginTop:4
    },
    suggestedImgPrice:{
        width:wp('20'),
        fontSize:12,
        textAlign:'center',
        ...Platform.select({ios:{},android:{}}),
    },
    simpleText:{
        ...Platform.select({ios:{},android:{}}),
        width:wp('66'), marginTop:hp('1'), fontSize:12
    }

});

export default connect(mapStateToProps, mapDispatchToProps)(CartListModal);
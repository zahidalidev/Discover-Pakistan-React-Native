import React from 'react';
import { StyleSheet, Text, Modal, TouchableOpacity, Image, Platform } from 'react-native';
import { Row } from 'react-native-easy-grid';
import { connect } from 'react-redux';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { mapStateToProps, mapDispatchToProps } from '../../Redux/Actions/userActions';
import { FlatList } from 'react-native-gesture-handler';
import { isNullRetNull } from '../../Helpers/general';
import { CONSTANTS } from '../../Constants';

class MyBagModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
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
        const {
            navigation,
            isShowModal,
            onCloseBtn,
            product,
            getCartList
        } = this.props
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
                            <Text style={styles.headTitle}>My Bag ({ getCartList && isNullRetNull(getCartList.length, 0)})</Text>
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
                                        ...Platform.select({ios:{},android:{  }}),
                                    }}>Continue Shopping</Text>
                            </TouchableOpacity>
                        </Row>

                        <Row style={styles.cartDetailsRow}>
                            <Row style={{ height:hp('18') }}>
                                {
                                    typeof(isNullRetNull(product.images)) === 'object' ?
                                    <Image source={{ uri:isNullRetNull(product.images[0].img) }} style={styles.productImg} />
                                    : <Image source={{ uri:isNullRetNull(product.img) }} style={styles.productImg} />
                                }
                                <Row style={{ flexDirection:'column' }}>
                                    <Text ellipsizeMode="tail" numberOfLines={2} style={styles.productName}>
                                        {isNullRetNull(product.name)}
                                    </Text>
                                    <Text style={styles.simpleText}>Rs. {isNullRetNull(product.price)}</Text>
                                    <Text style={styles.simpleText}>Quantity: {isNullRetNull(product.quantity)}</Text>
                                    <Text style={styles.simpleText}>Color: {isNullRetNull(product.color, 'n/a')}</Text>
                                </Row>
                            </Row>

                            <Row style={{ backgroundColor:'#19b24b', height:hp('5'), width:wp('100'), justifyContent:'center', flexDirection:'column' }}>
                                <Text style={{ alignSelf:'flex-end', paddingRight:wp('4') }}>Sub Total Rs. {Number(product.price)*Number(product.quantity)}</Text>
                            </Row>
                        </Row>

                        <Row style={{ flexDirection:'column', alignItems:'center', justifyContent:'flex-start' }}>
                            <Text style={{
                                fontSize:18,
                                ...Platform.select({ios:{},android:{  }}),
                                }}>You May Also Like</Text>

                            <Row style={{ alignItems:'center', justifyContent:'center' }}>

                                {/* <FlatList
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    keyExtractor={ (item, index) => index.toString() }
                                    data={imagesList}
                                    renderItem={(data)=>{
                                        return(
                                            <Row style={styles.suggestedImgRow}>
                                                <Image source={{ uri:isNullRetNull(data.item.img) }} style={[styles.suggestedImg]} />
                                                <Text ellipsizeMode="tail" numberOfLines={1} style={styles.suggestedImgName}>Test test test</Text>
                                                <Text style={styles.suggestedImgPrice}>Rs. 1200</Text>
                                            </Row>
                                        )
                                    }}>

                                    </FlatList> */}
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
        ...Platform.select({ios:{},android:{  }}),
        color:'#333333'
    },
    viewFullBtn:{ height:hp('6'), width:wp('70'), backgroundColor:'#19b24b', alignItems:'center', justifyContent:'center' },
    continueBtn:{ borderWidth:1, borderColor:'gray', height:hp('6'), width:wp('70'), alignItems:'center', justifyContent:'center', marginBottom:hp('1') },

    cartDetailsRow:{ height:hp('27'), width:wp('100'), paddingTop:wp('4'), flexDirection:'column' },
    productImg:{ marginLeft:wp('4'), marginRight:wp('4'), borderWidth:1, borderColor:'gray', height:hp('15'), width:wp('25'), resizeMode:'contain' },
    productName:{ width:wp('66'), color:'#333', ...Platform.select({ ios:{}, android:{} }) },
    suggestedImgRow:{ alignItems:'center', justifyContent:'center', flexDirection:'column' },
    suggestedImg:{ marginLeft:wp('2'), marginRight:wp('2'), height:hp('15'), width:wp('22'), resizeMode:'contain', borderWidth:1, borderColor:'gray' },
    suggestedImgName:{
        width:wp('20'),
        fontSize:12,
        textAlign:'center',
        ...Platform.select({ios:{},android:{  }}),
        marginTop:4
    },
    suggestedImgPrice:{
        width:wp('20'),
        fontSize:12,
        textAlign:'center',
        ...Platform.select({ios:{},android:{  }}),
    },
    simpleText:{
        ...Platform.select({ios:{},android:{  }}),
        width:wp('66'), marginTop:hp('1'), fontSize:12
    }

});

export default connect(mapStateToProps, mapDispatchToProps)(MyBagModal);
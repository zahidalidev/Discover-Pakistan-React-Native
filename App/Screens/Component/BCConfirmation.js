import React from 'react';
import {
  StyleSheet,
  Text,
  Modal,
  TouchableOpacity,
  View
} from 'react-native';
import { Col, Row } from 'react-native-easy-grid';
import { connect } from 'react-redux';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { mapStateToProps, mapDispatchToProps } from '../../Redux/Actions/userActions';

class BCConfirmation extends React.Component {
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
        const { isShowModal, goItBtn } = this.props

        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={isShowModal}>
                    <Col style={{ alignItems:'center', justifyContent:'center' }}>
                        <Row style={styles.modalBackground}/>
                        <View style={styles.modalRow}>
                            <Text style={{ fontSize:18, fontWeight:'500', marginTop:hp('1') }}>
                                We can't wait to see your best work
                            </Text>

                            <Text style={{ fontSize:14, fontWeight:'300', marginTop:hp('2') }}>
                                First upload images and videos that you have created. Then add details and submit your work for review.
                            </Text>

                            <Text style={styles.text01}>
                                We can't wait to see your best work
                            </Text>
                            <Text style={styles.text02}>
                                Upload JPEG file that are at least 4 megapixels.
                            </Text>

                            <Text style={styles.text01}>
                                Videos
                            </Text>
                            <Text style={styles.text02}>
                                Upload videos file using FTP
                            </Text>
                            <Text style={[styles.text02,{ color:"#19b24b" }]}>
                                Learn more
                            </Text>

                            <Text style={styles.text01}>
                                Vectors
                            </Text>
                            <Text style={styles.text02}>
                                Upload EPS files compatible with illustrator version 8 to 10.
                            </Text>
                            <Text style={[styles.text02,{ color:"#19b24b" }]}>
                                Learn more
                            </Text>

                            <Text style={styles.text03}>
                                Content with people or private property
                            </Text>
                            <Text style={styles.text04}>
                                Learn about permission and releases
                            </Text>

                            <Text style={styles.text03}>
                                Learn about common rejection reasons
                            </Text>
                            <Text style={styles.text04}>
                                Focus | Exposure | Pixelation | Trademarks
                            </Text>

                            <View style={styles.goItBtnView}>
                                <TouchableOpacity
                                    style={styles.goItBtn}
                                    onPress={()=>{
                                        if(goItBtn){
                                            goItBtn()
                                        }
                                    }}>
                                    <Text style={styles.goItBtnTxt}>Got it!</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
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
    modalRow:{
        padding:hp('1'),
        flexDirection:'column',
        backgroundColor:'#FFFFFF',
        // height:hp('54'),
        paddingBottom:hp('2'),
        width:wp('90'),
        borderRadius:4,
        shadowColor: "rgba(138,138,138,0.3)",
        elevation: 10,
        alignItems:'flex-start',
        shadowOffset: { width: 5, hesight: 5 },
        shadowOpacity: 4,
        shadowRadius: 10,
    },
    goItBtnView:{
        alignItems:'flex-end',
        justifyContent:'flex-end',
        width:'100%',
        marginTop:hp('2')
    },
    goItBtn:{
        backgroundColor:'#19b24b',
        height:hp('4'),
        width:wp('22'),
        alignItems:'center',
        justifyContent:'center'
    },
    goItBtnTxt:{ fontSize:16, fontWeight:'600', color:"#FFF" },
    text01:{ fontSize:16, fontWeight:'500', marginTop:hp('2'), marginLeft:hp('2') },
    text02:{ fontSize:14, fontWeight:'300', marginLeft:hp('2') },
    text03:{ fontSize:16, fontWeight:'500', marginTop:hp('2'), },
    text04:{ fontSize:14, fontWeight:'500', color:"#19b24b" },
});

export default connect(mapStateToProps, mapDispatchToProps)(BCConfirmation);
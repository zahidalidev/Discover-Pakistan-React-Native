import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row } from 'react-native-easy-grid';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { mapStateToProps, mapDispatchToProps } from '../../Redux/Actions/userActions';
import FooterDrawerModal from '../Component/FooterDrawerModal';
import Footer from '../Component/Footer';
import Header from '../Component/Header';
import { Loader, ProfileDropDown } from '../Component';
import DrawerModal from '../Component/DrawerModal';

import DownArrow from './../../Assets/svg/down-arrow.svg'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SearchList } from '../Component/searchBox';

const BackgroudIcon = './../../Assets/Kpk.jpg';

class BecomeContributor extends React.Component {
    _isMounted = false;
    constructor(props){
        super(props);
        this.state = {
            isLoader:false,
            isShowMidModal:false,
            isShowBottomModal: false,
            isDropDown:false,
        }
    }

    async UNSAFE_componentWillMount(){
        this._isMounted = true;
        if (this._isMounted) {

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
            isDropDown
        } = this.state;

        return (<>
            <Loader isLoader={isLoader} />
            <Grid style={{ flex:1, flexDirection:'column' }}>
                <Header
                    containerStyle={{ height:hp('1') }}
                    navigation={this.props.navigation}
                    toggleDrawer={()=>{ this.setStateObj({ isShowMidModal: !isShowMidModal }) }}
                    isDropDown={isDropDown}
                    setDropDown={(isActive)=>{ this.setStateObj({ isDropDown: isActive }) }}
                    isShowSearch
                    isShowSubHeader
                    tempArray={[]}
                    filterFun={(data)=>{ }}
                    isApiSearch={true}
                    apiLoader={(is)=>{ this.setState((state)=>{ return{ ...state, searchLoader:is } }) }}
                    onTypeResult={(data)=>{ this.setState((state)=>{ return{ ...state, searchData:data } }) }}
                    isRenderPlayer={false}/>
                    
                <ImageBackground source={require(BackgroudIcon)} style={styles.bgIconStyle}>

                    <View style={styles.mainRow}>
                        <Text style={styles.headTitle}>Welcome to the community!</Text>
                        <Text style={styles.headTitle}>We can't wait to see your best work.</Text>

                        <Text style={styles.notes}>Ready to get started? Start uploading your images (photos, vectors or illustrations) or video clips.</Text>

                        <Text
                            style={styles.learnMoreTxt}
                            onPress={()=>{
                            }}>
                                Learn how to submit videos
                        </Text>

                            
                        <TouchableOpacity
                            style={styles.uploadHereBtn}
                            onPress={()=>{
                                this.props.navigation.navigate("UploadContent")
                            }}>
                                <Row style={styles.uploadHereTextRow}>
                                    <Text style={styles.uploadHereText}>UPLOAD HERE</Text>
                                </Row>
                                <Row style={styles.uploadHereIconRow}>
                                    <DownArrow />
                                </Row>
                        </TouchableOpacity>

                        <Text
                            style={styles.gotoTxt}
                            onPress={()=>{
                                this.props.navigation.replace("Home");
                            }}>
                                Go to Home Page
                        </Text>
                    </View>

                </ImageBackground>

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
    bgIconStyle:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'column'
    },
    mainRow:{
        backgroundColor:'#fff',
        width:wp('90'),
        alignSelf:'center',
        flexDirection:'column',
        padding:hp('2'),
        top:-hp('6'),
    },
    headTitle:{ fontSize:26, fontWeight:'500' },
    notes:{
        fontSize:18,
        fontWeight:'200',
        color:'#333',
        marginTop:hp('3')
    },
    uploadHereBtn:{
        backgroundColor:'#19b24b',
        height:hp('4.5'),
        width:wp('60'),
        flexDirection:'row',
        alignSelf:'center',
        marginTop:hp('6')
    },
    learnMoreTxt:{
        fontSize:16,
        fontWeight:'500',
        textDecorationLine:'underline',
        color:'#19b24b',
        marginTop:hp('3')
    },
    gotoTxt:{
        fontSize:16,
        textAlign:'center',
        fontWeight:'500',
        color:'#19b24b',
        marginTop:hp('4')
    },
    uploadHereTextRow:{
        width:'80%',
        height:'100%',
        alignItems:'center',
        justifyContent:'center',
        borderRightColor:'#333',
        borderRightWidth:1
    },
    uploadHereText:{
        color:"#fff",
        fontSize:20,
        fontWeight:'500'
    },
    uploadHereIconRow:{
        width:'20%',
        height:"100%",
        alignItems:'center',
        justifyContent:'center'
    },

});

export default connect(mapStateToProps, mapDispatchToProps)(BecomeContributor);
import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { mapStateToProps, mapDispatchToProps } from '../../Redux/Actions/userActions';
import FooterDrawerModal from '../Component/FooterDrawerModal';
import { Grid, Row } from 'react-native-easy-grid';
import DrawerModal from '../Component/DrawerModal';
import LivePlayer from '../Component/LivePlayer';
import { CONSTANTS } from '../../Constants';
import Header from '../Component/Header';
import Footer from '../Component/Footer';
import { connect } from 'react-redux';

import { Loader, ProfileDropDown } from '../Component';
import { SearchList } from '../Component/searchBox';

class LiveStreaming extends React.Component {
    Loader = true;
    _isMounted = false;
    constructor(props){
        super(props);
        this.state = {
            loader:true,
            isLoader:false,
            isShowMidModal:false,
            isShowBottomModal: false,
            isDropDown:false,
            isPlay:false,
            isMuted:false,
            liveUrl:CONSTANTS.LIVE_URL,
            isLoaded:false
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

    setStateObj(obj){ if(this._isMounted){ this.setState({ ...this.state, ...obj }) } }

    render(){

        const {
            isShowMidModal,
            isShowBottomModal,
            liveUrl,
            isPlay,
            isMuted,
            isLoader,
            isDropDown,
            isLoaded
        } = this.state;

        if(!isLoaded){
            if(this.videoRef){
                this.setStateObj({ isLoaded:true })
                this.videoRef.presentFullscreenPlayerAsync()
            }
        }

        return (<>
            <Loader isLoader={isLoader} />
            <Grid style={styles.grid}>
                <Header
                    navigation={this.props.navigation}
                    isShowSearch={true}
                    isDropDown={isDropDown}
                    setDropDown={(isActive)=>{ this.setStateObj({ isDropDown: isActive }) }}
                    toggleDrawer={()=>{ this.setStateObj({ isShowMidModal: !isShowMidModal }) }}
                    isShowSubHeader
                    tempArray={[]}
                    filterFun={(data)=>{}}
                    isApiSearch={true}
                    apiLoader={(is)=>{ this.setState((state)=>{ return{ ...state, searchLoader:is } }) }}
                    onTypeResult={(data)=>{ this.setState((state)=>{ return{ ...state, searchData:data } }) }}
                    renderPlayer={()=>{
                        return(<>
                            <LivePlayer
                                refs={(videoRef)=>{
                                    this.videoRef = videoRef;
                                    if(videoRef){
                                        videoRef.presentFullscreenPlayerAsync()
                                    }
                                }}
                                isPlay={isPlay}
                                isMuted={isMuted}
                                navigation={this.props.navigation}
                                playAsync={(isPlay)=>{ this.setStateObj({ isPlay:isPlay }) }}
                                setIsMutedAsync={(isMuted)=>{ this.setStateObj({ isMuted:isMuted }) }}
                                source={{ uri: liveUrl }}
                                />
                        </>)
                    }}/>
                    <Row></Row>

                
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
        height:hp('100'),
        width:wp('100'),
    },
    contents:{
        ...Platform.select({
            ios:{ height:hp('46') },
            android:{ height:hp('51') }
        }),
        width:wp('100'),
        alignSelf:'center',
        marginTop:hp('0.6'),
    },
    card:{
        flexDirection:'column',
        backgroundColor:'#FFFFFF',
        ...Platform.select({
            ios:{
                height:hp('20'),
            },
            android:{
                height:hp('23'),
            }
        }),
        width:wp('96'),
        paddingTop:hp('1'),
        alignSelf:'center',
        marginTop:hp('0.6'),
        alignItems:'center'
    },
    cardTitleRow:{
        height:hp('4'),
        width:wp('92'),
        alignItems:'center'
    },
    cardTitleDot:{
        backgroundColor:'#19b24b',
        height:hp('3'),
        width:wp('3'),
        marginRight:hp('1')
    },
    cardTitle:{
        color:'#19b24b',
        fontSize:24,
        fontWeight:'600',
        width:'94%',
        ...Platform.select({
            ios:{

            },
            android:{

            }
        })
    },
    carouselCard:{
        padding:hp('1'),
        flexDirection:'row'
    },
    carouselCardImgView:{
        backgroundColor:'#FFFFFF',
        overflow:'hidden',
        borderColor:'gray',
        borderWidth:1,
        width:wp('38'),
        ...Platform.select({
            ios:{
                height:hp('11'),
            },
            android:{
                height:hp('12'),
            }
        }),
        justifyContent:'center'
    },
    carouselCardImg:{
        width:'100%',
        height:'100%',
        resizeMode:'stretch'
    },
    carouselCardDetail:{
        flexDirection:'column',
        paddingLeft:hp('1'),
        overflow:'scroll'
    },
    carouselCardTitle:{
        fontSize:14,
        fontWeight:'500',
        width:'96%',
        ...Platform.select({
            ios:{

            },
            android:{

            }
        })
    },
    carouselCardDis:{
        fontSize:12,
        paddingTop:5,
        width:'94%',
        ...Platform.select({
            ios:{

            },
            android:{
                
            }
        }),
        opacity:0.8
    },
    carouselCardtime:{
        fontSize:10,
        color:'#333333',
        paddingTop:5,
        ...Platform.select({
            ios:{

            },
            android:{
                
            }
        }),
        opacity:0.8
    },


    // Details Design
    detailsContent01:{
        flexDirection:'column',
        ...Platform.select({
            ios:{ height:hp('42') },
            android:{ height:hp('47') }
        }),
        width:wp('100'),
        alignSelf:'center',
        marginTop:hp('2.5'),
        justifyContent:'center',
        alignItems:'center'
    },
    detailsGoBackRow01:{
        height:hp('4%'),
        width:wp('96'),
        alignItems:'center'
    },
    detailsGoBackBtn01:{
        flexDirection:'row',
        height:hp('4'),
        width:wp('96'),
        alignItems:'center',
    },
    detailsGoBackBtnText01:{
        color:'#333333',
        fontSize:20,
        fontWeight:'bold',
        paddingLeft:wp('1')
    },
    detailsGoBackBtnIconCircle01:{
        width:hp('3'),
        height:hp('3'),
        alignItems:'center',
        justifyContent:'center',
        borderRadius:50,
        backgroundColor:'#19b24b'
    },
    detailsGoBackBtnIcon01:{
        width:hp('2'),
        height:hp('2'),
    },
    detailsCard01:{
        flexDirection:'column',
        backgroundColor:'#FFFFFF',
        height:'100%',
        width:wp('96'),
        paddingTop:hp('1'),
        alignSelf:'center',
        alignItems:'center'
    },
    detailsCardTitleRow01:{
        height:hp('4'),
        width:wp('92'),
        alignItems:'center'
    },
    detailsCardTitleDot01:{
        backgroundColor:'#19b24b',
        height:hp('3'),
        width:wp('3'),
        marginRight:hp('1')
    },
    detailsCardTitle01:{
        color:'#19b24b',
        fontSize:28,
        fontWeight:'600'
    },
    detailsCarouselCard01:{
        padding:hp('1'),
        width:wp('96'),
    },
    detailsPlayIcon01:{
        position:'absolute',
        zIndex:1,
        alignSelf:'center',
        justifyContent:'center',
        height:hp('6')
    },
    detailsCarouselCardImgView01:{
        backgroundColor:'#FFFFFF',
        overflow:'hidden',
        borderColor:'gray',
        borderWidth:1,
        width:wp('38'),
        ...Platform.select({
            ios:{ height:hp('11') },
            android:{ height:hp('12') }
        }),
        justifyContent:'center'
    },
    detailsCarouselCardImg01:{
        width:'100%',
        height:'100%',
        resizeMode:'stretch'
    },
    detailsCarouselCardDetail01:{
        flexDirection:'column',
        paddingLeft:hp('1'),
        overflow:'scroll'
    },
    detailsCarouselCardTitle01:{
        fontSize:14,
        fontWeight:'500',
    },
    detailsCarouselCardDis01:{
        fontSize:12,
        paddingTop:5
    },
    detailsCarouselCardtime01:{
        fontSize:10,
        color:'#333333',
        paddingTop:5
    }
    
});

export default connect(mapStateToProps, mapDispatchToProps)(LiveStreaming);

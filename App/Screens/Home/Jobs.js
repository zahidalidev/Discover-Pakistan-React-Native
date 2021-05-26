import React from 'react';
import { StyleSheet, Text, Image, Platform, TouchableOpacity } from 'react-native';
import { Grid, Row } from 'react-native-easy-grid';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../Redux/Actions/userActions';
import { Loader, ProfileDropDown } from '../Component';
import Header from '../Component/Header';
import Footer from '../Component/Footer';
import FooterDrawerModal from '../Component/FooterDrawerModal';

import { ScrollView } from 'react-native-gesture-handler';
import ApplyModal from '../Component/ApplyModal';
import { isObjEmpty } from '../../Helpers/general';
import DrawerModal from '../Component/DrawerModal';
import { URI } from '../../Constants';
import Api from '../../Constants/Api';
import { SearchList } from '../Component/searchBox';
const JobImage = './../../Assets/job_bg.jpg';
const WeAreHiringImg = './../../Assets/we_are_hiring.png';
const CareerProfileImg = './../../Assets/career_profile_icon.png';

const details = [
   { id:1, title:'Director Marketing', description:`responsible for their company's marketing and communications strategies, as well as overall branding and image.` },
   { id:2, title:'Cheif Operation Manager', description:`responsible for their company's marketing and communications strategies, as well as overall branding and image.` },
   { id:3, title:'Director Cordination', description:`responsible for their company's marketing and communications strategies, as well as overall branding and image.` },
   { id:4, title:'Anchor / Host', description:`responsible for their company's marketing and communications strategies, as well as overall branding and image.` },
]

class Jobs extends React.Component {
    Loader = true;
    _isMounted = false;
    constructor(props){
        super(props);
        this.state = {
            loader:false,
            isShowMidModal:false,
            isShowBottomModal: false,
            array:details,
            tempArray:details,
            selectedJob:{},
            isShowApplyModal:false,
            isDropDown:false,
            isShowMidModal:false,
        }
    }

    async UNSAFE_componentWillMount(){
        this._isMounted = true;
        if (this._isMounted) {
            this.getJobsList()
        }
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    setStateObj(obj){
        this.setState({ ...this.state, ...obj })
    }

    getJobsList(){
        this.setStateObj({ loader: true });
        let payload = {
            uri:URI.JOBS_LIST,
            method:'post',
            data:{}
        }

        Api(payload)
            .then((res)=>{
                console.log(res)
                if(res.data.message === 'success'){
                    this.setStateObj({ loader: false });
                }else{
                    this.setStateObj({ loader: false });
                }
            })
            .catch((err)=>{
                this.setStateObj({ loader: false });
                alert("Unkown Error \n"+err)
            })
    }

    render(){
        const {
            loader,
            selectedJob,
            isShowMidModal,
            isShowBottomModal,
            array,
            tempArray,
            isShowApplyModal,
            isDropDown,
        } = this.state;

        return (<>
            <Loader isLoader={loader} />
            <Grid style={styles.grid}>
                <Header
                    navigation={this.props.navigation}
                    isShowSearch={true}
                    isDropDown={isDropDown}
                    setDropDown={(isActive)=>{ this.setStateObj({ isDropDown: isActive }) }}
                    toggleDrawer={()=>{ this.setStateObj({ isShowMidModal: !isShowMidModal }) }}
                    isShowSubHeader
                    tempArray={array}
                    filterFun={(data)=>{ this.setStateObj({ tempArray:data }) }}
                    isApiSearch={true}
                    apiLoader={(is)=>{ this.setState((state)=>{ return{ ...state, searchLoader:is } }) }}
                    onTypeResult={(data)=>{ this.setState((state)=>{ return{ ...state, searchData:data } }) }}
                    renderPlayer={()=>{
                        return(<>
                            <Row style={{ height:hp('25') }}>
                                <Row style={styles.weAreHire}>
                                    <Image source={require(WeAreHiringImg)} style={{ width:wp('50'), height:null }} />
                                </Row>
                                <Row style={[styles.weAreHire,{top:'65%',left:'3%'}]}>
                                    <Text style={[styles.letsWork, { color:'#FFFFFF' }]}>Lets</Text>
                                    <Text style={[styles.letsWork, { color:'#19b24b' }]}> Work</Text>
                                    <Text style={[styles.letsWork, { color:'#FFFFFF' }]}> Together and</Text>
                                    <Text style={[styles.letsWork, { color:'#19b24b' }]}> Explore</Text>
                                    <Text style={[styles.letsWork, { color:'#FFFFFF' }]}> Opportunities.</Text>
                                </Row>
                                <Image source={require(JobImage)} style={{ width:wp('100'), height:'100%' }} />
                            </Row>
                        </>)
                    }}/>

                <Row style={styles.contents}>
                    <ScrollView>
                        <Row style={styles.screenTitleRow}>
                            <Row style={styles.screenTitleDon} />
                            <Text style={styles.screenTitle}>OPEN JOBS</Text>
                        </Row>

                        {
                            tempArray.map((item, i)=>{
                                return(
                                    <Row style={styles.card} key={i}>
                                        <Row style={styles.cardSubRow}>
                                            <Image source={require(CareerProfileImg)} style={styles.profileIcon} />
                                            <Row style={styles.cardDetailsRow}>
                                                <Text style={styles.jobTitle}>{item.title}</Text>
                                                <Text style={styles.jobDes}>{item.description}</Text>
                                            </Row>
                                            <TouchableOpacity
                                                style={styles.applyBtn}
                                                onPress={()=>{
                                                    this.setStateObj({ selectedJob:item, isShowApplyModal:true })
                                                    // setTimeout(()=>{ this.setStateObj({ isShowApplyModal:true }) },2000)
                                                }}>
                                                <Text style={styles.applyBtnText}>Apply Now</Text>
                                            </TouchableOpacity>
                                        </Row>
                                    </Row>
                                )
                            })
                        }

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
                
                { !isObjEmpty(selectedJob) && isShowApplyModal &&
                    <ApplyModal
                        selectedPostion={selectedJob}
                        navigation={this.props.navigation}
                        isShowModal={isShowApplyModal}
                        showHide={()=>{ this.setStateObj({ isShowApplyModal: !isShowApplyModal, selectedJob:{} }) }}/>
                }

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
        width:wp('100'),
        alignSelf:'center',
        marginBottom:hp('5')
    },
    weAreHire:{
        position:'absolute',
        top:'50%',
        zIndex:2,
        height:hp('3'),
        width:wp('100')
    },
    letsWork:{
        fontSize:15,
        fontWeight:'bold'
    },
    
    screenTitleRow:{
        height:hp('8'),
        width:wp('100'),
        paddingLeft:wp('4'),
        alignItems:'center',
    },
    screenTitleDon:{
        backgroundColor:'#19b24b',
        height:hp('3.5'),
        width:wp('3'),
        marginRight:hp('1')
    },
    screenTitle:{
        color:'#19b24b',
        fontSize:24,
        fontWeight:'600'
    },

    card:{
        height:hp('30'),
        width:wp('80'),
        alignSelf:'center',
        alignItems:'flex-end',
        marginBottom:hp('4')
    },
    cardSubRow:{
        backgroundColor:'#F4F4F4',
        height:hp('25'),
        width:wp('80'),
        justifyContent:'center',
        shadowColor: "rgba(138,138,138,0.3)",
        elevation: 10,
        shadowOffset: { width: 5, hesight: 5 },
        shadowOpacity: 4,
        shadowRadius: 10,
        flexWrap:'wrap',
    },
    profileIcon:{
        borderRadius:hp('100'),
        position:'absolute',
        top:-hp('5'),
        height:hp('10'),
        width:hp('10'),
    },
    cardDetailsRow:{
        flexWrap:'wrap',
        justifyContent:'center',
        marginTop: Platform.select({ ios:hp('6'), android:hp('6') }),
        ...Platform.select({
            ios:{ height:hp('12') },
            android:{
                height:hp('13'),
                paddingLeft:hp('1'),
                paddingRight:hp('1'),
            }
        }),
    },
    jobTitle:{
        fontSize:20,
        fontWeight:'500'
    },
    jobDes:{
        marginTop:hp('0.8'),
        fontSize:14,
        fontWeight:'300',
        textAlign:'center'
    },
    applyBtn:{
        width:wp('25'),
        height:hp('4'),
        backgroundColor:'#19b24b',
        alignItems:'center',
        justifyContent:'center'
    },
    applyBtnText:{
        fontSize:16,
        fontWeight:'bold',
        color:'#FFFFFF'
    }

});

export default connect(mapStateToProps, mapDispatchToProps)(Jobs);

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
import { SearchList } from '../Component/searchBox';
const JobImage = './../../Assets/privacy_policy_bg.png';
const bannerImg = './../../Assets/privacy_policy.png';

class PrivacyPolicy extends React.Component {
    Loader = true;
    _isMounted = false;
    constructor(props){
        super(props);
        this.state = {
            loader:false,
            isShowMidModal:false,
            isShowBottomModal: false,
            selectedJob:{},
            isShowApplyModal:false,
            isDropDown:false,
            isShowMidModal:false,
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
            loader,
            selectedJob,
            isShowMidModal,
            isShowBottomModal,
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
                    tempArray={[]}
                    filterFun={(data)=>{ }}
                    isApiSearch={true}
                    apiLoader={(is)=>{ this.setState((state)=>{ return{ ...state, searchLoader:is } }) }}
                    onTypeResult={(data)=>{ this.setState((state)=>{ return{ ...state, searchData:data } }) }}
                    renderPlayer={()=>{
                        return(<>
                            <Row style={{ height:hp('25') }}>
                                <Row style={styles.bannerImg}>
                                    <Image source={require(bannerImg)} style={{ width:wp('50'), height:null }} />
                                </Row>
                                <Row style={[styles.bannerImg,{top:'65%',left:'3%'}]}>
                                    <Text style={[styles.letsWork, { color:'#FFFFFF' }]}>For Discover Pakistan HDTV</Text>
                                </Row>
                                <Image source={require(JobImage)} style={{ width:wp('100'), height:'100%' }} />
                            </Row>
                        </>)
                    }}/>

                <Row style={styles.contents}>
                    <ScrollView>
                        <Row style={styles.screenTitleRow}>
                            <Row style={styles.screenTitleDon} />
                            <Text style={styles.screenTitle}>PRIVACY POLICY</Text>
                        </Row>

                        <Row style={styles.mainRow}>
                            <Text style={styles.headText}>
                            Privacy Policy for Discover Pakistan HDTV
                            </Text>
                            <Text style={styles.simpleText}>
                            At Discover Pakistan, accessible from https://discoverpakistan.tv , one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Discover Pakistan and how we use it.
                            </Text>
                            <Text style={styles.simpleText}>
                            If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
                            </Text>
                            <Text style={styles.simpleText}>
                            This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in Discover Pakistan. This policy is not applicable to any information collected offline or via channels other than this website.
                            </Text>
                            
                            <Text style={styles.headText}>
                            Consent
                            </Text>
                            <Text style={styles.simpleText}>
                            By using our website, you hereby consent to our Privacy Policy and agree to its terms.
                            </Text>

                            <Text style={styles.headText}>
                            Information we collect
                            </Text>
                            <Text style={styles.simpleText}>
                                The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
                            </Text>
                            <Text style={styles.simpleText}>
                            If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
                            </Text>
                            <Text style={styles.simpleText}>
                            When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.
                            </Text>

                            <Text style={styles.headText}>
                            How we use your information
                            </Text>
                            <Text style={styles.simpleText}>
                            We use the information we collect in various ways, including to:
                            </Text>
                            <Text style={styles.simpleText}>
                            Provide, operate, and maintain our webste.
                            </Text>
                            <Text style={styles.simpleText}>
                            Improve, personalize, and expand our webste.
                            </Text>
                            <Text style={styles.simpleText}>
                            Understand and analyze how you use our webste.
                            </Text>
                            <Text style={styles.simpleText}>
                            Develop new products, services, features, and functionality.
                            </Text>
                            <Text style={styles.simpleText}>
                            Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the webste, and for marketing and promotional purposes.
                            </Text>
                            <Text style={styles.simpleText}>
                            Send you emails.
                            </Text>
                            <Text style={styles.simpleText}>
                            Find and prevent fraud.
                            </Text>

                            <Text style={styles.headText}>
                            Log Files
                            </Text>
                            <Text style={styles.simpleText}>
                            Discover Pakistan follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information. Our Privacy Policy was created with the help of the Privacy Policy Generator and the Online Privacy Policy Generator.
                            </Text>

                            <Text style={styles.headText}>
                            Google DoubleClick DART Cookie
                            </Text>
                            <Text style={styles.simpleText}>
                            Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – https://policies.google.com/technologies/ads
                            </Text>
                            <Text style={styles.headText}>
                            Our Advertising Partners
                            </Text>
                            <Text style={styles.simpleText}>
                            You may consult this list to find the Privacy Policy for each of the advertising partners of Discover Pakistan.
                            </Text>
                            <Text style={styles.simpleText}>
                            Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on Discover Pakistan, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
                            </Text>
                            <Text style={styles.simpleText}>
                            Note that Discover Pakistan has no access to or control over these cookies that are used by third-party advertisers.
                            </Text>

                            <Text style={styles.headText}>
                            Third Party Privacy Policies
                            </Text>
                            <Text style={styles.simpleText}>
                            Discover Pakistan's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
                            </Text>
                            <Text style={styles.simpleText}>
                            You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.
                            </Text>

                            <Text style={styles.headText}>
                            CCPA Privacy Rights (Do Not Sell My Personal Information)
                            </Text>
                            <Text style={styles.simpleText}>
                            Under the CCPA, among other rights, California consumers have the right to:
                            </Text>
                            <Text style={styles.simpleText}>
                            Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.
                            </Text>
                            <Text style={styles.simpleText}>
                            Request that a business delete any personal data about the consumer that a business has collected.
                            </Text>
                            <Text style={styles.simpleText}>
                            Request that a business that sells a consumer's personal data, not sell the consumer's personal data.
                            </Text>
                            <Text style={styles.simpleText}>
                            If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.
                            </Text>
                            
                            <Text style={styles.headText}>
                            GDPR Data Protection Rights
                            </Text>
                            <Text style={styles.simpleText}>
                            We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
                            </Text>
                            <Text style={styles.simpleText}>
                            The right to access – You have the right to request copies of your personal data. We may charge you a small fee for this service.
                            </Text>
                            <Text style={styles.simpleText}>
                            The right to rectification – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.
                            </Text>
                            <Text style={styles.simpleText}>
                            The right to erasure – You have the right to request that we erase your personal data, under certain conditions.
                            </Text>
                            <Text style={styles.simpleText}>
                            The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.
                            </Text>
                            <Text style={styles.simpleText}>
                            The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.
                            </Text>
                            <Text style={styles.simpleText}>
                            The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.
                            </Text>
                            <Text style={styles.simpleText}>
                            If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.
                            </Text>

                            <Text style={styles.headText}>
                            Children's Information
                            </Text>
                            <Text style={styles.simpleText}>
                            Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
                            </Text>
                            <Text style={styles.simpleText}>
                            Discover Pakistan does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
                            </Text>
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

                { !isObjEmpty(selectedJob) &&
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
    bannerImg:{
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
        fontSize:22,
        fontWeight:'600'
    },
    mainRow:{
        flexDirection:'column',
        alignSelf:'center',
        width:wp('92'),
        marginBottom:hp('4')
    },
    simpleText:{
        marginBottom:hp('1')
    },
    headText:{
        marginTop:hp('1'),
        marginBottom:hp('1'),
        fontSize:18,
        fontWeight:'500'
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivacyPolicy);
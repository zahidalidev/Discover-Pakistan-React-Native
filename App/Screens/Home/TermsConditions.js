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
const JobImage = './../../Assets/job_bg.jpg';
const TermsConditionsImg = './../../Assets/terms_conditions.png';

class TermsConditions extends React.Component {
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
                                    <Image source={require(TermsConditionsImg)} style={{ width:wp('50'), height:null }} />
                                </Row>
                                <Row style={[styles.bannerImg,{top:'65%',left:'3%'}]}>
                                    <Text style={[styles.letsWork, { color:'#FFFFFF' }]}>Please go through this documents carefully</Text>
                                </Row>
                                <Image source={require(JobImage)} style={{ width:wp('100'), height:'100%' }} />
                            </Row>
                        </>)
                    }}/>

                <Row style={styles.contents}>
                    <ScrollView>
                        <Row style={styles.screenTitleRow}>
                            <Row style={styles.screenTitleDon} />
                            <Text style={styles.screenTitle}>TERMS & CONDITION</Text>
                        </Row>

                        <Row style={styles.mainRow}>
                            <Text style={styles.simpleText}>
                                Please go through this document carefully.
                            </Text>
                            <Text style={styles.simpleText}>
                                This website ensures use of your data in accordance with our privacy policy and your use of this site is subject to the below mentioned terms and conditions. These Terms constitute a legally binding agreement between you and Discover Pakistan for your usage of the Site and the services that allows for the distribution and reception of video, audio, and other content.
                            </Text>
                            <Text style={styles.simpleText}>
                                Do not use the site if you do not agree with any of the terms contained herein:
                            </Text>
                            <Text style={styles.simpleText}>
                                These Terms of use apply to the Discover Pakistan websites along with the organization's web pages, mobile applications, blogs, social networks, and/or other features the company provides that is accessed via Personal Computer, mobile phone or any other device(s).
                            </Text>
                            <Text style={styles.simpleText}>
                                The websites are offered by Discover Pakistan. Above mentioned Terms of Use govern your rights and responsibilities in link with the websites that you are accessing. By "access" means that you are using the website by a computer or any other device(s).
                            </Text>
                            <Text style={styles.simpleText}>
                                You guarantee that you agree to the following terms and conditions set by the organization.
                            </Text>
                            <Text style={styles.simpleText}>
                                The website is targeted towards the Pakistani ("Pakistan") citizens but it can be accessed in other parts of the world. If you are not a Pakistani resident and yet access the website, you shall agree that all the terms of use are equally applicable to you and it is your responsibility to ensure that your usage of the site is according to the laws from where the website is being accessed
                            </Text>
                            <Text style={styles.simpleText}>
                                Discover Pakistan reserves the right to change, modify, and/or make additions to the terms of use or the privacy policy at any time or date. If you object to any such changes, your sole option will be to stop using the Site
                            </Text>
                            <Text style={styles.simpleText}>
                                Your use of certain features, functionality, programs or Services (including contests, promotions, photo or video or other User kinds of submission to the website (uploading/posting opportunities, RSS feeds, etc.) is subjected to additional or special terms and conditions . You may be required to indicate your acceptance of such additional Special Rules before submitting any material to the organization. Different terms of use will be incorporated into these Terms.
                            </Text>
                            
                            <Text style={styles.headText}>
                                OWNERSHIP
                            </Text>
                            <Text style={styles.simpleText}>
                                The content of the Discover Pakistan site is owned by Discover Pakistan and/or its licensors and are protected by applicable Pakistani and international copyright and other intellectual property laws.
                            </Text>
                            <Text style={styles.simpleText}>
                                This text includes all copyrights, patents, trademarks, service marks, trade names and all other intellectual property rights.
                            </Text>
                            <Text style={styles.headText}>
                                USAGE LIMITS:
                            </Text>
                            <Text style={styles.simpleText}>
                                The user acknowledges and agrees that except for certain personal (non-commercial) purposes; he/she neither has nor in any way entitled to claim any rights in and about the content or part of content this site has to offer. The limits of such non-commercial usage are set forth below in the section titled LICENSES GRANTED TO YOU subject to the conditions in the USER’S RESPONSIBILITIES Section below.
                            </Text>
                            <Text style={styles.simpleText}>
                            The user agrees not to copy, reproduce, duplicate, stream, capture, access through technology or means other than those provided on the site, perform, transfer, sell, resell, download, upload, archive, license to others, edit, modify, manipulate, create derivative works from or based upon site content, publish, republish, post, transmit, publicly display, frame, link from or to, distribute, share, embed, translate, decompile, reverse engineer, translate, incorporate into any hardware or software application use for commercial purposes, or otherwise use or exploit the site or any portion/ part of the site content thereof.
                            </Text>
                            <Text style={styles.simpleText}>
                            Any breach of the above mentioned terms or any unauthorized uses referred to above would constitute an infringement of the copyrights and other proprietary rights of Discover Pakistan and/or its licensors. Discover Pakistan reserves the right to initiate legal proceedings against the offender under applicable laws.
                            </Text>
                            <Text style={styles.headText}>
                                LICENSES GRANTED TO YOU
                            </Text>
                            <Text style={styles.simpleText}>
                                Subject to these terms (including, without limitation, the YOUR RESPONSIBILITIES section set forth below), we hereby grant you up to the necessary extent functionality through this website and the following limited, revocable, non- exclusive, non-transferable, non-assignable, worldwide, royalty-free rights and licenses (each a "License").
                            </Text>
                            <Text style={styles.simpleText}>
                                You can access, view and otherwise use the website (including, without limitation any of the site services provided on or through the website) for your personal, non-commercial and legal use only.
                            </Text>
                            <Text style={styles.simpleText}>
                                You can stream content using any of the widgets and/or other digital streaming video players, if any, provided on the website (any such widget or other digital streaming internet video player referred to as a "site widget") for your personal, non-commercial and legitimate use only.
                            </Text>
                            <Text style={styles.simpleText}>
                            We hereby grant you permission to cut and paste certain code explicitly made available to you through this website (whether such functionality is designated as "sharing" or not) in order to embed, re-publish, maintain, and/or display the specific site content to which such code relates on your own personal, customized social media pages, web blogs, or microblogs (on the whole, your "personal social media").
                            </Text>
                            <Text style={styles.simpleText}>
                            You can also cut and paste certain code distinctly made available to you through the website, forward it to your friends, so that they can view our content contained therein, and/or if, they so desire, enables them to embed the forwarded piece of code on their own personal social media or re-forward it to their own friends.
                            </Text>
                            <Text style={styles.simpleText}>
                            If the website contains a "download" link next to a piece of the web-content (an image, an icon, a wallpaper, a music track, a video, a trailer, an RSS feed), you are also permitted to download a single copy of such content to a single computer, mobile or other permitted device for your personal, non-commercial and legal use only.
                            </Text>
                            <Text style={styles.simpleText}>
                            If the website enables you to download a software, the license to install and use one copy of it on your personal computer system, mobile or other permitted device in machine-executable object code form only and make an Additional copy for back- up purposes; provided, however, that you understand and agree to the following conditions.
                            </Text>
                            <Text style={styles.simpleText}>
                            By allowing you to download the Software, Discover Pakistan does not transfer title of that software to you (i.e., you own the medium on which the software is recorded, but the software's owner will retain its full and complete title.
                            </Text>
                            <Text style={styles.simpleText}>
                            You shall not copy, modify, adapt, translate into any language, distribute, or create derivative works based on that software without the prior written consent of Discover Pakistan.
                            </Text>
                            <Text style={styles.simpleText}>
                            You shall not assign, rent, lease, or lend the software to any person or entity and any attempt by you to sublicense, transfer, or assign the software will be void and of no effect.
                            </Text>
                            <Text style={styles.simpleText}>
                            You shall not decompile, disassemble, reverse engineer, or attempt to reconstruct, identify, or discover any source code, underlying ideas, underlying user interface techniques, or algorithms of the software by any means, whatsoever, except to the extent the foregoing restriction is prohibited by applicable law.
                            </Text>
                            <Text style={styles.simpleText}>
                            Because the laws and regulations of Pakistan restrict the export and re-export of commodities and technical data of Pakistani origin, including the software(s), you will not export or re-export the software in any form in violation of the laws of Pakistan or any foreign jurisdiction.
                            </Text>
                            <Text style={styles.simpleText}>
                            You have also been provided limited access to interact with other site users via comment boards and our social media pages and/or similar services available on the website.
                            </Text>
                            <Text style={styles.headText}>
                            USER’S RESPONSIBILTY
                            </Text>
                            <Text style={styles.simpleText}>
                            Please go through the following conditions to get conversant with policy guidelines for users.
                            </Text>
                            <Text style={styles.simpleText}>
                            A user/visitor/reader shall not post or submit any comment/content deemed unlawful, pornographic, obscene, defamatory, libelous, threatening, discriminatory, harassing, bullying, vulgar, indecent, profane, hateful, racially, culturally or ethnically offensive, or that encourages criminal conduct.
                            </Text>
                            <Text style={styles.simpleText}>
                            A user/visitor/reader is not entitled to embed, re-publish, maintain and/or display any Site content on any Personal Social Media or other web site or other Internet location that ordinarily contains or hosts content that is unlawful, pornographic, obscene, defamatory or ethnically offensive, or that encourages.
                            </Text>
                            <Text style={styles.simpleText}>
                            A user/visitor/reader shall abide by all copyright notices, information, and restrictions contained in or associated with any of the site content.
                            </Text>
                            <Text style={styles.simpleText}>
                            A user/visitor/reader shall not remove, alter, interfere with or circumvent any copyright, trademark or other proprietary notices marked/displayed on site content, software or site services.
                            </Text>
                            <Text style={styles.simpleText}>
                            A user/visitor/reader shall not use any of the rights granted to him/her or any of the Site content or site services in a manner that breaches its privacy.
                            </Text>
                            <Text style={styles.simpleText}>
                            A user/visitor/reader is advised not to use bots, spiders, offline readers or other automated systems to access or use the Site in a manner that sends more request messages to the site's servers in a given period of time than a human can reasonably produce in the same period by using a conventional Web browser, unless you are a lawfully operating a public search engine.
                            </Text>
                            <Text style={styles.simpleText}>
                            A user/visitor/reader shall avoid doing anything that is likely to adversely affect or reflect negatively upon or harm the goodwill or reputation of our website or any of its affiliates or any of the content running or being promoted on the site.
                            </Text>
                            <Text style={styles.simpleText}>
                            A user/visitor/reader shall not do anything on the Site that would prevent other users' access to or use of the Site or any part thereof.
                            </Text>
                            <Text style={styles.simpleText}>
                            A user/visitor/reader will be responsible for maintaining the confidentially of any username or password associated with access to the Site and you are solely responsible for all activities that occur under your username and/or password.
                            </Text>
                            <Text style={styles.simpleText}>
                            A user/visitor/reader will use the site and the licenses at all times in compliance with the aforementioned terms.
                            </Text>
                            <Text style={styles.headText}>
                            MISCELLANEOUS
                            </Text>
                            <Text style={styles.simpleText}>
                            Discover Pakistan reserves the right to modify these terms and Conditions at any time. The conditions become effective as published on this site. Should you have any query you can contact us at the below mention address.
                            </Text>
                            <Text style={{ fontSize:16, fontWeight:'500' }}>
                            Email:
                            </Text>
                            <Text style={styles.simpleText}>
                            Info@DiscoverPakistan.tv
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

export default connect(mapStateToProps, mapDispatchToProps)(TermsConditions);
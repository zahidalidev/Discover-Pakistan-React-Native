import React from "react";
import {
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform, Linking
} from "react-native";
import { Row } from "react-native-easy-grid";
import Expo from 'expo-constants';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

import DiscoverPakLogo from './../../Assets/svg/Discover_Pakistan_Bar_Icon.svg';
import LiveStreamIcon from './../../Assets/svg/Live_Streaming-24px.svg';
import PopularShowsIcon from './../../Assets/svg/Popular_Shows-24px.svg';
import PopularDocumentriesIcon from './../../Assets/svg/Popular_Documentaries-24px.svg';
import MostViewedIcon from './../../Assets/svg/Most_Viewed-24px.svg';
import MusicIcon from './../../Assets/svg/Music-24px.svg';
import TouristCommunityIcon from './../../Assets/svg/Tourist_Community-24px.svg';
import LikedIcon from './../../Assets/svg/liked_icon.svg';
import WatchLaterIcon from './../../Assets/svg/watch_later.svg';
import ContactUsIcon from './../../Assets/svg/Contact_Us-24px.svg';
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "./../../Redux/Actions/userActions";
import Api from "../../Constants/Api";
import { URI } from "../../Constants";

let routeName = 'Home';

class SidebarMenu extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    getCategoryDetails(slug="popular-documentaries", category="POPULAR DOCUMENTARIES"){
        this.props.setLoader(true);
        let payload = {
            uri:`${URI.VIDEO_BY_SLUG}?slug=${slug}`,
            method:'get',
            data:{
              user_id:''
            }
        }
        Api(payload)
        .then((res)=>{
            this.props.setLoader(false);
            if(res.data.message === 'success'){
                if(res.data.data.length > 0){
                    this.props.setCatDetails(res.data.data)
                    this.props.Props.navigation.navigate("RedirectTo", { path:"ShowDetails", obj:{ category:category, screen:'PopularDocumentaries' }})
                }else{
                    alert("No data found!")
                }
            }
        })
        .catch((err)=>{
            this.props.setLoader(false);
            alert("Unkown Error \n"+ err)
        })
    }

    render(){
        const { Props } = this.props;
        return(
          <SafeAreaView style={styles.mainContainer}>
            <Row style={styles.headLogoRow}>
              <DiscoverPakLogo width={wp('40')} />
            </Row>
            <Row style={styles.srcollRow}>
              <ScrollView style={{ flex:1 }}>
                <Row style={styles.btnRow}>
                  <TouchableOpacity
                      style={styles.btn}
                      onPress={()=>{
                        routeName="Home"
                        Props.navigation.toggleDrawer();
                        setTimeout(()=>{ Props.navigation.navigate("Home") })
                      }}>
                      <LiveStreamIcon width={wp('7')} />
                      <Text ellipsizeMode="tail" numberOfLines={1} style={[styles.btnText, routeName === "Home" ? { color:'#19b24b' } : {}]}>Live Streaming</Text>
                  </TouchableOpacity>
                </Row>
                { <Row style={styles.btnRow}>
                  <TouchableOpacity
                      style={styles.btn}
                      onPress={()=>{
                      Props.navigation.toggleDrawer();
                      routeName = 'Shows';
                      setTimeout(()=>{ Props.navigation.navigate("Shows") })
                      }}>
                      <PopularShowsIcon width={wp('7')} />
                      <Text ellipsizeMode="tail" numberOfLines={1} style={[styles.btnText, routeName === "Shows" ? { color:'#19b24b' } : {}]}>Popular Shows</Text>
                  </TouchableOpacity>
                </Row> }

                <Row style={styles.btnRow}>
                  <TouchableOpacity
                      style={styles.btn}
                      onPress={()=>{
                          routeName = 'Popular Documentaries';
                          Props.navigation.toggleDrawer();
                          this.getCategoryDetails();
                      }}>
                      <PopularDocumentriesIcon width={wp('7')} />
                      <Text ellipsizeMode="tail" numberOfLines={1} style={[styles.btnText, routeName === "Popular Documentaries" ? { color:'#19b24b' } : {}]}>Popular Documentaries</Text>
                  </TouchableOpacity>
                </Row>

                <Row style={styles.btnRow}>
                  <TouchableOpacity
                      style={styles.btn}
                      onPress={()=>{
                        Props.navigation.toggleDrawer();
                        routeName = "Most Viewed"
                        setTimeout(()=>{
                          this.getCategoryDetails('most-viewed', 'MOST VIEWED');
                        })
                      }}>
                      <MostViewedIcon width={wp('7')} />
                      <Text ellipsizeMode="tail" numberOfLines={1} style={[styles.btnText, routeName === "Most Viewed" ? { color:'#19b24b' } : {}]}>Most Viewed</Text>
                  </TouchableOpacity>
                </Row>
                <Row style={styles.btnRow}>
                  <TouchableOpacity
                      style={styles.btn}
                      onPress={()=>{
                        Props.navigation.toggleDrawer();
                        routeName = "Music"
                        setTimeout(()=>{
                          this.getCategoryDetails('music', 'MUSIC');
                        })
                      }}>
                      <MusicIcon width={wp('7')} />
                      <Text ellipsizeMode="tail" numberOfLines={1} style={[styles.btnText, routeName === "Music" ? { color:'#19b24b' } : {}]}>Music</Text>
                  </TouchableOpacity>
                </Row>
                <Row style={styles.btnRow}>
                  <TouchableOpacity
                      style={styles.btn}
                      onPress={()=>{
                      Props.navigation.toggleDrawer();
                      routeName = "TouristCommunity";
                      setTimeout(()=>{ Props.navigation.navigate("TouristCommunity") })
                      }}>
                      <TouristCommunityIcon width={wp('7')} />
                      <Text ellipsizeMode="tail" numberOfLines={1} style={[styles.btnText, routeName === "TouristCommunity" ? { color:'#19b24b' } : {}]}>Tourist Community</Text>
                  </TouchableOpacity>
                </Row>  

                {/* <Row style={styles.btnRow}>
                  <TouchableOpacity
                      style={styles.btn}
                      onPress={()=>{
                      Props.navigation.toggleDrawer();
                      routeName = "Favorite";
                      setTimeout(()=>{ Props.navigation.navigate("Favorite") })
                      }}>
                      <LikedIcon width={wp('7')} height={wp('7')}/>
                      <Text ellipsizeMode="tail" numberOfLines={1} style={[styles.btnText, routeName === "Favorite" ? { color:'#19b24b' } : {}]}>Favorite</Text>
                  </TouchableOpacity>
                </Row>

                <Row style={styles.btnRow}>
                  <TouchableOpacity
                      style={styles.btn}
                      onPress={()=>{
                      Props.navigation.toggleDrawer();
                      routeName = "Favorite";
                      setTimeout(()=>{ Props.navigation.navigate("Favorite") })
                      }}>
                      <WatchLaterIcon width={wp('7')} height={wp('7')}/>
                      <Text ellipsizeMode="tail" numberOfLines={1} style={[styles.btnText, routeName === "Favorite" ? { color:'#19b24b' } : {}]}>Watch Later</Text>
                  </TouchableOpacity>
                </Row> */}

                <Row style={styles.btnRow}>
                  <TouchableOpacity
                      style={styles.btn}
                      onPress={()=>{
                      Props.navigation.toggleDrawer();
                      setTimeout(()=>{ Props.navigation.navigate("ContactUs") })
                      }}>
                      <ContactUsIcon width={wp('7')} />
                      <Text ellipsizeMode="tail" numberOfLines={1} style={[styles.btnText, routeName === "ContactUs" ? { color:'#19b24b' } : {}]}>Contact Us</Text>
                  </TouchableOpacity>
                </Row>
              </ScrollView>

              <Row style={{ height:hp('4'), width:'100%', position:'absolute', bottom:hp('1'), zIndex:22, alignItems:'center', justifyContent:'center' }}>
                <Text style={{ fontSize:12, color:'gray' }}>Powered By </Text>
                <TouchableOpacity onPress={()=>{ Linking.openURL("https://smartmultimediahouse.com") }}>
                  <Text style={{ fontSize:12, color:'#19b24b' }}>Smart Multimedia House LTD.</Text>
                </TouchableOpacity>
              </Row>
              {/* <Row style={{ height:hp('4'), width:'100%', position:'absolute', bottom:0, alignItems:'center', justifyContent:'center' }}>
                <Text style={{ fontSize:12, color:'gray' }}>Release: 11:50 PM - Saturday, 3 October 2020</Text>
              </Row> */}
            </Row>
          </SafeAreaView>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarMenu);

const styles = StyleSheet.create({
    mainContainer:{
      flex: 1,
      backgroundColor: "#FFFFFF",
    },
    headLogoRow:{
      ...Platform.select({
        ios:{
          height:hp('10'),
        },
        android:{
          height:hp('10'),
          marginTop:Expo.statusBarHeight,
        }
      }),
      alignItems:'center',
      justifyContent:'center'
    },
    srcollRow:{
      ...Platform.select({
        ios:{
          height:hp('80'),
        },
        android:{
          height:hp('85'),
        }
      }),
    },
    btnRow:{
      ...Platform.select({
        ios:{
          height:hp('6'),
        },
        android:{
          height:hp('7'),
        }
      }),
      marginTop:hp('2')
    },
    btn:{
      height:'100%',
      width:'100%',
      paddingLeft:wp('5'),
      flexDirection:'row',
      alignItems:'center'
    },
    btnText:{
      fontSize:18,
      fontWeight:'600',
      paddingLeft:wp('3'),
      ...Platform.select({ios:{}, android:{  }}),
      color:"#333333",
      width:"85%"
    }
})
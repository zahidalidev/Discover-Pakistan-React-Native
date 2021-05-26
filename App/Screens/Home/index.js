import React from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  Platform,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  I18nManager,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import {
  mapStateToProps,
  mapDispatchToProps,
} from "../../Redux/Actions/userActions";
import { isNullRetNull } from "./../../Helpers/general";
import FooterDrawerModal from "../Component/FooterDrawerModal";
import { Grid, Row } from "react-native-easy-grid";
import DrawerModal from "../Component/DrawerModal";
import LivePlayer from "../Component/LivePlayer";
import { CONSTANTS, URI } from "../../Constants";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import { connect } from "react-redux";

import Api from "../../Constants/Api";
import { Loader, ProfileDropDown } from "../Component";
import { color } from "../../Constants/theme";
import { ScrollView } from "react-native";
import { SearchList } from "../Component/searchBox";

class Home extends React.Component {
  Loader = true;
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
      isLoader: false,
      isShowMidModal: false,
      isShowBottomModal: false,
      isDropDown: false,
      array: [],
      tempArray: [],
      isPlay: false,
      isMuted: false,
      liveUrl: CONSTANTS.LIVE_URL,
    };
  }

  async UNSAFE_componentWillMount() {
    this._isMounted = true;
    this.setStateObj({
      array: this.props.getCategory,
      tempArray: this.props.getCategory,
    });
    if (this._isMounted) {
      this.getData();
      // console.log(CONSTANTS.LIVE_URL)
      // console.log(this.props.userData)
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  setStateObj(obj) {
    if (this._isMounted) {
      this.setState({ ...this.state, ...obj });
    }
  }

  getData() {
    this.setStateObj({ loader: true });
    let payload = {
      uri: URI.CATEGORIES,
      method: "post",
      data: { id: isNullRetNull(this.props.userData.user_id, "") },
    };
    Api(payload)
      .then((res) => {
        if (res.data.message === "success") {
          this.setStateObj({
            loader: false,
            array: res.data.data,
            tempArray: res.data.data,
          });
          this.props.setCategory(res.data.data);
        } else {
          this.setStateObj({ loader: false });
        }
      })
      .catch((err) => {
        this.setStateObj({ loader: false });
        alert("Unkown Error \n" + err);
        console.log(err);
      });
  }

  getCategoryDetails(slug, category) {
    this.setStateObj({ isLoader: true, isPlay: false });
    let payload = {
      uri: `${URI.VIDEO_BY_SLUG}?slug=${slug}`,
      method: "get",
      data: {},
    };
    Api(payload)
      .then((res) => {
        this.setStateObj({ isLoader: false });
        if (res.data.message === "success") {
          if (res.data.data.length > 0) {
            this.props.setCatDetails(res.data.data);
            if(this.props.onNavigate) this.props.onNavigate()
            this.props.navigation.navigate("ShowDetails", {
              category: category,
            });
          } else {
            alert("No data found!");
          }
        }
      })
      .catch((err) => {
        this.setStateObj({ isLoader: false });
        alert("Unkown Error \n" + err);
      });
  }

  render() {
    const {
      loader,
      isShowMidModal,
      isShowBottomModal,
      array,
      tempArray,
      liveUrl,
      isPlay,
      isMuted,
      isLoader,
      isDropDown,
    } = this.state;

    return (
      <>
        <Loader isLoader={isLoader} />
        <Grid style={styles.grid}>
          {/* <Header
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
                            <LivePlayer
                                isPlay={isPlay}
                                isMuted={isMuted}
                                navigation={this.props.navigation}
                                playAsync={(isPlay)=>{ this.setStateObj({ isPlay:isPlay }) }}
                                setIsMutedAsync={(isMuted)=>{ this.setStateObj({ isMuted:isMuted }) }}
                                source={{ uri: liveUrl }}
                                />
                        </>)
                    }}/> */}

          {loader ? (
            <Row
              style={[
                styles.contents,
                { marginTop: 0, height: "50%", justifyContent: "center" },
              ]}
            >
              <ActivityIndicator size="large" color={color.design} />
            </Row>
          ) : (
            <Row style={styles.contents}>
              <FlatList
                data={tempArray}
                keyExtractor={(item, i) => JSON.stringify(item)}
                renderItem={(data) => {
                  return (
                    <>
                      <Row style={styles.card}>
                        <Row style={styles.cardTitleRow}>
                          <Row style={styles.cardTitleDot} />
                          <Text
                            ellipsizeMode="tail"
                            numberOfLines={1}
                            style={styles.cardTitle}
                          >
                            {isNullRetNull(data.item.video_type)}
                          </Text>
                        </Row>
                        <TouchableOpacity
                          style={styles.carouselCard}
                          onPress={() => {
                            this.getCategoryDetails(
                              data.item.slug,
                              data.item.video_type
                            );
                          }}
                        >
                          <View style={styles.carouselCardImgView}>
                            <Image
                              source={{
                                uri: isNullRetNull(data.item.img, "https://"),
                              }}
                              style={styles.carouselCardImg}
                            />
                          </View>
                          <Row style={styles.carouselCardDetail}>
                            <Text
                              ellipsizeMode="tail"
                              numberOfLines={1}
                              style={styles.carouselCardTitle}
                            >
                              {data.item.video_heading}
                            </Text>
                            <Text
                              ellipsizeMode="tail"
                              numberOfLines={5}
                              style={styles.carouselCardDis}
                            >
                              {data.item.video_type_desc}
                            </Text>
                            {/* <Text style={styles.carouselCardtime}>{isNullRetNull(data.item.total_view, 0)} views | {isNullRetNull(data.item.time,'ABC 00, 0000')}</Text> */}
                          </Row>
                        </TouchableOpacity>
                      </Row>
                    </>
                  );
                }}
              />
            </Row>
          )}

          <SearchList
            {...this.state}
            {...this.props}
            onClick={(video, list, category) => {
              this.props.setCatDetails(list);
              this.setStateObj({ searchData: undefined });
              if(this.props.onNavigate) this.props.onNavigate()
              this.props.navigation.navigate("RedirectTo", {
                path: "ShowDetails",
                obj: { category: category, video: video, screen: "Search" },
              });
            }}
          />

          {/* <ProfileDropDown
            isDropDown={isDropDown}
            props={this.props}
            setDropDown={(isActive) => {
              this.setStateObj({ isDropDown: isActive });
            }}
          />
          <DrawerModal
            navigation={this.props.navigation}
            toggleDrawer={() => {
              this.setStateObj({ isShowMidModal: !isShowMidModal });
            }}
            isShowModal={isShowMidModal}
          />
          <FooterDrawerModal
            navigation={this.props.navigation}
            toggleDrawer={() => {
              this.setStateObj({ isShowBottomModal: !isShowBottomModal });
            }}
            isShowModal={isShowBottomModal}
          />

          <Footer
            navigation={this.props.navigation}
            toggleDrawer={() => {
              this.setStateObj({ isShowBottomModal: !isShowBottomModal });
            }}
          /> */}
        </Grid>
      </>
    );
  }
}

const styles = StyleSheet.create({
  grid: {
    height: hp("100"),
    width: wp("100"),
  },
  contents: {
    ...Platform.select({
      ios: { height: hp("46") },
      android: { height: hp("51") },
    }),
    width: wp("100"),
    alignSelf: "center",
    marginTop: hp("0.6"),
  },
  card: {
    flexDirection: "column",
    backgroundColor: color.tertiary,
    ...Platform.select({
      ios: {
        height: hp("20"),
      },
      android: {
        height: hp("23"),
      },
    }),
    width: wp("96"),
    paddingTop: hp("1"),
    alignSelf: "center",
    marginTop: hp("0.6"),
    alignItems: "center",
  },
  cardTitleRow: {
    height: hp("4"),
    width: wp("92"),
    alignItems: "center",
  },
  cardTitleDot: {
    backgroundColor: color.design,
    height: hp("3"),
    width: wp("3"),
    marginRight: hp("1"),
  },
  cardTitle: {
    color: color.design,
    fontSize: 22,
    fontWeight: "600",
    width: "94%",
  },
  carouselCard: {
    padding: hp("1"),
    flexDirection: "row",
  },
  carouselCardImgView: {
    backgroundColor: color.tertiary,
    overflow: "hidden",
    borderColor: "gray",
    borderWidth: 1,
    width: wp("38"),
    ...Platform.select({
      ios: {
        height: hp("11"),
      },
      android: {
        height: hp("12"),
      },
    }),
    justifyContent: "center",
  },
  carouselCardImg: {
    width: "100%",
    height: "100%",
    resizeMode: "stretch",
  },
  carouselCardDetail: {
    flexDirection: "column",
    paddingLeft: hp("1"),
    overflow: "scroll",
  },
  carouselCardTitle: {
    fontSize: 14,
    fontWeight: "500",
    width: "96%",
  },
  carouselCardDis: {
    fontSize: 12,
    paddingTop: 5,
    width: "94%",
    opacity: 0.8,
  },
  carouselCardtime: {
    fontSize: 10,
    color: color.secondary,
    paddingTop: 5,
    opacity: 0.8,
  },

  // v03:{
  //     position:'absolute',
  //     top:hp('16'),
  //     height:hp('74'),
  //     width:wp('96'),
  //     alignSelf:'center',
  //     // borderWidth:1,
  //     // borderColor:'#d3d3d3',
  //     // backgroundColor:'#fff'
  // },
  // v01:{
  //     width:'100%',
  //     height:hp('7'),
  //     alignItems:'center',
  //     justifyContent:'center',
  //     borderBottomColor:color.quaternary,
  //     borderBottomWidth:1
  // },
  // v02:{
  //     width:'100%',
  //     height:hp('7'),
  //     flexDirection:'row',
  //     alignItems:'center',
  //     // justifyContent:'center',
  //     borderBottomColor:color.quaternary,
  //     borderBottomWidth:1,
  //     paddingLeft:hp('1'),
  //     paddingRight:hp('1'),
  // },
  // img01:{
  //     height:hp('6'),
  //     width:hp('6'),
  //     borderWidth:1,
  //     borderColor:color.quaternary
  // },
  // txt01:{
  //     fontSize:16,
  //     color:color.primery
  // },
  // txt02:{
  //     fontSize:14,
  //     color:'#333'
  // },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

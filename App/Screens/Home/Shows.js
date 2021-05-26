import React from "react";
import {
  StyleSheet,
  Text,
  Image,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Grid, Row } from "react-native-easy-grid";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { connect } from "react-redux";
import {
  mapStateToProps,
  mapDispatchToProps,
} from "../../Redux/Actions/userActions";
import { Loader, ProfileDropDown } from "../Component";
import Header from "../Component/Header";
import DrawerModal from "../Component/DrawerModal";
import Footer from "../Component/Footer";
import { isNullRetNull } from "../../Helpers/general";
import FooterDrawerModal from "../Component/FooterDrawerModal";

import LivePlayer from "../Component/LivePlayer";
import { CONSTANTS, URI } from "../../Constants";
import { ScrollView } from "react-native-gesture-handler";
import Api from "../../Constants/Api";
import { SearchList } from "../Component/searchBox";

class Shows extends React.Component {
  Loader = true;
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      isShowMidModal: false,
      isShowBottomModal: false,
      array: [],
      tempArray: [],
      categoryName: "SHOWS",
      isDropDown: false,
      isPlay: false,
      isMuted: false,
      liveUrl: CONSTANTS.LIVE_URL,
    };
  }

  async UNSAFE_componentWillMount() {
    this._isMounted = true;
    if (this._isMounted) {
      this.getShows();
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

  getVideoBySlug(detail) {
    this.Loader = true;
    this.setStateObj({ loader: true });
    setTimeout(() => {
      this.setStateObj({ loader: false, isWebView: true });
    }, 1000);
  }

  getShows() {
    this.setStateObj({ loader: true });
    let payload = {
      uri: URI.GET_SHOWS_DETAIL,
      method: "post",
      data: { user_id: Number(this.props.userData.user_id) },
    };
    Api(payload)
      .then((res) => {
        if (res.data.message === "success") {
          this.setStateObj({
            loader: false,
            array: res.data.data,
            data: res.data.data,
            tempArray: res.data.data,
          });
        } else {
          this.setStateObj({ loader: false });
        }
      })
      .catch((err) => {
        this.setStateObj({ loader: false });
        alert("Unkown Error ", err);
      });
  }

  getShowVideos(show_id, category) {
    this.setStateObj({ loader: true });
    let payload = {
      uri: `${URI.GET_VIDEOS_BY_SHOW_ID}`,
      method: "post",
      data: {
        show_id: show_id,
      },
    };
    Api(payload)
      .then((res) => {
        this.setStateObj({ loader: false });
        if (res.data.message === "success") {
          if (res.data.data.length > 0) {
            this.props.setCatDetails(res.data.data);
            if(this.props.onNavigate) this.props.onNavigate()
            this.props.navigation.navigate("ShowDetails", {
              category: category,
            });
          } else {
            alert("No videos found!");
          }
        }
      })
      .catch((err) => {
        this.setStateObj({ loader: false });
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
      categoryName,
      isDropDown,
    } = this.state;

    return (
      <>
        <Loader isLoader={loader} />
        <Grid style={(styles.grid, { paddingBottom: 10 })}>
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
                                navigation={this.props.navigation}
                                isPlay={isPlay}
                                playAsync={(isPlay)=>{ this.setStateObj({ isPlay:isPlay }) }}
                                isMuted={isMuted}
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
              <ActivityIndicator size="large" color="#19b24b" />
            </Row>
          ) : (
            <Row>
              <ScrollView style={{ height: hp("50") }}>
                <Row style={styles.detailsContent01}>
                  <Row style={styles.detailsCard01}>
                    <Row style={styles.detailsCardTitleRow01}>
                      <Row style={styles.detailsCardTitleDot01} />
                      <Text
                        ellipsizeMode="tail"
                        numberOfLines={1}
                        style={styles.detailsCardTitle01}
                      >
                        {isNullRetNull(categoryName, "")}
                      </Text>
                    </Row>

                    {tempArray.map((item, i) => {
                      return (
                        <TouchableOpacity
                          style={styles.detailsCarouselCard01}
                          key={i}
                          onPress={() => {
                            this.getShowVideos(item.show_id, item.name);
                          }}
                        >
                          <Row style={styles.detailsCarouselCardImgView01}>
                            <Image
                              source={{ uri: item.img }}
                              style={styles.detailsCarouselCardImg01}
                            />
                          </Row>
                          <Row style={styles.detailsCarouselCardDetail01}>
                            <Text
                              ellipsizeMode="tail"
                              numberOfLines={2}
                              style={styles.detailsCarouselCardTitle01}
                            >
                              {isNullRetNull(item.name, "")}
                            </Text>
                            <Text
                              ellipsizeMode="tail"
                              numberOfLines={3}
                              style={styles.detailsCarouselCardDis01}
                            >
                              {isNullRetNull(item.description, "")}
                            </Text>
                            <Text style={styles.detailsCarouselCardtime01}>
                              Time {isNullRetNull(item.time, "00:00")}
                            </Text>
                            <Text style={styles.detailsCarouselCardtime01}>
                              Repeats: {isNullRetNull(item.repeat, "")}
                            </Text>
                          </Row>
                        </TouchableOpacity>
                      );
                    })}
                  </Row>
                </Row>
              </ScrollView>
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
                    setDropDown={(isActive)=>{ this.setStateObj({ isDropDown:isActive }) }}/>
                <DrawerModal
                    navigation={this.props.navigation}
                    toggleDrawer={()=>{ this.setStateObj({ isShowMidModal: !isShowMidModal }) }}
                    isShowModal={isShowMidModal}/>
                <FooterDrawerModal
                    navigation={this.props.navigation}
                    toggleDrawer={()=>{ this.setStateObj({ isShowBottomModal: !isShowBottomModal }) }}
                    isShowModal={isShowBottomModal}/>

                <Footer navigation={this.props.navigation} toggleDrawer={()=>{ this.setStateObj({ isShowBottomModal: !isShowBottomModal }) }} /> */}
        </Grid>
      </>
    );
  }
}

const styles = StyleSheet.create({
  grid: {
    paddingBottom: hp("6"),
    width: wp("100"),
  },

  videoDetails: {
    alignItems: "center",
    flexDirection: "column",
  },
  videoTitle: {
    marginTop: hp("0.6"),
    fontSize: 18,
    width: "96%",
  },
  viewsText: {
    fontSize: 10,
    color: "#333333",
    paddingTop: 5,
    width: "96%",
    paddingBottom: 5,
  },
  videoDetailBtnsView: {
    width: wp("96"),
    paddingLeft: hp("1"),
    paddingRight: hp("1"),
    height: hp("7"),
    alignItems: "center",
    justifyContent: "space-around",
    borderBottomColor: "#8B8B8B",
    borderBottomWidth: 1,
  },
  videoDetailBtns: {
    width: hp("7"),
    height: hp("5"),
    borderRadius: 100,
    opacity: 0.4,
    alignItems: "center",
    justifyContent: "space-between",
  },
  videoDetailBtnsText: {
    fontSize: 10,
    color: "black",
  },

  videoCommentsView: {
    width: wp("100"),
    alignItems: "center",
    marginBottom: hp("1"),
  },

  commentUserImg: {
    width: wp("9"),
    height: wp("9"),
    borderRadius: 100,
    borderColor: "#333",
    borderWidth: 0.5,
    marginLeft: hp("1"),
  },
  commentRow: {
    padding: hp("1"),
    backgroundColor: "#fff",
    marginLeft: hp("1"),
    marginRight: hp("1"),
    shadowOffset: { width: 1, height: 1 },
    elevation: 1,
    shadowColor: "gray",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    flexDirection: "column",
  },

  commentHeadRow: {
    width: wp("100"),
    height: hp("5"),
    paddingLeft: hp("1"),
    paddingRight: hp("1"),
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    shadowOffset: { width: 1, height: 1 },
    elevation: 1,
    shadowColor: "gray",
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },

  addCommentBox: {
    backgroundColor: "#FFF",
    color: "gray",
    height: hp("3.6"),
    paddingLeft: hp("1"),
    paddingRight: hp("1"),
    width: wp("84"),
    marginLeft: hp("1"),
    shadowColor: "gray",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  submitBtn: {
    backgroundColor: "gray",
    opacity: 0.5,
    alignSelf: "flex-end",
    height: hp("4"),
    paddingLeft: hp("1"),
    paddingRight: hp("1"),
    width: wp("84"),
    marginLeft: hp("1"),
    alignItems: "center",
    justifyContent: "center",
    marginRight: hp("1"),
    marginTop: hp("1"),
  },

  detailsContent01: {
    width: wp("100"),
    alignSelf: "center",
    marginTop: hp("0.6"),
    marginBottom: hp("1"),
    justifyContent: "center",
  },
  detailsCard01: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    ...Platform.select({
      ios: {
        height: "100%",
      },
      android: {
        height: "100%",
      },
    }),
    width: wp("96"),
    paddingTop: hp("1"),
    alignSelf: "center",
    alignItems: "center",
  },
  detailsCardTitleRow01: {
    height: hp("4"),
    width: wp("92"),
    alignItems: "center",
  },
  detailsCardTitleDot01: {
    backgroundColor: "#19b24b",
    height: hp("3"),
    width: wp("3"),
    marginRight: hp("1"),
  },
  detailsCardTitle01: {
    color: "#19b24b",
    fontSize: 22,
    fontWeight: "600",
    width: "96%",
  },
  detailsCarouselCard01: {
    padding: hp("1"),
    width: wp("96"),
    flexDirection: "row",
  },
  detailsPlayIcon01: {
    position: "absolute",
    zIndex: 1,
    alignSelf: "center",
    justifyContent: "center",
    height: hp("6"),
  },
  detailsCarouselCardImgView01: {
    backgroundColor: "#FFFFFF",
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
  detailsCarouselCardImg01: {
    width: "100%",
    height: "100%",
    resizeMode: "stretch",
  },
  detailsCarouselCardDetail01: {
    flexDirection: "column",
    paddingLeft: hp("1"),
    overflow: "scroll",
  },
  detailsCarouselCardTitle01: {
    fontSize: 14,
    fontWeight: "500",
    width: "96%",
  },
  detailsCarouselCardDis01: {
    fontSize: 12,
    paddingTop: 5,
    width: "94%",
  },
  detailsCarouselCardtime01: {
    fontSize: 10,
    color: "#333333",
    paddingTop: 5,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Shows);

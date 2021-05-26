import React from "react";
import {
  StyleSheet,
  Text,
  Image,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import BackIcon from "./../../Assets/svg/return.svg";
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
import { ProfileDropDown } from "../Component";
import Header from "../Component/Header";
import DrawerModal from "../Component/DrawerModal";
import Footer from "../Component/Footer";
import { isNullRetNull } from "../../Helpers/general";
import FooterDrawerModal from "../Component/FooterDrawerModal";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { URI } from "../../Constants";
import Api from "../../Constants/Api";
import Icon from "react-native-vector-icons/FontAwesome";
import { SearchList } from "../Component/searchBox";
import { View } from "react-native";
import TCComments from "./TCComments";

const BgImg = "./../../Assets/Sindh.jpg";

class TouristCommunity extends React.Component {
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
      categoryName: "MOST ACTIVE COMMUNITIES",
      isDropDown: false,
      community: "",
      suggestBy: "",
      community2: "",
      disForMain: "flex",
      disForCom: "none",
    };
  }

  async UNSAFE_componentWillMount() {
    this._isMounted = true;
    if (this._isMounted) {
      this.getCommunities();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getCommunities() {
    this.setStateObj({ loader: true });
    let payload = {
      uri: URI.COMMUNITIES,
      method: "post",
      data: { id: "" },
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
        alert("Unkown Error " + err);
      });
  }

  suggestCommunity() {
    this.setStateObj({ loader: true });
    let payload = {
      uri: URI.SUGGEST_COMMUNITY,
      method: "post",
      data: {
        name: this.state.suggestBy,
        community: this.state.community,
      },
    };
    Api(payload)
      .then((res) => {
        if (res.data.message === "success") {
          this.setStateObj({ loader: false, community: "", suggestBy: "" });
          alert(res.data.data);
        } else {
          this.setStateObj({ loader: false });
        }
      })
      .catch((err) => {
        this.setStateObj({ loader: false });
        alert("Unkown Error " + err);
      });
  }

  setStateObj(obj) {
    if (this._isMounted) {
      this.setState({ ...this.state, ...obj });
    }
  }

  render() {
    const {
      loader,
      isShowMidModal,
      isShowBottomModal,
      array,
      tempArray,
      categoryName,
      isDropDown,
      suggestBy,
      community,
    } = this.state;

    return (
      <>
        <Grid style={(styles.grid, { display: this.state.disForMain })}>
          {/* <Header
            navigation={this.props.navigation}
            isShowSearch={true}
            isDropDown={isDropDown}
            setDropDown={(isActive) => { this.setStateObj({ isDropDown: isActive }) }}
            toggleDrawer={() => { this.setStateObj({ isShowMidModal: !isShowMidModal }) }}
            isShowSubHeader
            tempArray={array}
            filterFun={(data) => { this.setStateObj({ tempArray: data }) }}
            isApiSearch={true}
            apiLoader={(is) => { this.setState((state) => { return { ...state, searchLoader: is } }) }}
            onTypeResult={(data) => { this.setState((state) => { return { ...state, searchData: data } }) }}
            renderPlayer={() => {
              return (<>
                <ImageBackground source={require(BgImg)} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ color: "#fff", fontSize: 30, fontWeight: '600' }}>
                    Tourist Community
                                </Text>
                </ImageBackground>
              </>)
            }} /> */}

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
              <ScrollView
                style={{ height: hp("50") }}
                showsVerticalScrollIndicator={false}
              >
                <Row style={styles.detailsContent01}>
                  <Row style={styles.detailsCard01}>
                    <Row style={styles.detailsCardTitleRow01}>
                      <Row style={styles.detailsCardTitleDot01} />
                      <Text
                        ellipsizeMode="tail"
                        numberOfLines={1}
                        style={styles.detailsCardTitle01}
                      >
                        {isNullRetNull(categoryName)}
                      </Text>
                    </Row>

                    {tempArray.map((item, i) => {
                      return (
                        <TouchableOpacity
                          style={styles.detailsCarouselCard01}
                          key={i}
                          onPress={() => {
                            this.setState({
                              community: item,
                              disForMain: "none",
                              disForCom: "flex",
                            });
                            // this.props.navigation.navigate("TCComments", {
                            //   community: item,
                            // });
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
                              {isNullRetNull(item.name)}
                            </Text>
                            <Text style={styles.detailsCarouselCardtime01}>
                              Become a part
                            </Text>
                          </Row>
                        </TouchableOpacity>
                      );
                    })}
                  </Row>
                </Row>

                <Row style={styles.suggestionMainRow}>
                  <Text style={styles.communityText}>Add New Community</Text>

                  <Row style={styles.suggestionSubRow}>
                    <Icon
                      name="user"
                      color="#a0a0a0"
                      size={18}
                      style={styles.iconStyle}
                    />
                    <TextInput
                      value={community}
                      style={styles.textInputBox}
                      placeholder={"Community Name"}
                      onChangeText={(char) => {
                        this.setStateObj({ community: char });
                      }}
                    />
                  </Row>
                  <Row style={styles.suggestionSubRow}>
                    <Icon
                      name="comments"
                      color="#a0a0a0"
                      size={18}
                      style={styles.iconStyle}
                    />
                    <TextInput
                      value={suggestBy}
                      style={styles.textInputBox}
                      placeholder={"Suggest By"}
                      onChangeText={(char) => {
                        this.setStateObj({ suggestBy: char });
                      }}
                    />
                  </Row>

                  <TouchableOpacity
                    style={[
                      styles.addBtn,
                      suggestBy === "" || community === ""
                        ? { opacity: 0.5 }
                        : {},
                    ]}
                    disabled={suggestBy === "" || community === ""}
                    onPress={() => {
                      this.suggestCommunity();
                    }}
                  >
                    <Text style={styles.addBtnText}>ADD</Text>
                  </TouchableOpacity>
                </Row>
                <View style={{ height: hp('5') }} />
              </ScrollView>
            </Row>
          )}

          {/* <SearchList
            {...this.state}
            {...this.props}
            onClick={(video, list, category) => {
              this.props.setCatDetails(list);
              this.setStateObj({ searchData: undefined });
              this.props.navigation.navigate("RedirectTo", {
                path: "ShowDetails",
                obj: { category: category, video: video, screen: "Search" },
              });
            }}
          /> */}
          {/* 
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

                <Footer navigation={this.props.navigation} toggleDrawer={()=>{ this.setStateObj({ isShowBottomModal: !isShowBottomModal }) }} /> */}
        </Grid>
        <View style={{ display: this.state.disForCom }}>
          <TouchableOpacity
            style={{
              left: hp("1.5"),
              width: hp("3"),
              top: hp("2"),
              zIndex: 2,
              position: "absolute",
            }}
            onPress={() => {
              this.setState({
                disForCom: "none",
                disForMain: "flex",
              });
            }}
          >
            <BackIcon fill="black" />
          </TouchableOpacity>
          {this.state.disForCom === "flex" && (
            <TCComments
              community={this.state.community}
              navigation={this.props.navigation}
            />
          )}
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  grid: {
    paddingBottom: hp("5"),
    width: wp("100"),
  },
  suggestionMainRow: { flexDirection: "column", alignItems: "center" },
  suggestionSubRow: {
    marginTop: hp("1"),
  },
  communityText: {
    fontSize: 22,
    fontWeight: "500",
    color: "#333333",
    alignSelf: "flex-start",
    marginTop: hp("2"),
    marginBottom: hp("1"),
    marginLeft: hp("1"),
  },
  textInputBox: {
    backgroundColor: "#FFF",
    color: "gray",
    height: hp("5"),
    paddingLeft: hp("4"),
    paddingRight: hp("1"),
    width: wp("96"),
    shadowColor: "#c3c3c3",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  iconStyle: {
    position: "absolute",
    alignSelf: "center",
    left: hp("1.5"),
    zIndex: 4,
  },
  addBtn: {
    backgroundColor: "#19b24b",
    height: hp("4"),
    width: wp("25"),
    alignSelf: "flex-start",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: hp("1"),
    marginTop: hp("2"),
  },
  addBtnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 18,
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
    fontSize: 24,
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
    width: wp("16"),
    height: wp("16"),
    justifyContent: "center",
    borderRadius: 50,
  },
  detailsCarouselCardImg01: {
    width: "100%",
    height: "100%",
    resizeMode: "stretch",
    borderRadius: 50,
  },
  detailsCarouselCardDetail01: {
    flexDirection: "column",
    paddingLeft: hp("1"),
    alignItems: "center",
    justifyContent: "center",
  },
  detailsCarouselCardTitle01: {
    fontSize: 18,
    fontWeight: "500",
    width: "96%",
  },
  detailsCarouselCardtime01: {
    fontSize: 14,
    color: "#333333",
    width: "94%",
    opacity: 0.7,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TouristCommunity);

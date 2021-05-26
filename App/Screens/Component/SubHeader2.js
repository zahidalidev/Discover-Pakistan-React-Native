import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  View,
} from "react-native";
import { Row } from "react-native-easy-grid";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { connect } from "react-redux";
import {
  mapStateToProps,
  mapDispatchToProps,
} from "../../Redux/Actions/userActions";

import DrawerIcon from "./../../Assets/svg/Menu_Bar_Icon-24px.svg";
import { simplify } from "../../Helpers/general";
import Home from "../../Screens/Home/index";
import Header2 from "../Component/Header";
import { CONSTANTS, URI } from "../../Constants";
import LivePlayer from "../Component/LivePlayer";
import Footer from "./Footer";
import FooterDrawerModal from "./FooterDrawerModal";
import { ProfileDropDown } from ".";
import DrawerModal from "./DrawerModal";
import Shows from "../Home/Shows";
import AboutDiscoverPakistan2 from "../Home/AboutDiscoverPakistan2";
import Partners from "../Home/Partners";
import AdvertiseWithUs from "../Home/AdvertiseWithUs";
import ECommerce from "../ECommerce";
import TouristCommunity from "../TouristCommunity/Index";

const subHeadCategoriesList = [
  { name: "Home" },
  { name: "Shows" },
  { name: "Discover Shop" },
  { name: "Partners" },
  { name: "Advertise" },
  { name: "Pakistan" },
  { name: "iTrip" },
  { name: "Become Contributor" },
  { name: "Tourist Community" },
];

class SubHeader2 extends React.Component {
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
      isPlay: true,
      isMuted: false,
      liveUrl: CONSTANTS.LIVE_URL,
      isShowBottomModal: false,
      selected: this.props.navigation.state.params
        ? this.props.navigation.state.params.pathName
        : "Home",
    };
  }

  UNSAFE_componentWillMount() {
    this._isMounted = true;
    if (this._isMounted) {
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
    console.log("check")
  }

  getRoute(name) {
    switch (simplify(name)) {
      case "home":
        return "Home";
        break;
      case "shows":
        return "Shows";
        break;
      case "discovershop":
        return "ECommerce";
        break;
      case "partners":
        return "Partners";
        break;
      case "advertise":
        return "AdvertiseWithUs";
        break;
      case "pakistan":
        return "AboutDiscoverPakistan";
        break;
      case "itrip":
        return "ITrip";
        break;
      case "becomecontributor":
        return "BecomeContributor";
        break;
      case "touristcommunity":
        return "TouristCommunity";
        break;
      default:
        break;
    }
  }

  render() {
    const { navigation, toggleDrawer } = this.props;
    // const { params } = this.props.navigation.state;
    // const itemId = params ? params.pathName : "Home";
    // console.log("CHECK ", this.props.navigation.state.params.pathName);
    // console.log(this.props.navigation.isFocused())
    return (
      <>
        <Header2
          navigation={this.props.navigation}
          onNavigate={()=>{ this.setState({ isPlay:false }) }}
          isShowSearch={true}
          isDropDown={this.state.isDropDown}
          setDropDown={(isActive) => {
            this.setState({ isDropDown: isActive });
          }}
          toggleDrawer={() => {
            this.setState({ isShowMidModal: !this.props.isShowMidModal });
          }}
          isShowSubHeader={false}
          tempArray={this.state.array}
          filterFun={(data) => {
            this.setState({ tempArray: data });
          }}
          isApiSearch={true}
          apiLoader={(is) => {
            this.setState((state) => {
              return { ...state, searchLoader: is };
            });
          }}
          onTypeResult={(data) => {
            this.setState((state) => {
              return { ...state, searchData: data };
            });
          }}
          renderPlayer={() => {
            return (
              <>
                <LivePlayer
                  isPlay={this.state.isPlay}
                  isMuted={this.state.isMuted}
                  navigation={this.props.navigation}
                  playAsync={(isPlay) => {
                    this.setState({ isPlay:isPlay });
                  }}
                  setIsMutedAsync={(isMuted) => {
                    this.setState({ isMuted: isMuted });
                  }}
                   source={{ uri: this.state.liveUrl }}
                />
              </>
            );
          }}
        />

        <Row style={styles.subHead}>
          <TouchableOpacity
            style={{ height: hp("4"), justifyContent: "center" }}
            onPress={toggleDrawer}
          >
            <DrawerIcon width={wp("5")} />
          </TouchableOpacity>

          <FlatList
            style={styles.flatList}
            contentContainerStyle={styles.flatListContent}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={subHeadCategoriesList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={(data) => {
              return (
                <>
                  <TouchableOpacity
                    style={[styles.subHeadBtn]}
                    onPress={() => {
                      if (data.item.name === "iTrip" || data.item.name === "Become Contributor") {
                        this.setState({ isPlay:false });
                        navigation.navigate(this.getRoute(data.item.name));
                      } else {
                        this.setState({ selected: data.item.name });
                      }
                    }}
                  >
                    <Text
                      style={[
                        {
                          ...Platform.select({ ios: {}, android: {} }),
                          color: "#333333",
                        },
                        this.getRoute(data.item.name) === this.state.selected
                          ? { color: "#19b24b" }
                          : {},
                      ]}
                    >
                      {data.item.name}
                    </Text>
                  </TouchableOpacity>
                  {subHeadCategoriesList.length - 1 !== data.index && (
                    <Text style={{ alignSelf: "center" }}>|</Text>
                  )}
                </>
              );
            }}
          />
        </Row>
        <View>
          {this.state.selected === "Home" && (
            <Home navigation={this.props.navigation} onNavigate={()=>{ this.setState({ isPlay:false }) }}/>
          )}
          {this.state.selected === "Shows" && (
            <Shows navigation={this.props.navigation} onNavigate={()=>{ this.setState({ isPlay:false }) }}/>
          )}
          {this.state.selected === "Discover Shop" && (
            <ECommerce navigation={this.props.navigation} onNavigate={()=>{ this.setState({ isPlay:false }) }}/>
          )}
          {this.state.selected === "Partners" && (
            <Partners navigation={this.props.navigation} onNavigate={()=>{ this.setState({ isPlay:false }) }}/>
          )}
          {this.state.selected === "Advertise" && (
            <AdvertiseWithUs navigation={this.props.navigation} onNavigate={()=>{ this.setState({ isPlay:false }) }}/>
          )}
          {this.state.selected === "Pakistan" && (
            <AboutDiscoverPakistan2 navigation={this.props.navigation} onNavigate={()=>{ this.setState({ isPlay:false }) }}/>
          )}
          {this.state.selected === "Tourist Community" && (
            <TouristCommunity navigation={this.props.navigation} onNavigate={()=>{ this.setState({ isPlay:false }) }}/>
          )}
          {/* {this.state.selected === "Shows" && (
            <Shows navigation={this.props.navigation} onNavigate={()=>{ this.setState({ isPlay:false }) }}/>
          )} */}
        </View>

        <ProfileDropDown
          isDropDown={this.state.isDropDown}
          props={this.props}
          setDropDown={(isActive) => {
            this.setState({
              isDropDown:isActive,
              ...!isActive && { isPlay:false }
            });
          }}
        />
        <DrawerModal
          navigation={this.props.navigation}
          toggleDrawer={() => {
            // console.log("AI ", this.state.isShowMidModal);
            this.setState({ isShowMidModal: !this.state.isShowMidModal });
          }}
          isShowModal={this.state.isShowMidModal}
        />
        <FooterDrawerModal
          navigation={this.props.navigation}
          toggleDrawer={() => {
            this.setState({
              isPlay:true,
              isShowBottomModal: !this.state.isShowBottomModal,
            });
          }}
          isShowModal={this.state.isShowBottomModal}
        />

        <Footer
          navigation={this.props.navigation}
          onNavigate={()=>{ this.setState({ isPlay:false }) }}
          toggleDrawer={() => {
            this.setState({
              isPlay:false,
              isShowBottomModal: !this.state.isShowBottomModal,
            });
          }}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  // SubHeader
  subHead: {
    height: hp("5"),
    width: wp("100"),
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: wp("3"),
    paddingLeft: wp("3"),
    borderTopColor: "gray",
    borderBottomColor: "gray",
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  flatList: {
    height: "100%",
    marginLeft: 10,
  },
  flatListContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  subHeadBtn: {
    justifyContent: "center",
    marginRight: hp("1"),
    marginLeft: hp("1"),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SubHeader2);

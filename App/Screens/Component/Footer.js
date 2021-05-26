import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Platform,
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

const subHeadCategoriesList = [
  { name: "Home" },
  { name: "About Us" },
  { name: "Terms of Use" },
  { name: "Privacy Policy" },
  { name: "Disclaimer" },
  { name: "About Discover Pakistan" },
  { name: "Career" },
  { name: "Contact Us" },
];

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  UNSAFE_componentWillMount() {
    this._isMounted = true;
    if (this._isMounted) {
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { navigation, toggleDrawer, onNavigate } = this.props;

    const getRoute = (name) => {
      switch (simplify(name)) {
        case "home":
          return "Home";
          break;
        case "aboutus":
          return "Aboutus";
          break;
        case "termsofuse":
          return "TermsConditions";
          break;
        case "privacypolicy":
          return "PrivacyPolicy";
          break;
        case "disclaimer":
          return "Disclaimer";
          break;
        case "aboutdiscoverpakistan":
          return "AboutDiscoverPakistan";
          break;
        case "career":
          return "Jobs";
          break;
        case "contactus":
          return "ContactUs";
          break;
        default:
          return "";
          break;
      }
    };

    return (
      <>
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
              // console.log(subHeadCategoriesList.length-1, data.index)
              return (
                <>
                  <TouchableOpacity
                    style={styles.subHeadBtn}
                    onPress={() => {
                      if(onNavigate) onNavigate()
                      navigation.navigate(getRoute(data.item.name));
                    }}>
                    <Text
                      style={[
                        {
                          ...Platform.select({ ios: {}, android: {} }),
                          color: "#333333",
                        },
                        getRoute(data.item.name) === navigation.state.routeName
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
      </>
    );
  }
}

const styles = StyleSheet.create({
  // SubHeader
  subHead: {
    position: "absolute",
    bottom: 0,
    height: hp("6"),
    width: wp("100"),
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: wp("3"),
    paddingLeft: wp("3"),
    borderTopColor: "gray",
    borderBottomColor: "gray",
    backgroundColor: "#FFFFFF",
    borderTopWidth: 2,
    borderBottomWidth: 2,
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
    // height:'100%',
    justifyContent: "center",
    marginRight: hp("1"),
    marginLeft: hp("1"),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);

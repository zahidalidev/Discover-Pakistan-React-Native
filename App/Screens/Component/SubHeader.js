import React from "react";
import { StyleSheet, Text, TouchableOpacity, FlatList } from "react-native";
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
// import { useNavigation } from "@react-navigation/native";

import DrawerIcon from "./../../Assets/svg/Menu_Bar_Icon-24px.svg";
import { simplify } from "../../Helpers/general";

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

class SubHeader extends React.Component {
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
              return (
                <>
                  <TouchableOpacity
                    style={[styles.subHeadBtn]}
                    onPress={() => {
                      this.props.navigation.navigate("Home", {
                        pathName: data.item.name,
                      });
                    }}
                  >
                    <Text
                      style={[
                        {
                          ...Platform.select({ ios: {}, android: {} }),
                          color: "#333333",
                        },
                        this.getRoute(data.item.name) ===
                        navigation.state.routeName
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

export default connect(mapStateToProps, mapDispatchToProps)(SubHeader);

import React from "react";
import {
  StyleSheet,
  Text,
  Modal,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { Col, Row } from "react-native-easy-grid";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { connect } from "react-redux";
import {
  mapStateToProps,
  mapDispatchToProps,
} from "../../Redux/Actions/userActions";
import { simplify } from "../../Helpers/general";

import MostViewedIcon from "./../../Assets/svg/Most_Viewed-24px.svg";
import AdvertiseIcon from "./../../Assets/svg/Advertise-24px.svg";
import PartnersIcon from "./../../Assets/svg/Partners-24px.svg";
import PakistanIcon from "./../../Assets/svg/Pakistan-24px.svg";
import ITripIcon from "./../../Assets/svg/iTrip-24px.svg";
import OfficialMerchandiseIcon from "./../../Assets/svg/Official_Merchandise-24px.svg";
import BecomeContributorIcon from "./../../Assets/svg/Become_Contributor-24px.svg";
import TouristCommunityIcon from "./../../Assets/svg/Tourist_Community-24px.svg";
import ContactUsIcon from "./../../Assets/svg/Contact_Us-24px.svg";

const subHeadCategoriesList = [
  { name: "Shows" },
  { name: "Discover Shop" },
  { name: "Partners" },
  { name: "Advertise" },
  { name: "Pakistan" },
  { name: "iTrip" },
  { name: "Tourist Community" },
  { name: "Become Contributor" },
  { name: "Contact Us" },
];

class DrawerModal extends React.Component {
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
        return "";
        break;
    }
  }

  render() {
    const { navigation, isShowModal, toggleDrawer } = this.props;

    const _renderIcons = (name) => {
      switch (simplify(name)) {
        case "shows":
          return <MostViewedIcon width={wp("7")} />;
          break;
        case "discovershop":
          return <OfficialMerchandiseIcon width={wp("7")} />;
          break;
        case "advertise":
          return <AdvertiseIcon width={wp("7")} />;
          break;
        case "pakistan":
          return <PakistanIcon width={wp("7")} />;
          break;
        case "itrip":
          return <ITripIcon width={wp("7")} />;
          break;
        case "touristcommunity":
          return <TouristCommunityIcon width={wp("7")} />;
          break;
        case "becomecontributor":
          return <BecomeContributorIcon width={wp("7")} />;
          break;
        case "contactus":
          return <ContactUsIcon width={wp("7")} />;
          break;
        case "partners":
          return <PartnersIcon width={wp("7")} />;
          break;

        default:
          break;
      }
    };

    return (
      <Modal animationType="fade" transparent={true} visible={isShowModal}>
        <TouchableOpacity
          style={styles.modalBackground}
          onPress={toggleDrawer}
        />
        <Col style={styles.modalMainContainer}>
          <Col style={styles.drawerView}>
            {/* <Row style={styles.dismissRow}>
                            <TouchableOpacity style={styles.dismissBtn} onPress={toggleDrawer}>
                                <Text>X</Text>
                            </TouchableOpacity>
                        </Row> */}

            <Row style={styles.srcollRow}>
              <FlatList
                data={subHeadCategoriesList}
                keyExtractor={(item, i) => i.toString()}
                renderItem={(data) => {
                  return (
                    <Row style={styles.btnRow}>
                      <TouchableOpacity
                        style={styles.btn}
                        onPress={() => {
                          toggleDrawer();
                          setTimeout(() => {
                            navigation.navigate(this.getRoute(data.item.name));
                          });
                        }}
                      >
                        {_renderIcons(data.item.name)}
                        <Text
                          style={[
                            styles.btnText,
                            this.getRoute(data.item.name) ===
                            navigation.state.routeName
                              ? { color: "#19b24b" }
                              : {},
                          ]}
                        >
                          {data.item.name}
                        </Text>
                      </TouchableOpacity>
                    </Row>
                  );
                }}
              />
            </Row>
          </Col>
        </Col>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalMainContainer: {
    height: hp("100"),
    width: wp("100"),
    flex: 1,
  },
  modalBackground: {
    backgroundColor: "black",
    height: hp("100"),
    width: wp("100"),
    opacity: 0.8,
  },
  drawerView: {
    position: "absolute",
    left: 10,
    bottom: hp("20"),
    height: hp("60"),
    width: wp("70"),
    backgroundColor: "#FFFFFF",
    borderWidth: 0.4,
    borderColor: "gray",
    shadowColor: "rgba(138,138,138,0.5)",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 8.68,
    zIndex: 1,
    flex: 1,
  },

  srcollRow: {
    height: "100%",
  },
  btnRow: {
    height: hp("6"),
    marginTop: hp("2"),
  },
  btn: {
    height: "100%",
    width: "100%",
    paddingLeft: wp("5"),
    flexDirection: "row",
    alignItems: "center",
  },
  btnText: {
    fontSize: 16,
    fontWeight: "600",
    paddingLeft: wp("3"),
    color: "#333333",
    ...Platform.select({ ios: {}, android: {} }),
  },
  dismissRow: {
    position: "absolute",
    height: hp("3"),
    width: hp("3"),
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 50,
    backgroundColor: "#FFFFFF",
    right: -hp("1"),
    top: -hp("1"),
    overflow: "hidden",
    zIndex: 1,
  },
  dismissBtn: {
    height: hp("2.8"),
    width: hp("2.8"),
    alignItems: "center",
    justifyContent: "center",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawerModal);

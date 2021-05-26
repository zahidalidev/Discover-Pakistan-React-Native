import React from "react";
import {
  StyleSheet,
  Text,
  Modal,
  FlatList,
  TouchableOpacity,
  Platform,
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

import PrivacyPolicyIcon from "./../../Assets/svg/Privacy_Policy-24px.svg";
import DisclaimerIcon from "./../../Assets/svg/Disclaimer-24px.svg";
import AboutusIcon from "./../../Assets/svg/Disclaimer-24px.svg";
import AboutIcon from "./../../Assets/svg/About_Discover_Pakistan-24px.svg";
import TermsOfUseIcon from "./../../Assets/svg/Terms_of_Use-24px.svg";
import CareerIcon from "./../../Assets/svg/Career-24px.svg";
import ContactUsIcon from "./../../Assets/svg/Contact_Us-24px.svg";
import HomeIcon from "./../../Assets/svg/Home-24px.svg";

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

class FooterDrawerModal extends React.Component {
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
    const { navigation, isShowModal, toggleDrawer } = this.props;

    const _renderIcons = (name) => {
      switch (simplify(name)) {
        case "home":
          return <HomeIcon width={wp("7")} />;
          break;
        case "aboutus":
          return <AboutusIcon width={wp("7")} />;
          break;
        case "termsofuse":
          return <TermsOfUseIcon width={wp("7")} />;
          break;
        case "privacypolicy":
          return <PrivacyPolicyIcon width={wp("7")} />;
          break;
        case "disclaimer":
          return <DisclaimerIcon width={wp("7")} />;
          break;
        case "aboutdiscoverpakistan":
          return <AboutIcon width={wp("7")} />;
          break;
        case "career":
          return <CareerIcon width={wp("7")} />;
          break;
        case "contactus":
          return <ContactUsIcon width={wp("7")} />;
          break;

        default:
          break;
      }
    };

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
                              navigation.navigate(getRoute(data.item.name));
                            });
                          }}
                        >
                          <>
                            {_renderIcons(data.item.name)}
                            <Text
                              ellipsizeMode="tail"
                              numberOfLines={1}
                              style={[
                                styles.btnText,
                                getRoute(data.item.name) ===
                                navigation.state.routeName
                                  ? { color: "#19b24b" }
                                  : {},
                              ]}
                            >
                              {data.item.name}
                            </Text>
                          </>
                        </TouchableOpacity>
                      </Row>
                    );
                  }}
                />
              </Row>
            </Col>
          </Col>
        </Modal>
      </>
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
    bottom: hp("2"),
    height: hp("60"),
    width: wp("70"),
    marginLeft: 10,
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
    ...Platform.select({ ios: {}, android: {} }),
    color: "#333333",
    width: "80%",
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

export default connect(mapStateToProps, mapDispatchToProps)(FooterDrawerModal);

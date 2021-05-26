import React from "react";
import { StyleSheet, Text, Image, Platform } from "react-native";
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
import { Loader } from "../Component";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import FooterDrawerModal from "../Component/FooterDrawerModal";

import { ScrollView } from "react-native-gesture-handler";
import DrawerModal from "../Component/DrawerModal";
import { color } from "../../Constants/theme";
const JobImage = "./../../Assets/partners_bg.jpg";

const details = [
  {
    id: 1,
    title: "Director Marketing",
    description: `responsible for their company's marketing and communications strategies, as well as overall branding and image.`,
  },
  {
    id: 2,
    title: "Cheif Operation Manager",
    description: `responsible for their company's marketing and communications strategies, as well as overall branding and image.`,
  },
  {
    id: 3,
    title: "Director Cordination",
    description: `responsible for their company's marketing and communications strategies, as well as overall branding and image.`,
  },
  {
    id: 4,
    title: "Anchor / Host",
    description: `responsible for their company's marketing and communications strategies, as well as overall branding and image.`,
  },
];

class AdvertiseWithUs extends React.Component {
  Loader = true;
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      isShowMidModal: false,
      isShowBottomModal: false,
      array: details,
      tempArray: details,
      selectedJob: {},
      isShowApplyModal: false,
      text:
        "Discover Pakistan Sales connects this house of beloved brands to the world, offering limitless possibilities and solutions rooted in imagination. For more information on how to partner and advertise with Discover Pakistan Sales, please contact us at info@discoverpakistan.tv",
    };
  }

  async UNSAFE_componentWillMount() {
    this._isMounted = true;
    if (this._isMounted) {
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  setStateObj(obj) {
    this.setState({ ...this.state, ...obj });
  }

  render() {
    const {
      loader,
      selectedJob,
      isShowMidModal,
      isShowBottomModal,
      array,
      text,
      isShowApplyModal,
    } = this.state;

    return (
      <>
        <Loader isLoader={loader} />
        <Grid style={styles.grid}>
          {/* <Row style={{ height:hp('11') }}> */}
          {/* <Header
                        navigation={this.props.navigation}
                        toggleDrawer={()=>{ this.setStateObj({ isShowMidModal: !isShowMidModal }) }}
                        isShowSubHeader
                        renderPlayer={()=>{
                            return(
                                <Row style={{ height:hp('25') }}>
                                    <Image source={require(JobImage)} style={{ width:wp('100'), height:'100%' }} />
                                </Row>
                            )
                        }}/> */}
          {/* </Row> */}

          <Row style={styles.contents}>
            <ScrollView>
              <Row style={styles.screenTitleRow}>
                <Row style={styles.screenTitleDon} />
                <Text style={styles.screenTitle}>ADVERTISE WITH US</Text>
              </Row>

              <Row style={styles.cardRow}>
                <Text style={styles.jobDes}>{text}</Text>
              </Row>
            </ScrollView>
          </Row>

          {/* <DrawerModal
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
    height: hp("100"),
    width: wp("100"),
  },
  contents: {
    ...Platform.select({
      ios: { height: hp("84") },
      android: { height: hp("89") },
    }),
    width: wp("100"),
    alignSelf: "center",
  },
  letsWork: {
    fontSize: 15,
    fontWeight: "bold",
  },

  screenTitleRow: {
    height: hp("8"),
    width: wp("100"),
    paddingLeft: wp("4"),
    alignItems: "center",
  },
  screenTitleDon: {
    backgroundColor: color.design,
    height: hp("3.5"),
    width: wp("3"),
    marginRight: hp("1"),
  },
  screenTitle: {
    color: color.design,
    fontSize: 24,
    fontWeight: "600",
  },

  cardRow: {
    alignSelf: "center",
    backgroundColor: color.tertiary,
    ...Platform.select({
      ios: { height: hp("30") },
      android: { height: hp("40"), marginBottom: hp("10") },
    }),
    width: wp("90"),
    justifyContent: "center",
    shadowColor: "rgba(138,138,138,0.3)",
    elevation: 10,
    shadowOffset: { width: 5, hesight: 5 },
    shadowOpacity: 4,
    shadowRadius: 10,
    flexWrap: "wrap",
  },
  jobDes: {
    fontSize: 14,
    fontWeight: "300",
    textAlign: "justify",
    padding: hp("2"),
    lineHeight: 30,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AdvertiseWithUs);

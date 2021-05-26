import React from "react";
import { connect } from "react-redux";
import { Grid, Row } from "react-native-easy-grid";
import { StyleSheet, Text, Image, Platform, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import {
  mapStateToProps,
  mapDispatchToProps,
} from "../../Redux/Actions/userActions";
import FooterDrawerModal from "../Component/FooterDrawerModal";
import { ScrollView } from "react-native-gesture-handler";
import Footer from "../Component/Footer";
import Header from "../Component/Header";
import { Loader, ProfileDropDown } from "../Component";
import { URI } from "../../Constants";

import DrawerModal from "../Component/DrawerModal";
import Api from "../../Constants/Api";
import { splitArrayIntoChunks } from "../../Helpers/general";
const PartnersImage = "./../../Assets/partners_bg.jpg";

class Partners extends React.Component {
  Loader = true;
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      isShowMidModal: false,
      isShowBottomModal: false,
      isDropDown: false,
      array: [],
      tempArray: [],
      selectedJob: {},
      isShowApplyModal: false,
    };
  }

  async UNSAFE_componentWillMount() {
    this._isMounted = true;
    if (this._isMounted) {
      this.getPartnersList();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  setStateObj(obj) {
    this.setState({ ...this.state, ...obj });
  }

  getPartnersList() {
    this.setStateObj({ loader: true });
    let payload = {
      uri: URI.GET_PARTNERS,
      method: "post",
      data: { id: this.props.userData.user_id },
    };
    Api(payload)
      .then((res) => {
        if (res.data.message === "success") {
          this.setStateObj({
            loader: false,
            array: res.data.data,
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

  render() {
    const {
      loader,
      isShowMidModal,
      isShowBottomModal,
      isDropDown,
      array,
    } = this.state;
    return (
      <>
        <Loader isLoader={loader} />
        <Grid style={styles.grid}>
          {/* <Header
                    isDropDown={isDropDown}
                    setDropDown={(isActive)=>{ this.setStateObj({ isDropDown:isActive }) }}
                    navigation={this.props.navigation}
                    toggleDrawer={()=>{ this.setStateObj({ isShowMidModal: !isShowMidModal }) }}
                    isShowSubHeader
                    renderPlayer={()=>{
                        return(
                            <Row style={{ height:hp('25') }}>
                                <Image source={require(PartnersImage)} style={{ width:wp('100'), height:'100%' }} />
                            </Row>
                        )
                    }}/> */}

          <Row style={styles.contents}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Row style={styles.screenTitleRow}>
                <Row style={styles.screenTitleDon} />
                <Text style={styles.screenTitle}>OUR PARTNERS</Text>
              </Row>

              {typeof array === "object" &&
                splitArrayIntoChunks(array, 2).map((child, i) => {
                  return (
                    <>
                      <Row key={i} style={styles.pRow}>
                        {child.map((item, j) => {
                          return (
                            <Row style={styles.cardRow} key={j}>
                              <Image
                                source={{ uri: item.img }}
                                style={styles.cardImg}
                              />
                            </Row>
                          );
                        })}
                      </Row>
                    </>
                  );
                })}
              <View style={{ height: hp("8") }} />
            </ScrollView>
          </Row>

          {/* <ProfileDropDown
                    isDropDown={isDropDown}
                    setDropDown={(isActive)=>{ this.setStateObj({ isDropDown:isActive }) }}
                    props={this.props}/>

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
    height: hp("100"),
    width: wp("100"),
  },
  contents: {
    ...Platform.select({
      ios: { height: hp("55") },
      android: { height: hp("59") },
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
    backgroundColor: "#53AF57",
    height: hp("3.5"),
    width: wp("3"),
    marginRight: hp("1"),
  },
  screenTitle: {
    color: "#53AF57",
    fontSize: 24,
    fontWeight: "600",
  },
  pRow: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
    paddingLeft: hp("1"),
    paddingRight: hp("1"),
  },
  cardRow: {
    alignSelf: "center",
    backgroundColor: "#F4F4F4",
    marginBottom: hp("1.6"),
    width: wp("45"),
    height: wp("45"),
    justifyContent: "center",
    shadowColor: "rgba(138,138,138,0.3)",
    elevation: 10,
    shadowOffset: { width: 5, hesight: 5 },
    shadowOpacity: 4,
    shadowRadius: 10,
  },
  cardImg: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Partners);

import React from "react";
import {
  StyleSheet,
  Text,
  Image,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Grid, Row, Col } from "react-native-easy-grid";
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
import Footer from "../Component/Footer";
import FooterDrawerModal from "../Component/FooterDrawerModal";

import { ScrollView } from "react-native-gesture-handler";
import ApplyModal from "../Component/ApplyModal";
import { isObjEmpty } from "../../Helpers/general";
import DrawerModal from "../Component/DrawerModal";
import { SearchList } from "../Component/searchBox";

const JobImage = "./../../Assets/job_bg.jpg";
const bannerImg = "./../../Assets/aboutus.png";

class Aboutus extends React.Component {
  Loader = true;
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      isShowMidModal: false,
      isShowBottomModal: false,
      selectedJob: {},
      isShowApplyModal: false,
      isDropDown: false,
      isShowMidModal: false,
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
      isShowApplyModal,
      isDropDown,
    } = this.state;

    return (
      <>
        <Loader isLoader={loader} />
        <Grid style={styles.grid}>
          <Header
            navigation={this.props.navigation}
            isShowSearch={true}
            isDropDown={isDropDown}
            setDropDown={(isActive) => {
              this.setStateObj({ isDropDown: isActive });
            }}
            toggleDrawer={() => {
              this.setStateObj({ isShowMidModal: !isShowMidModal });
            }}
            isShowSubHeader
            tempArray={[]}
            filterFun={(data) => {}}
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
                  <Row style={{ height: hp("25") }}>
                    <Row style={styles.bannerImg}>
                      <Image
                        source={require(bannerImg)}
                        style={{ width: wp("36"), height: null }}
                      />
                    </Row>
                    {/* <Row style={[styles.bannerImg, { top: "65%", left: "3%" }]}>
                      <Text style={[styles.letsWork, { color: "#FFFFFF" }]}>
                        Please go through this documents carefully
                      </Text>
                    </Row> */}
                    <Image
                      source={require(JobImage)}
                      style={{ width: wp("100"), height: "100%" }}
                    />
                  </Row>
                </>
              );
            }}
          />

          <Row style={styles.contents}>
            <ScrollView style={{ height: 380 }}>
              <Row style={styles.screenTitleRow}>
                <Row style={styles.screenTitleDon} />
                <Text style={styles.screenTitle}>ABOUT DISCOVER PAKISTAN</Text>
              </Row>

              <Row style={styles.mainRow1}>
                <Text style={styles.simpleTextloren}>
                  Discover Pakistan - First Satellite Tourism TV of Pakistan,
                  softy launched on 23rd of March, 2021 with the aim to promote
                  Tourism and soft image of Pakistan locally and
                  internationally. Discover Pakistan is exhibiting natural
                  wonders and picture perfect scenic beauty of Pakistan in ultra
                  HD format. Pakistan is gifted with so many beautiful carved
                  landscapes, breath taking valleys, series of natural lakes,
                  beaches and rich history. Team Discover Pakistan is determined
                  to play its role in changing the country’s perception
                  globally. Soon enough, Discover Pakistan along with its brand
                  partners will be recognized as Country’s window to the world.
                </Text>
              </Row>
              <Row style={styles.screenTitleRow}>
                <Row style={styles.screenTitleDon} />
                <Text style={styles.screenTitle}>HONORARY ADVISORY BOARD</Text>
              </Row>
              <Row style={styles.mainRow}>
                <Row>
                  <Col style={styles.piccol}>
                    <Image
                      source={require("./../../Assets/Image-1-For-Discover-Pakistan.png")}
                      style={styles.imgcol}
                    />
                  </Col>
                  <Col style={styles.textcol}>
                    <Text style={styles.textheadingcol}>Dr. Amjad Saqib</Text>

                    <Text style={styles.textdesgcol}>
                      Founder/Chairman Akhuwat Foundation.
                    </Text>
                  </Col>
                </Row>

                <Row>
                  <Col style={styles.piccol}>
                    <Image
                      source={require("./../../Assets/Image-2-For-Discover-Pakistan.png")}
                      style={styles.imgcol}
                    />
                  </Col>
                  <Col style={styles.textcol}>
                    <Text style={styles.textheadingcol}>
                      Prof. Dr. Niaz Ahmad Aktar (SI)
                    </Text>

                    <Text style={styles.textdesgcol}>
                      Vice chancellor, Punjab University.
                    </Text>
                  </Col>
                </Row>
                <Row>
                  <Col style={styles.piccol}>
                    <Image
                      source={require("./../../Assets/Justice-Wazir-Shakeel-Ahmed.jpg")}
                      style={styles.imgcol}
                    />
                  </Col>
                  <Col style={styles.textcol}>
                    <Text style={styles.textheadingcol}>
                      Justice Wazir Shakeel Ahmed
                    </Text>

                    <Text style={styles.textdesgcol}>
                      Senior Puisne Judge, Supreme Appellate Court, Gilgit
                      Baltistan.
                    </Text>
                  </Col>
                </Row>
                <Row>
                  <Col style={styles.piccol}>
                    <Image
                      source={require("./../../Assets/Image-3-For-Discover-Pakistan.png")}
                      style={styles.imgcol}
                    />
                  </Col>
                  <Col style={styles.textcol}>
                    <Text style={styles.textheadingcol}>
                      Air Vice Marshal (R) Sajid Habib
                    </Text>

                    <Text style={styles.textdesgcol}>
                      Former DG Air Intelligence.
                    </Text>
                  </Col>
                </Row>
                <Row>
                  <Col style={styles.piccol}>
                    <Image
                      source={require("./../../Assets/Major-General-Syed-Haider-Ali.jpg")}
                      style={styles.imgcol}
                    />
                  </Col>
                  <Col style={styles.textcol}>
                    <Text style={styles.textheadingcol}>
                      Maj General (R) Syed Haider Ali
                    </Text>

                    <Text style={styles.textdesgcol}>
                      Former DG NLC, Former Ambassador of Pak to Brunei.
                    </Text>
                  </Col>
                </Row>
                

                <Row>
                  <Col style={styles.piccol}>
                    <Image
                      source={require("./../../Assets/Salim-Ghauri-founder-CEO-Netsol.jpg")}
                      style={styles.imgcol}
                    />
                  </Col>
                  <Col style={styles.textcol}>
                    <Text style={styles.textheadingcol}>Salim Ghauri</Text>

                    <Text style={styles.textdesgcol}>
                      Founder/CEO Netsol Technologies Pvt Ltd
                    </Text>
                  </Col>
                </Row>
                <Row>
                  <Col style={styles.piccol}>
                    <Image
                      source={require("./../../Assets/Qasim-Ali-shah.jpg")}
                      style={styles.imgcol}
                    />
                  </Col>
                  <Col>
                    <Text style={styles.textheadingcol}>Qasim Ali Shah</Text>

                    <Text style={styles.textdesgcol}>
                      Founder/Chairman Qasim Ali Shah Foundation
                    </Text>
                  </Col>
                </Row>
                
                <Row>
                  <Col style={styles.piccol}>
                    <Image
                      source={require("./../../Assets/Justice-Anwar-ul-haq.jpg")}
                      style={styles.imgcol}
                    />
                  </Col>
                  <Col style={styles.textcol}>
                    <Text style={styles.textheadingcol}>
                      Justice (R) Anwar ul Haq{" "}
                    </Text>

                    <Text style={styles.textdesgcol}>
                      Founder of Globally Recognized Initiative
                    </Text>
                    <Text style={styles.textdesgcol}>“Awo Sulah Karain”.</Text>
                  </Col>
                </Row>
                <Row>
                  <Col style={styles.piccol}>
                    <Image
                      source={require("./../../Assets/Dr.-Haider-Ali-Khan.jpg")}
                      style={styles.imgcol}
                    />
                  </Col>
                  <Col style={styles.textcol}>
                    <Text style={styles.textheadingcol}>
                      Dr. Haider Ali Khan{" "}
                    </Text>

                    <Text style={styles.textdesgcol}>
                      Member National Assembly NA 2 Swat 1,
                    </Text>
                    <Text style={styles.textdesgcol}>KPK.</Text>
                  </Col>
                </Row>
                <Row>
                  <Col style={styles.piccol}>
                    <Image
                      source={require("./../../Assets/Muhammad-Amir-Ali.jpg")}
                      style={styles.imgcol}
                    />
                  </Col>
                  <Col style={styles.textcol}>
                    <Text style={styles.textheadingcol}>Muhammad Amir Ali</Text>

                    <Text style={styles.textdesgcol}>
                      Honorary Goodwill Ambassador of CPEC (Appointed by Chinese
                      Government).
                    </Text>
                  </Col>
                </Row>
                <Row>
                  <Col style={styles.piccol}>
                    <Image
                      source={require("./../../Assets/Image-6-For-Discover-Pakistan.png")}
                      style={styles.imgcol}
                    />
                  </Col>
                  <Col style={styles.textcol}>
                    <Text style={styles.textheadingcol}>Syed Noor </Text>

                    <Text style={styles.textdesgcol}>
                      Legendary Director of Pakistan.
                    </Text>
                  </Col>
                </Row>
                <Row>
                  <Col style={styles.piccol}>
                    <Image
                      source={require("./../../Assets/Dr.-Tariq-Shareefzada.jpg")}
                      style={styles.imgcol}
                    />
                  </Col>
                  <Col style={styles.textcol}>
                    <Text style={styles.textheadingcol}>
                      Dr. Tariq Sharifzada
                    </Text>

                    <Text style={styles.textdesgcol}>
                      Pakistan’s renowned Seerat Scholar.
                    </Text>
                  </Col>
                </Row>
                <Row>
                  <Col style={styles.piccol}>
                    <Image
                      source={require("./../../Assets/Sumaira-K.isaacs.jpg")}
                      style={styles.imgcol}
                    />
                  </Col>
                  <Col style={styles.textcol}>
                    <Text style={styles.textheadingcol}>Sumaira K. Isaacs</Text>

                    <Text style={styles.textdesgcol}>
                      International Tourism Consultant, New York, USA.
                    </Text>
                  </Col>
                </Row>
                <Row>
                  <Col style={styles.piccol}>
                    <Image
                      source={require("./../../Assets/Mirza-Asif-Baig-President-JPECA.jpg")}
                      style={styles.imgcol}
                    />
                  </Col>
                  <Col style={styles.textcol}>
                    <Text style={styles.textheadingcol}>Mirza Asif Baig </Text>

                    <Text style={styles.textdesgcol}>
                      President JPECA – Japan Pakistan Economic & Cultural
                      Association (Based in Tokyo).
                    </Text>
                  </Col>
                </Row>
                <Row>
                  <Col style={styles.piccol}>
                    <Image
                      source={require("./../../Assets/Raja-Nazeem-ul-Amin.jpg")}
                      style={styles.imgcol}
                    />
                  </Col>
                  <Col style={styles.textcol}>
                    <Text style={styles.textheadingcol}>
                      Raja Nazeem ul Amin
                    </Text>

                    <Text style={styles.textdesgcol}>
                      CEO Gold Roof Pvt Ltd/ Former Chairman Gilgit Baltistan
                      Investment Board.
                    </Text>
                  </Col>
                </Row>
                <Row>
                  <Col style={styles.piccol}>
                    <Image
                      source={require("./../../Assets/Imam-Bakhsh-Baloch-.jpg")}
                      style={styles.imgcol}
                    />
                  </Col>
                  <Col style={styles.textcol}>
                    <Text style={styles.textheadingcol}>
                      Imam Bakhsh Baloch
                    </Text>

                    <Text style={styles.textdesgcol}>
                      Former SEVP NBP, Former Finance Minister Government of
                      Balochistan
                    </Text>
                  </Col>
                </Row>
                <Row>
                  <Col style={styles.piccol}>
                    <Image
                      source={require("./../../Assets/Razzaq-Baloch.jpg")}
                      style={styles.imgcol}
                    />
                  </Col>
                  <Col style={styles.textcol}>
                    <Text style={styles.textheadingcol}>Razzaq Baloch </Text>

                    <Text style={styles.textdesgcol}>
                      International Media Consultant, New York, USA.{" "}
                    </Text>
                  </Col>
                </Row>
                <Row>
                  <Col style={styles.piccol}>
                    <Image
                      source={require("./../../Assets/Suniya-Qureshi.jpg")}
                      style={styles.imgcol}
                    />
                  </Col>
                  <Col style={styles.textcol}>
                    <Text style={styles.textheadingcol}>Suniya Qureshi </Text>

                    <Text style={styles.textdesgcol}>
                      Executive Director of British Pakistan Foundation, London,
                      UK.
                    </Text>
                  </Col>
                </Row>
                <Row>
                  <Col style={styles.piccol}>
                    <Image
                      source={require("./../../Assets/Syed-Qamar-Abbas.jpg")}
                      style={styles.imgcol}
                    />
                  </Col>
                  <Col style={styles.textcol}>
                    <Text style={styles.textheadingcol}>Syed Qamar Abbas </Text>

                    <Text style={styles.textdesgcol}>
                      Member Governing Body, Tourism Board of Pakistan.
                    </Text>
                  </Col>
                </Row>
                <Row>
                  <Col style={styles.piccol}>
                    <Image
                      source={require("./../../Assets/Aftab-ur-Rehman-Rana.jpg")}
                      style={styles.imgcol}
                    />
                  </Col>
                  <Col style={styles.textcol}>
                    <Text style={styles.textheadingcol}>
                      Aftab-ur-Rehman Rana
                    </Text>

                    <Text style={styles.textdesgcol}>
                      Founder/President Sustainable Tourism Movement.
                    </Text>
                  </Col>
                </Row>
                <Row>
                  <Col style={styles.piccol}>
                    <Image
                      source={require("./../../Assets/Midhat-Shahzad.jpg")}
                      style={styles.imgcol}
                    />
                  </Col>
                  <Col style={styles.textcol}>
                    <Text style={styles.textheadingcol}>Midhat Shahzad </Text>

                    <Text style={styles.textdesgcol}>
                      Secretary Tourism/Archaeology/ Information & IT, Azad
                      Kashmir.
                    </Text>
                  </Col>
                </Row>
                <Row>
                  <Col style={styles.piccol}>
                    <Image
                      source={require("./../../Assets/Rashid-Naeem-DIG.jpg")}
                      style={styles.imgcol}
                    />
                  </Col>
                  <Col style={styles.textcol}>
                    <Text style={styles.textheadingcol}>Rashid Naeem </Text>

                    <Text style={styles.textdesgcol}>
                      DIG RawalaKot, Azad Kashmir.
                    </Text>
                  </Col>
                </Row>
              </Row>
              <Row style={styles.screenTitleRow}>
                <Row style={styles.screenTitleDon} />
                <Text style={styles.screenTitle}>CEO MESSAGE</Text>
              </Row>
              <Row>
                <Col style={styles.piccoli}>
                  <Image
                    source={require("./../../Assets/Dr.-Kaiser-Rafiq.jpg")}
                    style={styles.imgSizee}
                  />
                </Col>
                <Col style={styles.textcoli}>
                  <Text style={styles.textdesgcoli}>
                    Pakistan’s First Tourism Satellite TV - Discover Pakistan is
                    on its way to set new trends in the media industry of
                    Pakistan by providing positive information through
                    innovation and service of national Interest by mainstream
                    media. The mission of the TV Channel is to promote Tourism
                    and soft image of Pakistan at home and to global audience
                    through various satellites, IPTV’s, and digital horizon.
                    Discover Pakistan is ready to partner with all the positive
                    forces with the ambitions to play a vital role in expanding
                    the country’s GDP and Tourism Economy.
                  </Text>
                  <Text style={styles.sidetext}>Dr. Kaiser Rafiq </Text>
                  <Text style={styles.sidetext1}>
                    CEO/Chairman, Discover Pakistan
                  </Text>
                </Col>
              </Row>
            </ScrollView>
          </Row>

          <SearchList
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
          />

          {!isObjEmpty(selectedJob) && (
            <ApplyModal
              selectedPostion={selectedJob}
              navigation={this.props.navigation}
              isShowModal={isShowApplyModal}
              showHide={() => {
                this.setStateObj({
                  isShowApplyModal: !isShowApplyModal,
                  selectedJob: {},
                });
              }}
            />
          )}
          <ProfileDropDown
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
          />
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
    width: wp("100"),
    alignSelf: "center",
    marginBottom: hp("5"),
  },
  bannerImg: {
    position: "absolute",
    top: "50%",
    zIndex: 2,
    height: hp("3"),
    width: wp("100"),
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
  screenTitleRowi: {
    height: hp("8"),
    width: wp("100"),
    paddingLeft: wp("4"),
    paddingBottom: wp("18"),
    alignItems: "center",
  },
  screenTitleDon: {
    backgroundColor: "#19b24b",
    height: hp("3.5"),
    width: wp("3"),
    marginRight: hp("1"),
  },
  screenTitle: {
    color: "#19b24b",
    fontSize: 22,
    fontWeight: "600",
  },
  mainRow: {
    flexDirection: "column",
    alignSelf: "center",
    width: wp("92"),
    // marginBottom: hp("2"),
  },
  mainRow1: {
    flexDirection: "column",
    alignSelf: "center",
    width: wp("92"),
  },
  simpleText: {
    marginBottom: hp("1"),
  },
  simplerow: {
    // marginBottom: hp(".5"),
  },
  simpleTextloren: {
    marginBottom: hp("1"),
    marginHorizontal: hp("2"),
  },
  headText: {
    marginTop: hp("1"),
    marginBottom: hp("1"),
    fontSize: 18,
    fontWeight: "500",
  },
  piccol: {
    // backgroundColor: "blue",
    width: wp("25"),
    height: hp("13"),
  },
  piccoli: {
    // backgroundColor: "blue",
    width: wp("25"),
    height: hp("13"),
    paddingLeft: 14,
    paddingBottom: 18,
  },
  textcol: { width: wp("75") },
  textcoli: { width: wp("70") },
  imgcol: { maxWidth: wp("24"), maxHeight: hp("12") },
  imgSize: { maxWidth: wp("24"), maxHeight: hp("12"), paddingLeft: 80 },
  imgSizee: {
    maxWidth: wp("24"),
    maxHeight: hp("12"),
    paddingLeft: 80,
    paddingBottom: 5,
  },
  textheadingcol: { fontSize: 13, fontWeight: "bold" },
  sidetext: { paddingLeft: 150, fontWeight: "700" },
  sidetext1: {
    color: "grey",
    paddingLeft: 30,
    marginBottom: hp("2"),
  },
  textdesgcol: { fontSize: 13, color: "grey" },
  textdesgcoll: { fontSize: 13, color: "grey", paddingBottom: 15 },
  textdesgcoli: {
    fontSize: 13,
    color: "grey",
    paddingLeft: 15,
    paddingBottom: 5,
  },
  simplecol: { fontSize: 10 },
});

export default connect(mapStateToProps, mapDispatchToProps)(Aboutus);

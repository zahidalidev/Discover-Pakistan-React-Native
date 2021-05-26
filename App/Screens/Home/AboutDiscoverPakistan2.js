import React from "react";
import {
  StyleSheet,
  Text,
  ActivityIndicator,
  ImageBackground,
  Image,
  View,
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
import { ProfileDropDown } from "../Component";
import Header from "../Component/Header";
import DrawerModal from "../Component/DrawerModal";
import Footer from "../Component/Footer";
import FooterDrawerModal from "../Component/FooterDrawerModal";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { CONSTANTS, URI } from "../../Constants";
import Api from "../../Constants/Api";
import { isNullRetNull } from "../../Helpers/general";
import { color } from "../../Constants/theme";
import { SearchList } from "../Component/searchBox";

const BgImg = "./../../Assets/welcome_pak.jpg";
const FestivalImg = "./../../Assets/festival.jpg";
const MusicImg = "./../../Assets/music_bg.jpg";

const list = [
  {
    id: 0,
    title: "Punjab",
    icon:
      CONSTANTS.WEB_URL +
      "assets/theme/default/img/pakistanimg/punjab-icon.png",
    img: "https://discoverpakistan.tv/static/media/t1.cfa8a92f.jpg",
    description:
      "is a geopolitical, cultural, and historical region in South Asia, specifically in the northern part of the Indian subcontinent, comprising areas of eastern Pakistan and northern India",
  },
  {
    id: 1,
    title: "Khyber Pakhtunkhwa",
    icon:
      CONSTANTS.WEB_URL + "assets/theme/default//img/pakistanimg/KPK-icon.png",
    img: "https://discoverpakistan.tv/static/media/t2.a8ef14d1.jpg",
    description:
      "located in the northwestern region of the country along the International border with Afghanistan.",
  },
  {
    id: 2,
    title: "Sindh",
    icon:
      CONSTANTS.WEB_URL +
      "assets/theme/default//img/pakistanimg/sindh-icon.png",
    img: "https://discoverpakistan.tv/static/media/t2.a8ef14d1.jpg",
    description:
      "is one of the four provinces of Pakistan. Located in the southeast of the country, it is the historical home of the Sindhi people.",
  },
  {
    id: 3,
    title: "Balochistan",
    icon:
      CONSTANTS.WEB_URL +
      "assets/theme/default//img/pakistanimg/balochistan-icon.png",
    img: "https://discoverpakistan.tv/static/media/t7.d2db3331.jpg",
    description:
      "is an arid desert and mountainous region in south-western Asia.Balochistan borders the Pashtunistan region to the north, Sindh and Punjab to the east, and Persian regions to the west.",
  },
  {
    id: 5,
    title: "Azad Kashmir",
    icon: null,
    img: "https://discoverpakistan.tv/static/media/t5.65de35b5.jpg",
    description:
      "is a region administered by Pakistan as a nominally self-governing jurisdiction,and constituting the western portion of the larger Kashmir region.",
  },
  {
    id: 6,
    title: "Gilgit Baltistan",
    icon: null,
    img: "https://discoverpakistan.tv/static/media/t6.a3035b67.jpg",
    description:
      "is part of the greater Kashmir region, which is the subject of a long-running conflict between Pakistan and India.",
  },
];

const melaList = [
  {
    id: 1,
    name: "Shandur Polo",
    title: "Shandur Polo Festivel",
    description:
      "is one of the big festivals in Pakistan. This festival is held from 7 to 9 July every year on Shandur Pass in Chitral District of Khyber PakhtunkhwaThe polo match is played between the teams of Chitral District and districts of Gilgit-Baltistan, is a free style game.",
  },
  {
    id: 2,
    name: "Sibi Mela",
    title: "Sibi Mela",
    description:
      "is an annual cultural show held in Sibi, in the Balochistan Province of Pakistan. The first Sibi Mela was held in Sibi in January 1885.[1] It has subsequently developed into a cultural festival, with animal markets, camel racing, tent pegging and exhibitions of handicrafts, tribal dresses and folk dances.",
  },
  {
    id: 3,
    name: "Silk Rout",
    title: "Silk Rout",
    description:
      "was a network of trade routes which connected the East and West, and was central to the economic, cultural, political, and religious interactions between these regions from the 2nd century BCE to the 18th century.",
  },
  {
    id: 4,
    name: "Basant",
    title: "Basant",
    description:
      "has been a historic spring time kite flying event during the Basant Panchami festival in the Punjab region in India and Pakistan.[1] It falls on Basant, also called Basant Panchami. According to the Punjabi calendar it is held on the fifth day of lunar month of Magha (in late January or early February) marking the start of spring.",
  },
];

const singerList = [
  {
    id: 1,
    name: "Abida Parveen",
    img: "https://discoverpakistan.tv/static/media/abida.c264baff.png",
    description:
      "is a Pakistani Sufi Muslim singer,composer and musician. She is also a painter and entrepreneur.Her singing and music has earned her many accolades, and she has been dubbed as the 'Queen of Sufi music'.",
  },
  {
    id: 2,
    name: "Nazia Hassan",
    img: "https://discoverpakistan.tv/static/media/nazia.410298f7.png",
    description:
      'was a Pakistani pop singer-songwriter.She enjoyed widespread popularity across South and Southeast Asia and has been called the "Queen of Pop" in South Asia.',
  },
  {
    id: 3,
    name: "Nusrat Fateh Ali Khan",
    img: "https://discoverpakistan.tv/static/media/nusrat.5b4eefff.png",
    description:
      "was a Pakistani vocalist, musician and music director primarily a singer of Qawwali, a form of Sufi Islamic devotional music.[1] Widely considered one of the greatest voices ever recorded.",
  },
  {
    id: 4,
    name: "Atif Aslam",
    img: "https://discoverpakistan.tv/static/media/atif.3e8579d0.png",
    description:
      "is a Pakistani playback singer and actor. He has recorded numerous chart-topping songs[4] in both Pakistan and India and is known for his vocal belting technique.",
  },
];

class AboutDiscoverPakistan2 extends React.Component {
  Loader = true;
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      array: [],
      tempArray: [],
      categoryName: "MOST ACTIVE COMMUNITIES",
      isDropDown: false,
      selectedMela: {},
    };
  }

  async UNSAFE_componentWillMount() {
    this._isMounted = true;
    if (this._isMounted) {
      this.setState({ selectedMela: melaList[0], loader: false });
      // this.getDiscovePakDetails()
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getDiscovePakDetails() {
    this.setState({ loader: true });
    let payload = {
      uri: URI.COMMUNITIES,
      method: "post",
      data: {},
    };
    Api(payload)
      .then((res) => {
        if (res.data.message === "success") {
          this.setState({
            loader: false,
            array: res.data.data,
            data: res.data.data,
            tempArray: res.data.data,
          });
        } else {
          this.setState({ loader: false });
        }
      })
      .catch((err) => {
        this.setState({ loader: false });
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
      // isShowMidModal,
      // isShowBottomModal,
      // isDropDown,
      selectedMela,
    } = this.state;

    console.log("HELLO ");

    return (
      <>
        {/* <Header
            navigation={this.props.navigation}
            isShowSearch={true}
            isDropDown={isDropDown}
            setDropDown={(isActive) => {
              this.setState({ isDropDown: isActive });
            }}
            toggleDrawer={() => {
              this.setState({ isShowMidModal: !isShowMidModal });
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
                  <ImageBackground
                    source={require(BgImg)}
                    style={styles.headImg}
                  >
                    <Text
                      style={{
                        color: color.tertiary,
                        fontSize: 30,
                        fontWeight: "600",
                      }}
                    >
                      Welcome To Pakistan
                    </Text>
                  </ImageBackground>
                </>
              );
            }}
          /> */}

        {loader ? (
          <Row
            style={[
              styles.contents,
              { marginTop: 0, height: "50%", justifyContent: "center" },
            ]}
          >
            <ActivityIndicator size="large" color={color.design} />
          </Row>
        ) : (
          <View style={{ height: 400 }}>
            <ScrollView
              // style={{ paddingBottom: 100 }}
              showsVerticalScrollIndicator={false}
            >
              <Row style={{ flexDirection: "column", marginBottom: hp("1") }}>
                {list.map((item, i) => {
                  return (
                    <ImageBackground
                      key={i}
                      source={{ uri: isNullRetNull(item.img) }}
                      style={styles.cardBgImg}
                    >
                      <Image
                        source={{ uri: isNullRetNull(item.icon) }}
                        style={{
                          height: hp("4"),
                          width: hp("6"),
                          resizeMode: "contain",
                        }}
                      />
                      <Text
                        style={{
                          color: color.tertiary,
                          fontSize: 24,
                          fontWeight: "600",
                        }}
                      >
                        {isNullRetNull(item.title, "")}
                      </Text>
                      <Text
                        style={{
                          color: color.tertiary,
                          fontSize: 14,
                          fontWeight: "500",
                        }}
                      >
                        {isNullRetNull(item.description)}
                      </Text>
                    </ImageBackground>
                  );
                })}

                <Row
                  style={{
                    backgroundColor: color.quaternary,
                    flexDirection: "column",
                    marginTop: hp("1"),
                  }}
                >
                  <Image
                    source={require(FestivalImg)}
                    style={{
                      height: hp("20"),
                      width: wp("100"),
                      resizeMode: "contain",
                    }}
                  />
                  <Row style={styles.selectMelaBtnRow}>
                    {melaList.map((item, i) => {
                      return (
                        <TouchableOpacity
                          key={i}
                          style={[
                            styles.selectMelaBtn,
                            item.id === selectedMela.id
                              ? { backgroundColor: color.tertiary }
                              : {},
                          ]}
                          onPress={() => {
                            this.setState({ selectedMela: item });
                          }}
                        >
                          <Text
                            style={{
                              color:
                                item.id === selectedMela.id
                                  ? color.design
                                  : color.tertiary,
                              fontSize: 16,
                              fontWeight: "500",
                            }}
                          >
                            {isNullRetNull(item.name)}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </Row>
                  <Text style={styles.melaTitle}>
                    {`${isNullRetNull(selectedMela.id, "0")}. ${isNullRetNull(
                      selectedMela.title
                    )}`}
                  </Text>
                  <Text style={styles.melaDescriptions}>
                    {`${isNullRetNull(selectedMela.description)}`}
                  </Text>
                </Row>

                <ImageBackground
                  source={require(MusicImg)}
                  style={styles.musicBgImg}
                >
                  <Text
                    style={{
                      color: color.design,
                      fontSize: 24,
                      fontWeight: "600",
                    }}
                  >
                    Music
                  </Text>
                  <Text
                    style={{
                      color: color.tertiary,
                      fontSize: 14,
                      fontWeight: "400",
                      textAlign: "center",
                    }}
                  >
                    Music od includes diverse elements ranging from music from
                    various part of south Asia as well as central Asian,Middle
                    Eastern and modern-day Western popular music influences.With
                    multiple informations, a distinctive Pakistani sound has
                    emerged.
                  </Text>
                </ImageBackground>
                {singerList.map((item, i) => {
                  return (
                    <Row key={i} style={styles.singerDetailRow}>
                      <Image
                        source={{ uri: isNullRetNull(item.img) }}
                        style={styles.singerImg}
                      />
                      <Text style={styles.singerName}>{item.name}</Text>
                      <Text style={styles.singerDes}>{item.description}</Text>
                    </Row>
                  );
                })}
              </Row>
            </ScrollView>
          </View>
        )}

        {/* <View style={{ height: 100 }}></View> */}

        {/* <SearchList
            {...this.state}
            {...this.props}
            onClick={(video, list, category) => {
              this.props.setCatDetails(list);
              this.setState({ searchData: undefined });
              if(this.props.onNavigate) this.props.onNavigate()
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
            setDropDown={(isActive) => {
              this.setState({ isDropDown: isActive });
            }}
          />
          <DrawerModal
            navigation={this.props.navigation}
            toggleDrawer={() => {
              this.setState({ isShowMidModal: !isShowMidModal });
            }}
            isShowModal={isShowMidModal}
          />
          <FooterDrawerModal
            navigation={this.props.navigation}
            toggleDrawer={() => {
              this.setState({ isShowBottomModal: !isShowBottomModal });
            }}
            isShowModal={isShowBottomModal}
          />

          <Footer
            navigation={this.props.navigation}
            toggleDrawer={() => {
              this.setState({ isShowBottomModal: !isShowBottomModal });
            }}
          /> */}
        {/* </Grid> */}
      </>
    );
  }
}

const styles = StyleSheet.create({
  grid: {
    paddingBottom: hp("5"),
    width: wp("100"),
  },
  headImg: {
    flex: 0,
    alignItems: "center",
    justifyContent: "center",
    resizeMode: "contain",
  },
  cardBgImg: {
    width: wp("90"),
    height: hp("40"),
    marginTop: hp("2"),
    alignSelf: "center",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    padding: hp("1"),
    resizeMode: "contain",
    flexDirection: "column",
    backgroundColor: "#d3d3d3",
  },
  selectMelaBtnRow: {
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    marginTop: hp("2"),
  },
  selectMelaBtn: {
    backgroundColor: color.design,
    height: hp("4"),
    margin: wp("1"),
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: hp("1.5"),
    paddingRight: hp("1.5"),
  },
  melaTitle: {
    color: color.design,
    fontSize: 20,
    fontWeight: "600",
    marginTop: hp("2"),
    width: wp("90"),
    alignSelf: "center",
  },
  melaDescriptions: {
    color: "#333",
    fontSize: 16,
    fontWeight: "500",
    width: wp("90"),
    alignSelf: "center",
    marginLeft: wp("3"),
    marginBottom: hp("4"),
  },
  musicBgImg: {
    width: wp("100"),
    alignSelf: "center",
    alignItems: "center",
    padding: hp("1"),
    paddingTop: hp("4"),
    paddingBottom: hp("4"),
    resizeMode: "contain",
    flexDirection: "column",
  },
  singerDetailRow: {
    backgroundColor: color.quaternary,
    flexDirection: "column",
    alignItems: "center",
  },
  singerImg: {
    height: hp("18"),
    width: hp("18"),
    resizeMode: "contain",
    borderRadius: 100,
    borderColor: color.design,
    borderWidth: 2,
    alignSelf: "center",
    marginBottom: hp("1"),
    marginTop: hp("1"),
  },
  singerName: {
    color: color.design,
    fontSize: 24,
    fontWeight: "600",
  },
  singerDes: {
    color: "#333",
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
    paddingLeft: wp("2"),
    paddingRight: wp("2"),
    marginBottom: hp("2"),
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AboutDiscoverPakistan2);

import React from "react";
import { connect } from "react-redux";
import { Grid, Row } from "react-native-easy-grid";
import {
  StyleSheet,
  Text,
  Image,
  Platform,
  TouchableOpacity,
  View,
} from "react-native";
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
import BackIcon from "./../../Assets/svg/return.svg";
import DrawerModal from "../Component/DrawerModal";
import {
  splitArrayIntoChunks,
  isObjEmpty,
  isNullRetNull,
  isEmpty,
} from "../../Helpers/general";
import { URI } from "../../Constants";
import Api from "../../Constants/Api";
import MyBagModal from "../Component/MyBagModal";
import CartListModal from "../Component/CartListModal";
import { SearchList } from "../Component/searchBox";
import ProductDetails from "./productDetails";
const PartnersImage = "./../../Assets/partners_bg.jpg";

class ECommerce extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      isLoader: false,
      isShowMidModal: false,
      isShowBottomModal: false,
      isDropDown: false,
      array: [],
      tempArray: [],
      isShowMyBag: false,
      isShowCartList: false,
      product: {},
      data: {},
      disForMain: "flex",
      disForProd: "none",
    };
  }

  async UNSAFE_componentWillMount() {
    this._isMounted = true;
    if (this._isMounted) {
      this.getProducts();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  setStateObj(obj) {
    this.setState({ ...this.state, ...obj });
  }

  getProducts() {
    this.setStateObj({ isLoader: true });
    let payload = {
      uri: URI.GET_MARCHANDIES_PRODUCT,
      method: "post",
      data: { user_id: this.props.userData.user_id },
    };
    Api(payload)
      .then((res) => {
        if (res.data.message === "success") {
          this.setStateObj({ array: res.data.data, tempArray: res.data.data });
        }
        this.setStateObj({ isLoader: false });
      })
      .catch((err) => {
        this.setStateObj({ isLoader: false });
        alert("Unkown Error \n" + err);
      });
  }

  getSingleProduct(id) {
    this.setStateObj({ isLoader: true });
    let payload = {
      uri: URI.GET_SINGLE_PRODUCT,
      method: "post",
      data: { id: id },
    };
    Api(payload)
      .then((res) => {
        this.setStateObj({ isLoader: false });
        if (res.data.message === "success") {
          if (res.data.data.images.length > 0 && !isObjEmpty(res.data.data)) {
            // this.props.navigation.navigate("ProductDetails", {
            //   data: res.data.data,
            // });
            this.setState({
              data: res.data.data,
              disForMain: "none",
              disForProd: "flex",
            });
          }
        }
      })
      .catch((err) => {
        this.setStateObj({ isLoader: false });
        alert("Unkown Error \n" + err);
      });
  }

  getCartList(product) {
    this.setStateObj({ isLoader: true });
    let payload = {
      uri: URI.GET_CART_LIST,
      method: "post",
      data: {
        user_id: Number(this.props.userData.user_id),
      },
    };
    Api(payload)
      .then((res) => {
        if (res.data.message === "success") {
          this.props.setCartList(res.data.data);

          setTimeout(() => {
            this.setStateObj({
              isLoader: false,
              product: product,
              // isShowMyBag:true
              isShowCartList: true,
            });
          });
        } else {
          this.setStateObj({ isLoader: false });
        }
      })
      .catch((err) => {
        this.setStateObj({ isLoader: false });
        alert("Unkown Error \n" + err);
      });
  }

  getQuantity(p, q) {
    const { getCartList } = this.props;
    let tempQuantity = 0;
    getCartList.map((item, i) => {
      if (item.product_id === p.product_id) {
        tempQuantity = item.quantity;
      }
    });
    return Number(tempQuantity);
  }

  addToCart(product, q = 1) {
    let quantity = this.getQuantity(product) + q;
    if (isEmpty(this.props.userData) || !this.props.isLoggedIn) {
      if(this.props.onNavigate) this.props.onNavigate()
      this.props.navigation.navigate("Signin", { isGoBack: "goBack" });
      return;
    }
    let pid = product.product_id;
    this.setStateObj({ isLoader: true });
    let payload = {
      uri: URI.ADD_TO_CART,
      method: "post",
      data: {
        user_id: Number(this.props.userData.user_id),
        product_id: pid,
        quantity: quantity,
      },
    };
    Api(payload)
      .then((res) => {
        if (res.data.message === "success") {
          this.getCartList(product);
        } else {
          this.setStateObj({ isLoader: false });
        }
      })
      .catch((err) => {
        this.setStateObj({ isLoader: false });
        alert("Unkown Error \n" + err);
      });
  }

  render() {
    const {
      isLoader,
      isShowMidModal,
      isShowBottomModal,
      array,
      tempArray,
      isShowMyBag,
      isShowCartList,
      product,
      isDropDown,
    } = this.state;

    return (
      <>
        <Loader isLoader={isLoader} />
        <Grid style={(styles.grid, { display: this.state.disForMain })}>
          {/* <Header
                    navigation={this.props.navigation}
                    toggleDrawer={()=>{ this.setStateObj({ isShowMidModal: !isShowMidModal }) }}
                    isDropDown={isDropDown}
                    setDropDown={(isActive)=>{ this.setStateObj({ isDropDown: isActive }) }}
                    isShowSubHeader
                    isShowSearch
                    tempArray={array}
                    filterFun={(data)=>{ this.setStateObj({ tempArray:data }) }}
                    isApiSearch={true}
                    apiLoader={(is)=>{ this.setState((state)=>{ return{ ...state, searchLoader:is } }) }}
                    onTypeResult={(data)=>{ this.setState((state)=>{ return{ ...state, searchData:data } }) }}
                    renderPlayer={()=>{
                        return(
                            <Row style={{ height:hp('25') }}>
                                <Image source={require(PartnersImage)} style={{ width:wp('100'), height:'100%' }} />
                            </Row>
                        )
                    }}/> */}

          <Row style={styles.cardsCol}>
            <TouchableOpacity
              style={styles.viewCartBtn}
              onPress={() => {
                if(this.props.onNavigate) this.props.onNavigate()
                this.setStateObj({ isShowCartList: !isShowCartList });
              }}
            >
              <Text style={styles.viewCartBtnText}>Cart</Text>
            </TouchableOpacity>

            <ScrollView
              style={{ flex: 1 }}
              showsVerticalScrollIndicator={false}
            >
              {tempArray.length > 0 &&
                splitArrayIntoChunks(tempArray, 2).map((item, i) => {
                  return (
                    <Row
                      style={[
                        styles.cardsRow,
                        item.length > 1
                          ? {}
                          : { justifyContent: "flex-start", paddingLeft: "2%" },
                      ]}
                      key={`row_${i}`}
                    >
                      {item.map((child, j) => {
                        return (
                          <View key={`product_${i}_${j}`}>
                            <TouchableOpacity
                              style={styles.cardRow}
                              onPress={() => {
                                this.getSingleProduct(child.product_id);
                              }}
                            >
                              <Row style={styles.imgRow}>
                                <Image
                                  source={{ uri: child.img }}
                                  style={styles.img}
                                />
                              </Row>
                              <Row style={styles.nameRow}>
                                <Text style={styles.name}>{child.name}</Text>
                              </Row>

                              <Row style={styles.cartRow}>
                                <TouchableOpacity
                                  style={styles.cartBtn}
                                  disabled={isNullRetNull(child.quantity) < 1}
                                  onPress={() => {
                                    this.addToCart(child);
                                  }}
                                >
                                  <Text style={styles.cartBtnTitle}>
                                    {isNullRetNull(child.quantity) < 1
                                      ? "Out of Stock"
                                      : "Add to Cart"}
                                  </Text>
                                </TouchableOpacity>
                              </Row>
                            </TouchableOpacity>
                          </View>
                        );
                      })}
                    </Row>
                  );
                })}
            </ScrollView>
          </Row>

          <SearchList
            {...this.state}
            {...this.props}
            onClick={(video, list, category) => {
              this.props.setCatDetails(list);
              this.setStateObj({ searchData: undefined });
              if(this.props.onNavigate) this.props.onNavigate()
              this.props.navigation.navigate("RedirectTo", {
                path: "ShowDetails",
                obj: { category: category, video: video, screen: "Search" },
              });
            }}
          />

          {isShowCartList && (
            <CartListModal
              navigation={this.props.navigation}
              isShowModal={isShowCartList}
              onCloseBtn={() => {
                this.setStateObj({ isShowCartList: false });
              }}
            />
          )}

          <MyBagModal
            navigation={this.props.navigation}
            product={{ ...product, selectedColor: "", selectedQuantity: 1 }}
            isShowModal={isShowMyBag}
            onCloseBtn={() => {
              this.setStateObj({ isShowMyBag: false });
            }}
          />

          {/* <ProfileDropDown
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
        <View style={{ display: this.state.disForProd }}>
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
                disForProd: "none",
                disForMain: "flex",
              });
            }}
          >
            <BackIcon fill="black" />
          </TouchableOpacity>
          {this.state.disForProd === "flex" && (
            <ProductDetails
              onNavigate={this.props.onNavigate}
              data={this.state.data}
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
    height: hp("100"),
    width: wp("100"),
  },
  cardsCol: {
    ...Platform.select({
      ios: { height: hp("47") },
      android: { height: hp("52") },
    }),
    width: wp("100"),
    alignSelf: "center",
  },

  cardsRow: {
    width: wp("100"),
    ...Platform.select({
      ios: { height: hp("28") },
      android: { height: hp("32") },
    }),
    marginTop: hp("1"),
    marginBottom: hp("1"),
    justifyContent: "space-around",
  },
  cardRow: {
    flexDirection: "column",
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    width: wp("46"),
    ...Platform.select({
      ios: { height: hp("28") },
      android: { height: hp("32") },
    }),
    shadowColor: "rgba(138,138,138,0.3)",
    elevation: 5,
    shadowOffset: { width: 1, hesight: 1 },
    shadowOpacity: 1,
    shadowRadius: 3,
  },
  cardImg: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  imgRow: {
    height: "58%",
    width: "100%",
    justifyContent: "center",
  },
  img: {
    width: "99%",
    height: "100%",
  },
  nameRow: {
    alignItems: "center",
    justifyContent: "center",
    paddingRight: hp("0.5"),
    paddingLeft: hp("0.5"),
    height: "20%",
    width: "100%",
    overflow: "hidden",
    marginBottom: hp("0.5"),
  },
  name: {
    fontSize: 14,
    color: "#333333",
    textAlign: "center",
    flexWrap: "wrap",
  },

  cartRow: {
    height: "15%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  cartBtn: {
    borderWidth: 1,
    borderColor: "gray",
    width: "60%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  cartBtnTitle: {
    fontSize: 14,
    fontWeight: "600",
  },
  viewCartBtn: {
    height: hp("4"),
    width: wp("26"),
    top: "38%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#19b24b",
    position: "absolute",
    right: -hp("4"),
    transform: [{ rotate: "270deg" }],
    zIndex: 2,
  },
  viewCartBtnText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "600",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ECommerce);

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

import DrawerModal from "../Component/DrawerModal";
import { isEmpty, isNullRetNull } from "../../Helpers/general";
import Carousel from "../Component/Carousel";
import MyBagModal from "../Component/MyBagModal";

import StarHalfIcon from "./../../Assets/svg/star_half.svg";
import StarFullIcon from "./../../Assets/svg/star_full.svg";
import StarEmptyIcon from "./../../Assets/svg/star_empty.svg";

import CartListModal from "../Component/CartListModal";
import { URI } from "../../Constants";
import Api from "../../Constants/Api";
import { SearchList } from "../Component/searchBox";

const PartnersImage = "./../../Assets/partners_bg.jpg";

class productDetails extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      isLoader: false,
      isShowMidModal: false,
      isShowBottomModal: false,
      isShowCartList: false,
      isDropDown: false,
      images: [],
      product: {},
      isViewDetails: false,
      quantity: 1,
      productColor: "",
      isShowMyBag: false,
    };
  }

  async UNSAFE_componentWillMount() {
    this._isMounted = true;
    if (this._isMounted) {
      if (isNullRetNull(this.props.data, false)) {
        let data = this.props.data;
        this.setStateObj({ images: data.images, product: data });
      } else {
        this.props.navigation.goBack();
      }
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  setStateObj(obj) {
    this.setState({ ...this.state, ...obj });
  }

  addToCart(product, quantity = 1) {
    if (isEmpty(this.props.userData) || !this.props.isLoggedIn) {
      if(this.props.onNavigate) this.props.onNavigate()
      this.props.navigation.navigate("Signin", { isGoBack: "goBack" });
      return;
    }
    this.setStateObj({ isLoader: true });
    let payload = {
      uri: URI.ADD_TO_CART,
      method: "post",
      data: {
        user_id: Number(this.props.userData.user_id),
        product_id: product.product_id,
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

  getCartList() {
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
          this.setStateObj({
            isLoader: false,
            // isShowMyBag:true
            isShowCartList: true,
          });
          this.props.setCartList(res.data.data);
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
      images,
      product,
      isViewDetails,
      quantity,
      productColor,
      isShowMyBag,
      isShowCartList,
      isDropDown,
    } = this.state;

    return (
      <>
        <Loader isLoader={isLoader} />
        <Grid style={styles.grid}>
          {/* <Header
            navigation={this.props.navigation}
            toggleDrawer={() => {
              this.setStateObj({ isShowMidModal: !isShowMidModal });
            }}
            isDropDown={isDropDown}
            setDropDown={(isActive) => {
              this.setStateObj({ isDropDown: isActive });
            }}
            isShowSubHeader
            isShowSearch
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
                <Row style={{ height: hp("25") }}>
                  <Image
                    source={require(PartnersImage)}
                    style={{ width: wp("100"), height: "100%" }}
                  />
                </Row>
              );
            }}
          /> */}

          <Row style={styles.cardsCol}>
            <TouchableOpacity
              style={styles.viewCartBtn}
              onPress={() => {
                this.setStateObj({ isShowCartList: !isShowCartList });
              }}
            >
              <Text style={styles.viewCartBtnText}>Cart</Text>
            </TouchableOpacity>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Carousel
                data={images}
                renderItem={(item, i) => {
                  return (
                    <Image
                      key={i}
                      source={{ uri: item.img }}
                      style={{
                        marginBottom: hp("2"),
                        marginTop: hp("5"),
                        alignSelf: "center",
                        width: wp("70"),
                        height: wp("70"),
                        resizeMode: "stretch",
                      }}
                    />
                  );
                }}
              />

              <Row style={styles.detailsRow}>
                <Text style={{ marginTop: hp("2"), color: "#19b24b" }}>
                  New
                </Text>
                <Text style={{ marginTop: hp("1") }}>
                  {isNullRetNull(product.name)}
                </Text>
                <Text style={{ marginTop: hp("2") }}>
                  Rs. {isNullRetNull(product.price)}
                </Text>

                <Row
                  style={{
                    height: hp("5"),
                    marginTop: hp("1"),
                    width: wp("50"),
                    alignItems: "center",
                  }}
                >
                  <StarFullIcon fill="#19b24b" />
                  <StarFullIcon fill="#19b24b" />
                  <StarFullIcon fill="#19b24b" />
                  <StarHalfIcon fill="#19b24b" />
                  <StarEmptyIcon fill="#19b24b" />
                  <Text style={{ color: "#19b24b", paddingLeft: wp("3") }}>
                    (0)
                  </Text>
                </Row>

                <Text
                  ellipsizeMode="tail"
                  numberOfLines={isViewDetails ? 0 : 2}
                  style={{ marginTop: hp("1"), width: wp("70"), fontSize: 12 }}
                >
                  {isNullRetNull(product.description)}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    this.setStateObj({ isViewDetails: !isViewDetails });
                  }}
                >
                  <Text style={{ fontSize: 12, color: "#19b24b" }}>
                    {isViewDetails ? "Hide" : "View"} Details
                  </Text>
                </TouchableOpacity>

                {product.colors && (
                  <Text style={{ marginTop: hp("2"), fontSize: 16 }}>
                    Color
                  </Text>
                )}
                <Row>
                  {product.colors &&
                    product.colors.map((color, i) => {
                      return (
                        <TouchableOpacity
                          key={i}
                          style={[
                            styles.colorCircle,
                            { backgroundColor: color },
                          ]}
                          onPress={() => {
                            this.setStateObj({
                              productColor: color === productColor ? "" : color,
                            });
                          }}
                        >
                          {color === productColor ? <Text>X</Text> : <></>}
                        </TouchableOpacity>
                      );
                    })}
                </Row>

                <Row
                  style={{
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: hp("6"),
                  }}
                >
                  <Text style={{ fontSize: 16 }}>Quantity</Text>
                  <Row style={styles.quantityBtnRow}>
                    <TouchableOpacity
                      style={styles.quantityBtns}
                      onPress={() => {
                        if (quantity > 1) {
                          this.setStateObj({ quantity: quantity - 1 });
                        }
                      }}
                    >
                      <Text style={{ fontSize: 24, color: "#FFF" }}>-</Text>
                    </TouchableOpacity>

                    <Text
                      style={{
                        fontSize: 20,
                        paddingLeft: hp("1"),
                        paddingRight: hp("1"),
                      }}
                    >
                      {quantity}
                    </Text>

                    <TouchableOpacity
                      style={styles.quantityBtns}
                      onPress={() => {
                        if (quantity <= isNullRetNull(product.quantity, 0)) {
                          this.setStateObj({ quantity: quantity + 1 });
                        }
                      }}
                    >
                      <Text style={{ fontSize: 22, color: "#FFF" }}>+</Text>
                    </TouchableOpacity>
                  </Row>
                </Row>

                <TouchableOpacity
                  disabled={
                    quantity < 1 || isNullRetNull(product.quantity, 0) < 1
                  }
                  style={[
                    styles.addToCart,
                    quantity < 1 || isNullRetNull(product.quantity, 0) < 1
                      ? { opacity: 0.5 }
                      : {},
                  ]}
                  onPress={() => {
                    this.addToCart(product, quantity);
                  }}
                >
                  <Text style={{ fontSize: 20, color: "#FFF" }}>
                    {isNullRetNull(product.quantity, 0) < 1
                      ? "Out of Stock"
                      : "Add to Cart"}
                  </Text>
                </TouchableOpacity>
              </Row>
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

          <CartListModal
            navigation={this.props.navigation}
            product={{ ...product, selectedColor: "", selectedQuantity: 1 }}
            isShowModal={isShowCartList}
            onCloseBtn={() => {
              this.setStateObj({ isShowCartList: false });
            }}
          />

          <MyBagModal
            navigation={this.props.navigation}
            product={{
              ...product,
              selectedColor: productColor,
              selectedQuantity: quantity,
            }}
            isShowModal={isShowMyBag}
            onCloseBtn={() => {
              this.setStateObj({ isShowMyBag: false });
            }}
          />

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

          {/* <Footer
            navigation={this.props.navigation}
            onNavigate={this.props.onNavigate}
            toggleDrawer={() => {
              if(this.props.onNavigate) this.props.onNavigate()
              this.setStateObj({ isShowBottomModal: !isShowBottomModal });
            }}
          /> */}
        </Grid>
      </>
    );
  }
}

const styles = StyleSheet.create({
  detailsRow: {
    flexDirection: "column",
    paddingLeft: hp("4"),
    paddingRight: hp("4"),
    paddingBottom: hp("2"),
  },

  grid: {
    height: hp("100"),
    width: wp("100"),
  },
  cardsCol: {
    alignItems: "center",
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
  },
  img: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
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
  colorCircle: {
    borderWidth: 0.4,
    margin: hp("0.5"),
    height: hp("5"),
    width: hp("5"),
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  quantityBtns: {
    height: hp("4"),
    width: hp("4"),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    backgroundColor: "#19b24b",
  },
  addToCart: {
    marginTop: hp("4"),
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    height: hp("7"),
    width: wp("60"),
    backgroundColor: "#19b24b",
  },
  viewCartBtn: {
    height: hp("4"),
    width: wp("26"),
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
  quantityBtnRow: {
    width: wp("20"),
    alignSelf: "center",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(productDetails);

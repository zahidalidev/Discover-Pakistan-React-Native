import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  View,
} from "react-native";
import { Row } from "react-native-easy-grid";
import Expo from "expo-constants";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { connect } from "react-redux";
import {
  mapStateToProps,
  mapDispatchToProps,
} from "../../Redux/Actions/userActions";
import Icon from "react-native-vector-icons/FontAwesome";

import DrawerIcon from "./../../Assets/svg/Menu_Bar_Icon-24px.svg";
import DiscoverPakEngIcon from "./../../Assets/svg/Discover_Pakistan_Small_Icon.svg";
import DiscoverPakUrduIcon from "./../../Assets/svg/Discover_Pakistan_Urdu.svg";
import SearchBox from "./searchBox";
import SubHeader2 from "./SubHeader";
import { isNullRetNull } from "../../Helpers/general";

class Header2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDropDown: false,
    };
  }

  UNSAFE_componentWillMount() {
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
      navigation,
      isShowSearch,
      isShowSubHeader,
      filterFun,
      tempArray,
      toggleDrawer,
      renderPlayer,
      userData,
      isDropDown,
      setDropDown,
      containerStyle,
    } = this.props;

    const isRenderPlayer =
      this.props.isRenderPlayer !== undefined
        ? this.props.isRenderPlayer
        : true;

    return (
      <View style={styles.containerStyle}>
        <Row style={styles.headRow}>
          <TouchableOpacity
            style={styles.drawerBtn}
            onPress={() => {
              navigation.toggleDrawer();
            }}
          >
            <DrawerIcon width={wp("6")} />
          </TouchableOpacity>

          <DiscoverPakEngIcon width={wp("18")} />
          <DiscoverPakUrduIcon width={wp("24")} />
          <Row style={styles.profileRow}>
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={styles.profileName}
            >
              {isNullRetNull(userData.name, "")}
            </Text>
            <TouchableOpacity
              style={styles.profileImg}
              onPress={() => {
                if (setDropDown) {
                  setDropDown(!isDropDown);
                }
              }}
            >
              {this.props.isLoggedIn ? (
                <Image
                  source={{ uri: isNullRetNull(userData.img, "https://") }}
                  style={styles.profileImg}
                />
              ) : (
                <Icon name="user" size={hp("2")} color="#333" />
              )}
            </TouchableOpacity>
          </Row>
        </Row>

        {isShowSearch && (
          <SearchBox
            {...this.props}
            tempArray={tempArray}
            filterFun={filterFun}
          />
        )}
        {isRenderPlayer && (
          <Row style={styles.webViewRow}>{renderPlayer && renderPlayer()}</Row>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headRow: {
    height: hp("6"),
    width: wp("100"),
    marginTop: Expo.statusBarHeight,
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: wp("3"),
    paddingLeft: wp("3"),
  },
  drawerBtn: {
    justifyContent: "center",
    height: hp("7"),
  },
  profileRow: {
    height: "100%",
    alignItems: "center",
    width: wp("30"),
    paddingLeft: wp("2"),
    justifyContent: "flex-end",
  },
  profileName: {
    color: "#333333",
    fontSize: 12,
    marginRight: wp("2"),
    ...Platform.select({ ios: {}, android: {} }),
  },
  profileImg: {
    height: hp("3"),
    width: hp("3"),
    borderWidth: 0.7,
    borderColor: "gray",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  webViewRow: {
    backgroundColor: "#FFFFFF",
    height: hp("25"),
    width: wp("100"),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Header2);

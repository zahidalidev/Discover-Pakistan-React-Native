import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import {
  mapStateToProps,
  mapDispatchToProps,
} from "../../Redux/Actions/userActions";
import { Row } from "react-native-easy-grid";
import { connect } from "react-redux";
import { Video } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
// import { ScreenOrientation } from 'expo';

import PlayGreenIcon from "./../../Assets/svg/Video_Play-24px.svg";
import PlayIcon from "./../../Assets/player_icons/Play-24px.svg";
import PauseIcon from "./../../Assets/player_icons/Pause-24px.svg";
import PreviousIcon from "./../../Assets/player_icons/Play_Previous-24px.svg";
import NextIcon from "./../../Assets/player_icons/Play_Next-24px.svg";
import UnMutedIcon from "./../../Assets/player_icons/Volume_Unmute-24px.svg";
import MutedIcon from "./../../Assets/player_icons/Volume-24px.svg";
import SettingsIcon from "./../../Assets/player_icons/Settings-24px.svg";
import FullScreenIcon from "./../../Assets/player_icons/Full_Screen-24px.svg";
import DefaultViewIcon from "./../../Assets/player_icons/Default_View-24px.svg";
import LiveRedIcon from "./../../Assets/player_icons/Live-24px.svg";
import { Platform } from "react-native";

class LivePlayer extends React.Component {
  _isMounted = false;
  isVideoLoaded = false;
  constructor(props) {
    super(props);
    this.state = {
      isVideoLoaded: false,
      orientationIsLandscape: false
    };
  }
  componentDidMount() {
    // subscribe to future changes
    // console.log("***** HANJEEE ");
    // const subscription = ScreenOrientation.addOrientationChangeListener(
    //   (event) => console.log(event)
    // );
    // console.log("***** HANJEEE ");
    // ScreenOrientation.addOrientationChangeListener((event) => {
    //   console.log("********");
    //   console.log(event);
    //   if (event.orientationInfo === "landscape") {
    //     this.videoRef.presentFullscreenPlayerAsync();
    //   } else if (event.orientationInfo === "portrait") {
    //     this.videoRef.dismissFullscreenPlayer();
    //   }
    // });
  }
  async UNSAFE_componentWillMount() {
    this._isMounted = true;
    // console.log("******* I HERER ****");
    // let orientation = await ScreenOrientation.getOrientationAsync();
    // console.log(ScreenOrientation.Orientation);
    // console.log("******* I HERER ****");
    if (this._isMounted) {
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
    // ScreenOrientation.removeOrientationChangeListeners();
  }

  setStateObj(obj) {
    if (this._isMounted) {
      this.setState({ ...this.state, ...obj });
    }
  }


  render() {
    const {
      source,
      playAsync,
      setIsMutedAsync,
      isPlay,
      isMuted,
      isLooping,
      refs,
    } = this.props;

    const { isVideoLoaded } = this.state;

    // console.log(this.videoRef)

    return (

      <>
        <Row style={styles.playerRow}>
          <Video
            ref={(videoRef) => {
              this.videoRef = videoRef;
              if (refs) {
                refs(videoRef);
              }
            }}
            source={source}
            // onFullscreenUpdate={(orientation) => console.log(orientation)}
            onPlaybackStatusUpdate={(data) => {
              !isVideoLoaded && this.setStateObj({ isVideoLoaded: data.isLoaded });
              if (data.isLoaded) {
                // playAsync(true);
              }
            }}
            rate={1.0}
            isBuffering={true}
            volume={1.0}
            isMuted={isMuted ? isMuted : false}
            resizeMode="cover"
            shouldPlay={isPlay ? isPlay : false}
            isLooping={isLooping ? isLooping : false}
            style={styles.playerStyle}

            onFullscreenUpdate={async () => {
              // ScreenOrientation.addOrientationChangeListener((event) => {
              //   console.log("orientation changed: ", event.orientationInfo.orientation);
              // }
              // );

              await ScreenOrientation.lockAsync(
                this.state.orientationIsLandscape ? ScreenOrientation.OrientationLock.LANDSCAPE :
                  ScreenOrientation.OrientationLock.PORTRAIT,
              );
              this.setState({ orientationIsLandscape: !this.state.orientationIsLandscape });
            }}

          />

          {!isVideoLoaded && (
            <Row
              style={{
                position: "absolute",
                alignSelf: "center",
                width: wp("100"),
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ActivityIndicator size="large" color="#FFF" />
            </Row>
          )}

          {!isPlay && isVideoLoaded && (
            <Row style={styles.playBtnRow}>
              <TouchableOpacity
                onPress={() => {
                  playAsync(!isPlay);
                }}
              >
                <PlayGreenIcon width={hp("8")} />
              </TouchableOpacity>
            </Row>
          )}

          <Row style={styles.playerControls}>
            <TouchableOpacity style={styles.controlsBtn} onPress={() => { }}>
              <PreviousIcon width={hp("1.5")} />
            </TouchableOpacity>

            <TouchableOpacity
              disabled={!isVideoLoaded}
              style={styles.controlsBtn}
              onPress={() => {
                playAsync(!isPlay);
              }}
            >
              {isPlay ? (
                <PauseIcon width={hp("1.5")} />
              ) : (
                <PlayIcon width={hp("1.5")} />
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.controlsBtn} onPress={() => { }}>
              <NextIcon width={hp("1.5")} />
            </TouchableOpacity>

            <TouchableOpacity
              disabled={!isVideoLoaded}
              style={styles.controlsBtn}
              onPress={() => {
                setIsMutedAsync(!isMuted);
              }}
            >
              {isMuted ? (
                <UnMutedIcon width={hp("1.5")} />
              ) : (
                <MutedIcon width={hp("2")} />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              disabled={true}
              style={[styles.controlsBtn, { marginLeft: hp("2") }]}
            >
              <LiveRedIcon width={hp("5")} />
            </TouchableOpacity>

            {/* <TouchableOpacity
                        style={[styles.controlsBtn, { right:hp('7'), position:'absolute' }]}
                        onPress={()=>{
                            
                        }}>
                        <SettingsIcon width={hp('1.8')} />
                    </TouchableOpacity> */}

            <TouchableOpacity
              style={[
                styles.controlsBtn,
                { right: hp("4"), position: "absolute" },
              ]}
              onPress={() => { }}
            >
              <DefaultViewIcon width={hp("1.8")} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.controlsBtn,
                { right: hp("1"), position: "absolute" },
              ]}
              onPress={() => {
                playAsync(false);
                this.videoRef.presentFullscreenPlayerAsync();
              }}
            >
              <FullScreenIcon width={hp("1.6")} />
            </TouchableOpacity>
          </Row>
        </Row>
      </>
    );
  }
}

const styles = StyleSheet.create({
  playerRow: {
    width: wp("100"),
    height: hp("25"),
    resizeMode: "contain",
    backgroundColor: "black",
  },
  playerStyle: {
    width: wp("100"),
    height: "100%",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  playBtnRow: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    left: hp("2"),
  },
  playerControls: {
    position: "absolute",
    alignItems: "center",
    paddingRight: 10,
    paddingLeft: 10,
    height: "15%",
    width: "100%",
    bottom: 0,
  },
  controlsBtn: {
    width: wp("6"),
    height: hp("4"),
    alignItems: "center",
    justifyContent: "center",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LivePlayer);

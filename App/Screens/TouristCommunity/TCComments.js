import React from "react";
import {
  StyleSheet,
  Text,
  Image,
  Platform,
  TouchableOpacity,
  I18nManager,
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
import { Loader, ProfileDropDown } from "../Component";
import Header from "../Component/Header";
import DrawerModal from "../Component/DrawerModal";
import Footer from "../Component/Footer";
import {
  getDiffInDates,
  isEmpty,
  isNullRetNull,
  sortCommunityComments,
} from "../../Helpers/general";
import FooterDrawerModal from "../Component/FooterDrawerModal";
import YoutubeLikeIcon from "./../../Assets/svg/youtube_like.svg";
import BackIcon from "./../../Assets/svg/return.svg";

import YoutubeDislikeIcon from "./../../Assets/svg/youtube_dislike.svg";
import SearchBox from "../Component/searchBox";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { URI } from "../../Constants";
import Api from "../../Constants/Api";

class TCComments extends React.Component {
  Loader = true;
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      isShowMidModal: false,
      isShowBottomModal: false,
      isDropDown: false,
      community: this.props.community,
      commentsList: [],
      commentsObj: {},
      isShowComment: {},
      editedData: {},
      isUpdate: false,
    };
  }

  async UNSAFE_componentWillMount() {
    this._isMounted = true;
    if (this._isMounted) {
      this.getComments(this.state.community.community_id);
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  setStateObj(obj) {
    if (this._isMounted) {
      this.setState({ ...this.state, ...obj });
    }
  }

  getComments(cid) {
    this.setStateObj({ loader: true });
    let payload = {
      uri: URI.GET_COMMUNITIES_COMMENTS,
      method: "post",
      data: {
        user_id: Number(this.props.userData.user_id),
        community_id: cid,
      },
    };
    Api(payload)
      .then((res) => {
        if (res.data.length > 0) {
          console.log("COMMENTS ", res.data);
          let comments = sortCommunityComments(res.data);
          this.setStateObj({
            loader: false,
            commentsList: comments,
            commentsObj: {},
            isShowCommentBox: {},
          });
        } else {
          this.setStateObj({ loader: false });
        }
      })
      .catch((err) => {
        this.setStateObj({ loader: false });
        alert("Unkown Error " + err);
      });
  }

  doCommentLikeDisLike(data, is_like = "1") {
    if (isEmpty(this.props.userData) || !this.props.isLoggedIn) {
      //   this.props.navigation.navigate("Signin", { isGoBack: "goBack" });
      return;
    }
    let commentId = data.comment_id;
    this.setStateObj({ loader: true });
    let payload = {
      uri: URI.COMMUNITY_LIKE_DISLIKE,
      method: "post",
      data: {
        member_id: Number(this.props.userData.user_id),
        comment_id: commentId,
        like_unlike: is_like,
      },
    };
    Api(payload)
      .then((res) => {
        if (res.data.message === "success") {
          alert(res.data.data);
        }
        this.getComments(this.state.community.community_id);
        this.setStateObj({ loader: false });
      })
      .catch((err) => {
        this.setStateObj({ loader: false });
        alert("Unkown Error " + err);
      });
  }

  doComment(community_id, cid = "", pid = 0) {
    if (isEmpty(this.props.userData) || !this.props.isLoggedIn) {
      //   this.props.navigation.navigate("Signin", { isGoBack: "goBack" });
      return;
    }
    this.setStateObj({ loader: true });
    let payload = {
      uri: URI.ADD_COMMUNITY_COMMENT,
      method: "post",
      data: {
        user_id: Number(this.props.userData.user_id),
        community_id: community_id,
        parent_comment_id: pid,
        comment: this.state.commentsObj[cid],
      },
    };
    Api(payload)
      .then((res) => {
        if (res.data.message === "success") {
          this.getComments(community_id);
        } else {
          this.setStateObj({ loader: false });
        }
      })
      .catch((err) => {
        this.setStateObj({ loader: false });
        alert("Unkown Error " + err);
      });
  }

  deleteComment(cid) {
    if (isEmpty(this.props.userData) || !this.props.isLoggedIn) {
      //   this.props.navigation.navigate("Signin", { isGoBack: "goBack" });
      return;
    }
    this.setStateObj({ loader: true });
    let payload = {
      uri: URI.DEL_COMMUNITY_COMMENT,
      method: "post",
      data: {
        user_id: Number(this.props.userData.user_id),
        comment_id: cid,
      },
    };
    Api(payload)
      .then((res) => {
        if (res.data.message === "success") {
          this.getComments(this.state.community.community_id);
        } else {
          this.setStateObj({ loader: false });
        }
      })
      .catch((err) => {
        this.setStateObj({ loader: false });
        alert("Unkown Error \n" + err);
      });
  }

  updateComment() {
    if (isEmpty(this.props.userData) || !this.props.isLoggedIn) {
      //   this.props.navigation.navigate("Signin", { isGoBack: "goBack" });
      return;
    }
    this.setStateObj({ loader: true });
    let payload = {
      uri: URI.UPDATE_COMMUNITY_COMMENT,
      method: "post",
      data: {
        user_id: Number(this.props.userData.user_id),
        parent_comment_id: this.state.editedData.parent_comment_id,
        community_id: this.state.community.community_id,
        comment_id: this.state.editedData.comment_id,
        comment: this.state.editedData.comment,
      },
    };
    Api(payload)
      .then((res) => {
        if (res.data.message === "success") {
          this.getComments(this.state.community.community_id);
        } else {
          this.setStateObj({ loader: false });
        }
      })
      .catch((err) => {
        this.setStateObj({ loader: false });
        alert("Unkown Error \n" + err);
      });
  }

  render() {
    const {
      loader,
      isShowMidModal,
      isShowBottomModal,
      isDropDown,
      community,
      commentsObj,
      isShowCommentBox,
      commentsList,
      isUpdate,
      editedData,
    } = this.state;

    const { userData } = this.props;

    console.log("COMMUNITY ", community.community_id);

    return (
      <>
        <Loader isLoader={loader} />
        {/* <Text>Hello2</Text> */}
        {/* <Grid style={styles.grid}> */}
        {/* <Text>Hello</Text> */}
        {/* <Row style={{ width: wp("100"), height: "11%" }}> */}
        {/* <Header
              isDropDown={isDropDown}
              setDropDown={(isActive) => {
                this.setStateObj({ isDropDown: isActive });
              }}
              navigation={this.props.navigation}
              toggleDrawer={() => {
                this.setStateObj({ isShowMidModal: !isShowMidModal });
              }}
              isRenderPlayer={false}
            /> */}
        {/* </Row> */}
        {/* 
          <Row style={{ width: wp("100"), height: hp("6") }}>
            <SearchBox tempArray={[]} filterFun={(data) => {}} />
          </Row> */}

        <ScrollView>
          <Row style={styles.headMainRow}>
            <Text
              ellipsizeMode="tail"
              numberOfLines={2}
              style={styles.headText}
            >
              {`MEMBERS - ${isNullRetNull(community.name, "").toUpperCase()}`}
            </Text>
          </Row>

          <Row style={styles.row02}>
            <Row style={{ height: hp("6"), width: "100%" }}>
              {/* <Image
                  source={{ uri: isNullRetNull(userData.img) }}
                  style={[styles.commentUserImg]}
                /> */}
              <TextInput
                style={styles.addCommentBox}
                multiline
                placeholder={"Add a Comments"}
                onChangeText={(char) => {
                  this.setStateObj({
                    commentsObj: { [`cc_${community.community_id}`]: char },
                  });
                }}
              />
            </Row>

            <TouchableOpacity
              style={styles.submitBtn}
              onPress={() => {
                this.doComment(
                  community.community_id,
                  `cc_${community.community_id}`,
                  0
                );
              }}
            >
              <Text>Submit</Text>
            </TouchableOpacity>
          </Row>

          {commentsList.map((item, i) => {
            return (
              <Row key={i} style={styles.videoCommentsView}>
                <Row>
                  <Image
                    source={{ uri: isNullRetNull(item.img) }}
                    style={styles.commentUserImg}
                  />
                  <Row style={styles.commentRow}>
                    <Row
                      style={{
                        alignItems: "center",
                        marginBottom: hp("0.5"),
                      }}
                    >
                      <Text style={{}}>{isNullRetNull(item.name, "")} </Text>
                      <Text style={{ color: "gray", fontSize: 12 }}>
                        {getDiffInDates(
                          isNullRetNull(item.date, "").split(" ")[0]
                        )}
                      </Text>
                    </Row>

                    <Text style={{ color: "gray", fontSize: 12 }}>
                      {isNullRetNull(item.comment, "")}
                    </Text>

                    <Row style={{ alignItems: "center", marginTop: hp("1") }}>
                      <TouchableOpacity
                        style={{ marginRight: hp("1") }}
                        onPress={() => {
                          isShowCommentBox[
                            "c" + isNullRetNull(item.comment_id)
                          ] = true;
                          this.setStateObj({
                            isShowCommentBox,
                            isUpdate: false,
                            editedData: {},
                          });
                        }}
                      >
                        <Text style={styles.commentProperties}>Reply</Text>
                      </TouchableOpacity>

                      <Text style={styles.commentProperties}>
                        {isNullRetNull(item.likes, 0)}
                      </Text>
                      <Row style={styles.likeDislikeBtn}>
                        <TouchableOpacity
                          onPress={() => {
                            this.doCommentLikeDisLike(item, "1");
                          }}
                        >
                          <YoutubeLikeIcon
                            width="15px"
                            height="15px"
                            fill={
                              isNullRetNull(item.is_like_dislike) === "true"
                                ? "#19b24b"
                                : "#333"
                            }
                          />
                        </TouchableOpacity>
                      </Row>
                      <Row style={styles.likeDislikeBtn}>
                        <TouchableOpacity
                          onPress={() => {
                            this.doCommentLikeDisLike(item, "-1");
                          }}
                        >
                          <YoutubeDislikeIcon
                            width="15px"
                            height="15px"
                            fill={
                              isNullRetNull(item.is_like_dislike) === "false"
                                ? "#19b24b"
                                : "#333"
                            }
                          />
                        </TouchableOpacity>
                      </Row>
                      <Text style={styles.commentProperties}>
                        {isNullRetNull(item.dislikes, 0)}
                      </Text>
                      {item.comment_sender_name === userData.user_id && (
                        <>
                          <TouchableOpacity
                            style={{ marginRight: hp("1") }}
                            onPress={() => {
                              isShowCommentBox[
                                "c" + isNullRetNull(item.comment_id)
                              ] = true;
                              this.setStateObj({
                                isShowCommentBox,
                                isUpdate: true,
                                editedData: item,
                              });
                            }}
                          >
                            <Text
                              style={[styles.commentProperties, { left: 4 }]}
                            >
                              Edit
                            </Text>
                          </TouchableOpacity>

                          <TouchableOpacity
                            style={{ marginRight: hp("1") }}
                            onPress={() => {
                              this.deleteComment(item.comment_id);
                            }}
                          >
                            <Text
                              style={[styles.commentProperties, { left: 4 }]}
                            >
                              Delete
                            </Text>
                          </TouchableOpacity>
                        </>
                      )}
                    </Row>

                    <Row style={styles.replySectionMainRow}>
                      {item.replies &&
                        item.replies.map((child, j) => {
                          return (
                            <Row key={j} style={{ marginBottom: 10 }}>
                              <Image
                                source={{ uri: isNullRetNull(child.img) }}
                                style={styles.commentUserImg}
                              />
                              <Row style={styles.commentRow}>
                                <Row
                                  style={{
                                    alignItems: "center",
                                    marginBottom: hp("0.5"),
                                  }}
                                >
                                  <Text style={{}}>
                                    {isNullRetNull(child.name)}{" "}
                                  </Text>
                                  <Text style={{ color: "gray", fontSize: 12 }}>
                                    {getDiffInDates(
                                      isNullRetNull(child.date, "").split(
                                        " "
                                      )[0]
                                    )}
                                  </Text>
                                </Row>

                                <Text style={{ color: "gray", fontSize: 12 }}>
                                  {isNullRetNull(child.comment)}
                                </Text>

                                <Row
                                  style={{
                                    alignItems: "center",
                                    marginTop: hp("1"),
                                  }}
                                >
                                  <TouchableOpacity
                                    style={{ marginRight: hp("1") }}
                                    onPress={() => {
                                      isShowCommentBox[
                                        "c" + isNullRetNull(item.comment_id)
                                      ] = true;
                                      this.setStateObj({
                                        isShowCommentBox,
                                        isUpdate: false,
                                        editedData: {},
                                      });
                                    }}
                                  >
                                    <Text style={styles.commentProperties}>
                                      Reply
                                    </Text>
                                  </TouchableOpacity>

                                  <Text style={styles.commentProperties}>
                                    {isNullRetNull(child.likes, 0)}
                                  </Text>
                                  <Row style={styles.likeDislikeBtn}>
                                    <TouchableOpacity
                                      onPress={() => {
                                        this.doCommentLikeDisLike(child, "1");
                                      }}
                                    >
                                      <YoutubeLikeIcon
                                        width="15px"
                                        height="15px"
                                        fill={
                                          isNullRetNull(
                                            child.is_like_dislike
                                          ) === "true"
                                            ? "#19b24b"
                                            : "#333"
                                        }
                                      />
                                    </TouchableOpacity>
                                  </Row>
                                  <Row style={styles.likeDislikeBtn}>
                                    <TouchableOpacity
                                      onPress={() => {
                                        this.doCommentLikeDisLike(child, "-1");
                                      }}
                                    >
                                      <YoutubeDislikeIcon
                                        width="15px"
                                        height="15px"
                                        fill={
                                          isNullRetNull(
                                            child.is_like_dislike
                                          ) === "false"
                                            ? "#19b24b"
                                            : "#333"
                                        }
                                      />
                                    </TouchableOpacity>
                                  </Row>
                                  <Text style={styles.commentProperties}>
                                    {isNullRetNull(child.dislikes, 0)}
                                  </Text>

                                  {child.comment_sender_name ===
                                    userData.user_id && (
                                    <>
                                      <TouchableOpacity
                                        style={{ marginRight: hp("1") }}
                                        onPress={() => {
                                          isShowCommentBox[
                                            "c" + isNullRetNull(item.comment_id)
                                          ] = true;
                                          this.setStateObj({
                                            isShowCommentBox,
                                            isUpdate: true,
                                            editedData: child,
                                          });
                                        }}
                                      >
                                        <Text
                                          style={[
                                            styles.commentProperties,
                                            { left: 4 },
                                          ]}
                                        >
                                          Edit
                                        </Text>
                                      </TouchableOpacity>

                                      <TouchableOpacity
                                        style={{ marginRight: hp("1") }}
                                        onPress={() => {
                                          this.deleteComment(child.comment_id);
                                        }}
                                      >
                                        <Text
                                          style={[
                                            styles.commentProperties,
                                            { left: 4 },
                                          ]}
                                        >
                                          Delete
                                        </Text>
                                      </TouchableOpacity>
                                    </>
                                  )}
                                </Row>
                              </Row>
                            </Row>
                          );
                        })}
                    </Row>
                    {isShowCommentBox["c" + item.comment_id] && (
                      <Row
                        style={{
                          flexDirection: "column",
                          width: "100%",
                          alignItems: "flex-end",
                          right: wp("2"),
                        }}
                      >
                        <TextInput
                          style={styles.replyAddCommentBox}
                          value={isUpdate ? editedData.comment : undefined}
                          multiline
                          placeholder={"Add a Comments"}
                          onChangeText={(char) => {
                            if (isUpdate) {
                              this.setStateObj({
                                editedData: { ...editedData, comment: char },
                              });
                            } else {
                              this.setStateObj({
                                commentsObj: {
                                  [`c_${item.comment_id}`]: char,
                                },
                              });
                            }
                          }}
                        />
                        <TouchableOpacity
                          style={styles.replySubmitBtn}
                          onPress={() => {
                            if (isUpdate) {
                              this.updateComment();
                            } else {
                              this.doComment(
                                community.community_id,
                                `c_${item.comment_id}`,
                                item.comment_id
                              );
                            }
                          }}
                        >
                          <Text>{isUpdate ? "Update" : "Submit"}</Text>
                        </TouchableOpacity>
                      </Row>
                    )}
                  </Row>
                </Row>
              </Row>
            );
          })}
        </ScrollView>

        {/* <ProfileDropDown
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
          /> */}
        {/* </Grid> */}
      </>
    );
  }
}

const styles = StyleSheet.create({
  grid: {
    paddingBottom: hp("6"),
    width: wp("100"),
  },
  headText: {
    left: wp("4"),
    width: wp("86"),
    alignSelf: "center",
    fontWeight: "400",
    fontSize: 18,
  },
  headMainRow: {
    alignItems: "center",
    justifyContent: "center",
    // paddingBottom: hp("6"),
    width: wp("100"),
    marginTop: hp("6"),
  },
  row02: {
    height: hp("16"),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    textAlign: "center",
  },
  videoCommentsView: {
    width: wp("100"),
    alignItems: "center",
    marginBottom: hp("1"),
  },
  commentUserImg: {
    width: wp("9"),
    height: wp("9"),
    borderRadius: 100,
    borderColor: "#333",
    borderWidth: 0.5,
    marginLeft: hp("1"),
  },
  commentRow: {
    padding: hp("1"),
    backgroundColor: "#fff",
    marginLeft: hp("1"),
    marginRight: hp("1"),
    shadowOffset: { width: 1, height: 1 },
    elevation: 1,
    shadowColor: "#c3c3c3",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    flexDirection: "column",
  },

  addCommentBox: {
    backgroundColor: "#FFF",
    color: "gray",
    height: hp("6"),
    paddingLeft: hp("1"),
    paddingRight: hp("1"),
    width: "90%",
    marginLeft: hp("2.5"),
    shadowColor: "gray",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  submitBtn: {
    backgroundColor: "gray",
    opacity: 0.5,
    alignSelf: "flex-end",
    height: hp("4"),
    paddingLeft: hp("1"),
    paddingRight: hp("1"),
    width: "90%",
    marginLeft: hp("2.5"),
    alignItems: "center",
    justifyContent: "center",
    marginRight: hp("2"),
    marginTop: hp("1"),
  },

  replyAddCommentBox: {
    backgroundColor: "#FFF",
    color: "gray",
    height: hp("5"),
    paddingLeft: hp("1"),
    paddingRight: hp("1"),
    width: "78%",
    backgroundColor: "#d3d3d3",
    shadowColor: "#c3c3c3",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  replySubmitBtn: {
    backgroundColor: "#c3c3c3",
    opacity: 0.5,
    height: hp("3"),
    paddingLeft: hp("1"),
    paddingRight: hp("1"),
    width: "78%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: hp("1"),
  },

  commentProperties: {
    color: "gray",
    fontSize: 12,
    fontWeight: "500",
  },
  likeDislikeBtn: {
    opacity: 0.5,
    alignItems: "center",
    justifyContent: "center",
    height: hp("3"),
    width: hp("3"),
  },
  replySectionMainRow: {
    flexDirection: "column",
    width: "97%",
    marginLeft: wp("3"),
    marginTop: hp("1.2"),
  },
  goBackBtn: {
    width: hp("3"),
    zIndex: 2,
    position: "absolute",
    left: hp("1.5"),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TCComments);

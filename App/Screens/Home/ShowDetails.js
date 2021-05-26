import React from 'react';
import { StyleSheet, Text, Image, View, Platform, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { Grid, Row } from 'react-native-easy-grid';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../Redux/Actions/userActions';
import { Loader, ProfileDropDown } from '../Component';
import Header from '../Component/Header';
import DrawerModal from '../Component/DrawerModal';
import Footer from '../Component/Footer';
import { isNullRetNull, getDiffInDates, displayMessage, getUrl, isEmpty, sortComments } from './../../Helpers/general'
import FooterDrawerModal from '../Component/FooterDrawerModal';

import PlayIcon from './../../Assets/svg/Video_Play-24px.svg';
import YoutubeLikeIcon from './../../Assets/svg/youtube_like.svg';
import YoutubeDislikeIcon from './../../Assets/svg/youtube_dislike.svg';
import FavouriteIcon from './../../Assets/svg/liked_icon.svg';
import CrossIcon from './../../Assets/svg/close.svg';
import UpAndDownIcon from './../../Assets/svg/up-and-down.svg';
import WatchLaterIcon from './../../Assets/svg/watch_later.svg';

import LivePlayer from '../Component/LivePlayer';
import { CONSTANTS, URI } from '../../Constants';
import SearchBox from '../Component/searchBox';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import Api from '../../Constants/Api';
import WebView from 'react-native-webview';

class ShowDetails extends React.Component {
    Loader = true;
    _isMounted = false;
    constructor(props){
        super(props);
        this.state = {
            loader:false,
            isWebView:false,
            isShowComment:false,
            isShowMidModal:false,
            isShowBottomModal: false,
            data:{},
            array:[],
            tempArray:[],
            categoryName: isNullRetNull(this.props.navigation.getParam("category")),
            screen: isNullRetNull(this.props.navigation.getParam("screen")),
            video: isNullRetNull(this.props.navigation.getParam("video")),
            isDropDown:false,
            isPlay:false,
            isMuted:false,
            liveUrl:CONSTANTS.LIVE_URL,
            commentsList:[],
            isShowCommentBox:{},
            commentsObj:{},
            editedData:{},
            isUpdate:false,
        }
    }

    async UNSAFE_componentWillMount(){
        this._isMounted = true;
        const { screen, video } = this.state;
        if (this._isMounted) {
            this.setStateObj({ array:this.props.getCatDetails, tempArray:this.props.getCatDetails })
        }
        if(screen === 'Search'){
            this.getSingleVideo(video.slug)
        }
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    setStateObj(obj){
        if(this._isMounted){ this.setState((state)=>{  return { state, ...obj } }) }
    }

    getSingleVideo(slug){
        this.setStateObj({ loader:true })
        let payload = {
            uri:`${URI.GET_SINGLE_VIDEO}?slug=${slug}`,
            method:'get',
            data:{
              user_id:''
            }
        }
        Api(payload)
        .then((res)=>{
            this.setStateObj({ loader:false })
            if(res.data.message === 'success'){
                this.getVideoBySlug(res.data.data[0])
            }
        })
        .catch((err)=>{
            this.setStateObj({ loader:false })
            alert("Unkown Error \n"+ err)
        })
    }

    playVideo(data){
        this.Loader = true;
        this.setStateObj({ data:data });
    }

    getVideoBySlug(detail){
        this.Loader = true;
        this.setStateObj({ loader: true, data:detail });
        this.getComments(detail.videos_id)
    }

    addFavorite(data, is_favourite=false){
        if(isEmpty(this.props.userData) || !this.props.isLoggedIn){
            this.props.navigation.navigate("Signin", { isGoBack:'goBack' })
            return;
        }
        let videoId = data.videos_id;
        this.setStateObj({ loader: true });
        let payload = {
            uri:is_favourite ? URI.RM_FAVORITE : URI.ADD_FAVORITE,
            method:'post',
            data:{
                user_id: Number(this.props.userData.user_id),
                videos_id:videoId
            }
        }
        Api(payload)
            .then((res)=>{
                data['is_favourite'] = !is_favourite;
                this.setStateObj({ loader: false });
                displayMessage(res)
            })
            .catch((err)=>{
                this.setStateObj({ loader: false });
                alert("Unkown Error "+ err)
            })
    }

    addInWatchLater(data, is_watch_later=false){
        if(isEmpty(this.props.userData) || !this.props.isLoggedIn){
            this.props.navigation.navigate("Signin", { isGoBack:'goBack' })
            return;
        }
        let videoId = data.videos_id;
        this.setStateObj({ loader: true });
        let payload = {
            uri: is_watch_later ? URI.REMOVE_WATCH_LATER : URI.ADD_WATCH_LATER,
            method:'post',
            data:{
                user_id: Number(this.props.userData.user_id),
                video_id:videoId
            }
        }
        if(is_watch_later){
            payload['data']['wish_list_id'] = videoId
        }
        Api(payload)
            .then((res)=>{
                if(res.data.message === "success"){
                    data['is_watch_later'] = !is_watch_later;
                    alert(res.data.data)
                }
                this.setStateObj({ loader: false });
            })
            .catch((err)=>{
                this.setStateObj({ loader: false });
                alert("Unkown Error "+ err)
            })
    }

    doVideoLikeDisLike(data, is_like='1'){
        if(isEmpty(this.props.userData) || !this.props.isLoggedIn){
            this.props.navigation.navigate("Signin", { isGoBack:'goBack' })
            return;
        }
        let videoId = data.videos_id;
        this.setStateObj({ loader: true });
        let payload = {
            uri: URI.VIDEO_LIKE_DISLIKE,
            method:'post',
            data:{
                user_id: Number(this.props.userData.user_id),
                video_id:videoId,
                like_dislike:is_like
            }
        }
        Api(payload)
            .then((res)=>{
                if(res.data.message === "success"){
                    if(is_like === '1'){
                        data['is_like_dislike'] = true
                        if(data['total_dislikes']) data['total_dislikes'] = Number(isNullRetNull(data['total_dislikes'],0))-1
                        data['total_likes'] = Number(isNullRetNull(data['total_likes'],0))+1
                    }
                    if(is_like === '-1'){
                        data['is_like_dislike'] = false
                        if(data['total_likes']) data['total_likes'] = Number(isNullRetNull(data['total_likes'],0))-1
                        data['total_dislikes'] = Number(isNullRetNull(data['total_dislikes'],0))+1
                    }
                }
                this.setStateObj({ loader: false });
            })
            .catch((err)=>{
                this.setStateObj({ loader: false });
                alert("Unkown Error "+ err)
            })
    }

    getComments(vid, cid){
        let payload = {
            uri:URI.GET_COMMENTS,
            method:'post',
            data:{
                user_id:Number(this.props.userData.user_id),
                v_id:vid
            }
        }
        Api(payload)
            .then((res)=>{
                if(res.data.length > 0){
                    let comments = sortComments(res.data)
                    this.setStateObj({ loader:false, commentsList:comments, isWebView:true, commentsObj:{}, isShowCommentBox:{} });
                }else{
                    this.setStateObj({ loader:false, isWebView:true });
                }
            })
            .catch((err)=>{
                this.setStateObj({ loader:false });
                alert("Unkown Error "+ err)
            })
    }

    doComment(vid, cid='', pid=0){
        if(isEmpty(this.props.userData) || !this.props.isLoggedIn){
            this.props.navigation.navigate("Signin", { isGoBack:'goBack' })
            return;
        }
        this.setStateObj({ loader:true })
        let payload = {
            uri:URI.DO_COMMENTS,
            method:'post',
            data:{
                user_id:Number(this.props.userData.user_id),
                v_id:vid,
                parent_comment_id:pid,
                comment:this.state.commentsObj[cid]
            }
        }
        Api(payload)
            .then((res)=>{
                if(res.data.message === 'success'){
                    this.getComments(vid);
                }else{
                    this.setStateObj({ loader:false })
                }
            })
            .catch((err)=>{
                this.setStateObj({ loader:false });
                alert("Unkown Error "+ err)
            })
    }

    doCommentLikeDisLike(data, is_like='1'){
        if(isEmpty(this.props.userData) || !this.props.isLoggedIn){
            this.props.navigation.navigate("Signin", { isGoBack:'goBack' })
            return;
        }
        let commentId = data.vcomment_id;
        this.setStateObj({ loader: true });
        let payload = {
            uri: URI.COMMENT_LIKE_DISLIKE,
            method:'post',
            data:{
                member_id: Number(this.props.userData.user_id),
                comment_id:commentId,
                like_unlike:is_like
            }
        }
        Api(payload)
            .then((res)=>{
                if(res.data.message === "error"){
                    alert(res.data.data)
                }
                this.getComments(this.state.data.videos_id)
            })
            .catch((err)=>{
                this.setStateObj({ loader: false });
                alert("Unkown Error "+ err)
            })
    }

    deleteComment(cid){
        if(isEmpty(this.props.userData) || !this.props.isLoggedIn){
            this.props.navigation.navigate("Signin", { isGoBack:'goBack' })
            return;
        }
        this.setStateObj({ loader:true })
        let payload = {
            uri:URI.VIDEO_COMMENT_DEL,
            method:'post',
            data:{
                user_id:Number(this.props.userData.user_id),
                vcomment_id:cid,
            }
        }
        Api(payload)
            .then((res)=>{
                if(res.data.message === 'success'){
                    this.getComments(this.state.data.videos_id);
                }else{
                    this.setStateObj({ loader:false })
                }
            })
            .catch((err)=>{
                this.setStateObj({ loader: false });
                alert("Unkown Error "+ err)
            })
    }

    updateComment(){
        if(isEmpty(this.props.userData) || !this.props.isLoggedIn){
            this.props.navigation.navigate("Signin", { isGoBack:'goBack' })
            return;
        }
        this.setStateObj({ loader:true })
        let payload = {
            uri:URI.UPDATE_VIDEO_COMMENT,
            method:'post',
            data:{
                user_id:Number(this.props.userData.user_id),
                parent_comment_id:this.state.editedData.parent_comment_id,
                v_id:this.state.data.videos_id,
                vcomment_id:this.state.editedData.vcomment_id,
                comment:this.state.editedData.comment,
            }
        }
        Api(payload)
            .then((res)=>{
                if(res.data.message === 'success'){
                    this.getComments(this.state.data.videos_id);
                }else{
                    this.setStateObj({ loader:false })
                }
            })
            .catch((err)=>{
                this.setStateObj({ loader: false });
                alert("Unkown Error \n"+ err)
            })
    }

    render(){
        const {
            loader,
            isShowMidModal,
            isShowBottomModal,
            data,
            array,
            tempArray,
            liveUrl,
            isPlay,
            isMuted,
            isShowComment,
            categoryName,
            isWebView,
            isDropDown,
            commentsList,
            isShowCommentBox,
            commentsObj,
            isUpdate,
            editedData,
            isWatchLater,
            screen
        } = this.state;
        // console.log(data)

        const {
            userData
        } = this.props;

        console.log(data)

        const _renderVideos = () => {
            return(<>
                { isWebView &&
                    <Row style={styles.videoDetails}>
                        <Text ellipsizeMode={"tail"} numberOfLines={2} style={styles.videoTitle}>{isNullRetNull(data.title)}</Text>
                        <Text style={styles.viewsText}>{isNullRetNull(data.total_view, 0)} views | {isNullRetNull(data.time,'')}</Text>

                        <Row style={styles.videoDetailBtnsView}>
                            <TouchableOpacity
                                style={styles.videoDetailBtns}
                                disabled={isNullRetNull(data.is_like_dislike) === true}
                                onPress={()=>{
                                    this.doVideoLikeDisLike(data, '1')
                                }}>
                                <YoutubeLikeIcon fill={ isNullRetNull(data.is_like_dislike) === true ? "#19b24b" : "#333" } />
                                <Text style={[styles.videoDetailBtnsText, isNullRetNull(data.is_like_dislike) === true ? {color:"#19b24b"} : {}]}>
                                    Like ({isNullRetNull(data.total_likes, 0)})
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.videoDetailBtns}
                                disabled={isNullRetNull(data.is_like_dislike) === false}
                                onPress={()=>{
                                    this.doVideoLikeDisLike(data, '-1')
                                }}>
                                <YoutubeDislikeIcon fill={ isNullRetNull(data.is_like_dislike) === false ? "#19b24b" : "#333" } />
                                <Text style={[styles.videoDetailBtnsText, isNullRetNull(data.is_like_dislike) === false ? {color:"#19b24b"} : {}]}>
                                    Dislike ({isNullRetNull(data.total_dislikes, 0)})
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.videoDetailBtns}
                                onPress={()=>{
                                    this.addFavorite(data, data.is_favourite)
                                }}>
                                <FavouriteIcon fill={ data.is_favourite ? "#19b24b" : "#333" } />
                                <Text style={[styles.videoDetailBtnsText, data.is_favourite ? {color:"#19b24b"} : {}]}>Favourite</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity
                                style={styles.videoDetailBtns}
                                onPress={()=>{
                                    if(screen === 'WatchLater'){
                                        this.addInWatchLater(data, false)
                                        return
                                    }
                                    this.addInWatchLater(data, data.is_watch_later)
                                }}>
                                <WatchLaterIcon fill={ data.is_watch_later ? "#19b24b" : "#333" } />
                                <Text style={[styles.videoDetailBtnsText, data.is_watch_later ? {color:"#19b24b"} : {}]}>Watch Later</Text>
                            </TouchableOpacity>
                        </Row>

                        <Row style={styles.videoCommentsView}>
                            <Row style={{ marginLeft:hp('1'), marginTop:hp('1') }}>
                                <Text style={{ ...Platform.select({ios:{},android:{  }}), }}>
                                    Comments 
                                </Text>
                                <Text style={{ ...Platform.select({ios:{},android:{  }}), opacity:0.5 }}>
                                    {` ${commentsList.length}`}
                                </Text>
                            </Row>
                            <TouchableOpacity
                                style={{ marginRight:hp('1'), paddingRight:hp('1'), marginTop:hp('1'), opacity:0.5 }}
                                onPress={()=>{
                                    this.setStateObj({ isShowComment:true })
                                }}>
                                <UpAndDownIcon />
                            </TouchableOpacity>
                        </Row>

                        <Row style={styles.videoCommentsView}>
                            { commentsList.length > 0 &&
                                <Row>
                                    <Image source={{ uri:isNullRetNull(commentsList[0].img) }} style={styles.commentUserImg}/>
                                    <Row style={styles.commentRow}>
                                        <Row style={{ alignItems:'center', marginBottom:hp('0.5') }}>
                                            <Text style={{ ...Platform.select({ios:{},android:{  }}), }}>
                                                {`${isNullRetNull(commentsList[0].name)} `}
                                            </Text>
                                            <Text style={styles.commentText}>
                                                {getDiffInDates(isNullRetNull(commentsList[0].created_at,'').split(" ")[0])}
                                            </Text>
                                        </Row>
                                        
                                        <Text style={styles.commentText}>
                                            {isNullRetNull(commentsList[0].comment, '')}
                                        </Text>
                                        
                                        <Row style={{ alignItems:'center', marginTop:hp('1') }}>
                                            <TouchableOpacity
                                                style={{ marginRight:hp('1') }}
                                                onPress={()=>{
                                                    isShowCommentBox["c"+isNullRetNull(commentsList[0].vcomment_id)] = true;
                                                    this.setStateObj({ isShowCommentBox, isUpdate:false, editedData:{} })
                                                }}>
                                                <Text style={styles.commentProperties}>Reply</Text>
                                            </TouchableOpacity>

                                            <Text style={styles.commentProperties}>
                                                {isNullRetNull(commentsList[0].likes)}
                                            </Text>
                                            <Row style={styles.likeDislikeBtn}>
                                                <TouchableOpacity onPress={()=>{ this.doCommentLikeDisLike(commentsList[0], '1') }}>
                                                    <YoutubeLikeIcon width="15px" height="15px" fill={ isNullRetNull(commentsList[0].like_unlike) === 'true' ? '#19b24b':'#333' }/>
                                                </TouchableOpacity>
                                            </Row>
                                            <Row style={styles.likeDislikeBtn}>
                                                <TouchableOpacity onPress={()=>{ this.doCommentLikeDisLike(commentsList[0], '-1') }}>
                                                    <YoutubeDislikeIcon width="15px" height="15px" fill={ isNullRetNull(commentsList[0].like_unlike) === 'false' ? '#19b24b':'#333' }/>
                                                </TouchableOpacity>
                                            </Row>
                                            <Text style={styles.commentProperties}>{isNullRetNull(commentsList[0].dislikes)}</Text>

                                            {
                                                isNullRetNull(commentsList[0].comment_sender_name) === userData.user_id && 
                                                <>
                                                    <TouchableOpacity
                                                        style={{ marginRight:hp('1') }}
                                                        onPress={()=>{
                                                            isShowCommentBox["c"+isNullRetNull(commentsList[0].vcomment_id)] = true;
                                                            this.setStateObj({ isShowCommentBox, isUpdate:true, editedData:commentsList[0] })
                                                        }}>
                                                        <Text style={[styles.commentProperties, { left:4 }]}>{"Edit"}</Text>
                                                    </TouchableOpacity>

                                                    <TouchableOpacity
                                                        style={{ marginRight:hp('1') }}
                                                        onPress={()=>{
                                                            this.deleteComment(commentsList[0].vcomment_id)
                                                        }}>
                                                        <Text style={styles.commentProperties}>Delete</Text>
                                                    </TouchableOpacity>
                                                </>
                                            }

                                        </Row>
                                    { isShowCommentBox["c"+isNullRetNull(commentsList[0].vcomment_id)] &&
                                        <Row style={{ flexDirection:'column', width:"100%", alignItems:'center', marginTop:hp('1') }}>
                                            <TextInput
                                                style={[styles.replyAddCommentBox, { width:'98%', height:hp('4') }]}
                                                value={isUpdate ? editedData.comment : undefined}
                                                multiline
                                                onFocus={()=>{ this.setStateObj({ isShowComment:true }) }}
                                                placeholder={"Add a Comments"}/>
                                            <TouchableOpacity
                                                style={[styles.replySubmitBtn, { width:'98%' }]}
                                                disabled={true}>
                                                <Text>{ isUpdate ? "Update" : "Submit" }</Text>
                                            </TouchableOpacity>
                                        </Row>
                                    }
                                    </Row>
                                </Row>
                            }
                        
                        </Row>

                    </Row>
                }
                <Row style={styles.detailsContent01}>
                    <Row style={styles.detailsCard01}>
                        <Row style={styles.detailsCardTitleRow01}>
                            <Row style={styles.detailsCardTitleDot01} />
                            <Text ellipsizeMode="tail" numberOfLines={1} style={styles.detailsCardTitle01}>
                                {isNullRetNull(categoryName)}
                            </Text>
                        </Row>

                        {
                            tempArray.map((item, i)=>{
                                if(data.slug !== item.slug){
                                    return(
                                        <Row style={styles.detailsCarouselCard01} key={i}>
                                            <TouchableOpacity
                                                style={styles.detailsCarouselCardImgView01}
                                                onPress={()=>{
                                                    if(screen === 'Search'){
                                                        this.getSingleVideo(item.slug)
                                                        return
                                                    }
                                                    this.getVideoBySlug(item)
                                                }}>
                                                <View style={styles.detailsPlayIcon01}><PlayIcon width={hp('5')}/></View>
                                                <Image source={{uri:item.img}} style={styles.detailsCarouselCardImg01}/>
                                            </TouchableOpacity>
                                            <Row style={styles.detailsCarouselCardDetail01}>
                                                <Text ellipsizeMode="tail" numberOfLines={2} style={styles.detailsCarouselCardTitle01}>{isNullRetNull(item.title)}</Text>
                                                <Text ellipsizeMode="tail" numberOfLines={3} style={styles.detailsCarouselCardDis01}>{isNullRetNull(item.description)}</Text>
                                                <Text style={styles.detailsCarouselCardtime01}>{isNullRetNull(item.total_view, '0')} views | {isNullRetNull(item.release,'')}</Text>
                                                
                                                {
                                                    screen === 'WatchLater' && data.is_watch_later &&
                                                    <View style={styles.btn01}>
                                                        <TouchableOpacity
                                                            onPress={()=>{
                                                                this.addInWatchLater(data, false)
                                                            }}>
                                                            <Text>Remove</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                }
                                            </Row>
                                            
                                        </Row>
                                    )
                                }
                            })
                        }
                    </Row>
                </Row>
            </>)
        }

        const _renderComments = () => {
            return(<>
                <Row style={styles.commentHeadRow}>
                    <Row>
                        <Text>Comments </Text>
                        <Text style={{ opacity:0.5 }}>{` ${commentsList.length}`}</Text>
                    </Row>
                    <TouchableOpacity
                        style={{ opacity:0.5, padding:hp('0.6') }}
                        onPress={()=>{
                            this.setStateObj({ isShowComment:false })
                        }}>
                        <CrossIcon />
                    </TouchableOpacity>
                </Row>
                <Row style={styles.row02}>
                    <Row style={{ height:hp('6'), }}>
                        <Image source={{ uri:isNullRetNull(userData.img) }} style={styles.commentUserImg}/>
                        <TextInput
                            style={styles.addCommentBox}
                            multiline
                            placeholder={"Add a Comments"}
                            value={commentsObj[`c_${data.videos_id}`]}
                            onChangeText={(char)=>{
                                this.setStateObj({ commentsObj:{ [`c_${data.videos_id}`]:char } })
                            }}/>
                    </Row>

                    <TouchableOpacity
                        style={styles.submitBtn}
                        onPress={()=>{
                            this.doComment(data.videos_id, `c_${data.videos_id}`, 0)
                        }}>
                        <Text>Submit</Text>
                    </TouchableOpacity>
                </Row>

                {
                    commentsList.map((item, i)=>{
                        return(
                            <Row key={i} style={styles.videoCommentsView}>
                                <Row>
                                    <Image source={{ uri:isNullRetNull(item.img) }} style={styles.commentUserImg}/>
                                    <Row style={styles.commentRow}>
                                        <Row style={{ alignItems:'center', marginBottom:hp('0.5') }}>
                                            <Text style={{ }}>{`${isNullRetNull(item.name, 'Unkown')} `}</Text>
                                            <Text style={{ color:'gray', fontSize:12 }}>
                                                {getDiffInDates(isNullRetNull(item.created_at,'').split(" ")[0])}
                                            </Text>
                                        </Row>
                                        
                                        <Text style={{ color:'gray', fontSize:12 }}>{isNullRetNull(item.comment, '')}</Text>
                                        
                                        <Row style={{ alignItems:'center', marginTop:hp('1') }}>
                                            <TouchableOpacity
                                                style={{ marginRight:hp('1') }}
                                                onPress={()=>{ 
                                                    isShowCommentBox["c"+item.vcomment_id] = true;
                                                    this.setStateObj({ isShowCommentBox, isUpdate:false, editedData:{} })
                                                }}>
                                                <Text style={styles.commentProperties}>Reply</Text>
                                            </TouchableOpacity>

                                            <Text style={styles.commentProperties}>{isNullRetNull(item.likes, 0)}</Text>
                                            <Row style={styles.likeDislikeBtn}>
                                                <TouchableOpacity
                                                    onPress={()=>{ this.doCommentLikeDisLike(item, '1') }}>
                                                    <YoutubeLikeIcon width="15px" height="15px" fill={ isNullRetNull(item.like_unlike) === 'true' ? '#19b24b':'#333' }/>
                                                </TouchableOpacity>
                                            </Row>
                                            <Row style={styles.likeDislikeBtn}>
                                                <TouchableOpacity
                                                    onPress={()=>{ this.doCommentLikeDisLike(item, '-1') }}>
                                                    <YoutubeDislikeIcon width="15px" height="15px" fill={ isNullRetNull(item.like_unlike) === 'false' ? '#19b24b':'#333' }/>
                                                </TouchableOpacity>
                                            </Row>
                                            <Text style={styles.commentProperties}>{isNullRetNull(item.dislikes, 0)}</Text>
                                            {
                                                isNullRetNull(item.comment_sender_name) === userData.user_id && 
                                                <>
                                                    <TouchableOpacity
                                                        style={{ marginRight:hp('1') }}
                                                        onPress={()=>{
                                                            isShowCommentBox["c"+isNullRetNull(item.vcomment_id)] = true;
                                                            this.setStateObj({ isShowCommentBox, isUpdate:true, editedData:item })
                                                        }}>
                                                        <Text style={[styles.commentProperties, { left:4 }]}>{"Edit"}</Text>
                                                    </TouchableOpacity>

                                                    <TouchableOpacity
                                                        style={{ marginRight:hp('1') }}
                                                        onPress={()=>{
                                                            this.deleteComment(item.vcomment_id)
                                                        }}>
                                                        <Text style={styles.commentProperties}>Delete</Text>
                                                    </TouchableOpacity>
                                                </>
                                            }
                                        </Row>

                                        <Row style={styles.replySectionMainRow}>
                                            {
                                                item.replies &&
                                                item.replies.map((rep, j)=>{
                                                    return(
                                                        <Row key={j} style={{ marginBottom:10 }}>
                                                            <Image source={{ uri:isNullRetNull(rep.img) }} style={styles.commentUserImg}/>
                                                            <Row style={styles.commentRow}>
                                                                <Row style={{ alignItems:'center', marginBottom:hp('0.5') }}>
                                                                    <Text style={{ }}>{`${isNullRetNull(rep.name)} `}</Text>
                                                                    <Text style={{ color:'gray', fontSize:12 }}>
                                                                        {getDiffInDates(isNullRetNull(rep.created_at,'').split(" ")[0])}
                                                                    </Text>
                                                                </Row>
                                                                
                                                                <Text style={{ color:'gray', fontSize:12 }}>{isNullRetNull(rep.comment, '')}</Text>

                                                                <Row style={{ alignItems:'center', marginTop:hp('1') }}>
                                                                    <TouchableOpacity
                                                                        style={{ marginRight:hp('1') }}
                                                                        onPress={()=>{
                                                                            isShowCommentBox["c"+item.vcomment_id] = true;
                                                                            this.setStateObj({ isShowCommentBox, isUpdate:false, editedData:{} })
                                                                        }}>
                                                                        <Text style={styles.commentProperties}>Reply</Text>
                                                                    </TouchableOpacity>

                                                                    <Text style={styles.commentProperties}>{isNullRetNull(rep.likes, '0')}</Text>
                                                                    <Row style={styles.likeDislikeBtn}>
                                                                        <TouchableOpacity onPress={()=>{ this.doCommentLikeDisLike(rep, '1') }}>
                                                                            <YoutubeLikeIcon width="15px" height="15px" fill={ isNullRetNull(rep.like_unlike) === 'true' ? '#19b24b':'#333' }/>
                                                                        </TouchableOpacity>
                                                                    </Row>
                                                                    <Row style={styles.likeDislikeBtn}>
                                                                        <TouchableOpacity onPress={()=>{ this.doCommentLikeDisLike(rep, '-1') }}>
                                                                            <YoutubeDislikeIcon width="15px" height="15px" fill={ isNullRetNull(rep.like_unlike) === 'false' ? '#19b24b':'#333' }/>
                                                                        </TouchableOpacity>
                                                                    </Row>
                                                                    <Text style={styles.commentProperties}>{isNullRetNull(rep.dislikes, '0')}</Text>
                                                                    {
                                                                        isNullRetNull(rep.comment_sender_name) === userData.user_id && 
                                                                        <>
                                                                            <TouchableOpacity
                                                                                style={{ marginRight:hp('1') }}
                                                                                onPress={()=>{
                                                                                    isShowCommentBox["c"+isNullRetNull(item.vcomment_id)] = true;
                                                                                    this.setStateObj({ isShowCommentBox, isUpdate:true, editedData:rep })
                                                                                }}>
                                                                                <Text style={[styles.commentProperties, { left:4 }]}>{"Edit"}</Text>
                                                                            </TouchableOpacity>

                                                                            <TouchableOpacity
                                                                                style={{ marginRight:hp('1') }}
                                                                                onPress={()=>{
                                                                                    this.deleteComment(rep.vcomment_id)
                                                                                }}>
                                                                                <Text style={styles.commentProperties}>Delete</Text>
                                                                            </TouchableOpacity>
                                                                        </>
                                                                    }
                                                                </Row>
                                                            </Row>
                                                        </Row>
                                                    )
                                                })
                                            }
                                        </Row>
                                        { isShowCommentBox["c"+item.vcomment_id] &&
                                            <Row style={{ flexDirection:'column', width:"100%", alignItems:'flex-end', right:wp('2') }}>
                                                <TextInput
                                                    style={styles.replyAddCommentBox}
                                                    value={ isUpdate ? editedData.comment : undefined }
                                                    multiline
                                                    placeholder={"Add a Comments"}
                                                    onChangeText={(char)=>{
                                                        if(isUpdate){
                                                            this.setStateObj({ editedData:{ ...editedData, comment:char }})
                                                        }else{
                                                            this.setStateObj({ commentsObj:{ [`c_${item.vcomment_id}`]:char }})
                                                        }
                                                    }}/>

                                                <TouchableOpacity
                                                    style={styles.replySubmitBtn}
                                                    onPress={()=>{
                                                        if(isUpdate){
                                                            this.updateComment()
                                                        }else{
                                                            this.doComment(item.v_id, `c_${item.vcomment_id}`, item.vcomment_id)
                                                        }
                                                    }}>
                                                    <Text>{ isUpdate ? "Update" : "Submit" }</Text>
                                                </TouchableOpacity>
                                            </Row>
                                        }
                                    </Row>
                                </Row>
                            </Row>

                        )
                    })   
                }
                
            </>)
        }
        
        return (<>
            <Loader isLoader={loader} />
            <Grid style={styles.grid}>
                <Row style={{ width:wp('100'), height:"11%" }}>
                    <Header
                        isDropDown={isDropDown}
                        setDropDown={(isActive)=>{ this.setStateObj({ isDropDown:isActive }) }}
                        navigation={this.props.navigation}
                        toggleDrawer={()=>{ this.setStateObj({ isShowMidModal: !isShowMidModal }) }}
                        isRenderPlayer={false}/>
                </Row>

                <Row style={{ width:wp('100'), height:hp('6') }}>
                    <SearchBox tempArray={array} filterFun={(data)=>{
                        this.setStateObj({ tempArray:data })
                    }} />
                </Row>
                
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Row style={{ width:"100%", height:hp("25%"), backgroundColor: 'black' }}>

                        {
                            isWebView ?
                                this.props.navigation.isFocused() ? 
                                // isNullRetNull(data.video_url, false) ?
                                (
                                    <WebView
                                        style={{backgroundColor: 'black'}}
                                        ref={(ref) => { this.videoPlayer = ref;}}
                                        contentInset={{top: 0, left: 0, bottom: 0, right: 0}}
                                        startInLoadingState={this.Loader}
                                        allowsInlineMediaPlayback={false}
                                        scrollEnabled={false}
                                        onLoadEnd={(e)=>{ this.Loader = false }}
                                        useWebKit={true}
                                        originWhitelist={['*']}
                                        source={{ ...getUrl(data.slug, true) }}/>
                                ):(
                                    <Row style={{ width:wp('89%'), alignItems:'center', justifyContent:'center' }}>
                                        <ActivityIndicator size='large' />
                                    </Row>
                                )
                            :(
                                <LivePlayer
                                    navigation={this.props.navigation}
                                    isPlay={isPlay}
                                    playAsync={(isPlay)=>{ this.setStateObj({ isPlay:isPlay }) }}
                                    isMuted={isMuted}
                                    setIsMutedAsync={(isMuted)=>{ this.setStateObj({ isMuted:isMuted }) }}
                                    source={{ uri: liveUrl }}/>
                            )
                        }
                    </Row>

                    { isShowComment ?
                        _renderComments() 
                        : _renderVideos()
                    }

                </ScrollView>

                <ProfileDropDown
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

                <Footer navigation={this.props.navigation} toggleDrawer={()=>{ this.setStateObj({ isShowBottomModal: !isShowBottomModal }) }} />
            </Grid>
        </>);
    }
};

const styles = StyleSheet.create({
    grid:{
        paddingBottom:hp('6'),
        width:wp('100'),
    },

    videoDetails:{
        alignItems:'center',
        flexDirection:'column'
    },
    videoTitle:{
        marginTop:hp('0.6'),
        fontSize:18,
        width:"96%",
        ...Platform.select({ios:{},android:{  }}),
        color:"#333333"
    },
    viewsText:{
        fontSize:10,
        color:'#333333',
        paddingTop:5,
        width:"96%",
        paddingBottom:5,
        ...Platform.select({ios:{},android:{  }}),
    },
    videoDetailBtnsView:{
        width:wp('96'),
        paddingLeft:hp('1'),
        paddingRight:hp('1'),
        height:hp('7'),
        alignItems:'center',
        justifyContent:'space-around',
        borderBottomColor:'#8B8B8B',
        borderBottomWidth:1
    },
    videoDetailBtns:{
        height:hp('3.5'),
        borderRadius:100,
        opacity:0.4,
        alignItems:'center',
        justifyContent:'space-between',
    },
    videoDetailBtnsText:{
        fontSize:10,
        color:'black',
        ...Platform.select({ios:{},android:{  }}),
    },

    videoCommentsView:{
        width:wp('100'),
        alignItems:'center',
        marginBottom:hp('1'),
    },

    commentUserImg:{
        width:wp('9'),
        height:wp('9'),
        borderRadius:100,
        borderColor:'#333',
        borderWidth:0.5,
        marginLeft:hp('1'),
    },
    commentRow:{
        padding:hp('1'),
        backgroundColor:'#fff',
        marginLeft:hp('1'),
        marginRight:hp('1'),
        shadowOffset:{ width:1, height:1 },
        elevation:1,
        shadowColor:'gray',
        shadowOpacity:0.3,
        shadowRadius:2,
        flexDirection:'column'
    },
    row02:{
        height:hp('16'),
        justifyContent:'center',
        flexDirection:'column',
    },
    commentHeadRow:{
        width:wp('100'),
        height:hp('5'),
        paddingLeft:hp('1'),
        paddingRight:hp('1'),
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor:'#ffffff',
        shadowOffset:{ width:1, height:1 },
        elevation:1,
        shadowColor:'gray',
        shadowOpacity:0.3,
        shadowRadius:2,
    },

    addCommentBox:{
        backgroundColor:'#FFF',
        color:'gray',
        height:hp('6'),
        paddingLeft:hp('1'),
        paddingRight:hp('1'),
        width:"84%",
        marginLeft:hp('1'),
        shadowColor:'gray',
        shadowOffset:{ width:2, height:2 },
        shadowOpacity:0.5,
        shadowRadius:5,
        elevation:5
    },
    submitBtn:{
        backgroundColor:'gray',
        opacity:0.5,
        alignSelf:'flex-end',
        height:hp('4'),
        paddingLeft:hp('1'),
        paddingRight:hp('1'),
        width:'84%',
        marginLeft:hp('1'),
        alignItems:'center',
        justifyContent:'center',
        marginRight:hp('1'),
        marginTop:hp('1')
    },

    replyAddCommentBox:{
        backgroundColor:'#FFF',
        color:'gray',
        height:hp('5'),
        paddingLeft:hp('1'),
        paddingRight:hp('1'),
        width:"78%",
        backgroundColor:'#d3d3d3',
        shadowColor:'#c3c3c3',
        shadowOffset:{ width:2, height:2 },
        shadowOpacity:0.5,
        shadowRadius:5,
        elevation:5
    },
    replySubmitBtn:{
        backgroundColor:'#c3c3c3',
        opacity:0.5,
        height:hp('3'),
        paddingLeft:hp('1'),
        paddingRight:hp('1'),
        width:'78%',
        alignItems:'center',
        justifyContent:'center',
        marginTop:hp('1')
    },


    detailsContent01:{
        width:wp('100'),
        alignSelf:'center',
        marginTop:hp('0.6'),
        marginBottom:hp('1'),
        justifyContent:'center',

    },
    detailsCard01:{
        flexDirection:'column',
        backgroundColor:'#FFFFFF',
        ...Platform.select({
            ios:{
                height:'100%',
            },
            android:{
                height:'100%',
            }
        }),
        width:wp('96'),
        paddingTop:hp('1'),
        alignSelf:'center',
        alignItems:'center'
    },
    detailsCardTitleRow01:{
        height:hp('4'),
        width:wp('92'),
        alignItems:'center'
    },
    detailsCardTitleDot01:{
        backgroundColor:'#19b24b',
        height:hp('3'),
        width:wp('3'),
        marginRight:hp('1')
    },
    detailsCardTitle01:{
        color:'#19b24b',
        fontSize:22,
        fontWeight:'600',
        width:"96%",
        ...Platform.select({ios:{},android:{  }}),
    },
    detailsCarouselCard01:{
        padding:hp('1'),
        width:wp('96'),
    },
    detailsPlayIcon01:{
        position:'absolute',
        zIndex:1,
        alignSelf:'center',
        justifyContent:'center',
        height:hp('6')
    },
    detailsCarouselCardImgView01:{
        backgroundColor:'#FFFFFF',
        overflow:'hidden',
        borderColor:'gray',
        borderWidth:1,
        width:wp('38'),
        ...Platform.select({
            ios:{
                height:hp('11'),
            },
            android:{
                height:hp('12'),
            }
        }),
        justifyContent:'center'
    },
    detailsCarouselCardImg01:{
        width:'100%',
        height:'100%',
        resizeMode:'stretch'
    },
    detailsCarouselCardDetail01:{
        flexDirection:'column',
        paddingLeft:hp('1'),
        overflow:'scroll'
    },
    detailsCarouselCardTitle01:{
        fontSize:14,
        fontWeight:'500',
        width:'96%',
        ...Platform.select({ios:{},android:{  }}),
    },
    detailsCarouselCardDis01:{
        fontSize:12,
        paddingTop:5,
        width:'94%',
        ...Platform.select({ios:{},android:{  }}),
        color:"#333333"
    },
    detailsCarouselCardtime01:{
        fontSize:10,
        color:'#333333',
        paddingTop:5,
        ...Platform.select({ios:{},android:{  }}),
        color:"gray"
    },
    commentText:{
        ...Platform.select({ios:{},android:{
            
        }}),
        color:'gray',
        fontSize:12
    },
    commentProperties:{
        ...Platform.select({ios:{},android:{
            
        }}),
        color:'gray',
        fontSize:12,
        fontWeight:'500'
    },
    likeDislikeBtn:{
        opacity:0.5,
        alignItems:'center',
        justifyContent:'center',
        height:hp('3'),
        width:hp('3')
    },
    replySectionMainRow:{
        flexDirection:'column',
        width:'97%',
        marginLeft:wp('3'),
        marginTop:hp('1.2'),
    },
    btn01:{
        position:'absolute',
        bottom:hp('1'),
        right:hp('1'),
        zIndex:10
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ShowDetails);

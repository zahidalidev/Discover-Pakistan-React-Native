import React from "react";
import { Row } from "react-native-easy-grid";
import { StyleSheet, ActivityIndicator, TouchableOpacity, Text, Platform } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

import LoginIcon from './../../Assets/svg/login.svg';
import LogOutIcon from './../../Assets/svg/logout.svg';
import SignUpIcon from './../../Assets/svg/signup.svg';
import ProfileIcon from './../../Assets/svg/user_profile.svg';
import LikedIcon from './../../Assets/svg/liked_icon.svg';
import WatchLaterIcon from './../../Assets/svg/watch_later.svg';
import { URI } from "../../Constants";
import Api from "../../Constants/Api";

export const Loader = ({ isLoader }) =>{
    if(isLoader){
        return(
            <Row style={{backgroundColor:'black', opacity:0.7, position:'absolute', height:'100%', width:wp('100%'), alignItems:'center', justifyContent:'center', zIndex:100 }}>
                <ActivityIndicator size='large' />
            </Row>
        )
    }else{
        return (<></>)
    }
}

export const RedirectTo = (props) => {

    let nav = props.navigation;
    let path = nav.getParam("path") ? nav.getParam("path") : false;
    let obj = nav.getParam("obj") ? nav.getParam("obj") : {}

    const goTo = () => {
        nav.replace(path, obj)
    }

    if(path){
        return(<>
            <Row style={styles.v01}>
                <ActivityIndicator size='large' />
                { goTo() }
            </Row>
        </>)
    }else{
        return (<>
        {nav.goBack()}
        </>)
    }
}

export const ProfileDropDown = ({ props, isDropDown, setDropDown }) =>{
    
    const getFavorite = () => {
        let payload = {
            uri:URI.GET_FAVORITE,
            method:'post',
            data:{
                user_id: Number(props.userData.user_id),
            }
        }
        Api(payload)
            .then((res)=>{
                if(res.status === 200){
                    if(res.data.length > 0){
                        props.setCatDetails(res.data)
                        props.navigation.navigate("RedirectTo", { path:"ShowDetails", obj:{ category: "FAVORITE VIDEOS", screen:'Favorite' }})
                    }else{
                        alert("Favorite videos not found!")
                    }
                }
            })
            .catch((err)=>{
                alert("Unkown Error "+ err)
            })
    }

    const getWatchLater = () => {
        let payload = {
            uri:URI.GET_WATCH_LATER,
            method:'post',
            data:{
                user_id: Number(props.userData.user_id),
            }
        }
        Api(payload)
            .then((res)=>{
                console.log(res)
                if(res.status === 200){
                    if(typeof(res.data.data) === 'object' && res.data.data.length > 0){
                        props.setCatDetails(res.data.data)
                        props.navigation.navigate("RedirectTo", { path:"ShowDetails", obj:{ category: "WATCH LATER VIDEOS", screen:'WatchLater' }})
                    }else{
                        alert("Watch later videos not found!")
                    }
                }
            })
            .catch((err)=>{
                alert("Unkown Error "+ err)
            })
    }

    if(isDropDown && setDropDown){
        if(props.isLoggedIn){
            return(
                <Row style={styles.dropDownRow}>
                    <TouchableOpacity
                        style={styles.dropDownBtn}
                        onPress={()=>{
                            if(setDropDown) setDropDown(!isDropDown)
                            props.navigation.navigate("Profile")
                        }}>
                        <ProfileIcon />
                        <Text style={styles.dropDownBtnText}>Profile</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.dropDownBtn}
                        onPress={()=>{
                            if(setDropDown){ setDropDown(!isDropDown) }
                            getFavorite()
                        }}>
                        <LikedIcon />
                        <Text style={styles.dropDownBtnText}>Favorite</Text> 
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.dropDownBtn}
                        onPress={()=>{
                            if(setDropDown){ setDropDown(!isDropDown) }
                            getWatchLater()
                        }}>
                        <WatchLaterIcon />
                        <Text style={styles.dropDownBtnText}>Watch Later</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.dropDownBtn}
                        onPress={()=>{
                            if(setDropDown){ setDropDown(!isDropDown) }
                            props.setLoginStatus(false);
                            alert("Logout successfully")
                        }}>
                        <LogOutIcon />
                        <Text style={styles.dropDownBtnText}>Logout</Text>
                    </TouchableOpacity>
                </Row>
            )
        }else{
            return(
                <Row style={styles.dropDownRow01}>
                    <TouchableOpacity
                        style={styles.dropDownBtn01}
                        onPress={()=>{
                            if(setDropDown){ setDropDown(!isDropDown) }
                            props.navigation.navigate("Signin")
                        }}>
                        <LoginIcon />
                        <Text style={styles.dropDownBtnText}>Sign In</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.dropDownBtn01}
                        onPress={()=>{
                            if(setDropDown){ setDropDown(!isDropDown) }
                            props.navigation.navigate("Signup")
                        }}>
                        <SignUpIcon />
                        <Text style={styles.dropDownBtnText}>Sign Up</Text>
                    </TouchableOpacity>
                </Row>
            )
        }
    }else{ return<></>}
}

const styles = StyleSheet.create({
    dropDownRow:{
        zIndex:1000,
        top:hp('9'),
        right:wp('7'),
        width:wp('30'),
        height:hp('18'),
        borderWidth:0.4,
        borderColor:'gray',
        position:'absolute',
        flexDirection:'column',
        backgroundColor:'#FFFFFF',
    },
    dropDownRow01:{
        zIndex:1000,
        top:hp('9'),
        right:wp('7'),
        width:wp('30'),
        height:hp('9'),
        borderWidth:0.4,
        borderColor:'gray',
        position:'absolute',
        flexDirection:'column',
        backgroundColor:'#FFFFFF',
    },
    dropDownBtn:{
        width:'100%',
        height:'25%',
        alignItems:'center',
        paddingLeft:hp('1'),
        borderBottomColor:'gray',
        borderBottomWidth:0.3,
        flexDirection:'row'
    },
    dropDownBtn01:{
        width:'100%',
        height:'50%',
        alignItems:'center',
        paddingLeft:hp('1'),
        borderBottomColor:'gray',
        borderBottomWidth:0.3,
        flexDirection:'row'
    },
    dropDownBtnText:{
        marginLeft:wp('1'),
        fontSize:14,
        fontWeight:'500',
        color:'#333333',
        ...Platform.select({ios:{},android:{}}),
    },
    v01:{
        backgroundColor:'#fff',
        opacity:0.7,
        position:'absolute',
        height:hp('100%'),
        width:wp('100%'),
        alignItems:'center',
        justifyContent:'center',
        zIndex:10
    }
});
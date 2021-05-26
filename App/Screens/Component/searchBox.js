import React from 'react';
import { ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native';
import { View } from 'react-native';
import { Image } from 'react-native';
import { Text } from 'react-native';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform
} from 'react-native';
import { Row } from 'react-native-easy-grid';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { URI } from '../../Constants';
import Api from '../../Constants/Api';
import { color } from '../../Constants/theme';
import SearchIcon from './../../Assets/svg/Search-24px.svg';

const SearchBox = ({ filterFun=()=>{}, tempArray=[], apiLoader=()=>{}, onTypeResult=()=>{}, isApiSearch=true }) => {

    const searchString = (char) => {
        if(isApiSearch){
            search(char)
            return
        }
        var matches = []
        if (char !== "") {
                matches = tempArray.filter(function(value){
                    if(value) {
                        if (value.title) {
                            return (value.title.toLowerCase().substring(0, char.length) === char);
                        }
                        if (value.name) {
                            return (value.name.toLowerCase().substring(0, char.length) === char);
                        }
                        if(value.video_type){
                            return (value.video_type.toLowerCase().substring(0, char.length) === char);
                        }
                        if(value.video_heading){
                            return (value.video_heading.toLowerCase().substring(0, char.length) === char);
                        }
                    }
                });
        }else{
            matches = tempArray
        }
        filterFun(matches)
    }

    const search = (str) => {
        apiLoader(true);
        // if(str.length < 1){
        //     onTypeResult();
        //     return
        // }
        let payload = {
            uri:`${URI.SEARCH}`,
            method:'post',
            data:{ q:str, page:1 }
        }
        Api(payload)
            .then((res)=>{
                apiLoader(false);
                if(res.data.movie && str.length > 0) {
                    onTypeResult(res.data.movie)
                    return
                }
                onTypeResult()
            })
            .catch((err)=>{
                apiLoader(false);
                alert("Unkown Error \n"+ err)
            })
    }

    return (
        <View style={{ width:'100%' }}>
            <View style={styles.searchRow}>
                <TextInput
                    style={styles.inputText}
                    placeholder={'Search'}
                    onChangeText={(char)=>{
                        searchString(char.toLowerCase())
                    }}
                    clearButtonMode={"always"}/>
                <TouchableOpacity style={styles.searchBtn}>
                    <SearchIcon width={hp('6')} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const SearchList = ({ searchData, searchLoader, onClick }) => {

    if(!searchData) return null

    return (<>
        <View style={styles.v03(searchData.length < 1)}>
            <ScrollView>
            {   searchLoader &&
                <View style={styles.v01}>
                    <ActivityIndicator size="large" color={color.design}/>
                </View>
            }
            {
                searchData &&
                searchData.map((item, i)=>{
                    return(
                        <TouchableOpacity
                            key={i}
                            style={styles.v02}
                            onPress={()=>{
                                if(onClick) onClick(item, searchData, 'Search Videos')
                            }}>
                            <Image source={{ uri:item.thumbnail_url }} style={styles.img01}/>
                            <View style={{ flex:1, marginLeft:hp(1) }}>
                                <Text numberOfLines={1} style={styles.txt01}>{item.title}</Text>
                                <Text numberOfLines={1} style={styles.txt02}>{item.description}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                })
            }
            </ScrollView>
        </View>
    </>);
};

const styles = StyleSheet.create({
    searchRow:{
        width:wp('96'),
        height:hp('6'),
        alignSelf:'center',
        flexDirection:'row'
    },
    inputText:{
        paddingLeft:wp('3'),
        paddingRight:wp('3'),
        fontSize:20,
        height:hp('5'),
        borderColor:'gray',
        borderWidth:0.5,
        width:wp('82.5'),
        alignSelf:'flex-start',
        ...Platform.select({ios:{},android:{  }}),
    },
    searchBtn:{
        height:hp('5'),
        justifyContent:'center',
        borderColor:'gray',
        borderWidth:0.5,
        alignItems:'center',
        justifyContent:'center',
    },

    v03:(is)=>{
        return{
            position:'absolute',
            top:hp('16'),
            ...is ? {} : { height:hp('74') },
            width:wp('96'),
            alignSelf:'center',
            borderWidth:1,
            borderColor:'#d3d3d3',
            zIndex:10,
            backgroundColor:'#fff'
        }
    },
    v01:{
        width:'100%',
        height:hp('7'),
        alignItems:'center',
        justifyContent:'center',
        borderBottomColor:color.quaternary,
        borderBottomWidth:1
    },
    v02:{
        width:'100%',
        height:hp('7'),
        flexDirection:'row',
        alignItems:'center',
        borderBottomColor:color.quaternary,
        borderBottomWidth:1,
        paddingLeft:hp('1'),
        paddingRight:hp('1'),
    },
    img01:{
        height:hp('6'),
        width:hp('6'),
        borderWidth:1,
        borderColor:color.quaternary
    },
    txt01:{
        fontSize:16,
        color:color.primery
    },
    txt02:{
        fontSize:14,
        color:'#333'
    },
});

export default SearchBox;
export { SearchList };
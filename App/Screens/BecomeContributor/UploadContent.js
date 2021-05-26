import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row } from 'react-native-easy-grid';
import { StyleSheet, Text, Image, View ,Alert} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { mapStateToProps, mapDispatchToProps } from '../../Redux/Actions/userActions';
import FooterDrawerModal from '../Component/FooterDrawerModal';
import Footer from '../Component/Footer';
import Header from '../Component/Header';
import { Loader, ProfileDropDown } from '../Component';
import DrawerModal from '../Component/DrawerModal';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import { isNullRetNull } from '../../Helpers/general';
import BCConfirmation from '../Component/BCConfirmation';
import BackIcon from './../../Assets/svg/back_icon.svg'
import { URI } from '../../Constants';
import Api from '../../Constants/Api';
import {AntDesign} from 'react-native-vector-icons'
import { SearchList } from '../Component/searchBox';

class UploadContent extends React.Component {
    _isMounted = false;
    constructor(props){
        super(props);
        this.state = {
            loader:false,
            isShowMidModal:false,
            isShowBottomModal: false,
            isDropDown:false,
            isShowInstractions:false,
            uploadedImages:[]
        }
    }

    async UNSAFE_componentWillMount(){
        this._isMounted = true;
        if (this._isMounted) {

        }
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    setStateObj(obj){
        this.setState({ ...this.state, ...obj })
    }

    // async pickFile(){
    //     const file = await DocumentPicker.getDocumentAsync({
    //         type:'*/*',
    //         copyToCacheDirectory:true,
    //         multiple:true
    //     })
    //     if(file.type === "success"){
    //         file['type'] = '*/*'
    //         this.state.uploadedImages.push(file)
    //         this.setStateObj({ file:file })
    //     }
    // }

    pickFile = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
                return;
            }
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            // allowsEditing: true,
            // aspect: [4, 3],
            quality: 0.5,
            allowsMultipleSelection: true,
            base64:true
        });

        console.log(result)

        if (!result.cancelled) {
            result['type'] = '*/*';
            delete result['cancelled'];
            let tempArray = result.uri.split('/');
            let fileName = tempArray[tempArray.length-1]
            result['name'] = fileName;
            let extArray = fileName.split('.')
            let ext = extArray[extArray.length-1]

            this.state.uploadedImages.push(`data:image/${ext};base64,${result.base64}`)
            this.setStateObj({ uploadedImages:this.state.uploadedImages })
        }
    };

    grantAccessForImage = ()=> {
        Alert.alert(
            "Discover Pakistan Would like to Access the Gallery",
            "Allow access photos,media, and files on your device in order to contribute in app in the form of images and videos.",
            [
            
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => this.pickFile() }
            ],
            { cancelable: false }
          );
    }

    uploadFiles(){
        this.setStateObj({ loader: true });
        let payload = {
            uri:URI.UPLOAD_CONTRIBUTOR,
            method:'post',
            headers:{ 'Content-Type': 'multipart/form-data;' },
            data:{
                user_id:this.props.userData.user_id,
                'file[]':this.state.uploadedImages
            }
        }
        // console.log(payload)
        Api(payload)
            .then((res)=>{
                console.log(res)
                this.setStateObj({ loader: false });
                if(res.data.message === 'success'){
                    alert(res.data.data);
                    this.setStateObj({ isShowInstractions:true, uploadedImages:[] })
                }else{
                    alert("Error : "+res.data.data);
                }
            })
            .catch((err)=>{
                console.log(err)
                this.setStateObj({ loader: false });
                alert("Unkown Error \n"+err)
            })
    }

    removeImage(base64){
        const { uploadedImages } = this.state;
        let newArray = []
        uploadedImages.map((item)=>{
            if(item !== base64){
                newArray.push(item)
            }
        })
        this.setStateObj({ uploadedImages:newArray })
    }

    render(){
        const {
            loader,
            isShowMidModal,
            isShowBottomModal,
            isDropDown,
            isShowInstractions,
            uploadedImages
        } = this.state;

        return (<>
            <Loader isLoader={loader} />
            <Grid style={styles.grid}>
                <Header
                    containerStyle={{ height:hp('1') }}
                    navigation={this.props.navigation}
                    toggleDrawer={()=>{ this.setStateObj({ isShowMidModal: !isShowMidModal }) }}
                    isDropDown={isDropDown}
                    setDropDown={(isActive)=>{ this.setStateObj({ isDropDown: isActive }) }}
                    isShowSearch
                    tempArray={[]}
                    filterFun={(data)=>{ }}
                    isApiSearch={true}
                    apiLoader={(is)=>{ this.setState((state)=>{ return{ ...state, searchLoader:is } }) }}
                    onTypeResult={(data)=>{ this.setState((state)=>{ return{ ...state, searchData:data } }) }}
                    isRenderPlayer={false}/>

                <Row style={styles.cardsCol}>
                    <View style={styles.row01}>
                        <View style={{ position:'absolute', left:0 }}>
                            <TouchableOpacity
                                onPress={()=>{ this.props.navigation.goBack();}}>
                                <BackIcon fill="#333"/>
                            </TouchableOpacity>
                        </View>
                        <Text style={{ fontSize:26, fontWeight:'300' }}>Upload Your Content</Text>
                    </View>
                    <View style={styles.greenArea}>
                        <Text style={{ fontSize:12, textAlign:'center' }}>
                            Uploading Vectors? Now, simply upload your EPS files. No JPEG required.
                        </Text>
                        <Text style={{ fontSize:12, textAlign:'center', fontWeight:'300', marginTop:hp('0.5') }}>
                            JPEG preview now automatically generate for your EPS files. You no longer need to upload aJPEG with each vector.
                        </Text>
                    </View>

                    <Row style={[styles.uploadContentBtnRow, uploadedImages.length > 0 ? { height:hp('35') }:{ marginBottom:hp('14') }]}>
                        
                        <TouchableOpacity
                            style={styles.selectFromHereBtn}
                            onPress={()=>{
                                this.grantAccessForImage()
                            }}>
                            <Text style={styles.selectFromHereTxt}>Select From Here</Text>
                        </TouchableOpacity>

                        <Text style={{ fontSize:14, textAlign:'center', fontWeight:'300', marginTop:hp('2') }}>
                            (.eps file or jpegs files that are atleast 4.0 megapixels)
                        </Text>

                        {uploadedImages.length > 0 &&
                            <Row style={{ height:hp('17'), marginTop:hp('2') }}>
                                <FlatList
                                    data={uploadedImages}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={styles.flatListContainer}
                                    keyExtractor={(item, i)=> JSON.stringify(i)}
                                    renderItem={(item)=>{
                                        return(<>
                                            <Image source={{ uri:isNullRetNull(item.item) }} style={styles.flatListImg}/>
                                            <View style={{
                                                position:'absolute',
                                                zIndex:2,
                                                right:0
                                            }}>
                                                <TouchableOpacity
                                                    style={{
                                                        backgroundColor:'#fff',
                                                        borderRadius:50,
                                                        width:24,
                                                        height:24
                                                    }}
                                                    onPress={()=>{
                                                        this.removeImage(item.item)
                                                    }}>
                                                    <AntDesign name={"closecircle"} size={24} color={'green'} />
                                                </TouchableOpacity>
                                            </View>
                                        </>)
                                    }}/>
                            </Row>
                        }
                    </Row>
                    <Row style={{ justifyContent:'flex-end', height:hp('10'), width:wp('90') }}>
                        <TouchableOpacity
                            style={styles.nextBtn}
                            onPress={()=>{
                                this.uploadFiles()
                            }}>
                            <Text style={styles.selectFromHereTxt}>Next</Text>
                        </TouchableOpacity>
                    </Row>
                </Row>

                <SearchList
                    { ...this.state }
                    { ...this.props }
                    onClick={(video, list, category)=>{
                        this.props.setCatDetails(list)
                        this.setStateObj({ searchData:undefined })
                        this.props.navigation.navigate("RedirectTo", { path:"ShowDetails", obj:{ category:category, video:video, screen:'Search' } })
                    }}/>

                <BCConfirmation
                    isShowModal={isShowInstractions}
                    goItBtn={()=>{
                        this.setStateObj({ isShowInstractions:!isShowInstractions })
                        // this.props.navigation.goBack()
                    }} />

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
    cardsCol:{
        width:wp('100'),
        height:hp("70"),
        alignItems:'center',
        flexDirection:'column'
    },
    uploadContentBtnRow:{
        borderWidth:1,
        borderColor:'#333',
        width:wp("90"),
        height:hp('20'),
        marginTop:hp('5'),
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    selectFromHereBtn:{
        backgroundColor:'#19b24b',
        height:hp('6'),
        width:wp('50'),
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center'
    },
    selectFromHereTxt:{
        color:"#FFF",
        fontSize:18,
        fontWeight:'600'
    },
    flatListContainer:{
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center',
        height:hp('17'),
    },
    flatListImg:{
        height:hp('14'),
        width:wp('25.5'),
        borderColor:'#333',
        borderWidth:1,
        margin:hp('1'),
        // resizeMode:'contain',
    },
    nextBtn:{
        backgroundColor:'#19b24b',
        height:hp('4'),
        width:wp('30'),
        marginTop:hp('2'),
        alignItems:'center',
        justifyContent:'center',
    },
    greenArea:{
        flexDirection:'column',
        backgroundColor:'#9EF0BA',
        paddingBottom:hp('2'),
        width:wp('90'),
        padding:hp('1')
    },
    row01:{
        alignItems:'center',
        justifyContent:'center',
        width:wp('90'),
        marginTop:hp('1'),
        marginBottom:hp('3'),
    },

});

export default connect(mapStateToProps, mapDispatchToProps)(UploadContent);
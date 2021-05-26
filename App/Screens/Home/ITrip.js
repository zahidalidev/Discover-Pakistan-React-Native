import React from 'react';
import { StyleSheet } from 'react-native';
import { Grid, Col } from 'react-native-easy-grid';
import { WebView } from 'react-native-webview';
import { connect } from 'react-redux';
import Expo from 'expo-constants';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { mapStateToProps, mapDispatchToProps } from '../../Redux/Actions/userActions';
import FooterDrawerModal from '../Component/FooterDrawerModal';
import Footer from '../Component/Footer';

class ITrip extends React.Component {
    Loader = true;
    _isMounted = false;
    constructor(props){
        super(props);
        this.state = {
            isShowBottomModal: false,
            url:'http://itrip.pk'
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
        if(this._isMounted){ this.setState({ ...this.state, ...obj }) }
    }

    render(){
        const {
            isShowBottomModal,
            url
        } = this.state;

        return (<>
            <Grid style={styles.grid}>
                <Col style={{ height:hp('100') }}>
                    <WebView
                        style={{backgroundColor: '#FFFFFF'}}
                        ref={(ref) => { this.videoPlayer = ref;}}
                        contentInset={{top: 0, left: 0, bottom: 0, right: 0}}
                        startInLoadingState={this.Loader}
                        allowsInlineMediaPlayback={false}
                        onLoadEnd={(e)=>{ this.Loader = false }}
                        useWebKit={true}
                        originWhitelist={['*']}
                        source={{ uri:url }}/>
                </Col>

                
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
        height:hp('100'),
        width:wp('100'),
        marginTop:Expo.statusBarHeight
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ITrip);

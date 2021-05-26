import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import configureStore from "./App/Redux/Store";
const { persistor, store } = configureStore();
import FlashMessage from "react-native-flash-message";
import EntryPoint from './App/Screens/EntryPoint';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Col } from "react-native-easy-grid";
import { Image } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { AppLoading } from "expo";
import * as Fonts from "expo-font";
import * as Updates from 'expo-updates';
import FONTS from "./App/Constants/fonts";

const splash03 = './App/Assets/splash_03.gif';

class App extends React.Component {

  constructor(props){
    super(props)
  }

  state = {
    isSplashTime:true,
    isFontsLoaded:false,
  }

  async UNSAFE_componentWillMount(){
    setTimeout(()=>{ this.setStateObj({ isSplashTime: false }) }, 5000)
    console.disableYellowBox = true
    try {	
      const update = await Updates.checkForUpdateAsync();	
      if (update.isAvailable) {	
        await Updates.fetchUpdateAsync();	
        Updates.reloadAsync();	
      }	
    } catch (e) {	
      // handle or log error
      // console.log("err : ", e)
    }
  }

  async componentDidMount () {
    await this._loadAssets()
  }
  
  async _loadAssets () {
    await Fonts.loadAsync(FONTS)
    this.setStateObj({ isFontsLoaded: true })
  }

  setStateObj(obj){ this.setState({ ...this.state, ...obj }) }

  render() {
    const { isSplashTime, isFontsLoaded } = this.state;
  
    if(!isFontsLoaded) {
      return <AppLoading />;
    }

    const renderSplashScreen = () =>{
      return(
        <Col style={{ width:wp('100'), height:hp('100'), alignItems:'center', justifyContent:'center' }}>
          <Image source={require(splash03)} style={{ width:wp('100'), height:wp('100') }} />
        </Col>
      )
    }

    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <FlashMessage position="top" style={{ alignContent: "center", alignItems: "center" }}/>
          { isSplashTime ? renderSplashScreen() : <EntryPoint /> }
        </PersistGate>
      </Provider>
    );
  }
}

export default gestureHandlerRootHOC(App)
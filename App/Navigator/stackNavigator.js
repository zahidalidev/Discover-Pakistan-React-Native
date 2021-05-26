import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Home from "./../Screens/Home/index";
import Jobs from "./../Screens/Home/Jobs";
import Shows from "./../Screens/Home/Shows";
import ITrip from "./../Screens/Home/ITrip";
import ShowDetails from "./../Screens/Home/ShowDetails";
import PrivacyPolicy from "./../Screens/Home/PrivacyPolicy";
import TermsConditions from "./../Screens/Home/TermsConditions";
import Disclaimer from "./../Screens/Home/Disclaimer";
import Aboutus from "./../Screens/Home/Aboutus";
import ContactUs from "./../Screens/Home/ContactUs";
import AdvertiseWithUs from "./../Screens/Home/AdvertiseWithUs";
import Partners from "./../Screens/Home/Partners";
import AboutDiscoverPakistan from "./../Screens/Home/AboutDiscoverPakistan";
import LiveStreaming from "./../Screens/Home/LiveStreaming";
import Profile from "./../Screens/Home/Profile";

// Tourist Community
import TouristCommunity from "../Screens/TouristCommunity/Index";
import TCComments from "./../Screens/TouristCommunity/TCComments";

// Become Contributor
import BecomeContributor from "./../Screens/BecomeContributor/Index";
import UploadContent from "./../Screens/BecomeContributor/UploadContent";

// ECommerce Screens
import ECommerce from "./../Screens/ECommerce/index";
import ProductDetails from "./../Screens/ECommerce/productDetails";
import MyBagScreen from "./../Screens/ECommerce/MyBagScreen";
import Orders from "./../Screens/ECommerce/Orders";
import ThankYouScreen from "./../Screens/ECommerce/ThankYou";

import { RedirectTo } from "./../Screens/Component/index";
// Auth Screen
import Signin from "./../Screens/Auth/Signin";
import Signup from "./../Screens/Auth/Signup";
import SubHeader2 from "../Screens/Component/SubHeader2";

const HomeNav = createStackNavigator({
  Home: { screen: SubHeader2, navigationOptions: { headerShown: false } },
  ITrip: { screen: ITrip, navigationOptions: { headerShown: false } },
  Shows: { screen: Shows, navigationOptions: { headerShown: false } },
  ShowDetails: {
    screen: ShowDetails,
    navigationOptions: { headerShown: false },
  },
  PrivacyPolicy: {
    screen: PrivacyPolicy,
    navigationOptions: { headerShown: false },
  },
  TermsConditions: {
    screen: TermsConditions,
    navigationOptions: { headerShown: false },
  },
  Disclaimer: { screen: Disclaimer, navigationOptions: { headerShown: false } },
  Aboutus: { screen: Aboutus, navigationOptions: { headerShown: false } },
  ContactUs: { screen: ContactUs, navigationOptions: { headerShown: false } },
  Jobs: { screen: Jobs, navigationOptions: { headerShown: false } },
  AdvertiseWithUs: {
    screen: AdvertiseWithUs,
    navigationOptions: { headerShown: false },
  },
  Partners: { screen: Partners, navigationOptions: { headerShown: false } },
  AboutDiscoverPakistan: {
    screen: AboutDiscoverPakistan,
    navigationOptions: { headerShown: false },
  },
  LiveStreaming: {
    screen: LiveStreaming,
    navigationOptions: { headerShown: false },
  },
  Profile: { screen: Profile, navigationOptions: { headerShown: false } },

  RedirectTo: { screen: RedirectTo, navigationOptions: { headerShown: false } },

  // Tourist Community
  TouristCommunity: {
    screen: TouristCommunity,
    navigationOptions: { headerShown: false },
  },
  TCComments: { screen: TCComments, navigationOptions: { headerShown: false } },

  // Bcome Contributor
  BecomeContributor: {
    screen: BecomeContributor,
    navigationOptions: { headerShown: false },
  },
  UploadContent: {
    screen: UploadContent,
    navigationOptions: { headerShown: false },
  },

  // ECommerce Screens
  ECommerce: { screen: ECommerce, navigationOptions: { headerShown: false } },
  ProductDetails: {
    screen: ProductDetails,
    navigationOptions: { headerShown: false },
  },
  MyBagScreen: {
    screen: MyBagScreen,
    navigationOptions: { headerShown: false },
  },
  Orders: { screen: Orders, navigationOptions: { headerShown: false } },
  ThankYouScreen: {
    screen: ThankYouScreen,
    navigationOptions: { headerShown: false },
  },

  // Auth
  Signin: { screen: Signin, navigationOptions: { headerShown: false } },
  Signup: { screen: Signup, navigationOptions: { headerShown: false } },
});

const Auth = createStackNavigator({
  Signin: { screen: Signin, navigationOptions: { headerShown: false } },
  Signup: { screen: Signup, navigationOptions: { headerShown: false } },
});

const AuthNavigator = createAppContainer(Auth);
export const HomeNavigator = createAppContainer(HomeNav);

export default AuthNavigator;

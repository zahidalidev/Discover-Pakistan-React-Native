import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import Drawer from '../Navigator/drawerNavigator';
import AuthNavigator from '../Navigator/stackNavigator';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../Redux/Actions/userActions';


 class EntryPoint extends React.Component {
    constructor(props){
        super(props);
    }

    UNSAFE_componentWillMount(){
        console.disableYellowBox = true;
    }

    render(){
        const { isLoggedIn } = this.props;
        // if(isLoggedIn){
            return <Drawer />
        // }else{
        //     return <AuthNavigator />
        // }
    }
};

const styles = StyleSheet.create({});

export default connect(mapStateToProps, mapDispatchToProps)(EntryPoint)

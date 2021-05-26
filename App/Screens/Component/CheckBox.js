import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { mapStateToProps, mapDispatchToProps } from './../../Redux/Actions/userActions';
import { connect } from 'react-redux';

class Checkbox extends React.Component {
    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
        const { checked, onChecked, checkBoxStyle, selectorStyle } = this.props
        return (<>
           <View style={[styles.mainContainer, checkBoxStyle ]}>
               <TouchableOpacity
                style={[ [styles.checkBtn, selectorStyle], checked ?{backgroundColor:'#53AF57',} : {} ]}
                onPress={()=>{ onChecked(!checked) }}>
               </TouchableOpacity>
           </View>
        </>);
    }
};

const styles = StyleSheet.create({
    mainContainer:{
        margin:2,
        backgroundColor:'#FFFFFF',
        height:heightPercentageToDP('2.8'),
        width:heightPercentageToDP('2.8'),
        borderWidth:1,
        borderColor:'#333333',
        alignItems:'center',
        justifyContent:'center'
    },
    checkBtn:{
        height:heightPercentageToDP('2'),
        width:heightPercentageToDP('2'),
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkbox);
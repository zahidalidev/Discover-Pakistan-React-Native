
import React, { Component } from 'react'
import { Animated, View, StyleSheet, ScrollView } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

const deviceWidth = wp('100')
const FIXED_BAR_WIDTH = wp('100')
const BAR_SPACE = hp('1')

export default class Carousel extends Component {
    constructor(props){
      super(props)
    }

  render() {
        const array = this.props.data ? this.props.data : []
        const numItems = array.length
        const itemWidth = (FIXED_BAR_WIDTH / numItems) - ((numItems - 1) * BAR_SPACE)
        const animVal = new Animated.Value(0)

        let imageArray = []
        let barArray = []
        array.forEach((item, i) => {

        const thisImage = (
            <View key={`card${i}`} style={[styles.main, { width:this.props.width ? this.props.width : deviceWidth }]}>
                {this.props.renderItem(item, i)}
            </View>
        )

        imageArray.push(thisImage)

        const scrollBarVal = animVal.interpolate({
            inputRange: [deviceWidth * (i - 1), deviceWidth * (i + 1)],
            outputRange: [-itemWidth, itemWidth],
            extrapolate: 'clamp',
        })

        const thisBar = (
            <View key={`bar${i}`} style={[ styles.track, { marginLeft: i === 0 ? 0 : BAR_SPACE } ]}>
                <Animated.View style={[ styles.bar, { transform: [{ translateX: scrollBarVal }] } ]}/>
            </View>
        )
        barArray.push(thisBar)
    })

    return (
      <View style={styles.container} flex={1}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={10}
                pagingEnabled
                onScroll={Animated.event( [{ nativeEvent: { contentOffset: { x: animVal } } }] )}>
                {imageArray}
            </ScrollView>
            <View style={styles.barContainer}>{barArray}</View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  barContainer: {
    position: 'absolute',
    zIndex: 2,
    marginTop:hp('1'),
    bottom: 0,
    flexDirection: 'row',
  },
  skip: {
    position: 'absolute',
    zIndex: 2,
    bottom: 80,
    flexDirection: 'row',
  },
  track: {
    backgroundColor: '#ccc',
    overflow: 'hidden',
    right:0,
    height:wp('1'),
    width:wp('10'),
    borderRadius:50
  },
  bar: {
    backgroundColor: '#19b24b',
    height:wp('1'),
    width:wp('10'),
    borderRadius:50,
    position: 'absolute',
    left: 0,
    top: 0,
  },
})
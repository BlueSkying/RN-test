import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
export const kwidth = Dimensions.get('window').width;
// 获取设备屏幕高
export const kheight = Dimensions.get('window').height;

export default class PersonServiceView extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount() {

    }

    _closeView=()=>{

    }

    render(){
        return(
        <View style={styles.bgstyle}>
            <Text>管家</Text>
        </View>
        )
    }
}

const styles = StyleSheet.create({
     bgstyle:{
         backgroundColor:'#999999',
         width:kwidth,
         height:kheight,
     },

});
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    Button,
    TouchableOpacity
} from 'react-native';
const { kwidth , kheight} = Dimensions.get('window');

export default class MainTitleView extends Component{
    render(){
        return(
            <View style={styles.container}>
                <TouchableOpacity onPress={this.props.scan}>
                    <Image source={require('../resources/in-scan-code.png')} style={styles.leftStyle} />
                </TouchableOpacity>
                <TouchableOpacity onPress={this.props.exchange}>
                    <Text style={styles.titleStyle}>
                        生活家
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.props.exchange}>
                    <Image source={require('../resources/in-arrow.png')} style={styles.rowStyle}/>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width:kwidth,
        height:64,
        backgroundColor:'#ffffff',
        flexDirection:'row',
    },
    leftStyle:{
        marginLeft:15,
        marginTop:31,
        width:22,
        height:22
    },
    titleStyle:{
        marginTop:31,
        color:"#333333",
        fontSize:18,
        textAlign:'center',
        marginLeft:120,
    },
    rowStyle:{
        width:10,
        height:10,
        marginTop:37,
        marginLeft:10
    }

});
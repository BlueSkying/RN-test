import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Button,
    Image,
    TouchableOpacity
} from 'react-native';

const { kwidth , kheight} = Dimensions.get('window');
export default class MainTitleView extends Component{
    render(){
        return(
            <View style={styles.container}>
                <TouchableOpacity onPress={this.props.scan()}>
                    <Image source={require('../resources/in-scan-code.png')} style={styles.leftStyle} />
                </TouchableOpacity>

                <Button onPress={this.props.exchange()}
                    title='生活家'
                    color="#333333"
                    style={styles.bttonStyle}
                />
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
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center',
        width:22,
        height:22
    },
    bttonStyle:{
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center',
    },

});
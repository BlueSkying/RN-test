import React, { Component } from 'react';
import {
    ActivityIndicator,
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    DeviceEventEmitter,
    Dimensions,
    WebView,
    Linking,
} from 'react-native';
import Test3 from "./Test3";
export const kwidth = Dimensions.get('window').width;
// 获取设备屏幕高
export const kheight = Dimensions.get('window').height;

export default class WebViewVCN extends Component {

    //拨打电话
    linking=(url)=>{
        Linking.openURL(url);
    }

    render() {
        return (
            <View style={styles.container}>
                <WebView scalesPageToFit={true}
                         bounces={false}
                         source={{url: this.props.navigation.state.params.h5url}}
                         style={styles.webSize}
                         onLoad={(e) => console.warn('load')}
                         onLoadEnd={(e) => console.warn('onloadend')}
                         onLoadStart={(e) => {
                             return (<View style={[styles.container, styles.horizontal]}>
                                 <ActivityIndicator size='large' color='#0000ff'/>
                             </View>)
                         }}
                         renderError={() => {
                             return (<View><Text>renderError回调了，出现错误</Text></View>)
                         }}
                         renderLoading={() => {
                             return (<View style={[styles.container, styles.horizontal]}>
                                 {<ActivityIndicator size='large' color='#0000ff'/>}
                             </View>)
                         }}
                         onShouldStartLoadWithRequest={(event) => {
                             console.warn(event);
                             if (event.url.includes('tel:')) {   //tel:028-87852242
                                 this.linking(event.url)
                                 return false
                             } else if (event.url.includes('www.vmcshop.com')) {
                                 return false
                             } else {
                                 return true
                             }
                         }
                         }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    webSize:{
        width:kwidth,
        height:kheight,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        marginTop:10,
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
        fontSize:18
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    }
});
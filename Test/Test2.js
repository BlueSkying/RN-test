/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

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
const GankIcon = require('../resources/Gank.png');
const ShiTuIcon = require('../resources/ShiTu.png');

let badgeNumber = 11;

function bar(func = () => foo) {
    let foo = 'inner';
    console.log(func());
}

export default class Test2 extends Component {

    static navigationOptions = ({navigation,screenProps}) => ({
        // 这里面的属性和App.js的navigationOptions是一样的。
        // 下面就是文章中修改主题色的方法
        headerStyle:{backgroundColor:screenProps?screenProps.themeColor:'#4ECBFC'},
        headerTitle:navigation.state.params?navigation.state.params.headerTitle:'Test2',
        tabBarLabel:navigation.state.params?navigation.state.params.tabBarLabel:'Test2',
        tabBarIcon: (({tintColor,focused}) => {
            if(focused){
                // 做操作
            }
            return(
                <Image
                    // 可以用过判断focused来修改选中图片和默认图片
                    source={!focused ? ShiTuIcon : GankIcon}
                    // 如果想要图标原来的样子可以去掉tintColor
                    style={[{height:35,width:35 }]}
                />
            )
        }),
        headerRight:(
            <Text style={{color:'red',marginRight:20}} onPress={()=>navigation.state.params.navigatePress()}>我的</Text>
        ),
        tabBarOnPress:(obj)=>{
            console.log(obj);

            // navigation.state.params.tabBarOnPress();

            obj.jumpToIndex(obj.scene.index);
        },
    })

    componentWillUnmount(){
        this.subscription.remove();
    };
    componentDidMount(){
        // 通过在componentDidMount里面设置setParams将title的值动态修改
        this.props.navigation.setParams({
            headerTitle:'干货集中营',
            tabBarLabel:'干货',
            navigatePress:this.navigatePress,
            tabBarOnPress:this._tabBarOnPress
        });
    }

    _alert = () => {
        alert('123');
    }

    _tabBarOnPress = () =>{
        this._alert();
    }

    navigatePress = () => {
        alert('点击headerRight');
    }

    //拨打电话
    linking=(url)=>{

        console.log(url);

        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.log('Can\'t handle url: ' + url);
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err));

    }


    render() {
        bar()
        return (
            <View style={styles.container}>
                <WebView scalesPageToFit={true}
                         bounces={false}
                         source={{uri:"http://mall.justbon.com.cn/m/project.html?uid=1285858633&userToken=CA1FC79A7910241C1479B3ABADD1EB2B"}}
                         style={styles.webSize}
                         onLoad={(e)=>console.log('load')}
                         onLoadEnd={(e)=>console.log('onloadend')}
                         onLoadStart={(e)=>{
                             return (<View style={[styles.container,styles.horizontal]}>
                                        <ActivityIndicator size='large' color='#0000ff'/>
                                     </View>)
                         }}
                         renderError={()=>{
                             return(<View><Text>renderError回调了，出现错误</Text></View>)
                         }}
                         renderLoading={()=>{
                              return (<View style={[styles.container,styles.horizontal]}>
                                        {<ActivityIndicator size='large' color='#0000ff'/>}
                                      </View>)
                         }}
                         onShouldStartLoadWithRequest={(event)=>{
                                if(event.url.includes('tel:')){
                                    this.linking(event.uri)
                                    return false
                                }else if(event.url.includes('www.vmcshop.com')){
                                    return false
                                }else if(event.url.includes('.mall.justbon')){
                                    console.warn(event.url)
                                    return false
                                }else{
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

AppRegistry.registerComponent('AwesomeProject',()=>Test2);
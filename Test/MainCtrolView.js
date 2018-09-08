/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Alert,
    SectionList
} from 'react-native';
import Geolocation from 'Geolocation';
import MainTitleView from './MainTitleView.js';
import Request from './Request';
import Config from './config';
//监听定位的id
let loactionID = null;
var longitude = null;
var latitude = null;
export default class Test1 extends Component {

    static navigationOptions = ({navigation,screenProps}) => ({
        // 这里面的属性和App.js的navigationOptions是一样的。
        header:(
            <MainTitleView  scan={()=>navigation.state.params?navigation.state.params.scanBrcode():null}
                            exchange = {()=>navigation.state.params?navigation.state.params.exchangeProject():null}/>
        ),
    })

    constructor(props){
        super(props);
        let weatherMap = [];
        this.state = {
            weatherMap:weatherMap,
        }
    }

    componentDidMount(){
        // 通过在componentDidMount里面设置setParams将title的值动态修改
        this.props.navigation.setParams({
            scanBrcode:this.scan,
            exchangeProject:this.exchange,
        });
        this.getLongitudeAndLatitude();
        this.fetchBannerAds();
    }

    componentWillUnmount() {
        this.stopLocation()
    }

    //获取经纬度的方法  Longitude  Latitude
    getLongitudeAndLatitude = () => {

        loactionID =  Geolocation.getCurrentPosition(
                location => {
                    //可以获取到的数据
                    var result = "速度：" + location.coords.speed +
                        "\n经度：" + location.coords.longitude +
                        "\n纬度：" + location.coords.latitude +
                        "\n准确度：" + location.coords.accuracy +
                        "\n行进方向：" + location.coords.heading +
                        "\n海拔：" + location.coords.altitude +
                        "\n海拔准确度：" + location.coords.altitudeAccuracy +
                        "\n时间戳：" + location.timestamp;
                    longitude=location.coords.longitude.toString();
                    latitude=location.coords.latitude.toString();
                    this.fetchWeather();
                    // Alert.alert(result);
                },
                error => {
                     Alert.alert("获取位置失败：" + error, "")
                }
            );
    }

    //停止地图定位
    stopLocation(){
        Geolocation.clearWatch(loactionID);
    }
    //获取banner广告
    fetchBannerAds(){
        Request.post(Config.api.bannerAdsUrl,{'type':'index','projectId':'38562569'},(data)=>{
            // console.warn(data);
            this.fetchButtonRole();
        },(error)=>{
            console.warn(error);
        });
    }
    //根据经纬度获取天气和现行情况
    fetchWeather(){
       Request.post(Config.api.wetherUrl,{'location':(longitude + "," + latitude)},(data)=>{
              weatherMap=data;
           // console.warn(weatherMap);
        },(error)=>{
            console.warn(error);
        });
    }
    //获取按钮权限
    fetchButtonRole(){
        Request.get(Config.api.buttoRoleUrl,(data)=>{
            console.warn(data);
            this.fetchShopMail();
        },(error)=>{
            console.warn(error);
        });
    }
    //获取通栏广告
    fetchShopMail(){
        Request.post(Config.api.shopMailUrl,{'projectId':'38562569'},(data)=>{
            // console.warn(data);
        },(error)=>{
            console.warn(error);
        });
    }
    //点击了扫描按钮
    scan = ()=>{
        alert('点击了扫描按钮')
    }
     //点击了项目切换按钮
    exchange = ()=>{
        alert('点击了项目切换按钮')
    }

    navigatePress = () => {
        const { goBack } = this.props.navigation;
        goBack();
    }

    render() {
        var sections = [];
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to Test1 !
                </Text>
                <Text style={styles.instructions} onPress={()=>{
                    const { navigate } = this.props.navigation;
                    navigate('Detail1');
                }}>
                    点我跳转到Detail1
                </Text>
                <Text style={styles.instructions}>
                    当前页面的Tabbar是在App.js中通过最普通的方式自定义。
                </Text>
                <Text style={styles.instructions} onPress={()=>{
                    const { navigate } = this.props.navigation;
                    navigate('Detail2');
                }}>
                    在Detail2中有reset和navigate的使用方法(点文字跳转)
                </Text>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
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
        fontSize: 18,
    },
});


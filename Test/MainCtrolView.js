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
    Image,
    SectionList,
    Dimensions,
} from 'react-native';
import Geolocation from 'Geolocation';
import MainTitleView from './MainTitleView.js';
import Request from './Request';
import Config from './config';
//监听定位的id
let loactionID = null;
var longitude = null;
var latitude = null;
// 获取设备屏幕宽
export const kwidth = Dimensions.get('window').width;
// 获取设备屏幕高
export const kheight = Dimensions.get('window').height;
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
        let weatherMap = {};
        var bannerArray = [];
        var bannerImgUrl = null;
        var btnArray = [];
        var middleArray = [];
        var shopMailArray = [];
        this.state = {
            weatherMap:weatherMap,
            bannerArray:bannerArray,
            bannerImgUrl:bannerImgUrl,
            btnArray:btnArray,
            middleArray:middleArray,
            shopMailArray:shopMailArray,
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
        var conunter = 0;
        setInterval(()=>{
            if(this.state.bannerArray != null) {
                conunter++;
                if(conunter == this.state.bannerArray.length){
                    conunter = 0;
                }
                let brannerMap = this.state.bannerArray[conunter];
                if(brannerMap != null){
                    this.setState({
                        bannerImgUrl:brannerMap.imgUrl,
                    });
                }
            }else{
                console.warn('无数据');
            }
        },3000);
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
            this.setState({
               bannerArray:data.ads,
            });
            this.fetchButtonRole();
        },(error)=>{
            console.warn(error);
        });
    }
    //根据经纬度获取天气和现行情况
    fetchWeather(){
       Request.post(Config.api.wetherUrl,{'location':(longitude + "," + latitude)},(data)=>{
            this.setState({
               weatherMap:data,
            });
        },(error)=>{
            console.warn(error);
        });
    }
    //获取按钮权限
    fetchButtonRole(){
        Request.get(Config.api.buttoRoleUrl,(data)=>{
            this.setState({
                btnArray:data.top,
            });
            this.fetchShopMail();
        },(error)=>{
            console.warn(error);
        });
    }
    //获取通栏广告
    fetchShopMail(){
        Request.post(Config.api.shopMailUrl,{'projectId':'38562569'},(data)=>{
              // console.warn(data.ad);
             this.setState({
                middleArray:data.shop,
                shopMailArray:data.ad,
             });
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
    _renderItem = (info) => {
       return(
           <View style={styles.shopMailBgStyle}>
               <Text style={{color:'#333333',fontSize:15,height:20,paddingTop:0}}>{info.item.object.mainTitle}</Text>
               <Text style={{color:'#999999',fontSize:12,height:15,paddingTop:2}}>{info.item.object.subTitle}</Text>
               <Image source={{uri:info.item.object.imgUrl}} style={styles.shopMailStyle} />
           </View>
       );
    }
    //banner广告循环
    _cirecleBannerImgItem = (info) =>{
        return(
            <View style={styles.banner}>
                    <Image source={{uri:(this.state.bannerImgUrl)?this.state.bannerImgUrl:''}} style = {styles.banner} />
            </View>
        );
    }
    //天气预报  限行
    _weatherLimitItem = (info) =>{
        var xxlimit = this.state.weatherMap.xx;
        return(
            <View style={styles.weatherStyle}>
                <Text style={styles.cityStyle}>
                    {this.state.weatherMap.city +'        '+ this.state.weatherMap.weather +'      '+ this.state.weatherMap.cTemperature +'℃'}
                </Text>
                <Text style={styles.limitStyle}>
                    {'车辆限行    ' + ((!xxlimit)?'--':xxlimit.xxnum)}
                </Text>
            </View>
        );
    }
    //按钮内容
    _btnsItem = (info) => {
        if(this.state.btnArray != null){
            let topArray = this.state.btnArray.slice(0,4);
            let downArray = this.state.btnArray.slice(4,8);
            return(
                <View style={styles.bttonBgStyle}>
                    <View style={styles.bttonHalfStyle}>
                        {topArray.map(function (item) {
                            return(
                                <View style={styles.bttonStyle}>
                                    <Image source={{uri:item.realName?item.realName:''}} style={{width:45,height:45}} />
                                    <Text>{item.funcName}</Text>
                                </View>
                             )
                        })}
                    </View>
                    <View style={styles.bttonHalfStyle}>
                        {downArray.map(function (item) {
                            return(
                                <View style={styles.bttonStyle}>
                                    <Image source={{uri:item.realName?item.realName:''}} style={{width:45,height:45}} />
                                    <Text>{item.funcName}</Text>
                                </View>
                            )
                        })}
                    </View>
                </View>
            );
        }
    }
    //中部广告
    _middleShopMai = (info) =>{
        var leftShop = this.state.middleArray[0];
        var rightTop = this.state.middleArray[1];
        var rightDown = this.state.middleArray[2];
            return (
                <View style={{width: kwidth, height: 150, flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                        <Image source={{uri: leftShop != null?leftShop.imgUrl:''}} style={{flex: 1, height: 150}}/>
                    </View>
                    <View style={{flex: 1, flexDirection: 'column'}}>
                        <Image source={{uri:rightTop != null?rightTop.imgUrl:''}} style={{flex:1,height:150}}/>
                        <Image source={{uri:rightDown != null?rightDown.imgUrl:''}} style={{flex:1,height:150}}/>
                    </View>
                </View>
            );

    }

    _setionComp = (info) =>{
        var txt = info.section.key;
        return <View style={{height:txt == 'first'?0:10,justifyContent:"center",alignItems:'center'}}>

        </View>
    }
    _extraUniqueKey(item ,index){
        return "index"+index+item;
    }
    render() {
        var dataarray = [];
        if (this.state.shopMailArray != null){
              var shopArray = this.state.shopMailArray.concat()
              shopArray.map(function (item) {
                dataarray.push({key:item.mainTitle,object:item});
            })
        }
        var sections = [];
            sections.push({key:'first', data:[{title:"阿童木"}],renderItem:this._cirecleBannerImgItem},)
            sections.push({key:'second', data:[{title:"阿童木"}],renderItem:this._weatherLimitItem},)
            sections.push({key:'third', data:[{title:"阿童木"}],renderItem:this._btnsItem},)
            sections.push({key:'four', data:[{title:"阿童木"}],renderItem:this._middleShopMai},)
            if(dataarray != null){
                sections.push({key:'five', data:dataarray,renderItem:this._renderItem},)
            }

        return(
            <View style={{flex:1}}>
              <SectionList
                 renderSectionHeader={this._setionComp}
                 renderItem = {this._renderItem}
                 sections = {sections}
                 ItemSeparatorComponent = {()=><View><Text></Text></View>}
                 keyExtractor = {this._extraUniqueKey}// 每个item的key
                 removeClippedSubviews={false}
              />
            </View>
        );
        /*
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
        */
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
    banner:{
        backgroundColor:'#ffffff',
        width:kwidth,
        height:kwidth/2,
    },
    weatherStyle:{
        backgroundColor:'#ffffff',
        flexDirection:'row',
        width:kwidth,
        height:40,
    },
    cityStyle:{
      marginTop:10,
      marginLeft:15,
      marginRight:'auto',
      marginBottom:'auto'
    },
    limitStyle:{
        marginTop:10,
        marginRight:15,
        marginLeft:'auto',
        marginBottom:'auto',
    },
    bttonBgStyle:{
       width:kwidth,
       height:164,
       backgroundColor:'#ffffff',
       flex:1,
    },
    bttonHalfStyle:{
      width:kwidth,
      height:82,
      flexDirection:'row',
      flex:1,
    },
    bttonStyle:{
      flex:1,
      width:kwidth-40/4,
      height:82,
      flexDirection:'column',
      backgroundColor:'#ffffff',
      justifyContent:'center',
      alignItems:'center',
    },
    shopMailBgStyle:{
        width:kwidth,
        height:kwidth*8/15+50+10,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#ffffff'
    },
    shopMailStyle:{
        width:kwidth,
        height:kwidth*8/15,
        marginTop:5,
    }
});


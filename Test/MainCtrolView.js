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
    Modal,
    TouchableOpacity,
    DeviceEventEmitter,
    NativeModules,
    Platform,
} from 'react-native';
 import {Geolocation, MapView,MapTypes,MapModule} from 'react-native-baidu-map';
 // import Geolocation from 'Geolocation';
import MainTitleView from './MainTitleView.js';
import Request from './Request';
import Config from './config';
import HouseExchangeView from './HouseExchangeView'
import WechatTestVCN from "./WechatTestVCN";
import SplashScreen from 'react-native-splash-screen'
import PhotoUsageVCN from "./PhotoUsageVCN";
import ResidentVCN from "./ResidentVCN";
import PersonServiceView from "./PersonServiceView";
//监听定位的id
let loactionID = null;
var longitude = null;
var latitude = null;
//在js中需要调用oc定义的方法，需要先导入nativemodules
var openDoor = NativeModules.PushNative;
// 获取设备屏幕宽
export const kwidth = Dimensions.get('window').width;
// 获取设备屏幕高
export const kheight = Dimensions.get('window').height;
export default class Test1 extends Component {

    static navigationOptions = ({navigation,screenProps}) => {
        const {params} = navigation.state
        return ({
            // 这里面的属性和App.js的navigationOptions是一样的。
            header: (
                <View style={styles.navContainer}>
                    <TouchableOpacity onPress={()=>navigation.state.params?navigation.state.params.scanBrcode():null}>
                        <Image source={require('../resources/in-scan-code.png')} style={styles.leftStyle}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.state.params?navigation.state.params.exchangeProject():null}>
                        <View style={{width:kwidth-37-37,flexDirection:'row',justifyContent:'center',}}>
                          <Text style={styles.titleStyle}>
                            {params ? params.title  : "生活家"}
                          </Text>
                          <Image source={require('../resources/in-arrow.png')} style={styles.rowStyle}/>
                        </View>
                    </TouchableOpacity>
                </View>
            ),
        });
    }

    constructor(props){
        super(props);
        let weatherMap = {};
        var bannerArray = [];
        var bannerImgUrl = null;
        var btnArray = [];
        var middleArray = [];
        var shopMailArray = [];
        var personServiceArray = [];
        let projectID = '1562561263';
        let userID = '1285858633';
        let resuorceID = '';
        let h5url = null;
        this.state = {
            weatherMap:weatherMap,
            bannerArray:bannerArray,
            bannerImgUrl:bannerImgUrl,
            btnArray:btnArray,
            middleArray:middleArray,
            shopMailArray:shopMailArray,
            personServiceArray:personServiceArray,
            isShowPop:false,
            projectID:projectID,
            userID:userID,
            resuorceID:resuorceID,
            h5url:h5url,
            isRefresh:false,
            isShowPerson:false,
        }
        this.props.navigation.setParams({title: "生活家"});
    }

    componentDidMount(){
        // 启动页面隐藏
        if (Platform.OS === 'android'){
            setTimeout(() => {
                SplashScreen.hide();
            }, 1000);
        }
        // 注册登录成功或失败的方法，便于更新页面
        this.subsriptionLogIn = DeviceEventEmitter.addListener('LoginInSuccess',(params)=>{
             console.warn(params)
            this.setState({
                projectID:params['projectID'],
                userID:params['contactID'],
            })
            this.fetchBannerAds();
        });
        this.subsriptionLogOut = DeviceEventEmitter.addListener('LoginOutSuccess',()=>{
            // alert('退出登录回调')
            this.setState({
                projectID:'1562561263',
                userID:'1285858633',
            })
            this.fetchBannerAds();
        });
        // 通过在componentDidMount里面设置setParams将title的值动态修改
        this.props.navigation.setParams({
            scanBrcode:this.scanBrcode,
            exchangeProject:this.exchange,
        });
        this.fetchBannerAds();
        this.loadFromLocal();
         // this.getLongitudeAndLatitude();
        this.getLongtitduAndLatitudeByBaidu();
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
    //加载本地缓存数据
     loadFromLocal = async()=>{
        let oldData = await global.storage.load({
            key:'recommendList'
        })
        console.warn(oldData['data']['contactId'])
        this.setState({
            projectID:oldData!=null? oldData['data']['projectId']:'1562561263',
            userID:oldData!=null? oldData['data']['contactId']:'1285858633',
            resuorceID:oldData!=null? oldData['data']['contactId']:'',
        })

        this.fetchBannerAds();
    }
    componentWillUnmount() {
        this.stopLocation()
        this.subsriptionLogIn.remove()
        this.subsriptionLogOut.remove()
    }
    //百度地图获取经纬度
    getLongtitduAndLatitudeByBaidu = ()=>{
        Geolocation.getCurrentPosition().then(
            (data)=>{
                 longitude = data.longitude,
                 latitude = data.latitude,
                 this.fetchWeather();
            }
        ).catch(error=>{
            console.warn(error,'error')
        })
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
        Request.post(Config.api.bannerAdsUrl,{'type':'index','projectId':this.state.projectID},(data)=>{
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
        Request.post(Config.api.shopMailUrl,{'projectId':this.state.projectID},(data)=>{
              // console.warn(data.ad);
             this.setState({
                middleArray:data.shop,
                shopMailArray:data.ad,
                isRefresh:false
             });
        },(error)=>{
            console.warn(error);
        });
    }
    //获取专属管家
    fetchPersonService(){
        Request.post(Config.api.personServiceUrl,{'token':global.userToken,'params':{'resourceId':this.state.resuorceID,
                'projectId':this.state.projectID,'contactId':this.state.userID}},(data)=>{
            this.setState({
                personServiceArray:data.data,
                isShowPerson : true,
            });
        },(error)=>{
            console.warn(error);
        });
    }
    //点击了扫描按钮
    scanBrcode = () =>{
        const { navigate } = this.props.navigation;
        navigate('ScanQrcode',{callback:((info) =>{
            alert(info);
            })
        });
    }
     //点击了项目切换按钮
    exchange = ()=> {
         this.setState({
             isShowPop:true,
         })
    };

    //跳转新页面
    toNewWebView = (url) =>{
        console.warn(url)
        const { navigate } = this.props.navigation;
        navigate('WebViewVCN',{h5url:url});
    };
    //按钮点击
    centerBtnClick = (item) =>{
        if(item.funcName === '一键开门'){
            const { navigate } = this.props.navigation;
            navigate('BluetoothSerialVCN');
        }else if(item.funcName === '在线缴费'){
            const {navigate} = this.props.navigation;
            navigate('WechatTestVCN');
        }else if(item.funcName === '在线报修'){
            const {navigate} = this.props.navigation;
            navigate('PhotoUsageVCN');
        }else if(item.funcName === '小区公告'){
            const {navigate} = this.props.navigation;
            navigate('ResidentVCN');
        }else if(item.funcName === '专属管家'){
            this.fetchPersonService()
        }else{
            if (Platform.OS === 'ios'){
                openDoor.RNOpenOpendoorVC(item.funcName);
            }else{
                 alert(item.funcName);
            }

        }
    };
    navigatePress = () => {
        const { goBack } = this.props.navigation;
        goBack();
    };
    _renderItem = (info) => {
       return(
           <TouchableOpacity style={{flex: 1}} onPress={this.toNewWebView.bind(this,info.item.object.url)}>
             <View style={styles.shopMailBgStyle}>
               <Text style={{color:'#333333',fontSize:15,height:20,paddingTop:0}}>{info.item.object.mainTitle}</Text>
               <Text style={{color:'#999999',fontSize:12,height:15,paddingTop:2}}>{info.item.object.subTitle}</Text>
               <Image source={{uri:info.item.object.imgUrl}} style={styles.shopMailStyle} />
             </View>
           </TouchableOpacity>
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
                    {
                        this.state.weatherMap.city +'        '+ this.state.weatherMap.weather +'      '+ this.state.weatherMap.cTemperature +'℃'
                    }
                </Text>
                <Text style={styles.limitStyle}>
                    {'车辆限行    ' + ((!xxlimit)?'--':xxlimit.xxnum)}
                </Text>
            </View>
        );
    }
    //按钮内容
    _btnsItem = (info) => {
        let thiz = this;
        if(this.state.btnArray != null){
            let topArray = this.state.btnArray.slice(0,4);
            let downArray = this.state.btnArray.slice(4,8);
            return(
                <View style={styles.bttonBgStyle}>
                    <View style={styles.bttonHalfStyle}>
                        {topArray.map(function (item) {
                            return(
                                <View style={styles.bttonStyle} key={item.id}>
                                    <TouchableOpacity key={item.id} style={{flex:1}} onPress={()=>thiz.centerBtnClick(item)}>
                                    <Image source={{uri:item.realName?item.realName:''}} style={{width:45,height:45,marginTop:10,marginLeft:10}} />
                                    <Text>{item.funcName}</Text>
                                    </TouchableOpacity>
                                </View>
                             )
                        })}
                    </View>
                    <View style={styles.bttonHalfStyle}>
                        {downArray.map(function (item) {
                            return(
                                <View style={styles.bttonStyle} key={item.id}>
                                    <TouchableOpacity key={item.id} style={{flex:1}} onPress={()=>thiz.centerBtnClick(item)}>
                                    <Image source={{uri:item.realName?item.realName:''}} style={{width:45,height:45,marginTop:10,marginLeft:10}} />
                                    <Text>{item.funcName}</Text>
                                    </TouchableOpacity>
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
                    <TouchableOpacity style={{flex: 1}} onPress={this.toNewWebView.bind(this,leftShop != null?leftShop.url:'')}>
                    <View style={{flex: 1}} >
                            <Image source={{uri: leftShop != null?leftShop.imgUrl:''}} style={{flex: 1, height: 150}}/>

                    </View>
                    </TouchableOpacity>
                    <View style={{flex: 1, flexDirection: 'column'}}>
                        <TouchableOpacity style={{flex: 1}} onPress={this.toNewWebView.bind(this,rightTop != null?rightTop.url:'')}>
                           <Image source={{uri:rightTop != null?rightTop.imgUrl:''}} style={{flex:1,height:150}}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flex: 1}} onPress={this.toNewWebView.bind(this,rightDown != null?rightDown.url:'')}>
                           <Image source={{uri:rightDown != null?rightDown.imgUrl:''}} style={{flex:1,height:150}}/>
                        </TouchableOpacity>
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

    _renderRefresh(){
        this.setState({
            isRefresh:true
        })
        this.fetchBannerAds();
    }

    render() {
        var dataarray = [];
        if (this.state.shopMailArray != null){
              var shopArray = this.state.shopMailArray.concat()
              shopArray.map(function (item,key) {
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
            <View>
              <SectionList
                 renderSectionHeader={this._setionComp}
                 renderItem = {this._renderItem}
                 sections = {sections}
                 ItemSeparatorComponent = {()=><View><Text></Text></View>}
                 keyExtractor = {this._extraUniqueKey}// 每个item的key
                 removeClippedSubviews={false}
                 refreshing={this.state.isRefresh}
                 onRefresh={()=>this._renderRefresh()}
              />
                <Modal
                    animationType={null}
                    transparent={true}
                    visible={this.state.isShowPop}
                    onRequestClose={()=>{this._setModalVisible(false)}}
                    onShow={()=>{this._startShow()}}
                >
                    <HouseExchangeView  selectHouse = {(item)=>{
                         // console.warn('回传值' + item.projectId),
                        this.props.navigation.setParams({title: item.projectName});
                        this.setState({
                            isShowPop:false,
                            projectID:item['projectId'],
                            resuorceID:item['resourceId'],
                        })
                        this.fetchBannerAds()
                     }} showView={this.state.isShowPop} userId={this.state.userID} />
                </Modal>
                <Modal
                animationType={null}
                transparent={true}
                visible={this.state.isShowPerson}
                // onRequestClose = {this._setPersonModalVisible(false)}
                >
                    <PersonServiceView  closeView = {()=>{
                         this.setState({
                             isShowPerson:false
                         })
                    }} userData = {this.state.personServiceArray}/>
                </Modal>
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
    _setModalVisible = (visible)=>{
        this.setState({
            isShowPop:visible
        })
    }

    _setPersonModalVisible = (visible)=>{
        this.setState({
            isShowPerson:visible
        })
    }

    _startShow = ()=>{

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
    },
    navContainer: {
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
        justifyContent:'center',
    },
    rowStyle:{
        width:10,
        height:10,
        marginTop:37,
        marginLeft:0,
    }
});


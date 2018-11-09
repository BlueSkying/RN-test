import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    ImageBackground,
    Platform, CameraRoll,
    ScrollView,
} from 'react-native';
import {Geolocation, MapView,MapTypes,MapModule} from 'react-native-baidu-map';
import {captureScreen,captureRef} from 'react-native-view-shot';
import TakePhotoVCN from "./TakePhotoVCN";
import LatitudeLongtitudeSetting from "./LatitudeLongtitudeSetting";
export const kwidth = Dimensions.get('window').width;
// 获取设备屏幕高
export const kheight = Dimensions.get('window').height;
const RNFS = require('react-native-fs');
var DEF_PI = 3.14159265359; // PI
var DEF_2PI = 6.28318530712; // 2*PI
var DEF_PI180 = 0.01745329252; // PI/180.0
var DEF_R = 6370693.5; // radius of earth
var fitrstLongitude = null;
var firstLatitude = null;
export default class PhotoUsageVCN extends Component {
    static navigationOptions = ({navigation, screenProps}) => ({
        tabBarOnPress: (({scene, jumpToIndex}) => {
            // console.log(route);
            // alert(index);
            jumpToIndex(scene['index']);
        }),
        headerTitle:'发现问题',
        headerRight: (
            <TouchableOpacity onPress={() => navigation.state.params.navigatePress()}>
                <View style={{marginRight: 10}}>
                    <Text style={{width:35,height:35,marginTop:15,textColor:'#333333'}}>设置</Text>
                </View>
            </TouchableOpacity>
        ),
    })

    // component挂载完毕后调用
    componentDidMount() {
        this.props.navigation.setParams({   //右键按钮需要注册
            navigatePress: this.navigatePress,
        });

        Geolocation.getCurrentPosition().then(
            (data)=>{
                this.setState({
                    latitude : data.latitude,
                    longtitude : data.longitude,
                })
                this.loadFromLocal();
            }
        ).catch(error=>{
            console.warn(error,'error')
        })
    }

    loadFromLocal = async()=>{
        let oldData = await global.storage.load({
            key:'start'
        })
        firstLatitude = oldData['startLatitude']
        fitrstLongitude =  oldData['startLongtitude']

        if (firstLatitude === null){
            alert('请点击右上角先设置起点的经纬度')
            return;
        }

        this.getShortDistance(fitrstLongitude,firstLatitude,this.state.longtitude,this.state.latitude)
    }

    navigatePress = () => {
        const { navigate } = this.props.navigation;
        navigate('LatitudeLongtitudeSetting', {
            callback: (() => {
                this.loadFromLocal()
            })
        });
    }

    constructor(props) {
        super(props);
        let imagePath = '';
        let textContent = '温馨提示：图片距离初始点大约10米处';
        let latitude = '';
        let longtitude = '';
        this.state = {
            imagePath : imagePath,
            textContent:textContent,
            latitude : latitude,
            longtitude : longtitude,
        };
    }

    getShortDistance(lon1, lat1, lon2, lat2){
        console.warn('计算'+ lon1,lat1,lon2,lat2)
        var ew1, ns1, ew2, ns2;
        var dx, dy, dew;
        var distance;
        // 角度转换为弧度
        ew1 = lon1 * DEF_PI180;
        ns1 = lat1 * DEF_PI180;
        ew2 = lon2 * DEF_PI180;
        ns2 = lat2 * DEF_PI180;
        // 经度差
        dew = ew1 - ew2;
        // 若跨东经和西经180 度，进行调整
        if (dew > DEF_PI)
            dew = DEF_2PI - dew;
        else if (dew < -DEF_PI)
            dew = DEF_2PI + dew;
        dx = DEF_R * Math.cos(ns1) * dew; // 东西方向长度(在纬度圈上的投影长度)
        dy = DEF_R * (ns1 - ns2); // 南北方向长度(在经度圈上的投影长度)
        // 勾股定理求斜边长
        distance = Math.sqrt(dx * dx + dy * dy).toFixed(0);
        this.setState({
            textContent : '温馨提示：图片距离初始点大约'+distance+'米处'
        })
    }

    takePicture = ()=>{
        const { navigate } = this.props.navigation;
        navigate('TakePhotoVCN',{callback:((info) =>{
                this.setState({
                    imagePath:info,
                })
            })
        });
    }

    cancelSave = ()=>{
        this.setState({
            imagePath:'',
        })
    }
    // 截取整个屏幕
    snapCaptureScreen(){
        captureScreen({
              format:'jpg',
              quality:0.8,
            }
        ).then(
            uri =>  {
                       if(Platform === 'ios'){
                           var promise = CameraRoll.saveToCameraRoll(uri)
                           promise.then(function (result) {
                               alert('图片已保存至相册')
                           }).catch(function (error) {
                               alert('保存失败')
                           })
                       }else{
                           var promise = CameraRoll.saveToCameraRoll("file://" + uri);
                           promise.then(function(result) {
                               console.log("图片已保存至相册")
                           }).catch(function(error) {
                               console.log("保存失败")
                           })
                       }

            },
            error =>alert('oops,snapshot failed',error)
        );
    }

    // 截取指定界面
    snapshot(){
        captureRef(this.refs.needSave,{
            format:"jpg",
            quality:0.8,
            result:'tmpfile',
            snapshotContentContainer:true
        }).then(
            uri =>  {
                         if(Platform === 'ios'){
                               var promise = CameraRoll.saveToCameraRoll(uri)
                               promise.then(function (result) {
                               alert('图片已保存至相册')
                              }).catch(function (error) {
                                alert('保存失败')
                               })
                         }else{
                                var promise = CameraRoll.saveToCameraRoll("file://" + uri);
                                promise.then(function(result) {
                                    alert('图片已保存至相册')
                                }).catch(function(error) {
                                    alert('保存失败')
                         })
                }
            },
            error =>alert(error)
        );
    }


    render(){
        return(
            <View  style={styles.container}>
                <ScrollView ref='needSave'>
                    <Text style={styles.textStyle}>
                        {this.state.textContent}
                    </Text>
                    <Image source={{uri:this.state.imagePath}} style={styles.imgStyle}/>
                </ScrollView>
                <View style={styles.buttonBgStyle}>
                    <Text style={styles.button} onPress={this.takePicture.bind(this)}>
                        拍照
                    </Text>
                    <Text style={styles.button} onPress={this.cancelSave.bind(this)}>
                        取消
                    </Text >
                </View>
                <Text style={styles.longButton} onPress={this.snapshot.bind(this)}>
                    保存
                </Text >
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imgStyle:{
        width:kwidth,
        height:kheight-70-120,
    },
    textStyle:{
        color:'#333333',
        fontSize:14,
        marginTop:15,
        marginLeft:15,
    },
    buttonBgStyle:{
      width:kwidth,
      height:50,
      flexDirection:'row',
    },
    button:{
        backgroundColor:"#fff",
        borderRadius:5,
        color:"#000",
        paddingTop:6,
        margin:5,
        textAlign:'center',
        width:kwidth/2,
        height:30,
    },
    longButton:{
        backgroundColor:"#fff",
        borderRadius:5,
        color:"#000",
        paddingTop:6,
        textAlign:'center',
        width:kwidth,
        height:30,
    }
})
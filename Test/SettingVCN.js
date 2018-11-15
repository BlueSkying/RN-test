import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    DeviceEventEmitter,
    Platform,
    Alert,
} from 'react-native';
import {
    isFirstTime,
    isRolledBack,
    packageVersion,
    currentVersion,
    checkUpdate,
    downloadUpdate,
    switchVersion,
    switchVersionLater,
    markSuccess,
} from 'react-native-update';

import _updateConfig from '../update.json';
const {appKey} = _updateConfig[Platform.OS];

export const kwidth = Dimensions.get('window').width;
// 获取设备屏幕高
export const kheight = Dimensions.get('window').height;

export default class SettingVCN extends Component{

    static navigationOptions = ({navigation,screenProps}) => ({
        // 这里面的属性和App.js的navigationOptions是一样的。
        headerTitle:navigation.state.params?navigation.state.params.headerTitle:'Detail1',
        headerTitleStyle:{flex:1,textAlign:'center',alignSelf:'center'},
        headerRight:<View style={{width:30,height:30}}></View>
    });

    constructor(props){
        super(props)
        this.state = {

        }
    }

    componentWillMount(){
        if (isFirstTime) {
            Alert.alert('提示', '这是当前版本第一次启动,是否要模拟启动失败?失败将回滚到上一版本', [
                {text: '是', onPress: ()=>{throw new Error('模拟启动失败,请重启应用')}},
                {text: '否', onPress: ()=>{markSuccess()}},
            ]);
        } else if (isRolledBack) {
            Alert.alert('提示', '刚刚更新失败了,版本被回滚.');
        }
    }
    doUpdate = info => {
        downloadUpdate(info).then(hash => {
            Alert.alert('提示', '下载完毕,是否重启应用?', [
                {text: '是', onPress: ()=>{switchVersion(hash);}},
                {text: '否',},
                {text: '下次启动时', onPress: ()=>{switchVersionLater(hash);}},
            ]);
        }).catch(err => {
            Alert.alert('提示', '更新失败.');
        });
    };
    checkUpdate = () => {
        checkUpdate(appKey).then(info => {
            if (info.expired) {
                Alert.alert('提示', '您的应用版本已更新,请前往应用商店下载新的版本', [
                    {text: '确定', onPress: ()=>{info.downloadUrl && Linking.openURL(info.downloadUrl)}},
                ]);
            } else if (info.upToDate) {
                Alert.alert('提示', '您的应用版本已是最新.');
            } else {
                Alert.alert('提示', '检查到新的版本'+info.name+',是否下载?\n'+ info.description, [
                    {text: '是', onPress: ()=>{this.doUpdate(info)}},
                    {text: '否',},
                ]);
            }
        }).catch(err => {
            Alert.alert('提示', '更新失败.');
        });
    };

    componentDidMount() {
        this.props.navigation.setParams({
            headerTitle:'设置',
        });
    }

    //加载本地缓存数据
    LogOut = async()=>{
        global.storage.remove({
           key:'recommendList'
        });
        global.storage.remove({
            key:'userInfo'
        });
        global.storage.clearMap()
        this.closeLogin()
        DeviceEventEmitter.emit('LoginOutSuccess');
    }

    //关闭本页面
    closeLogin = ()=>{
        const { goBack } = this.props.navigation;
        goBack();
        if(this.props.navigation.state.params.callback){
            this.props.navigation.state.params.callback(null)
        }
    }


    componentWillUnmount() {

    }

    render(){
        return(
            <View style={{marginTop:80}}>
                <TouchableOpacity onPress={this.checkUpdate}>
                    <View style={styles.btnBgStyle}>
                        <Text style={styles.loginBtnStyel}>
                            检查更新
                        </Text>
                    </View>
                </TouchableOpacity>
                <View style={{width:kwidth,height:40}}>
                </View>
                <TouchableOpacity onPress={this.LogOut}>
                    <View style={styles.btnBgStyle}>
                        <Text style={styles.loginBtnStyel}>
                            退出登录
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    btnBgStyle:{
        width:kwidth-30,
        height:50,
        backgroundColor:'#2bb2c1',
        borderRadius:40,
        marginLeft:15,
        marginRight:15,
    },
    loginBtnStyel:{
        width:kwidth-30,
        height:50,
        paddingTop:15,
        textAlign:'center',
        fontSize:16,
        backgroundColor: 'transparent',
        color:'#ffffff',
    },
});
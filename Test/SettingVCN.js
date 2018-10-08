import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    DeviceEventEmitter,
} from 'react-native';

export const kwidth = Dimensions.get('window').width;
// 获取设备屏幕高
export const kheight = Dimensions.get('window').height;

export default class SettingVCN extends Component{

    static navigationOptions = ({navigation,screenProps}) => ({
        // 这里面的属性和App.js的navigationOptions是一样的。
        headerTitle:navigation.state.params?navigation.state.params.headerTitle:'Detail1',
    });

    constructor(props){
        super(props)
        this.state = {

        }
    }

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
        marginLeft:15
    },
    loginBtnStyel:{
        width:kwidth-30,
        height:50,
        paddingTop:15,
        textAlign:'center',
        fontSize:16,
        backgroundColor: 'transparent',
        color:'#ffffff',
        marginLeft:15
    }
});
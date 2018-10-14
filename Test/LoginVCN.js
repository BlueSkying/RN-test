import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
     AsyncStorage,
    TextInput,
    colors,
    AlertIOS,
    ScrollView,
    DeviceEventEmitter,
} from 'react-native';
import Request from './Request';
import Config from './config';
import Storage from 'react-native-storage';
var storage = new Storage({
    size:1000,
    storageBackend:AsyncStorage,
    defaultExpires:null,
    enableCache:true,
})
global.storage = storage

export const kwidth = Dimensions.get('window').width;
// 获取设备屏幕高
export const kheight = Dimensions.get('window').height;

export default class LoginVCN extends Component{

    static navigationOptions = {
        header:null,
        tabBarVisible:false,
    }

    constructor(props){
        super(props)
        let nameText = '';
        let passText = '';
        let userID = '';
        let address = '';
        this.state = {
            nameText:nameText,
            passText:passText,
            userID : userID,
            address : address,
        }
    }

    componentDidMount() {
        this.loadFromLocal()
    }

        //加载本地缓存数据
    loadFromLocal = async()=>{
            let phone = await  global.storage.load({
                key:'userInfo'
            })
            this.setState({
                nameText:phone['phone']
            })
    }

    //关闭本页面
    closeLogin = ()=>{
        const { goBack } = this.props.navigation;
        goBack();
        if(this.props.navigation.state.params.callback){
            this.props.navigation.state.params.callback(this.state.userID,this.state.address)
        }
    }

    //登录接口
    Login = ()=>{
        let name = String(this.state.nameText)
        if(name == null || name.length!= 11){
            AlertIOS.alert('提示','请输入正确的手机号码',[{text:'确定', onPress:() => {}, style : 'cancel'}])
            return;
        }
        let password = String(this.state.passText)
        if(password.length == 0){
            AlertIOS.alert('提示','请输入密码',[{text:'确定', onPress:() => {}, style : 'cancel'}])
            return;
        }
        //登录成功，需保存数据,然后返回
        Request.post(Config.api.loginUrl,{'params':{'loginName':name,'password':password,'xingeToken':''}},(data)=>{
            let jsonData = data;
            if(data['status'] == 1){
                global.storage.save({
                    key:'recommendList',
                    data:jsonData,
                    expires:null,
                }),
                 global.storage.save({
                     key:'userInfo',
                     data:{'phone':this.state.nameText},
                     expires:null,
                 })
                console.warn('login token==' + jsonData['token']);
                this.setState({
                    userID : jsonData['data']['contactId'],
                    address: jsonData['data']['projectName'] + jsonData['data']['resourceName'],
                })
                this.closeLogin();
                DeviceEventEmitter.emit('LoginInSuccess',{'contactID':jsonData['data']['contactId'],'projectID':jsonData['data']['projectId']});
            }
        },(error)=>{
            console.warn(error);
        });
    }

    componentWillUnmount() {

    }

    render(){
        return(
            <ScrollView>
            <View size={{flex:1}}>
                <TouchableOpacity onPress={this.closeLogin}>
                    <Image style={styles.closeStyle}
                           source={require('../resources/close.png')}
                    />
                </TouchableOpacity>

                <View style={styles.iconStyle}>
                    <Image style={styles.iconImageStyle}
                           source={require('../resources/login_logo_icon.png')}
                    />
                </View>


                <View style={{flexDirection:'row',marginTop:80}}>
                    <Text style={{marginLeft:15,marginTop:10}}>
                        手机号码：
                    </Text>
                    <TextInput style={styles.phoneInputStyle}
                               onChangeText={(text)=>this.setState({nameText:text})}
                               value={this.state.nameText}
                               placeholder='请输入手机号'
                               clearButtonMode={'while-editing'}
                               keyboardType='numeric'
                    />
                </View>
                <View style={styles.inputDowslineStyle}>

                </View>

                <View style={{flexDirection:'row',marginTop:10}}>
                    <Text style={{marginLeft:15,marginTop:10}}>
                        密码：
                    </Text>
                    <TextInput style={styles.passInputStyle}
                               onChangeText={(text)=>this.setState({passText:text})}
                               value={this.state.passText}
                               placeholder='请输入密码'
                               clearButtonMode={'while-editing'}
                               secureTextEntry={true}
                    />
                </View>
                <View style={styles.inputDowslineStyle}>

                </View>
                <View style={{marginTop:30}}>
                      <TouchableOpacity onPress={this.Login}>
                          <View style={styles.btnBgStyle}>
                             <Text style={styles.loginBtnStyel}>
                                登 录
                             </Text>
                          </View>
                      </TouchableOpacity>
                </View>
            </View>
            </ScrollView>
        )
    }
  }
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    closeStyle:{
        width:40,
        height:40,
        marginLeft:5,
        marginTop:15
    },
    iconStyle:{
        width:kwidth,
        height:100,
        justifyContent:'center',
        alignItems:'center',
        marginTop:50
    },
    iconImageStyle:{
        width:80,
        height:80,
        marginTop:10,
        marginLeft:'auto',
        marginRight:'auto'
    },
    phoneInputStyle:{
        height:40,
        borderColor:'gray',
        borderWidth:0,
        width:kwidth-100,
    },
    passInputStyle:{
        height:40,
        borderColor:'gray',
        borderWidth:0,
        width:kwidth-100,
        marginLeft:26,
    },
    inputDowslineStyle:{
        marginLeft:15,
        width:kwidth-30,
        height:1,
        backgroundColor:'#2bb2c1',
        marginTop:0.5
    },
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
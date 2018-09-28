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
} from 'react-native';

 import Storage from 'react-native-storage';
var storge = new Storage({
    size:1000,
    storageBackend:AsyncStorage,
    defaultExpires:null,
    enableCache:null,
})
global.storage = storge

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
        this.state = {
            nameText:'',
            passText:'',
            dataList: this.loadFromLocal(),
        }
    }

    componentDidMount() {
            global.storage.save({
                key:'token',
                data:'data.token',  //取回来存储的数据
                expires:null
            })

            let token = global.storage.load({   //取存储的数据
                key:'token'
            })
    }

        //加载本地缓存数据
    loadFromLocal = async()=>{
            let list = await  storge.load({
                key:'recommendList'
            })
            this.setState({
                dataList:list
            })
    }

    //关闭本页面
    closeLogin = ()=>{
        const { goBack } = this.props.navigation;
        goBack();
    }

    //登录接口
    Login = ()=>{

    }

    componentWillUnmount() {

    }

    render(){
        return(
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
                    <TextInput style={styles.inputStyle}
                               onChangeText={(text)=>this.setState({nameText})}
                               value={this.state.nameText}
                               placeholder='请输入手机号'
                               clearButtonMode={'while-editing'}
                    />
                </View>
                <View style={styles.inputDowslineStyle}>

                </View>

                <View style={{flexDirection:'row',marginTop:10}}>
                    <Text style={{marginLeft:15,marginTop:10}}>
                        密码：
                    </Text>
                    <TextInput style={styles.inputStyle}
                               onChangeText={(text)=>this.setState({nameText})}
                               value={this.state.nameText}
                               placeholder='请输入密码'
                               clearButtonMode={'while-editing'}
                    />
                </View>
                <View style={styles.inputDowslineStyle}>

                </View>
                <View style={{marginTop:30}}>
                      <TouchableOpacity onPress={this.Login}>
                          <View style={styles.bttonBgStyle}>
                             <Text style={styles.loginBtnStyel}>
                                登 录
                             </Text>
                          </View>
                      </TouchableOpacity>
                </View>
            </View>
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
    inputStyle:{
        height:40,
        borderColor:'gray',
        borderWidth:0,
        marginRight:20
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
        paddingTop:15,
        textAlign:'center',
        fontSize:16,
        backgroundColor:'#2bb2c1',
        color:'#ffffff',
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
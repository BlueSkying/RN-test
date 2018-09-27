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
                    <Image style={{width:40,height:40,marginLeft:5,marginTop:15}}
                           source={require('../resources/close.png')}
                    />
                </TouchableOpacity>

                <View style={{width:kwidth,height:100,justifyContent:'center',alignItems:'center',marginTop:50}}>
                    <Image style={{width:80,height:80,marginTop:10,marginLeft:'auto',marginRight:'auto'}}
                           source={require('../resources/login_logo_icon.png')}
                    />
                </View>


                <View style={{flexDirection:'row',marginTop:80}}>
                    <Text style={{marginLeft:15,marginTop:10}}>
                        手机号码：
                    </Text>
                    <TextInput style={{height:40,borderColor:'gray',borderWidth:0,marginRight:20}}
                               onChangeText={(text)=>this.setState({nameText})}
                               value={this.state.nameText}
                               placeholder='请输入手机号'
                               clearButtonMode={'while-editing'}
                    />
                </View>
                <View style={{marginLeft:15, width:kwidth-30,height:2,backgroundColor:'#2bb2c1'}}>

                </View>

                <View style={{flexDirection:'row',marginTop:10}}>
                    <Text style={{marginLeft:15,marginTop:10}}>
                        密码：
                    </Text>
                    <TextInput style={{height:40,borderColor:'gray',borderWidth:0,marginLeft:30}}
                               onChangeText={(text)=>this.setState({nameText})}
                               value={this.state.nameText}
                               placeholder='请输入密码'
                               clearButtonMode={'while-editing'}
                    />
                </View>
                <View style={{marginLeft:15, width:kwidth-30,height:1,backgroundColor:'#2bb2c1'}}>

                </View>
                <View style={{marginTop:30}}>
                      <TouchableOpacity onPress={this.Login}>
                          <Text style={{width:kwidth-30,height:50,paddingTop:15,textAlign:'center',fontsize:16, backgroundColor:'#2bb2c1',color:'#ffffff',borderRadius:20,marginLeft:15}}>
                              登 录
                          </Text>
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
});
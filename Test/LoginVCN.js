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
    constructor(props){
        super(props)
        this.state = {
            nameText:'请输入用户账号',
            passText:'请输入用户密码',
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

    }

    componentWillUnmount() {

    }

    render(){
        return(
            <View size={styles.container}>
                <TouchableOpacity onPress={this.closeLogin()}>
                    <Image style={{width:40,height:40,marginLeft:15,marginTop:15}}
                           source={{uri:'../resources/close.png'}}
                    />
                </TouchableOpacity>
                <View style={{width:kwidth,height:100,justifyContent:'center',alignItems:'center'}}>
                    <Image style={{width:80,height:80,marginTop:10,marginLeft:'auto',marginRight:'auto'}}
                           source={{uri:'../resources/login_logo_icon.png'}}
                    />
                </View>
                <View>
                    <Text>
                        用户名：
                    </Text>
                    <TextInput style={{height:40,borderColor:'gray',borderWidth:1}}
                               onChangeText={(text)=>this.setState({nameText})}
                               value={this.state.nameText}
                               defaultValue={'请输入用户账号'}
                               clearButtonMode={'while-editing'}
                    />
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex:1
    }
})
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    AsyncStorage,
    TextInput,
    colors,
    AlertIOS,
    ScrollView,
    DeviceEventEmitter,
} from 'react-native';
import {kwidth} from "./LoginVCN";
import Request from "./Request";
import Config from "./config";

export default class LatitudeLongtitudeSetting extends Component {
    static navigationOptions = ({navigation, screenProps}) => ({
        tabBarOnPress: (({scene, jumpToIndex}) => {
            // console.log(route);
            // alert(index);
            jumpToIndex(scene['index']);
        }),
        headerTitle:'设置起点经纬度',
    })

    constructor(props){
        super(props)
        let latitude = '';
        let longtitude = '';
        this.state = {
            latitude:latitude,
            longtitude:longtitude,
        }
    }

    loadFromLocal = async()=>{
        let oldData = await global.storage.load({
            key:'start'
        })
        this.setState({
            latitude:oldData['startLatitude'],
            longtitude:oldData['startLongtitude'],
        })
    }

    //保存初始化信息
    saveInfo = ()=>{
        let latitude = this.state.latitude
        if(latitude == null){
            alert('请输入起始点纬度')
            return;
        }
        let longtitude = this.state.longtitude
        if(longtitude.length == null){
            alert('请输入起始点经度')
            return;
        }
        console.warn(longtitude + latitude)
        global.storage.save({
            key:'start',
            data:{'startLongtitude':longtitude,'startLatitude':latitude},
            expires:null,
        })

        const { goBack } = this.props.navigation;
        goBack();
        if(this.props.navigation.state.params.callback){
            this.props.navigation.state.params.callback()
        }
    }

    componentDidMount() {
        this.loadFromLocal()
    }

    render(){
        return(
            <ScrollView>
                <View size={{flex:1}}>
                    <View style={{flexDirection:'row',marginTop:40}}>
                        <Text style={{marginLeft:15,marginTop:10}}>
                            起点纬度：
                        </Text>
                        <TextInput style={styles.phoneInputStyle}
                                   onChangeText={(text)=>this.setState({nameText:text})}
                                   value={this.state.latitude}
                                   placeholder='请输入纬度,如：30.666093'
                                   clearButtonMode={'while-editing'}
                                   keyboardType='numeric'
                                   underlineColorAndroid='transparent'
                        />
                    </View>
                    <View style={styles.inputDowslineStyle}>

                    </View>

                    <View style={{flexDirection:'row',marginTop:10}}>
                        <Text style={{marginLeft:15,marginTop:10}}>
                            起点经度：
                        </Text>
                        <TextInput ref = 'inputWR'
                                   style={styles.passInputStyle}
                                   onChangeText={(text)=>this.setState({passText:text})}
                                   value={this.state.longtitude}
                                   placeholder='请输入经度，如：104.07251'
                                   clearButtonMode={'while-editing'}
                                   underlineColorAndroid='transparent'
                                   onSubmitEditing={()=>{this.testBlur()}}
                        />
                    </View>
                    <View style={styles.inputDowslineStyle}>

                    </View>
                    <View style={{marginTop:50}}>
                        <TouchableOpacity onPress={this.saveInfo}>
                            <View style={styles.btnBgStyle}>
                                <Text style={styles.loginBtnStyel}>
                                    确  认
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        )
    }

    testBlur(){
        this.refs.inputWR.blur()
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    phoneInputStyle:{
        height:40,
        borderColor:'gray',
        borderWidth:0,
        width:kwidth-100,
        padding:0,
    },
    passInputStyle:{
        height:40,
        borderColor:'gray',
        borderWidth:0,
        width:kwidth-100,
        padding:0,
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

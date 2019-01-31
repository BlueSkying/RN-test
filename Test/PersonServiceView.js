import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    View,
    Dimensions,
    TouchableOpacity,
    Linking,
} from 'react-native';
export const kwidth = Dimensions.get('window').width;
// 获取设备屏幕高
export const kheight = Dimensions.get('window').height;

export default class PersonServiceView extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount() {

    }

    _callPerson = ()=>{
        var array = this.props.userData;
        let dict = array[0];
        Linking.openURL('tel:' + dict.telephone);
    }

    _otherPerson = ()=>{

    }

    _closeView=()=>{
        this.props.closeView()
    }

    render(){
        var array = this.props.userData;
        let dict = array[0];
        console.warn('---data---' + dict.name)
        return(
        <View style={styles.bgstyle}>
            <View style={styles.contentStyle}>
                <View style={styles.upBgStyle}>
                  <TouchableOpacity onPress={this._closeView}>
                    <Image style={styles.closeStyel}
                           source={require('../resources/cs_bt_close.png')}
                    />
                  </TouchableOpacity>
                  <View style={{flexDirection:'row',height:110-12.5}}>
                     <Image style={styles.headStyle}
                       source={{uri:dict.icon}}
                     />
                     <View style={{flexDirection:'column',flex:1}}>
                        <Text style={styles.nameStyle}>{dict.name}</Text>
                        <Text style={styles.projectNameStyle}>{dict.projectName}</Text>
                        <Text style={styles.tipStyle}>尊敬的业主,热忱为您服务~</Text>
                     </View>
                   </View>
                   <Image style={styles.waveStyle} source={require('../resources/cs_bg_icon.png')}/>
                </View>
                <TouchableOpacity onPress={this._callPerson}>
                    <View style={styles.callBgStyle}>
                        <Text style={styles.callStyle}>
                            呼叫
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._otherPerson}>
                    <View style={styles.otherBgStyle}>
                        <Text style={styles.otherStyle}>
                            您还可以查看全部管家
                        </Text>
                        <Image style={styles.rowImgStyle} source={require('../resources/cs_bt_aorrw.png')} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({
     bgstyle:{
         backgroundColor:'rgba(52,52,55,0.5)',
         width:kwidth,
         height:kheight,
     },
     contentStyle:{
         flexDirection:'column',
         backgroundColor:'rgba(255,252,255,1.0)',
         top:200,
         left:(kwidth-286)/2,
         width:286,
         height:220,
         borderRadius:5
     },
     upBgStyle:{
        backgroundColor:'rgba(221,252,255,1.0)',
        width:286,
        height:130,
     },
     closeStyel:{
         width:25,
         height:25,
         left:286-12.5,
         top:-12.5,
     },
    headStyle:{
         width:75,
         height:75,
         borderRadius:37.5,
         left:25,
         marginTop:0,
    },
    nameStyle:{
         marginLeft:40,
         marginTop:5,
         width:100,
         height:20,
         color:'#333333',
         fontSize:18,
    },
    projectNameStyle:{
         marginLeft:40,
         marginTop:10,
         width:150,
         height:18,
         color:'#2bb572',
         fontSize:14
    },
    tipStyle:{
      marginLeft:40,
      marginTop:2,
      width:150,
      height:15,
      color:'#999999',
      fontSize:12,
    },
    waveStyle:{
        left:0,
        width:286,
        height:21.5,
        marginTop:-15,
    },
    callBgStyle:{
         marginTop:10,
         marginLeft:20,
        width:246,
        height:40,
        borderRadius:20,
        backgroundColor:'#2bb2c1',
    },
    callStyle:{
         width:'100%',
        height:'100%',
        textAlign:'center',
        paddingTop:10,
        backgroundColor:'transparent',
        color:'#ffffff',
        fontSize:16,
    },
    otherBgStyle:{
         width:'100%',
        justifyContent:'center',
        flexDirection:'row',
    },
    otherStyle:{
        color:'#333333',
        fontSize:12,
        marginTop:10,
        textAlign:'center',
        justifyContent:'center'
    },
    rowImgStyle:{
         width:9,
         height:10.5,
         marginLeft:3,
         marginTop:10,
    }

});
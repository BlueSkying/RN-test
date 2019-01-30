import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    View,
    Dimensions,
    TouchableOpacity,
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
                <TouchableOpacity onPress={this._closeView}>
                    <Image style={styles.closeStyel}
                           source={require('../resources/cs_bt_close.png')}
                    />
                </TouchableOpacity>
                <View style={{flexDirection:'row',height:17.5+75}}>
                   <Image style={styles.headStyle}
                       source={{uri:dict.icon}}
                   />
                    <View style={{flexDirection:'column',flex:1}}>
                        <Text style={styles.nameStyle}>{dict.name}</Text>
                        <Text style={styles.projectNameStyle}>{dict.projectName}</Text>
                    </View>
                </View>
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
         backgroundColor:'rgba(255,252,255,1.0)',
         top:200,
         left:(kwidth-286)/2,
         width:286,
         height:220,
         borderRadius:5
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
         top:20-12.5,
    },
    nameStyle:{
         marginLeft:40,
         marginTop:20,
         width:100,
         height:20,
         color:'#2bb2c1',
         fontSize:18,
    },
    projectNameStyle:{
         marginLeft:40,
         marginTop:15,
         width:150,
         height:18,
         color:'#666666',
         fontSize:14
    }

});
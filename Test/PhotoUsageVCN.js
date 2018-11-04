import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    SectionList,
    TouchableOpacity,
    Image,
    Dimensions,
    ImageBackground,
} from 'react-native';

import TakePhotoVCN from "./TakePhotoVCN";
export const kwidth = Dimensions.get('window').width;
// 获取设备屏幕高
export const kheight = Dimensions.get('window').height;

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
    }

    navigatePress = () => {

    }

    constructor(props) {
        super(props);
        let imagePath = '';
        let textContent = '距离10公里处';
        this.state = {
            imagePath : imagePath,
            textContent:textContent,
        };
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

    }

    savePicture = ()=>{

    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.textStyle}>
                    {this.state.textContent}
                </Text>
                <Image source={{uri:this.state.imagePath}} style={styles.imgStyle}/>

                <Text style={styles.button} onPress={this.takePicture.bind(this)}>
                    拍照
                </Text>
                <Text style={styles.button} onPress={this.cancelSave.bind(this)}>
                    取消
                </Text >
                <Text style={styles.button} onPress={this.savePicture.bind(this)}>
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
        height:kwidth/16*9,
    },
    textStyle:{
        color:'#333333',
        fontSize:14,
        marginTop:15,
        marginLeft:15,
    },
    button:{
        flex:0,
        backgroundColor:"#fff",
        borderRadius:5,
        color:"#000",
        padding:0,
        margin:10,
        width:40,
        height:30,
    }
})
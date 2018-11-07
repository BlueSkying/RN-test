import React,{Component} from 'react';
import {
    AppRegistry,
    Dimensions,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    Image,
} from 'react-native';
import Camera from 'react-native-camera';
import Test3 from "./Test3";

export default class TakePhotoVCN extends Component{
    static navigationOptions = ({navigation, screenProps}) => ({
        headerTitle: "拍照",
        headerTitleStyle:{flex:1,textAlign:'center',alignSelf:'center'},
        headerRight:<View style={{width:30,height:30}}></View>
    });

    constructor(props){
        super(props)
        let imagePath = '';
        this.state = {
            cameraType : Camera.constants.Type.back,
            imagePath : imagePath
        };
    }

    render(){
        return(
            <View style={styles.container}>
                <Camera
                   ref={(cam)=>{
                       this.camera = cam;
                   }}
                    // Camera.constants.CaptureTarget.cameraRoll (default), 相册
                    // Camera.constants.CaptureTarget.disk, 本地
                    // Camera.constants.CaptureTarget.temp  缓存
                    // 很重要的一个属性，最好不要使用默认的，使用disk或者temp，
                    // 如果使用了cameraRoll，则返回的path路径为相册路径，图片没办法显示到界面上
                   captureTarget = {Camera.constants.CaptureTarget.temp}
                   style={styles.preview}
                   type = {this.state.cameraType}
                   aspect = {Camera.constants.Aspect.fill}
                   permissionDialogTitle = {'Permission to use camera'}
                   permissionDialogMessage={'We need your permission to use your camera phone'}
                >
                   <Text style={styles.button} onPress={this.switchCamera.bind(this)}>
                       切换涉嫌头
                   </Text>
                   <Text style={styles.button} onPress={this.takePicture.bind(this)}>
                       拍照
                   </Text >
                </Camera>
            </View>
        );
    }

    switchCamera(){
        var state = this.state;
        if (state.cameraType === Camera.constants.Type.back){
            state.cameraType = Camera.constants.Type.front;
        }else{
            state.cameraType = Camera.constants.Type.back;
        }
        this.setState(state);
    }

    takePicture = async function(){
        //jpegQuality 1-100,压缩图片
        const options = {jpegQuality:100,base64:true};
        await this.camera.capture({options})
            .then( (data) =>{
                Image.getSize(data.path,(width,height) =>{
                    console.log(width,height);
                })

                const { goBack } = this.props.navigation;
                goBack();
                if(this.props.navigation.state.params.callback){
                    this.props.navigation.state.params.callback(data.path)
                }

            }).catch(err=>console.error(err));
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
    },
    preview:{
        flex:1,
        justifyContent:"space-between",
        alignItems:"flex-end",
        flexDirection:'row',
    },
    toolBar:{
        width:200,
        margin:40,
        backgroundColor:"#000000",
        justifyContent:"space-between",
    },
    button:{
        flex:0,
        backgroundColor:"#fff",
        borderRadius:5,
        color:"#000",
        padding:10,
        margin:40,
    }
});

AppRegistry.registerComponent('AwesomeProject',()=>TakePhotoVCN);
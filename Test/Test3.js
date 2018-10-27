/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

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
export const kwidth = Dimensions.get('window').width;
// 获取设备屏幕高
export const kheight = Dimensions.get('window').height;
import Request from './Request';
import Config from './config';
import SettingVCN from "./SettingVCN";
const  settingIcon = require('../resources/icon_set.png');
export default class Test3 extends Component {
    static navigationOptions = ({navigation,screenProps}) => ({
        tabBarOnPress:(({ scene ,jumpToIndex})=>{
            // console.log(route);
            // alert(index);
            jumpToIndex(scene['index']);
        }),
        headerLeft:<View style={{width:30,height:30}}></View>,
        headerRight:(
            <TouchableOpacity onPress={()=>navigation.state.params.navigatePress()}>
            <View style={{marginRight:10}}>
                {<Image source={require('../resources/icon_set.png')} style={[{width:25,height:25}]} />}
            </View>
            </TouchableOpacity>
        ),
    })
    // component挂载完毕后调用
    componentDidMount(){
        this.loadFromLocal()
        this.props.navigation.setParams({   //右键按钮需要注册
            navigatePress:this.navigatePress,
        });
    }

    //加载本地缓存数据
    loadFromLocal = async()=>{
        let oldData = await  global.storage.load({
            key:'recommendList'
        })
        this.setState({
            userID:oldData['data']['contactId'],
            userToken:oldData['token'],
            addressInfo:oldData['data']['projectName'] + oldData['data']['resourceName'],
        })

        this.fetchData();
        this.queryScaleBeam();
    }

    // 获取用户头像信息
    fetchData(){
        Request.post(Config.api.homeList,{'sCommandName':'getMember','sInput':{"ID":this.state.userID}},(data)=>{
            this.setState({
                headImageUrl:data.Item.sHeadImg,
                nickName:data.Item.sNickName,
            });
        },(error)=>{
           console.warn(error);
        });
    }
    // 获取用户嘉豆
    queryScaleBeam(){
        Request.post(Config.api.queryBeam,{'requestData':{'userId':this.state.userID,'token':this.state.userToken}},(data)=>{
            this.setState({
                jiadouCount:data["resultData"]["total"],
            });
        },(error)=>{
            console.warn(error);
        });
    }
    constructor(props){
        super(props);
        imageArray = [require('../resources/my_icon_01.png'),require('../resources/my_icon_02.png'),require('../resources/my_icon_03.png'),require('../resources/my_icon_04.png')
            ,require('../resources/my_icon_05.png'),require('../resources/my_icon_06.png'),require('../resources/my_icon_07.png'),require('../resources/my_icon_08.png')
            ,require('../resources/my_icon_09.png'),require('../resources/my_icon_10.png'),require('../resources/my_icon_11.png'),require('../resources/my_icon_12.png')];
        let headImageUrl = '';
        let nickName = '立即登录';
        let userID = null;
        let userToken = '';
        let jiadouCount = '0';
        let addressInfo = '生活家,让生活更美好～';
        this.state = {
            headImageUrl :headImageUrl,
            nickName : nickName,
            userID : userID,
            userToken : userToken,
            jiadouCount : jiadouCount,
            addressInfo : addressInfo,
        };
    }
    SettingVCN
    navigatePress = () => {
        // alert('点击headerRight');
        const { navigate } = this.props.navigation;
        navigate('SettingVCN',{callback:((info) =>{
                this.setState({
                    headImageUrl : '',
                    nickName : '立即登录',
                    userID : null,
                    userToken : '',
                    jiadouCount : '0',
                    addressInfo : '生活家,让生活更美好～',
                })
            })
        });
    }

    login(){
        const { navigate } = this.props.navigation;
        navigate('LoginVCN',{callback:((info,address) =>{
                this.setState({
                    userID:info,
                    addressInfo:address,
                })
                this.fetchData();
                this.queryScaleBeam();
            })
        });
    }

    _pressRow(item){
        if(this.state.userID == null){
            this.login()
        }
    }

    _renderItem = (info) =>{
        var txt = '' + info.item.title;
        var inde = info.item.index;
        return <TouchableOpacity  onPress={() => this._pressRow(info.item)} underlayColor="transparent">
            <View style={styles.rowItem}>
                <Image source={imageArray[inde]} style={styles.rowIcon} />
                <Text style={styles.rowItemTitle}>{txt}</Text>
                <Image source={require("../resources/ic_next.png")} style={styles.itemArrow} />
            </View></TouchableOpacity>
    }

    _overrideRenderItem = (info) =>{
        return(
          <View style={{width:kwidth, height:150}}>
              <ImageBackground source={require('../resources/my_bg.png')} style={{width:kwidth, height:150}}>
                  <Image source={this.state.headImageUrl.length>0?{uri:this.state.headImageUrl}:require('../resources/my_head.png')} style={styles.headImage} />
                  <Text style={styles.headerTitleName}>{this.state.nickName}</Text>
                  <ImageBackground source={require('../resources/filter40.png')} style={{flex:1,
                      flexDirection:'row',width:100,height:25,marginLeft:'auto',marginRight:'auto'}}>
                      <Image source={require('../resources/jiadou_icon.png')} style={{flex:1,width:12,height:15,marginLeft:5,marginTop:5}} />
                      <Text style={styles.jiadouTitle}>{this.state.jiadouCount} 个</Text>
                      <Image source={require("../resources/jiadou_arrow.png")} style={{flex:1,height:13,marginRight:5,marginTop:6}} />
                  </ImageBackground>
                  <Text style={styles.addressStyle}>{this.state.addressInfo}</Text>
              </ImageBackground>
          </View>
        );
    }

    _setionComp = (info) =>{
         var txt = info.section.key;
        return <View style={{height:txt == 'first'?0:10,justifyContent:"center",alignItems:'center'}}>

        </View>
    }

    _extraUniqueKey(item ,index){
        return "index"+index+item;
    }
    render() {
        var sections = [
            {key:'first', data:[{title:"阿童木"}],renderItem:this._overrideRenderItem},   //可以每个行设置不同的ui风格
            {data:[{title:"我的商城",index:0},{title:"我的嘉豆",index:1},{title:"我的邮包",index:2},{title:"商家入住",index:3}]},
            {data:[{title:"我的消息",index:4},{title:"我的帖子",index:5},{title:"参加的活动",index:6},{title:"中奖记录",index:7}]},
            {key:"W",data:[{title:"房屋管理",index:8},{title:"我的房源",index:9}]},
            {data:[{title:"意见反馈",index:10},{title:"关于生活家",index:11}]}
        ];
        return(
            <View style={{flex:1}}>
                <SectionList
                    renderSectionHeader={this._setionComp}
                    renderItem = {this._renderItem}
                    sections = {sections}
                    ItemSeparatorComponent = {()=><View><Text></Text></View>}
                    keyExtractor = {this._extraUniqueKey}// 每个item的key
                    // ListHeaderComponent = {()=><View style={{backgroundColor:'#25b960',alignItems:'center',justifyContent:'center',height:30}}><Text
                    //     style={{fontSize:18,color:"#ffffff"}}>通讯录</Text></View>}
                    // ListFooterComponent = {()=><View style={{backgroundColor:"#25b960",alignItems:'center',justifyContent:'center',height:30}}><Text
                    //     style={{fontSize:18,color:"#ffffff"}}>通讯录尾部</Text></View>}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headImage:{
        width:60,
        height:60,
        borderRadius:30,
        marginLeft:'auto',
        marginRight:'auto',
        marginTop:10,
    },
    jiadouTitle:{
        flex:4,
        height:16,
        marginTop:5,
        marginLeft:5,
        justifyContent:'center',
        alignItems:'center',
        color:'#ffffff',
        fontSize:13,
    },
   rowItem:{
        flexDirection:'row',
       width:kwidth,
       height:45,
       backgroundColor:"#ffffff",
   },
    rowIcon:{
        width:15,
        height:15,
        marginLeft:15,
        marginTop:15
    },
   rowItemTitle:{
       marginLeft:10,
       marginTop:12,
       marginBottom:10,
       color:'#5c5c5c',
       fontSize:15,
   },
    headerTitleName:{
       margin:5,
       color:"#333333",
        fontSize:15,
        marginRight:'auto',
        marginLeft:'auto',
    },
    itemArrow:{
        height:14,
        marginLeft:'auto',
        marginRight:30,
        marginTop:15,
    },
    addressStyle:{
        margin:5,
        color:"#999999",
        fontSize:13,
        marginRight:'auto',
        marginLeft:'auto',
    }
});

AppRegistry.registerComponent('AwesomeProject',()=>Test3);

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

const { kwidth , kheight} = Dimensions.get('window');

import Request from './Request';
import Config from './config';
const  settingIcon = require('../resources/icon_set.png');
export default class Test3 extends Component {
    static navigationOptions = ({navigation,screenProps}) => ({
        tabBarOnPress:(({ scene ,jumpToIndex})=>{
            // console.log(route);
            // alert(index);
            jumpToIndex(scene['index']);
        }),
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
        this.fetchData();
        this.props.navigation.setParams({   //右键按钮需要注册
            navigatePress:this.navigatePress,
        });
    }

    fetchData(){
        Request.post(Config.api.homeList,{'sCommandName':'getMember','sInput':{"ID":'1285858633'}},(data)=>{
            this.setState({
                headImageUrl:data.Item.sHeadImg,
                nickName:data.Item.sNickName,
            });
        },(error)=>{
           console.warn(error);
        });
    }

    constructor(props){
        super(props);
        index = -1;
        imageArray = [require('../resources/my_icon_01.png'),require('../resources/my_icon_02.png'),require('../resources/my_icon_03.png'),require('../resources/my_icon_04.png'),
            ,require('../resources/my_icon_05.png'),require('../resources/my_icon_06.png'),require('../resources/my_icon_07.png'),require('../resources/my_icon_08.png')
            ,require('../resources/my_icon_09.png'),require('../resources/my_icon_10.png'),require('../resources/my_icon_11.png'),require('../resources/my_icon_12.png')];
        let dataSource = [];
        let headImageUrl = '';
        let nickName = '生活家';
        this.state = {
            dataSource  : dataSource,
            headImageUrl :headImageUrl,
            nickName : nickName,
            index:index,
        };
    }

    navigatePress = () => {
        alert('点击headerRight');
    }

    _pressRow(item){
        // alert(item.title);
        alert(this.state.headImageUrl);
    }

    _renderItem = (info) =>{
        index++;
        var txt = '' + info.item.title;
        return <TouchableOpacity  onPress={() => this._pressRow(info.item)} underlayColor="transparent">
            <View style={styles.rowItem}>
                <Image source={imageArray[index]} style={styles.rowIcon} />
                <Text style={styles.rowItemTitle}>{txt}</Text>
                <Image source={require("../resources/jiadou_arrow.png")} style={styles.itemArrow} />
            </View></TouchableOpacity>
    }

    _overrideRenderItem = (info) =>{
        return(
          <View style={{width:kwidth, height:150}}>
              <ImageBackground source={require('../resources/my_bg.png')} style={{width:kwidth, height:150}}>
                  <Image source={this.state.headImageUrl.length>0?{uri:this.state.headImageUrl}:require('../resources/my_head.png')} style={styles.headImage} />
                  <Text style={styles.headerTitleName}>{this.state.nickName}</Text>
                  <ImageBackground source={require('../resources/filter40.png')} style={{flex:1,
                      flexDirection:'row',width:100,height:20,marginLeft:'auto',marginRight:'auto'}}>
                      <Image source={require('../resources/jiadou_icon.png')} style={{flex:1,height:13,marginLeft:5,marginTop:3}} />
                      <Text style={styles.jiadouTitle}>43824个</Text>
                      <Image source={require("../resources/jiadou_arrow.png")} style={{flex:1,height:13,marginRight:5,marginTop:3}} />
                  </ImageBackground>
              </ImageBackground>
          </View>
        );
    }

    _setionComp = (info) =>{
        var txt = '' + info.section.key;
        return <View style={{height:50,justifyContent:"center",alignItems:'center',backgroundColor:'#9cebbc'}}><Text style={{color:'white',fontSize:30}}>{txt}</Text></View>
    }

    _extraUniqueKey(item ,index){
        return "index"+index+item;
    }
    render() {
        var sections = [
            {data:[{title:"阿童木"}],renderItem:this._overrideRenderItem},   //可以每个行设置不同的ui风格
            {data:[{title:"我的商城"},
                    {title:"我的嘉豆"},{title:"我的邮包"},
                    {title:"商家入住"}]},
            {data:[{title:"我的消息"},{title:"我的帖子"},{title:"参加的活动"},{title:"中奖记录"}]},
            {key:"W",data:[{title:"房屋管理"},{title:"我的房源"}]},
            {data:[{title:"意见反馈"},{title:"关于生活家"}]}
        ];
        return(
            <View style={{flex:1}}>
                <SectionList
                    // renderSectionHeader={this._setionComp}
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
        marginTop:2,
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
       marginTop:15,
       marginBottom:15,
       color:'#5c5c5c',
       fontSize:15,
   },
    headerTitleName:{
       margin:5,
       color:"#333333",
        fontSize:15,
        marginRight:'auto',
        marginLeft:'auto',
        width:kwidth,
    },
    itemArrow:{
        height:13,
        marginLeft:kwidth-15-12,
        marginTop:16,
        backgroundColor:'#000000',
    }
});

AppRegistry.registerComponent('AwesomeProject',()=>Test3);

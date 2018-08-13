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
        let dataSource = [];
        let headImageUrl = '';
        let nickName = '生活家';
        this.state = {
            dataSource  : dataSource,
            headImageUrl :headImageUrl,
            nickName : nickName,
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
        var txt = '' + info.item.title;
        return <TouchableOpacity  onPress={() => this._pressRow(info.item)} underlayColor="transparent"><View style={styles.rowItem}><Text style={styles.rowItemTitle}>{txt}</Text></View></TouchableOpacity>
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
            {key:'B',data:[{title:"表哥"},{title:"贝贝"},{title:"表弟"},{title:"表姐"},{title:"表叔"}]},
            {key:"C",data:[{title:"成吉思汗"},{title:"超市快递"}]},
            {key:"W",data:[{title:"王磊"},{title:"王者荣耀"},{title:"往事不能回味"},{title:'王小磊'},{title:"王中磊"},{title:"王大磊"}]},
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
       alignItems:'flex-start',
       justifyContent:'center',
       height:60,
       backgroundColor:"#ffffff",
   },
   rowItemTitle:{
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
    }
});

AppRegistry.registerComponent('AwesomeProject',()=>Test3);

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
        Request.get(Config.api.homeList,(data)=>{
            this.setState({
                dataSource:data,
            });
        },(error)=>{
            console.warn(error);
        });
    }

    constructor(props){
        super(props);
        let dataSource = [];
        this.state = {
            dataSource  : dataSource,
        };
    }

    navigatePress = () => {
        alert('点击headerRight');
    }

    _pressRow(item){
        // alert(item.title);
        alert(this.state.dataSource.data[0].url);
    }

    _renderItem = (info) =>{
        var txt = '' + info.item.title;
        return <TouchableOpacity  onPress={() => this._pressRow(info.item)} underlayColor="transparent"><View style={styles.rowItem}><Text style={styles.rowItemTitle}>{txt}</Text></View></TouchableOpacity>
    }

    _overrideRenderItem = (info) =>{
        return(
          <View style={{width:kwidth, height:150}}>
              <ImageBackground source={require('../resources/my_bg.png')} style={{width:kwidth, height:150}}>
                  <Image source={require('../resources/my_head.png')} style={{width:60,height:60,marginLeft:'auto',marginRight:'auto',marginTop:10}} />
                  <Text style={styles.headerTitleName}>18123399795</Text>
                  <ImageBackground source={require('../resources/filter40.png')} style={{width:50,height:20,marginLeft:'auto',marginRight:'auto'}}>
                      <Image source={require('../resources/jiadou_icon.png')} style={{width:12,height:13,marginLeft:5,marginTop:3}} />
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
            {key:'A',data:[{title:"阿童木"}],renderItem:this._overrideRenderItem},   //可以每个行设置不同的ui风格
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

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
} from 'react-native';

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
            <View>
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
        return <TouchableOpacity  onPress={() => this._pressRow(info.item)} underlayColor="transparent"><View style={{alignItems:'flex-start',justifyContent:'center',height:60,backgroundColor:"#ffffff",}}><Text style={{ color:'#5c5c5c',fontsize:15}}>{txt}</Text></View></TouchableOpacity>
    }

    _setionComp = (info) =>{
        var txt = '' + info.section.key;
        return <View style={{height:50,justifyContent:"center",alignItems:'center',backgroundColor:'#9cebbc'}}><Text style={{color:'white',fontSize:30}}>{txt}</Text></View>
    }

    render() {
        var sections = [
            {key:'A',data:[{title:"阿童木"},{title:"阿玛尼"},{title:'爱多多'}],renderItem:this._renderItem},   //可以每个行设置不同的ui风格
            {key:'B',data:[{title:"表哥"},{title:"贝贝"},{title:"表弟"},{title:"表姐"},{title:"表叔"}]},
            {key:"C",data:[{title:"成吉思汗"},{title:"超市快递"}]},
            {key:"W",data:[{title:"王磊"},{title:"王者荣耀"},{title:"往事不能回味"},{title:'王小磊'},{title:"王中磊"},{title:"王大磊"}]},
        ];
        return(
            <View style={{flex:1}}>
                <SectionList
                    renderSectionHeader={this._setionComp}
                    renderItem = {this._renderItem}
                    sections = {sections}
                    ItemSeparatorComponent = {()=><View><Text></Text></View>}
                    ListHeaderComponent = {()=><View style={{backgroundColor:'#25b960',alignItems:'center',justifyContent:'center',height:30}}><Text
                        style={{fontSize:18,color:"#ffffff"}}>通讯录</Text></View>}
                    ListFooterComponent = {()=><View style={{backgroundColor:"#25b960",alignItems:'center',justifyContent:'center',height:30}}><Text
                        style={{fontSize:18,color:"#ffffff"}}>通讯录尾部</Text></View>}
                />
            </View>
        );
    }
}

AppRegistry.registerComponent('AwesomeProject',()=>Test3);

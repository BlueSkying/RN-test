import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Image,
    Dimensions,
    ImageBackground,
} from 'react-native';
import {observable,action} from 'mobx';
import {observe} from 'mobx-react/native';
import Request from './Request';
import Config from './config';
export const kwidth = Dimensions.get('window').width;
// 获取设备屏幕高
export const kheight = Dimensions.get('window').height;

export default class ResidentVCN extends Component{
    static navigationOptions = ({navigation, screenProps}) => ({
        headerTitle: "小区公告",
        headerTitleStyle:{flex:1,textAlign:'center',alignSelf:'center'},
        headerRight:<View style={{width:30,height:30}}></View>
    });

    constructor(props){
        super(props)
        let projectID = '1562561263';
        let userID = '1285858633';
        var dataSource = [];
        var count = 1;
        this.state={
            projectID:projectID,
            userID:userID,
            dataSource:dataSource,
        }
    }

    componentDidMount() {
        this.loadResident()
    }

    loadResident = ()=>{
        Request.post(Config.api.residentListUrl,{'params':{'contactId':this.state.userID,'projectId':this.state.projectID,
            'contentType':'1','classId':'villageNotice','pageSize':'20','page':count}},(data)=>{
            this.setState({
                dataSource : data["data"]["list"]
            })
        },(error)=>{
            console.warn(error);
        })
    }

    _renderItem = (item) => {
        return(
            <View style={{flex:1,flexDirection:'row'}}>
                <Image source={{uri:item.picUrl}} style={styles.IconImgStyle}/>
                <View style={{flexDirection:'column'}}>
                    <Text>{item.title}</Text>
                    <Text>{item.classname}</Text>
                    <Text>{item.createTime}</Text>
                </View>
            </View>
        )
    }

    refreshing(){
        let timer =  setTimeout(()=>{
            clearTimeout(timer)
            alert('刷新成功')
        },1500)
    }

    _onload(){
        let timer =  setTimeout(()=>{
            clearTimeout(timer)
            alert('加载成功')
        },1500)
    }

    render(){
        return(
            <View style={{flex:1}}>
                <FlatList
                    onRefresh={this.refreshing}
                    refreshing={false}
                    onEndReached={
                        this._onload
                    }
                    data={dataSource}
                    renderItem={this._renderItem}
                >
                </FlatList>
            </View>
        )
    }

}
const styles = StyleSheet.create({
   IconImgStyle:{
       marginLeft:15,
       marginTop:15,
       width:80,
       height:80,
   }
});
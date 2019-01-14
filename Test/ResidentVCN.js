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
import {observer} from 'mobx-react/native';
import Request from './Request';
import Config from './config';
export const kwidth = Dimensions.get('window').width;
// 获取设备屏幕高
export const kheight = Dimensions.get('window').height;
var count = 1;

@observer
export default class ResidentVCN extends Component{

    @observable dataSource = [];

    static navigationOptions = ({navigation, screenProps}) => ({
        headerTitle: "小区公告",
        headerTitleStyle:{flex:1,textAlign:'center',alignSelf:'center'},
        headerRight:<View style={{width:30,height:30}}></View>
    });

    constructor(props){
        super(props)
        let projectID = '38562569';
        let userID = '1285858633';
        this.state={
            projectID:projectID,
            userID:userID,
            isRefresh:false,
            isLoadMore:false
        }
    }

    componentDidMount() {
        this.loadResident()
    }

    componentWillUnmount() {
        count = 1
    }

    loadResident = ()=>{
        Request.post(Config.api.residentListUrl,{'params':{'contactId':this.state.userID,'projectId':this.state.projectID,
            'contentType':'1','classId':'villageNotice','pageSize':'20','page':String(count),'title':'','type':'1'}},(data)=>{
            if(count == 1){
                this.dataSource = data["data"]["list"]
            }else{
                this.dataSource = this.dataSource.concat( data["data"]["list"])
                this.setState({
                    isLoadMore:false,
                })
            }

        },(error)=>{
            console.warn(error);
        })
    }

    _renderItem = (item) => {
        return(
            <View style={{flex:1,flexDirection:'row',width:kwidth,height:110}}>
                <Image source={{uri:item.item.picUrl}} style={styles.IconImgStyle}/>
                <View style={{flexDirection:'column',marginLeft:15}}>
                    <Text style={styles.titleStyle}>{item.item.title}</Text>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.timeStyel}>{item.item.createTime}</Text>
                        <Text style={styles.timeStyel}>{item.item.classname}</Text>
                    </View>
                </View>
            </View>
        )
    }
    @action
    refreshing(){
        if(!this.state.isRefresh){
            count = 1
            this.loadResident()
        }
    }
    @action
    _onload(){
        if(!this.state.isLoadMore && this.dataSource.length>0){
            count ++
            this.loadResident()
        }
    }

    _separator = () => {
        return <View style={{height:5,backgroundColor:'white'}}/>;
    }
    @observer
    render(){
        return(
            <View style={{flex:1}}>
                <FlatList
                    onRefresh={()=>this.refreshing()}
                    refreshing={false}
                    onEndReachedThreshold={0.2}    //当列表滚动到距离内容最底部不足0.2时候调用onEndReached
                    onEndReached={
                        ()=>this._onload()
                    }
                    ItemSeparatorComponent={this._separator}
                    data={this.dataSource}
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
   },
    titleStyle:{
        fontSize:14,
        marginLeft:15,
        marginTop:15,
        width:kwidth-80-45,
        height:40,
    },
    timeStyel:{
        fontSize:12,
        marginLeft:15,
        marginTop:0,
        width:155,
        height:20,
    }
});
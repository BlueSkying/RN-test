import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
} from 'react-native';
import {observable,action} from 'mobx';
import {observer} from 'mobx-react/native';
import Request from './Request';
import Config from './config';
// 获取设备屏幕宽
export const kwidth = Dimensions.get('window').width;
// 获取设备屏幕高
export const kheight = Dimensions.get('window').height;

@observer
export default class InviteFriendVCN extends Component {

    @observable inviteHistoryList = [];
    @observable houseName = '';
    static navigationOptions = ({navigation, screenProps}) => ({
        headerTitle: "访客邀请",
        headerTitleStyle:{flex:1,textAlign:'center',alignSelf:'center'},
        headerRight:<View style={{width:30,height:30}}></View>
    });

    constructor(props) {
        super(props);
        this.loadFromLocal()
    }

    componentDidMount() {
        this.getInviteFriendList()
    }

    //加载本地缓存数据
    loadFromLocal = async()=>{
        let oldData = await global.storage.load({
            key:'recommendList'
        })
        houseName = oldData['data']['projectName'] + oldData['data']['resourceName']
    }

    getInviteFriendList=()=>{
        Request.post(Config.api.inviteFirendListUrl,{'customerId':'1285858633','pageSize':'20'},(data)=>{
            this.setState({
                inviteHistoryList:data.data,
            });
        },(error)=>{
            console.warn(error);
        });
    }

    @observer
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.houseStyle}>
                    {this.houseName}
                </Text>
                <Text style={styles.newInviteStyle}>
                   + 新建访客
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    houseStyle:{
        backgroundColor:'#2bb2c1',
        color:'#ffffff',
        textAlign:'left',
        width:kwidth,
        height:44,
        paddingLeft:20,
        paddingTop:15,
        fontSize:14,
    },
    newInviteStyle:{
        position:'absolute',
        backgroundColor:'#F7B749',
        height:50,
        width:kwidth,
        color:'#ffffff',
        textAlign:'center',
        paddingTop:15,
        fontSize:16,
        top:kheight-50-64,
    }
});

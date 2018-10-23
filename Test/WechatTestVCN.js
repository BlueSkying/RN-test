import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    ImageBackground, DeviceEventEmitter,
    Platform,
} from 'react-native';
export const kwidth = Dimensions.get('window').width;
// 获取设备屏幕高
export const kheight = Dimensions.get('window').height;
import Request from './Request';
import Config from './config';
import * as WeChat from 'react-native-wechat'
export default class WechatTestVCN extends Component {
    static navigationOptions = ({navigation, screenProps}) => ({
        headerTitle: "在线缴费",
        headerTitleStyle:{flex:1,textAlign:'center',alignSelf:'center'},
        headerRight:<View style={{width:30,height:30}}></View>
    });

    constructor(props) {
        super(props);
        WeChat.registerApp('wx244b6d90839b6a71')
    }

    render() {
        return (
            <View style={{flexDirection:'column'}}>
                <Text style={styles.contentStyle}>
                    你的物业欠费为0.01元请及时缴纳.
                </Text>
                <TouchableOpacity  onPress={this.creatPayInfo}>
                    <View style={styles.btnBgStyle}>
                        <Text style={styles.payBtnStyel}>
                            立即支付
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    creatPayInfo = () => {
        Request.post(Config.api.createPayUrl, {
                "objType": "2",
                "tencyId": "1",
                "contactId": '1285858633',
                "projectId": '43241941',
                "resourceId": '43682521',
                "mobile": '18123399795',
                "arrearMap": [],
                "balanceMap": [{
                    "payMoney": '0.01',
                    "balanceId": 'ff8080815e9f5ad7015ebbbf1f6b75b2',
                    "balTypeId": "29975716",
                    "payComment": "no"
                }]
            }
            , (data) => {
                console.warn(data)
                if (data['r'] == 0) {
                    this.setState({
                        orderID: data['orderId'],
                    })
                    this.weChatPay();
                }
            }, (error) => {
                console.warn(error);
            });
    }


    weChatPay = () => {
        Request.post(Config.api.wechatPayUrl, {
            'payType': '2', "objType": "1", "tencyId": "1",
            'contactId': '1285858633', 'customerName': '18123399795', 'orderId': this.state.orderID, 'totalFee': '0.01'
        }, (data) => {
            console.warn(data)
            let jsonData = data;
            if (data['r'] == 0) {
                WeChat.isWXAppInstalled()
                    .then((isInstalled) => {
                        if (isInstalled) {
                            WeChat.pay({
                                partnerId: jsonData.p.partnerid,
                                prepayId: jsonData.p.prepayid,
                                nonceStr: jsonData.p.noncestr,
                                timeStamp: jsonData.p.timestamp,
                                package: jsonData.p.package,
                                sign: jsonData.p.sign
                            }).then((requestJson) => {
                                if (requestJson.errorCode == '0') {
                                    //    回调成功处理
                                }
                            }).catch((err) => {
                                Alert.alert('支付失败')
                            })
                        } else {
                            Alert.alert('请安装微信');
                        }
                    });
            }
        }, (error) => {
            console.warn(error);
        });
    }
}

const styles = StyleSheet.create({
     contentStyle:{
         width:kwidth,
         height:40,
         backgroundColor:'#f7b749',
         paddingTop:10,
         paddingLeft:15,
         color:'#ffffff',
         fontSize:14,
     },
    btnBgStyle:{
        marginTop:80,
        width:kwidth-30,
        height:50,
        backgroundColor:'#2bb2c1',
        borderRadius:40,
        marginLeft:15,
        marginRight:15,
    },
    payBtnStyel:{
        width:kwidth-30,
        height:50,
        paddingTop:15,
        textAlign:'center',
        fontSize:16,
        backgroundColor: 'transparent',
        color:'#ffffff',
    }
});
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    Button,
    TouchableOpacity,
    FlatList,
    Modal,
} from 'react-native';
import Request from './Request';
import Config from './config';
export const kwidth = Dimensions.get('window').width;
// 获取设备屏幕高
export const kheight = Dimensions.get('window').height;

export default class HouseExchangeView extends Component {
    constructor(props) {
        super(props);
        let houseDataArray = [];
        // console.warn(this.props.showView),
        this.state = {
            houseDataArray: houseDataArray,
            animationType :'none',
            modalVisible:this.props.showView,
            transparent : true,
        };

    }

    componentDidMount() {
        this.fetchData()
    }

    // 获取绑定房屋数据
    fetchData() {
        Request.post(Config.api.boundHouseUrl, {"contactid": "1285858633"}, (data) => {
            // console.warn(data)
            this.setState({
                houseDataArray: data.data,
            });
        }, (error) => {
            console.warn(error);
        });
    }

    render() {
        var data = [];
        for(var i = 0;i < this.state.houseDataArray.length;i++){
            data.push({key:i,'object':this.state.houseDataArray[i]})
        }
        return (
        <View>
            <Modal
                style={styles.bgstyle}
                animationType={this.state.animationType}
                transparent={this.state.transparent}
                visible={this.state.modalVisible}
                onRequestClose={()=>{this._setModalVisible(false)}}
                onShow={()=>{this._startShow()}}
            >
               <FlatList
                  contentContainerStyle={styles.bgstyle}
                  data={data}
                  renderItem={({item}) =>
                     <TouchableOpacity onPress={()=>this._selectHouse(item.object)}>
                        <Text style={styles.item}>
                           {item.object.projectName}
                        </Text>
                     </TouchableOpacity>
                }
                />
            </Modal>
        </View>
        )
    }

    _setModalVisible = (visible)=>{
        this.setState({
            modalVisible:visible
        })
    }

    _startShow = ()=>{
        this.setState({
            modalVisible:true
        })
    }
    // 回传选中的房屋
    _selectHouse = (item) =>{
        this.setState({
            modalVisible:false
        })
         this.props.selectHouse(item);
    }
}

 const styles = StyleSheet.create({
           bgstyle:{
               backgroundColor:'#2bb2c1',
               width:168,
               height:144,
               marginLeft:(kwidth-168)/2,
               marginTop:60,
           },
           item:{
               color:'#333333',
               fontSize:14,
               marginLeft:'auto',
               marginRight:'auto',
               height:36,
               paddingTop:10,
               justifyContent:'center',
               alignItems:"center",
           },
 });

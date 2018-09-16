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
} from 'react-native';
import Request from './Request';
import Config from './config';
export const kwidth = Dimensions.get('window').width;
// 获取设备屏幕高
export const kheight = Dimensions.get('window').height;

export default class HouseExchangeView extends Component {
    constructor(props) {
        super(props);
        console.warn('取房屋数据')
        let houseDataArray = [];
        this.state = {
            houseDataArray: houseDataArray,
        }
    }

    componentDidMount() {
        console.warn('取房屋数据')
        this.fetchData()
    }

    // 获取绑定房屋数据
    fetchData() {
        console.warn('取房屋数据')
        Request.post(Config.api.boundHouseUrl, {"contactid": "1285858633"}, (data) => {
            console.warn(data)
            this.setState({
                houseDataArray: data.data,
            });
        }, (error) => {
            console.warn(error);
        });
    }

    render() {
        return (
        <View style={styles.bgstyle}>
            <FlatList
                data={this.state.houseDataArray}
                renderItem={({item}) =>
                    <TouchableOpacity onPress={()=>this.selectHouse(item)}>
                       <Text style={styles.item}>
                           {item.projectName}
                       </Text>
                    </TouchableOpacity>
                }
            />
        </View>
        )
    }

    _selectHouse(item){
        this.props.selectHouse(item);
    }
}

 const styles = StyleSheet.create({
           bgstyle:{
               backgroundColor:'#2bb2c1',
               width:168,
               height:this.houseDataArray == null ? 36 : (this.houseDataArray.length > 4 ? 4:this.houseDataArray.length)*36,
               marginLeft:(kwidth-168)/2,
               marginTop:0,
           },
           item:{
               color:'#333333',
               fontSize:14,
               marginLeft:'auto',
               marginRight:'auto',
               height:36,
               justifyContent:'center',
           },
 });

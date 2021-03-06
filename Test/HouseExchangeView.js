import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
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
        let houseDataArray = [];
        this.state = {
            houseDataArray: houseDataArray,
        };

    }

    componentDidMount() {
        this.fetchData()
    }

    // 获取绑定房屋数据
    fetchData() {
        console.warn('获取绑定房屋' + this.props.userId)
        Request.post(Config.api.boundHouseUrl, {"contactid": this.props.userId}, (data) => {
            this.setState({
                houseDataArray: data.data,
            });
        }, (error) => {
            console.warn(error);
        });
    }

    _extraUniqueKey(item ,index){
        return "index"+index+item;
    }

    render() {
        var data = [];
        for(var i = 0;i < this.state.houseDataArray.length;i++){
            data.push({key:i,'object':this.state.houseDataArray[i]})
        }
        return (
        <View>
                <View style={styles.bgstyle}>
                  <FlatList
                  data={data}
                  renderItem={({item}) =>
                     <TouchableOpacity onPress={()=>this._selectHouse(item)}>
                         <View>
                            <Text style={styles.item}>
                              {item.object.projectName}
                            </Text>
                         </View>
                     </TouchableOpacity>
                  }
                  keyExtractor = {this._extraUniqueKey}// 每个item的key
                  />
                </View>
        </View>
        )
    }
    // 回传选中的房屋
    _selectHouse = (item) =>{
         let house = item.object;
           console.warn('回传值' + house.projectId+'房屋' +house.resourceId)
          this.props.selectHouse(house);
    }
}

 const styles = StyleSheet.create({
           bgstyle:{
               backgroundColor:'#2bb2c1',
               width:168,
               height:144,
               marginLeft:(kwidth-168)/2,
               marginTop:60,
               borderRadius:8,
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

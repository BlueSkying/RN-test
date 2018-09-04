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
    View
} from 'react-native';

import MainTitleView from './MainTitleView.js';

export default class Test1 extends Component {

    static navigationOptions = ({navigation,screenProps}) => ({
        // 这里面的属性和App.js的navigationOptions是一样的。
        header:(
            <MainTitleView  scan={()=>navigation.state.params?navigation.state.params.scanBrcode():null}
                            exchange = {()=>navigation.state.params?navigation.state.params.exchangeProject():null}/>
        )
    })

    componentDidMount(){
        // 通过在componentDidMount里面设置setParams将title的值动态修改
        this.props.navigation.setParams({
            scanBrcode:this.scan,
            exchangeProject:this.exchange,
        });
    }

    //点击了扫描按钮
    scan = ()=>{
        alert('点击了扫描按钮')
    }
     //点击了项目切换按钮
    exchange = ()=>{
        alert('点击了项目切换按钮')
    }

    navigatePress = () => {
        const { goBack } = this.props.navigation;
        goBack();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to Test1 !
                </Text>
                <Text style={styles.instructions} onPress={()=>{
                    const { navigate } = this.props.navigation;
                    navigate('Detail1');
                }}>
                    点我跳转到Detail1
                </Text>
                <Text style={styles.instructions}>
                    当前页面的Tabbar是在App.js中通过最普通的方式自定义。
                </Text>
                <Text style={styles.instructions} onPress={()=>{
                    const { navigate } = this.props.navigation;
                    navigate('Detail2');
                }}>
                    在Detail2中有reset和navigate的使用方法(点文字跳转)
                </Text>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        marginTop:10,
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
        fontSize: 18,
    },
});


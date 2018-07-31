/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
  /* // flex布局
  import React, {Component} from 'react';
  import {AppRegistry, View} from 'react-native';

  export default class AlignItemsBasics extends Component{
      render(){
          return(
              <View style = {{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems:'center',
              }}>
                <View style={{width: 50, height:50, backgroundColor:'powderblue'}}/>
                <View style={{width: 50, height:50, backgroundColor:'skyblue'}}/>
                <View style={{width:50,height:50,backgroundColor:'steelblue'}} />
              </View>
          );
      }
  };
  AppRegistry.registerComponent('AwesomeProject',()=>AlignItemsBasics);
*/

import React,{Component} from 'react';
import {Alert,Button, View, Image, Text, TextInput, WebView} from 'react-native';

export default class ButtonTest extends Component{
    render(){
        return(
            <View style={styles.view}>
                <Button style={{flex:1}}
                        disabled={false}
                        onPress={onButtonPress}
                        title="buttonClick"
                    //  color:"#841584"
                        accessibilityLabel={"OK，Great!"}
                />
                <Image style = {styles.image}
                    source={require('./ios/ic_logo.png')}
                />
                <Image style = {styles.image}
                    defaultSource={require('./ios/ic_logo.png')}
                    source={{url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1530596559899&di=1cf6edc847e8a313aca72ae2780b314b&imgtype=0&src=http%3A%2F%2Fupload.qianlong.com%2F2016%2F1114%2F1479111325134.jpg'}}
                />

                <Text style = {styles.text}>
                     Hello World!
                </Text>

                <TextInput style={styles.input}

                />
                  
                <WebView style={styles.web}
                     source={{url:'https://www.bejson.com/'}}
                     scalesPageToFit={false}
                />
            </View>
        );
    }
}

const onButtonPress=()=>{
  Alert.alert('Button has been pressed!');
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  image: {
    flex: 1,
    width: 50,
    height: 50,
  },
  
  web: {
    flex:1,
    backgroundColor: 'red',
    width: 100,
  },
  
  input: {
    flex:1,
    width:40,
    borderColor:"#2bb2c1", 
    borderWidth:1
  },
 
  text: {
    flex:1,
    fontSize: 18, 
    backgroundColor:"#2bb2c1",
    height:50
  },
});

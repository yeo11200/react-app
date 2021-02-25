/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { WebView } from 'react-native-webview';
/** Platform Check */
import { Platform, PermissionsAndroid, BackHandler, Alert } from 'react-native';

import firebase from '@react-native-firebase/app';
import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

const App = () => {

  let webviewRef = useRef();

  const [pushToken, setPushToken] = useState(null)
  const [isAuthorized, setIsAuthorized] = useState(false)

  const webViewRefT = React.createRef();
  
  /** 웹뷰 ref */
  const handleSetRef = _ref => {
    webviewRef = _ref;
  };

  const url = 'https://jinseop-api.click/';

  // web -> rn으로 보내는 함수, onMessage props에 적용
  const getMessage = (e) => {

    console.log(e.nativeEvent.data);

    if(e.nativeEvent.data !== 'undefined'){
      const event = JSON.parse(e.nativeEvent?.data);
      console.log('nativeLog', event.test);  
    }
  
  }

  // rn -> web으로 보낸 함수, 정상적으로 보냈지만, web에서 console.log로 확인하다보니 확인이 불가능
  // alert로 확인했지만, 윈스턴을 이용해서 log로 확인할 예정
  const onLoadProgress = ({ nativeEvent }) => {

    console.log("handleEndLoading");

    // progress : 현재 load의 상태를 나타낸다.
    if(nativeEvent.progress === 1){
      // webviewRef.postMessage(JSON.stringify({data : 'rn -> web'}));
    }

  }

  const onAndroidBackPress = () => {

    console.log(webviewRef.current);
    console.log(webviewRef.canGoBack);
    if(webviewRef.current){
      webviewRef.current.goBack();
      return true;
    }
    return false;
  }

  const showNotification = (type) => {
    console.log('showNotification', type);
    Alert.alert(JSON.stringify(type));
  }
  
  useEffect(() => {
    firebase
      .messaging()
      .getToken(firebase.app().options.messagingSenderId)
      .then(token => console.log(token))
      .catch(e => console.log(e));

    // firebase.messaging().onMessage(response => {
    //   console.log(JSON.stringify(response));
    //   if (Platform.OS === 'ios') {
    //     PushNotificationIOS.requestPermissions().then(
    //       showNotification(response),
    //     );
    //   } else {
    //     showNotification(response);
    //   }
    // });
  }, []);

  useEffect(() => {

    if(Platform.OS === 'android'){
      BackHandler.addEventListener('hardwareBackPress',onAndroidBackPress);
    }

    return () => {
      if(Platform.OS === 'android'){
        BackHandler.removeEventListener('hardwareBackPress',onAndroidBackPress);
      }
    }

    
  }, []);
  
  return (
    /**
     * onLoadProgress : load의 상태를 나타낸다.
     * onLoad : load가 될 경우 실행될 함수
     * onLoadEnd : load가 끝났을 경우 실행하는 함수
     * onLoadStart : load를 하자마자 시작할 함수
     */
    <>
      <WebView
        ref={handleSetRef}
        source={ { uri : url} }
        onMessage={getMessage}
        javaScriptEnabled={true}
        onLoadProgress={onLoadProgress}>
      </WebView>
    </>
  );
};

export default App;

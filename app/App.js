/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useRef } from 'react';
import { WebView } from 'react-native-webview';

/** Platform Check */
import { Platform } from 'react-native';

const App = () => {

  let webviewRef = useRef();

  /** 웹뷰 ref */
  const handleSetRef = _ref => {
    webviewRef = _ref;
  };

  const url = 'http://192.168.35.177:3000/';

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

    if(nativeEvent.progress === 1){
      webviewRef.postMessage(JSON.stringify({data : 'rn -> web'}));
    }

  }
  return (
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

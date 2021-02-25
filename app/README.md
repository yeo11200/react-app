## react-native project

### react-native install
```npm
npm install -g react-native-cli // react-native 전역 설치

react-native init --version '@0.60.0' project-name // 이전 버전의 react-native 
```


### webView
- webView란
    - web으로 만든 프로그램을 app으로 만들어서 배포를 하는 것을 말한다
    - react-native를 선택한 이유는 크로스 플랫폼 중에서 react만 안다면 개발을 시작할 수 있다는 장점이 있다.
```npm
npm install --save react-native-webview // webview 설치 
```

```js

import WebView from 'react-native-webview';

const app = () => {
    return(
        <>
        /**
         * onload : load중 발생하는 함수
         * onLoadStart : load되자마자 시작되는 함수
         * onLoadEnd : load가 종료되자마자 되는 함수
         * onLoadProgress : load 상태를 나타내는 함수
         * onMessage : web에서 app으로 postMessage가 발생할 경우 실행하는 함수
         */
        <WebView />
        </>
    )
}
```

- webView의 장점은 하나의 web으로 다양한 플랫폼을 사용할 수 있다는 장점이 있다
    - onMessage : web -> rn으로 데이터를 보낼 때 사용
    - postMessage : rn -> web으로 데이터를 보낼 때 사용

```js
import WebView from 'react-native-webview';

const app = () => {
    const webRef = useRef();

    const onMessage = (event) => {
        // 해당하는 곳에는 event와 web상태 등을 보내기 떄문에 data가 들어있는 key를 호출
        // JSON.parse로 받는 이유는 해당 데이터를 보낼 때 key와 같이 보낼려고 JSON.stringfy로 보낸다.
        const data = JSON.parse(event.data);

        /**
         * web에서 보낼 줄 경우
         * window.postMessage(JSON.stringfy({'key' : value }))
         */
    }

    const onLoadProgress = (nativeEvent) => {
        // progress가 완성이 될 떄 까지 계속 호출 함으로 === 1을 통해 한번만 호출
        if(nativeEvent.progress === 1){
            // webRef.postMessage : 해당하는 app의 데이터에서 postMessage를 통해서 web으로 데이터를 전파
            webRef.postMessage(JSON.stringfy({'key' : value}));

            /**
             * web에서 받을 경우에는 
             * android : document
             * ios : window 
             * document.addEventListener('message', (event) => console.log(event.data));
             */
        }
    }
    return(
        <>
        <WebView 
            ref={(ref) => webRef = ref}
            onMessage={onMessage}
            onLoadProgress={onLoadProgress}
        />
        </>
    )
}

```


### permission : 퍼미션
```npm

// IOS 전용 퍼미션 여부
npm install --save react-native-permission
```
```js

// react-native에서 제공하는 android 전용 permission 
// Platform은 현재 react-native에 대한 platform을 확인해준다.
import { PermissionsAndroid, Platform } from 'react-native';

```


### firebase 연동
```npm

npm install --save @react-native-firebase/app @react-native-firebase/messaging
```

- 앱이 켜져있을 경우 push(App.js에 적용)
```js
  import messaging from '@react-native-firebase/messaging';

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);
```

- 앱이 꺼져있을 경우 push(index.js에 적용)
```js
  import messaging from '@react-native-firebase/messaging';

  useEffect(() => {
    // Register background handler
    messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });

```
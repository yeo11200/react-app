# React Web / App


## react npm 설명
```npm
npm install --save react-router-dom // 웹 전용 router
npm install --save react-router // 웹 / 앱 전용 rotuer(둘다 가능)
npm install --save react-native-router // 앱 전용 router
```
1. 4버전 이상은 browserHistory를 지원안함
2. npm install --save react-router-dom@3 으로 추가 후 작업



## react 에서 전역으로 데이터를 사용하기

1. 리액트에서는 2가지로 state 관리를 한다
 - swr : (npm i swr)
 - redux : (npm i redux)


2. redux vs swr
 - redux :
    - 전역으로 state를 관리하기 위해서 나타낸 library
    - 학습이 많이 필요한 상태
 - swr : 
    - api의 재원을 조금 더 효율적으로 사용하기 위해서 사용하는 라이브러리, Next를 만든 곳에서 같이 만든 라이브러리 임으로 axios, fetch 등 API 통신을 할 경우 효율적으로 사용이 가능하다.
    - 초 단위, 혹은 end-point 단위, 포커스가 될 경우 API 통신이 가능하고, 해당 하는 경우 실시간으로 처리하는 것처럼 보일 수 있다. <br>
    return data 
    - mutate : end point 단위로 해당 할 경우 캐시 된 데이터를 변경이 가능하다.<br>
    option 
    - refreshWhenOffline : 브라우저가 offline일 경우 발생(revalidateOnReconnect : 네트워크 연결이 다시 시도되면 자동으로 재 검증)
    - shouldRetryOnError : 에러가 있을 경우 자동 적으로 실행
    - revalidateOnFocus : 창이 맞춰지면 자동으로 재 검증


### react typescript 도입

- typescript 란
   - javascript의 동적인 변수 할당을 정적으로 변경해주는 역할을 한다.
   - javascript는 runtime시 알수있었던 에러를 compile or 실행과정에서 알수있다.
   - babel 등 compile을 통해서 es5로 전환 가능

```npm
// react project typescript로 생성
create-react-app my-app --template typescript

// react project 생성후 typescript 적용
npm install --save typescript @types/node @types/react @types/react-dom @types/jest
```

```js
type GreetingsProps = {
  name: string;
  mark: string;
};

const App: React.FC<GreetingsProps> = () => {} // react type React.FC
```
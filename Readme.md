# 한양대학교 공학대학 공식 밴드동아리 한울림 어플리케이션
## Stack
- React Native 0.64.2
- TypeScript 4.3.4
- React 17.0.1
- React Hooks
- React Context
- React Navigation
------
## 기능
* 공지사항
* 연습실 예약 
* 번개 모임 (준비중)
* 게시판 (준비중)
-----
## 사용법
### 설치하기
- node modules

  ```
  yarn install
  ```
- IOS 빌드 시 `/ios`내에서 

  ```
  pod install
  ```
### 실행하기
- 안드로이드

  ```
  npx react-native run-android
  ```
- IOS

  ```
  react-native run-ios
  ```
-----
## Folder Structure
```
app
├── App.tsx 
├── assets       # 외부 파일 모음 
│		├── img      # .png or .jpg 파일들
│   └── fonts    # .ttf 파일들
├── utils        # 내부에서 상수화된 파일 모음
│    ├── hook     # Custom Hook
│    ├── context  # React Context API
│    └── constant 
│         ├── common 
│         │     ├── style # color.js / size.js 등의 파일 
│         │     └── ...
│         ├── main   # components/screen 에 있는 폴더명과 상등
│         ├── login
│         └── ... 
├── components
│       ├── navigator # Navigator 모음
│       ├── common    # Screen에 구애받지 않고 공통적으로 사용되는 component
│       └── screen    # 하위폴더안에 들어가 있는 모든 파일들은 하위폴더명으로 시작할 것.
│             ├── main 
│             │     ├ MainScreen.jsx     # `폴더명+Screen` (해당 폴더 최상위 파일)
│             │     ├ MainStyleSheet.jsx # 해당 Screen의 StyleSheet 파일
│             │     ├ MainBtn.jsx        # 해당 Screen에서만 사용되는 component
│             │     └ ...
│             ├── login
│             └── ...       
└── service # Model 과 Controller를 담당
```
---
## Navigator 구조
```
MainNavigator
├─ LoginNavigator
│      ├ Login
│      ├ NotApproved
│      ├ SignIn 
│      └ SignUp    
├─ BottomTabNavigator
│      ├ Home
│      ├ FlashMob
│      ├ ReservationStackNavigator
│      │        ├ ReservationTimeTable
│      │        └ ReservationProcess
│      └ Board
├─ NoticeNavigator
│      └ NoticeDetail
├─ NoticeScreen
├─ MyPage
└── infoEdit
```
---
## 화면
초기화면|로그인|회원가입
----|-----|-----
<img src="https://user-images.githubusercontent.com/81297398/130537623-e35e968e-b71a-4cf9-9171-1c17c2517362.png" width=250>|<img src="https://user-images.githubusercontent.com/81297398/130537632-2bc19ea0-7c1d-4209-a382-9b73c9fff9a9.png" width=250>|<img src="https://user-images.githubusercontent.com/81297398/130537641-022c9321-78df-4345-b7b1-215ddf828ae6.png" width=250>
홈화면|개인정보화면|번개화면
<img src="https://user-images.githubusercontent.com/81297398/130537801-ba39cf59-8e66-4c08-82ae-add9ab99afb9.png" width=250>|<img src="https://user-images.githubusercontent.com/81297398/130537838-d22e09a9-0889-4487-93e4-955c384694d1.png" width=250>|<img src="https://user-images.githubusercontent.com/81297398/130537849-a73075cb-af23-47b4-a4b3-b075a6642b4b.png" width=250>
시간표화면|예약확정화면|게시판화면
<img src="https://user-images.githubusercontent.com/81297398/130537981-c693c0e1-f7d3-4395-a44c-5d511ea86d93.png" width=250>|<img src="https://user-images.githubusercontent.com/81297398/130537989-d99a5ae1-ee98-42fd-bcad-67a90965d4a8.png" width=250>|<img src="https://user-images.githubusercontent.com/81297398/130537998-5b3c0648-3bd9-45cc-8bca-505890040ac7.png" width=250>
-----
## License
* All copyrights belongs to Hanwoollim

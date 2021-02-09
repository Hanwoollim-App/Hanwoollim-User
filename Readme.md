# 한양대학교 공학대학 공식 밴드동아리 한울림 어플리케이션
## Stack
* React-Native
* TypeScript
* Redux
* Hook
------
## 기능
* 연습실 예약 
* 번개 모임 (가칭)
* 게시판 (가칭)
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
│      └ SignUp    
├─ BottomTabNavigator
│      ├ Home
│      ├ FlashMob
│      ├ ReservationStackNavigator
│      │        ├ ReservationTimeTable
│      │        └ ReservationProcess
│      └ Board
└ UserInfoStackNavigator
```
## License
* All copyrights belongs to Hanwoollim
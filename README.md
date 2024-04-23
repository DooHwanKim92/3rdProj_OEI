## OEI(중고거래 사이트)

### 서비스 설명 및 기획 의도

- 주제 : 중고거래사이트 (당근 모작)
- 서비스명 : 오이 (OEI)
- 설명 : 사용자 위치 기반 게시글 추천 서비스
- 프로젝트 목표
    - REST API 활용 (Restful한 개발)
    - JWT 활용
    - Next.js 이해도 향상 ↑
    - 새로운 API 활용 (ex.Geolocation, KAKAO Address)


[기능정의서](https://velog.io/@asdf4321/%EC%A4%91%EA%B0%84-3%EC%B0%A8-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EB%8C%80%EC%97%AC%EC%A4%91%EA%B0%9C-%EC%9B%B9-%EC%84%9C%EB%B9%84%EC%8A%A4-%EA%B8%B0%EB%8A%A5%EC%A0%95%EC%9D%98)

---

## 🛠 개발환경

1. 사용언어 : JAVA Springboot , MariaDB(MySQL), Next.js
2. JDK : Amazon Corretto version 17.0.9
3. 에디터 : IntelliJ IDEA, DBeaver
4. DB종류 : MariaDB(MySQL), Server(local)
5. 라이브러리 : JPA, security, lombok, kakao, tailwind


---

## ☁️ ERD [링크](https://dbdiagram.io/d/3rdProj_OEI-6610ad2203593b6b61520ec2)

![image](https://github.com/DooHwanKim92/3rdProj_OEI/assets/144447216/5949d05d-bfea-4113-80f8-846bd2115a4c)


---

## 👀 시연영상

![Video Label](http://img.youtube.com/vi/Qow8tkjBIzc/0.jpg)(https://www.youtube.com/watch?v=Qow8tkjBIzc)

---

## 🔥 트러블 슈팅

---

### 🚨 Issue 1
### 🚧 DTO를 사용하는 이유


#### 💭 [이슈 내역]

백에서 프론트로 데이터를 전달해줄 때 Java 객체를 전달하면 JSON 객체로 직렬화 하는데 에러가 생긴다
예를 들어 member 객체를 넘겨준다고 했을 때 member에 mapping 되어 있는 article > review > member > article ... 식으로 
객체들이 무한으로 순환참조에 걸리게 된다. `@JsonIgnore`라는 어노테이션을 사용할 수 있지만 한계가 있다.


#### 🚥 [해결]

![image](![image](https://github.com/DooHwanKim92/3rdProj_OEI/assets/144447216/116bc038-ce72-4adf-9c5a-803ac93cb7df)
)

DTO를 만들어 프론트에서 필요한 Data만 담아서 전달해준다

---

### 🚨 Issue 2
### 🚧 사용자 위치와 게시글이 작성된 곳의 위치 거리 계산

#### 💭 [이슈 내역]

유저가 게시글을 작성할 때, 게시글을 작성한 곳의 위치를 저장
유저가 로그인 했을 때 최근 위치 정보를 저장하고 게시글과 유저간의 거리를 계산하여 DTO에 담아 보여준다

#### 🚥 [해결]

1. `Geolocation API` 로 현재 로그인한 유저의 디바이스 기능(GPS, WIFI, IP주소)을 통해
   현재 위도와 경도를 조회한다
![image](https://github.com/DooHwanKim92/3rdProj_OEI/assets/144447216/2df629ef-2de1-4b8c-b54a-b55864d18234)

3. 조회한 위도와 경도를 `KAKAO API`로 도로명 주소 등을 얻어 필요한 Data를 게시글에 저장한다
![image](https://github.com/DooHwanKim92/3rdProj_OEI/assets/144447216/a521f298-094c-4359-a955-56a8dc3fa074)
![image](https://github.com/DooHwanKim92/3rdProj_OEI/assets/144447216/12abd152-4e00-4fec-81bd-5e98ad6a9f75)

4. 사용자가 로그인 했을 때, 현재 위치 정보를 저장한다
![image](https://github.com/DooHwanKim92/3rdProj_OEI/assets/144447216/d4a27e44-af00-4e2e-a9c2-d55f84bb6164)

5. 백엔드에서 현재 로그인한 유저의 위치와 게시글의 위치 거리를 계산하는 로직을 만든다
  
6. 게시글 목록을 나타낼 때, DTO에 `Distance`를 추가해서 프론트에 전달한다

결과
![image](https://github.com/DooHwanKim92/3rdProj_OEI/assets/144447216/db8bf3a0-1598-4c5a-88b6-3639ee4cf160)

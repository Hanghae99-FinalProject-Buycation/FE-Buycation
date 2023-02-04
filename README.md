
# 항해 10기 A반 6조의 [Buycation]

+ 함께 구매하고 나누고 즐기는 형태 공동 구매 플랫폼입니다.
+ 프로젝트 기간 2022.12.30 ~ 2022.02.10
+ 서비스 환경 : 웹 / 모바일 둘 다 이용 가능합니다.

💕 **[바이케이션 서비스 바로가기](https://buycation.co.kr/)**

🎬 **[서비스 시연 영상]()**

<br />


## 기획

`"👩 대량의 물품들을 근처 이웃들과 함께 구매하고 나누어 가격 부담을 덜어보세요!"`

`"👩‍🦱 배송비가 비싼 물품들을 함께 구매하거나 같은 음식점의 음식들을 함께 배달 시켜보세요!"`

`"👱‍♂ 모여서 함께 먹고 즐기는 건 어떨까요?`

**이렇게 시작된 저희의 기획은 아래의 과정을 거쳐 탄생했습니다.**

<br />

🖼  **[와이어 프레임](https://www.figma.com/file/Guzhia2WzOW4wur7Z3OUCR/%ED%95%AD%ED%95%B499?node-id=0%3A1&t=0U59EVeauLbSOWxL-0)**
🧬  **[API 기능 명세서](https://www.notion.so/API-40937cdcf4134fbbb8c715fa1ae8dd10)**

<br />


## 기술 스택
**Frontend Tech Stack**  
![리액트](https://user-images.githubusercontent.com/97425158/161745107-cc062718-9c52-4446-8f14-9faba0b9dea7.svg)
![자바스크립트](https://user-images.githubusercontent.com/97425158/161745127-a3fa5ed0-ceb6-427a-94d1-834d762fd3b4.svg)
![에이치티엠엘](https://user-images.githubusercontent.com/97425158/161745161-566f015b-0ec2-4bba-82aa-f3bb7498bdd7.svg)
![씨에스에스](https://user-images.githubusercontent.com/97425158/161745198-92ff3896-7ce0-4946-a8b4-e6d23223eb3b.svg)
![리덕스](https://user-images.githubusercontent.com/97425158/161745222-ea0ba9bf-86e4-48cb-8a44-f8d8bfec2d02.svg)
![악시오스](https://user-images.githubusercontent.com/97425158/161745239-453b4075-7bd0-4c63-9c5a-5c1d76021b8d.svg)
![스타일드컴포넌트](https://user-images.githubusercontent.com/97425158/161745269-27a8a71d-788d-4bdf-97e8-f86c97b224a9.svg)
![클라우드프론트](https://user-images.githubusercontent.com/97425158/161745404-114d6c7d-c720-4370-b0dd-4aea4893bb1d.svg)
![아마존S3](https://user-images.githubusercontent.com/97425158/161744999-3ae8a4d1-48d8-41fc-af06-c601f6e1fc4d.svg)

**Backend Tech Stack**  
<img src="https://img.shields.io/badge/JAVA-007396?style=for-the-badge&logo=java&logoColor=white">
<img src="https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=Spring&logoColor=white"> 
<img src="https://img.shields.io/badge/Springboot-6DB33F?style=for-the-badge&logo=Springboot&logoColor=white">
<img src="https://img.shields.io/badge/gradle-02303A?style=for-the-badge&logo=gradle&logoColor=white">
<img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
<img src="https://img.shields.io/badge/aws-232F3E?style=for-the-badge&logo=AmazonAWS&logoColor=white"> 
<img src="https://img.shields.io/badge/Amazon S3-569A31?style=for-the-badge&logo=Amazon S3&logoColor=white">
<img src="https://img.shields.io/badge/GitHub Actions-2088FF?style=for-the-badge&logo=GitHub Actions&logoColor=white"> 
<img src="https://img.shields.io/badge/codedeploy-6DB33F?style=for-the-badge&logo=codedeploy&logoColor=white">

<br />


## 아키텍쳐
<img alt="스크린샷 2023-02-04 오후 11 15 48" src="https://user-images.githubusercontent.com/96729804/216772396-518aae30-9254-4ea8-b114-3b350656b83c.png">

<br />


## 주요 기능
<details> 
  <summary><strong> 🗺 지도를 통한 공구 위치 표시 </strong></summary>
  <br/>
  <ul>
    <li> KaKao Map API를 사용해 해당 공구 지역의 위치를 마커로 표시하였습니다. </li>
   <br>
   <img width="500" alt="메인PC" src="https://user-images.githubusercontent.com/96729804/216773400-82fc4ba2-4293-406c-88eb-e729878da55b.png">
  </ul>

<details> 
  <summary><strong> 🔍 카테고리 조회 & 검색 </strong></summary>
  <br/>
  <ul>
    <li> QueryDSL을 이용한 동적 쿼리 작성으로 [전공/지역] 별 조회 기능과 [제목/닉네임/내용] 별 검색 기능을 조합해서 사용할 수 있도록 했습니다. </li>
   <br>
   <img width="500" alt="스크린샷 2023-02-04 오후 11 26 56" src="https://user-images.githubusercontent.com/96729804/216772875-9b3d8a60-f1b0-4ad6-8b50-6e84802189c9.png">
  </ul>
</details>

<details> 
  <summary><strong> 🗨️ 실시간 1:1 채팅 및 알림</strong></summary>
  <br/>
  <ul>
    <li> [WebSocket / Stomp pub/sub] 을 활용한 실시간 데이터 전송으로 유저간 1: 1 채팅 기능을 구현했습니다. </li>
    <li> 사이트를 이용 중인 유저에게 SSE(Server Sent Event)를 이용하여 실시간 알람을 기능 제공하고 있습니다. </li>
    <li> 알람을 통해 해당글에 들어가지 않고도 발생한 이벤트(신청/수락/거절/댓글)를 확인할 수 있습니다. </li>
   <br>
   <img width="500" alt="스크린샷 2023-02-04 오후 11 35 41" src="https://user-images.githubusercontent.com/96729804/216773237-a68f7609-b5e5-4e33-9db4-5db63eba71d0.png">
  </ul>
</details>

|메인 페이지|카테고리 조회|공구 생성|
|:-:|:-:|:-:|
|<img src=https://user-images.githubusercontent.com/98294357/171847531-8b19a385-4a6d-4167-9ca3-6d3e43e3fdb1.gif>|<img src=https://user-images.githubusercontent.com/98294357/171858176-119786e5-6cf0-40a0-9ff4-6d647a430f6e.gif>|<img src=https://user-images.githubusercontent.com/98294357/171858248-76bf8378-11cd-4b81-931d-5c5d1384a2de.gif>|
|<b>공구 상세</b>|<b>공구 신청</b>|<b>신청 수락/거절</b>|
|<img src=https://user-images.githubusercontent.com/98294357/171858440-587bcf41-0816-4ae1-9f0b-a95e745de2bb.gif>|<img src=https://user-images.githubusercontent.com/98294357/171858520-d7b69e0f-bd0e-425e-9bce-c7fa4a24741b.gif>|<img src=https://user-images.githubusercontent.com/98294357/171858586-9c21d43a-f4ba-4c7d-a4ea-be66735f5f3f.gif>|
|<b>댓글</b>|<b>채팅</b>|<b>알림</b>|
|<img src=https://user-images.githubusercontent.com/98294357/171859207-65ec01e9-000d-47e5-9f17-ac30d3243912.gif>|<img src=https://user-images.githubusercontent.com/98294357/171859460-8f71da99-2837-4f74-9afa-b26a81fc7d17.gif>|<img src=https://user-images.githubusercontent.com/98294357/171859506-a8615757-2160-405a-8448-ceb94dbfa001.gif>|
|<b>마이 페이지</b>|<b>프로필 수정</b>|<b>후기 등록</b>|
|<img src=https://user-images.githubusercontent.com/98294357/171859072-608bfd84-8738-4bbc-9588-7bc1ef78b18e.gif>|
 
 <br />

## 팀원
#### `Designer`
 <img height="30"  src="https://img.shields.io/static/v1?label=Design&message=박서연 &color=FF7F50&style=for-the-badge&>"/></a>
#### `Frontend`
 <a href="https://github.com/cchloe0927" target="_blank"><img height="30"  src="https://img.shields.io/static/v1?label=React&message=이현정 (부팀장) &color=61dafb&style=for-the-badge&>"/></a>
 <a href="https://github.com/Dev-RyanK" target="_blank"><img height="30"  src="https://img.shields.io/static/v1?label=React&message=권령빈 &color=61dafb&style=for-the-badge&>"/></a>
#### `Backend`
<a href="https://github.com/jihun1362" target="_blank"><img height="30"  src="https://img.shields.io/static/v1?label=Spring&message=백지훈 (팀장) &color=08CE5D&style=for-the-badge&>"/></a>
<a href="https://github.com/teabear12" target="_blank"><img height="30"  src="https://img.shields.io/static/v1?label=Spring&message=서보성 &color=08CE5D&style=for-the-badge&>"/></a>
<a href="https://github.com/syckor" target="_blank"><img height="30"  src="https://img.shields.io/static/v1?label=Spring&message=서영철 &color=08CE5D&style=for-the-badge&>"/></a>

<br/>

## 프로젝트 기록
📔  **[노션 링크](https://www.notion.so/10-A-6-72a2a86ec3f9426b935c004867205c45)**


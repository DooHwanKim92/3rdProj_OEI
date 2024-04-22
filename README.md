### Trouble Shooting

#### 1. Why use the DTO
- 백에서 전달하는 data -> json 직렬화 불가 에러

#### 2. Geolocation API, KAKAO API
- Geolocation : 현재 유저의 위도, 경도 계산
- kakao : 계산한 위도, 경도로 주소 검색

#### 3. 현재 사용자 위치와 게시글 위치 거리 계산
- Geolocation : 유저 로그인 시 현재 위치 저장
- ArticlesDto : 게시글 목록 렌더링 시 게시글과 유저의 거리 차이 계산하여 DTO에 추가

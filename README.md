## 테스트 계정 정보
### 일반계정
> * id : 테스트유저
> * pw : @1234567

### 관리자계정
> * id : 관리자계정
> * pw : !1234567

### 서비스 바로가기 : https://main.dstml78q1qrpx.amplifyapp.com/
<br />

# AWS를 활용한 서버리스 웹 애플리케이션 만들기
![readme1](https://github.com/ogaeng1/serverless-CRUD/assets/59693688/71d60714-6e6f-4930-9108-a7d73e57d66b)
<br />
<br />
<br />
## 사용한 AWS 기능들
> * Amplify (배포)
> * Cognito (회원가입/로그인)
> * Lambda (함수 실행)
> * API Gateway (API)
> * DynamoDB (데이터 저장)

## 첫 화면
![readme2](https://github.com/ogaeng1/serverless-CRUD/assets/59693688/a8be35f3-f2e4-429d-9c06-249e8812ec38)
<br />
회원가입 및 로그인 화면이 나타납니다.
<hr />

## 메인화면
![readme3](https://github.com/ogaeng1/serverless-CRUD/assets/59693688/880ddbd2-5183-495c-8bfb-bbcdd9cb61b7)
모든 게시글을 볼 수 있습니다.
<hr />

## 글 쓰기
![readme4](https://github.com/ogaeng1/serverless-CRUD/assets/59693688/0384f65d-1399-4f57-814d-d89c48f89740)
<br />
상단의 글쓰기 버튼을 누르면 게시글을 작성할 수 있는 모달창이 나타납니다.
<hr />

## 상세페이지
![readme5](https://github.com/ogaeng1/serverless-CRUD/assets/59693688/919dc587-1c86-4095-962d-1881b17cdf82)
게시글의 제목을 누르면 상세페이지로 이동합니다. 자기가 작성한 게시글에 한하여 수정 및 삭제가 가능합니다.
<hr />

## 관리자 계정 
![readme6](https://github.com/ogaeng1/serverless-CRUD/assets/59693688/2ebdb930-9c1a-41f2-9919-fc264e9c7627)
관리자 계정은 가입한 모든 유저의 목록을 확인할 수 있습니다. 또한 모든 게시글에 대한 수정, 삭제 권한이 있습니다. 또한 관리자 계정은
게시글을 작성하면 일반 게시글이 아닌 공지사항으로 등록됩니다.

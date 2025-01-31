# Stash
> JSON Parser & Memo Storage Application

**visit here** : http://json-stash.com

<img width="542" alt="스크린샷 2025-01-31 오후 7 50 30" src="https://github.com/user-attachments/assets/189d2d07-2823-4e8b-a5fe-3c55cfe6fdae" />

---

### 프로젝트 개요

- 업무 처리 시 API 조회 결과 로그를 JSON 파싱해야 하는 경우가 많음.
- 여러 API 조회 결과를 조합해 확인하거나, 외부로 전달해야 하는 경우가 많음.
- 위 요구사항을 해결하는 프로젝트를 웹 페이지로 만들어 브라우저 홈페이지로 활용.

### 주요 기능

- **JSON Parser**: JSON 데이터를 입력하면 구조화된 형태로 변환하여 가독성 향상
- **JSON 데이터 저장 기능**: 파싱된 JSON 데이터를 메모와 함께 저장, 불러오기
- **메모 관리 기능**: 간단한 메모 저장, 불러오기

### 기술 스택

**Nuxt3**, **Vue3**, **OpenAPI Generator**, **TypeScript**, **Pinia**, **Vite**

### 프로젝트 아키텍처

<details>
<summary>접기/펼치기</summary>

## 접은 제목
EC2 Instances
FE EC2 (Nuxt3)
BE EC2 (Spring Boot)
Jenkins EC2 (CI/CD 서버)
AWS Services
RDS (MySQL)
S3 (정적 파일 저장 & OpenAPI YAML 파일 저장소)
네트워크 및 보안 그룹 설정
VPC (FE, BE, Jenkins EC2 포함)
보안 그룹 설정
FE EC2
80 포트: 공개 (ANY)
22 포트 (SSH): Jenkins EC2에서만 허용
BE EC2
8080 포트: FE EC2에서만 허용
22 포트 (SSH): Jenkins EC2에서만 허용
Jenkins EC2
80 포트: 개발자 집 IP에서만 허용
RDS
3306 포트: BE EC2에서만 허용
배포 및 OpenAPI 연동 흐름
Jenkins CI/CD Pipeline:
GitHub에서 FE 및 BE 코드 체크아웃
FE: Nuxt3 빌드 후 배포
BE: Spring Boot 빌드 후 배포 & OpenAPI YAML 파일을 S3에 업로드
FE 배포 시 OpenAPI 처리:
Nuxt3 앱이 실행될 때 S3에서 YAML 파일을 다운로드
OpenAPI Generator 실행하여 API 클라이언트 코드 생성
클라이언트 코드 기반으로 BE EC2(Spring Boot)와 통신
</details>

![스크린샷 2025-01-31 오후 10 49 12](https://github.com/user-attachments/assets/c8bd8621-ee88-4ab7-bc91-7f57893b161a)


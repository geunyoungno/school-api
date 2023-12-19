# Local 실행 방법

## docker myqsl 설치

```bash
docker pull mysql:8.0.35;

docker run \
--platform linux/amd64 \
--name mysql_db \
-p 3306:3306 \
-e MYSQL_ROOT_PASSWORD=root \
-e MYSQL_DATABASE=test \
--volume /mnt/d/Docker/mysql/mysql_db:/var/lib/mysql  --user 1000 \
-d mysql:8.0.35 \
--character-set-server=utf8mb4 \
--collation-server=utf8mb4_unicode_ci;
```

# Local Swagger 실행

- 서버 실행

```bash
npm run start:dev
```

- swagger url 입력
  http://localhost:3000/swagger.io
- description을 구현 내용을 확인하여 호출
